"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6259E8]/40 cursor-pointer active:scale-95"
      >
        {isOpen ? (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-14 bottom-0 z-50 bg-[#FAFAF8]/95 dark:bg-[#0E0E10]/95 backdrop-blur-md border-t border-border/80 p-5 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-150"
        >
          <nav className="flex flex-col gap-1.5 pt-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99]"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#6259E8]/8 text-[#6259E8] dark:bg-[#756EF0]/14 dark:text-[#756EF0] font-mono font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-border/60 text-xs text-muted">
            <p className="font-medium text-foreground mb-1">Base64 Toolkit</p>
            <p className="leading-relaxed">
              Native in-browser encoding engine. Zero network transmission of inputs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
