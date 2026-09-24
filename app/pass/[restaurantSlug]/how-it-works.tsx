import { ScanLine, Zap, BellRing } from "lucide-react";

const steps = [
  {
    icon: ScanLine,
    title: "Tap or scan at the table",
    description: "Hold your phone to the NFC tag, or scan the QR code on the table.",
  },
  {
    icon: Zap,
    title: "One tap to install",
    description: "Your card is added straight to Wallet — no App Store, no download.",
  },
  {
    icon: BellRing,
    title: "Earn points, get notified",
    description: "Every visit adds points, with updates that show right on your lock screen.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-orange-400">
          How it works
        </span>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          From table to Wallet in three steps
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md transition-colors hover:border-orange-500/30">
              <div
                className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full opacity-20 blur-2xl"
                style={{ background: "radial-gradient(circle, #fb923c, transparent 70%)" }}
              />
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 text-sm font-semibold text-orange-400">
                  {i + 1}
                </span>
                <step.icon className="size-5 text-orange-400" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">{step.title}</p>
              <p className="mt-1 text-sm text-zinc-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
