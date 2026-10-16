"use client";

import React, { useState, useId } from "react";
import {
  createDataUri,
  parseDataUri,
  formatHtmlImgSnippet,
  formatCssSnippet,
} from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select } from "@/components/ui/Select";
import {
  CopyIcon,
  CheckIcon,
  ClearIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@/components/ui/Icons";

export function DataUriGeneratorTool() {
  const [inputPayload, setInputPayload] = useState("");
  const [mimeType, setMimeType] = useState("image/png");
  const [activeTab, setActiveTab] = useState<"uri" | "html" | "css">("uri");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputId = useId();

  // If input is already a data URI, parse it
  const handleInputChange = (val: string) => {
    setInputPayload(val);
    setError(null);
    if (val.trim().startsWith("data:")) {
      const parsed = parseDataUri(val.trim());
      if (parsed.success) {
        setMimeType(parsed.data.mimeType);
      }
    }
  };

  const dataUriString = inputPayload ? createDataUri(inputPayload, mimeType) : "";

  const activeSnippet = () => {
    if (!dataUriString) return "";
    switch (activeTab) {
      case "uri":
        return dataUriString;
      case "html":
        return formatHtmlImgSnippet(dataUriString, "Embedded Image");
      case "css":
        return formatCssSnippet(dataUriString);
    }
  };

  const currentSnippet = activeSnippet();

  const handleCopy = async () => {
    if (!currentSnippet) return;
    try {
      await navigator.clipboard.writeText(currentSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to access clipboard.");
    }
  };

  const handleClear = () => {
    setInputPayload("");
    setError(null);
  };

  const handleLoadSample = () => {
    setInputPayload("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==");
    setMimeType("image/png");
  };

  return (
    <ToolPanel variant="primary" className="w-full">
      <ToolPanelHeader className="flex-wrap bg-surface dark:bg-[#141417]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
          <span className="font-semibold text-sm tracking-tight text-foreground font-sans">
            Data URI Studio
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25 font-mono font-medium">
            RFC 2397
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" onClick={handleLoadSample} title="Load sample image Base64">
            <SparklesIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span>Load Sample</span>
          </Button>

          <Button variant="ghost" size="xs" onClick={handleClear} disabled={!inputPayload} title="Clear field">
            <ClearIcon size={14} className="text-muted" />
            <span>Clear</span>
          </Button>
        </div>
      </ToolPanelHeader>

      <ToolPanelBody className="space-y-6">
        {error && (
          <StatusMessage variant="error" title="Data URI Error">
            {error}
          </StatusMessage>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Input */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={inputId} className="font-semibold text-foreground font-sans">
                Raw Base64 or Data URI Input
              </label>
              <span className="font-mono text-[11px] text-muted">
                {inputPayload.length} chars
              </span>
            </div>

            <textarea
              id={inputId}
              value={inputPayload}
              onChange={(e) => handleInputChange(e.target.value)}
              rows={12}
              placeholder="Paste raw Base64 payload or existing data:... URI..."
              className="w-full min-h-[260px] sm:min-h-[300px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
            />
          </div>

          {/* Output snippet */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground font-sans">Generated Output</span>
              <SegmentedControl
                options={[
                  { id: "uri", label: "Data URI" },
                  { id: "html", label: "HTML <img>" },
                  { id: "css", label: "CSS url()" },
                ]}
                value={activeTab}
                onChange={(val) => setActiveTab(val as typeof activeTab)}
                size="sm"
              />
            </div>

            <textarea
              value={currentSnippet}
              readOnly
              rows={12}
              placeholder="Generated Data URI or code snippet will appear here..."
              className="w-full min-h-[260px] sm:min-h-[300px] p-4 sm:p-5 text-[13.5px] sm:text-[14px] font-mono leading-relaxed bg-surface dark:bg-[#141417] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 resize-y"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">MIME Type:</span>
            <Select
              value={mimeType}
              onChange={(e) => setMimeType(e.target.value)}
              isMono
            >
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="image/webp">image/webp</option>
              <option value="image/svg+xml">image/svg+xml</option>
              <option value="application/pdf">application/pdf</option>
              <option value="application/json">application/json</option>
              <option value="text/plain">text/plain</option>
              <option value="application/octet-stream">application/octet-stream</option>
            </Select>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            disabled={!currentSnippet}
            title="Copy snippet"
          >
            {copied ? (
              <span className="text-[#3F6212] dark:text-[#BEF264] font-semibold flex items-center gap-1.5">
                <CheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
                <span>Copied!</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <CopyIcon size={14} className="text-muted" />
                <span>Copy {activeTab.toUpperCase()}</span>
              </span>
            )}
          </Button>
        </div>
      </ToolPanelBody>

      <ToolPanelFooter>
        <div className="flex items-center gap-2 font-sans">
          <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
          <span>Text Snippet Generation Only: Code is never injected into DOM</span>
        </div>
        <div className="text-[11px] font-mono text-muted">RFC 2397 Compliant</div>
      </ToolPanelFooter>
    </ToolPanel>
  );
}
