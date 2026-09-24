import { PKPass } from "passkit-generator";
import { WalletNotConfiguredError } from "./errors";

// 1x1 transparent PNG placeholder. Apple requires icon.png (and ideally
// icon@2x.png, logo.png) to be present for a pass to be valid. Replace
// this with real branded assets once certificates are configured —
// this exists only so the structure below is complete and doesn't crash.
const PLACEHOLDER_ICON = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

interface AppleWalletInput {
  customerId: string;
  customerName: string;
  pointsBalance: number;
  restaurantName: string;
  restaurantSlug: string;
  brandColor: string;
  serialNumber: string;
  authenticationToken: string;
}

function requiredEnv(): {
  teamIdentifier: string;
  passTypeIdentifier: string;
  wwdr: Buffer;
  signerCert: Buffer;
  signerKey: Buffer;
  signerKeyPassphrase: string | undefined;
} {
  const missing: string[] = [];
  const teamIdentifier = process.env.APPLE_TEAM_ID;
  const passTypeIdentifier = process.env.APPLE_PASS_TYPE_IDENTIFIER;
  const wwdr = process.env.APPLE_WWDR_CERTIFICATE;
  const signerCert = process.env.APPLE_SIGNER_CERTIFICATE;
  const signerKey = process.env.APPLE_SIGNER_KEY;

  if (!teamIdentifier) missing.push("APPLE_TEAM_ID");
  if (!passTypeIdentifier) missing.push("APPLE_PASS_TYPE_IDENTIFIER");
  if (!wwdr) missing.push("APPLE_WWDR_CERTIFICATE");
  if (!signerCert) missing.push("APPLE_SIGNER_CERTIFICATE");
  if (!signerKey) missing.push("APPLE_SIGNER_KEY");

  if (missing.length > 0) {
    throw new WalletNotConfiguredError("apple", missing);
  }

  return {
    teamIdentifier: teamIdentifier!,
    passTypeIdentifier: passTypeIdentifier!,
    // Certs are stored as base64-encoded PEM contents in env vars so
    // there's no dependency on a filesystem path at deploy time.
    wwdr: Buffer.from(wwdr!, "base64"),
    signerCert: Buffer.from(signerCert!, "base64"),
    signerKey: Buffer.from(signerKey!, "base64"),
    signerKeyPassphrase: process.env.APPLE_SIGNER_KEY_PASSPHRASE,
  };
}

/**
 * Builds a signed .pkpass buffer for a customer's loyalty card.
 * Throws WalletNotConfiguredError until real Apple Developer certificates
 * are set in the environment (see .env.example).
 */
export async function generateApplePass(input: AppleWalletInput): Promise<Buffer> {
  const env = requiredEnv();

  const pass = new PKPass(
    {
      "icon.png": PLACEHOLDER_ICON,
      "logo.png": PLACEHOLDER_ICON,
    },
    {
      wwdr: env.wwdr,
      signerCert: env.signerCert,
      signerKey: env.signerKey,
      signerKeyPassphrase: env.signerKeyPassphrase,
    },
    {
      formatVersion: 1,
      passTypeIdentifier: env.passTypeIdentifier,
      teamIdentifier: env.teamIdentifier,
      serialNumber: input.serialNumber,
      organizationName: input.restaurantName,
      description: `${input.restaurantName} loyalty card`,
      backgroundColor: input.brandColor,
      logoText: input.restaurantName,
      authenticationToken: input.authenticationToken,
      webServiceURL: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://gastropass.app"}/api/v1`,
    },
  );

  pass.type = "storeCard";
  pass.primaryFields.push({ key: "points", label: "Points", value: input.pointsBalance });
  pass.secondaryFields.push({ key: "name", label: "Member", value: input.customerName });
  pass.setBarcodes({
    message: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/scan/${input.customerId}`,
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1",
  });

  return pass.getAsBuffer();
}
