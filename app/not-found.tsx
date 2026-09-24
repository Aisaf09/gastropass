import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/3 h-[420px] w-[420px] rounded-full bg-orange-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-400">
        <Compass className="size-6" />
      </span>
      <p className="mt-6 bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-6xl font-bold text-transparent">
        404
      </p>
      <h1 className="mt-2 text-xl font-semibold text-foreground">This page took a wrong turn</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist, or the link may be out of date.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <Home />
          Back to home
        </Link>
      </Button>
    </main>
  );
}
