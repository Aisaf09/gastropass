"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getOwnerRestaurant } from "@/lib/dashboard";
import { sendApplePassPush } from "@/lib/wallet/apple-push";
import { updateGoogleWalletPoints } from "@/lib/wallet/google";

export async function addCustomer(
  _prevState: string | undefined,
  formData: FormData,
) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!fullName) {
    return "Enter the customer's name.";
  }

  if (!email && !phone) {
    return "Enter an email or a phone number.";
  }

  const restaurant = await getOwnerRestaurant();
  if (!restaurant) {
    return "No restaurant found.";
  }

  const supabase = await createClient();
  const { error } = await supabase.from("customers").insert({
    restaurant_id: restaurant.id,
    full_name: fullName,
    email: email || null,
    phone: phone || null,
  });

  if (error) {
    if (error.code === "23505") {
      return "A customer with that email or phone already exists.";
    }
    return error.message;
  }

  revalidatePath("/dashboard/customers");
  return undefined;
}

export async function addVisit(customerId: string) {
  const restaurant = await getOwnerRestaurant();
  if (!restaurant) return;

  const supabase = await createClient();
  const { data: customer } = await supabase
    .from("customers")
    .select("points_balance")
    .eq("id", customerId)
    .eq("restaurant_id", restaurant.id)
    .single();

  if (!customer) return;

  const newBalance = customer.points_balance + restaurant.points_per_visit;

  await supabase
    .from("customers")
    .update({ points_balance: newBalance })
    .eq("id", customerId)
    .eq("restaurant_id", restaurant.id);

  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");

  await pushWalletUpdates(customerId, newBalance);
}

/**
 * Best-effort: refreshes any wallet passes the customer has added so their
 * points balance updates live. One platform failing (e.g. push token no
 * longer valid) never blocks the other or the visit that was already saved.
 */
async function pushWalletUpdates(customerId: string, pointsBalance: number) {
  const supabase = await createClient();
  const { data: passes } = await supabase
    .from("passes")
    .select("*")
    .eq("customer_id", customerId);

  for (const pass of passes ?? []) {
    try {
      if (pass.platform === "apple" && pass.apple_push_token) {
        await sendApplePassPush(pass.apple_push_token);
      } else if (pass.platform === "google" && pass.google_object_id) {
        await updateGoogleWalletPoints(pass.google_object_id, pointsBalance);
      }
    } catch (error) {
      console.error(`Failed to push wallet update for pass ${pass.id}:`, error);
    }
  }
}

export async function deleteCustomer(customerId: string) {
  const restaurant = await getOwnerRestaurant();
  if (!restaurant) return;

  const supabase = await createClient();
  await supabase
    .from("customers")
    .delete()
    .eq("id", customerId)
    .eq("restaurant_id", restaurant.id);

  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
}
