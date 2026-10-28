export interface RateLimitOptions {
  limit: number;
  windowMs: number;
  now?: () => number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimiter {
  check(key: string): RateLimitResult;
}

/**
 * A small fixed-window limiter for routes that do not persist user payloads.
 * The store is intentionally bounded and process-local. A multi-instance
 * deployment should replace this with a shared store for globally consistent
 * quotas.
 */
export function createRateLimiter(options: RateLimitOptions): RateLimiter {
  const { limit, windowMs, now = Date.now } = options;
  const buckets = new Map<string, Bucket>();
  const maxBuckets = 10_000;

  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("Rate-limit limit must be a positive integer.");
  }

  if (!Number.isFinite(windowMs) || windowMs <= 0) {
    throw new Error("Rate-limit window must be greater than zero.");
  }

  return {
    check(key: string): RateLimitResult {
      const currentTime = now();
      const currentBucket = buckets.get(key);

      if (!currentBucket || currentBucket.resetAt <= currentTime) {
        if (buckets.size >= maxBuckets) {
          for (const [bucketKey, bucket] of buckets) {
            if (bucket.resetAt <= currentTime) {
              buckets.delete(bucketKey);
            }
          }

          if (buckets.size >= maxBuckets) {
            const oldestKey = buckets.keys().next().value;
            if (oldestKey !== undefined) {
              buckets.delete(oldestKey);
            }
          }
        }

        const resetAt = currentTime + windowMs;
        buckets.set(key, { count: 1, resetAt });

        return {
          allowed: true,
          limit,
          remaining: limit - 1,
          resetAt,
          retryAfterSeconds: Math.ceil(windowMs / 1000),
        };
      }

      currentBucket.count += 1;
      const remaining = Math.max(0, limit - currentBucket.count);
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((currentBucket.resetAt - currentTime) / 1000)
      );

      return {
        allowed: currentBucket.count <= limit,
        limit,
        remaining,
        resetAt: currentBucket.resetAt,
        retryAfterSeconds,
      };
    },
  };
}
