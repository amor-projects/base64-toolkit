"use client";

import React, { useState, useId, useMemo } from "react";
import {
  base64ToBytes,
  base64ToDownloadBlob,
  sanitizeFilename,
  formatBytes,
  inferMimeFromBytes,
} from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { Input } from "@/components/ui/Input";
import {
  DownloadIcon,
  ClearIcon,
  ShieldCheckIcon,
  FileIcon,
  LockIcon,
  SparklesIcon,
} from "@/components/ui/Icons";

export function Base64ToFileTool() {
  const [input, setInput] = useState("");
  const [filename, setFilename] = useState("decoded-file");
  const [error, setError] = useState<string | null>(null);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  const inputId = useId();
  const filenameId = useId();

  // Metrics & inference
  const byteRes = useMemo(() => {
    if (!input.trim()) return null;
    let clean = input.trim();
    if (clean.startsWith("data:")) {
      const comma = clean.indexOf(",");
      if (comma !== -1) clean = clean.substring(comma + 1);
    }
    return base64ToBytes(clean);
  }, [input]);

  const inferredMime = useMemo(() => {
    if (byteRes && byteRes.success && byteRes.data.length > 0) {
      return inferMimeFromBytes(byteRes.data);
    }
    return null;
  }, [byteRes]);

  const handleDownload = () => {
    setError(null);
    if (!input.trim()) {
      setError("Please paste a Base64 string before downloading.");
      return;
    }

    let clean = input.trim();
    if (clean.startsWith("data:")) {
      const comma = clean.indexOf(",");
      if (comma !== -1) clean = clean.substring(comma + 1);
    }

    const ext = inferredMime ? inferredMime.extension : "bin";
    const targetName = filename.includes(".") ? filename : `${filename}.${ext}`;
    const sanitized = sanitizeFilename(targetName);

    const res = base64ToDownloadBlob(
      clean,
      sanitized,
      inferredMime ? inferredMime.mimeType : "application/octet-stream"
    );

    if (res.success) {
      const a = document.createElement("a");
      a.href = res.data.url;
      a.download = res.data.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up memory
      setTimeout(() => {
        res.data.revoke();
      }, 1000);

      setStatusAnnouncement(`Downloaded ${res.data.filename} (${formatBytes(res.data.size)}).`);
    } else {
      setError(res.error.message);
      setStatusAnnouncement(`Failed to decode file: ${res.error.message}`);
    }
  };

  const handleClear = () => {
    setInput("");
    setError(null);
    setStatusAnnouncement("Cleared input.");
  };

  const handleLoadSample = () => {
    // 1x1 transparent PNG Base64
    const samplePng = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    setInput(samplePng);
    setFilename("sample-pixel.png");
    setStatusAnnouncement("Sample PNG Base64 string loaded.");
  };

  return (
    <ToolPanel variant="primary" className="w-full">
      <ToolPanelHeader className="flex-wrap bg-[#FBFBFA] dark:bg-[#131316]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
          <span className="font-semibold text-sm tracking-tight text-foreground font-sans">
            Base64 to File Converter
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25 font-mono font-medium">
            Blob Download • In-Memory
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" onClick={handleLoadSample} title="Load sample Base64 image string">
            <SparklesIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span>Load Sample</span>
          </Button>

          <Button variant="ghost" size="xs" onClick={handleClear} disabled={!input} title="Clear field">
            <ClearIcon size={14} className="text-muted" />
            <span>Clear</span>
          </Button>
        </div>
      </ToolPanelHeader>

      <ToolPanelBody className="space-y-6">
        {error && (
          <StatusMessage variant="error" title="Decoding Error">
            {error}
          </StatusMessage>
        )}

        {/* Input Surface */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={inputId} className="font-semibold text-foreground font-sans">
              Base64 or Data URI Input
            </label>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                {input.length} chars
              </span>
              {byteRes && byteRes.success && (
                <>
                  <span>•</span>
                  <span className="bg-[#F0F0EE] dark:bg-[#1E1E22] px-2 py-0.5 rounded-md">
                    {formatBytes(byteRes.data.length)} binary bytes
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
            placeholder="Paste raw Base64 string or data:... URI here..."
            className="w-full min-h-[260px] sm:min-h-[300px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
          />
        </div>

        {/* Inferred Type Callout */}
        {inferredMime && (
          <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#84CC16]/15 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center">
                <FileIcon size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">
                  Inferred Format: {inferredMime.label} (.{inferredMime.extension})
                </span>
                <span className="text-muted text-[11px]">
                  {inferredMime.description} (Inferred from magic bytes, not verified metadata)
                </span>
              </div>
            </div>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-muted">
              {inferredMime.mimeType}
            </span>
          </div>
        )}

        {/* Filename & Download Controls */}
        <div className="p-5 rounded-2xl bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex-1 w-full max-w-sm flex flex-col gap-1.5">
            <label htmlFor={filenameId} className="text-xs font-semibold text-foreground">
              Save Filename
            </label>
            <Input
              id={filenameId}
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="filename (e.g. document.pdf)"
              isMono
            />
            <p className="text-[11px] text-muted">
              Filename will be sanitized to strip path traversals and illegal characters.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleDownload}
            disabled={!input.trim()}
            className="w-full sm:w-auto"
          >
            <DownloadIcon size={16} className="text-[#0F172A]" />
            <span>Decode & Download File</span>
          </Button>
        </div>

        {/* Untrusted byte advisory */}
        <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-border/60 text-xs text-muted flex items-start gap-2.5">
          <LockIcon size={15} className="text-muted shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Security Notice:</strong> Decoded bytes represent untrusted user data. They are never executed, rendered as HTML, or injected into the browser DOM. Downloaded files are saved to your disk using sandboxed Blob object URLs.
          </p>
        </div>
      </ToolPanelBody>

      <ToolPanelFooter>
        <div className="flex items-center gap-2 font-sans">
          <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
          <span>Local Blob Engine: File created directly in your browser memory</span>
        </div>
        <div className="text-[11px] font-mono text-muted">Automatic Object URL Cleanup</div>
      </ToolPanelFooter>

      <div className="sr-only" role="status" aria-live="polite">
        {statusAnnouncement}
      </div>
    </ToolPanel>
  );
}
