import { NextResponse, type NextRequest } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { requirePassTypeIdentifier } from "@/lib/wallet/apple-auth";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ deviceLibraryIdentifier: string; passTypeIdentifier: string }>;
  },
) {
  const { deviceLibraryIdentifier, passTypeIdentifier } = await params;

  if (!requirePassTypeIdentifier(passTypeIdentifier)) {
    return NextResponse.json({}, { status: 401 });
  }

  const passesUpdatedSince = request.nextUrl.searchParams.get("passesUpdatedSince");

  const supabase = createServiceRoleClient();
  let query = supabase
    .from("passes")
    .select("serial_number, updated_at")
    .eq("platform", "apple")
    .contains("apple_device_library_identifiers", [deviceLibraryIdentifier]);

  if (passesUpdatedSince) {
    query = query.gt("updated_at", passesUpdatedSince);
  }

  const { data: passes } = await query;

  if (!passes || passes.length === 0) {
    return NextResponse.json({}, { status: 204 });
  }

  const lastUpdated = passes.reduce(
    (latest, pass) => (pass.updated_at > latest ? pass.updated_at : latest),
    passes[0]!.updated_at,
  );

  return NextResponse.json({
    lastUpdated,
    serialNumbers: passes.map((pass) => pass.serial_number),
  });
}
