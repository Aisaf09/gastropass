import { notFound } from "next/navigation";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { JoinForm } from "./join-form";
import { CardPreview } from "./card-preview";
import { HowItWorks } from "./how-it-works";
import { BenefitsGrid } from "./benefits-grid";
import { FAQ } from "./faq";

export default async function PublicPassPage({
  params,
}: {
  params: Promise<{ restaurantSlug: string }>;
}) {
  const { restaurantSlug } = await params;

  const supabase = createServiceRoleClient();
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", restaurantSlug)
    .eq("is_public", true)
    .maybeSingle();

  if (!restaurant) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden bg-zinc-950">
      {/* Warm ambient background glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(249,115,22,0.15), transparent 60%)",
        }}
      />

      <section className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <span
            className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400"
          >
            Digital loyalty card
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Join {restaurant.name}&apos;s loyalty program
          </h1>
          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Earn {restaurant.points_per_visit} point
            {restaurant.points_per_visit === 1 ? "" : "s"} every visit — straight from your
            phone&apos;s wallet, no app required.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <CardPreview
            restaurantName={restaurant.name}
            brandColor={restaurant.brand_color}
            pointsPerVisit={restaurant.points_per_visit}
          />

          <Card className="border-zinc-800 bg-zinc-950/70">
            <CardHeader>
              <CardTitle className="text-white">Get your card</CardTitle>
              <CardDescription>Takes ten seconds, no app required.</CardDescription>
            </CardHeader>
            <CardContent>
              <JoinForm restaurantSlug={restaurant.slug} restaurantName={restaurant.name} />
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="relative border-t border-zinc-900">
        <HowItWorks />
        <BenefitsGrid />
        <FAQ />
      </div>
    </main>
  );
}
