"use client";

import React, { useState, useId, useMemo } from "react";
import { encodeUtf8, calculateUtf8ByteLength, estimateBase64Length } from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";

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
    const sample = "Base64 Toolkit — Fast, Private In-Browser Utility 🚀 (UTF-8 tested: naïve, café, 你好)";
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
      <ToolPanelHeader className="flex-wrap bg-[#FBFBFA] dark:bg-[#131316]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6259E8]" />
          <span className="font-semibold text-sm tracking-tight text-foreground">
            Text Encoder
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#6259E8]/8 text-[#6259E8] dark:text-[#756EF0] font-mono">
            {urlSafe ? "Base64URL" : "Standard RFC 4648"}
          </span>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleLoadSample}
            title="Load a sample string with Unicode and emoji"
          >
            Load Sample
          </Button>

          <Button
            variant="ghost"
            size="xs"
            onClick={handleClear}
            disabled={!input && !activeOutput}
            title="Clear all fields"
          >
            Clear
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
              <label htmlFor={inputId} className="font-semibold text-foreground">
                Plain Text Input
              </label>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                  {charCount} chars
                </span>
                <span>•</span>
                <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                  {byteCount} UTF-8 bytes
                </span>
              </div>
            </div>

            <textarea
              id={inputId}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder="Paste or type text here (Unicode, emoji, and multi-byte text fully supported)..."
              className="w-full p-4 text-[13px] font-mono leading-relaxed bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:bg-surface focus:border-[#6259E8] focus:outline-none focus:ring-2 focus:ring-[#6259E8]/20 resize-y"
              aria-describedby="input-byte-hint"
            />
            <p id="input-byte-hint" className="text-[11px] text-muted leading-tight">
              Character and byte counts differ for Unicode (e.g. accented letters and emojis require 2 to 4 bytes).
            </p>
          </div>

          {/* Output Surface */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={outputId} className="font-semibold text-foreground">
                Base64 Output
              </label>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                  {outputCharCount} chars
                </span>
                {byteCount > 0 && (
                  <>
                    <span>•</span>
                    <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
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
              rows={8}
              placeholder="Encoded Base64 output will appear here..."
              className="w-full p-4 text-[13px] font-mono leading-relaxed bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:bg-surface focus:border-[#6259E8] focus:outline-none focus:ring-2 focus:ring-[#6259E8]/20 resize-y"
            />
            <p className="text-[11px] text-muted leading-tight">
              Standard Base64 maps 3 bytes of raw data into 4 ASCII characters.
            </p>
          </div>
        </div>

        {/* Configuration Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs text-muted">
          <div className="flex flex-wrap items-center gap-4">
            {/* Format toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={urlSafe}
                onChange={(e) => setUrlSafe(e.target.checked)}
                className="rounded border-border text-[#6259E8] focus:ring-[#6259E8]/30"
              />
              <span className="text-foreground">Base64URL Safe (- and _)</span>
            </label>

            {/* Padding toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={padding}
                onChange={(e) => setPadding(e.target.checked)}
                className="rounded border-border text-[#6259E8] focus:ring-[#6259E8]/30"
              />
              <span className="text-foreground">Include Padding (=)</span>
            </label>

            {/* Live mode toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={liveEncoding}
                onChange={(e) => setLiveEncoding(e.target.checked)}
                className="rounded border-border text-[#6259E8] focus:ring-[#6259E8]/30"
              />
              <span>Live Auto-Encode</span>
            </label>
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
                Encode
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
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                  Copy Output
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
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.5V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download (.txt)
              </span>
            </Button>
          </div>
        </div>
      </ToolPanelBody>

      {/* Tool Footer */}
      <ToolPanelFooter>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
