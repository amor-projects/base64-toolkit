"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";
import { ShieldCheckIcon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Encoder", href: "/base64-encoder", badge: "Live" },
  { label: "Decoder", href: "/base64-decoder", badge: "Live" },
  { label: "Files", href: "/file-to-base64", badge: "Live" },
  { label: "Images", href: "/image-to-base64", badge: "Live" },
  { label: "Inspector", href: "/base64-inspector" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF8]/85 dark:bg-[#0E0E10]/85 backdrop-blur-md border-b border-border/75 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark with Lime Icon */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16]/50"
          aria-label="Base64 Toolkit Home"
        >
          <div className="w-8 h-8 rounded-xl bg-[#84CC16] text-[#0F172A] flex items-center justify-center font-mono font-bold text-xs tracking-tight shadow-[0_1px_3px_rgba(132,204,22,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] group-hover:scale-[1.03] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]">
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
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith("/#")
                ? false
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3.5 py-1.5 rounded-xl text-[13px] transition-all duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2 group ${
                  isActive
                    ? "bg-[#84CC16]/15 dark:bg-[#BEF264]/12 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/30 shadow-whisper font-semibold"
                    : "text-muted font-medium hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                }`}
              >
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635] shadow-[0_0_8px_rgba(132,204,22,0.8)]"
                    aria-hidden="true"
                  />
                )}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                      isActive
                        ? "bg-[#65A30D] text-white dark:bg-[#A3E635] dark:text-[#090D04]"
                        : "bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {/* Visual active bottom anchor bar */}
                {isActive && (
                  <span
                    className="absolute -bottom-[15px] left-3 right-3 h-[2px] bg-[#65A30D] dark:bg-[#A3E635] rounded-full shadow-[0_0_8px_rgba(132,204,22,0.6)]"
                    aria-hidden="true"
                  />
                )}
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
