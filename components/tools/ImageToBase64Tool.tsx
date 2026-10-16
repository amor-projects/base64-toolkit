"use client";

import React, { useState, useRef, useId } from "react";
import {
  fileToBase64,
  formatBytes,
  createDataUri,
  formatHtmlImgSnippet,
  formatCssSnippet,
  DEFAULT_MAX_FILE_SIZE_BYTES,
  ReadFileResult,
} from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import {
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ClearIcon,
  ShieldCheckIcon,
  ImageIcon,
} from "@/components/ui/Icons";

export function ImageToBase64Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ReadFileResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDims, setImageDims] = useState<{ width: number; height: number } | null>(null);
  const [base64Raw, setBase64Raw] = useState("");
  const [outputMode, setOutputMode] = useState<"data-uri" | "raw" | "html" | "css">("data-uri");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const outputId = useId();

  const processImage = async (selectedFile: File) => {
    setError(null);
    setFile(selectedFile);

    // Validate that it's an image
    if (!selectedFile.type.startsWith("image/") && !selectedFile.name.match(/\.(png|jpe?g|webp|gif|svg)$/i)) {
      setError("Please select an image file (PNG, JPG, WebP, GIF, SVG).");
      return;
    }

    // Create safe preview object URL
    const preview = URL.createObjectURL(selectedFile);
    setPreviewUrl(preview);

    // Measure dimensions safely
    const img = new Image();
    img.onload = () => {
      setImageDims({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = preview;

    const res = await fileToBase64(selectedFile, {}, DEFAULT_MAX_FILE_SIZE_BYTES);

    if (res.success) {
      setBase64Raw(res.data.base64);
      setMetadata(res.data.metadata);
      setStatusAnnouncement(`Converted image ${selectedFile.name} (${formatBytes(selectedFile.size)}).`);
    } else {
      setBase64Raw("");
      setMetadata(null);
      setError(res.error.message);
      setStatusAnnouncement(`Error: ${res.error.message}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) processImage(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) processImage(droppedFile);
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setMetadata(null);
    setPreviewUrl(null);
    setImageDims(null);
    setBase64Raw("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setStatusAnnouncement("Cleared image.");
  };

  // Determine active output string based on mode
  const dataUriString = base64Raw ? createDataUri(base64Raw, file?.type || "image/png") : "";
  const getActiveOutput = () => {
    if (!base64Raw) return "";
    switch (outputMode) {
      case "data-uri":
        return dataUriString;
      case "raw":
        return base64Raw;
      case "html":
        return formatHtmlImgSnippet(dataUriString, file?.name || "Embedded Image");
      case "css":
        return formatCssSnippet(dataUriString);
    }
  };

  const activeOutput = getActiveOutput();

  const handleCopy = async () => {
    if (!activeOutput) return;
    try {
      await navigator.clipboard.writeText(activeOutput);
      setCopied(true);
      setStatusAnnouncement("Copied snippet to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatusAnnouncement("Failed to copy to clipboard.");
    }
  };

  const handleDownload = () => {
    if (!activeOutput || !file) return;
    try {
      const blob = new Blob([activeOutput], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name}.${outputMode}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusAnnouncement("Downloaded output text file.");
    } catch {
      setStatusAnnouncement("Failed to download file.");
    }
  };

  return (
    <ToolPanel variant="primary" className="w-full">
      <ToolPanelHeader className="flex-wrap bg-surface dark:bg-[#141417]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
          <span className="font-semibold text-sm tracking-tight text-foreground font-sans">
            Image to Base64 Studio
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25 font-mono font-medium">
            Data URI & HTML/CSS Snippets
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" onClick={handleClear} disabled={!file && !base64Raw} title="Clear field">
            <ClearIcon size={14} className="text-muted" />
            <span>Clear</span>
          </Button>
        </div>
      </ToolPanelHeader>

      <ToolPanelBody className="space-y-6">
        {error && (
          <StatusMessage variant="error" title="Image Processing Notice">
            {error}
          </StatusMessage>
        )}

        {/* Upload Zone / Drop area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            aria-label="Upload or select image for conversion"
            className={`md:col-span-2 border-2 border-dashed rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDragging
                ? "border-[#84CC16] bg-[#84CC16]/10 scale-[1.01]"
                : "border-border/90 bg-surface dark:bg-[#161619] hover:border-[#84CC16]/60 shadow-whisper"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              onChange={handleFileChange}
              className="hidden"
              aria-hidden="true"
            />

            <div className="w-11 h-11 rounded-2xl bg-[#84CC16]/15 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/30 flex items-center justify-center mb-3 shadow-whisper">
              <ImageIcon size={20} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>

            <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">
              {file ? file.name : "Select or drag & drop image"}
            </h3>
            <p className="mt-1 text-xs text-muted max-w-xs leading-relaxed">
              PNG, JPG, WebP, GIF, or SVG. Processed completely on your local device up to 10 MB.
            </p>

            <Button variant="secondary" size="xs" className="mt-3 pointer-events-none">
              Browse Image
            </Button>
          </div>

          {/* Visual Preview Box */}
          <div className="border border-border/80 rounded-3xl p-4 bg-surface flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[160px]">
            {previewUrl ? (
              <div className="flex flex-col items-center gap-2 w-full h-full justify-center">
                {/* Safe image display */}
                <div className="relative w-full h-32 flex items-center justify-center bg-[#F4F4F2] dark:bg-[#1E1E22] rounded-2xl overflow-hidden p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt={file?.name || "Preview"}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {imageDims && (
                  <span className="text-[11px] font-mono text-muted">
                    {imageDims.width} × {imageDims.height} px • {formatBytes(file?.size || 0)}
                  </span>
                )}
              </div>
            ) : (
              <div className="text-xs text-muted flex flex-col items-center gap-2">
                <ImageIcon size={24} className="opacity-40" />
                <span>Image preview will appear here</span>
              </div>
            )}
          </div>
        </div>

        {/* Output Mode Switcher & Textarea */}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <label htmlFor={outputId} className="font-semibold text-foreground font-sans">
              Output Representation
            </label>

            <SegmentedControl
              options={[
                { id: "data-uri", label: "Data URI" },
                { id: "raw", label: "Raw Base64" },
                { id: "html", label: "HTML <img>" },
                { id: "css", label: "CSS url()" },
              ]}
              value={outputMode}
              onChange={(val) => setOutputMode(val as typeof outputMode)}
              size="sm"
            />
          </div>

          <textarea
            id={outputId}
            value={activeOutput}
            readOnly
            rows={12}
            placeholder="Base64 or Data URI string will appear here after selecting an image..."
            className="w-full min-h-[260px] sm:min-h-[300px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
          />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs text-muted font-sans">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>{activeOutput.length} characters</span>
            {metadata && (
              <>
                <span>•</span>
                <span>MIME: {metadata.mimeType}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!activeOutput}
              title="Copy active output representation"
            >
              {copied ? (
                <span className="text-[#3F6212] dark:text-[#BEF264] font-semibold flex items-center gap-1.5">
                  <CheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <CopyIcon size={14} className="text-muted" />
                  <span>Copy {outputMode.toUpperCase()}</span>
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

      <ToolPanelFooter>
        <div className="flex items-center gap-2 font-sans">
          <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
          <span>Local Image Processing: Zero network transmission of image bytes</span>
        </div>
        <div className="text-[11px] font-mono text-muted">Copy as Text Snippet Only</div>
      </ToolPanelFooter>

      <div className="sr-only" role="status" aria-live="polite">
        {statusAnnouncement}
      </div>
    </ToolPanel>
  );
}
