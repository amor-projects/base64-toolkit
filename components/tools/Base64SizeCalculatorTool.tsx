"use client";

import React, { useState, useMemo } from "react";
import { calculateSizeMetrics, formatBytes } from "@/lib/base64";
import { ToolPanel, ToolPanelHeader, ToolPanelBody, ToolPanelFooter } from "@/components/ui/ToolPanel";
import { Input } from "@/components/ui/Input";
import { ShieldCheckIcon, InfoIcon } from "@/components/ui/Icons";

export function Base64SizeCalculatorTool() {
  const [byteInput, setByteInput] = useState<number>(102400); // 100 KB default
  const [mimeType, setMimeType] = useState<string>("image/png");

  const metrics = useMemo(() => {
    return calculateSizeMetrics(byteInput || 0, mimeType);
  }, [byteInput, mimeType]);

  const presetSizes = [
    { label: "1 KB", bytes: 1024 },
    { label: "50 KB", bytes: 51200 },
    { label: "100 KB", bytes: 102400 },
    { label: "500 KB", bytes: 512000 },
    { label: "1 MB", bytes: 1048576 },
    { label: "5 MB", bytes: 5242880 },
  ];

  return (
    <ToolPanel variant="primary" className="w-full">
      <ToolPanelHeader className="flex-wrap bg-[#FBFBFA] dark:bg-[#131316]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] shadow-[0_0_8px_rgba(132,204,22,0.6)]" />
          <span className="font-semibold text-sm tracking-tight text-foreground font-sans">
            Base64 Size & Overhead Calculator
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] border border-[#84CC16]/25 font-mono font-medium">
            4:3 Expansion Mechanics
          </span>
        </div>
      </ToolPanelHeader>

      <ToolPanelBody className="space-y-6">
        {/* Controls row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-[#F9F9F7] dark:bg-[#161619] border border-border/80">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground">
              Binary Input Size (Bytes)
            </label>
            <Input
              type="number"
              min={0}
              max={100 * 1024 * 1024}
              value={byteInput}
              onChange={(e) => setByteInput(Math.max(0, parseInt(e.target.value) || 0))}
              isMono
            />
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              {presetSizes.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setByteInput(preset.bytes)}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-mono transition-colors ${
                    byteInput === preset.bytes
                      ? "bg-[#84CC16] text-[#0F172A] font-semibold"
                      : "bg-surface border border-border/80 text-muted hover:text-foreground"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground">
              Data URI MIME Type Prefix
            </label>
            <select
              value={mimeType}
              onChange={(e) => setMimeType(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface border border-border/80 rounded-xl text-foreground font-mono"
            >
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="image/webp">image/webp</option>
              <option value="image/svg+xml">image/svg+xml</option>
              <option value="application/pdf">application/pdf</option>
              <option value="application/json">application/json</option>
              <option value="application/octet-stream">application/octet-stream</option>
            </select>
            <p className="text-[11px] text-muted">
              Data URI adds <code className="font-mono text-[11px] font-semibold">data:{mimeType};base64,</code> (+{`data:${mimeType};base64,`.length} bytes).
            </p>
          </div>
        </div>

        {/* Results Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col gap-1">
            <span className="text-[11px] font-mono text-muted uppercase">Original Binary</span>
            <span className="text-base font-bold text-foreground font-mono">
              {formatBytes(metrics.binaryBytes)}
            </span>
            <span className="text-[11px] text-muted font-mono">
              {metrics.binaryBytes.toLocaleString()} bytes
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col gap-1">
            <span className="text-[11px] font-mono text-muted uppercase">Base64 Encoded</span>
            <span className="text-base font-bold text-[#3F6212] dark:text-[#BEF264] font-mono">
              {formatBytes(metrics.base64Chars)}
            </span>
            <span className="text-[11px] text-muted font-mono">
              {metrics.base64Chars.toLocaleString()} ASCII chars
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col gap-1">
            <span className="text-[11px] font-mono text-muted uppercase">Payload Overhead</span>
            <span className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono">
              +{metrics.overheadPercent}%
            </span>
            <span className="text-[11px] text-muted font-mono">
              +{formatBytes(metrics.overheadBytes)} added
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col gap-1">
            <span className="text-[11px] font-mono text-muted uppercase">Complete Data URI</span>
            <span className="text-base font-bold text-foreground font-mono">
              {formatBytes(metrics.dataUriChars)}
            </span>
            <span className="text-[11px] text-muted font-mono">
              {metrics.dataUriChars.toLocaleString()} total chars
            </span>
          </div>
        </div>

        {/* Educational Breakdown Callout */}
        <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper text-xs space-y-3">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <InfoIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span>Why Does Base64 Always Expand Size by 33.3%?</span>
          </div>
          <p className="text-muted leading-relaxed font-normal">
            Binary data uses all 8 bits of a byte (256 possible values). Base64 converts groups of 3 binary bytes (24 bits) into 4 printable ASCII characters (each carrying 6 bits: 2⁶ = 64 symbols). Because 4 characters are required for every 3 input bytes:
          </p>
          <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] font-mono text-xs text-foreground flex items-center justify-between">
            <span>Formula: Base64 Length = Math.ceil(InputBytes / 3) × 4</span>
            <span className="text-muted font-semibold">Ratio: 4 / 3 = 1.3333 (+33.3%)</span>
          </div>
        </div>
      </ToolPanelBody>

      <ToolPanelFooter>
        <div className="flex items-center gap-2 font-sans">
          <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
          <span>Accurate RFC 4648 Bit-Level Modeling • Client-Side Math Engine</span>
        </div>
        <div className="text-[11px] font-mono text-muted">Zero Latency</div>
      </ToolPanelFooter>
    </ToolPanel>
  );
}
