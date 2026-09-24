import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

/**
 * The signed-in owner's first restaurant, if any. Cached per-request so the
 * dashboard layout and page can both call it without a duplicate query.
 */
export const getOwnerRestaurant = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return restaurant;
});
