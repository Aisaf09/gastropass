import { NextResponse, type NextRequest } from "next/server";

// Apple's PassKit web service spec allows the wallet app to POST diagnostic
// logs here, unauthenticated. We just surface them in server logs.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const logs = Array.isArray(body?.logs) ? body.logs : [];

  for (const line of logs) {
    console.error("[apple-wallet]", line);
  }

  return NextResponse.json({});
}
