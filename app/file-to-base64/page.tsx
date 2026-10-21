import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileToBase64Tool } from "@/components/tools/FileToBase64Tool";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolPanel, ToolPanelBody } from "@/components/ui/ToolPanel";
import { ShieldCheckIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "File to Base64 Converter Online — Fast, Private Local Conversion",
  description:
    "Convert a PDF, image, archive, audio file, or other binary file to Base64 in your browser. Local processing, clear size limits, and no conversion upload.",
  path: "/file-to-base64",
});

export default function FileToBase64Page() {
  const webAppSchema = generateWebApplicationSchema({
    name: "File to Base64 Converter Online",
    description:
      "Convert any file (PDF, image, audio, archive, or binary) into a Base64 string directly in your browser.",
    path: "/file-to-base64",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "File to Base64", path: "/file-to-base64" },
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
          <span className="text-foreground font-semibold">File to Base64</span>
        </nav>

        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Local In-Memory Converter • Zero Network Latency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            File to Base64 Converter
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Convert PDFs, documents, binaries, and audio files into standard Base64 or Base64URL
            strings. Processed completely within your local browser memory with an enforced 10 MB ceiling.
          </p>
        </section>

        {/* Tool */}
        <section aria-label="File to Base64 Tool">
          <FileToBase64Tool />
        </section>

        {/* Privacy Notice */}
        <section className="p-5 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center shrink-0 border border-[#84CC16]/25">
              <ShieldCheckIcon size={18} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Local file processing</p>
              <p className="text-xs text-muted">
                Your files are read via browser-native <code className="font-mono text-[11px] bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">FileReader</code> and <code className="font-mono text-[11px] bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">ArrayBuffer</code>. No file bytes or filenames ever leave your machine.
              </p>
            </div>
          </div>
          <Link
            href="/base64-to-file"
            className="text-xs font-semibold text-[#3F6212] dark:text-[#BEF264] hover:underline shrink-0"
          >
            Need to decode a file? Switch to Base64 to File →
          </Link>
        </section>

        {/* Key Features */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Architecture"
            title="Engineered for Browser Stability"
            description="How we ensure reliable client-side file encoding without crashing low-memory or mobile devices."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ToolPanel variant="subtle">
              <ToolPanelBody className="space-y-2.5">
                <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                  01 • 10 MB Ceiling
                </span>
                <h3 className="text-sm font-semibold text-foreground">Memory Crash Prevention</h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Base64 expands binary size by about 33%. Keeping the input under the 10 MB ceiling
                  limits memory pressure while the browser holds the file and output string.
                </p>
              </ToolPanelBody>
            </ToolPanel>

            <ToolPanel variant="subtle">
              <ToolPanelBody className="space-y-2.5">
                <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                  02 • Chunked Processing
                </span>
                <h3 className="text-sm font-semibold text-foreground">Stack-Safe Encoding</h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Passing large buffers into <code className="font-mono text-[11px]">String.fromCharCode(...buffer)</code> causes a Maximum Call Stack Size Exceeded error. Our engine slices inputs into safe 8,190-byte chunks.
                </p>
              </ToolPanelBody>
            </ToolPanel>

            <ToolPanel variant="subtle">
              <ToolPanelBody className="space-y-2.5">
                <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                  03 • Any File Format
                </span>
                <h3 className="text-sm font-semibold text-foreground">Binary Transparency</h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Works seamlessly with arbitrary 8-bit octet streams: PDFs, executables, ZIP archives, fonts, and media files with zero byte loss or text re-encoding corruptions.
                </p>
              </ToolPanelBody>
            </ToolPanel>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6 border-t border-border/70 pt-12 sm:pt-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Clear answers about file conversion and browser limits."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted">
            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Can I convert files larger than 10 MB?
              </h3>
              <p className="leading-relaxed font-normal">
                This release accepts files up to 10 MB. Larger files may require more browser memory
                than this page is designed to reserve, so use a local desktop tool or split the file
                when you need to process more data.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Does a Base64 string include the original filename?
              </h3>
              <p className="leading-relaxed font-normal">
                No. Standard RFC 4648 Base64 only encodes raw file bytes. The filename and metadata are not embedded unless specifically encoded into a JSON envelope or archive format.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
