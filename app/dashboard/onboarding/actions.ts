"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export async function createRestaurant(
  _prevState: string | undefined,
  formData: FormData,
) {
  const name = String(formData.get("name") ?? "").trim();
  const brandColor = String(formData.get("brandColor") ?? "#f97316");
  const pointsPerVisit = Number(formData.get("pointsPerVisit") ?? 1);

  if (!name) {
    return "Enter a restaurant name.";
  }

  const slug = slugify(name);
  if (slug.length < 3) {
    return "Restaurant name must produce a slug of at least 3 characters.";
  }

  if (!Number.isFinite(pointsPerVisit) || pointsPerVisit < 1) {
    return "Points per visit must be a positive number.";
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("restaurants").insert({
    owner_id: user.id,
    name,
    slug,
    brand_color: brandColor,
    points_per_visit: pointsPerVisit,
  });

  if (error) {
    return error.code === "23505"
      ? "That restaurant name is already taken. Try a different one."
      : error.message;
  }

  redirect("/dashboard");
}
