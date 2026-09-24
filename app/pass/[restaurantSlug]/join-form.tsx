"use client";

import { useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JoinSuccess } from "./join-success";

export function JoinForm({
  restaurantSlug,
  restaurantName,
}: {
  restaurantSlug: string;
  restaurantName: string;
}) {
  const consentId = useId();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [registered, setRegistered] = useState<{ customerId: string; fallbackUrl: string } | null>(
    null,
  );

  if (registered) {
    return (
      <JoinSuccess
        restaurantSlug={restaurantSlug}
        customerId={registered.customerId}
        fallbackUrl={registered.fallbackUrl}
      />
    );
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Enter your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Enter your phone number.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/v1/passes/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantSlug, fullName, phone, marketingConsent }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.customerId) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setRegistered({ customerId: data.customerId, fallbackUrl: data.fallbackUrl });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Name</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
      </div>

      <label htmlFor={consentId} className="flex items-start gap-2.5 text-sm text-zinc-400">
        <input
          id={consentId}
          type="checkbox"
          checked={marketingConsent}
          onChange={(event) => setMarketingConsent(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 rounded border-zinc-700 bg-transparent"
        />
        {restaurantName} may send me offers and news (optional).
      </label>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-2 min-h-11 bg-gradient-to-r from-orange-500 to-rose-600 text-white hover:from-orange-400 hover:to-rose-500"
      >
        {pending && <Loader2 className="animate-spin" />}
        {pending ? "Creating your card..." : "Get my card"}
      </Button>
    </form>
  );
}
