import React from "react";
import type { Metadata } from "next";
import { Base64InspectorTool } from "@/components/tools/Base64InspectorTool";
import { SectionHeading } from "@/components/ui/SectionHeading";

import {
  buildRouteMetadata,
  generateBreadcrumbSchema,
  generateWebApplicationSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Base64 Validator & Inspector Online — Syntax & Format Diagnostics",
  description:
    "Inspect, validate, and diagnose Base64 and Base64URL strings. Detect malformed padding, check length modulo 4, identify magic byte file signatures directly in your browser.",
  path: "/base64-inspector",
});

export default function Base64InspectorPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Base64 Inspector", path: "/base64-inspector" },
  ]);
  const toolSchema = generateWebApplicationSchema({
    name: "Base64 Validator & Inspector",
    description:
      "Client-side RFC 4648 Base64 validator, diagnostic inspector, and magic byte analyzer.",
    path: "/base64-inspector",
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
            <span>RFC 4648 Diagnostic Engine • Magic Byte Analysis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64 Validator & Inspector
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Validate Base64 and Base64URL syntax, diagnose padding inconsistencies, calculate byte
            expansion, and examine header magic bytes to infer potential file types.
          </p>
        </section>

        {/* Tool */}
        <section aria-label="Base64 Inspector Tool">
          <Base64InspectorTool />
        </section>

        {/* Technical Explanation */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Diagnostic Principles"
            title="What Base64 Validation Can and Cannot Prove"
            description="Clear technical boundaries between mathematical verification and inferred file metadata."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted leading-relaxed font-normal">
            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <h3 className="text-sm font-semibold text-foreground">What Can Be Proven</h3>
              <p>
                Whether the string strictly conforms to RFC 4648 characters, whether padding conforms to 4-character block alignment, and whether the decoded byte count mathematically aligns with valid data.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <h3 className="text-sm font-semibold text-foreground">What Is Only Inferred</h3>
              <p>
                File extensions and MIME types are inferred solely by comparing decoded leading bytes against known magic numbers (e.g. <code className="font-mono text-[11px]">89 50 4E 47</code> for PNG). Raw Base64 strings do not inherently store original filenames or timestamps.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
