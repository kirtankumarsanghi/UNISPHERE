const buckets = new Map<string, { count: number; resetAt: number }>();

export function enforceRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const item = buckets.get(key);

  if (!item || item.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (item.count >= limit) {
    return { ok: false, remaining: 0, resetAt: item.resetAt };
  }

  item.count += 1;
  buckets.set(key, item);
  return { ok: true, remaining: Math.max(0, limit - item.count), resetAt: item.resetAt };
}