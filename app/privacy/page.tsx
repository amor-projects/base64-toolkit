import React from "react";
import type { Metadata } from "next";
import { ShieldCheckIcon, InfoIcon } from "@/components/ui/Icons";

import {
  buildRouteMetadata,
  generateBreadcrumbSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Privacy Policy — Base64 Toolkit",
  description:
    "Transparent privacy policy for Base64 Toolkit. Detailed disclosure of our in-browser architecture, zero server uploads, and data handling practices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
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
            <span>Data Protection &amp; Disclosures</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Privacy Policy
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-xl leading-relaxed font-normal">
            We believe privacy is an engineering requirement, not just legal text. Here is exactly
            how data flows when you use Base64 Toolkit.
          </p>
        </section>

        {/* Overview Banner */}
        <div className="p-6 rounded-2xl bg-[#84CC16]/8 dark:bg-[#BEF264]/8 border border-[#84CC16]/20 shadow-whisper space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#27440D] dark:text-[#BEF264] uppercase font-mono">
            <ShieldCheckIcon size={16} />
            <span>Architecture Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
            When you type text or select a file on this website, conversion is handled directly by
            your browser&apos;s JavaScript engine. Your inputs, files, and outputs are <strong>never uploaded, transmitted, or stored on our servers</strong>.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-muted leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              1. Information We Do Not Collect (Tool Inputs &amp; Outputs)
            </h2>
            <p>
              When using any converter or inspector tool (such as Base64 Encoder, File to Base64, or Base64 Inspector):
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90">
              <li>We do not transmit your input text, encoded strings, or decoded output to any server.</li>
              <li>We do not upload or store your images, documents, or files on any remote storage or database.</li>
              <li>We do not record, log, or analyze the contents of your payloads.</li>
            </ul>
            <p>
              All processing executes locally in active browser memory and is discarded when you clear the input, reload the tab, or close your browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              2. Browser Storage &amp; Cookies
            </h2>
            <p>
              This website does not currently use tracking cookies. We utilize standard client-side browser storage exclusively for user interface preferences:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90">
              <li>
                <strong className="text-foreground font-mono text-xs">localStorage (&apos;theme&apos;):</strong> Stores your choice of Light or Dark mode so your preference persists across page reloads.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              3. Web Hosting &amp; Server Access Logs
            </h2>
            <p>
              Like virtually all web services, our hosting provider automatically receives and logs basic technical network connection data whenever a web browser requests a page or asset:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-foreground/90">
              <li>Your device&apos;s IP address</li>
              <li>Browser type and version (User-Agent)</li>
              <li>Date, time, and requested URL route</li>
              <li>HTTP response status code</li>
            </ul>
            <p>
              These server logs are used strictly for security monitoring, DDoS mitigation, and ensuring server uptime. They do not contain any tool conversion inputs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              4. Advertising &amp; Third-Party Integrations
            </h2>
            <div className="p-4 rounded-xl bg-surface dark:bg-[#161619] border border-border/80 shadow-whisper space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <InfoIcon size={16} />
                <span>Planned Integrations Disclosure</span>
              </div>
              <p className="text-xs">
                [TODO: OWNER - If Google AdSense or GA4 is deployed in future releases, configure appropriate regional consent management (e.g. GDPR/CCPA consent banners) and document third-party advertising cookies here before going live.]
              </p>
              <p className="text-xs">
                Currently, no third-party advertising scripts or behavioral tracking pixels are active on this website.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              5. Operator Details &amp; Privacy Contact
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or data handling practices, please contact:
            </p>
            <div className="p-4 rounded-xl bg-surface border border-border/80 font-mono text-xs space-y-1">
              <p>Operator: Abdul Samad (aka amorzephyr)</p>
              <p>Email: <a href="mailto:amorzephyr@gmail.com" className="underline underline-offset-2">amorzephyr@gmail.com</a></p>
              <p>Jurisdiction: Pakistan (operator residence)</p>
              <p>Effective Date: [TODO: OWNER - Supply effective date, e.g. October 16, 2026]</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
