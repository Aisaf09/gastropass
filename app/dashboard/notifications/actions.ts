"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getOwnerRestaurant } from "@/lib/dashboard";

export async function draftNotification(
  _prevState: string | undefined,
  formData: FormData,
) {
  const title = String(formData.get("title") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!title || !message) {
    return "Enter a title and a message.";
  }

  const restaurant = await getOwnerRestaurant();
  if (!restaurant) {
    return "No restaurant found.";
  }

  const supabase = await createClient();

  const { count } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true })
    .eq("restaurant_id", restaurant.id);

  const { error } = await supabase.from("notifications").insert({
    restaurant_id: restaurant.id,
    title,
    message,
    recipient_count: count ?? 0,
    // sent_at stays null: there's no email/SMS/push provider wired up yet,
    // so this is a draft record, not a real send. See the UI copy.
  });

  if (error) {
    return error.message;
  }

  revalidatePath("/dashboard/notifications");
  return undefined;
}
