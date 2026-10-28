import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EDUCATIONAL_GUIDES } from "@/lib/content/guides";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { CopyLinkButton, GuideProgress } from "@/components/content/GuideProgress";
import { ShieldCheckIcon, ArrowRightIcon, InfoIcon, WarningIcon } from "@/components/ui/Icons";
import { buildRouteMetadata, generateBreadcrumbSchema, generateArticleSchema } from "@/lib/seo/site";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EDUCATIONAL_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = EDUCATIONAL_GUIDES.find((item) => item.slug === slug);
  if (!guide) return {};

  return buildRouteMetadata({
    title: guide.title,
    description: guide.description,
    path: `/learn/${guide.slug}`,
    type: "article",
  });
}

export default function GuidePage({ params }: GuidePageProps) {
  return (
    <main className="flex-1 flex flex-col items-center py-8 sm:py-12 font-sans">
      <GuideProgress />
      <Suspense fallback={<GuideLoadingFallback />}>
        <GuidePageContent params={params} />
      </Suspense>
    </main>
  );
}

function GuideLoadingFallback() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-busy="true">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted font-mono">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/learn">Guides</Link>
      </nav>
      <div className="mt-8 max-w-4xl border-b border-border/70 pb-9">
        <div className="h-4 w-32 animate-pulse rounded bg-border/70" />
        <div className="mt-6 h-12 max-w-2xl animate-pulse rounded-xl bg-border/70" />
        <div className="mt-5 h-5 max-w-xl animate-pulse rounded bg-border/50" />
      </div>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14">
        <div className="hidden h-52 animate-pulse rounded-2xl bg-border/40 lg:block" />
        <div className="space-y-5">
          <div className="h-28 animate-pulse rounded-2xl bg-border/40" />
          <div className="h-96 animate-pulse rounded-2xl bg-border/30" />
        </div>
      </div>
      <p className="sr-only">Loading guide content…</p>
    </div>
  );
}

