
"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheckIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui/Icons";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();

  // Store the route on which the menu was opened.
  // Route changes automatically make isOpen false.
  const [openPath, setOpenPath] = useState<string | null>(null);

  const isOpen = openPath !== null && openPath === pathname;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Manage viewport positioning, keyboard dismissal, and scroll locking.
  useEffect(() => {
    if (!isOpen) return;

    const header = buttonRef.current?.closest<HTMLElement>(
      "header, [data-site-header]"
    );

    const menu = menuRef.current;

    const updateMenuTop = () => {
      const bottom = header?.getBoundingClientRect().bottom ?? 64;

      // Synchronize the actual DOM instead of triggering a React render.
      if (menu) {
        menu.style.top = `${Math.max(0, Math.round(bottom))}px`;
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    updateMenuTop();

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    };

    const observer =
      header && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateMenuTop)
        : null;

    if (header) observer?.observe(header);

    window.addEventListener("resize", updateMenuTop);
    window.addEventListener("scroll", updateMenuTop, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      observer?.disconnect();

      window.removeEventListener("resize", updateMenuTop);
      window.removeEventListener("scroll", updateMenuTop, true);
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpenPath(isOpen ? null : pathname)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={
          isOpen ? "Close navigation menu" : "Open navigation menu"
        }
        className="
          inline-flex min-h-11 min-w-11
          items-center justify-center rounded-xl p-2
          text-muted transition-all duration-150
          ease-[cubic-bezier(0.16,1,0.3,1)]
          hover:bg-black/[0.04] hover:text-foreground
          dark:hover:bg-white/[0.05]
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#84CC16]/50
          cursor-pointer active:scale-95
        "
      >
        {isOpen ? (
          <CloseIcon size={20} />
        ) : (
          <MenuIcon size={20} />
        )}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            id="mobile-menu"
            style={{ top: "64px" }}
            className="
              fixed inset-x-0 bottom-0 z-[100]
              flex min-h-0 flex-col
              justify-between gap-8
              overflow-y-auto overscroll-contain
              border-t border-border/80
              bg-[#FAFAF8]/95 p-5 backdrop-blur-md
              dark:bg-[#0E0E10]/95
              animate-in fade-in duration-150
            "
          >
            <nav
              className="flex shrink-0 flex-col gap-1.5 pt-2"
              aria-label="Mobile navigation"
            >
              {items.map((item) => {
                const isAnchor = item.href.startsWith("/#");
                const itemPath =
                  item.href.split(/[?#]/)[0] || "/";

                const isActive =
                  !isAnchor &&
                  (itemPath === "/"
                    ? pathname === "/"
                    : pathname === itemPath ||
                      pathname.startsWith(`${itemPath}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpenPath(null)}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                      flex min-h-11 items-center justify-between
                      gap-3 rounded-xl px-4 py-3
                      text-sm font-medium transition-all duration-150
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      active:scale-[0.99]
                      ${
                        isActive
                          ? "border-l-4 border-[#65A30D] bg-black/[0.05] font-semibold text-foreground dark:border-[#A3E635] dark:bg-white/[0.08]"
                          : "text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                      }
                    `}
                  >
                    <span>{item.label}</span>

                    {item.badge && (
                      <span
                        className="
                          shrink-0 rounded-full bg-[#84CC16]/15
                          px-2 py-0.5 text-xs font-medium
                          text-[#27440D] dark:text-[#BEF264]
                        "
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div
              className="
                flex shrink-0 flex-col gap-2
                border-t border-border/60
                pt-6 text-xs text-muted
              "
            >
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheckIcon
                  size={16}
                  className="text-[#65A30D] dark:text-[#A3E635]"
                />
                <span>Base64 Toolkit</span>
              </div>

              <p className="leading-relaxed">
                100% in-browser processing. Zero network transmission
                of inputs or outputs.
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
