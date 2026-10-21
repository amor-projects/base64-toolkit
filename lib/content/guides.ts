/**
 * Base64 Toolkit — Educational Guides Content Module
 * High-quality, technically accurate, spec-compliant educational content.
 * Strictly adheres to RFC 4648 and RFC 2397 specifications.
 */

import { absoluteUrl } from "@/lib/seo/site";

export interface GuideSection {
  id: string;
  title: string;
  content: string; // Markdown or rich text
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  callout?: {
    type: "info" | "warning" | "tip";
    title: string;
    text: string;
  };
}

export interface EducationalGuide {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  canonicalUrl: string;
  readTimeMinutes: number;
  lastUpdated: string;
  relatedTool: {
    title: string;
    href: string;
    description: string;
  };
  summaryKeyPoints: string[];
  sections: GuideSection[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const EDUCATIONAL_GUIDES: EducationalGuide[] = [
  {
    slug: "what-is-base64",
    title: "What Is Base64? How the Binary-to-Text Encoding Works",
    shortTitle: "What Is Base64?",
    description:
      "A complete technical explanation of RFC 4648 Base64 encoding. Understand 6-bit chunking, ASCII mappings, why Base64 is not encryption, and where to use it.",
    canonicalUrl: absoluteUrl("/learn/what-is-base64"),
    readTimeMinutes: 5,
    lastUpdated: "October 2026",
    relatedTool: {
      title: "Base64 Encoder Tool",
      href: "/base64-encoder",
      description: "Encode UTF-8 text or binary data directly in your browser.",
    },
    summaryKeyPoints: [
      "Base64 is a binary-to-text encoding scheme defined by IETF RFC 4648, not encryption.",
      "It maps every 3 bytes (24 bits) of raw data into 4 ASCII characters (6 bits each).",
      "Base64 output is approximately 33.3% larger in byte size than the original binary input.",
      "It was created to transmit binary files safely across 7-bit ASCII channels like email (MIME).",
    ],
    sections: [
      {
        id: "core-definition",
        title: "1. The Fundamental Purpose of Base64",
        content: `Base64 is a standard encoding format designed to represent arbitrary binary data using a set of 64 printable ASCII characters. It is formally standardized by the Internet Engineering Task Force (IETF) in [RFC 4648 §4](https://datatracker.ietf.org/doc/html/rfc4648#section-4).

Historically, early communication networks and protocols (such as SMTP for email) were strictly designed to handle 7-bit US-ASCII text. When raw binary data—such as compiled executables, compressed files, or images—traveled through these legacy channels, intermediate mail gateways often modified or stripped the 8th bit, resulting in corrupted files.

Base64 solves this problem by translating every byte of binary data into safe, universally readable printable characters that survive network transmission intact.`,
        callout: {
          type: "warning",
          title: "Critical Fact: Base64 Is Not Encryption",
          text: "Base64 provides zero confidentiality or security. Any computer, browser, or human with a lookup table can decode Base64 data in milliseconds. Never use Base64 to hide passwords, secret tokens, or sensitive information without true cryptographic encryption.",
        },
      },
      {
        id: "how-math-works",
        title: "2. The Mathematical Mechanics: 3 Bytes to 4 Characters",
        content: `Base64 works on a simple mathematical principle: the lowest common multiple of 8 (the bits in a byte) and 6 (the bits needed to represent 64 characters) is 24 bits.

1. **Input Grouping:** The encoder reads **3 bytes** of raw binary data (3 × 8 = 24 bits).
2. **Bit Splitting:** It splits those 24 bits into **4 chunks of 6 bits** each.
3. **Alphabet Indexing:** Each 6-bit chunk has a numeric value from 0 to 63 (since 2⁶ = 64). That number indexes into the 64-character alphabet:
   - \`A–Z\` represent values 0 through 25
   - \`a–z\` represent values 26 through 51
   - \`0–9\` represent values 52 through 61
   - \`+\` represents value 62
   - \`/\` represents value 63`,
        codeSnippet: {
          language: "text",
          caption: "Worked example encoding the word 'Man'",
          code: `Input Text:       M            a            n
ASCII Bytes:      77           97           110
8-bit Binary:     01001101     01100001     01101110
24-bit Stream:    010011010110000101101110

Split 6-bit:      010011   010110   000101   101110
Decimal Values:   19       22       5        46
Base64 Index:     T        W        F        u
Result:           TWFu`,
        },
      },
      {
        id: "when-to-use",
        title: "3. When Should You Use Base64?",
        content: `Base64 is useful when you must embed binary content inside a text-only transport protocol or data format:

- **Data URIs:** Embedding small icons, favicons, or fonts directly into CSS or HTML stylesheets.
- **JSON REST & GraphQL APIs:** Transferring file metadata or digital signatures inside JSON envelopes without multipart form boundaries.
- **MIME Email Attachments:** The underlying mechanism that powers attachments in modern email protocols.
- **Cryptographic Keys & Hashes:** Representing raw SHA-256 digests or public RSA/ECDSA keys in clean human-readable PEM formats.`,
      },
    ],
    faq: [
      {
        question: "Can Base64 encode emoji and accented foreign letters?",
        answer:
          "Yes. When encoding text, international characters and emoji are first converted to UTF-8 binary bytes. Those bytes are then passed into the Base64 transformation algorithm.",
      },
      {
        question: "Why does Base64 increase file size by roughly 33%?",
        answer:
          "Because 3 bytes of raw binary data (24 bits) are expanded into 4 ASCII characters (32 bits). 32 divided by 24 is 1.3333, representing a 33.33% expansion in uncompressed byte count.",
      },
    ],
  },
  {
    slug: "base64-vs-base64url",
    title: "Base64 vs Base64URL: RFC 4648 Standards & Key Differences",
    shortTitle: "Base64 vs Base64URL",
    description:
      "Understand the technical differences between standard Base64 and URL-safe Base64URL. Learn how '+' and '/' are replaced with '-' and '_', and how padding is handled in JWTs.",
    canonicalUrl: absoluteUrl("/learn/base64-vs-base64url"),
    readTimeMinutes: 4,
    lastUpdated: "October 2026",
    relatedTool: {
      title: "Base64URL Converter Tool",
      href: "/base64url-encoder",
      description: "Convert strings into URL-safe RFC 4648 §5 format without padding issues.",
    },
    summaryKeyPoints: [
      "Standard Base64 (RFC 4648 §4) uses '+' and '/', which conflict with URL path and query delimiters.",
      "Base64URL (RFC 4648 §5) substitutes '+' with '-' (hyphen) and '/' with '_' (underscore).",
      "Base64URL commonly omits trailing '=' padding characters to avoid percent-encoding (%3D).",
      "JSON Web Tokens (JWT) strictly mandate Base64URL encoding without padding for header and payload blocks.",
    ],
    sections: [
      {
        id: "the-conflict",
        title: "1. Why Standard Base64 Breaks URLs and File Paths",
        content: `Standard Base64 works perfectly in MIME email and JSON, but creates severe problems when placed into URLs, query parameters, or file paths:

- **The \`+\` character:** In URL query strings, a literal \`+\` is interpreted by web servers (such as Apache, Nginx, and Express) as an encoded space character (\`%20\`). If you pass \`SGVsbG8+World\` in a query parameter, the server reads \`SGVsbG8 World\`, permanently corrupting the decoded data.
- **The \`/\` character:** In URL paths, a slash is a directory delimiter. Placing a standard Base64 string into a URL path splits the string across fake route sub-paths.
- **The \`=\` padding character:** In query strings, \`=\` separates keys and values (e.g. \`?id=123\`). Trailing Base64 padding characters must be percent-encoded as \`%3D\`, bloating the URL.`,
      },
      {
        id: "the-base64url-solution",
        title: "2. The RFC 4648 §5 Base64URL Alphabet",
        content: `To resolve these collisions, IETF established the **Base64URL** specification in [RFC 4648 Section 5](https://datatracker.ietf.org/doc/html/rfc4648#section-5).

Base64URL makes two simple character substitutions and defines optional padding:
- Index 62: Replaces **\`+\`** with **\`-\`** (hyphen / minus)
- Index 63: Replaces **\`/\`** with **\`_\`** (underscore)
- Trailing Padding: Omission of **\`=\`** is permitted and explicitly encouraged in contexts like JSON Web Tokens (JWT).`,
        codeSnippet: {
          language: "typescript",
          caption: "Converting between Base64 and Base64URL in TypeScript",
          code: `export function toBase64Url(base64: string): string {
  return base64
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, ''); // Omit trailing padding
}

export function fromBase64Url(base64url: string): string {
  let standard = base64url.replace(/-/g, '+').replace(/_/g, '/');
  // Re-pad to multiple of 4
  while (standard.length % 4 !== 0) {
    standard += '=';
  }
  return standard;
}`,
        },
      },
      {
        id: "comparison-table",
        title: "3. Quick Comparison Reference",
        content: `| Feature | Standard Base64 | Base64URL |
| :--- | :--- | :--- |
| **RFC Specification** | RFC 4648 §4 | RFC 4648 §5 |
| **Character 62** | \`+\` (Plus) | \`-\` (Hyphen) |
| **Character 63** | \`/\` (Slash) | \`_\` (Underscore) |
| **Default Padding** | Required (\`=\`) | Optional (unpadded standard in JWT) |
| **Safe in URL Query** | No (requires URI encoding) | Yes (100% URL-safe) |
| **Primary Use Cases** | Email attachments, Data URIs | JWT, OAuth tokens, URL query params |`,
      },
    ],
    faq: [
      {
        question: "Does omitting padding break decoders?",
        answer:
          "Well-designed modern decoders (including this toolkit) handle unpadded Base64URL strings cleanly by calculating (4 - (len % 4)) and adding the necessary virtual padding before decoding.",
      },
      {
        question: "Can I convert a Base64 string directly to Base64URL without re-encoding?",
        answer:
          "Yes. Because the 64 numeric values correspond 1:1, you simply perform string replacement: replace '+' with '-', '/' with '_', and strip trailing '=' signs.",
      },
    ],
  },
  {
    slug: "base64-padding",
    title: "How Base64 Padding Works: Why '=' Characters Appear",
    shortTitle: "How Base64 Padding Works",
    description:
      "Demystifying '=' padding characters in Base64 strings. Learn why inputs are aligned to 4-character blocks, the three mathematical cases, and how to troubleshoot padding errors.",
    canonicalUrl: absoluteUrl("/learn/base64-padding"),
    readTimeMinutes: 4,
    lastUpdated: "October 2026",
    relatedTool: {
      title: "Base64 Inspector & Validator",
      href: "/base64-inspector",
      description: "Diagnose padding alignment and detect malformed padding blocks in your browser.",
    },
    summaryKeyPoints: [
      "Base64 encodes data in 3-byte input blocks and emits 4-character output blocks.",
      "If the input byte length is not an exact multiple of 3, '=' padding characters fill the remaining slots.",
      "A valid Base64 string can have 0, 1, or 2 padding '=' characters—never 3.",
      "The total character count of a standard padded Base64 string is always an exact multiple of 4.",
    ],
    sections: [
      {
        id: "why-pad",
        title: "1. Why Does Base64 Require Padding?",
        content: `Base64 groups 3 bytes (24 bits) into 4 characters (6 bits each). But real-world data does not always arrive in clean multiples of 3 bytes. A file or text string might have 1, 2, 4, 5, or 100 bytes.

When the input runs out of bytes before completing a full 3-byte group, the encoder needs a way to signal to the decoder how many actual data bits were present versus how many were empty placeholder bits.

The special padding character **\`=\`** serves this exact purpose: it informs the decoder that a 6-bit slot was intentionally unfilled at the end of the data stream.`,
      },
      {
        id: "three-cases",
        title: "2. The Three Mathematical Padding Scenarios",
        content: `Depending on the input byte length modulo 3 (\`bytes.length % 3\`), exactly one of three cases will occur:

### Case 1: Remainder 0 (No Padding Needed)
The input is an exact multiple of 3 bytes. Every 24-bit group has full bytes.
- Example: \`"any"\` (3 bytes: 'a', 'n', 'y')
- Output: \`YW55\` (4 characters, 0 padding \`=\`)

### Case 2: Remainder 1 (Two Padding Characters: \`==\`)
The input has 1 leftover byte (8 bits). 8 bits require two 6-bit blocks (12 bits total, with 4 trailing zero bits). The remaining two 6-bit slots in the 4-character block are filled with two \`=\` characters.
- Example: \`"a"\` (1 byte)
- Output: \`YQ==\` (2 data characters + 2 padding \`=\`)

### Case 3: Remainder 2 (One Padding Character: \`=\`)
The input has 2 leftover bytes (16 bits). 16 bits require three 6-bit blocks (18 bits total, with 2 trailing zero bits). The final 4th character in the block is filled with a single \`=\` character.
- Example: \`"ab"\` (2 bytes)
- Output: \`YWI=\` (3 data characters + 1 padding \`=\`)`,
        callout: {
          type: "tip",
          title: "Golden Rule of Base64 Length",
          text: "Can a Base64 string have 3 '=' characters? No. If an input had 0 bytes in a 3-byte block, no block is created at all. Therefore, a valid Base64 string can only ever end with '', '=', or '=='.",
        },
      },
      {
        id: "padding-errors",
        title: "3. Common Padding Errors and How to Fix Them",
        content: `If you encounter a \`Base64 error: Invalid padding\` or \`The string to be decoded is not correctly encoded\`, check for these common causes:

1. **Truncation:** If a Base64 string is truncated during database storage (e.g. hitting a \`VARCHAR(255)\` limit), the tail characters and padding are missing.
2. **Missing Padding in Strict Decoders:** If an unpadded Base64URL string is passed directly into a strict decoder (like browser native \`atob()\`), it will throw an exception if \`str.length % 4 !== 0\`.
3. **Internal Padding:** The character \`=\` is only permitted at the very end of the Base64 stream. If an \`=\` appears in the middle of a string, the input is corrupted.`,
      },
    ],
    faq: [
      {
        question: "Can I safely strip '=' padding?",
        answer:
          "Yes, provided your receiving system or decoder is capable of re-calculating the missing padding based on the string length modulo 4.",
      },
      {
        question: "Why did atob() throw a DOMException: The string to be decoded is not correctly encoded?",
        answer:
          "Browser native atob() requires strict multiple-of-4 length and standard Base64 characters (+, /). If given an unpadded string or URL-safe (- or _) characters, it will fail.",
      },
    ],
  },
  {
    slug: "base64-file-size",
    title: "Base64 File Size Explained: The Exact 33% Bandwidth Overhead",
    shortTitle: "Base64 File Size Overhead",
    description:
      "Learn the exact mathematical formulas for Base64 size expansion. Calculate byte overhead, understand why Base64 compresses poorly, and know when to avoid it.",
    canonicalUrl: absoluteUrl("/learn/base64-file-size"),
    readTimeMinutes: 5,
    lastUpdated: "October 2026",
    relatedTool: {
      title: "Base64 Size Calculator",
      href: "/base64-size-calculator",
      description: "Compute exact byte expansion, Data URI lengths, and bandwidth differences.",
    },
    summaryKeyPoints: [
      "Base64 encoding increases file size by exactly 33.33% before any headers or Data URI prefixes.",
      "4 ASCII characters are emitted for every 3 raw binary input bytes.",
      "Base64 encoded data compresses substantially less efficiently with Gzip/Brotli than the original binary data.",
      "Embedding large images (>50 KB) in Base64 hurts webpage Core Web Vitals and increases memory consumption.",
    ],
    sections: [
      {
        id: "math-proof",
        title: "1. The 33.33% Expansion Formula",
        content: `The mathematical relationship between input binary bytes and output Base64 characters is fixed:

$$\\text{Base64 Length} = 4 \\times \\left\\lceil \\frac{\\text{Binary Bytes}}{3} \\right\\rceil$$

Because every 3 bytes produce 4 ASCII characters:
$$\\frac{4}{3} = 1.333333...$$

This means Base64 data is **always roughly 33.3% larger** than the source file. For example:
- A **1 KB** file (1,024 bytes) becomes **1,368 bytes** of Base64 text (+344 bytes).
- A **100 KB** image (102,400 bytes) becomes **136,536 bytes** of Base64 text (+34.1 KB).
- A **1 MB** file (1,048,576 bytes) becomes **1,398,104 bytes** of Base64 text (+349.5 KB).`,
      },
      {
        id: "compression-caveat",
        title: "2. The Hidden Cost: Compression & Caching",
        content: `Developers often assume that enabling Gzip or Brotli compression on their web server eliminates the 33% Base64 penalty. In reality, **this assumption is mathematically false**:

1. **Higher Entropy:** Base64 expands binary data across 64 pseudo-random ASCII symbols. This randomized character distribution has higher information entropy, reducing the compression algorithms' ability to find recurring byte patterns.
2. **Double Compression Penalty:** When serving a PNG or JPEG as an external file, the browser downloads the already-optimized binary image directly. When embedded as Base64 in HTML, your web server attempts to gzip the expanded Base64 text, which rarely compresses back down to the original binary size.
3. **No Independent Browser Caching:** External images are cached by the browser independently across visits. When embedded as Base64 in HTML or CSS, the image bytes must be re-downloaded every time the containing HTML document or CSS bundle changes.`,
      },
      {
        id: "thresholds",
        title: "3. Best Practice Thresholds",
        content: `| Asset Size | Recommended Approach | Rationale |
| :--- | :--- | :--- |
| **< 2 KB** (Tiny icons, favicons) | Base64 Data URI | Eliminates HTTP request latency; negligible overhead. |
| **2 KB – 10 KB** (Small UI assets) | Evaluate critically | Beneficial only for critical above-the-fold render assets. |
| **> 10 KB** (Logos, badges) | Standard Image File | HTTP/2 and HTTP/3 multiplexing makes external requests cheaper. |
| **> 50 KB** (Hero banners, photos) | **Never Base64 encode** | Bloats DOM, increases memory pressure, degrades Core Web Vitals. |`,
      },
    ],
    faq: [
      {
        question: "How do I calculate original file size from a Base64 string?",
        answer:
          "Multiply the Base64 character length by 0.75 (3/4), then subtract the number of trailing '=' padding characters (if present).",
      },
      {
        question: "Does Base64 take up more memory in JavaScript?",
        answer:
          "Often, yes. The browser may keep the Base64 text in a compact representation, but string copies, decoded byte arrays, and UI state can coexist in memory. Plan for more than the original file size when processing large payloads.",
      },
    ],
  },
  {
    slug: "base64-data-uri",
    title: "Base64 Data URIs: Complete Guide to Inlining Images and Files",
    shortTitle: "Base64 Data URIs",
    description:
      "Master RFC 2397 Data URIs. Learn how to embed PNG, JPEG, WebP, and SVG images directly into HTML and CSS stylesheets, with syntax rules and practical examples.",
    canonicalUrl: absoluteUrl("/learn/base64-data-uri"),
    readTimeMinutes: 5,
    lastUpdated: "October 2026",
    relatedTool: {
      title: "Data URI Generator Tool",
      href: "/data-uri-generator",
      description: "Generate RFC 2397 Data URIs, HTML tags, and CSS background rules.",
    },
    summaryKeyPoints: [
      "A Data URI is defined by RFC 2397 with the syntax 'data:[<mediatype>][;base64],<data>'.",
      "It allows small files and images to be embedded directly inline inside HTML or CSS.",
      "Eliminates extra HTTP round trips for critical above-the-fold icons and favicons.",
      "Should be avoided for large images due to lack of caching and 33% payload expansion.",
    ],
    sections: [
      {
        id: "syntax-anatomy",
        title: "1. Anatomy of an RFC 2397 Data URI",
        content: `A Data URI (Uniform Resource Identifier) is a standardized scheme defined in [RFC 2397](https://datatracker.ietf.org/doc/html/rfc2397). Unlike standard URLs that specify *where* to retrieve a resource over a network, a Data URI embeds the actual resource data directly inside the identifier string itself.

The formal syntax consists of four distinct components:
\`\`\`text
data:[<mediatype>][;base64],<data>
\`\`\`

- **Scheme (\`data:\`):** Tells the browser to interpret the URI as inline data.
- **MIME Type (\`image/png\`, \`text/css\`, etc.):** Declares the media format. If omitted, browsers default to \`text/plain;charset=US-ASCII\`.
- **Encoding Token (\`;base64\`):** Indicates that the data payload is encoded in Base64 (rather than raw percent-encoded text).
- **Separator (\`,\`):** A single comma separating the metadata header from the payload.
- **Payload:** The Base64 encoded string.`,
      },
      {
        id: "usage-examples",
        title: "2. Working HTML and CSS Examples",
        content: `Here are real-world tested patterns for embedding Data URIs in web development:`,
        codeSnippet: {
          language: "html",
          caption: "Embedding a Base64 image in HTML and CSS",
          code: `<!-- 1. HTML Image Tag -->
<img
  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IiM2NUEzMEQiLz48L3N2Zz4="
  alt="Lime dot"
  width="16"
  height="16"
/>

<!-- 2. CSS Background Image -->
<style>
.badge-icon {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==");
  background-repeat: no-repeat;
}
</style>`,
        },
      },
      {
        id: "best-practices",
        title: "3. When to Use Data URIs (and When Not To)",
        content: `### Excellent Use Cases
- **Favicons in HTML head:** Eliminate an extra network handshake on the first render.
- **CSS background sprites & icons:** Ensure tiny UI icons (arrows, checks, close buttons) load simultaneously with the stylesheet.
- **Single-page standalone exports:** Generating standalone HTML reports or receipts that must function offline without external dependencies.

### Poor Use Cases
- **Hero banners and photographs:** Significantly degrades Largest Contentful Paint (LCP) Core Web Vital.
- **Content shared across multiple pages:** Prevents the browser from caching the asset across navigation.`,
      },
    ],
    faq: [
      {
        question: "Are Data URIs safe from Cross-Site Scripting (XSS)?",
        answer:
          "SVG Data URIs can contain embedded JavaScript (<script> tags or onclick handlers). Never render untrusted, user-supplied SVG Data URIs without strict sanitization.",
      },
      {
        question: "What is the maximum supported length for a Data URI?",
        answer:
          "Modern browsers (Chrome, Edge, Safari, Firefox) support Data URIs of several megabytes. However, practical web performance guidelines recommend keeping inline Data URIs under 10 KB.",
      },
    ],
  },
];
