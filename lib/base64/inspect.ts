/**
 * Base64 Toolkit — Inspection & Diagnostic Utilities
 * Validates syntax, examines magic byte signatures, and computes size expansion mechanics.
 */

import { base64ToBytes } from "./decode";
import { estimateBase64Length } from "./utils";

export interface MagicByteSignature {
  mimeType: string;
  extension: string;
  label: string;
  confidence: "inferred";
  description: string;
}

export interface Base64InspectionReport {
  isValidBase64: boolean;
  alphabet: "standard" | "base64url" | "ambiguous" | "mixed" | "invalid";
  inputLength: number;
  unpaddedLength: number;
  paddingCount: number;
  paddingStatus: "valid" | "missing" | "malformed" | "none_needed";
  decodedByteCount: number;
  estimatedExpansionPercent: number;
  inferredFormat: MagicByteSignature | null;
  syntaxDiagnostics: string[];
  limitationsNotice: string;
}

/**
 * Checks magic byte signatures from the decoded byte array.
 * Note: These types are inferred from leading bytes; an arbitrary Base64 string does not carry verifiable metadata.
 */
export function inferMimeFromBytes(bytes: Uint8Array): MagicByteSignature | null {
  if (bytes.length < 3) return null;

  // 1. PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return {
      mimeType: "image/png",
      extension: "png",
      label: "PNG Image",
      confidence: "inferred",
      description: "Detected standard PNG 8-byte file signature (\\x89PNG\\r\\n\\x1a\\n).",
    };
  }

  // 2. JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return {
      mimeType: "image/jpeg",
      extension: "jpg",
      label: "JPEG Image",
      confidence: "inferred",
      description: "Detected standard JPEG Start of Image (SOI) marker (0xFFD8FF).",
    };
  }

  // 3. GIF: 47 49 46 38 ('GIF8')
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return {
      mimeType: "image/gif",
      extension: "gif",
      label: "GIF Image",
      confidence: "inferred",
      description: "Detected GIF header signature ('GIF87a' or 'GIF89a').",
    };
  }

  // 4. WebP: 52 49 46 46 (RIFF) ... 57 45 42 50 (WEBP)
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return {
      mimeType: "image/webp",
      extension: "webp",
      label: "WebP Image",
      confidence: "inferred",
      description: "Detected RIFF container with WEBP chunk identifier.",
    };
  }

  // 5. PDF: 25 50 44 46 ('%PDF')
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  ) {
    return {
      mimeType: "application/pdf",
      extension: "pdf",
      label: "PDF Document",
      confidence: "inferred",
      description: "Detected Adobe PDF file header ('%PDF').",
    };
  }

  // 6. ZIP / Office OpenXML: 50 4B 03 04 ('PK..')
  if (
    bytes.length >= 4 &&
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x03 &&
    bytes[3] === 0x04
  ) {
    return {
      mimeType: "application/zip",
      extension: "zip",
      label: "ZIP Archive",
      confidence: "inferred",
      description: "Detected PKZIP local file header signature ('PK\\x03\\x04').",
    };
  }

  // 7. GZIP: 1F 8B
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
    return {
      mimeType: "application/gzip",
      extension: "gz",
      label: "GZip Compressed Archive",
      confidence: "inferred",
      description: "Detected standard GZIP compression magic bytes (0x1F8B).",
    };
  }

  // 8. Plain text checks (UTF-8 XML / SVG / JSON)
  try {
    const textPreview = new TextDecoder("utf-8", { fatal: true }).decode(
      bytes.subarray(0, Math.min(bytes.length, 512))
    );
    const trimmedText = textPreview.trim();
    if (trimmedText.startsWith("<svg") || (trimmedText.startsWith("<?xml") && trimmedText.includes("<svg"))) {
      return {
        mimeType: "image/svg+xml",
        extension: "svg",
        label: "SVG Vector Graphic",
        confidence: "inferred",
        description: "Decoded text begins with SVG XML markup.",
      };
    }
    if (trimmedText.startsWith("{") || trimmedText.startsWith("[")) {
      return {
        mimeType: "application/json",
        extension: "json",
        label: "JSON Document",
        confidence: "inferred",
        description: "Decoded text begins with JSON object or array character.",
      };
    }
    return {
      mimeType: "text/plain",
      extension: "txt",
      label: "Plain UTF-8 Text",
      confidence: "inferred",
      description: "Decoded bytes conform to valid UTF-8 character sequences.",
    };
  } catch {
    // Binary octet stream
    return {
      mimeType: "application/octet-stream",
      extension: "bin",
      label: "Generic Binary Data",
      confidence: "inferred",
      description: "Bytes do not form valid UTF-8 text or a known file header.",
    };
  }
}

/**
 * Performs deep inspection of a Base64 or Base64URL string.
 */
