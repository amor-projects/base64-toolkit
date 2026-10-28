import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { EDUCATIONAL_GUIDES } from "@/lib/content/guides";
import { ShieldCheckIcon, CodeIcon, ArrowRightIcon, BoltIcon } from "@/components/ui/Icons";
import { buildRouteMetadata, generateBreadcrumbSchema } from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Base64 Guides for Developers — Learn, Debug, and Build",
  description:
    "Practical Base64 guides for understanding the alphabet and algorithm, encoding images, choosing Base64URL, fixing padding errors, measuring file-size overhead, and embedding Data URIs.",
  path: "/learn",
});

const guideBySlug = Object.fromEntries(EDUCATIONAL_GUIDES.map((guide) => [guide.slug, guide]));

const paths = [
  {
    label: "I’m new to Base64",
    description: "Build the mental model first, then see the 3-bytes-to-4-characters rule.",
    guide: guideBySlug["what-is-base64"],
  },
  {
    label: "My string will live in a URL",
    description: "Learn when standard Base64 breaks and why Base64URL exists.",
    guide: guideBySlug["base64-vs-base64url"],
  },
  {
    label: "My decoder is throwing an error",
    description: "Use the padding guide to diagnose length, alphabet, and truncation problems.",
    guide: guideBySlug["base64-padding"],
  },
];

export default function LearnIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/learn" },
  ]);
  const featuredGuide = guideBySlug["what-is-base64"];

  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#84CC16]/25 bg-[#84CC16]/10 px-3 py-1 text-xs font-medium text-[#27440D] shadow-whisper dark:text-[#BEF264]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
              <span>{EDUCATIONAL_GUIDES.length} practical guides · standards-aware</span>
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-6xl">
              Learn just enough Base64 to get unstuck.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Short, technical guides for the moments when a Base64 string, URL, image, or file
              needs an explanation—not more guesswork.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={`/learn/${featuredGuide.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#84CC16] px-4 py-2.5 text-sm font-semibold text-[#090D04] shadow-whisper transition-all duration-150 hover:bg-[#65A30D] hover:shadow-tool"
              >
                Start with the fundamentals
                <ArrowRightIcon size={15} />
              </Link>
              <Link
                href="/base64-encoder"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[#65A30D]/50"
              >
                Use the encoder
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5"><ShieldCheckIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" /> No filler or fake claims</span>
              <span className="inline-flex items-center gap-1.5"><CodeIcon size={14} className="text-[#65A30D] dark:text-[#A3E635]" /> Tested examples</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-border/80 bg-surface p-5 shadow-tool sm:p-6">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#84CC16]/12 blur-2xl dark:bg-[#BEF264]/10" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#27440D] dark:text-[#BEF264]">Featured guide</p>
                  <p className="mt-1 text-sm text-muted">The fastest place to begin</p>
                </div>
                <span className="rounded-lg bg-[#84CC16]/12 px-2 py-1 font-mono text-[11px] text-[#3F6212] dark:text-[#BEF264]">01 / {String(EDUCATIONAL_GUIDES.length).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.025em] text-foreground">{featuredGuide.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{featuredGuide.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-[#F6F6F4] p-3 dark:bg-[#1A1A1E]"><span className="block font-mono text-muted">Read time</span><strong className="mt-1 block text-foreground">{featuredGuide.readTimeMinutes} minutes</strong></div>
                <div className="rounded-xl bg-[#F6F6F4] p-3 dark:bg-[#1A1A1E]"><span className="block font-mono text-muted">You’ll leave with</span><strong className="mt-1 block text-foreground">A working model</strong></div>
              </div>
              <Link href={`/learn/${featuredGuide.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#27440D] hover:underline dark:text-[#BEF264]">
                Read the guide <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="path-heading">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#27440D] dark:text-[#BEF264]">Choose your path</p>
              <h2 id="path-heading" className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl">What are you trying to do?</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">Each route points to one useful answer and one next action.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {paths.map(({ label, description, guide }, index) => (
              <Link key={guide.slug} href={`/learn/${guide.slug}`} className="group rounded-2xl border border-border/80 bg-surface p-5 shadow-whisper transition-all duration-200 hover:-translate-y-0.5 hover:border-[#65A30D]/45 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#84CC16]/12 font-mono text-xs font-semibold text-[#3F6212] dark:text-[#BEF264]">0{index + 1}</span>
                  <ArrowRightIcon size={15} className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <h3 className="mt-5 text-sm font-semibold text-foreground">{label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{description}</p>
                <p className="mt-4 border-t border-border/60 pt-3 text-[11px] font-medium text-[#27440D] dark:text-[#BEF264]">{guide.shortTitle} · {guide.readTimeMinutes} min</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="all-guides-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#27440D] dark:text-[#BEF264]">The library</p>
              <h2 id="all-guides-heading" className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-3xl">Browse every guide</h2>
            </div>
            <span className="hidden text-xs text-muted sm:block">{EDUCATIONAL_GUIDES.length} guides · updated {EDUCATIONAL_GUIDES[0].lastUpdated}</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {EDUCATIONAL_GUIDES.map((guide, index) => (
              <article key={guide.slug} className="group flex flex-col rounded-2xl border border-border/80 bg-surface p-5 shadow-whisper transition-all duration-200 hover:-translate-y-0.5 hover:border-[#65A30D]/45 hover:shadow-card sm:p-6">
                <div className="flex items-center justify-between gap-4 text-[11px] font-mono text-muted">
                  <span className="font-semibold text-[#27440D] dark:text-[#BEF264]">{guide.category}</span>
                  <span>{String(index + 1).padStart(2, "0")} · {guide.readTimeMinutes} min</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.015em] text-foreground group-hover:text-[#27440D] dark:group-hover:text-[#BEF264]">{guide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{guide.description}</p>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-border/60 pt-4">
                  <span className="text-[11px] text-muted">Best for: {guide.audience}</span>
                  <Link href={`/learn/${guide.slug}`} className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#27440D] hover:underline dark:text-[#BEF264]">Read <ArrowRightIcon size={13} /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 border-t border-border/70 pt-10 sm:grid-cols-3">
          <div className="flex gap-3"><BoltIcon size={18} className="mt-0.5 shrink-0 text-[#65A30D] dark:text-[#A3E635]" /><div><h3 className="text-sm font-semibold text-foreground">Skimmable by design</h3><p className="mt-1 text-xs leading-relaxed text-muted">Takeaways, headings, examples, and FAQs keep the useful parts easy to find.</p></div></div>
          <div className="flex gap-3"><CodeIcon size={18} className="mt-0.5 shrink-0 text-[#65A30D] dark:text-[#A3E635]" /><div><h3 className="text-sm font-semibold text-foreground">Grounded in standards</h3><p className="mt-1 text-xs leading-relaxed text-muted">Examples point to RFC 4648, RFC 2397, and actual browser behavior where it matters.</p></div></div>
          <div className="flex gap-3"><ShieldCheckIcon size={18} className="mt-0.5 shrink-0 text-[#65A30D] dark:text-[#A3E635]" /><div><h3 className="text-sm font-semibold text-foreground">Honest limitations</h3><p className="mt-1 text-xs leading-relaxed text-muted">We call out overhead, security boundaries, and cases where Base64 is the wrong tool.</p></div></div>
        </section>
      </div>
    </main>
  );
}
