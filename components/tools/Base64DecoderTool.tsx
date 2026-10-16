"use client";

import React, { useState, useId, useMemo } from "react";
import {
  decodeUtf8,
  base64ToBytes,
  detectBase64Format,
  calculateUtf8ByteLength,
  estimateDecodedByteLength,
} from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";

export interface Base64DecoderToolProps {
  initialBase64?: string;
  className?: string;
}

export function Base64DecoderTool({ initialBase64 = "", className = "" }: Base64DecoderToolProps) {
  const [input, setInput] = useState(initialBase64);
  const [mode, setMode] = useState<"auto" | "standard" | "urlsafe">("auto");
  const [whitespacePolicy, setWhitespacePolicy] = useState<"strip" | "reject">("strip");
  const [liveDecoding, setLiveDecoding] = useState(true);
  const [manualResult, setManualResult] = useState<{
    output: string;
    error: string | null;
    isBinary: boolean;
    rawByteCount: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  const inputId = useId();
  const outputId = useId();

  // Metrics & format analysis
  const inputCharCount = input.length;
  const detectedFormat = useMemo(() => detectBase64Format(input), [input]);
  const estimatedByteSize = useMemo(() => estimateDecodedByteLength(input), [input]);

  // Derived decoding computation
  const computed = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: null, isBinary: false, rawByteCount: 0 };
    }

    const isUrlSafe =
      mode === "urlsafe" ? true : mode === "standard" ? false : undefined;

    // 1. Try UTF-8 text decode
    const textResult = decodeUtf8(input, {
      urlSafe: isUrlSafe,
      whitespace: whitespacePolicy,
    });

    if (textResult.success) {
      return {
        output: textResult.data,
        error: null,
        isBinary: false,
        rawByteCount: calculateUtf8ByteLength(textResult.data),
      };
    }

    // 2. If it failed because it's binary data (not valid UTF-8):
    if (textResult.error.code === "INVALID_UTF8") {
      const byteResult = base64ToBytes(input, {
        urlSafe: isUrlSafe,
        whitespace: whitespacePolicy,
      });

      const byteLength = byteResult.success ? byteResult.data.length : 0;
      return {
        output: "",
        error: textResult.error.message,
        isBinary: true,
        rawByteCount: byteLength,
      };
    }

    // 3. Other validation error (padding, characters, length)
    return {
      output: "",
      error: textResult.error.message,
      isBinary: false,
      rawByteCount: 0,
    };
  }, [input, mode, whitespacePolicy]);

  const activeResult = liveDecoding ? computed : (manualResult || { output: "", error: null, isBinary: false, rawByteCount: 0 });
  const activeOutput = activeResult.output;
  const activeError = activeResult.error;
  const isBinaryPayload = activeResult.isBinary;

  const outputCharCount = activeOutput.length;
  const outputByteCount = calculateUtf8ByteLength(activeOutput);

  const handleManualDecode = () => {
    setManualResult(computed);
    if (computed.error) {
      setStatusAnnouncement(`Decoding failed: ${computed.error}`);
    } else {
      setStatusAnnouncement(`Decoded ${computed.output.length} characters successfully.`);
    }
  };

  const handleClear = () => {
    setInput("");
    setManualResult(null);
    setStatusAnnouncement("Cleared input and output.");
  };

  const handleLoadSample = () => {
    // "Base64 Toolkit 🚀 (UTF-8 tested: café, 你好)"
    const sample = "QmFzZTY0IFRvb2xraXQg8J+agCAoVVRGLTggdGVzdGVkOiBjYWbDqSwg5L2g5aW9KQ==";
    setInput(sample);
    if (!liveDecoding) {
      const isUrlSafe = mode === "urlsafe" ? true : mode === "standard" ? false : undefined;
      const res = decodeUtf8(sample, { urlSafe: isUrlSafe, whitespace: whitespacePolicy });
      setManualResult({
        output: res.success ? res.data : "",
        error: res.success ? null : res.error.message,
        isBinary: false,
        rawByteCount: res.success ? calculateUtf8ByteLength(res.data) : 0,
      });
    }
    setStatusAnnouncement("Loaded verified sample Base64 payload.");
  };

  const handleCopy = async () => {
    if (!activeOutput) return;
    try {
      await navigator.clipboard.writeText(activeOutput);
      setCopied(true);
      setStatusAnnouncement("Decoded text copied to clipboard.");
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
      a.download = `decoded-text-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusAnnouncement("Downloaded decoded text file.");
    } catch {
      setStatusAnnouncement("Failed to initiate file download.");
    }
  };

  return (
    <ToolPanel variant="primary" className={`w-full ${className}`}>
      {/* Header */}
      <ToolPanelHeader className="flex-wrap bg-[#FBFBFA] dark:bg-[#131316]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6259E8]" />
          <span className="font-semibold text-sm tracking-tight text-foreground">
            Text Decoder
          </span>
          <span
            className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
              detectedFormat === "invalid"
                ? "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
                : detectedFormat === "base64url"
                ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
                : detectedFormat === "standard"
                ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20"
                : "bg-black/[0.04] dark:bg-white/[0.06] text-muted border border-border"
            }`}
          >
            {detectedFormat === "standard"
              ? "Format: Standard Base64 (+, /)"
              : detectedFormat === "base64url"
              ? "Format: Base64URL (-, _)"
              : detectedFormat === "mixed"
              ? "Format: Mixed (Invalid)"
              : detectedFormat === "invalid"
              ? "Invalid Characters"
              : "Format: Ambiguous / Standard"}
          </span>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleLoadSample}
            title="Load a verified Base64 string with Unicode and emoji"
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

      {/* Body */}
      <ToolPanelBody className="space-y-5">
        {/* Error / Binary Alert */}
        {activeError && (
          <StatusMessage
            variant={isBinaryPayload ? "warning" : "error"}
            title={isBinaryPayload ? "Binary Data Detected" : "Validation Error"}
          >
            {activeError}
            {isBinaryPayload && (
              <div className="mt-2 text-xs font-normal">
                This Base64 string decodes into <strong>{activeResult.rawByteCount} raw binary bytes</strong>, but they do not form valid UTF-8 text characters. Rather than displaying broken question-mark symbols (<code className="font-mono"></code>), use our upcoming Base64-to-file utility to download the original binary file.
              </div>
            )}
          </StatusMessage>
        )}

        {/* Dual Pane Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Input Surface */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={inputId} className="font-semibold text-foreground">
                Base64 Encoded Input
              </label>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                  {inputCharCount} chars
                </span>
                {estimatedByteSize > 0 && (
                  <>
                    <span>•</span>
                    <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                      ~{estimatedByteSize} decoded bytes
                    </span>
                  </>
                )}
              </div>
            </div>

            <textarea
              id={inputId}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              placeholder="Paste Base64 or Base64URL string here (e.g. SGVsbG8gV29ybGQ=)..."
              className="w-full p-4 text-[13px] font-mono leading-relaxed bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:bg-surface focus:border-[#6259E8] focus:outline-none focus:ring-2 focus:ring-[#6259E8]/20 resize-y"
              aria-describedby="decoder-input-hint"
            />
            <p id="decoder-input-hint" className="text-[11px] text-muted leading-tight">
              Accepts standard RFC 4648 (+, /) and Base64URL (-, _) strings with or without padding.
            </p>
          </div>

          {/* Output Surface */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={outputId} className="font-semibold text-foreground">
                Decoded Plain Text (UTF-8)
              </label>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                  {outputCharCount} chars
                </span>
                <span>•</span>
                <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                  {outputByteCount} UTF-8 bytes
                </span>
              </div>
            </div>

            <textarea
              id={outputId}
              value={activeOutput}
              readOnly
              rows={8}
              placeholder={
                isBinaryPayload
                  ? "Input contains binary data that cannot be represented as UTF-8 text."
                  : "Decoded UTF-8 plain text will appear here..."
              }
              className={`w-full p-4 text-[13px] font-mono leading-relaxed bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:bg-surface focus:border-[#6259E8] focus:outline-none focus:ring-2 focus:ring-[#6259E8]/20 resize-y ${
                isBinaryPayload ? "opacity-60 bg-amber-500/[0.03]" : ""
              }`}
            />
            <p className="text-[11px] text-muted leading-tight">
              Validated using strict fatal UTF-8 decoding. Never produces corrupted replacement characters.
            </p>
          </div>
        </div>

        {/* Configuration Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs text-muted">
          <div className="flex flex-wrap items-center gap-4">
            {/* Format selection */}
            <div className="flex items-center gap-2">
              <span className="text-foreground font-medium">Format:</span>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as "auto" | "standard" | "urlsafe")}
                className="bg-[#F0F0EE] dark:bg-[#1E1E22] border border-border text-foreground rounded-lg px-2 py-1 text-xs focus:ring-[#6259E8]/30"
              >
                <option value="auto">Auto Detect</option>
                <option value="standard">Standard (+, /)</option>
                <option value="urlsafe">Base64URL (-, _)</option>
              </select>
            </div>

            {/* Whitespace policy */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={whitespacePolicy === "reject"}
                onChange={(e) => setWhitespacePolicy(e.target.checked ? "reject" : "strip")}
                className="rounded border-border text-[#6259E8] focus:ring-[#6259E8]/30"
              />
              <span>Strict Mode (Reject Whitespace)</span>
            </label>

            {/* Live auto-decode toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={liveDecoding}
                onChange={(e) => setLiveDecoding(e.target.checked)}
                className="rounded border-border text-[#6259E8] focus:ring-[#6259E8]/30"
              />
              <span>Live Auto-Decode</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!liveDecoding && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleManualDecode}
                disabled={!input}
              >
                Decode
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!activeOutput}
              title="Copy decoded text to clipboard"
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
                  Copy Text
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!activeOutput}
              title="Download decoded text as a .txt file"
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

      {/* Footer */}
      <ToolPanelFooter>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Strict Validation: Malformed padding or invalid characters are reported with exact diagnostics</span>
        </div>
        <div className="text-[11px] font-mono text-muted">
          100% In-Browser • Zero Telemetry
        </div>
      </ToolPanelFooter>

      {/* Screen reader live region */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusAnnouncement}
      </div>
    </ToolPanel>
  );
}
