import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheckIcon, CodeIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact & Support — Base64 Toolkit",
  description:
    "Get in touch with the Base64 Toolkit team. Report technical bugs, suggest encoding features, or ask questions about our privacy-first conversion tools.",
  alternates: {
    canonical: "https://base64toolkit.com/contact",
  },
  openGraph: {
    title: "Contact & Support — Base64 Toolkit",
    description:
      "Submit feedback, report unexpected conversion bugs, or get in touch regarding technical questions.",
    url: "https://base64toolkit.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Support &amp; Feedback</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Contact &amp; Support
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-xl leading-relaxed font-normal">
            Have a question, identified an edge-case conversion bug, or want to suggest a new encoding feature? We welcome feedback.
          </p>
        </section>

        {/* Contact Information & Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border/80 shadow-whisper space-y-3">
            <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] flex items-center justify-center font-bold">
              <ShieldCheckIcon size={16} />
            </div>
            <h2 className="text-base font-semibold text-foreground">Direct Email Inquiries</h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
              For general inquiries, editorial feedback, or privacy-related questions:
            </p>
            <div className="p-3.5 rounded-xl bg-surface dark:bg-[#161619] border border-border/80 shadow-whisper text-xs font-mono text-foreground">
              [TODO: OWNER - Supply official contact email, e.g. support@base64toolkit.com]
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-surface border border-border/80 shadow-whisper space-y-3">
            <div className="w-8 h-8 rounded-xl bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] flex items-center justify-center font-bold">
              <CodeIcon size={16} />
            </div>
            <h2 className="text-base font-semibold text-foreground">Reporting Technical Bugs</h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
              If a specific byte sequence, character, or file fails to encode or decode properly, please provide the details below to help us reproduce the issue.
            </p>
            <div className="p-3.5 rounded-xl bg-surface dark:bg-[#161619] border border-border/80 shadow-whisper text-xs font-mono text-muted">
              [TODO: OWNER - Supply issue tracker or bug report channel]
            </div>
          </div>
        </div>

        {/* Bug Reporting Guidelines */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Guidelines"
            title="How to File a Helpful Bug Report"
            description="Clear technical steps that allow us to isolate and fix edge cases quickly."
          />

          <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border/80 shadow-whisper space-y-4 text-xs sm:text-sm text-muted leading-relaxed font-normal">
            <ol className="list-decimal list-inside space-y-2.5">
              <li>
                <strong className="text-foreground">Which tool were you using?</strong> (e.g. Text Decoder, Base64URL Encoder, File to Base64).
              </li>
              <li>
                <strong className="text-foreground">The test input:</strong> An example string or description of the file format that produced the unexpected error.
              </li>
              <li>
                <strong className="text-foreground">Expected vs actual behavior:</strong> What did you anticipate versus what happened (e.g. error message, unexpected padding, or character output).
              </li>
              <li>
                <strong className="text-foreground">Your browser &amp; operating system:</strong> (e.g. Chrome 128 on macOS, Safari 17 on iOS, Firefox on Linux).
              </li>
            </ol>
            <p className="pt-2 text-xs text-muted border-t border-border/60">
              <strong className="text-foreground">Privacy Reminder:</strong> Because we process data in your browser, our team has no server logs of your inputs. Never include passwords, actual private keys, or confidential credentials in support inquiries.
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <div className="text-center text-xs text-muted">
          Looking for how Base64 works? Explore our{" "}
          <Link href="/learn" className="text-[#27440D] dark:text-[#BEF264] font-semibold underline">
            Technical Guides
          </Link>
          .
        </div>
      </div>
    </main>
  );
}
