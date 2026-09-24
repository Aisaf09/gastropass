"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BellRing, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/notifications", label: "Notifications", icon: BellRing },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardNav({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-1 text-sm", className)}>
      {links.map((link) => {
        const active =
          link.href === "/dashboard" ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
              active
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
            )}
          >
            <link.icon className="size-3.5" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
