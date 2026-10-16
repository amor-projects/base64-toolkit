import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Base64ToFileTool } from "@/components/tools/Base64ToFileTool";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheckIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Base64 to File Converter Online — Decode & Download Files",
  description:
    "Convert and download Base64 or Data URI strings back into original binary files (PDFs, images, ZIPs, audio) directly in your browser. Automatic filename sanitization.",
  alternates: {
    canonical: "https://base64toolkit.com/base64-to-file",
  },
  openGraph: {
    title: "Base64 to File Converter Online — Decode & Download Files",
    description:
      "Decode Base64 strings directly into downloadable binary files with automatic file-type detection.",
    url: "https://base64toolkit.com/base64-to-file",
    type: "website",
  },
};

export default function Base64ToFilePage() {
  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Local Blob Construction • Untrusted Byte Sanitization</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64 to File Converter
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Decode Base64 strings and Data URIs back into downloadable binary files. Automatically
            inspects file signatures to infer extensions, with strict filename sanitization.
          </p>
        </section>

        {/* Tool */}
        <section aria-label="Base64 to File Tool">
          <Base64ToFileTool />
        </section>

        {/* Privacy Notice */}
        <section className="p-5 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center shrink-0 border border-[#84CC16]/25">
              <ShieldCheckIcon size={18} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">In-Memory Sandboxed Download</p>
              <p className="text-xs text-muted">
                Downloaded files are generated in-memory via <code className="font-mono text-[11px] bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">URL.createObjectURL()</code> and immediately revoked. No intermediate server files are ever created.
              </p>
            </div>
          </div>
          <Link
            href="/file-to-base64"
            className="text-xs font-semibold text-[#3F6212] dark:text-[#BEF264] hover:underline shrink-0"
          >
            Need to encode a file? Switch to File to Base64 →
          </Link>
        </section>

        {/* Security & Architecture */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Security Principles"
            title="Treating Decoded Bytes as Untrusted"
            description="Why converting Base64 to files requires deliberate defensive engineering."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted leading-relaxed font-normal">
            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Filename Sanitization</h3>
              <p>
                User-provided filenames can contain path traversal characters (such as <code className="font-mono text-[11px]">../../</code>), null bytes (<code className="font-mono text-[11px]">\0</code>), or illegal filesystem tokens. Our sanitizer strips all directory prefixes and normalizes names to prevent unintended file placement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Zero Code Execution</h3>
              <p>
                Decoded bytes are never injected into the browser DOM or evaluated as scripts. Even if a Base64 string encodes malicious HTML or SVG payloads, it is downloaded strictly as an isolated file without browser execution.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
