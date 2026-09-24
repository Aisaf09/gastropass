import jwt from "jsonwebtoken";
import { WalletNotConfiguredError } from "./errors";

const WALLET_API_BASE = "https://walletobjects.googleapis.com/walletobjects/v1";
const OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const WALLET_SCOPE = "https://www.googleapis.com/auth/wallet_object.issuer";

interface GoogleWalletEnv {
  issuerId: string;
  serviceAccountEmail: string;
  privateKey: string;
}

interface GoogleWalletInput {
  customerId: string;
  customerName: string;
  pointsBalance: number;
  restaurantName: string;
  restaurantSlug: string;
  brandColor: string;
  logoUrl?: string | null;
}

function requiredEnv(): GoogleWalletEnv {
  const missing: string[] = [];
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;
  const serviceAccountEmail = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!issuerId) missing.push("GOOGLE_WALLET_ISSUER_ID");
  if (!serviceAccountEmail) missing.push("GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL");
  if (!privateKey) missing.push("GOOGLE_WALLET_SERVICE_ACCOUNT_PRIVATE_KEY");

  if (missing.length > 0) {
    throw new WalletNotConfiguredError("google", missing);
  }

  return {
    issuerId: issuerId!,
    serviceAccountEmail: serviceAccountEmail!,
    // Stored with literal "\n" in the env var; restore real newlines for PEM.
    privateKey: privateKey!.replace(/\\n/g, "\n"),
  };
}

// Memoized per-process, same pattern as lib/supabase/service-role.ts. Good
// enough here: worst case a cold instance re-requests a token once.
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

async function getGoogleAccessToken(env: GoogleWalletEnv): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60) {
    return cachedAccessToken.token;
  }

  const assertion = jwt.sign(
    {
      iss: env.serviceAccountEmail,
      scope: WALLET_SCOPE,
      aud: OAUTH_TOKEN_URL,
      iat: now,
      exp: now + 3600,
    },
    env.privateKey,
    { algorithm: "RS256" },
  );

  const response = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to obtain Google Wallet access token: ${response.status} ${await response.text()}`,
    );
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedAccessToken = { token: data.access_token, expiresAt: now + data.expires_in };
  return data.access_token;
}

/**
 * The loyalty class (one per restaurant) must exist before any object can
 * reference it. Creates it on first use instead of requiring a manual
 * console/API step per restaurant.
 */
async function ensureLoyaltyClass(
  env: GoogleWalletEnv,
  input: Pick<GoogleWalletInput, "restaurantSlug" | "restaurantName" | "brandColor" | "logoUrl">,
): Promise<string> {
  const classId = `${env.issuerId}.${input.restaurantSlug}`;
  const token = await getGoogleAccessToken(env);

  const getResponse = await fetch(`${WALLET_API_BASE}/loyaltyClass/${classId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (getResponse.ok) {
    return classId;
  }
  if (getResponse.status !== 404) {
    throw new Error(
      `Failed to look up Google Wallet class: ${getResponse.status} ${await getResponse.text()}`,
    );
  }

  const createResponse = await fetch(`${WALLET_API_BASE}/loyaltyClass`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: classId,
      issuerName: input.restaurantName,
      programName: input.restaurantName,
      reviewStatus: "UNDER_REVIEW",
      hexBackgroundColor: input.brandColor,
      ...(input.logoUrl
        ? { programLogo: { sourceUri: { uri: input.logoUrl } } }
        : {}),
    }),
  });

  // 409 means another concurrent request created it first — fine either way.
  if (!createResponse.ok && createResponse.status !== 409) {
    throw new Error(
      `Failed to create Google Wallet class: ${createResponse.status} ${await createResponse.text()}`,
    );
  }

  return classId;
}

/**
 * Builds a "Save to Google Wallet" URL for a customer's loyalty card.
 * Throws WalletNotConfiguredError until a Google Wallet Issuer account and
 * service account are set in the environment (see .env.example). Unlike
 * Apple, this needs no paid account — only Google's (free) issuer approval.
 */
export async function generateGoogleWalletSaveUrl(
  input: GoogleWalletInput,
): Promise<{ saveUrl: string; objectId: string }> {
  const env = requiredEnv();
  const classId = await ensureLoyaltyClass(env, input);
  const objectId = `${env.issuerId}.${input.customerId}`;

  const loyaltyObject = {
    id: objectId,
    classId,
    state: "ACTIVE",
    accountName: input.customerName,
    accountId: input.customerId,
    loyaltyPoints: {
      label: "Points",
      balance: { int: input.pointsBalance },
    },
    barcode: {
      type: "QR_CODE",
      value: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/scan/${input.customerId}`,
    },
  };

  const claims = {
    iss: env.serviceAccountEmail,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    payload: {
      loyaltyObjects: [loyaltyObject],
    },
  };

  const token = jwt.sign(claims, env.privateKey, { algorithm: "RS256" });
  return { saveUrl: `https://pay.google.com/gp/v/save/${token}`, objectId };
}

/**
 * Pushes a live points-balance update to an existing Google Wallet object.
 * If the customer never tapped "Save to Wallet" the object won't exist yet
 * (Google creates it lazily from the save JWT) — that 404 is expected and
 * silently ignored rather than treated as a failure.
 */
export async function updateGoogleWalletPoints(
  objectId: string,
  pointsBalance: number,
): Promise<void> {
  const env = requiredEnv();
  const token = await getGoogleAccessToken(env);

  const response = await fetch(`${WALLET_API_BASE}/loyaltyObject/${objectId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      loyaltyPoints: { label: "Points", balance: { int: pointsBalance } },
    }),
  });

  if (response.status === 404) {
    return;
  }
  if (!response.ok) {
    throw new Error(
      `Failed to update Google Wallet object: ${response.status} ${await response.text()}`,
    );
  }
}
