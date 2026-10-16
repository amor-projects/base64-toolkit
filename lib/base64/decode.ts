/**
 * Base64 Toolkit — Decoding Core
 * Pure TypeScript, framework-independent decoding functions for binary data and UTF-8 strings.
 */

import { Base64DecodeOptions, Base64Error, Base64Result } from "./types";

/**
 * Fast reverse lookup table for 7-bit ASCII characters.
 * Values:
 * 0-63: valid character indices
 * -1: invalid character
 * -2: padding character '='
 * -3: whitespace character
 */
const DECODE_TABLE = new Int8Array(128).fill(-1);
const URL_DECODE_TABLE = new Int8Array(128).fill(-1);

// Initialize standard table
const STD_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (let i = 0; i < STD_CHARS.length; i++) {
  DECODE_TABLE[STD_CHARS.charCodeAt(i)] = i;
}
DECODE_TABLE["=".charCodeAt(0)] = -2;

// Whitespace indicators
const WS_CHARS = " \t\r\n\f\v";
for (let i = 0; i < WS_CHARS.length; i++) {
  DECODE_TABLE[WS_CHARS.charCodeAt(i)] = -3;
  URL_DECODE_TABLE[WS_CHARS.charCodeAt(i)] = -3;
}

// Initialize URL-safe table
const URL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
for (let i = 0; i < URL_CHARS.length; i++) {
  URL_DECODE_TABLE[URL_CHARS.charCodeAt(i)] = i;
}
URL_DECODE_TABLE["=".charCodeAt(0)] = -2;

/**
 * Decodes a Base64 or Base64URL string into raw binary bytes (Uint8Array).
 * Provides strict validation and typed error reporting.
 */
