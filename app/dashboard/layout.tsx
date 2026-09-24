import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOwnerRestaurant } from "@/lib/dashboard";
import { signOut } from "./actions";
import { DashboardHeader } from "./dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const restaurant = await getOwnerRestaurant();

  return (
    <div className="min-h-screen">
      <DashboardHeader
        restaurantName={restaurant?.name ?? "GastroPass"}
        showNav={Boolean(restaurant)}
        signOutAction={signOut}
      />
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
