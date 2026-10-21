"use client";

import React, { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/Icons";

export function GuideProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-x-0 top-[60px] z-30 h-0.5 bg-transparent"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#6259E8] transition-[width] duration-150 ease-out dark:bg-[#756EF0]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface px-2.5 py-1.5 text-[11px] font-semibold text-muted transition-colors hover:text-foreground"
      aria-label={copied ? "Guide link copied" : "Copy guide link"}
    >
      {copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
      <span>{copied ? "Copied" : "Copy link"}</span>
    </button>
  );
}
