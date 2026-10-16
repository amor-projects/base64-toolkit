import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-border/70 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Privacy Column */}
          <div className="md:col-span-1 flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#84CC16] text-[#0F172A] flex items-center justify-center font-mono font-bold text-[10px] shadow-[0_1px_3px_rgba(132,204,22,0.4)]">
                64
              </div>
              <span className="font-semibold text-sm tracking-tight text-foreground">
                Base64 Toolkit
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-xs font-normal">
              A refined developer utility designed for precision, clarity, and uncompromising
              privacy. All transformations execute locally on your device.
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
                <a href="/base64-encoder" className="hover:text-foreground transition-colors duration-150">
                  Text Base64 Encoder
                </a>
              </li>
              <li>
                <a href="/base64-decoder" className="hover:text-foreground transition-colors duration-150">
                  Text Base64 Decoder
                </a>
              </li>
              <li>
                <a href="/file-to-base64" className="hover:text-foreground transition-colors duration-150">
                  File to Base64 (10MB)
                </a>
              </li>
              <li>
                <a href="/base64-to-file" className="hover:text-foreground transition-colors duration-150">
                  Base64 to Downloadable File
                </a>
              </li>
              <li>
                <a href="/image-to-base64" className="hover:text-foreground transition-colors duration-150">
                  Image & Data URI Studio
                </a>
              </li>
              <li>
                <a href="/base64-to-image" className="hover:text-foreground transition-colors duration-150">
                  Base64 to Image Preview
                </a>
              </li>
              <li>
                <a href="/base64-inspector" className="hover:text-foreground transition-colors duration-150">
                  Base64 Inspector & Validator
                </a>
              </li>
              <li>
                <a href="/base64-size-calculator" className="hover:text-foreground transition-colors duration-150">
                  Size & Overhead Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & Architecture Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Architecture & Trust
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-muted">
              <li>
                <a href="#privacy" className="hover:text-foreground transition-colors duration-150">
                  Zero Server Intermediation
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-foreground transition-colors duration-150">
                  In-Memory Browser Engine
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-foreground transition-colors duration-150">
                  Zero Payload Telemetry
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-foreground transition-colors duration-150">
                  Memory Ceiling Safeguards
                </a>
              </li>
            </ul>
          </div>

          {/* Learn Column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Guides & Specs
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-muted">
              <li>
                <a href="#learn" className="hover:text-foreground transition-colors duration-150">
                  What is Base64 Encoding?
                </a>
              </li>
              <li>
                <a href="#learn" className="hover:text-foreground transition-colors duration-150">
                  Base64 vs Base64URL
                </a>
              </li>
              <li>
                <a href="#learn" className="hover:text-foreground transition-colors duration-150">
                  Understanding Padding (=, ==)
                </a>
              </li>
              <li>
                <a href="#learn" className="hover:text-foreground transition-colors duration-150">
                  33% Size Expansion Mechanics
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© 2026 Base64 Toolkit. Designed for developers who value clarity and privacy.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% In-Browser</span>
            <span>•</span>
            <span>Keyboard Accessible</span>
            <span>•</span>
            <span>Zero Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
