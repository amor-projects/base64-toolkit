import React from "react";
import type { Metadata } from "next";
import { Base64SizeCalculatorTool } from "@/components/tools/Base64SizeCalculatorTool";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Base64 Size & Overhead Calculator — 4:3 Ratio & Bandwidth Math",
  description:
    "Calculate the exact 33.3% size expansion of Base64 encoding. Compute byte overhead, Data URI prefix lengths, and mobile payload bandwidth impact directly in your browser.",
  alternates: {
    canonical: "https://base64toolkit.com/base64-size-calculator",
  },
  openGraph: {
    title: "Base64 Size & Overhead Calculator — 4:3 Ratio & Bandwidth Math",
    description:
      "Accurately model Base64 and Data URI overhead with instant byte math.",
    url: "https://base64toolkit.com/base64-size-calculator",
    type: "website",
  },
};

export default function Base64SizeCalculatorPage() {
  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/12 dark:bg-[#BEF264]/14 text-[#3F6212] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Bandwidth & Overhead Modeler • Exact Formulas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64 Size & Overhead Calculator
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            Understand how Base64 increases binary byte sizes by ~33%. Compute exact character counts,
            Data URI metadata overhead, and network transmission trade-offs before deploying code.
          </p>
        </section>

        {/* Tool */}
        <section aria-label="Base64 Size Calculator Tool">
          <Base64SizeCalculatorTool />
        </section>

        {/* Table comparison */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Quick Reference"
            title="Common Binary Sizes vs Encoded Footprints"
            description="Precomputed byte overhead numbers across standard web asset sizes."
          />

          <div className="overflow-x-auto rounded-2xl border border-border/80 shadow-whisper bg-surface">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-border/70 bg-surface dark:bg-[#151518]">
                  <th className="py-3 px-4 font-semibold text-foreground">Binary Input Size</th>
                  <th className="py-3 px-4 font-semibold text-foreground">Base64 Output Length</th>
                  <th className="py-3 px-4 font-semibold text-foreground">Added Overhead</th>
                  <th className="py-3 px-4 font-semibold text-foreground">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 font-mono text-[12px]">
                <tr>
                  <td className="py-3 px-4 text-foreground font-sans">1 KB (1,024 B)</td>
                  <td className="py-3 px-4 text-[#3F6212] dark:text-[#BEF264] font-semibold">1,368 chars</td>
                  <td className="py-3 px-4 text-muted">+344 B (+33.6%)</td>
                  <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-sans text-xs">Excellent for inline SVG/icons</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground font-sans">10 KB (10,240 B)</td>
                  <td className="py-3 px-4 text-[#3F6212] dark:text-[#BEF264] font-semibold">13,656 chars</td>
                  <td className="py-3 px-4 text-muted">+3,416 B (+33.4%)</td>
                  <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-sans text-xs">Acceptable for critical UI glyphs</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground font-sans">100 KB (102,400 B)</td>
                  <td className="py-3 px-4 text-[#3F6212] dark:text-[#BEF264] font-semibold">136,536 chars</td>
                  <td className="py-3 px-4 text-muted">+34,136 B (+33.3%)</td>
                  <td className="py-3 px-4 text-amber-700 dark:text-amber-400 font-sans text-xs">Prefer regular static URL caching</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground font-sans">1 MB (1,048,576 B)</td>
                  <td className="py-3 px-4 text-[#3F6212] dark:text-[#BEF264] font-semibold">1,398,104 chars</td>
                  <td className="py-3 px-4 text-muted">+349,528 B (+33.3%)</td>
                  <td className="py-3 px-4 text-red-700 dark:text-red-400 font-sans text-xs">Avoid Base64 (wastes mobile data)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
