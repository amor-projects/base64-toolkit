/**
 * Base64 Toolkit — Size & Calculation Utilities
 */

/**
 * Calculates the exact UTF-8 byte count of a JavaScript string using TextEncoder.
 */
export function calculateUtf8ByteLength(text: string): number {
  if (!text) return 0;
  return new TextEncoder().encode(text).length;
}

/**
 * Calculates the exact character count of encoded Base64 for a given number of raw bytes.
 *
 * Mathematical basis:
 * Each 3 bytes are mapped to 4 6-bit Base64 characters.
 * With padding: Math.ceil(byteCount / 3) * 4
 * Without padding: Math.ceil((byteCount * 4) / 3)
 */
export function estimateBase64Length(byteCount: number, pad = true): number {
  if (byteCount <= 0) return 0;
  if (pad) {
    return Math.ceil(byteCount / 3) * 4;
  }
  return Math.ceil((byteCount * 4) / 3);
}

/**
 * Calculates the exact byte length represented by a valid Base64 string.
 * Strips whitespace before calculating. Returns -1 if the string is inherently malformed.
 */
export function estimateDecodedByteLength(base64String: string): number {
  const cleaned = base64String.replace(/[\s\r\n\t]/g, "");
  if (!cleaned) return 0;

  let paddingCount = 0;
  if (cleaned.endsWith("==")) {
    paddingCount = 2;
  } else if (cleaned.endsWith("=")) {
    paddingCount = 1;
  }

  const unpaddedLength = cleaned.length - paddingCount;
  const remainder = unpaddedLength % 4;

  if (remainder === 1) {
    // 1 base64 char = 6 bits, which is less than a single 8-bit byte. Impossible length.
    return -1;
  }

  // 4 base64 chars = 3 bytes
  const fullBlocks = Math.floor(unpaddedLength / 4) * 3;
  const partialBytes = remainder === 2 ? 1 : remainder === 3 ? 2 : 0;

  return fullBlocks + partialBytes;
}

/**
 * Detects whether a string conforms to standard Base64, Base64URL, is ambiguous, or contains invalid characters.
 */
export function detectBase64Format(
  input: string
): "standard" | "base64url" | "ambiguous" | "mixed" | "invalid" {
  const cleaned = input.replace(/[\s\r\n\t]/g, "");
  if (!cleaned) return "ambiguous";

  let hasStandard = false;
  let hasUrlSafe = false;

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === "+" || char === "/") {
      hasStandard = true;
    } else if (char === "-" || char === "_") {
      hasUrlSafe = true;
    } else if (char === "=") {
      // Padding is allowed in standard and optionally in base64url
      continue;
    } else if (
      (char >= "A" && char <= "Z") ||
      (char >= "a" && char <= "z") ||
      (char >= "0" && char <= "9")
    ) {
      continue;
    } else {
      return "invalid";
    }
  }

  if (hasStandard && hasUrlSafe) return "mixed";
  if (hasStandard) return "standard";
  if (hasUrlSafe) return "base64url";
  return "ambiguous";
}
