import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Base64EncoderTool } from "@/components/tools/Base64EncoderTool";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolPanel, ToolPanelBody } from "@/components/ui/ToolPanel";
import { ShieldCheckIcon, LockIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Base64 Encoder Online — Fast, Private Text Encoding",
  description:
    "Encode plain text, UTF-8 strings, and international characters into standard Base64 or Base64URL directly in your browser. 100% client-side with zero server uploads.",
  path: "/base64-encoder",
});

export default function Base64EncoderPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Base64 Encoder Online",
    description:
      "Encode plain text, UTF-8 strings, and international characters into standard Base64 or Base64URL.",
    path: "/base64-encoder",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Base64 Encoder", path: "/base64-encoder" },
  ]);

  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-muted font-mono"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Encoder</span>
        </nav>

        {/* 1. Header & Value Proposition */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Flagship Utility • In-Browser Execution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64 Encoder Online
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Convert UTF-8 text, international accents, and symbols into RFC 4648 Base64 or
            Base64URL strings. Processed completely on your local device—no server transmissions.
          </p>
        </section>

        {/* 2. Interactive Flagship Tool Component */}
        <section aria-label="Base64 Text Encoder Tool">
          <Base64EncoderTool initialText="Hello World" />
        </section>

        {/* 3. Verified Privacy Statement */}
        <section className="p-5 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center shrink-0 border border-[#84CC16]/25">
              <ShieldCheckIcon size={18} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Local Execution Guarantee</p>
              <p className="text-xs text-muted">
                Your input text is encoded using browser-native <code className="font-mono text-[11px] bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">TextEncoder</code> and in-memory byte arrays. Data is never uploaded to any backend.
              </p>
            </div>
          </div>
          <Link
            href="/base64-decoder"
            className="text-xs font-semibold text-[#3F6212] dark:text-[#BEF264] hover:underline shrink-0"
          >
            Need to decode? Switch to Base64 Decoder →
          </Link>
        </section>

        {/* 4. Supported Modes and Features */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Capabilities"
            title="Engineered for Precision & Compliance"
            description="Unlike rudimentary encoders that fail on non-ASCII characters, our engine complies strictly with RFC 4648 and Unicode standards."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ToolPanel variant="subtle">
              <ToolPanelBody className="space-y-2.5">
                <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                  01 • Multi-Byte UTF-8
                </span>
                <h3 className="text-sm font-semibold text-foreground">Accents, CJK & Emojis</h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Standard browser <code className="font-mono text-[11px]">btoa()</code> only accepts Latin-1 characters (0–255) and crashes on Unicode. Our engine uses <code className="font-mono text-[11px]">TextEncoder</code> to reliably encode any multi-byte string.
                </p>
              </ToolPanelBody>
            </ToolPanel>

            <ToolPanel variant="subtle">
              <ToolPanelBody className="space-y-2.5">
                <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                  02 • Base64URL Safe
                </span>
                <h3 className="text-sm font-semibold text-foreground">URL & Filename Safe</h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Toggle seamlessly between standard Base64 (using <code className="font-mono text-[11px]">+</code> and <code className="font-mono text-[11px]">/</code>) and Base64URL (using <code className="font-mono text-[11px]">-</code> and <code className="font-mono text-[11px]">_</code>) for JWT tokens and URL query strings.
                </p>
              </ToolPanelBody>
            </ToolPanel>

            <ToolPanel variant="subtle">
              <ToolPanelBody className="space-y-2.5">
                <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                  03 • Padding Control
                </span>
                <h3 className="text-sm font-semibold text-foreground">Flexible Padding (=)</h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Choose between standard 4-character padded output (<code className="font-mono text-[11px]">=</code> and <code className="font-mono text-[11px]">==</code>) or unpadded output commonly required in modern OAuth2 and WebAuthn specifications.
                </p>
              </ToolPanelBody>
            </ToolPanel>
          </div>
        </section>

        {/* 5. Tested Worked Examples */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Test Vectors"
            title="Verified Input & Output Examples"
            description="RFC 4648 test vectors and Unicode test cases validated against standard specifications."
          />

          <div className="overflow-x-auto rounded-2xl border border-border/80 shadow-whisper bg-surface">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/70 bg-surface dark:bg-[#151518]">
                  <th className="py-3 px-4 font-semibold text-foreground">Input Text</th>
                  <th className="py-3 px-4 font-semibold text-foreground">Type / Notes</th>
                  <th className="py-3 px-4 font-semibold text-foreground">Base64 Encoded</th>
                  <th className="py-3 px-4 font-semibold text-foreground">Base64URL (Unpadded)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 font-mono text-[12px]">
                <tr>
                  <td className="py-3 px-4 text-foreground font-sans">Hello World</td>
                  <td className="py-3 px-4 text-muted font-sans">ASCII standard</td>
                  <td className="py-3 px-4 text-[#3F6212] dark:text-[#BEF264] font-semibold">SGVsbG8gV29ybGQ=</td>
                  <td className="py-3 px-4 text-muted">SGVsbG8gV29ybGQ</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground font-sans">Café</td>
                  <td className="py-3 px-4 text-muted font-sans">Accented (2-byte é)</td>
                  <td className="py-3 px-4 text-[#3F6212] dark:text-[#BEF264] font-semibold">Q2Fmw6k=</td>
                  <td className="py-3 px-4 text-muted">Q2Fmw6k</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground font-sans">Space Rover</td>
                  <td className="py-3 px-4 text-muted font-sans">Clean Unicode plain text</td>
                  <td className="py-3 px-4 text-[#3F6212] dark:text-[#BEF264] font-semibold">U3BhY2UgUm92ZXI=</td>
                  <td className="py-3 px-4 text-muted">U3BhY2UgUm92ZXI</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground font-sans">foobar</td>
                  <td className="py-3 px-4 text-muted font-sans">RFC 4648 Vector</td>
                  <td className="py-3 px-4 text-[#3F6212] dark:text-[#BEF264] font-semibold">Zm9vYmFy</td>
                  <td className="py-3 px-4 text-muted">Zm9vYmFy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Technical Explanation */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Deep Dive"
            title="How Base64 Encoding Works"
            description="The mathematical mechanics behind converting 8-bit binary data to 6-bit ASCII characters."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted leading-relaxed font-normal">
            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <h3 className="text-sm font-semibold text-foreground">The 3-to-4 Character Ratio</h3>
              <p>
                Computers store binary data in 8-bit bytes (256 possible values). However, legacy
                transmission protocols (like early email SMTP and HTTP header fields) were designed
                only for 7-bit ASCII text and could corrupt raw binary bytes.
              </p>
              <p>
                Base64 solves this by taking groups of <strong>3 bytes (24 bits)</strong> and
                splitting them into <strong>4 groups of 6 bits</strong>. Each 6-bit group maps to one
                of 64 printable characters (<code className="font-mono text-[11px]">A–Z</code>, <code className="font-mono text-[11px]">a–z</code>, <code className="font-mono text-[11px]">0–9</code>, <code className="font-mono text-[11px]">+</code>, <code className="font-mono text-[11px]">/</code>). This produces a predictable <strong>33% size expansion</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Why Does Base64 Use Padding?</h3>
              <p>
                When your input length in bytes is not divisible by 3, trailing bytes remain. If 1
                byte remains (8 bits), it is converted into 2 Base64 characters (12 bits) with 4 zero
                bits of padding, followed by two <code className="font-mono text-[11px]">=</code> characters.
              </p>
              <p>
                If 2 bytes remain (16 bits), they are converted into 3 Base64 characters (18 bits)
                with 2 zero bits of padding, followed by one <code className="font-mono text-[11px]">=</code> character. The padding explicitly signals the exact number of bytes originally encoded.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Common Errors & Troubleshooting */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Troubleshooting"
            title="Common Base64 Encoding Issues"
            description="Practical solutions to common developer pitfalls when integrating Base64 strings."
          />

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                The &ldquo;InvalidCharacterError&rdquo; in JavaScript
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                If you run <code className="font-mono text-[11px]">btoa(&apos;Café&apos;)</code> in browser developer tools, you will receive an <code className="font-mono text-[11px]">InvalidCharacterError</code>. This happens because native <code className="font-mono text-[11px]">btoa()</code> only supports 1-byte Latin-1 characters. Our tool uses <code className="font-mono text-[11px]">new TextEncoder().encode()</code> to convert strings to UTF-8 binary bytes first, guaranteeing complete Unicode compatibility.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper">
              <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <LockIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
                <span>Base64 is an Encoding, NOT Encryption</span>
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Base64 is a data representation format, not a security mechanism. Anyone can decode
                a Base64 string back into plain text in milliseconds. Never rely on Base64 to conceal
                sensitive passwords, API keys, or private records without cryptographic encryption
                (such as AES-GCM).
              </p>
            </div>
          </div>
        </section>

        {/* 8. Genuine FAQ */}
        <section className="space-y-6 border-t border-border/70 pt-12 sm:pt-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Clear, technically accurate answers to common developer questions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted">
            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Does this tool send my data to a server?
              </h3>
              <p className="leading-relaxed font-normal">
                No. All encoding runs locally inside your browser via standard JavaScript Web APIs.
                You can verify this by checking your browser&apos;s Network tab or disconnecting from the internet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                What is the difference between Base64 and Base64URL?
              </h3>
              <p className="leading-relaxed font-normal">
                Standard Base64 uses <code className="font-mono text-[11px]">+</code> and <code className="font-mono text-[11px]">/</code>, which have reserved meanings in URL parameters and web paths. Base64URL replaces them with <code className="font-mono text-[11px]">-</code> and <code className="font-mono text-[11px]">_</code> so strings can be safely passed in query strings and JSON Web Tokens (JWTs).
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
