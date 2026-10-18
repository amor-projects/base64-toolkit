
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
  const [openPath, setOpenPath] = useState<string | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Automatically closes when the route changes.
  const isOpen = openPath !== null && openPath === pathname;

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const header = buttonRef.current?.closest<HTMLElement>(
      "header, [data-site-header]"
    );

    const viewport = window.visualViewport;
    let lastTouchY = 0;

    // Explicit positioning avoids depending on Safari's fixed bottom edge.
    const updateViewport = () => {
      const visualTop = viewport?.offsetTop ?? 0;
      const visualLeft = viewport?.offsetLeft ?? 0;
      const visualHeight = viewport?.height ?? window.innerHeight;
      const visualWidth = viewport?.width ?? window.innerWidth;

      const headerBottom = header?.getBoundingClientRect().bottom;
      const top = Math.max(
        visualTop,
        headerBottom ?? visualTop + 64
      );

      const visibleBottom = visualTop + visualHeight;
      const height = Math.max(0, visibleBottom - top);

      menu.style.top = `${top}px`;
      menu.style.left = `${visualLeft}px`;
      menu.style.width = `${visualWidth}px`;
      menu.style.height = `${height}px`;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    };

    // Prevent background scrolling without changing html/body dimensions.
    // Allow scrolling inside the menu, but prevent scroll chaining at its edges.
    const handleTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Node) || !menu.contains(target)) {
        event.preventDefault();
        return;
      }

      const touchY = event.touches[0]?.clientY;
      if (touchY === undefined) return;

      const deltaY = touchY - lastTouchY;
      lastTouchY = touchY;

      const atTop = menu.scrollTop <= 0;
      const atBottom =
        menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 1;

      if (
        (atTop && deltaY > 0) ||
        (atBottom && deltaY < 0)
      ) {
        event.preventDefault();
      }
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);

      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
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
          inline-flex min-h-11 min-w-11 items-center justify-center
          rounded-xl p-2 text-muted
          transition-colors duration-150
          hover:bg-black/[0.04] hover:text-foreground
          dark:hover:bg-white/[0.05]
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#84CC16]/50
          active:scale-95
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
            role="dialog"
            aria-label="Mobile navigation menu"
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              width: "100%",
              height: "calc(100vh - 64px)",
              boxSizing: "border-box",
              WebkitOverflowScrolling: "touch",
            }}
            className="
              z-[100] flex min-h-0 flex-col
              justify-between gap-8
              overflow-y-auto overscroll-contain
              border-t border-border/80
              bg-[#FAFAF8]/95 p-5
              backdrop-blur-md
              dark:bg-[#0E0E10]/95
            "
          >
            <nav
              className="flex shrink-0 flex-col gap-1.5 pt-2"
              aria-label="Mobile navigation links"
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
                      text-sm font-medium transition-colors
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
                100% in-browser processing. Zero network
                transmission of inputs or outputs.
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
