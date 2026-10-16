"use client";

import React, { useState, useRef, useId } from "react";
import {
  fileToBase64,
  formatBytes,
  DEFAULT_MAX_FILE_SIZE_BYTES,
  ReadFileResult,
} from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  UploadIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ClearIcon,
  ShieldCheckIcon,
  FileIcon,
} from "@/components/ui/Icons";

export function FileToBase64Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ReadFileResult | null>(null);
  const [base64Output, setBase64Output] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [padding, setPadding] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const outputId = useId();

  const processFile = async (selectedFile: File) => {
    setIsProcessing(true);
    setError(null);
    setFile(selectedFile);

    const res = await fileToBase64(selectedFile, { urlSafe, pad: padding }, DEFAULT_MAX_FILE_SIZE_BYTES);

    setIsProcessing(false);
    if (res.success) {
      setBase64Output(res.data.base64);
      setMetadata(res.data.metadata);
      setStatusAnnouncement(`Converted ${selectedFile.name} (${formatBytes(selectedFile.size)}) to Base64.`);
    } else {
      setBase64Output("");
      setMetadata(null);
      setError(res.error.message);
      setStatusAnnouncement(`Error: ${res.error.message}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      processFile(selected);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleClear = () => {
    setFile(null);
    setMetadata(null);
    setBase64Output("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setStatusAnnouncement("Cleared file and output.");
  };

  const handleCopy = async () => {
    if (!base64Output) return;
    try {
      await navigator.clipboard.writeText(base64Output);
      setCopied(true);
      setStatusAnnouncement("Base64 string copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatusAnnouncement("Failed to copy to clipboard.");
    }
  };

  const handleDownload = () => {
    if (!base64Output || !file) return;
    try {
      const blob = new Blob([base64Output], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name}.base64.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusAnnouncement("Downloaded Base64 text file.");
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
            File to Base64 Encoder
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25 font-mono font-medium">
            Max 10 MB • Local Only
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleClear}
            disabled={!file && !base64Output}
            title="Clear all fields"
          >
            <ClearIcon size={14} className="text-muted" />
            <span>Clear</span>
          </Button>
        </div>
      </ToolPanelHeader>

      <ToolPanelBody className="space-y-6">
        {error && (
          <StatusMessage variant="error" title="File Processing Notice">
            {error}
          </StatusMessage>
        )}

        {/* File Drag and Drop / Picker Zone */}
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
          aria-label="Upload or select file for Base64 conversion"
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDragging
              ? "border-[#84CC16] bg-[#84CC16]/10 scale-[1.01]"
              : "border-border/90 bg-surface dark:bg-[#161619] hover:border-[#84CC16]/60 shadow-whisper"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
          />

          <div className="w-12 h-12 rounded-2xl bg-[#84CC16]/15 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/30 flex items-center justify-center mb-4 shadow-whisper">
            <UploadIcon size={22} className="text-[#65A30D] dark:text-[#A3E635]" />
          </div>

          <h3 className="text-base font-semibold text-foreground tracking-tight">
            {file ? file.name : "Choose a file or drag & drop here"}
          </h3>
          <p className="mt-1 text-xs text-muted max-w-sm leading-relaxed">
            {file
              ? `Selected file size: ${formatBytes(file.size)} • Type: ${file.type || "unknown binary"}`
              : "Works with any file format (PDF, images, archives, audio). Processed 100% in your browser up to 10 MB."}
          </p>

          <Button variant="secondary" size="sm" className="mt-4 pointer-events-none">
            Browse Computer
          </Button>
        </div>

        {/* File Metadata Inspection Details */}
        {metadata && (
          <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center text-muted">
                <FileIcon size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground font-sans">{metadata.filename}</span>
                <span className="text-muted text-[11px] font-sans">
                  {formatBytes(metadata.size)} • {metadata.mimeType}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted font-sans text-xs">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>Read locally into memory</span>
            </div>
          </div>
        )}

        {/* Output Base64 Area */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={outputId} className="font-semibold text-foreground font-sans">
              Base64 Output String
            </label>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <span className="bg-black/[0.03] dark:bg-white/[0.06] border border-border/70 text-foreground/80 px-2 py-0.5 rounded-md">
                {base64Output.length} chars
              </span>
              {metadata && (
                <>
                  <span>•</span>
                  <span className="bg-black/[0.03] dark:bg-white/[0.06] border border-border/70 text-foreground/80 px-2 py-0.5 rounded-md">
                    +{Math.round(((base64Output.length - metadata.size) / metadata.size) * 100)}% expansion
                  </span>
                </>
              )}
            </div>
          </div>

          <textarea
            id={outputId}
            value={base64Output}
            readOnly
            rows={12}
            placeholder="Base64 encoded string will appear here after selecting a file..."
            className="w-full min-h-[280px] sm:min-h-[340px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
          />
        </div>

        {/* Configuration Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs text-muted font-sans">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Checkbox
              checked={urlSafe}
              onChange={(e) => {
                setUrlSafe(e.target.checked);
                if (file) {
                  fileToBase64(file, { urlSafe: e.target.checked, pad: padding }, DEFAULT_MAX_FILE_SIZE_BYTES).then(
                    (r) => r.success && setBase64Output(r.data.base64)
                  );
                }
              }}
              label="Base64URL Safe (- and _)"
            />

            <Checkbox
              checked={padding}
              onChange={(e) => {
                setPadding(e.target.checked);
                if (file) {
                  fileToBase64(file, { urlSafe, pad: e.target.checked }, DEFAULT_MAX_FILE_SIZE_BYTES).then(
                    (r) => r.success && setBase64Output(r.data.base64)
                  );
                }
              }}
              label="Include Padding (=)"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!base64Output || isProcessing}
              title="Copy Base64 output string"
            >
              {copied ? (
                <span className="text-[#3F6212] dark:text-[#BEF264] font-semibold flex items-center gap-1.5">
                  <CheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <CopyIcon size={14} className="text-muted" />
                  <span>Copy String</span>
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!base64Output || isProcessing}
              title="Download output as .txt file"
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
          <span>Local ArrayBuffer API: Files never leave your browser memory</span>
        </div>
        <div className="text-[11px] font-mono text-muted">Zero Server Uploads • Safe Memory Limit</div>
      </ToolPanelFooter>

      <div className="sr-only" role="status" aria-live="polite">
        {statusAnnouncement}
      </div>
    </ToolPanel>
  );
}
