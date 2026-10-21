import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Base64DecoderTool } from "@/components/tools/Base64DecoderTool";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolPanel, ToolPanelBody } from "@/components/ui/ToolPanel";
import { ShieldCheckIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Base64 Decoder Online — Fast, Safe In-Browser Decoding",
  description:
    "Decode standard Base64 and Base64URL into UTF-8 text in your browser. Get clear errors for invalid characters, padding, and malformed input without uploading the string.",
  path: "/base64-decoder",
});

export default function Base64DecoderPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Base64 Decoder Online",
    description:
      "Decode standard Base64 and Base64URL strings into plain text or UTF-8 directly in your browser.",
    path: "/base64-decoder",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Base64 Decoder", path: "/base64-decoder" },
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
          <span className="text-foreground font-semibold">Decoder</span>
        </nav>

        {/* 1. Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Strict Validation • UTF-8 Safe</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64 Decoder Online
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Decode standard Base64 and Base64URL strings into readable plain text. Features strict
            malformed padding detection, binary byte separation, and local in-browser processing.
          </p>
        </section>

        {/* 2. Interactive Decoder Tool */}
        <section aria-label="Base64 Text Decoder Tool">
          <Base64DecoderTool initialBase64="SGVsbG8gV29ybGQ=" />
        </section>

        {/* 3. Verified Privacy Statement */}
        <section className="p-5 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center shrink-0 border border-[#84CC16]/25">
              <ShieldCheckIcon size={18} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Local In-Memory Decoding</p>
              <p className="text-xs text-muted">
                Your encoded strings are parsed and decoded entirely within this browser tab. Zero network transmission of inputs or outputs.
              </p>
            </div>
          </div>
          <Link
            href="/base64-encoder"
            className="text-xs font-semibold text-[#3F6212] dark:text-[#BEF264] hover:underline shrink-0"
          >
            Need to encode? Switch to Base64 Encoder →
          </Link>
        </section>

        {/* 4. Supported Formats */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Format Recognition"
            title="Standard Base64 vs Base64URL"
            description="Our engine automatically detects and respects the differences between standard and URL-safe encodings."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ToolPanel variant="subtle">
              <ToolPanelBody className="space-y-2.5">
                <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                  Standard RFC 4648 §4
                </span>
                <h3 className="text-sm font-semibold text-foreground">Standard Alphabet (+, /, =)</h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  The classic Base64 format used in email MIME, HTTP headers, and Data URIs. Uses <code className="font-mono text-[11px]">+</code> (62) and <code className="font-mono text-[11px]">/</code> (63) and requires or permits <code className="font-mono text-[11px]">=</code> padding to align on 4-byte boundaries.
                </p>
              </ToolPanelBody>
            </ToolPanel>

            <ToolPanel variant="subtle">
              <ToolPanelBody className="space-y-2.5">
                <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                  URL-Safe RFC 4648 §5
                </span>
                <h3 className="text-sm font-semibold text-foreground">Base64URL Alphabet (-, _)</h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Designed for URLs, query strings, and JSON Web Tokens (JWTs). Replaces <code className="font-mono text-[11px]">+</code> with <code className="font-mono text-[11px]">-</code> and <code className="font-mono text-[11px]">/</code> with <code className="font-mono text-[11px]">_</code>. Commonly omits trailing <code className="font-mono text-[11px]">=</code> padding characters.
                </p>
              </ToolPanelBody>
            </ToolPanel>
          </div>
        </section>

        {/* 5. Common Errors & Diagnostics */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Troubleshooting"
            title="Understanding Decoding Failures"
            description="Why Base64 strings fail to decode and how our diagnostic engine pinpoints the root cause."
          />

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-1.5">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Invalid Character Detected
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Base64 only allows 64 specific ASCII characters. Characters like spaces, question marks (<code className="font-mono text-[11px]">?</code>), quotes, or international symbols will trigger an invalid character error. By default, our tool automatically strips accidental whitespace (newlines and spaces), but rejects other disallowed characters.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-1.5">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Impossible Unpadded Length (Length % 4 === 1)
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Each Base64 character carries exactly 6 bits. Since the smallest unit of computer data is an 8-bit byte, a single Base64 character (6 bits) is mathematically insufficient to represent even a single byte. A valid Base64 string without padding can have a length modulo 4 of 0, 2, or 3, but <strong>never 1</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-1.5">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Binary Data vs Invalid UTF-8 Text
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                If someone encoded a PNG image, a PDF, or a compressed zip file to Base64, decoding it as plain text will fail because arbitrary binary bytes do not conform to valid UTF-8 sequences. Rudimentary decoders silently corrupt your screen with replacement characters (like <code className="font-mono"></code>). Our tool explicitly informs you when binary data is detected so you can download the raw file instead.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="space-y-6 border-t border-border/70 pt-12 sm:pt-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Practical answers to common decoding questions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted">
            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Can I decode Base64 strings that have newlines in them?
              </h3>
              <p className="leading-relaxed font-normal">
                Yes. Many legacy protocols (such as PEM certificates and MIME emails) wrap Base64 at 64 or 76 characters per line. By default, our decoder strips carriage returns and newlines before processing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Does decoding require internet access?
              </h3>
              <p className="leading-relaxed font-normal">
                No. The entire decoding engine runs locally on your computer via client-side JavaScript. You can use this utility completely offline.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
