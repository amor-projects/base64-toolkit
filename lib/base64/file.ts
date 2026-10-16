/**
 * Base64 Toolkit — Local File Utilities
 * 100% in-browser, privacy-preserving file conversion and untrusted byte handling.
 */

import { bytesToBase64 } from "./encode";
import { base64ToBytes } from "./decode";
import { Base64EncodeOptions, Base64Error, Base64Result } from "./types";

export const DEFAULT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB conservative default

/**
 * Strips dangerous path traversal, control codes, null bytes, and illegal characters
 * from untrusted filenames before saving.
 */
export function sanitizeFilename(name: string, fallbackBase = "download"): string {
  if (!name || typeof name !== "string") {
    return `${fallbackBase}.bin`;
  }

  // Strip null bytes and control chars
  let clean = name.replace(/[\x00-\x1f\x7f]/g, "");

  // Strip path traversal (../, .\, /, \)
  clean = clean.replace(/^[./\\]+/, "");
  clean = clean.split(/[/\\]/).pop() || fallbackBase;

  // Replace forbidden filename characters in Windows/POSIX (< > : " / \ | ? *)
  clean = clean.replace(/[<>:"/\\|?*]+/g, "_").trim();

  // Guard against Windows reserved names (CON, PRN, AUX, NUL, COM1-9, LPT1-9)
  const baseWithoutExt = clean.replace(/\.[^/.]+$/, "");
  const reservedRegex = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;
  if (reservedRegex.test(baseWithoutExt)) {
    clean = `file_${clean}`;
  }

  // Ensure length does not exceed reasonable limits (120 chars)
  if (clean.length > 120) {
    const ext = clean.includes(".") ? clean.substring(clean.lastIndexOf(".")) : "";
    clean = clean.substring(0, 120 - ext.length) + ext;
  }

  return clean || `${fallbackBase}.bin`;
}

/**
 * Human-readable byte formatting.
 */
export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const val = bytes / Math.pow(1024, i);
  const formatted = (val >= 10 || Number.isInteger(val) || i === 0) ? val.toFixed(0) : val.toFixed(1);
  return `${formatted} ${units[i]}`;
}

export interface ReadFileResult {
  bytes: Uint8Array;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * Reads a browser File object locally using FileReader / ArrayBuffer.
 * Enforces strict maximum file size limit before reading into memory.
 */
export async function readFileToBytes(
  file: File,
  maxSizeBytes = DEFAULT_MAX_FILE_SIZE_BYTES
): Promise<Base64Result<ReadFileResult>> {
  if (!file) {
    return {
      success: false,
      error: new Base64Error("NO_FILE", "No file was provided for conversion."),
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      success: false,
      error: new Base64Error(
        "FILE_TOO_LARGE",
        `File exceeds maximum safe limit of ${formatBytes(maxSizeBytes)} (selected file is ${formatBytes(file.size)}). To prevent browser freezing, select a smaller file.`
      ),
    };
  }

  try {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    return {
      success: true,
      data: {
        bytes,
        filename: sanitizeFilename(file.name),
        size: file.size,
        mimeType: file.type || "application/octet-stream",
      },
    };
  } catch (err) {
    return {
      success: false,
      error: new Base64Error(
        "READ_FAILED",
        err instanceof Error ? err.message : "Failed to read file locally."
      ),
    };
  }
}

/**
 * Converts a browser File locally to a Base64 string.
 */
export async function fileToBase64(
  file: File,
  options: Base64EncodeOptions = {},
  maxSizeBytes = DEFAULT_MAX_FILE_SIZE_BYTES
): Promise<Base64Result<{ base64: string; metadata: ReadFileResult }>> {
  const readRes = await readFileToBytes(file, maxSizeBytes);
  if (!readRes.success) {
    return readRes;
  }

  try {
    const base64 = bytesToBase64(readRes.data.bytes, options);
    return {
      success: true,
      data: {
        base64,
        metadata: readRes.data,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: new Base64Error(
        "ENCODE_FAILED",
        err instanceof Error ? err.message : "Failed to encode file bytes."
      ),
    };
  }
}

export interface BlobDownloadHandle {
  url: string;
  filename: string;
  size: number;
  revoke: () => void;
}

/**
 * Converts a Base64 string into a downloadable object URL with automatic cleanup.
 */
export function base64ToDownloadBlob(
  base64String: string,
  filename: string,
  mimeType = "application/octet-stream"
): Base64Result<BlobDownloadHandle> {
  const byteRes = base64ToBytes(base64String);
  if (!byteRes.success) {
    return byteRes;
  }

  try {
    const cleanName = sanitizeFilename(filename);
    const blob = new Blob([byteRes.data as unknown as BlobPart], { type: mimeType });
    const url = URL.createObjectURL(blob);

    return {
      success: true,
      data: {
        url,
        filename: cleanName,
        size: byteRes.data.length,
        revoke: () => URL.revokeObjectURL(url),
      },
    };
  } catch (err) {
    return {
      success: false,
      error: new Base64Error(
        "BLOB_FAILED",
        err instanceof Error ? err.message : "Failed to create downloadable object URL."
      ),
    };
  }
}
