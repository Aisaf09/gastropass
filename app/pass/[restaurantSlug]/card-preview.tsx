import { Sparkles, Bell } from "lucide-react";

export function CardPreview({
  restaurantName,
  brandColor,
  pointsPerVisit,
}: {
  restaurantName: string;
  brandColor: string;
  pointsPerVisit: number;
}) {
  return (
    <div className="relative w-full [perspective:1200px]">
      {/* Warm ambient glow behind the card */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${brandColor}40, transparent 60%)`,
        }}
      />

      <div
        className="group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-zinc-950/80 p-6 shadow-2xl shadow-black/50 backdrop-blur-md transition-transform duration-500 [transform:rotateY(-8deg)_rotateX(4deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)]"
        style={{
          backgroundImage: `linear-gradient(135deg, ${brandColor}2e, transparent 65%)`,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white">{restaurantName}</span>
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        </div>

        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="text-4xl font-semibold tracking-tight text-white">0</p>
            <p className="text-xs text-zinc-400">points</p>
          </div>
          <Sparkles className="size-5" style={{ color: brandColor }} />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-zinc-400">Member</span>
          <span className="text-xs text-white">Your name</span>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Earn {pointsPerVisit} point{pointsPerVisit === 1 ? "" : "s"} every visit
        </p>

        {/* Decorative barcode preview */}
        <div
          className="mt-5 h-10 w-full rounded-md bg-white/90"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #09090b 0px, #09090b 2px, transparent 2px, transparent 5px, #09090b 5px, #09090b 6px, transparent 6px, transparent 10px)",
          }}
        />
      </div>

      {/* Simulated lock-screen notification */}
      <div className="absolute -right-3 -top-4 flex w-56 items-start gap-2 rounded-xl border border-zinc-800 bg-zinc-900/95 p-3 shadow-xl shadow-black/40 backdrop-blur-md sm:-right-6">
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-zinc-950"
          style={{ backgroundColor: brandColor }}
        >
          <Bell className="size-3.5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-white">{restaurantName}</p>
          <p className="truncate text-[11px] text-zinc-400">
            You earned {pointsPerVisit} point{pointsPerVisit === 1 ? "" : "s"} on your last visit
          </p>
        </div>
      </div>
    </div>
  );
}
