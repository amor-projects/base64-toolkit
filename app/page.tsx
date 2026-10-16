import React from "react";
import Link from "next/link";
import { ToolPanel, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Base64EncoderTool } from "@/components/tools/Base64EncoderTool";
import {
  ShieldCheckIcon,
  CodeIcon,
  BoltIcon,
  FileIcon,
  ImageIcon,
  SwapIcon,
  TuneIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center">
      {/* Hero Section — Restrained, purposeful, Apple-level clarity */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/25 mb-5 shadow-whisper">
          <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
          <span>Privacy-First Architecture • In-Browser Utilities</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-foreground max-w-2xl leading-[1.12] font-sans">
          Precision Base64, processed entirely in your browser.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted max-w-xl leading-relaxed font-normal font-sans">
          Fast, private encoding, decoding, and diagnostics. No server uploads, no artificial
          delays, and strict RFC 4648 compliance.
        </p>

        {/* Spec highlights with Google Icons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-medium text-muted font-sans">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface border border-border/80 shadow-whisper">
            <ShieldCheckIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span className="text-foreground">Native Web APIs</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface border border-border/80 shadow-whisper">
            <CodeIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span className="text-foreground">Strict Multi-Byte UTF-8</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface border border-border/80 shadow-whisper">
            <BoltIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span className="text-foreground">Zero Network Latency</span>
          </div>
        </div>
      </section>

      {/* Flagship Tool Canvas — Application centerpiece */}
      <section id="encoder" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <Base64EncoderTool initialText="Hello World" />
      </section>

      {/* Planned Tool Suite — Apple/Raycast inspired card grid */}
      <section
        id="tools"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/70"
      >
        <SectionHeading
          eyebrow="Tool Suite"
          title="Engineered for every Base64 workflow"
          description="Each utility focuses on a specific data format with explicit boundary limits, local execution, and zero unnecessary dependencies."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {/* Card 1: Text Encoder */}
          <Link href="/base64-encoder" className="flex flex-col group">
            <ToolPanel variant="secondary" className="flex-1 flex flex-col justify-between group-hover:border-[#84CC16]/50 group-hover:shadow-card transition-all duration-200">
              <ToolPanelBody className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] font-mono">
                    Live Tool
                  </span>
                  <span className="text-[11px] text-muted font-mono">RFC 4648</span>
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors flex items-center gap-1.5">
                  <span>Base64 Text Encoder Online</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Bidirectional conversion of arbitrary UTF-8 text, multi-byte characters, and
                  emojis. Handles padding toggles and whitespace normalization without data loss.
                </p>
              </ToolPanelBody>
              <ToolPanelFooter>
                <span className="font-medium text-foreground">Input: UTF-8 Strings</span>
                <span className="text-[11px] text-[#27440D] dark:text-[#BEF264] font-semibold">Open Tool →</span>
              </ToolPanelFooter>
            </ToolPanel>
          </Link>

          {/* Card 2: Text Decoder */}
          <Link href="/base64-decoder" className="flex flex-col group">
            <ToolPanel variant="secondary" className="flex-1 flex flex-col justify-between group-hover:border-[#84CC16]/50 group-hover:shadow-card transition-all duration-200">
              <ToolPanelBody className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] font-mono">
                    Live Tool
                  </span>
                  <span className="text-[11px] text-muted font-mono">Diagnostics</span>
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors flex items-center gap-1.5">
                  <span>Base64 Text Decoder Online</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Strictly validates Base64 and Base64URL strings. Detects malformed padding and
                  intelligently separates binary payloads from plain UTF-8 text.
                </p>
              </ToolPanelBody>
              <ToolPanelFooter>
                <span className="font-medium text-foreground">Input: Base64 Strings</span>
                <span className="text-[11px] text-[#27440D] dark:text-[#BEF264] font-semibold">Open Tool →</span>
              </ToolPanelFooter>
            </ToolPanel>
          </Link>

          {/* Card 3: File Conversion */}
          <Link href="/file-to-base64" className="flex flex-col group">
            <ToolPanel variant="secondary" className="flex-1 flex flex-col justify-between group-hover:border-[#84CC16]/50 group-hover:shadow-card transition-all duration-200">
              <ToolPanelBody className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] font-mono">
                    Live Tool
                  </span>
                  <span className="text-[11px] text-muted font-mono">10MB Limit</span>
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors flex items-center gap-1.5">
                  <FileIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>File to Base64 & Download</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Convert arbitrary files (PDFs, archives, binaries) to Base64 strings, or turn
                  Base64 strings back into downloadable files with sanitized filenames.
                </p>
              </ToolPanelBody>
              <ToolPanelFooter>
                <span className="font-medium text-foreground">Input: Any Binary File</span>
                <span className="text-[11px] text-[#27440D] dark:text-[#BEF264] font-semibold">Open Tool →</span>
              </ToolPanelFooter>
            </ToolPanel>
          </Link>

          {/* Card 4: Image to Base64 */}
          <Link href="/image-to-base64" className="flex flex-col group">
            <ToolPanel variant="secondary" className="flex-1 flex flex-col justify-between group-hover:border-[#84CC16]/50 group-hover:shadow-card transition-all duration-200">
              <ToolPanelBody className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] font-mono">
                    Live Tool
                  </span>
                  <span className="text-[11px] text-muted font-mono">Data URI</span>
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors flex items-center gap-1.5">
                  <ImageIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Image & Data URI Studio</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Transform PNG, JPG, WebP, and SVG images into raw Base64 or ready-to-embed Data URIs
                  for HTML <code className="text-[11px] font-mono bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">&lt;img&gt;</code> and CSS <code className="text-[11px] font-mono bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">url()</code>.
                </p>
              </ToolPanelBody>
              <ToolPanelFooter>
                <span className="font-medium text-foreground">Input: Image Formats</span>
                <span className="text-[11px] text-[#27440D] dark:text-[#BEF264] font-semibold">Open Tool →</span>
              </ToolPanelFooter>
            </ToolPanel>
          </Link>

          {/* Card 5: Base64URL */}
          <Link href="/base64url-encoder" className="flex flex-col group">
            <ToolPanel variant="secondary" className="flex-1 flex flex-col justify-between group-hover:border-[#84CC16]/50 group-hover:shadow-card transition-all duration-200">
              <ToolPanelBody className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] font-mono">
                    Live Tool
                  </span>
                  <span className="text-[11px] text-muted font-mono">RFC 4648 §5</span>
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors flex items-center gap-1.5">
                  <SwapIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Base64URL Safe Converter</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  URL- and filename-safe encoding that swaps <code className="font-mono text-xs">+</code> and <code className="font-mono text-xs">/</code> for <code className="font-mono text-xs">-</code> and <code className="font-mono text-xs">_</code> with configurable unpadded modes for JWTs.
                </p>
              </ToolPanelBody>
              <ToolPanelFooter>
                <span className="font-medium text-foreground">Input: Tokens / URLs</span>
                <span className="text-[11px] text-[#27440D] dark:text-[#BEF264] font-semibold">Open Tool →</span>
              </ToolPanelFooter>
            </ToolPanel>
          </Link>

          {/* Card 6: Inspector */}
          <Link href="/base64-inspector" className="flex flex-col group">
            <ToolPanel variant="secondary" className="flex-1 flex flex-col justify-between group-hover:border-[#84CC16]/50 group-hover:shadow-card transition-all duration-200">
              <ToolPanelBody className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] font-mono">
                    Live Tool
                  </span>
                  <span className="text-[11px] text-muted font-mono">Diagnostics</span>
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors flex items-center gap-1.5">
                  <ShieldCheckIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Base64 Inspector & Validator</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Strictly validates Base64 and Base64URL strings. Pinpoints malformed padding, detects
                  magic byte headers, and identifies file formats in milliseconds.
                </p>
              </ToolPanelBody>
              <ToolPanelFooter>
                <span className="font-medium text-foreground">Input: Any Base64 String</span>
                <span className="text-[11px] text-[#27440D] dark:text-[#BEF264] font-semibold">Open Tool →</span>
              </ToolPanelFooter>
            </ToolPanel>
          </Link>

          {/* Card 7: Size Calculator */}
          <Link href="/base64-size-calculator" className="flex flex-col group">
            <ToolPanel variant="secondary" className="flex-1 flex flex-col justify-between group-hover:border-[#84CC16]/50 group-hover:shadow-card transition-all duration-200">
              <ToolPanelBody className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] font-mono">
                    Live Tool
                  </span>
                  <span className="text-[11px] text-muted font-mono">Math Engine</span>
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors flex items-center gap-1.5">
                  <TuneIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Size & Overhead Calculator</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Accurately compute the 4:3 (~33%) size expansion, Data URI byte overhead, and
                  bandwidth implications before sending encoded payloads across networks.
                </p>
              </ToolPanelBody>
              <ToolPanelFooter>
                <span className="font-medium text-foreground">Input: Byte / Char Count</span>
                <span className="text-[11px] text-[#27440D] dark:text-[#BEF264] font-semibold">Open Tool →</span>
              </ToolPanelFooter>
            </ToolPanel>
          </Link>

          {/* Card 8: Data URI Generator */}
          <Link href="/data-uri-generator" className="flex flex-col group">
            <ToolPanel variant="secondary" className="flex-1 flex flex-col justify-between group-hover:border-[#84CC16]/50 group-hover:shadow-card transition-all duration-200">
              <ToolPanelBody className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#27440D] dark:text-[#BEF264] font-mono">
                    Live Tool
                  </span>
                  <span className="text-[11px] text-muted font-mono">RFC 2397</span>
                </div>
                <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors flex items-center gap-1.5">
                  <CodeIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Data URI Studio</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Construct standard Data URIs with custom MIME types and generate ready-to-use HTML
                  and CSS code snippets.
                </p>
              </ToolPanelBody>
              <ToolPanelFooter>
                <span className="font-medium text-foreground">Input: Base64 / URI</span>
                <span className="text-[11px] text-[#27440D] dark:text-[#BEF264] font-semibold">Open Tool →</span>
              </ToolPanelFooter>
            </ToolPanel>
          </Link>
        </div>
      </section>

      {/* Privacy & Architecture Section — Trust through transparency */}
      <section
        id="privacy"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/70"
      >
        <SectionHeading
          eyebrow="Architecture"
          title="Privacy by design, not by promise"
          description="How Base64 Toolkit processes data locally without sacrificing performance or browser stability."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#84CC16]/15 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/30 flex items-center justify-center font-bold text-xs font-mono">
              01
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">
              Zero Server Intermediation
            </h3>
            <p className="text-xs text-muted leading-relaxed font-normal">
              Every operation executes strictly inside your browser’s local JavaScript runtime. Your
              files, security keys, and text never touch a server, proxy, or remote storage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#84CC16]/15 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/30 flex items-center justify-center font-bold text-xs font-mono">
              02
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">
              No Payload Telemetry
            </h3>
            <p className="text-xs text-muted leading-relaxed font-normal">
              Any analytics enabled for the product measure strictly high-level interface navigation.
              User input strings, Base64 payloads, and file names are never tracked or logged.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#84CC16]/15 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/30 flex items-center justify-center font-bold text-xs font-mono">
              03
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">
              Memory Ceiling Safeguards
            </h3>
            <p className="text-xs text-muted leading-relaxed font-normal">
              Base64 expands binary size by 33%. To protect browser stability and mobile devices from
              out-of-memory crashes, we enforce an explicit 25MB ceiling with in-UI warnings.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section
        id="learn"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/70"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Documentation"
            title="Understanding Base64 mechanics"
            description="In-depth technical guides covering encoding standards, padding rules, and performance trade-offs."
          />
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#27440D] dark:text-[#BEF264] hover:underline shrink-0"
          >
            <span>View All 5 Technical Guides</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <Link href="/learn/what-is-base64" className="flex flex-col group">
            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-card hover:border-[#65A30D]/40 dark:hover:border-[#BEF264]/40 hover:shadow-tool transition-all duration-200 flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono text-[#27440D] dark:text-[#BEF264] uppercase font-semibold">
                  Guide • Fundamentals
                </span>
                <h3 className="text-base font-semibold text-foreground group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors tracking-tight flex items-center justify-between">
                  <span>What Is Base64 and Why Is It Used?</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  How Base64 converts 8-bit binary data into a safe 64-character ASCII alphabet to
                  prevent corruption across plain-text communication channels (MIME, JSON, URLs).
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted">
                <span>5 min read</span>
                <span className="font-semibold text-[#27440D] dark:text-[#BEF264]">Read Guide →</span>
              </div>
            </div>
          </Link>

          <Link href="/learn/base64-vs-base64url" className="flex flex-col group">
            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-card hover:border-[#65A30D]/40 dark:hover:border-[#BEF264]/40 hover:shadow-tool transition-all duration-200 flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono text-[#27440D] dark:text-[#BEF264] uppercase font-semibold">
                  Guide • Standards
                </span>
                <h3 className="text-base font-semibold text-foreground group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors tracking-tight flex items-center justify-between">
                  <span>Standard Base64 vs Base64URL</span>
                  <ArrowRightIcon size={15} />
                </h3>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  Why standard Base64 characters <code className="font-mono text-xs">+</code> and <code className="font-mono text-xs">/</code> break URL query strings and filenames, and how RFC 4648 §5 solves it with <code className="font-mono text-xs">-</code> and <code className="font-mono text-xs">_</code>.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted">
                <span>4 min read</span>
                <span className="font-semibold text-[#27440D] dark:text-[#BEF264]">Read Guide →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
