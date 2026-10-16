import { describe, it, expect } from "vitest";
import {
  sanitizeFilename,
  formatBytes,
  createDataUri,
  parseDataUri,
  inspectBase64,
  calculateSizeMetrics,
  inferMimeFromBytes,
} from "../index";

describe("File & Utility Core Engines", () => {
  describe("1. Filename Sanitization & Security", () => {
    it("should sanitize dangerous directory traversal characters", () => {
      expect(sanitizeFilename("../../etc/passwd")).toBe("passwd");
      expect(sanitizeFilename("..\\..\\windows\\system32\\cmd.exe")).toBe("cmd.exe");
    });

    it("should remove null bytes and control characters", () => {
      expect(sanitizeFilename("innocent.txt\0.exe")).toBe("innocent.txt.exe");
    });

    it("should replace forbidden characters", () => {
      expect(sanitizeFilename('my<file>:name"test|?.png')).toBe("my_file_name_test_.png");
    });

    it("should guard against Windows reserved device names", () => {
      expect(sanitizeFilename("con.txt")).toBe("file_con.txt");
      expect(sanitizeFilename("nul.pdf")).toBe("file_nul.pdf");
    });

    it("should handle empty or missing filenames with fallback", () => {
      expect(sanitizeFilename("")).toBe("download.bin");
      expect(sanitizeFilename("   ")).toBe("download.bin");
    });
  });

  describe("2. Format Bytes", () => {
    it("should format bytes into human-readable strings", () => {
      expect(formatBytes(0)).toBe("0 B");
      expect(formatBytes(512)).toBe("512 B");
      expect(formatBytes(1024)).toBe("1 KB");
      expect(formatBytes(1048576)).toBe("1 MB");
      expect(formatBytes(1536)).toBe("1.5 KB");
      expect(formatBytes(10 * 1024 * 1024)).toBe("10 MB");
    });
  });

  describe("3. Data URI Generation & Parsing", () => {
    it("should create valid Data URIs", () => {
      const uri = createDataUri("SGVsbG8=", "text/plain");
      expect(uri).toBe("data:text/plain;base64,SGVsbG8=");
    });

    it("should clean leading data: prefix if already present", () => {
      const uri = createDataUri("data:image/png;base64,iVBORw0KGgo=", "image/png");
      expect(uri).toBe("data:image/png;base64,iVBORw0KGgo=");
    });

    it("should parse valid Data URIs correctly", () => {
      const parsed = parseDataUri("data:image/png;base64,iVBORw0KGgo=");
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.mimeType).toBe("image/png");
        expect(parsed.data.isBase64).toBe(true);
        expect(parsed.data.data).toBe("iVBORw0KGgo=");
      }
    });

    it("should reject non-data URIs", () => {
      const res = parseDataUri("https://example.com/image.png");
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.code).toBe("NOT_A_DATA_URI");
      }
    });
  });

  describe("4. Magic Byte Detection & Inspection", () => {
    it("should infer PNG from magic bytes", () => {
      const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const mime = inferMimeFromBytes(pngBytes);
      expect(mime?.mimeType).toBe("image/png");
      expect(mime?.extension).toBe("png");
    });

    it("should infer JPEG from magic bytes", () => {
      const jpegBytes = new Uint8Array([0xff, 0xd8, 0xff, 0xe0]);
      const mime = inferMimeFromBytes(jpegBytes);
      expect(mime?.mimeType).toBe("image/jpeg");
    });

    it("should infer PDF from magic bytes", () => {
      const pdfBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]); // '%PDF-'
      const mime = inferMimeFromBytes(pdfBytes);
      expect(mime?.mimeType).toBe("application/pdf");
    });

    it("should infer plain UTF-8 text", () => {
      const textBytes = new TextEncoder().encode("Hello World, testing UTF-8 text");
      const mime = inferMimeFromBytes(textBytes);
      expect(mime?.mimeType).toBe("text/plain");
    });

    it("should inspect Base64 strings with comprehensive diagnostics", () => {
      // "SGVsbG8=" is "Hello"
      const report = inspectBase64("SGVsbG8=");
      expect(report.isValidBase64).toBe(true);
      expect(report.alphabet).toBe("ambiguous"); // only alphanumerics and '='
      expect(report.decodedByteCount).toBe(5);
      expect(report.inferredFormat?.mimeType).toBe("text/plain");
    });

    it("should detect mixed alphabet errors in inspection", () => {
      const report = inspectBase64("abc+123-_456");
      expect(report.isValidBase64).toBe(false);
      expect(report.alphabet).toBe("mixed");
    });
  });

  describe("5. Size Metrics Calculation", () => {
    it("should calculate exact 4:3 size expansion metrics", () => {
      const metrics = calculateSizeMetrics(300, "image/png");
      expect(metrics.binaryBytes).toBe(300);
      expect(metrics.base64Chars).toBe(400); // 300 / 3 * 4 = 400
      expect(metrics.overheadBytes).toBe(100);
      expect(metrics.overheadPercent).toBeCloseTo(33.3, 1);
    });
  });
});
