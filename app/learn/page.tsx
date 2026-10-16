import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { EDUCATIONAL_GUIDES } from "@/lib/content/guides";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheckIcon, CodeIcon, ArrowRightIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateBreadcrumbSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Base64 Technical Guides & Standards — RFC 4648 & 2397 Tutorials",
  description:
    "In-depth, technically accurate tutorials on Base64, Base64URL, padding mechanics, size expansion overhead, and RFC 2397 Data URIs. Written with tested code examples.",
  path: "/learn",
});

export default function LearnIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/learn" },
  ]);

  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>RFC 4648 &amp; RFC 2397 Standards • Original Technical Guides</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64 Technical Guides
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Understand the mathematics, specifications, and real-world web architecture behind
            binary-to-text encoding. Tested code examples, honest performance trade-offs, and zero marketing filler.
          </p>
        </section>

        {/* Guides List */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATIONAL_GUIDES.map((guide, idx) => (
              <article
                key={guide.slug}
                className="group p-6 sm:p-7 rounded-3xl bg-surface border border-border/80 shadow-card hover:shadow-tool hover:border-[#65A30D]/40 dark:hover:border-[#BEF264]/40 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-muted font-mono">
                    <span className="text-[#27440D] dark:text-[#BEF264] font-semibold">
                      0{idx + 1} • Guide
                    </span>
                    <span>{guide.readTimeMinutes} min read</span>
                  </div>

                  <h2 className="text-lg font-semibold text-foreground group-hover:text-[#27440D] dark:group-hover:text-[#BEF264] transition-colors leading-snug">
                    <Link href={`/learn/${guide.slug}`}>{guide.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                    {guide.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-border/60">
                    {guide.summaryKeyPoints.slice(0, 2).map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs text-foreground/80 flex items-start gap-2"
                      >
                        <span className="text-[#65A30D] dark:text-[#A3E635] font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-4 border-t border-border/50 flex items-center justify-between">
                  <Link
                    href={`/learn/${guide.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#27440D] dark:text-[#BEF264] hover:underline"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRightIcon size={14} />
                  </Link>

                  <Link
                    href={guide.relatedTool.href}
                    className="text-[11px] font-mono text-muted hover:text-foreground"
                  >
                    Try Tool: {guide.relatedTool.title} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quality Commitment Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-surface border border-border/80 shadow-whisper space-y-4">
          <SectionHeading
            eyebrow="Editorial Standards"
            title="Evidence-Based Technical Documentation"
            description="How our educational guides are researched, tested, and maintained."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted leading-relaxed">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] flex items-center justify-center font-bold">
                <CodeIcon size={16} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Tested Code Vectors</h3>
              <p>
                Every code snippet is verified against official RFC test suites and the actual browser engine implementation running on this website.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] flex items-center justify-center font-bold">
                <ShieldCheckIcon size={16} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Accurate Security Stance</h3>
              <p>
                We never describe Base64 as encryption or security. We clearly delineate between encoding, token serialization, and cryptography.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] flex items-center justify-center font-bold">
                <ArrowRightIcon size={16} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Specification Citations</h3>
              <p>
                All technical claims cite formal IETF standards (RFC 4648, RFC 2397, RFC 7519) and active W3C / WHATWG browser specifications.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
