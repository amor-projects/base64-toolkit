import { describe, it, expect } from "vitest";
import {
  encodeUtf8,
  decodeUtf8,
  bytesToBase64,
  base64ToBytes,
  calculateUtf8ByteLength,
  estimateBase64Length,
  estimateDecodedByteLength,
  detectBase64Format,
} from "../index";

describe("Base64 Core Engine", () => {
  describe("1. Empty Input", () => {
    it("should encode empty string to empty string", () => {
      expect(encodeUtf8("")).toBe("");
    });

    it("should decode empty string to empty string", () => {
      const result = decodeUtf8("");
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe("");
      }
    });

    it("should encode empty bytes to empty string", () => {
      expect(bytesToBase64(new Uint8Array(0))).toBe("");
    });

    it("should decode empty string to empty Uint8Array", () => {
      const result = base64ToBytes("");
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(0);
      }
    });
  });

  describe("2. ASCII Test Vectors (RFC 4648)", () => {
    const vectors = [
      { plain: "f", b64: "Zg==" },
      { plain: "fo", b64: "Zm8=" },
      { plain: "foo", b64: "Zm9v" },
      { plain: "foob", b64: "Zm9vYg==" },
      { plain: "fooba", b64: "Zm9vYmE=" },
      { plain: "foobar", b64: "Zm9vYmFy" },
      { plain: "Hello World", b64: "SGVsbG8gV29ybGQ=" },
    ];

    it.each(vectors)("should encode '$plain' to '$b64'", ({ plain, b64 }) => {
      expect(encodeUtf8(plain)).toBe(b64);
    });

    it.each(vectors)("should decode '$b64' to '$plain'", ({ plain, b64 }) => {
      const result = decodeUtf8(b64);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(plain);
      }
    });
  });

  describe("3. Multi-byte UTF-8, Accents, CJK, and Emoji", () => {
    const unicodeCases = [
      { name: "Accented text", text: "Café au lait, naïve façade" },
      { name: "German Umlauts & Eszett", text: "Grüße vom süßen Bären" },
      { name: "CJK Characters", text: "你好世界！こんにちは世界！" },
      { name: "Arabic & RTL", text: "مرحبا بالعالم" },
      { name: "Complex Emoji sequence", text: "🚀 🌟 👨‍👩‍👧‍👦 🛰️ ✨" },
      { name: "Math symbols", text: "∑(x²) = √π ± ∞" },
      { name: "Newlines and tabs", text: "Line 1\r\nLine 2\tIndented" },
    ];

    it.each(unicodeCases)("should round-trip encode and decode $name", ({ text }) => {
      const encoded = encodeUtf8(text);
      expect(encoded.length).toBeGreaterThan(0);

      const decoded = decodeUtf8(encoded);
      expect(decoded.success).toBe(true);
      if (decoded.success) {
        expect(decoded.data).toBe(text);
      }
    });

    it("should correctly report UTF-8 byte count vs JavaScript char count", () => {
      const emoji = "🚀"; // 1 emoji is 2 UTF-16 code units (length = 2), but 4 UTF-8 bytes!
      expect(emoji.length).toBe(2);
      expect(calculateUtf8ByteLength(emoji)).toBe(4);

      const cjk = "你好"; // 2 characters, 6 UTF-8 bytes
      expect(cjk.length).toBe(2);
      expect(calculateUtf8ByteLength(cjk)).toBe(6);
    });
  });

  describe("4. Base64URL vs Standard Base64", () => {
    // Binary sequence that produces + and / in standard Base64:
    // 0xfb, 0xff, 0xbf -> +/+/
    const testBytes = new Uint8Array([0xfb, 0xff, 0xbf]);

    it("should produce '+' and '/' in standard Base64", () => {
      const std = bytesToBase64(testBytes, { urlSafe: false });
      expect(std).toBe("+/+/");
    });

    it("should produce '-' and '_' in Base64URL", () => {
      const url = bytesToBase64(testBytes, { urlSafe: true });
      expect(url).toBe("-_-_");
    });

    it("should support unpadded Base64URL", () => {
      const oneByte = new Uint8Array([0x66]); // 'f' -> 'Zg==' in std, 'Zg' in unpadded URL
      const padded = bytesToBase64(oneByte, { urlSafe: true, pad: true });
      const unpadded = bytesToBase64(oneByte, { urlSafe: true, pad: false });

      expect(padded).toBe("Zg==");
      expect(unpadded).toBe("Zg");

      const decoded = base64ToBytes(unpadded, { urlSafe: true });
      expect(decoded.success).toBe(true);
      if (decoded.success) {
        expect(decoded.data).toEqual(oneByte);
      }
    });

    it("should reject standard chars when urlSafe=true is strictly requested", () => {
      const result = base64ToBytes("Zg+8", { urlSafe: true });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("INVALID_CHARACTER");
      }
    });

    it("should reject Base64URL chars when urlSafe=false is strictly requested", () => {
      const result = base64ToBytes("Zg-8", { urlSafe: false });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("INVALID_CHARACTER");
      }
    });

    it("should reject mixed alphabet input", () => {
      const result = base64ToBytes("Zg+8-A==");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("INVALID_CHARACTER");
      }
    });
  });

  describe("5. Whitespace Handling Policy", () => {
    const inputWithWhitespace = "SGVs bG8g\r\nV29y\t bGQ=";
    const expectedPlain = "Hello World";

    it("should strip whitespace by default (user-friendly)", () => {
      const result = decodeUtf8(inputWithWhitespace);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(expectedPlain);
      }
    });

    it("should reject whitespace when whitespace='reject'", () => {
      const result = decodeUtf8(inputWithWhitespace, { whitespace: "reject" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("DISALLOWED_WHITESPACE");
      }
    });
  });

  describe("6. Validation & Error Handling", () => {
    it("should reject invalid characters outside ASCII alphabet", () => {
      const result = decodeUtf8("SGVsbG8§V29ybGQ=");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("INVALID_CHARACTER");
      }
    });

    it("should reject impossible length where unpaddedLength % 4 === 1", () => {
      // 5 characters without padding: impossible
      const result = decodeUtf8("AAAAA");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("INVALID_LENGTH");
      }
    });

    it("should reject padding in the middle of a string", () => {
      const result = decodeUtf8("SGV=sbG8=");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("INVALID_PADDING");
      }
    });

    it("should reject more than two '=' padding characters", () => {
      const result = decodeUtf8("SGVsbG8===");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("INVALID_PADDING");
      }
    });

    it("should reject unpadded input when paddingMode='strict'", () => {
      const result = decodeUtf8("Zm8", { paddingMode: "strict" }); // 'fo' -> 'Zm8='
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("INVALID_LENGTH");
      }
    });

    it("should reject binary data that is not valid UTF-8 when decoding as text", () => {
      // 0x80 alone is an invalid UTF-8 byte
      const invalidUtf8Bytes = new Uint8Array([0x80, 0x81]);
      const base64 = bytesToBase64(invalidUtf8Bytes);

      // Decoding as bytes must succeed
      const byteResult = base64ToBytes(base64);
      expect(byteResult.success).toBe(true);

      // Decoding as UTF-8 text must fail with INVALID_UTF8
      const textResult = decodeUtf8(base64);
      expect(textResult.success).toBe(false);
      if (!textResult.success) {
        expect(textResult.error.code).toBe("INVALID_UTF8");
      }
    });
  });

  describe("7. Binary Bytes (Zero and High-bit values)", () => {
    it("should encode and decode binary buffer with 0x00 and 0xFF", () => {
      const binary = new Uint8Array([
        0x00, 0x00, 0x01, 0x7f, 0x80, 0xfe, 0xff, 0x00, 0xff, 0xaa, 0x55,
      ]);

      const encoded = bytesToBase64(binary);
      const decoded = base64ToBytes(encoded);

      expect(decoded.success).toBe(true);
      if (decoded.success) {
        expect(decoded.data).toEqual(binary);
      }
    });

    it("should safely encode large binary buffers (>65536 bytes) without call stack overflow", () => {
      const largeSize = 70000;
      const largeBuffer = new Uint8Array(largeSize);
      for (let i = 0; i < largeSize; i++) {
        largeBuffer[i] = i % 256;
      }

      // Must not throw RangeError: Maximum call stack size exceeded
      const encoded = bytesToBase64(largeBuffer);
      expect(encoded.length).toBe(estimateBase64Length(largeSize, true));

      const decoded = base64ToBytes(encoded);
      expect(decoded.success).toBe(true);
      if (decoded.success) {
        expect(decoded.data.length).toBe(largeSize);
        expect(decoded.data[0]).toBe(0);
        expect(decoded.data[largeSize - 1]).toBe((largeSize - 1) % 256);
      }
    });
  });

  describe("8. Size and Format Utilities", () => {
    it("should accurately estimate Base64 length with and without padding", () => {
      expect(estimateBase64Length(0)).toBe(0);
      expect(estimateBase64Length(1, true)).toBe(4);
      expect(estimateBase64Length(1, false)).toBe(2);
      expect(estimateBase64Length(2, true)).toBe(4);
      expect(estimateBase64Length(2, false)).toBe(3);
      expect(estimateBase64Length(3, true)).toBe(4);
      expect(estimateBase64Length(3, false)).toBe(4);
      expect(estimateBase64Length(4, true)).toBe(8);
    });

    it("should accurately estimate decoded byte length", () => {
      expect(estimateDecodedByteLength("")).toBe(0);
      expect(estimateDecodedByteLength("Zg==")).toBe(1);
      expect(estimateDecodedByteLength("Zm8=")).toBe(2);
      expect(estimateDecodedByteLength("Zm9v")).toBe(3);
      expect(estimateDecodedByteLength("AAAAA")).toBe(-1); // invalid length
    });

    it("should accurately detect format", () => {
      expect(detectBase64Format("SGVsbG8>")).toBe("invalid");
      expect(detectBase64Format("SGVsbG8+")).toBe("standard");
      expect(detectBase64Format("SGVsbG8/")).toBe("standard");
      expect(detectBase64Format("SGVsbG8_")).toBe("base64url");
      expect(detectBase64Format("SGVsbG8/A_")).toBe("mixed");
      expect(detectBase64Format("SGVsbG8")).toBe("ambiguous");
    });
  });
});
