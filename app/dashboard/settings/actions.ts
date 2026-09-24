"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getOwnerRestaurant } from "@/lib/dashboard";

export async function updateRestaurant(
  _prevState: string | undefined,
  formData: FormData,
) {
  const name = String(formData.get("name") ?? "").trim();
  const brandColor = String(formData.get("brandColor") ?? "");
  const logoUrl = String(formData.get("logoUrl") ?? "").trim();
  const pointsPerVisit = Number(formData.get("pointsPerVisit") ?? 1);
  const isPublic = formData.get("isPublic") === "on";

  if (!name) {
    return "Enter a restaurant name.";
  }

  if (!Number.isFinite(pointsPerVisit) || pointsPerVisit < 1) {
    return "Points per visit must be a positive number.";
  }

  const restaurant = await getOwnerRestaurant();
  if (!restaurant) {
    return "No restaurant found.";
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("restaurants")
    .update({
      name,
      brand_color: brandColor || restaurant.brand_color,
      logo_url: logoUrl || null,
      points_per_visit: pointsPerVisit,
      is_public: isPublic,
    })
    .eq("id", restaurant.id);

  if (error) {
    return error.message;
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
  return undefined;
}
