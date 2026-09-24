import { redirect } from "next/navigation";
import { getOwnerRestaurant } from "@/lib/dashboard";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const restaurant = await getOwnerRestaurant();

  if (!restaurant) {
    redirect("/dashboard/onboarding");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">/{restaurant.slug}</p>
      </div>


      <SettingsForm restaurant={restaurant} />
    </div>
  );
}
