import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { WarningIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateBreadcrumbSchema,
  SITE_URL,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Terms of Service — Base64 Toolkit",
  description:
    "Terms of service for Base64 Toolkit. Clear terms covering permitted use, intellectual property, disclaimer of warranties, and limitation of liability.",
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ]);

  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] dark:bg-[#A3E635]" />
            <span>Usage Agreement &amp; Terms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Terms of Service
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-xl leading-relaxed font-normal">
            Please read these terms before using the utilities and educational resources provided on Base64 Toolkit.
          </p>
        </section>

        {/* Security Alert Banner */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-1.5">
          <div className="flex items-center gap-2 font-semibold">
            <WarningIcon size={16} />
            <span>Important Security Notice</span>
          </div>
          <p className="leading-relaxed opacity-95">
            Base64 is an encoding format, not an encryption method. Encoding sensitive data (such as passwords or credentials) into Base64 does not protect it from unauthorized access. You are solely responsible for ensuring your data is properly encrypted where confidentiality is required.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-muted leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Base64 Toolkit at {SITE_URL}, you agree to be bound by these
              Terms of Service. If you disagree with any part of these terms, please discontinue
              using this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              2. Permitted Use &amp; Local Processing
            </h2>
            <p>
              Base64 Toolkit is provided for lawful personal, educational, and professional data transformation purposes. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90">
              <li>Use the service to distribute malicious software, viruses, or unlawful content.</li>
              <li>Attempt to disrupt, overload, or impair the website infrastructure through automated scraping or denial-of-service attacks.</li>
              <li>Circumvent or manipulate technical limitations or security measures implemented on the site.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              3. API Use, URL Visibility &amp; Rate Limits
            </h2>
            <p>
              The optional Base64 API accepts text, Base64 values, or URLs through GET query
              parameters and returns JSON. You must not submit passwords, secrets, private tokens,
              unlawful content, or confidential values. GET query strings can be retained by
              browsers, networks, CDNs, and hosting providers outside our control. The application
              does not intentionally persist submitted values or results.
            </p>
            <p>
              The API is rate-limited, validates input length and Base64 syntax, and may reject
              requests with a 400, 413, 422, or 429 response. Rate limits are process-local and
              may vary between hosting instances. Base64 output is not encryption, does not shorten
              a URL, and does not guarantee that a destination is safe or available.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              4. Disclaimer of Warranties (&apos;As-Is&apos;)
            </h2>
            <p>
              Base64 Toolkit, including the website and API, is provided on an <strong>&apos;AS IS&apos;</strong> and <strong>&apos;AS AVAILABLE&apos;</strong> basis, without warranties of any kind, whether express, statutory, or implied.
            </p>
            <p>
              While we test our conversion algorithms against relevant standards, we do not warrant
              that the website or API will be uninterrupted, error-free, permanently available, or
              that decoded data from untrusted third parties will be free from corruption or security risks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, the operators of Base64 Toolkit shall not be liable for any indirect, incidental, special, consequential, or punitive damages—including data loss, lost profits, or business interruption—arising from your use of or inability to use this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              6. Governing Law &amp; Contact
            </h2>
            <p>
              These terms are governed by the laws applicable in Pakistan.
            </p>
            <div className="p-4 rounded-xl bg-surface border border-border/80 font-mono text-xs space-y-1">
              <p>Operator: Abdul Samad (aka amorzephyr)</p>
              <p>Contact: <Link href="/contact" className="text-[#27440D] dark:text-[#BEF264] underline">Contact Support</Link></p>
              <p>Effective Date: October 28, 2026</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
