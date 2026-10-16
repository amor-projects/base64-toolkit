import React from "react";
import type { Metadata } from "next";
import { DataUriGeneratorTool } from "@/components/tools/DataUriGeneratorTool";
import { SectionHeading } from "@/components/ui/SectionHeading";

import {
  buildRouteMetadata,
  generateBreadcrumbSchema,
  generateWebApplicationSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Data URI Generator Online — RFC 2397 Embedding Studio",
  description:
    "Generate valid RFC 2397 Data URIs from raw Base64 data or files. Create ready-to-use HTML <img> tags and CSS background-image url() rules directly in your browser.",
  path: "/data-uri-generator",
});

export default function DataUriGeneratorPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Data URI Generator", path: "/data-uri-generator" },
  ]);
  const toolSchema = generateWebApplicationSchema({
    name: "Data URI Generator",
    description:
      "Client-side RFC 2397 Data URI builder for HTML <img> and CSS url() assets.",
    path: "/data-uri-generator",
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
            <span>RFC 2397 Standard • HTML & CSS Embeds</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Data URI Generator & Studio
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Construct standard <code className="font-mono text-xs">data:[mediatype];base64,</code> URIs
            for embedding assets directly inside web documents, emails, and stylesheet definitions.
          </p>
        </section>

        {/* Tool */}
        <section aria-label="Data URI Generator Tool">
          <DataUriGeneratorTool />
        </section>

        {/* Anatomy of a Data URI */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Specification"
            title="Anatomy of an RFC 2397 Data URI"
            description="How web browsers parse and interpret inline base64 data schemes."
          />

          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-4">
            <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] font-mono text-xs sm:text-sm text-foreground overflow-x-auto">
              <span className="text-[#3F6212] dark:text-[#BEF264] font-bold">data:</span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">[mime/type]</span>
              <span className="text-muted">;</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">base64</span>
              <span className="text-muted">,</span>
              <span className="text-foreground">[encoded_payload...]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted">
              <div>
                <strong className="text-foreground block mb-1">Scheme: data:</strong>
                Identifies the URL as an inline resource rather than an external HTTP network request.
              </div>
              <div>
                <strong className="text-foreground block mb-1">MIME Type:</strong>
                Declares the media format (e.g. <code className="font-mono text-[11px]">image/png</code> or <code className="font-mono text-[11px]">application/pdf</code>).
              </div>
              <div>
                <strong className="text-foreground block mb-1">Encoding: ;base64,</strong>
                Explicitly instructs the browser to decode following characters using the Base64 alphabet.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
