"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";
import { ShieldCheckIcon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Encoder", href: "/base64-encoder" },
  { label: "Decoder", href: "/base64-decoder" },
  { label: "Files", href: "/file-to-base64" },
  { label: "Images", href: "/image-to-base64" },
  { label: "Inspector", href: "/base64-inspector" },
  { label: "Guides", href: "/learn/what-is-base64" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF8]/90 dark:bg-[#0E0E10]/90 backdrop-blur-md border-b border-border/75 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark with Lime Icon */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16]/50"
          aria-label="Base64 Toolkit Home"
        >
          <div className="w-8 h-8 rounded-xl bg-[#84CC16] text-[#090D04] flex items-center justify-center font-mono font-bold text-xs tracking-tight shadow-[0_1px_3px_rgba(132,204,22,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] group-hover:scale-[1.03] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]">
            64
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-base tracking-tight text-foreground font-sans">
              Base64
            </span>
            <span className="text-base tracking-tight text-muted font-normal font-sans">
              Toolkit
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with Active Page Indicator */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith("/learn")
                ? pathname.startsWith("/learn")
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-1.5 rounded-xl text-[13px] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2 ${
                  isActive
                    ? "bg-black/[0.05] dark:bg-white/[0.08] text-foreground border border-black/[0.06] dark:border-white/[0.08] shadow-whisper font-semibold"
                    : "text-muted font-medium hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                }`}
              >
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635] shadow-[0_0_6px_rgba(101,163,13,0.7)]"
                    aria-hidden="true"
                  />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right status chip, Theme toggle & Mobile toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 shadow-whisper">
            <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span>100% In-Browser</span>
          </div>

          <ThemeToggle />

          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}
