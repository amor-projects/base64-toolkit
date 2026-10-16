/**
 * Base64 Toolkit — Data URI Utilities
 * Strict RFC 2397 formatting, parsing, and text snippet generation.
 */

import { Base64Error, Base64Result } from "./types";

export interface ParsedDataUri {
  mimeType: string;
  isBase64: boolean;
  data: string;
  charset?: string;
  rawPrefix: string;
}

/**
 * Builds an RFC 2397 Data URI from a Base64 string and MIME type.
 */
export function createDataUri(base64Payload: string, mimeType = "application/octet-stream"): string {
  // Strip any accidental preexisting data: prefix or whitespace
  let cleanPayload = base64Payload.trim();
  if (cleanPayload.startsWith("data:")) {
    const commaIndex = cleanPayload.indexOf(",");
    if (commaIndex !== -1) {
      cleanPayload = cleanPayload.substring(commaIndex + 1);
    }
  }

  const cleanMime = mimeType.trim().toLowerCase() || "application/octet-stream";
  return `data:${cleanMime};base64,${cleanPayload}`;
}

/**
 * Parses an RFC 2397 Data URI into its component parts.
 */
export function parseDataUri(dataUri: string): Base64Result<ParsedDataUri> {
  if (!dataUri || typeof dataUri !== "string") {
    return {
      success: false,
      error: new Base64Error("INVALID_DATA_URI", "Data URI string is empty."),
    };
  }

  const trimmed = dataUri.trim();
  if (!trimmed.startsWith("data:")) {
    return {
      success: false,
      error: new Base64Error(
        "NOT_A_DATA_URI",
        "String does not begin with the required 'data:' scheme prefix."
      ),
    };
  }

  const commaIndex = trimmed.indexOf(",");
  if (commaIndex === -1) {
    return {
      success: false,
      error: new Base64Error(
        "MALFORMED_DATA_URI",
        "Data URI is missing the comma separator separating metadata and data payload."
      ),
    };
  }

  const header = trimmed.substring(5, commaIndex); // content between 'data:' and ','
  const data = trimmed.substring(commaIndex + 1);

  const parts = header.split(";");
  const isBase64 = parts.includes("base64");

  let mimeType = "text/plain";
  let charset: string | undefined;

  for (const part of parts) {
    const p = part.trim();
    if (p === "base64") continue;
    if (p.startsWith("charset=")) {
      charset = p.substring(8);
    } else if (p.includes("/")) {
      mimeType = p;
    }
  }

  return {
    success: true,
    data: {
      mimeType,
      isBase64,
      data,
      charset,
      rawPrefix: trimmed.substring(0, commaIndex + 1),
    },
  };
}

/**
 * Formats a safe HTML <img> snippet string for copying.
 * (Returns text snippet only; never executes or injects raw code into DOM).
 */
export function formatHtmlImgSnippet(dataUri: string, altText = "Embedded Image"): string {
  const safeAlt = altText.replace(/["<>]/g, "");
  return `<img src="${dataUri}" alt="${safeAlt}" />`;
}

/**
 * Formats a CSS background-image snippet string for copying.
 */
export function formatCssSnippet(dataUri: string): string {
  return `background-image: url("${dataUri}");`;
}
