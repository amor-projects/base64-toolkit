import Link from "next/link";
import { ShieldCheckIcon, MenuIcon, CloseIcon } from "@/components/ui/Icons";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

interface MobileNavProps {
  items: NavItem[];
}

/**
 * Native details/summary keeps the mobile menu interactive without shipping a
 * client-side navigation state machine or touch/resize listeners on first load.
 */
export function MobileNav({ items }: MobileNavProps) {
  return (
    <details className="mobile-nav lg:hidden">
      <summary
        className="mobile-nav-summary inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl p-2 text-muted transition-colors duration-150 hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16]/50 active:scale-95"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        <span className="mobile-nav-icon-menu inline-flex" aria-hidden="true">
          <MenuIcon size={20} />
        </span>
        <span className="mobile-nav-icon-close inline-flex" aria-hidden="true">
          <CloseIcon size={20} />
        </span>
      </summary>

      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation menu"
        className="fixed inset-x-0 top-[60px] z-[100] flex max-h-[calc(100dvh-60px)] min-h-0 flex-col justify-between gap-8 overflow-y-auto overscroll-contain border-t border-border/80 bg-[#FAFAF8]/95 p-5 backdrop-blur-md dark:bg-[#0E0E10]/95"
      >
        <nav
          className="flex shrink-0 flex-col gap-1.5 pt-2"
          aria-label="Mobile navigation links"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="shrink-0 rounded-full bg-[#84CC16]/15 px-2 py-0.5 text-xs font-medium text-[#27440D] dark:text-[#BEF264]">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheckIcon size={16} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span>Base64 Toolkit</span>
          </div>
          <p className="leading-relaxed">
            Browser tools process inputs locally. See the API reference for the optional server API.
          </p>
        </div>
      </div>
    </details>
  );
}
