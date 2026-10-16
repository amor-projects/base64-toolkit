import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EDUCATIONAL_GUIDES } from "@/lib/content/guides";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import {
  ShieldCheckIcon,
  ArrowRightIcon,
  InfoIcon,
  WarningIcon,
} from "@/components/ui/Icons";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EDUCATIONAL_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = EDUCATIONAL_GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: `${guide.title} — Base64 Toolkit`,
    description: guide.description,
    alternates: {
      canonical: guide.canonicalUrl,
    },
    openGraph: {
      title: `${guide.title} — Base64 Toolkit`,
      description: guide.description,
      url: guide.canonicalUrl,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = EDUCATIONAL_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-muted font-mono"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-foreground">
            Guides
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold truncate">
            {guide.shortTitle}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 border-b border-border/70 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/25 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Educational Guide • {guide.readTimeMinutes} min read</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-foreground leading-[1.2]">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed font-normal">
            {guide.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted pt-2">
            <span>Reviewed: {guide.lastUpdated}</span>
            <span>•</span>
            <span>Status: Verified RFC Specification</span>
          </div>
        </header>

        {/* Key Takeaways Card */}
        <section
          aria-label="Key Takeaways"
          className="p-6 rounded-2xl bg-[#84CC16]/8 dark:bg-[#BEF264]/8 border border-[#84CC16]/20 shadow-whisper space-y-3"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#27440D] dark:text-[#BEF264] uppercase font-mono">
            <ShieldCheckIcon size={16} />
            <span>Key Takeaways</span>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
            {guide.summaryKeyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="text-[#65A30D] dark:text-[#A3E635] font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Interactive Tool Callout */}
        <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#27440D] dark:text-[#BEF264] font-semibold">
              Interactive Tool Available
            </span>
            <p className="text-sm font-semibold text-foreground">{guide.relatedTool.title}</p>
            <p className="text-xs text-muted">{guide.relatedTool.description}</p>
          </div>
          <Link
            href={guide.relatedTool.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#84CC16] hover:bg-[#65A30D] text-[#090D04] shadow-whisper hover:shadow-tool transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0"
          >
            <span>Open Tool</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        {/* Article Body Sections */}
        <article className="space-y-12 leading-relaxed text-foreground">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground border-b border-border/60 pb-2">
                {section.title}
              </h2>

              <MarkdownRenderer content={section.content} />

              {section.codeSnippet && (
                <div className="rounded-2xl border border-border/80 overflow-hidden shadow-whisper my-4">
                  {section.codeSnippet.caption && (
                    <div className="px-4 py-2 bg-surface dark:bg-[#161619] border-b border-border/80 text-[11px] font-mono text-muted flex items-center justify-between">
                      <span>{section.codeSnippet.caption}</span>
                      <span className="uppercase text-[10px] font-semibold">
                        {section.codeSnippet.language}
                      </span>
                    </div>
                  )}
                  <pre className="p-4 sm:p-5 text-[12.5px] sm:text-[13px] font-mono leading-relaxed bg-[#141417] text-[#F4F4F5] overflow-x-auto">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {section.callout && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-1.5 my-4 ${
                    section.callout.type === "warning"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
                      : "bg-[#84CC16]/10 border-[#84CC16]/25 text-[#27440D] dark:text-[#BEF264]"
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    {section.callout.type === "warning" ? (
                      <WarningIcon size={16} />
                    ) : (
                      <InfoIcon size={16} />
                    )}
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="leading-relaxed opacity-95">{section.callout.text}</p>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Frequently Asked Questions */}
        {guide.faq.length > 0 && (
          <section className="space-y-6 border-t border-border/70 pt-10">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              description="Direct, technical answers to common implementation questions."
            />

            <div className="space-y-4">
              {guide.faq.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-2"
                >
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="text-[#65A30D] dark:text-[#A3E635] font-bold">Q:</span>
                    <span>{item.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal pl-5">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation to other guides */}
        <nav
          aria-label="Related Guides"
          className="border-t border-border/70 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <Link
            href="/learn"
            className="text-xs font-semibold text-[#27440D] dark:text-[#BEF264] hover:underline"
          >
            ← View All Technical Guides
          </Link>

          <Link
            href={guide.relatedTool.href}
            className="text-xs font-semibold text-foreground hover:text-[#27440D] dark:hover:text-[#BEF264] transition-colors"
          >
            Open {guide.relatedTool.title} →
          </Link>
        </nav>
      </div>
    </main>
  );
}
