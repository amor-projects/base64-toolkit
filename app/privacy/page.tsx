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
    "Read how Base64 Toolkit handles tool inputs, browser storage, hosting logs, and future third-party integrations while conversions run locally in the browser.",
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
            When you use a browser tool, conversion is handled directly by your browser&apos;s
            JavaScript engine. Those tool inputs, files, and outputs are <strong>not uploaded to a
            conversion backend or stored by this application</strong>. The optional Base64 API
            endpoints are different: they must receive query values to produce JSON responses, as explained below.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-muted leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              1. Browser Tool Inputs &amp; Outputs
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
              All browser-tool processing executes locally in active browser memory and is discarded when you clear the input, reload the tab, or close your browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              2. Base64 API Endpoints
            </h2>
            <p>
              The optional <strong>GET /api/v1/base64/encode</strong> and <strong>GET /api/v1/base64/decode</strong>
              endpoints are server features for developers who want JSON output. Clients send text
              or Base64 values through query parameters. The application processes values in memory and does not save inputs,
              decoded output, encoded results, or responses in an application database, file,
              analytics event, or application log.
            </p>
            <p>
              The API keeps a temporary in-memory rate-limit counter keyed by a client network
              identifier. It does not put submitted values or results in that counter. Inputs are
              bounded before processing, malformed Base64 is rejected, and decoded output is returned
              only as JSON. The limiter is bounded and expires entries, but its behavior can vary
              between hosting instances.
            </p>
            <p className="text-foreground/90">
              Because this is a GET request, the full request URL may be visible in browser history,
              intermediary, CDN, or hosting-provider logs. We cannot control those third-party
              retention practices. Do not send passwords, private tokens, confidential URLs, or other
              secrets to this endpoint. Base64 is not encryption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              3. Browser Storage &amp; Cookies
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
              4. Web Hosting &amp; Server Access Logs
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
              These server logs are used by hosting infrastructure for security monitoring, DDoS
              mitigation, and uptime. Browser-tool inputs are not sent to the server, but an API
              request&apos;s query string may contain the URL that you chose to submit. Review the API
              disclosure above before using it with sensitive data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              5. Advertising &amp; Third-Party Integrations
            </h2>
            <div className="p-4 rounded-xl bg-surface dark:bg-[#161619] border border-border/80 shadow-whisper space-y-2">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
                <InfoIcon size={16} />
                <span>Planned Integrations Disclosure</span>
              </div>
              <p className="text-xs">
                No third-party advertising scripts, analytics tools, or behavioral tracking pixels are
                currently active on this website. If that changes, this policy will be updated before
                the new integration is deployed, including any required consent choices.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-foreground border-b border-border/60 pb-2">
              6. Operator Details &amp; Privacy Contact
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or data handling practices, please contact:
            </p>
            <div className="p-4 rounded-xl bg-surface border border-border/80 font-mono text-xs space-y-1">
              <p>Operator: Abdul Samad (aka amorzephyr)</p>
              <p>Email: <a href="mailto:amorzephyr@gmail.com" className="underline underline-offset-2">amorzephyr@gmail.com</a></p>
              <p>Jurisdiction: Pakistan (operator residence)</p>
              <p>Effective Date: October 28, 2026</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
