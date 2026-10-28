import { createRateLimiter } from "@/lib/api/rate-limit";

export const API_RATE_LIMIT = 60;
export const API_RATE_WINDOW_MS = 60_000;
export const MAX_API_TEXT_CHARS = 8_192;
export const MAX_API_TEXT_BYTES = 16_384;
export const MAX_API_BASE64_CHARS = 16_384;

const limiter = createRateLimiter({
  limit: API_RATE_LIMIT,
  windowMs: API_RATE_WINDOW_MS,
});

const baseHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
  "Content-Type": "application/json; charset=utf-8",
  "Cross-Origin-Resource-Policy": "cross-origin",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

export function apiResponse(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...baseHeaders, ...headers },
  });
}

export function apiOptionsResponse(): Response {
  return new Response(null, { status: 204, headers: baseHeaders });
}

export function apiError(
  code: string,
  message: string,
  status: number,
  headers: Record<string, string> = {}
): Response {
  return apiResponse(
    {
      success: false,
      error: { code, message },
      docs: "/api-reference",
    },
    status,
    headers
  );
}

function rateHeaders(rate: ReturnType<typeof limiter.check>): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(rate.limit),
    "X-RateLimit-Remaining": String(rate.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
    "X-RateLimit-Policy": `${rate.limit};w=${Math.ceil(API_RATE_WINDOW_MS / 1000)}`,
    ...(rate.allowed ? {} : { "Retry-After": String(rate.retryAfterSeconds) }),
  };
}

function clientKey(request: Request): string {
  // These headers are supplied by common reverse proxies. Keep only a bounded,
  // IP-shaped value so an attacker cannot grow the in-memory limiter key space.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const vercelIp = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  const candidate = vercelIp || realIp || forwarded || "unknown";

  return /^[a-f0-9:.[\]-]{1,128}$/i.test(candidate) ? candidate : "unknown";
}

export function checkApiRateLimit(request: Request): Record<string, string> | Response {
  const rate = limiter.check(clientKey(request));
  const headers = rateHeaders(rate);

  if (!rate.allowed) {
    return apiError(
      "RATE_LIMITED",
      "Rate limit exceeded. Try again after the Retry-After interval.",
      429,
      headers
    );
  }

  return headers;
}

export function isRateLimitResponse(value: Record<string, string> | Response): value is Response {
  return value instanceof Response;
}

export function validateQueryLength(
  value: string,
  maxCharacters: number,
  label: string
): string | null {
  if (value.length > maxCharacters) {
    return `The ${label} must be ${maxCharacters.toLocaleString()} characters or fewer.`;
  }

  return null;
}

export function validateUtf8Input(value: string): string | null {
  if (new TextEncoder().encode(value).byteLength > MAX_API_TEXT_BYTES) {
    return `The text must encode to ${MAX_API_TEXT_BYTES.toLocaleString()} UTF-8 bytes or fewer.`;
  }

  return null;
}
