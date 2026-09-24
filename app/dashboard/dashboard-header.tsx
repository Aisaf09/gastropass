"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardNav } from "./dashboard-nav";

export function DashboardHeader({
  restaurantName,
  showNav,
  signOutAction,
}: {
  restaurantName: string;
  showNav: boolean;
  signOutAction: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-10 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href="/dashboard"
            className="flex shrink-0 items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-rose-600 text-xs font-bold text-white">
              G
            </span>
            <span className="truncate text-sm font-semibold text-foreground">
              {restaurantName}
            </span>
          </Link>
          {showNav && <DashboardNav className="hidden lg:flex" />}
        </div>

        <div className="flex items-center gap-2">
          <form action={signOutAction} className="hidden lg:block">
            <Button type="submit" variant="ghost" size="sm">
              <LogOut />
              Sign out
            </Button>
          </form>
          {showNav && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex size-11 items-center justify-center rounded-lg border border-border text-muted-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          )}
          <form action={signOutAction} className="lg:hidden">
            <Button type="submit" variant="ghost" size="sm" className="min-h-11 min-w-11">
              <LogOut />
              <span className="sr-only">Sign out</span>
            </Button>
          </form>
        </div>
      </div>

      {open && showNav && (
        <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4 lg:hidden">
          <DashboardNav onNavigate={() => setOpen(false)} className="flex-col items-stretch" />
        </div>
      )}
    </header>
  );
}
