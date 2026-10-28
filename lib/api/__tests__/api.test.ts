import { describe, expect, it } from "vitest";
import { createRateLimiter } from "../rate-limit";
import { GET as encodeGet } from "../../../app/api/v1/base64/encode/route";
import { GET as decodeGet } from "../../../app/api/v1/base64/decode/route";

describe("fixed-window rate limiter", () => {
  it("allows the configured number of requests and reports retry time", () => {
    let now = 1_000;
    const limiter = createRateLimiter({
      limit: 2,
      windowMs: 10_000,
      now: () => now,
    });

    expect(limiter.check("client")).toMatchObject({ allowed: true, remaining: 1 });
    expect(limiter.check("client")).toMatchObject({ allowed: true, remaining: 0 });
    expect(limiter.check("client")).toMatchObject({
      allowed: false,
      remaining: 0,
      retryAfterSeconds: 10,
    });

    now += 10_000;
    expect(limiter.check("client")).toMatchObject({ allowed: true, remaining: 1 });
  });
});

describe("Base64 API routes", () => {
  it("encodes UTF-8 text and returns security/rate-limit headers", async () => {
    const response = encodeGet(new Request("http://localhost/api/v1/base64/encode?text=Hello%20%F0%9F%8C%8D&format=base64url"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-ratelimit-limit")).toBe("60");
    expect(body.data.encoded).toBe("SGVsbG8g8J-MjQ");
  });

  it("decodes valid Base64 and rejects malformed padding", async () => {
    const response = decodeGet(new Request("http://localhost/api/v1/base64/decode?value=SGVsbG8gV29ybGQ="));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.decoded).toBe("Hello World");

    const invalid = decodeGet(new Request("http://localhost/api/v1/base64/decode?value=Zg="));
    expect(invalid.status).toBe(422);
  });

  it("rejects unsupported formats before processing input", async () => {
    const response = encodeGet(new Request("http://localhost/api/v1/base64/encode?text=hello&format=hex"));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("INVALID_FORMAT");
  });
});
