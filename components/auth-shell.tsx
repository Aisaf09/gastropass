import Link from "next/link";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/3 h-[420px] w-[420px] rounded-full bg-orange-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-rose-600 text-sm font-bold text-white shadow-lg shadow-orange-900/30">
          G
        </span>
        <span className="text-sm font-semibold tracking-tight text-foreground">GastroPass</span>
      </Link>

      {children}
    </main>
  );
}