export function base64ToBytes(
  input: string,
  options: Base64DecodeOptions = {}
): Base64Result<Uint8Array> {
  const { whitespace = "strip", urlSafe, paddingMode = "optional" } = options;

  if (!input) {
    return { success: true, data: new Uint8Array(0) };
  }

  // 1. Whitespace handling
  const hasWhitespace = /[\s\r\n\t]/.test(input);
  if (hasWhitespace && whitespace === "reject") {
    return {
      success: false,
      error: new Base64Error(
        "DISALLOWED_WHITESPACE",
        "Input contains whitespace, which is prohibited under the current strict decoding policy."
      ),
    };
  }

  const sanitized = whitespace === "strip" ? input.replace(/[\s\r\n\t]/g, "") : input;
  if (sanitized.length === 0) {
    return { success: true, data: new Uint8Array(0) };
  }

  // 2. Validate URL-safe vs Standard mode consistency
  const hasStandardChars = sanitized.includes("+") || sanitized.includes("/");
  const hasUrlChars = sanitized.includes("-") || sanitized.includes("_");

  if (urlSafe === true && hasStandardChars) {
    return {
      success: false,
      error: new Base64Error(
        "INVALID_CHARACTER",
        "Standard Base64 character ('+' or '/') encountered when Base64URL format was expected."
      ),
    };
  }

  if (urlSafe === false && hasUrlChars) {
    return {
      success: false,
      error: new Base64Error(
        "INVALID_CHARACTER",
        "Base64URL character ('-' or '_') encountered when standard Base64 format was expected."
      ),
    };
  }

  if (hasStandardChars && hasUrlChars) {
    return {
      success: false,
      error: new Base64Error(
        "INVALID_CHARACTER",
        "Input mixes standard ('+', '/') and URL-safe ('-', '_') Base64 characters in the same payload."
      ),
    };
  }

  // Auto-select decoding table based on detected alphabet
  const isUrlMode = urlSafe === true || (!hasStandardChars && hasUrlChars);
  const table = isUrlMode ? URL_DECODE_TABLE : DECODE_TABLE;

  // 3. Inspect characters and padding structure
  let paddingCount = 0;
  let paddingStarted = false;

  for (let i = 0; i < sanitized.length; i++) {
    const code = sanitized.charCodeAt(i);
    if (code >= 128) {
      return {
        success: false,
        error: new Base64Error(
          "INVALID_CHARACTER",
          `Invalid character '${sanitized[i]}' (code ${code}) at position ${i}. Base64 only allows ASCII alphabet characters.`
        ),
      };
    }

    const val = table[code];
    if (val === -1 || val === -3) {
      return {
        success: false,
        error: new Base64Error(
          "INVALID_CHARACTER",
          `Invalid character '${sanitized[i]}' at position ${i}. Not in ${isUrlMode ? "Base64URL" : "Base64"} alphabet.`
        ),
      };
    }

    if (val === -2) {
      paddingStarted = true;
      paddingCount++;
    } else if (paddingStarted) {
      return {
        success: false,
        error: new Base64Error(
          "INVALID_PADDING",
          `Invalid padding: character '${sanitized[i]}' appears after padding '=' at position ${i}.`
        ),
      };
    }
  }

  // 4. Validate padding count and length
  if (paddingCount > 2) {
    return {
      success: false,
      error: new Base64Error(
        "INVALID_PADDING",
        `Malformed input: found ${paddingCount} '=' padding characters. Maximum allowed is 2.`
      ),
    };
  }

  if (paddingMode === "strict" && sanitized.length % 4 !== 0) {
    return {
      success: false,
      error: new Base64Error(
        "INVALID_LENGTH",
        `Strict padding mode required: input length (${sanitized.length}) must be a multiple of 4.`
      ),
    };
  }

  if (paddingMode === "none" && paddingCount > 0) {
    return {
      success: false,
      error: new Base64Error(
        "INVALID_PADDING",
        "Padding is prohibited when paddingMode is 'none'."
      ),
    };
  }

  const unpaddedLength = sanitized.length - paddingCount;
  const remainder = unpaddedLength % 4;

  if (remainder === 1) {
    return {
      success: false,
      error: new Base64Error(
        "INVALID_LENGTH",
        `Malformed Base64 string: length without padding is ${unpaddedLength} (modulo 4 is 1). A single Base64 character contains only 6 bits and cannot form a valid byte.`
      ),
    };
  }

  // 5. Decode into bytes
  // Calculate output byte size
  const fullBlocks = Math.floor(unpaddedLength / 4) * 3;
  const partialBytes = remainder === 2 ? 1 : remainder === 3 ? 2 : 0;
  const outputLength = fullBlocks + partialBytes;
  const output = new Uint8Array(outputLength);

  let inIdx = 0;
  let outIdx = 0;

  while (inIdx < unpaddedLength) {
    const charsRemaining = unpaddedLength - inIdx;

    if (charsRemaining >= 4) {
      const c0 = table[sanitized.charCodeAt(inIdx++)];
      const c1 = table[sanitized.charCodeAt(inIdx++)];
      const c2 = table[sanitized.charCodeAt(inIdx++)];
      const c3 = table[sanitized.charCodeAt(inIdx++)];

      output[outIdx++] = (c0 << 2) | (c1 >> 4);
      output[outIdx++] = ((c1 & 0x0f) << 4) | (c2 >> 2);
      output[outIdx++] = ((c2 & 0x03) << 6) | c3;
    } else if (charsRemaining === 3) {
      const c0 = table[sanitized.charCodeAt(inIdx++)];
      const c1 = table[sanitized.charCodeAt(inIdx++)];
      const c2 = table[sanitized.charCodeAt(inIdx++)];

      output[outIdx++] = (c0 << 2) | (c1 >> 4);
      output[outIdx++] = ((c1 & 0x0f) << 4) | (c2 >> 2);
      break;
    } else if (charsRemaining === 2) {
      const c0 = table[sanitized.charCodeAt(inIdx++)];
      const c1 = table[sanitized.charCodeAt(inIdx++)];

      output[outIdx++] = (c0 << 2) | (c1 >> 4);
      break;
    }
  }

  return { success: true, data: output };
}

/**
 * Decodes a Base64 or Base64URL string into a UTF-8 text string.
 * Strictly verifies UTF-8 byte sequences using fatal TextDecoder to prevent silent data corruption.
 */
export function decodeUtf8(
  input: string,
  options: Base64DecodeOptions = {}
): Base64Result<string> {
  const byteResult = base64ToBytes(input, options);
  if (!byteResult.success) {
    return byteResult;
  }

  const bytes = byteResult.data;
  if (bytes.length === 0) {
    return { success: true, data: "" };
  }

  try {
    // fatal: true ensures invalid UTF-8 throws instead of inserting replacement characters (U+FFFD)
    const textDecoder = new TextDecoder("utf-8", { fatal: true });
    const text = textDecoder.decode(bytes);
    return { success: true, data: text };
  } catch {
    return {
      success: false,
      error: new Base64Error(
        "INVALID_UTF8",
        "The decoded bytes do not represent valid UTF-8 text. The data appears to be a binary file, an image, or encoded in a different character set. Please use the Base64-to-file utility to download raw binary content."
      ),
    };
  }
}
