import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Base64ToImageTool } from "@/components/tools/Base64ToImageTool";
import { ShieldCheckIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Base64 to Image Converter — Decode PNG, JPG & SVG",
  description:
    "Decode Base64 strings and Data URIs into visible images directly in your browser. Live visual preview, automatic image format detection, and instant download.",
  path: "/base64-to-image",
});

export default function Base64ToImagePage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Base64 to Image Decoder Online",
    description:
      "Decode Base64 strings and Data URIs into visible images directly in your browser with live preview.",
    path: "/base64-to-image",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Base64 to Image", path: "/base64-to-image" },
  ]);

  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-muted font-mono"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Base64 to Image</span>
        </nav>

        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Visual Image Decoder • Automatic MIME Recognition</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64 to Image Decoder
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Decode Base64 and Data URI strings into viewable PNG, JPEG, WebP, GIF, or SVG images.
            Inspect dimensions and download the recovered image file to your device.
          </p>
        </section>

        {/* Tool */}
        <section aria-label="Base64 to Image Tool">
          <Base64ToImageTool />
        </section>

        {/* Privacy Notice */}
        <section className="p-5 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center shrink-0 border border-[#84CC16]/25">
              <ShieldCheckIcon size={18} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Safe Visual Preview</p>
              <p className="text-xs text-muted">
                Images are parsed in-memory and rendered using sandboxed canvas/img elements without arbitrary script execution.
              </p>
            </div>
          </div>
          <Link
            href="/image-to-base64"
            className="text-xs font-semibold text-[#3F6212] dark:text-[#BEF264] hover:underline shrink-0"
          >
            Need to encode an image? Switch to Image to Base64 →
          </Link>
        </section>
      </div>
    </main>
  );
}