async function GuidePageContent({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = EDUCATIONAL_GUIDES.find((item) => item.slug === slug);

  if (!guide) notFound();

  const currentIndex = EDUCATIONAL_GUIDES.findIndex((item) => item.slug === guide.slug);
  const previousGuide = EDUCATIONAL_GUIDES[currentIndex - 1];
  const nextGuide = EDUCATIONAL_GUIDES[currentIndex + 1];
  const relatedGuides = EDUCATIONAL_GUIDES.filter((item) => item.slug !== guide.slug).slice(0, 2);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/learn" },
    { name: guide.shortTitle, path: `/learn/${guide.slug}` },
  ]);
  const articleSchema = generateArticleSchema({
    title: guide.title,
    description: guide.description,
    path: `/learn/${guide.slug}`,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted font-mono">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/learn" className="transition-colors hover:text-foreground">Guides</Link>
          <span>/</span>
          <span className="truncate font-semibold text-foreground">{guide.shortTitle}</span>
        </nav>

        <header className="mt-8 max-w-4xl border-b border-border/70 pb-9">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="rounded-full border border-[#84CC16]/25 bg-[#84CC16]/10 px-2.5 py-1 font-semibold text-[#27440D] dark:text-[#BEF264]">{guide.category}</span>
            <span className="text-muted">Guide {String(currentIndex + 1).padStart(2, "0")} of {String(EDUCATIONAL_GUIDES.length).padStart(2, "0")}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{guide.readTimeMinutes} min read</span>
          </div>
          <div className="mt-5 flex items-start justify-between gap-5">
            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-foreground sm:text-5xl">{guide.title}</h1>
            <div className="hidden shrink-0 sm:block"><CopyLinkButton /></div>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{guide.description}</p>
          <div className="mt-4 sm:hidden"><CopyLinkButton /></div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
            <span>For: {guide.audience}</span>
            <span className="hidden sm:inline">•</span>
            <span>Reviewed {guide.lastUpdated}</span>
            <span className="hidden sm:inline">•</span>
            <span>Standards reviewed</span>
          </div>
        </header>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14">
          <aside className="space-y-5 lg:sticky lg:top-24">
            <nav aria-label="On this page" className="rounded-2xl border border-border/80 bg-surface p-4 shadow-whisper">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">On this page</p>
              <ol className="mt-3 space-y-1">
                {guide.sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="group flex gap-2 rounded-lg px-2 py-1.5 text-xs leading-relaxed text-muted transition-colors hover:bg-[#84CC16]/10 hover:text-foreground">
                      <span className="font-mono text-[10px] text-[#65A30D] dark:text-[#A3E635]">{String(index + 1).padStart(2, "0")}</span>
                      <span>{section.title.replace(/^\d+\.\s*/, "")}</span>
                    </a>
                  </li>
                ))}
                {guide.faq.length > 0 && <li><a href="#faq" className="group flex gap-2 rounded-lg px-2 py-1.5 text-xs text-muted transition-colors hover:bg-[#84CC16]/10 hover:text-foreground"><span className="font-mono text-[10px] text-[#65A30D] dark:text-[#A3E635]">↳</span><span>FAQ</span></a></li>}
              </ol>
            </nav>
            <div className="rounded-2xl border border-[#84CC16]/25 bg-[#84CC16]/10 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#27440D] dark:text-[#BEF264]"><ShieldCheckIcon size={15} /><span>Keep going</span></div>
              <p className="mt-2 text-xs leading-relaxed text-[#3F6212] dark:text-[#D9F99D]">The fastest way to make this concrete is to try the matching browser tool.</p>
              <Link href={guide.relatedTool.href} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#27440D] hover:underline dark:text-[#BEF264]">{guide.relatedTool.title} <ArrowRightIcon size={13} /></Link>
            </div>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <section aria-label="Key takeaways" className="rounded-2xl border border-[#84CC16]/25 bg-[#84CC16]/10 p-5 shadow-whisper sm:p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#27440D] dark:text-[#BEF264]"><ShieldCheckIcon size={16} /><span>Key takeaways</span></div>
              <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-foreground/90 sm:grid-cols-2">
                {guide.summaryKeyPoints.map((point) => <li key={point} className="flex items-start gap-2.5"><span className="mt-0.5 text-[#65A30D] dark:text-[#A3E635]">✓</span><span>{point}</span></li>)}
              </ul>
            </section>

            <article className="mt-12 min-w-0 max-w-full space-y-12 leading-relaxed text-foreground">
              {guide.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                  <h2 className="border-b border-border/60 pb-3 text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-2xl">{section.title}</h2>
                  <MarkdownRenderer content={section.content} />
                  {section.codeSnippet && (
                    <div className="my-5 min-w-0 max-w-full overflow-hidden rounded-2xl border border-border/80 shadow-whisper">
                      {section.codeSnippet.caption && <div className="flex items-center justify-between border-b border-border/80 bg-surface px-4 py-2 text-[11px] text-muted"><span>{section.codeSnippet.caption}</span><span className="font-mono uppercase">{section.codeSnippet.language}</span></div>}
                      <pre className="max-w-full overflow-x-auto bg-[#141417] p-4 text-[12.5px] leading-relaxed text-[#F4F4F5] sm:p-5 sm:text-[13px]"><code>{section.codeSnippet.code}</code></pre>
                    </div>
                  )}
                  {section.callout && (
                    <div className={`my-5 space-y-1.5 rounded-2xl border p-4 text-xs sm:p-5 sm:text-sm ${section.callout.type === "warning" ? "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200" : "border-[#84CC16]/25 bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264]"}`}>
                      <div className="flex items-center gap-2 font-semibold">{section.callout.type === "warning" ? <WarningIcon size={16} /> : <InfoIcon size={16} />}<span>{section.callout.title}</span></div>
                      <p className="leading-relaxed opacity-95">{section.callout.text}</p>
                    </div>
                  )}
                </section>
              ))}
            </article>

            {guide.faq.length > 0 && (
              <section id="faq" className="scroll-mt-24 mt-14 space-y-5 border-t border-border/70 pt-10">
                <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#27440D] dark:text-[#BEF264]">Still curious?</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-foreground">Frequently asked questions</h2></div>
                <div className="space-y-3">
                  {guide.faq.map((item) => <details key={item.question} className="group rounded-2xl border border-border/80 bg-surface p-4 shadow-whisper"><summary className="cursor-pointer list-none pr-5 text-sm font-semibold text-foreground marker:hidden">{item.question}<span className="float-right text-muted transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.answer}</p></details>)}
                </div>
              </section>
            )}

            <section className="mt-14 rounded-2xl border border-border/80 bg-surface p-5 shadow-card sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#27440D] dark:text-[#BEF264]">Apply it now</p><h2 className="mt-2 text-lg font-semibold text-foreground">Try the matching tool</h2><p className="mt-1 text-sm leading-relaxed text-muted">{guide.relatedTool.description}</p></div>
                <Link href={guide.relatedTool.href} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#84CC16] px-4 py-2.5 text-sm font-semibold text-[#090D04] transition-colors hover:bg-[#65A30D]">Open tool <ArrowRightIcon size={15} /></Link>
              </div>
            </section>

            <section className="mt-14 border-t border-border/70 pt-10" aria-labelledby="continue-heading">
              <div className="flex items-end justify-between gap-4"><div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#27440D] dark:text-[#BEF264]">Continue learning</p><h2 id="continue-heading" className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-foreground">One more useful read</h2></div><Link href="/learn" className="text-xs font-semibold text-[#27440D] hover:underline dark:text-[#BEF264]">All guides →</Link></div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {relatedGuides.map((item) => <Link key={item.slug} href={`/learn/${item.slug}`} className="group rounded-2xl border border-border/80 bg-surface p-4 shadow-whisper transition-all hover:-translate-y-0.5 hover:border-[#65A30D]/45 hover:shadow-card"><div className="flex items-center justify-between gap-3 text-[11px] font-mono text-muted"><span className="text-[#27440D] dark:text-[#BEF264]">{item.category}</span><ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" /></div><h3 className="mt-3 text-sm font-semibold leading-snug text-foreground">{item.shortTitle}</h3><p className="mt-2 text-xs leading-relaxed text-muted">{item.description}</p></Link>)}
              </div>
            </section>

            <nav aria-label="Guide sequence" className="mt-8 grid gap-3 border-t border-border/70 pt-8 sm:grid-cols-2">
              {previousGuide ? <Link href={`/learn/${previousGuide.slug}`} className="rounded-xl border border-border/80 p-4 text-left transition-colors hover:border-[#65A30D]/45"><span className="text-[11px] text-muted">← Previous guide</span><span className="mt-1 block text-sm font-semibold text-foreground">{previousGuide.shortTitle}</span></Link> : <span />}
              {nextGuide && <Link href={`/learn/${nextGuide.slug}`} className="rounded-xl border border-border/80 p-4 text-right transition-colors hover:border-[#65A30D]/45"><span className="text-[11px] text-muted">Next guide →</span><span className="mt-1 block text-sm font-semibold text-foreground">{nextGuide.shortTitle}</span></Link>}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
