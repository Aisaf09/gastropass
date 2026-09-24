import { NextResponse, type NextRequest } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { authenticateApplePassRequest, requirePassTypeIdentifier } from "@/lib/wallet/apple-auth";
import { generateApplePass } from "@/lib/wallet/apple";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ passTypeIdentifier: string; serialNumber: string }>;
  },
) {
  const { passTypeIdentifier, serialNumber } = await params;

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

  const supabase = createServiceRoleClient();
  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", pass.customer_id)
    .maybeSingle();

  const { data: restaurant } = customer
    ? await supabase
        .from("restaurants")
        .select("*")
        .eq("id", customer.restaurant_id)
        .maybeSingle()
    : { data: null };

  if (!customer || !restaurant) {
    return NextResponse.json({}, { status: 404 });
  }

  const ifModifiedSince = request.headers.get("if-modified-since");
  if (ifModifiedSince && new Date(pass.updated_at) <= new Date(ifModifiedSince)) {
    return new NextResponse(null, { status: 304 });
  }

  const pkpass = await generateApplePass({
    customerId: customer.id,
    customerName: customer.full_name,
    pointsBalance: customer.points_balance,
    restaurantName: restaurant.name,
    restaurantSlug: restaurant.slug,
    brandColor: restaurant.brand_color,
    serialNumber: pass.serial_number,
    authenticationToken: pass.apple_auth_token ?? "",
  });

  return new NextResponse(new Uint8Array(pkpass), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.apple.pkpass",
      "Last-Modified": new Date(pass.updated_at).toUTCString(),
    },
  });
}
