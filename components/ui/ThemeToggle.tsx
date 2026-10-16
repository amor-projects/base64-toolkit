"use client";

import React, { useSyncExternalStore } from "react";
import { SunIcon, MoonIcon } from "@/components/ui/Icons";

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    mql.removeEventListener("change", callback);
  };
}

function getThemeSnapshot(): "light" | "dark" {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerThemeSnapshot(): "light" | "dark" {
  return "light";
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    // Notify listeners so useSyncExternalStore triggers an update
    window.dispatchEvent(new Event("storage"));
  };

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border border-border/80 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`p-1.5 rounded-xl text-muted hover:text-foreground bg-surface border border-border/80 hover:border-border shadow-whisper hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16]/50 ${className}`}
    >
      {isDark ? (
        <SunIcon size={16} className="text-[#BEF264] hover:text-[#A3E635] transition-colors" />
      ) : (
        <MoonIcon size={16} className="text-[#3F6212] hover:text-[#65A30D] transition-colors" />
      )}
    </button>
  );
}
