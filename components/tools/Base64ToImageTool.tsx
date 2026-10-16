"use client";

import React, { useState, useId, useMemo, useEffect } from "react";
import {
  base64ToBytes,
  base64ToDownloadBlob,
  createDataUri,
  parseDataUri,
  inferMimeFromBytes,
  formatBytes,
} from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { Input } from "@/components/ui/Input";
import {
  DownloadIcon,
  ClearIcon,
  ShieldCheckIcon,
  ImageIcon,
  SparklesIcon,
} from "@/components/ui/Icons";

export function Base64ToImageTool() {
  const [input, setInput] = useState("");
  const [filename, setFilename] = useState("decoded-image");
  const [error, setError] = useState<string | null>(null);
  const [imageDims, setImageDims] = useState<{ width: number; height: number } | null>(null);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  const inputId = useId();
  const filenameId = useId();

  // Extract raw base64 and determine mime
  const { cleanBase64, mimeType } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { cleanBase64: "", mimeType: "image/png" };

    if (trimmed.startsWith("data:")) {
      const parsed = parseDataUri(trimmed);
      if (parsed.success) {
        return { cleanBase64: parsed.data.data, mimeType: parsed.data.mimeType };
      }
    }

    const byteRes = base64ToBytes(trimmed);
    if (byteRes.success && byteRes.data.length > 0) {
      const inferred = inferMimeFromBytes(byteRes.data);
      if (inferred) {
        return { cleanBase64: trimmed, mimeType: inferred.mimeType };
      }
    }

    return { cleanBase64: trimmed, mimeType: "image/png" };
  }, [input]);

  const byteRes = useMemo(() => {
    if (!cleanBase64) return null;
    return base64ToBytes(cleanBase64);
  }, [cleanBase64]);

  const previewDataUri = useMemo(() => {
    if (byteRes && byteRes.success && byteRes.data.length > 0) {
      return createDataUri(cleanBase64, mimeType);
    }
    return null;
  }, [cleanBase64, mimeType, byteRes]);

  // Load preview dimensions
  useEffect(() => {
    if (!previewDataUri) {
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) {
        setImageDims({ width: img.naturalWidth, height: img.naturalHeight });
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setImageDims(null);
      }
    };
    img.src = previewDataUri;

    return () => {
      cancelled = true;
    };
  }, [previewDataUri]);

  const handleDownload = () => {
    setError(null);
    if (!cleanBase64) {
      setError("Please paste a valid Base64 image string.");
      return;
    }

    const ext = mimeType.replace("image/", "").replace("jpeg", "jpg").replace("+xml", "");
    const targetName = filename.includes(".") ? filename : `${filename}.${ext}`;

    const res = base64ToDownloadBlob(cleanBase64, targetName, mimeType);
    if (res.success) {
      const a = document.createElement("a");
      a.href = res.data.url;
      a.download = res.data.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        res.data.revoke();
      }, 1000);

      setStatusAnnouncement(`Downloaded image ${res.data.filename}.`);
    } else {
      setError(res.error.message);
    }
  };

  const handleClear = () => {
    setInput("");
    setImageDims(null);
    setError(null);
    setStatusAnnouncement("Cleared input.");
  };

  const handleLoadSample = () => {
    // 10x10 green square PNG
    const sample = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9QzwAEjDAGYzAAAO9bDAc01c0wAAAAAElFTkSuQmCC";
    setInput(sample);
    setFilename("green-square.png");
    setStatusAnnouncement("Sample image Base64 loaded.");
  };

  return (
    <ToolPanel variant="primary" className="w-full">
      <ToolPanelHeader className="flex-wrap bg-[#FBFBFA] dark:bg-[#131316]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
          <span className="font-semibold text-sm tracking-tight text-foreground font-sans">
            Base64 to Image Decoder & Preview
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25 font-mono font-medium">
            Live Safe Preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" onClick={handleLoadSample} title="Load sample image Base64">
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
          <StatusMessage variant="error" title="Image Decoding Notice">
            {error}
          </StatusMessage>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Base64 Input Area */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={inputId} className="font-semibold text-foreground font-sans">
                Base64 or Data URI String
              </label>
              <span className="font-mono text-[11px] text-muted">
                {input.length} characters
              </span>
            </div>

            <textarea
              id={inputId}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              placeholder="Paste image Base64 string or data:image/... URI here..."
              className="w-full min-h-[260px] sm:min-h-[300px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
            />
          </div>

          {/* Visual Preview Box */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground font-sans">
              Decoded Visual Preview
            </span>

            <div className="border border-border/80 rounded-2xl p-4 bg-surface flex flex-col items-center justify-center text-center min-h-[260px] sm:min-h-[300px]">
              {previewDataUri ? (
                <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
                  <div className="w-full h-44 flex items-center justify-center bg-[#F4F4F2] dark:bg-[#1E1E22] rounded-xl overflow-hidden p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewDataUri}
                      alt="Decoded Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-[11px] font-mono text-muted">
                    {imageDims && (
                      <span className="text-foreground font-semibold">
                        {imageDims.width} × {imageDims.height} px
                      </span>
                    )}
                    {byteRes && byteRes.success && (
                      <span>Size: {formatBytes(byteRes.data.length)}</span>
                    )}
                    <span>Format: {mimeType}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-muted flex flex-col items-center gap-2">
                  <ImageIcon size={28} className="opacity-40" />
                  <span>Preview will render here upon pasting a valid Base64 image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Download controls */}
        <div className="p-5 rounded-2xl bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex-1 w-full max-w-sm flex flex-col gap-1.5">
            <label htmlFor={filenameId} className="text-xs font-semibold text-foreground">
              Save Filename
            </label>
            <Input
              id={filenameId}
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="filename (e.g. photo.png)"
              isMono
            />
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleDownload}
            disabled={!previewDataUri}
            className="w-full sm:w-auto"
          >
            <DownloadIcon size={16} className="text-[#0F172A]" />
            <span>Download Image File</span>
          </Button>
        </div>
      </ToolPanelBody>

      <ToolPanelFooter>
        <div className="flex items-center gap-2 font-sans">
          <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
          <span>Local Image Engine: Decoded in-memory and rendered without server uploads</span>
        </div>
        <div className="text-[11px] font-mono text-muted">Zero Telemetry</div>
      </ToolPanelFooter>

      <div className="sr-only" role="status" aria-live="polite">
        {statusAnnouncement}
      </div>
    </ToolPanel>
  );
}
