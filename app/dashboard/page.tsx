import { redirect } from "next/navigation";
import { Users, CreditCard, Gift, Link2 } from "lucide-react";
import { getOwnerRestaurant } from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { CopyLinkButton } from "./copy-link-button";

const statStyles = [
  { icon: "bg-orange-500/10 text-orange-400", value: "text-orange-400" },
  { icon: "bg-secondary/10 text-secondary", value: "text-secondary" },
  { icon: "bg-violet-500/10 text-violet-400", value: "text-violet-400" },
];

export default async function DashboardPage() {
  const restaurant = await getOwnerRestaurant();

  if (!restaurant) {
    redirect("/dashboard/onboarding");
  }

  const supabase = await createClient();

  const [{ count: customerCount }, { count: activePassCount }] = await Promise.all([
    supabase
      .from("customers")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", restaurant.id),
    supabase
      .from("passes")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", restaurant.id)
      .eq("status", "active"),
  ]);

  const stats = [
    { label: "Customers", value: customerCount ?? 0, icon: Users },
    { label: "Active passes", value: activePassCount ?? 0, icon: CreditCard },
    { label: "Points per visit", value: restaurant.points_per_visit, icon: Gift },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">/{restaurant.slug}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => {
          const style = statStyles[i % statStyles.length]!;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <span className={`flex size-8 items-center justify-center rounded-lg ${style.icon}`}>
                    <stat.icon className="size-4" />
                  </span>
                </div>
                <p className={`mt-3 text-3xl font-semibold ${style.value}`}>{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link2 className="size-4" />
              Your signup link
            </div>
            <p className="mt-2 break-all text-sm text-foreground">
              {process.env.NEXT_PUBLIC_SITE_URL}/pass/{restaurant.slug}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Share this with customers so they can join and start earning points.
            </p>
          </div>
          <CopyLinkButton link={`${process.env.NEXT_PUBLIC_SITE_URL}/pass/${restaurant.slug}`} />
        </CardContent>
      </Card>
    </div>
  );
}
