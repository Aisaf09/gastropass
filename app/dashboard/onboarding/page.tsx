"use client";

import { useActionState } from "react";
import { Store } from "lucide-react";
import { createRestaurant } from "./actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const [error, formAction, pending] = useActionState(createRestaurant, undefined);

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Set up your restaurant</CardTitle>
          <CardDescription>
            This powers the pass your customers see in Apple Wallet and Google Wallet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Restaurant name</Label>
              <Input id="name" name="name" type="text" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="brandColor">Brand color</Label>
              <input
                id="brandColor"
                name="brandColor"
                type="color"
                defaultValue="#f97316"
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
                defaultValue={1}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={pending} className="mt-2">
              <Store />
              {pending ? "Creating..." : "Create restaurant"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
