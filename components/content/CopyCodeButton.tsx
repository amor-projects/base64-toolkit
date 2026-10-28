"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/Icons";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copyCode}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-[#A1A1AA] transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]/70"
      aria-label={copied ? "Code copied" : "Copy code"}
    >
      {copied ? <CheckIcon size={13} className="text-[#A3E635]" /> : <CopyIcon size={13} />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
