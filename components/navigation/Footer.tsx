import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-border/70 mt-auto font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Privacy Column */}
          <div className="md:col-span-1 flex flex-col gap-3.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-6 h-6 rounded-md bg-[#84CC16] text-[#090D04] flex items-center justify-center font-mono font-bold text-[10px] shadow-[0_1px_3px_rgba(132,204,22,0.4)] group-hover:scale-105 transition-transform duration-150">
                64
              </div>
              <span className="font-semibold text-sm tracking-tight text-foreground">
                Base64 Toolkit
              </span>
            </Link>
            <p className="text-xs text-muted leading-relaxed max-w-xs font-normal">
              A refined developer utility designed for precision, clarity, and uncompromising
              privacy. Browser tools process content locally; the optional API is documented separately.
            </p>
            <div className="mt-1 text-[11px] text-muted/80 font-mono">
              RFC 4648 • UTF-8 Safe • Offline Capable
            </div>
          </div>

          {/* Suite Tools Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Tool Suite
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-muted">
              <li>
                <Link href="/base64-encoder" className="hover:text-foreground transition-colors duration-150">
                  Text Base64 Encoder
                </Link>
              </li>
              <li>
                <Link href="/base64-decoder" className="hover:text-foreground transition-colors duration-150">
                  Text Base64 Decoder
                </Link>
              </li>
              <li>
                <Link href="/file-to-base64" className="hover:text-foreground transition-colors duration-150">
                  File to Base64 (10MB)
                </Link>
              </li>
              <li>
                <Link href="/base64-to-file" className="hover:text-foreground transition-colors duration-150">
                  Base64 to Downloadable File
                </Link>
              </li>
              <li>
                <Link href="/image-to-base64" className="hover:text-foreground transition-colors duration-150">
                  Image &amp; Data URI Studio
                </Link>
              </li>
              <li>
                <Link href="/base64-to-image" className="hover:text-foreground transition-colors duration-150">
                  Base64 to Image Preview
                </Link>
              </li>
              <li>
                <Link href="/base64url-encoder" className="hover:text-foreground transition-colors duration-150">
                  Base64URL Encoder
                </Link>
              </li>
              <li>
                <Link href="/base64-inspector" className="hover:text-foreground transition-colors duration-150">
                  Base64 Inspector &amp; Validator
                </Link>
              </li>
              <li>
                <Link href="/base64-size-calculator" className="hover:text-foreground transition-colors duration-150">
                  Size &amp; Overhead Calculator
                </Link>
              </li>
              <li>
                <Link href="/api-reference" className="hover:text-foreground transition-colors duration-150">
                  Base64 API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Guides Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Guides &amp; Specs
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-muted">
              <li>
                <Link href="/learn/what-is-base64" className="hover:text-foreground transition-colors duration-150">
                  What is Base64 Encoding?
                </Link>
              </li>
              <li>
                <Link href="/learn/base64-vs-base64url" className="hover:text-foreground transition-colors duration-150">
                  Base64 vs Base64URL
                </Link>
              </li>
              <li>
                <Link href="/learn/base64-padding" className="hover:text-foreground transition-colors duration-150">
                  How Base64 Padding Works
                </Link>
              </li>
              <li>
                <Link href="/learn/base64-file-size" className="hover:text-foreground transition-colors duration-150">
                  33% Size Expansion Mechanics
                </Link>
              </li>
              <li>
                <Link href="/learn/base64-data-uri" className="hover:text-foreground transition-colors duration-150">
                  Data URIs &amp; Image Embedding
                </Link>
              </li>
              <li>
                <Link href="/learn/convert-image-to-base64" className="hover:text-foreground transition-colors duration-150">
                  Convert an Image to Base64
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-[#27440D] dark:text-[#BEF264] font-medium hover:underline pt-1">
                  View All Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Trust &amp; Legal
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-muted">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors duration-150">
                  About the Project
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors duration-150">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors duration-150">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© 2026 Base64 Toolkit. Designed for developers who value clarity and privacy.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Browser Tools Local</span>
            <span>•</span>
            <span>No Payload Storage by App</span>
            <span>•</span>
            <span>RFC 4648 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
