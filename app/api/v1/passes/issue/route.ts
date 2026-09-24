import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { randomUUID } from "node:crypto";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { isRateLimited } from "@/lib/rate-limit";
import { generateApplePass } from "@/lib/wallet/apple";
import { generateGoogleWalletSaveUrl } from "@/lib/wallet/google";
import { WalletNotConfiguredError } from "@/lib/wallet/errors";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gastropass.app";

type Platform = "apple" | "google";

export async function POST(request: NextRequest) {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`issue:${ip}`)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a minute." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const restaurantSlug = String(body.restaurantSlug ?? "").trim();
  if (!restaurantSlug) {
    return NextResponse.json({ error: "Missing restaurant." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", restaurantSlug)
    .eq("is_public", true)
    .maybeSingle();

  if (!restaurant) {
    return NextResponse.json(
      { error: "This loyalty program is no longer available." },
      { status: 404 },
    );
  }

  // A request either (a) registers a new customer (no `customerId`), or
  // (b) generates a wallet pass for an already-registered one (`customerId`
  // present, from the success screen). Splitting these means the success
  // screen can offer both wallet buttons without re-registering the phone
  // number and hitting the uniqueness error on the second tap.
  const existingCustomerId = typeof body.customerId === "string" ? body.customerId : null;

  let customer: { id: string; full_name: string; points_balance: number };

  if (existingCustomerId) {
    const { data } = await supabase
      .from("customers")
      .select("id, full_name, points_balance")
      .eq("id", existingCustomerId)
      .eq("restaurant_id", restaurant.id)
      .maybeSingle();

    if (!data) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }
    customer = data;
  } else {
    const fullName = String(body.fullName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const marketingConsent = body.marketingConsent === true;

    if (!fullName) {
      return NextResponse.json({ error: "Enter your name." }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: "Enter your phone number." }, { status: 400 });
    }

    const { data, error: insertError } = await supabase
      .from("customers")
      .insert({
        restaurant_id: restaurant.id,
        full_name: fullName,
        phone,
        marketing_consent: marketingConsent,
      })
      .select("id, full_name, points_balance")
      .single();

    if (insertError || !data) {
      if (insertError?.code === "23505") {
        return NextResponse.json(
          { error: "You're already signed up with that phone number." },
          { status: 409 },
        );
      }
      console.error("Failed to create customer:", insertError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }
    customer = data;
  }

  const fallbackUrl = `${SITE_URL}/card/${customer.id}`;

  const platform: Platform | null =
    body.platform === "apple" || body.platform === "google" ? body.platform : null;

  // No platform requested: this was just a registration call. The success
  // screen makes the separate, explicit call below for whichever wallet the
  // customer actually taps.
  if (!platform) {
    return NextResponse.json({ customerId: customer.id, fallbackUrl });
  }

  try {
    if (platform === "apple") {
      // Always a fresh row: overwriting an existing one would invalidate the
      // auth token of a pass the customer may have already installed.
      const serialNumber = randomUUID();
      const authenticationToken = randomUUID();

      const pkpass = await generateApplePass({
        customerId: customer.id,
        customerName: customer.full_name,
        pointsBalance: customer.points_balance,
        restaurantName: restaurant.name,
        restaurantSlug: restaurant.slug,
        brandColor: restaurant.brand_color,
        serialNumber,
        authenticationToken,
      });

      await supabase.from("passes").insert({
        customer_id: customer.id,
        restaurant_id: restaurant.id,
        platform: "apple",
        serial_number: serialNumber,
        apple_auth_token: authenticationToken,
      });

      return new NextResponse(new Uint8Array(pkpass), {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.pkpass",
          "Content-Disposition": `attachment; filename="${restaurant.slug}.pkpass"`,
        },
      });
    }

    const { saveUrl, objectId } = await generateGoogleWalletSaveUrl({
      customerId: customer.id,
      customerName: customer.full_name,
      pointsBalance: customer.points_balance,
      restaurantName: restaurant.name,
      restaurantSlug: restaurant.slug,
      brandColor: restaurant.brand_color,
      logoUrl: restaurant.logo_url,
    });

    // objectId is deterministic (issuerId.customerId), so re-generating for
    // the same customer reuses the same serial_number — insert once, ignore
    // the expected unique-violation on a retry instead of erroring.
    const { error: passInsertError } = await supabase.from("passes").insert({
      customer_id: customer.id,
      restaurant_id: restaurant.id,
      platform: "google",
      serial_number: objectId,
      google_object_id: objectId,
    });
    if (passInsertError && passInsertError.code !== "23505") {
      throw passInsertError;
    }

    return NextResponse.json({ saveUrl, fallbackUrl });
  } catch (error) {
    if (error instanceof WalletNotConfiguredError) {
      // Certificates/issuer account aren't set up yet — the customer is
      // already created, so fall back to the web card instead of failing.
      return NextResponse.json(
        { fallbackUrl, walletUnavailable: true, reason: error.message },
        { status: 200 },
      );
    }
    console.error("Failed to generate wallet pass:", error);
    return NextResponse.json(
      { error: "Something went wrong generating the pass.", fallbackUrl },
      { status: 500 },
    );
  }
}
