/**
 * Base64 Toolkit — Core Types & Error Representations
 * Framework-independent pure TypeScript types for Base64 and Base64URL conversions.
 */

export type Base64ErrorCode =
  | "INVALID_CHARACTER"
  | "INVALID_LENGTH"
  | "INVALID_PADDING"
  | "DISALLOWED_WHITESPACE"
  | "INVALID_UTF8"
  | "UNEXPECTED_ERROR"
  | "INVALID_DATA_URI"
  | "NOT_A_DATA_URI"
  | "MALFORMED_DATA_URI"
  | "NO_FILE"
  | "FILE_TOO_LARGE"
  | "READ_FAILED"
  | "ENCODE_FAILED"
  | "BLOB_FAILED";

export class Base64Error extends Error {
  readonly code: Base64ErrorCode;
  readonly details?: string;

  constructor(code: Base64ErrorCode, message: string, details?: string) {
    super(message);
    this.name = "Base64Error";
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, Base64Error.prototype);
  }
}

export type Base64Result<T> =
  | { success: true; data: T }
  | { success: false; error: Base64Error };

export interface Base64EncodeOptions {
  /** If true, produces RFC 4648 §5 Base64URL output replacing '+' with '-' and '/' with '_' */
  urlSafe?: boolean;
  /**
   * For standard Base64, padding is included by default (true).
   * For Base64URL, padding can be omitted (pad: false) per RFC 4648 §5.
   */
  pad?: boolean;
}

export interface Base64DecodeOptions {
  /**
   * If true, strictly expects Base64URL characters ('-' and '_').
   * If false, strictly expects standard Base64 characters ('+' and '/').
   * If undefined/auto, permits standard or URL-safe characters as long as they are internally consistent.
   */
  urlSafe?: boolean;

  /**
   * How whitespace (spaces, tabs, newlines \r, \n) should be handled:
   * - 'strip': removes ASCII whitespace before decoding (default, user-friendly).
   * - 'reject': strictly fails if whitespace is detected.
   */
  whitespace?: "strip" | "reject";

  /**
   * Whether padding ('=') is required, optional, or prohibited.
   * Defaults to 'optional' (validates correct padding if present, but permits unpadded input).
   */
  paddingMode?: "strict" | "optional" | "none";
}

export interface Base64Metrics {
  charCount: number;
  byteCount: number;
  estimatedEncodedLength: number;
}
