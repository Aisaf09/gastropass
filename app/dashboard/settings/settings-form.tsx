"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { updateRestaurant } from "./actions";
import type { Database } from "@/lib/supabase/database.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Restaurant = Database["public"]["Tables"]["restaurants"]["Row"];

export function SettingsForm({ restaurant }: { restaurant: Restaurant }) {
  const [error, formAction, pending] = useActionState(updateRestaurant, undefined);

  return (
    <Card>
      <CardContent className="p-6">
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Restaurant name</Label>
            <Input id="name" name="name" type="text" required defaultValue={restaurant.name} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              type="url"
              placeholder="https://..."
              defaultValue={restaurant.logo_url ?? ""}
            />
            <p className="text-xs text-muted-foreground">
              Link to an image hosted elsewhere — there&apos;s no file upload yet.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="brandColor">Brand color</Label>
            <input
              id="brandColor"
              name="brandColor"
              type="color"
              defaultValue={restaurant.brand_color}
              className="h-10 w-16 rounded-md border border-input bg-background/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pointsPerVisit">Points per visit</Label>
            <Input
              id="pointsPerVisit"
              name="pointsPerVisit"
              type="number"
              min={1}
              required
              defaultValue={restaurant.points_per_visit}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="isPublic"
              defaultChecked={restaurant.is_public}
              className="h-4 w-4 rounded border-input"
            />
            Public signup page is active
          </label>
          <p className="-mt-2 text-xs text-muted-foreground">
            Turn this off to stop new customers from joining at /pass/{restaurant.slug} without
            deleting anything.
          </p>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={pending} className="mt-2 self-start">
            <Save />
            {pending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
