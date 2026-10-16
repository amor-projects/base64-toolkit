import React from "react";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

const navItems = [
  { label: "Encoder", href: "/base64-encoder", badge: "Live" },
  { label: "Decoder", href: "/base64-decoder" },
  { label: "Tools", href: "/#tools" },
  { label: "Architecture", href: "/#privacy" },
  { label: "Guides", href: "/#learn" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF8]/80 dark:bg-[#0E0E10]/80 backdrop-blur-md border-b border-border/70 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6259E8]/40"
          aria-label="Base64 Toolkit Home"
        >
          <div className="w-7 h-7 rounded-lg bg-[#6259E8] text-white flex items-center justify-center font-mono font-bold text-[11px] tracking-tight shadow-[0_1px_2px_rgba(98,89,232,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] group-hover:scale-[1.03] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]">
            64
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm tracking-tight text-foreground">
              Base64
            </span>
            <span className="text-sm tracking-tight text-muted font-normal">
              Toolkit
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-muted hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#6259E8]/8 dark:bg-[#756EF0]/14 text-[#6259E8] dark:text-[#756EF0] font-mono font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right status chip & Mobile toggle */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/8 text-emerald-800 dark:text-emerald-300 border border-emerald-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Local • Zero Uploads</span>
          </div>

          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}
