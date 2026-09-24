"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Smartphone,
  Wallet,
  Loader2,
  IdCard,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyLinkButton } from "@/app/dashboard/copy-link-button";

type Platform = "apple" | "google";

type AttemptState =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "success" }
  | { kind: "unavailable"; reason: string }
  | { kind: "error"; message: string };

const PLATFORM_LABEL: Record<Platform, string> = {
  apple: "Apple Wallet",
  google: "Google Wallet",
};

const PLATFORM_ICON: Record<Platform, typeof Smartphone> = {
  apple: Smartphone,
  google: Wallet,
};

export function JoinSuccess({
  restaurantSlug,
  customerId,
  fallbackUrl,
}: {
  restaurantSlug: string;
  customerId: string;
  fallbackUrl: string;
}) {
  const [primaryPlatform] = useState<Platform>(() =>
    typeof navigator !== "undefined" && /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)
      ? "apple"
      : "google",
  );
  const secondaryPlatform: Platform = primaryPlatform === "apple" ? "google" : "apple";

  const [appleState, setAppleState] = useState<AttemptState>({ kind: "idle" });
  const [googleState, setGoogleState] = useState<AttemptState>({ kind: "idle" });

  async function attempt(platform: Platform) {
    const setState = platform === "apple" ? setAppleState : setGoogleState;
    setState({ kind: "pending" });

    try {
      const response = await fetch("/api/v1/passes/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantSlug, customerId, platform }),
      });

      if (
        platform === "apple" &&
        response.ok &&
        response.headers.get("Content-Type")?.includes("pkpass")
      ) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${restaurantSlug}.pkpass`;
        link.click();
        URL.revokeObjectURL(url);
        setState({ kind: "success" });
        return;
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setState({
          kind: "error",
          message: data?.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      if (data?.walletUnavailable) {
        setState({
          kind: "unavailable",
          reason: `${PLATFORM_LABEL[platform]} isn't set up for this restaurant yet.`,
        });
        return;
      }

      if (platform === "google" && data?.saveUrl) {
        // Opened in a new tab, not a full navigation, so this success screen
        // (and its recovery actions) stays put behind it.
        window.open(data.saveUrl, "_blank", "noopener,noreferrer");
        setState({ kind: "success" });
        return;
      }

      setState({ kind: "error", message: "Something went wrong. Please try again." });
    } catch {
      setState({ kind: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="text-lg font-semibold text-white">Your card is ready</h3>
        <p className="text-sm text-zinc-400">
          Save it to your Wallet so you never lose it — your points update automatically
          every time the restaurant logs a visit.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <WalletButton
          platform={primaryPlatform}
          state={primaryPlatform === "apple" ? appleState : googleState}
          onPress={() => attempt(primaryPlatform)}
          primary
        />
        <WalletButton
          platform={secondaryPlatform}
          state={secondaryPlatform === "apple" ? appleState : googleState}
          onPress={() => attempt(secondaryPlatform)}
        />
      </div>

      <div className="flex items-center justify-center gap-3 border-t border-zinc-800 pt-4">
        <Button asChild variant="ghost" size="sm" className="min-h-11">
          <Link href={fallbackUrl}>
            <IdCard />
            Open my card
          </Link>
        </Button>
        <CopyLinkButton link={fallbackUrl} />
      </div>
    </div>
  );
}

function WalletButton({
  platform,
  state,
  onPress,
  primary = false,
}: {
  platform: Platform;
  state: AttemptState;
  onPress: () => void;
  primary?: boolean;
}) {
  const Icon = PLATFORM_ICON[platform];

  if (state.kind === "unavailable") {
    return (
      <p className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-400">
        <AlertCircle className="size-4 shrink-0 text-zinc-500" />
        {state.reason}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        type="button"
        size={primary ? "lg" : "default"}
        variant={primary ? "default" : "outline"}
        disabled={state.kind === "pending"}
        onClick={onPress}
        className={primary ? "min-h-11" : "min-h-11 border-zinc-800 text-zinc-300 hover:text-white"}
      >
        {state.kind === "pending" ? <Loader2 className="animate-spin" /> : <Icon />}
        Add to {PLATFORM_LABEL[platform]}
      </Button>
      {state.kind === "success" && (
        <p aria-live="polite" className="px-1 text-xs text-emerald-400">
          {platform === "apple"
            ? "Downloaded — open it to finish adding it to your Wallet."
            : "Opened Google Wallet in a new tab to finish saving."}
        </p>
      )}
      {state.kind === "error" && (
        <p role="alert" className="px-1 text-xs text-destructive">
          {state.message}
        </p>
      )}
    </div>
  );
}
