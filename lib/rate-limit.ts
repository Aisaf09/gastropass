const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

/**
 * In-memory sliding-window limiter for public server actions. Per-process
 * only (resets on redeploy, not shared across instances) — good enough to
 * blunt casual form-spam on a single small deployment, not a substitute for
 * a real rate limiter behind a CDN/WAF at scale.
 */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
