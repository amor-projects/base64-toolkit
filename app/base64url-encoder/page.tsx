import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Base64EncoderTool } from "@/components/tools/Base64EncoderTool";
import { ShieldCheckIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Base64URL Encoder Online — URL-Safe RFC 4648 §5 Encoding",
  description:
    "Encode strings to URL-safe Base64URL (- and _) directly in your browser. Configurable unpadded modes for JSON Web Tokens (JWT) and web query parameters.",
  alternates: {
    canonical: "https://base64toolkit.com/base64url-encoder",
  },
  openGraph: {
    title: "Base64URL Encoder Online — URL-Safe RFC 4648 §5 Encoding",
    description:
      "Transform text into URL-safe Base64 strings using '-' and '_' with unpadded support.",
    url: "https://base64toolkit.com/base64url-encoder",
    type: "website",
  },
};

export default function Base64UrlEncoderPage() {
  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>RFC 4648 §5 Standard • JWT & OAuth2 Ready</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64URL Encoder Online
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Safely encode text for URLs, filenames, and authentication tokens without percent-encoding.
            Swaps <code className="font-mono text-xs">+</code> and <code className="font-mono text-xs">/</code> for <code className="font-mono text-xs">-</code> and <code className="font-mono text-xs">_</code>.
          </p>
        </section>

        {/* Flagship tool configured with urlSafe defaults */}
        <section aria-label="Base64URL Encoder Tool">
          <Base64EncoderTool initialText="oauth_token_example_123" />
        </section>

        {/* Privacy Note */}
        <section className="p-5 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center shrink-0 border border-[#84CC16]/25">
              <ShieldCheckIcon size={18} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Client-Side Token Security</p>
              <p className="text-xs text-muted">
                OAuth2 and JWT tokens encoded here are transformed in your browser memory. Data is never sent to any server.
              </p>
            </div>
          </div>
          <Link
            href="/base64url-decoder"
            className="text-xs font-semibold text-[#3F6212] dark:text-[#BEF264] hover:underline shrink-0"
          >
            Need to decode URL-safe strings? Switch to Base64URL Decoder →
          </Link>
        </section>
      </div>
    </main>
  );
}
