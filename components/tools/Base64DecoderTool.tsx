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
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import {
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ClearIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CodeIcon,
} from "@/components/ui/Icons";

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
    // "Base64 Toolkit (UTF-8 tested: café, naïve, 你好)"
    const sample = "QmFzZTY0IFRvb2xraXQgKFVURi04IHRlc3RlZDogY2Fmw6ksIG5hw692ZSwg5L2g5aW9KQ==";
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
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
          <span className="font-semibold text-sm tracking-tight text-foreground font-sans">
            Text Decoder
          </span>
          <span
            className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono font-medium ${
              detectedFormat === "invalid"
                ? "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
                : detectedFormat === "base64url"
                ? "bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25"
                : detectedFormat === "standard"
                ? "bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25"
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
            title="Load a verified Base64 string"
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
                This Base64 string decodes into <strong>{activeResult.rawByteCount} raw binary bytes</strong>, but they do not form valid UTF-8 text characters. Rather than displaying broken question-mark symbols, use our upcoming Base64-to-file utility to download the original binary file.
              </div>
            )}
          </StatusMessage>
        )}

        {/* Dual Pane Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Input Surface */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={inputId} className="font-semibold text-foreground font-sans">
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
              rows={12}
              placeholder="Paste Base64 or Base64URL string here (e.g. SGVsbG8gV29ybGQ=)..."
              className="w-full min-h-[280px] sm:min-h-[340px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
              aria-describedby="decoder-input-hint"
            />
            <p id="decoder-input-hint" className="text-[11px] text-muted leading-tight font-sans">
              Accepts standard RFC 4648 (+, /) and Base64URL (-, _) strings with or without padding.
            </p>
          </div>

          {/* Output Surface */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={outputId} className="font-semibold text-foreground font-sans">
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
              rows={12}
              placeholder={
                isBinaryPayload
                  ? "Input contains binary data that cannot be represented as UTF-8 text."
                  : "Decoded UTF-8 plain text will appear here..."
              }
              className={`w-full min-h-[280px] sm:min-h-[340px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y ${
                isBinaryPayload ? "opacity-60 bg-amber-500/[0.03]" : ""
              }`}
            />
            <p className="text-[11px] text-muted leading-tight font-sans">
              Validated using strict fatal UTF-8 decoding. Never produces corrupted replacement characters.
            </p>
          </div>
        </div>

        {/* Configuration Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs text-muted font-sans">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Format selection */}
            <div className="flex items-center gap-2">
              <span className="text-foreground font-medium">Format:</span>
              <Select
                value={mode}
                onChange={(e) => setMode(e.target.value as "auto" | "standard" | "urlsafe")}
              >
                <option value="auto">Auto Detect</option>
                <option value="standard">Standard (+, /)</option>
                <option value="urlsafe">Base64URL (-, _)</option>
              </Select>
            </div>

            <Checkbox
              checked={whitespacePolicy === "reject"}
              onChange={(e) => setWhitespacePolicy(e.target.checked ? "reject" : "strip")}
              label="Strict Mode (Reject Whitespace)"
            />

            <Checkbox
              checked={liveDecoding}
              onChange={(e) => setLiveDecoding(e.target.checked)}
              label="Live Auto-Decode"
            />
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
                <CodeIcon size={14} className="text-[#0F172A]" />
                <span>Decode</span>
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
                <span className="text-[#3F6212] dark:text-[#BEF264] font-semibold flex items-center gap-1.5">
                  <CheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <CopyIcon size={14} className="text-muted" />
                  <span>Copy Text</span>
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
              <DownloadIcon size={14} className="text-muted" />
              <span>Download (.txt)</span>
            </Button>
          </div>
        </div>
      </ToolPanelBody>

      {/* Footer */}
      <ToolPanelFooter>
        <div className="flex items-center gap-2 font-sans">
          <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
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
