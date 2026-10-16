import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheckIcon, CodeIcon, ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About Base64 Toolkit — Privacy-First Web Utilities",
  description:
    "Learn about the mission, browser-local architecture, and privacy-first engineering behind Base64 Toolkit. Zero server uploads and strict RFC compliance.",
  alternates: {
    canonical: "https://base64toolkit.com/about",
  },
  openGraph: {
    title: "About Base64 Toolkit — Privacy-First Web Utilities",
    description:
      "A fast, privacy-preserving developer utility designed for local data conversions without sending user files across the network.",
    url: "https://base64toolkit.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Product Mission &amp; Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            About Base64 Toolkit
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-normal">
            A developer-focused utility built on a simple architectural promise: convert, inspect,
            and transform data entirely in your local browser without transmitting your content across the internet.
          </p>
        </section>

        {/* Why We Built This */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Our Purpose"
            title="Why Another Base64 Utility?"
            description="The internet is full of converter websites, but many fail modern developer expectations."
          />

          <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border/80 shadow-whisper space-y-4 text-xs sm:text-sm text-muted leading-relaxed font-normal">
            <p>
              Most online Base64 tools fall into one of two traps: either they are cluttered with intrusive ads that cover the converter buttons, or worse, they quietly upload user files and pasted tokens to remote backend servers to perform transformations.
            </p>
            <p>
              When working with authentication payloads, private keys, database dumps, or confidential design assets, uploading data to an unknown third-party server represents a serious security and privacy risk.
            </p>
            <p>
              Base64 Toolkit was built to provide an honest, modern alternative: an elegant, responsive developer tool that runs 100% inside your browser tab, respecting both your time and your data privacy.
            </p>
          </div>
        </section>

        {/* Core Architectural Principles */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Architecture"
            title="How We Protect Your Data"
            description="Verification through code architecture, not hollow marketing promises."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted leading-relaxed">
            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] flex items-center justify-center font-bold">
                <ShieldCheckIcon size={16} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Zero Server Uploads</h3>
              <p>
                All file encoding, decoding, and string transformations execute in your browser via native Web APIs (<code className="font-mono text-[11px]">FileReader</code>, <code className="font-mono text-[11px]">ArrayBuffer</code>, <code className="font-mono text-[11px]">TextEncoder</code>). No input or output data is ever posted to an API route.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] flex items-center justify-center font-bold">
                <CodeIcon size={16} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Strict Spec Compliance</h3>
              <p>
                Our conversion algorithms strictly implement IETF RFC 4648 (for both standard Base64 and Base64URL) and RFC 2397 (for Data URIs), with complete multi-byte UTF-8 character and emoji support.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] flex items-center justify-center font-bold">
                <ArrowRightIcon size={16} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Honest Security Stance</h3>
              <p>
                We clearly state that Base64 is an encoding mechanism, not encryption. We do not make misleading claims about file secrecy or cryptographic security.
              </p>
            </div>
          </div>
        </section>

        {/* Operator Information Box */}
        <section className="p-6 rounded-2xl bg-[#F6F6F4] dark:bg-[#161619] border border-border/80 text-xs text-muted space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Project Operator &amp; Contact</h3>
          <p>
            This website is maintained as an independent open developer resource.
          </p>
          <p className="font-mono text-[11px]">
            Operator: [TODO: OWNER - Specify individual or company operator name]<br />
            Location: [TODO: OWNER - Specify operator jurisdiction/country]<br />
            Inquiries: <Link href="/contact" className="text-[#27440D] dark:text-[#BEF264] underline">Contact Page</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
