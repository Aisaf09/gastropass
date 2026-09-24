import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOwnerRestaurant } from "@/lib/dashboard";
import { addVisit } from "@/app/dashboard/customers/actions";

// Already excluded by robots.txt's /dashboard/ disallow and gated behind
// owner auth, but belt-and-suspenders since it renders a customer's name.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ScanCustomerPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;

  const restaurant = await getOwnerRestaurant();
  if (!restaurant) {
    redirect("/dashboard/onboarding");
  }

  const supabase = await createClient();
  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", customerId)
    .eq("restaurant_id", restaurant.id)
    .maybeSingle();

  if (!customer) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 text-center">
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          {customer.full_name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Currently {customer.points_balance} points
        </p>
      </div>

      <form action={addVisit.bind(null, customer.id)}>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
        >
          Add visit (+{restaurant.points_per_visit})
        </button>
      </form>

      <Link
        href="/dashboard/customers"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        Back to customers
      </Link>
    </div>
  );
}
