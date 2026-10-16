import React from "react";
import {
  ToolPanel,
  ToolPanelHeader,
  ToolPanelBody,
  ToolPanelFooter,
} from "@/components/ui/ToolPanel";
import { Button } from "@/components/ui/Button";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center">
      {/* Hero Section — Restrained, purposeful, Apple-level clarity */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#6259E8]/8 dark:bg-[#756EF0]/12 text-[#6259E8] dark:text-[#756EF0] border border-[#6259E8]/15 mb-5 shadow-whisper">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6259E8] dark:bg-[#756EF0]" />
          <span>Privacy-First Architecture • Phase 1 Shell</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-foreground max-w-2xl leading-[1.12]">
          Precision Base64, processed entirely in your browser.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted max-w-xl leading-relaxed font-normal">
          Fast, private encoding, decoding, and diagnostics. No server uploads, no artificial
          delays, and strict RFC 4648 compliance.
        </p>

        {/* Spec highlights */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-medium text-muted">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border/80 shadow-whisper">
            <svg
              className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <span>Native Web APIs</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border/80 shadow-whisper">
            <svg
              className="w-3.5 h-3.5 text-[#6259E8] dark:text-[#756EF0]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
            <span>Strict Multi-Byte UTF-8</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border/80 shadow-whisper">
            <svg
              className="w-3.5 h-3.5 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            <span>Zero Network Latency</span>
          </div>
        </div>
      </section>

      {/* Flagship Tool Canvas — Application centerpiece */}
      <section id="encoder" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <ToolPanel variant="primary">
          {/* Canvas Header / Mode Bar */}
          <ToolPanelHeader className="flex-wrap bg-[#FBFBFA] dark:bg-[#131316]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6259E8]" />
                <span className="font-semibold text-sm tracking-tight text-foreground">
                  Base64 Text Studio
                </span>
              </div>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-medium">
                Active Architecture • Engine Hooks in Phase 2 & 3
              </span>
            </div>

            {/* Apple-style Fluid Segmented Mode Switcher */}
            <SegmentedControl
              options={[
                { id: "text", label: "Text Mode" },
                { id: "file", label: "File Mode", disabled: true, badge: "Soon" },
                { id: "image", label: "Image Mode", disabled: true, badge: "Soon" },
              ]}
              value="text"
              size="sm"
            />
          </ToolPanelHeader>

          {/* Canvas Workspace Body */}
          <ToolPanelBody className="space-y-6">
            <StatusMessage variant="info" title="Foundation Shell Active">
              The design token system and application container are established. The pure conversion
              engine (Phase 2) and live interactive controls (Phase 3) will mount directly into this
              canvas. Controls below are disabled previews to guarantee transparent, honest UX.
            </StatusMessage>

            {/* Dual Pane Layout (Input & Output) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Input Surface */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-medium text-muted">
                  <label htmlFor="canvas-input" className="text-foreground font-medium">
                    Input (Plain Text / UTF-8)
                  </label>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#F2F2F0] dark:bg-[#1E1E22] text-muted">
                    0 chars • 0 bytes
                  </span>
                </div>
                <textarea
                  id="canvas-input"
                  disabled
                  rows={8}
                  placeholder="Paste or type UTF-8 string here (Interactive input activates in Phase 3)..."
                  className="w-full p-4 text-[13px] font-mono leading-relaxed bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 rounded-2xl text-muted resize-none opacity-80 cursor-not-allowed select-none"
                />
              </div>

              {/* Output Surface */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-medium text-muted">
                  <label htmlFor="canvas-output" className="text-foreground font-medium">
                    Output (Base64 Encoded)
                  </label>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#F2F2F0] dark:bg-[#1E1E22] text-muted">
                    Overhead: ~133%
                  </span>
                </div>
                <textarea
                  id="canvas-output"
                  disabled
                  rows={8}
                  placeholder="RFC 4648 encoded output will be generated locally in your browser..."
                  className="w-full p-4 text-[13px] font-mono leading-relaxed bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 rounded-2xl text-muted resize-none opacity-80 cursor-not-allowed select-none"
                />
              </div>
            </div>

            {/* Options Bar & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs text-muted">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                  <input
                    type="checkbox"
                    disabled
                    checked
                    readOnly
                    className="rounded border-border text-[#6259E8]"
                  />
                  <span>Standard Base64 (RFC 4648)</span>
                </label>
                <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                  <input
                    type="checkbox"
                    disabled
                    checked
                    readOnly
                    className="rounded border-border text-[#6259E8]"
                  />
                  <span>Include Padding (=)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <Button variant="secondary" size="sm" disabled aria-disabled="true">
                  Clear
                </Button>
                <Button variant="outline" size="sm" disabled aria-disabled="true">
                  Copy Output
                </Button>
                <Button variant="primary" size="sm" disabled aria-disabled="true">
                  Encode (Phase 3)
                </Button>
              </div>
            </div>
          </ToolPanelBody>

          {/* Canvas Footer */}
          <ToolPanelFooter>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>In-Memory Execution: Input data never leaves this browser tab</span>
            </div>
            <div className="font-mono text-[11px] text-muted">
              UTF-8 Native • No btoa Latin-1 limitation
            </div>
          </ToolPanelFooter>
        </ToolPanel>
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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Text Studio */}
          <ToolPanel variant="secondary" className="flex flex-col justify-between hover:border-[#6259E8]/40 transition-all duration-200">
            <ToolPanelBody className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#6259E8]/8 dark:bg-[#756EF0]/14 text-[#6259E8] dark:text-[#756EF0] font-mono">
                  Phase 3 Flagship
                </span>
                <span className="text-[11px] text-muted font-mono">RFC 4648</span>
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Text Encoder & Decoder
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Bidirectional conversion of arbitrary UTF-8 text, multi-byte characters, and
                emojis. Handles padding toggles and whitespace normalization without data loss.
              </p>
            </ToolPanelBody>
            <ToolPanelFooter>
              <span className="font-medium text-foreground">Input: UTF-8 Strings</span>
              <span className="text-[11px] text-[#6259E8] dark:text-[#756EF0] font-medium">In Progress</span>
            </ToolPanelFooter>
          </ToolPanel>

          {/* Card 2: File Conversion */}
          <ToolPanel variant="secondary" className="flex flex-col justify-between hover:border-border transition-all duration-200">
            <ToolPanelBody className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-muted font-mono">
                  Phase 4 Planned
                </span>
                <span className="text-[11px] text-muted font-mono">25MB Limit</span>
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                File to Base64 & Download
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Convert arbitrary files (PDFs, archives, binaries) to Base64 strings, or turn
                Base64 strings back into downloadable files with sanitized filenames.
              </p>
            </ToolPanelBody>
            <ToolPanelFooter>
              <span className="font-medium text-foreground">Input: Any Binary File</span>
              <span className="text-[11px] text-muted">Planned</span>
            </ToolPanelFooter>
          </ToolPanel>

          {/* Card 3: Image to Base64 */}
          <ToolPanel variant="secondary" className="flex flex-col justify-between hover:border-border transition-all duration-200">
            <ToolPanelBody className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-muted font-mono">
                  Phase 4 Planned
                </span>
                <span className="text-[11px] text-muted font-mono">Data URI</span>
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Image & Data URI Studio
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Transform PNG, JPG, WebP, and SVG images into raw Base64 or ready-to-embed Data URIs
                for HTML <code className="text-[11px] font-mono bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">&lt;img&gt;</code> and CSS <code className="text-[11px] font-mono bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">url()</code>.
              </p>
            </ToolPanelBody>
            <ToolPanelFooter>
              <span className="font-medium text-foreground">Input: Image Formats</span>
              <span className="text-[11px] text-muted">Planned</span>
            </ToolPanelFooter>
          </ToolPanel>

          {/* Card 4: Base64URL */}
          <ToolPanel variant="secondary" className="flex flex-col justify-between hover:border-border transition-all duration-200">
            <ToolPanelBody className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-muted font-mono">
                  Phase 4 Planned
                </span>
                <span className="text-[11px] text-muted font-mono">RFC 4648 §5</span>
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Base64URL Safe Converter
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                URL- and filename-safe encoding that swaps <code className="font-mono text-xs">+</code> and <code className="font-mono text-xs">/</code> for <code className="font-mono text-xs">-</code> and <code className="font-mono text-xs">_</code> with configurable unpadded modes for JWTs.
              </p>
            </ToolPanelBody>
            <ToolPanelFooter>
              <span className="font-medium text-foreground">Input: Tokens / URLs</span>
              <span className="text-[11px] text-muted">Planned</span>
            </ToolPanelFooter>
          </ToolPanel>

          {/* Card 5: Inspector */}
          <ToolPanel variant="secondary" className="flex flex-col justify-between hover:border-border transition-all duration-200">
            <ToolPanelBody className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-muted font-mono">
                  Phase 4 Planned
                </span>
                <span className="text-[11px] text-muted font-mono">Diagnostics</span>
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Inspector & Validator
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Inspect malformed strings, validate character sets, check padding integrity, and
                heuristically detect MIME types with explicit disclaimers on certainty.
              </p>
            </ToolPanelBody>
            <ToolPanelFooter>
              <span className="font-medium text-foreground">Input: Encoded Strings</span>
              <span className="text-[11px] text-muted">Planned</span>
            </ToolPanelFooter>
          </ToolPanel>

          {/* Card 6: Size Calculator */}
          <ToolPanel variant="secondary" className="flex flex-col justify-between hover:border-border transition-all duration-200">
            <ToolPanelBody className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-muted font-mono">
                  Phase 4 Planned
                </span>
                <span className="text-[11px] text-muted font-mono">Math Engine</span>
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Size & Overhead Calculator
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Accurately compute the 4:3 (~33%) size expansion, Data URI byte overhead, and
                bandwidth implications before sending encoded payloads across networks.
              </p>
            </ToolPanelBody>
            <ToolPanelFooter>
              <span className="font-medium text-foreground">Input: Byte / Char Count</span>
              <span className="text-[11px] text-muted">Planned</span>
            </ToolPanelFooter>
          </ToolPanel>
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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs font-mono">
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
            <div className="w-8 h-8 rounded-xl bg-[#6259E8]/10 text-[#6259E8] dark:text-[#756EF0] border border-[#6259E8]/20 flex items-center justify-center font-bold text-xs font-mono">
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
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs font-mono">
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
        <SectionHeading
          eyebrow="Documentation"
          title="Understanding Base64 mechanics"
          description="Technical guides covering encoding standards, padding rules, and performance trade-offs."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono text-[#6259E8] dark:text-[#756EF0] uppercase">
                Guide • Fundamentals
              </span>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                What Is Base64 and Why Is It Used?
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                How Base64 converts 8-bit binary data into a safe 64-character ASCII alphabet to
                prevent corruption across plain-text communication channels (MIME, JSON, URLs).
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted">
              <span>Readiness: Phase 5</span>
              <span className="font-medium text-foreground">Coming Soon</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono text-[#6259E8] dark:text-[#756EF0] uppercase">
                Guide • Standards
              </span>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                Standard Base64 vs Base64URL
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                Why standard Base64 characters <code className="font-mono text-xs">+</code> and <code className="font-mono text-xs">/</code> break URL query strings and filenames, and how RFC 4648 §5 solves it with <code className="font-mono text-xs">-</code> and <code className="font-mono text-xs">_</code>.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted">
              <span>Readiness: Phase 5</span>
              <span className="font-medium text-foreground">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
