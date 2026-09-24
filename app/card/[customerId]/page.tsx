import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { qrCodeDataUrl } from "@/lib/qrcode";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gastropass.app";

// Personal, unauthenticated customer page (name + points balance) — must
// never be indexed even though it isn't covered by robots.txt's /dashboard/
// disallow rule.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CustomerCardPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;

  const supabase = createServiceRoleClient();
  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", customerId)
    .maybeSingle();

  if (!customer) {
    notFound();
  }

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", customer.restaurant_id)
    .maybeSingle();

  if (!restaurant) {
    notFound();
  }

  const scanUrl = `${SITE_URL}/dashboard/scan/${customer.id}`;
  const qrCode = await qrCodeDataUrl(scanUrl);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 text-center">
        <h1
          className="text-lg font-semibold"
          style={{ color: restaurant.brand_color }}
        >
          {restaurant.name}
        </h1>
        {/* First name only — this page is public and unauthenticated, so we
            avoid showing the customer's full name (see privacy review). */}
        <p className="mt-1 text-sm text-muted-foreground">
          {customer.full_name.split(" ")[0]}
        </p>

        <p className="mt-6 text-4xl font-semibold text-foreground">
          {customer.points_balance}
        </p>
        <p className="text-sm text-muted-foreground">points</p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrCode}
          alt="Show this to staff to add a visit"
          className="mx-auto mt-6 h-48 w-48 rounded-md bg-white p-2"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          Show this QR code to staff to add a visit.
        </p>
      </div>
    </main>
  );
}
