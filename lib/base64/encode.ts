/**
 * Base64 Toolkit — Encoding Core
 * Pure TypeScript, framework-independent encoding functions for binary data and UTF-8 strings.
 */

import { Base64EncodeOptions } from "./types";

/**
 * Standard Base64 characters (RFC 4648 §4)
 */
const B64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * URL-safe Base64 characters (RFC 4648 §5)
 */
const B64_URL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/**
 * Converts a Uint8Array into a Base64 or Base64URL string using a chunk-safe algorithm.
 * Avoids String.fromCharCode argument stack overflows for large byte inputs.
 */
export function bytesToBase64(
  bytes: Uint8Array,
  options: Base64EncodeOptions = {}
): string {
  const { urlSafe = false, pad = true } = options;
  const alphabet = urlSafe ? B64_URL_CHARS : B64_CHARS;
  const len = bytes.length;

  if (len === 0) {
    return "";
  }

  // Fast path: use built-in btoa for moderate inputs with chunking
  // Process in chunks of 8190 (multiple of 3 to preserve byte-boundary) to avoid stack limits
  const CHUNK_SIZE = 8190;
  let base64 = "";

  if (typeof btoa === "function" && !urlSafe) {
    for (let i = 0; i < len; i += CHUNK_SIZE) {
      const chunk = bytes.subarray(i, Math.min(i + CHUNK_SIZE, len));
      let binaryStr = "";
      for (let j = 0; j < chunk.length; j++) {
        binaryStr += String.fromCharCode(chunk[j]);
      }
      base64 += btoa(binaryStr);
    }
  } else {
    // Pure lookup table implementation (used for Base64URL or environments without btoa)
    const parts: string[] = [];
    let i = 0;

    while (i < len) {
      const b0 = bytes[i++];
      const b1 = i < len ? bytes[i++] : -1;
      const b2 = i < len ? bytes[i++] : -1;

      const c0 = b0 >> 2;
      const c1 = ((b0 & 0x03) << 4) | (b1 !== -1 ? b1 >> 4 : 0);
      const c2 = b1 !== -1 ? ((b1 & 0x0f) << 2) | (b2 !== -1 ? b2 >> 6 : 0) : -1;
      const c3 = b2 !== -1 ? b2 & 0x3f : -1;

      parts.push(alphabet[c0]);
      parts.push(alphabet[c1]);

      if (c2 !== -1) {
        parts.push(alphabet[c2]);
      } else if (pad) {
        parts.push("=");
      }

      if (c3 !== -1) {
        parts.push(alphabet[c3]);
      } else if (pad) {
        parts.push("=");
      }
    }

    base64 = parts.join("");
  }

  // Handle URL-safe conversion or padding adjustments if btoa path was taken
  if (urlSafe && (base64.includes("+") || base64.includes("/"))) {
    base64 = base64.replace(/\+/g, "-").replace(/\//g, "_");
  }

  if (!pad && base64.endsWith("=")) {
    base64 = base64.replace(/=+$/, "");
  }

  return base64;
}

/**
 * Encodes an arbitrary UTF-8 string into standard Base64 or Base64URL.
 * Correctly handles multi-byte characters, emojis, and control codes using TextEncoder.
 */
export function encodeUtf8(
  text: string,
  options: Base64EncodeOptions = {}
): string {
  if (!text) {
    return "";
  }

  // TextEncoder is guaranteed to output valid UTF-8 byte sequences
  const bytes = new TextEncoder().encode(text);
  return bytesToBase64(bytes, options);
}
