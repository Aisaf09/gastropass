import http2 from "node:http2";
import jwt from "jsonwebtoken";

interface ApnsEnv {
  keyId: string;
  teamId: string;
  authKey: Buffer;
  topic: string;
  host: string;
}

function requiredEnv(): ApnsEnv {
  const keyId = process.env.APNS_KEY_ID;
  const teamId = process.env.APNS_TEAM_ID;
  const authKey = process.env.APNS_AUTH_KEY;
  const topic = process.env.APNS_TOPIC ?? process.env.APPLE_PASS_TYPE_IDENTIFIER;
  const environment = process.env.APNS_ENVIRONMENT ?? "production";

  if (!keyId || !teamId || !authKey || !topic) {
    throw new Error(
      "Apple push notifications aren't configured. Missing one of APNS_KEY_ID, APNS_TEAM_ID, APNS_AUTH_KEY, APNS_TOPIC.",
    );
  }

  return {
    keyId,
    teamId,
    // Same convention as APPLE_SIGNER_KEY etc: PEM contents, base64-encoded.
    authKey: Buffer.from(authKey, "base64"),
    topic,
    host: environment === "sandbox" ? "api.sandbox.push.apple.com" : "api.push.apple.com",
  };
}

// Provider tokens are valid up to an hour; Apple asks clients not to
// regenerate them on every request. Memoized per-process.
let cachedProviderToken: { token: string; expiresAt: number } | null = null;

function getProviderToken(env: ApnsEnv): string {
  const now = Math.floor(Date.now() / 1000);
  if (cachedProviderToken && cachedProviderToken.expiresAt > now + 60) {
    return cachedProviderToken.token;
  }

  const token = jwt.sign({ iss: env.teamId, iat: now }, env.authKey, {
    algorithm: "ES256",
    header: { alg: "ES256", kid: env.keyId },
  });

  cachedProviderToken = { token, expiresAt: now + 55 * 60 };
  return token;
}

/**
 * Sends a silent "this pass has new data" push. Per Apple's PassKit spec the
 * payload carries no data — the wallet app treats any successful push as a
 * signal to refetch the pass from the web service (see
 * app/api/v1/passes/[passTypeIdentifier]/[serialNumber]/route.ts).
 */
export function sendApplePassPush(pushToken: string): Promise<void> {
  const env = requiredEnv();
  const providerToken = getProviderToken(env);

  return new Promise((resolve, reject) => {
    const session = http2.connect(`https://${env.host}`);
    let settled = false;

    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      session.close();
      if (error) reject(error);
      else resolve();
    };

    session.on("error", (error) => finish(error));
    session.setTimeout(10_000, () => finish(new Error("APNs request timed out")));

    const request = session.request({
      ":method": "POST",
      ":path": `/3/device/${pushToken}`,
      authorization: `bearer ${providerToken}`,
      "apns-topic": env.topic,
      "content-type": "application/json",
    });

    let status = 0;
    let body = "";

    request.on("response", (headers) => {
      status = Number(headers[":status"] ?? 0);
    });
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      if (status >= 200 && status < 300) {
        finish();
      } else {
        finish(new Error(`APNs push failed: ${status} ${body}`));
      }
    });
    request.on("error", (error) => finish(error));

    request.end(JSON.stringify({}));
  });
}
