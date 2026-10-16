import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileToBase64Tool } from "@/components/tools/FileToBase64Tool";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolPanel, ToolPanelBody } from "@/components/ui/ToolPanel";
import { ShieldCheckIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "File to Base64 Converter Online — Fast, Private Local Conversion",
  description:
    "Convert any file (PDF, image, audio, archive, or binary) into a Base64 string directly in your browser. 10MB safe ceiling, zero server uploads, 100% private.",
  alternates: {
    canonical: "https://base64toolkit.com/file-to-base64",
  },
  openGraph: {
    title: "File to Base64 Converter Online — Fast, Private Local Conversion",
    description:
      "Transform arbitrary binary files into RFC 4648 Base64 strings directly in your browser. Zero server uploads.",
    url: "https://base64toolkit.com/file-to-base64",
    type: "website",
  },
};

export default function FileToBase64Page() {
  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
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
              <p className="text-xs font-semibold text-foreground">Zero Upload Guarantee</p>
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
                  Base64 expands binary size by 33%. Storing multi-gigabyte strings in JavaScript heap can freeze the browser UI. We enforce a tested 10 MB ceiling to guarantee performance.
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
                To guarantee zero page freezing on phones and tablets, the in-browser default is 10 MB. In upcoming releases, background Web Workers will allow streaming larger files safely.
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
