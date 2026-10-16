"use client";

import React, { useState, useId, useMemo } from "react";
import { inspectBase64, formatBytes } from "@/lib/base64";
import { Button } from "@/components/ui/Button";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import {
  ClearIcon,
  ShieldCheckIcon,
  InfoIcon,
  SparklesIcon,
  WarningIcon,
} from "@/components/ui/Icons";

export function Base64InspectorTool() {
  const [input, setInput] = useState("");
  const inputId = useId();

  const report = useMemo(() => {
    if (!input.trim()) return null;
    return inspectBase64(input);
  }, [input]);

  const handleClear = () => {
    setInput("");
  };

  const handleLoadSample = () => {
    // PDF header Base64 ("%PDF-1.5")
    setInput("JVBERi0xLjUNCiW1tbW1DQoxIDAgb2JqDQo8PA0KL1R5cGUgL0NhdGFsb2cNCi9QYWdlcyAyIDAgUg0KPj4NCmVuZG9iag==");
  };

  return (
    <ToolPanel variant="primary" className="w-full">
      <ToolPanelHeader className="flex-wrap bg-[#FBFBFA] dark:bg-[#131316]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
          <span className="font-semibold text-sm tracking-tight text-foreground font-sans">
            Base64 Validator & Inspector
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25 font-mono font-medium">
            Syntax & Magic Bytes
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" onClick={handleLoadSample} title="Load sample PDF Base64">
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
        {/* Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor={inputId} className="font-semibold text-foreground font-sans">
              Base64 String to Inspect
            </label>
            <span className="font-mono text-[11px] text-muted">
              {input.length} characters
            </span>
          </div>

          <textarea
            id={inputId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Paste any Base64 string to inspect format, padding, alphabet, and file signatures..."
            className="w-full min-h-[180px] p-4 text-[13.5px] font-mono leading-relaxed bg-[#F9F9F7] dark:bg-[#161619] border border-border/80 rounded-2xl text-foreground placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:bg-surface focus:border-[#84CC16] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/25 resize-y"
          />
        </div>

        {/* Diagnostics Report Grid */}
        {report && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Card 1: Validity */}
              <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col gap-1">
                <span className="text-[11px] font-mono text-muted uppercase">Syntax Status</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      report.isValidBase64 ? "bg-[#16A34A]" : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {report.isValidBase64 ? "Valid RFC 4648" : "Invalid Syntax"}
                  </span>
                </div>
                <span className="text-[11px] text-muted">
                  {report.decodedByteCount > 0 ? `${formatBytes(report.decodedByteCount)} decoded` : "0 decoded bytes"}
                </span>
              </div>

              {/* Card 2: Alphabet */}
              <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col gap-1">
                <span className="text-[11px] font-mono text-muted uppercase">Alphabet</span>
                <span className="text-sm font-semibold text-foreground capitalize">
                  {report.alphabet === "base64url"
                    ? "Base64URL (-, _)"
                    : report.alphabet === "standard"
                    ? "Standard (+, /)"
                    : report.alphabet === "ambiguous"
                    ? "Standard / URL-Safe"
                    : report.alphabet}
                </span>
                <span className="text-[11px] text-muted">
                  {report.paddingCount > 0 ? `${report.paddingCount} '=' padding character(s)` : "Unpadded"}
                </span>
              </div>

              {/* Card 3: Size Mechanics */}
              <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col gap-1">
                <span className="text-[11px] font-mono text-muted uppercase">Size Expansion</span>
                <span className="text-sm font-semibold text-foreground">
                  +{report.estimatedExpansionPercent}%
                </span>
                <span className="text-[11px] text-muted">
                  Ratio ~4:3 (33.3% theoretical overhead)
                </span>
              </div>

              {/* Card 4: Inferred MIME */}
              <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col gap-1">
                <span className="text-[11px] font-mono text-muted uppercase">Inferred Type</span>
                <span className="text-sm font-semibold text-foreground truncate">
                  {report.inferredFormat ? report.inferredFormat.label : "Unknown Binary"}
                </span>
                <span className="text-[11px] text-muted truncate">
                  {report.inferredFormat ? report.inferredFormat.mimeType : "No recognized magic bytes"}
                </span>
              </div>
            </div>

            {/* Error or Warnings List */}
            {report.syntaxDiagnostics.length > 0 && (
              <div className="p-4 rounded-2xl bg-red-500/[0.06] border border-red-500/20 text-xs text-red-700 dark:text-red-400 space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5">
                  <WarningIcon size={15} />
                  <span>Syntax Issues Detected:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 font-mono text-[12px]">
                  {report.syntaxDiagnostics.map((diag, i) => (
                    <li key={i}>{diag}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Inferred Signature explanation */}
            {report.inferredFormat && (
              <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper text-xs flex items-start gap-3">
                <InfoIcon size={16} className="text-[#65A30D] dark:text-[#A3E635] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground">
                    Signature Analysis: {report.inferredFormat.label}
                  </span>
                  <p className="text-muted leading-relaxed font-normal">
                    {report.inferredFormat.description}
                  </p>
                  <p className="text-[11px] text-muted/80 mt-1">
                    {report.limitationsNotice}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </ToolPanelBody>

      <ToolPanelFooter>
        <div className="flex items-center gap-2 font-sans">
          <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
          <span>RFC 4648 Compliant Diagnostic Engine • Local Inspection Only</span>
        </div>
        <div className="text-[11px] font-mono text-muted">Zero Server Ingestion</div>
      </ToolPanelFooter>
    </ToolPanel>
  );
}
