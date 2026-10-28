import { encodeUtf8 } from "@/lib/base64";
import {
  apiError,
  apiOptionsResponse,
  apiResponse,
  checkApiRateLimit,
  isRateLimitResponse,
  MAX_API_TEXT_CHARS,
  validateQueryLength,
  validateUtf8Input,
} from "@/lib/api/http";

type OutputFormat = "base64" | "base64url";

function parseFormat(value: string | null): OutputFormat | null {
  if (!value || value === "base64" || value === "standard") return "base64";
  if (value === "base64url") return "base64url";
  return null;
}

export function OPTIONS(): Response {
  return apiOptionsResponse();
}

export function GET(request: Request): Response {
  const rateHeaders = checkApiRateLimit(request);
  if (isRateLimitResponse(rateHeaders)) return rateHeaders;

  const params = new URL(request.url).searchParams;
  if (!params.has("text")) {
    return apiError("MISSING_TEXT", "The `text` query parameter is required.", 400, rateHeaders);
  }

  const text = params.get("text") ?? "";
  const lengthError = validateQueryLength(text, MAX_API_TEXT_CHARS, "text value");
  if (lengthError) return apiError("TEXT_TOO_LONG", lengthError, 413, rateHeaders);

  const byteError = validateUtf8Input(text);
  if (byteError) return apiError("TEXT_TOO_LARGE", byteError, 413, rateHeaders);

  const format = parseFormat(params.get("format")?.toLowerCase() ?? null);
  if (!format) {
    return apiError(
      "INVALID_FORMAT",
      "The `format` parameter must be `base64` or `base64url`.",
      400,
      rateHeaders
    );
  }

  const padding = params.get("padding")?.toLowerCase() ?? (format === "base64url" ? "omit" : "include");
  if (padding !== "include" && padding !== "omit") {
    return apiError(
      "INVALID_PADDING",
      "The `padding` parameter must be `include` or `omit`.",
      400,
      rateHeaders
    );
  }

  const encoded = encodeUtf8(text, {
    urlSafe: format === "base64url",
    pad: padding === "include",
  });

  return apiResponse(
    {
      success: true,
      data: {
        encoded,
        format,
        padding,
        inputCharacters: text.length,
        inputBytes: new TextEncoder().encode(text).byteLength,
        encodedCharacters: encoded.length,
      },
    },
    200,
    rateHeaders
  );
}
