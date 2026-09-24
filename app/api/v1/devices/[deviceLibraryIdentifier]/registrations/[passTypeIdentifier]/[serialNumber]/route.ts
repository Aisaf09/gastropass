import { NextResponse, type NextRequest } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { authenticateApplePassRequest, requirePassTypeIdentifier } from "@/lib/wallet/apple-auth";

type RouteParams = {
  params: Promise<{
    deviceLibraryIdentifier: string;
    passTypeIdentifier: string;
    serialNumber: string;
  }>;
};

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { deviceLibraryIdentifier, passTypeIdentifier, serialNumber } = await params;

  if (!requirePassTypeIdentifier(passTypeIdentifier)) {
    return NextResponse.json({}, { status: 401 });
  }

  const pass = await authenticateApplePassRequest(
    serialNumber,
    request.headers.get("authorization"),
  );
  if (!pass) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const pushToken = typeof body?.pushToken === "string" ? body.pushToken : null;
  if (!pushToken) {
    return NextResponse.json({}, { status: 400 });
  }

  const alreadyRegistered = pass.apple_device_library_identifiers.includes(
    deviceLibraryIdentifier,
  );
  const deviceLibraryIdentifiers = alreadyRegistered
    ? pass.apple_device_library_identifiers
    : [...pass.apple_device_library_identifiers, deviceLibraryIdentifier];

  const supabase = createServiceRoleClient();
  await supabase
    .from("passes")
    .update({
      apple_push_token: pushToken,
      apple_device_library_identifiers: deviceLibraryIdentifiers,
    })
    .eq("id", pass.id);

  return NextResponse.json({}, { status: alreadyRegistered ? 200 : 201 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { deviceLibraryIdentifier, passTypeIdentifier, serialNumber } = await params;

  if (!requirePassTypeIdentifier(passTypeIdentifier)) {
    return NextResponse.json({}, { status: 401 });
  }

  const pass = await authenticateApplePassRequest(
    serialNumber,
    request.headers.get("authorization"),
  );
  if (!pass) {
    return NextResponse.json({}, { status: 401 });
  }

  const deviceLibraryIdentifiers = pass.apple_device_library_identifiers.filter(
    (id) => id !== deviceLibraryIdentifier,
  );

  const supabase = createServiceRoleClient();
  await supabase
    .from("passes")
    .update({
      apple_device_library_identifiers: deviceLibraryIdentifiers,
      apple_push_token: deviceLibraryIdentifiers.length === 0 ? null : pass.apple_push_token,
    })
    .eq("id", pass.id);

  return NextResponse.json({}, { status: 200 });
}
