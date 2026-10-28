import Link from "next/link";
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
  { label: "API", href: "/api-reference" },
  { label: "Guides", href: "/learn/what-is-base64" },
];

export function Header() {
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3.5 py-2 rounded-xl text-[13px] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center text-muted font-medium hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right status chip, Theme toggle & Mobile toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 shadow-whisper">
            <ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" />
            <span>Browser Tools Local</span>
          </div>

          <ThemeToggle />

          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}
