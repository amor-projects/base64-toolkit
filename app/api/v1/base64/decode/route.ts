import { decodeUtf8 } from "@/lib/base64";
import {
  apiError,
  apiOptionsResponse,
  apiResponse,
  checkApiRateLimit,
  isRateLimitResponse,
  MAX_API_BASE64_CHARS,
  validateQueryLength,
} from "@/lib/api/http";

type WhitespaceMode = "strip" | "reject";
type PaddingMode = "strict" | "optional" | "none";

export function OPTIONS(): Response {
  return apiOptionsResponse();
}

export function GET(request: Request): Response {
  const rateHeaders = checkApiRateLimit(request);
  if (isRateLimitResponse(rateHeaders)) return rateHeaders;

  const params = new URL(request.url).searchParams;
  if (!params.has("value")) {
    return apiError("MISSING_VALUE", "The `value` query parameter is required.", 400, rateHeaders);
  }

  const value = params.get("value") ?? "";
  const lengthError = validateQueryLength(value, MAX_API_BASE64_CHARS, "value");
  if (lengthError) return apiError("VALUE_TOO_LONG", lengthError, 413, rateHeaders);

  const format = params.get("format")?.toLowerCase() ?? "base64";
  if (format !== "base64" && format !== "base64url" && format !== "auto") {
    return apiError(
      "INVALID_FORMAT",
      "The `format` parameter must be `base64`, `base64url`, or `auto`.",
      400,
      rateHeaders
    );
  }

  const whitespace = params.get("whitespace")?.toLowerCase() ?? "reject";
  if (whitespace !== "strip" && whitespace !== "reject") {
    return apiError(
      "INVALID_WHITESPACE_MODE",
      "The `whitespace` parameter must be `strip` or `reject`.",
      400,
      rateHeaders
    );
  }

  const padding = params.get("padding")?.toLowerCase() ?? "optional";
  if (padding !== "strict" && padding !== "optional" && padding !== "none") {
    return apiError(
      "INVALID_PADDING_MODE",
      "The `padding` parameter must be `strict`, `optional`, or `none`.",
      400,
      rateHeaders
    );
  }

  const decoded = decodeUtf8(value, {
    urlSafe: format === "auto" ? undefined : format === "base64url",
    whitespace: whitespace as WhitespaceMode,
    paddingMode: padding as PaddingMode,
  });

  if (!decoded.success) {
    return apiError("INVALID_BASE64", decoded.error.message, 422, rateHeaders);
  }

  return apiResponse(
    {
      success: true,
      data: {
        decoded: decoded.data,
        format,
        whitespace,
        padding,
        inputCharacters: value.length,
        outputBytes: new TextEncoder().encode(decoded.data).byteLength,
      },
    },
    200,
    rateHeaders
  );
}
