import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ImageToBase64Tool } from "@/components/tools/ImageToBase64Tool";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheckIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Image to Base64 Converter Online — Data URI & HTML/CSS Generator",
  description:
    "Convert PNG, JPEG, WebP, SVG, and GIF images to Base64, Data URIs, HTML img tags, or CSS url() snippets in your browser without uploading the image.",
  path: "/image-to-base64",
});

export default function ImageToBase64Page() {
  const webAppSchema = generateWebApplicationSchema({
    name: "Image to Base64 Converter Online",
    description:
      "Convert PNG, JPG, WebP, SVG, and GIF images to Base64 strings, Data URIs, HTML <img> tags, and CSS snippets.",
    path: "/image-to-base64",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Image to Base64", path: "/image-to-base64" },
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
          <span className="text-foreground font-semibold">Image to Base64</span>
        </nav>

        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Image Embedding Studio • Instant Previews</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Image to Base64 Converter
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Transform PNG, JPG, WebP, SVG, and GIF images into Raw Base64 strings or ready-to-embed
            Data URIs. Generates copyable HTML and CSS snippets with zero server transmissions.
          </p>
        </section>

        {/* Tool */}
        <section aria-label="Image to Base64 Tool">
          <ImageToBase64Tool />
        </section>

        {/* Privacy Statement */}
        <section className="p-5 rounded-2xl bg-surface border border-border/80 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#84CC16]/12 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center shrink-0 border border-[#84CC16]/25">
              <ShieldCheckIcon size={18} className="text-[#65A30D] dark:text-[#A3E635]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Local Browser Processing</p>
              <p className="text-xs text-muted">
                Images are read locally and rendered via sandboxed browser object URLs. No image data is sent across networks.
              </p>
            </div>
          </div>
          <Link
            href="/base64-to-image"
            className="text-xs font-semibold text-[#3F6212] dark:text-[#BEF264] hover:underline shrink-0"
          >
            Need to decode an image? Switch to Base64 to Image →
          </Link>
        </section>

        {/* Tradeoffs */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Best Practices"
            title="When Should You Base64 Encode Images?"
            description="Base64 embedding has clear advantages for small icons, but distinct trade-offs for large photographs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted leading-relaxed font-normal">
            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2.5">
              <span className="text-xs font-mono text-[#3F6212] dark:text-[#BEF264] font-semibold">
                Ideal Use Cases
              </span>
              <h3 className="text-sm font-semibold text-foreground">Icons, Favicons & Badges (&lt;10 KB)</h3>
              <p>
                Embedding tiny SVG or PNG icons directly in HTML or CSS eliminates an extra HTTP request round-trip, preventing render-blocking layout shifts during critical page loading.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2.5">
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                When to Avoid
              </span>
              <h3 className="text-sm font-semibold text-foreground">Large Photos & Hero Banners</h3>
              <p>
                Because Base64 adds about 33% byte expansion and embeds the bytes inside the
                containing document or stylesheet, large images are usually better served as regular
                image URLs with independent caching.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