export function inspectBase64(input: string): Base64InspectionReport {
  let cleanInput = input.trim();

  // Strip Data URI prefix if present for inspection
  if (cleanInput.startsWith("data:")) {
    const comma = cleanInput.indexOf(",");
    if (comma !== -1) {
      cleanInput = cleanInput.substring(comma + 1).trim();
    }
  }

  // Strip internal whitespace for length calculation
  const stripped = cleanInput.replace(/[\s\r\n\t]/g, "");
  const unpadded = stripped.replace(/=+$/, "");
  const paddingCount = stripped.length - unpadded.length;

  const diagnostics: string[] = [];

  // Determine alphabet
  const hasPlus = unpadded.includes("+");
  const hasSlash = unpadded.includes("/");
  const hasMinus = unpadded.includes("-");
  const hasUnderscore = unpadded.includes("_");

  let alphabet: "standard" | "base64url" | "ambiguous" | "mixed" | "invalid" = "ambiguous";

  if ((hasPlus || hasSlash) && (hasMinus || hasUnderscore)) {
    alphabet = "mixed";
    diagnostics.push("Invalid: String mixes standard characters (+, /) with URL-safe characters (-, _).");
  } else if (hasPlus || hasSlash) {
    alphabet = "standard";
  } else if (hasMinus || hasUnderscore) {
    alphabet = "base64url";
  }

  // Check for disallowed characters
  const invalidChars = unpadded.replace(/[A-Za-z0-9+/_-]/g, "");
  if (invalidChars.length > 0) {
    alphabet = "invalid";
    diagnostics.push(`Invalid: Contains illegal non-Base64 characters: ${JSON.stringify(invalidChars.substring(0, 10))}.`);
  }

  // Padding verification
  let paddingStatus: "valid" | "missing" | "malformed" | "none_needed" = "valid";
  if (stripped.length % 4 !== 0 && paddingCount === 0) {
    paddingStatus = "missing";
    diagnostics.push(`Unpadded input: Length is ${stripped.length} (needs ${4 - (stripped.length % 4)} padding character(s) for standard 4-char alignment).`);
  } else if (paddingCount > 2) {
    paddingStatus = "malformed";
    diagnostics.push(`Malformed padding: Found ${paddingCount} '=' characters (maximum allowed is 2).`);
  } else if (cleanInput.indexOf("=") !== -1 && cleanInput.indexOf("=") < stripped.length - paddingCount) {
    paddingStatus = "malformed";
    diagnostics.push("Malformed padding: '=' padding character appears in the middle of data.");
  }

  // Length modulo 4 rule
  if (unpadded.length % 4 === 1) {
    diagnostics.push("Impossible length: Base64 cannot have an unpadded length modulo 4 equal to 1 (1 character carries only 6 bits, insufficient for a single 8-bit byte).");
  }

  // Try decoding bytes to check magic headers
  const byteRes = base64ToBytes(stripped);
  const isValid = byteRes.success && diagnostics.length === 0;
  const decodedBytes = byteRes.success ? byteRes.data : new Uint8Array(0);

  const inferred = byteRes.success ? inferMimeFromBytes(decodedBytes) : null;

  return {
    isValidBase64: isValid,
    alphabet,
    inputLength: input.length,
    unpaddedLength: unpadded.length,
    paddingCount,
    paddingStatus,
    decodedByteCount: decodedBytes.length,
    estimatedExpansionPercent: decodedBytes.length > 0 ? Math.round(((stripped.length - decodedBytes.length) / decodedBytes.length) * 100) : 33,
    inferredFormat: inferred,
    syntaxDiagnostics: diagnostics,
    limitationsNotice:
      "Important: MIME types and file extensions are inferred solely from leading magic byte patterns. Raw Base64 strings do not store the original file name or creation metadata.",
  };
}

export interface SizeMetricsResult {
  binaryBytes: number;
  base64Chars: number;
  dataUriChars: number;
  overheadBytes: number;
  overheadPercent: number;
  networkEfficiencyRatio: string;
}

/**
 * Calculates accurate size expansion metrics for a given binary byte size.
 */
export function calculateSizeMetrics(
  binaryBytes: number,
  mimeType = "image/png"
): SizeMetricsResult {
  const base64Chars = estimateBase64Length(binaryBytes, true);
  const dataUriPrefixLength = `data:${mimeType};base64,`.length;
  const dataUriChars = base64Chars + dataUriPrefixLength;
  const overheadBytes = base64Chars - binaryBytes;
  const overheadPercent = binaryBytes > 0 ? (overheadBytes / binaryBytes) * 100 : 33.33;

  return {
    binaryBytes,
    base64Chars,
    dataUriChars,
    overheadBytes,
    overheadPercent: Math.round(overheadPercent * 10) / 10,
    networkEfficiencyRatio: "4:3 (~1.33x expansion)",
  };
}
