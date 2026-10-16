"use client";

import React, { useState, useId, useMemo } from "react";
import { encodeUtf8, calculateUtf8ByteLength, estimateBase64Length } from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ClearIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CodeIcon,
} from "@/components/ui/Icons";

export interface Base64EncoderToolProps {
  initialText?: string;
  className?: string;
}

export function Base64EncoderTool({ initialText = "", className = "" }: Base64EncoderToolProps) {
  const [input, setInput] = useState(initialText);
  const [urlSafe, setUrlSafe] = useState(false);
  const [padding, setPadding] = useState(true);
  const [liveEncoding, setLiveEncoding] = useState(true);
  const [manualResult, setManualResult] = useState<{ output: string; error: string | null } | null>(null);
  const [copied, setCopied] = useState(false);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  const inputId = useId();
  const outputId = useId();

  // Metrics
  const charCount = input.length;
  const byteCount = calculateUtf8ByteLength(input);

  // Pure derived encoding calculation
  const computed = useMemo(() => {
    if (!input) {
      return { output: "", error: null };
    }
    try {
      const res = encodeUtf8(input, { urlSafe, pad: padding });
      return { output: res, error: null };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to encode input";
      return { output: "", error: msg };
    }
  }, [input, urlSafe, padding]);

  const activeOutput = liveEncoding ? computed.output : (manualResult ? manualResult.output : "");
  const activeError = liveEncoding ? computed.error : (manualResult ? manualResult.error : null);

  const outputCharCount = activeOutput.length;
  const estimatedByteOverhead = byteCount > 0 ? estimateBase64Length(byteCount, padding) : 0;

  const handleManualEncode = () => {
    setManualResult(computed);
    setStatusAnnouncement(`Encoded ${charCount} characters (${byteCount} bytes) successfully.`);
  };

  const handleClear = () => {
    setInput("");
    setManualResult(null);
    setStatusAnnouncement("Cleared input and output.");
  };

  const handleLoadSample = () => {
    const sample = "Base64 Toolkit — Fast, Private In-Browser Utility (UTF-8 tested: naïve, café, 你好)";
    setInput(sample);
    if (!liveEncoding) {
      try {
        const res = encodeUtf8(sample, { urlSafe, pad: padding });
        setManualResult({ output: res, error: null });
      } catch (err) {
        setManualResult({ output: "", error: err instanceof Error ? err.message : "Error" });
      }
    }
    setStatusAnnouncement("Sample Unicode text loaded.");
  };

  const handleCopy = async () => {
    if (!activeOutput) return;
    try {
      await navigator.clipboard.writeText(activeOutput);
      setCopied(true);
      setStatusAnnouncement("Encoded Base64 string copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatusAnnouncement("Could not access clipboard.");
    }
  };

  const handleDownload = () => {
    if (!activeOutput) return;
    try {
      const blob = new Blob([activeOutput], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `encoded-base64-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusAnnouncement("Downloaded encoded file.");
    } catch {
      setStatusAnnouncement("Failed to initiate file download.");
    }
  };

  return (
    <ToolPanel variant="primary" className={`w-full ${className}`}>
      {/* Tool Header */}
      <ToolPanelHeader className="flex-wrap bg-surface dark:bg-[#141417]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
          <span className="font-semibold text-sm tracking-tight text-foreground font-sans">
            Text Encoder
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25 font-mono font-medium">
            {urlSafe ? "Base64URL" : "Standard RFC 4648"}
          </span>
        </div>

        {/* Header Actions with Google Icons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleLoadSample}
            title="Load sample string"
          >
            <SparklesIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span>Load Sample</span>
          </Button>

          <Button
            variant="ghost"
            size="xs"
            onClick={handleClear}
            disabled={!input && !activeOutput}
            title="Clear all fields"
          >
            <ClearIcon size={14} className="text-muted" />
            <span>Clear</span>
          </Button>
        </div>
      </ToolPanelHeader>

      {/* Tool Body */}
      <ToolPanelBody className="space-y-5">
        {/* Error message callout */}
        {activeError && (
          <StatusMessage variant="error" title="Encoding Error">
            {activeError}
          </StatusMessage>
        )}

        {/* Dual Pane Layout (Input & Output) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Input Surface */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={inputId} className="font-semibold text-foreground font-sans">
                Plain Text Input
              </label>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="bg-black/[0.03] dark:bg-white/[0.06] border border-border/70 text-foreground/80 px-2 py-0.5 rounded-md">
                  {charCount} chars
                </span>
                <span>•</span>
                <span className="bg-black/[0.03] dark:bg-white/[0.06] border border-border/70 text-foreground/80 px-2 py-0.5 rounded-md">
                  {byteCount} UTF-8 bytes
                </span>
              </div>
            </div>

            <textarea
              id={inputId}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              placeholder="Paste or type text here (Unicode, international accents, and multi-byte text fully supported)..."
              className="w-full min-h-[280px] sm:min-h-[340px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
              aria-describedby="input-byte-hint"
            />
            <p id="input-byte-hint" className="text-[11px] text-muted leading-tight font-sans">
              Character and byte counts differ for multi-byte Unicode (e.g. accented letters and symbols require 2 to 4 bytes).
            </p>
          </div>

          {/* Output Surface */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={outputId} className="font-semibold text-foreground font-sans">
                Base64 Output
              </label>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="bg-black/[0.03] dark:bg-white/[0.06] border border-border/70 text-foreground/80 px-2 py-0.5 rounded-md">
                  {outputCharCount} chars
                </span>
                {byteCount > 0 && (
                  <>
                    <span>•</span>
                    <span className="bg-black/[0.03] dark:bg-white/[0.06] border border-border/70 text-foreground/80 px-2 py-0.5 rounded-md">
                      +{Math.max(0, estimatedByteOverhead - byteCount)} B overhead (~33%)
                    </span>
                  </>
                )}
              </div>
            </div>

            <textarea
              id={outputId}
              value={activeOutput}
              readOnly
              rows={12}
              placeholder="Encoded Base64 output will appear here..."
              className="w-full min-h-[280px] sm:min-h-[340px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
            />
            <p className="text-[11px] text-muted leading-tight font-sans">
              Standard Base64 maps 3 bytes of raw data into 4 ASCII characters.
            </p>
          </div>
        </div>

        {/* Configuration Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs text-muted font-sans">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Checkbox
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              label="Base64URL Safe (- and _)"
            />

            <Checkbox
              checked={padding}
              onChange={(e) => setPadding(e.target.checked)}
              label="Include Padding (=)"
            />

            <Checkbox
              checked={liveEncoding}
              onChange={(e) => setLiveEncoding(e.target.checked)}
              label="Live Auto-Encode"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!liveEncoding && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleManualEncode}
                disabled={!input}
              >
                <CodeIcon size={14} className="text-[#0F172A]" />
                <span>Encode</span>
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!activeOutput}
              title="Copy Base64 output to clipboard"
            >
              {copied ? (
                <span className="text-[#3F6212] dark:text-[#BEF264] font-semibold flex items-center gap-1.5">
                  <CheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <CopyIcon size={14} className="text-muted" />
                  <span>Copy Output</span>
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!activeOutput}
              title="Download output as a text file"
            >
              <DownloadIcon size={14} className="text-muted" />
              <span>Download (.txt)</span>
            </Button>
          </div>
        </div>
      </ToolPanelBody>

      {/* Tool Footer */}
      <ToolPanelFooter>
        <div className="flex items-center gap-2 font-sans">
          <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
          <span>Local Engine: Data is encoded directly on your device via TextEncoder</span>
        </div>
        <div className="text-[11px] font-mono text-muted">
          100% Client-Side • Zero Server Storage
        </div>
      </ToolPanelFooter>

      {/* Screen reader live region for status announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusAnnouncement}
      </div>
    </ToolPanel>
  );
}
