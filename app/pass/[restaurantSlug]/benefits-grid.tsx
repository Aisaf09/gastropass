import { Ban, BellRing, RefreshCw, WifiOff } from "lucide-react";

const benefits = [
  {
    icon: Ban,
    title: "Zero app friction",
    description: "No download, no account to create, no storage taken up on your phone.",
  },
  {
    icon: BellRing,
    title: "Lock-screen reach",
    description: "Wallet passes can notify you directly, without needing app permissions.",
  },
  {
    icon: RefreshCw,
    title: "Real-time points",
    description: "Your balance updates automatically the moment staff add a visit.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    description: "Your card and barcode stay available even without a connection.",
  },
];

export function BenefitsGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
          Why Wallet
        </span>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Built for how you already use your phone
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="group rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 backdrop-blur-md transition-colors hover:border-emerald-500/30"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
              <benefit.icon className="size-4" />
            </span>
            <p className="mt-4 text-sm font-semibold text-white">{benefit.title}</p>
            <p className="mt-1 text-sm text-zinc-400">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
