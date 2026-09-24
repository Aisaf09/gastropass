import type { MetadataRoute } from "next";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gastropass.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  interface RestaurantSitemapRow {
    slug: string;
    updated_at: string | null;
  }

  let restaurants: RestaurantSitemapRow[] = [];
  try {
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("restaurants")
      .select("slug, updated_at")
      .eq("is_public", true)
      .returns<RestaurantSitemapRow[]>();
    restaurants = data ?? [];
  } catch {
    // Supabase isn't configured yet (e.g. a local build without
    // .env.local) — fall back to the static routes only.
  }

  const passRoutes: MetadataRoute.Sitemap = restaurants.map((r) => ({
    url: `${SITE_URL}/pass/${r.slug}`,
    lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...passRoutes];
}
