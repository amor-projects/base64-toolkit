import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Base64DecoderTool } from "@/components/tools/Base64DecoderTool";
import { ShieldCheckIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateBreadcrumbSchema,
  generateWebApplicationSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Base64URL Decoder Online — Decode URL-Safe & JWT Strings",
  description:
    "Decode URL-safe Base64URL strings (-, _) with or without padding. Safely inspect JWT payloads and URL query parameters directly in your browser with zero server uploads.",
  path: "/base64url-decoder",
});

export default function Base64UrlDecoderPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Base64URL Decoder", path: "/base64url-decoder" },
  ]);
  const toolSchema = generateWebApplicationSchema({
    name: "Base64URL Decoder",
    description:
      "Client-side RFC 4648 §5 Base64URL decoder for JWTs, tokens, and web-safe strings.",
    path: "/base64url-decoder",
  });

  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>RFC 4648 §5 Decoder • Unpadded JWT Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64URL Decoder Online
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Decode URL-safe strings containing <code className="font-mono text-xs">-</code> and <code className="font-mono text-xs">_</code> characters.
            Supports unpadded OAuth2 tokens, JWT segment inspection, and strict UTF-8 validation.
          </p>
        </section>

        {/* Decoder tool */}
        <section aria-label="Base64URL Decoder Tool">
          <Base64DecoderTool initialBase64="b2F1dGhfdG9rZW5fZXhhbXBsZV8xMjM" />
        </section>

        {/* Privacy Note */}
        <section className="p-5 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center shrink-0 border border-[#84CC16]/25">
              <ShieldCheckIcon size={18} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Local Token Decoding</p>
              <p className="text-xs text-muted">
                Authentication tokens and sensitive query parameters remain in this browser tab. Zero network transmission of inputs or outputs.
              </p>
            </div>
          </div>
          <Link
            href="/base64url-encoder"
            className="text-xs font-semibold text-[#3F6212] dark:text-[#BEF264] hover:underline shrink-0"
          >
            Need to encode URL-safe strings? Switch to Base64URL Encoder →
          </Link>
        </section>
      </div>
    </main>
  );
}
