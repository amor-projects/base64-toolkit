"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheckIcon, MenuIcon, CloseIcon } from "@/components/ui/Icons";

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
  const pathname = usePathname();

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
        className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16]/50 cursor-pointer active:scale-95"
      >
        {isOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-15 bottom-0 z-50 bg-[#FAFAF8]/95 dark:bg-[#0E0E10]/95 backdrop-blur-md border-t border-border/80 p-5 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-150"
        >
          <nav className="flex flex-col gap-1.5 pt-2" aria-label="Mobile Navigation">
            {items.map((item) => {
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
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99] ${
                    isActive
                      ? "bg-[#84CC16]/15 dark:bg-[#BEF264]/12 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/30 font-semibold"
                      : "text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
                    )}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-medium ${
                        isActive
                          ? "bg-[#65A30D] text-white dark:bg-[#A3E635] dark:text-[#090D04]"
                          : "bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-border/60 text-xs text-muted flex flex-col gap-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <ShieldCheckIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
              <span>Base64 Toolkit</span>
            </div>
            <p className="leading-relaxed">
              100% in-browser processing. Zero network transmission of inputs or outputs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
