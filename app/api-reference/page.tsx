import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/content/CodeBlock";
import { CodeIcon, ShieldCheckIcon, WarningIcon } from "@/components/ui/Icons";
import { buildRouteMetadata, generateBreadcrumbSchema } from "@/lib/seo/site";

export const metadata: Metadata = buildRouteMetadata({
  title: "Base64 Encode and Decode API — GET Endpoints",
  description:
    "Use simple Base64 GET API endpoints for text encoding and decoding with validation, rate-limit headers, and a clear no-storage policy.",
  path: "/api-reference",
});

const encodeEndpoint = "/api/v1/base64/encode";
const decodeEndpoint = "/api/v1/base64/decode";
const exampleText = "https://example.com/docs?q=base64-1";
const exampleRequest = `${encodeEndpoint}?text=${encodeURIComponent(exampleText)}&format=base64url`;
const curlExample = `curl "${exampleRequest}"`;
const javascriptExample = `const text = "${exampleText}";
const response = await fetch(
  "${encodeEndpoint}?text=" + encodeURIComponent(text) + "&format=base64url"
);
const result = await response.json();
console.log(result.data.encoded);`;
const jsonExample = `{
  "success": true,
  "data": {
    "encoded": "aHR0cHM6Ly9leGFtcGxlLmNvbS9kb2NzP3E9YmFzZTY0LTE",
    "format": "base64url",
    "padding": "omit",
    "inputCharacters": 35,
    "inputBytes": 35,
    "encodedCharacters": 47
  }
}`;
const encodeExample = `curl "${encodeEndpoint}?text=Hello%20World&format=base64url"`;
const decodeExample = `curl "${decodeEndpoint}?value=SGVsbG8gV29ybGQ=&format=base64"`;

export default function ApiReferencePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "API Reference", path: "/api-reference" },
  ]);

  return (
    <main className="flex-1 flex flex-col items-center py-10 sm:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#84CC16]/10 text-[#27440D] dark:text-[#BEF264] border border-[#84CC16]/25 mb-4 shadow-whisper">
            <CodeIcon size={14} />
            <span>Developer API · v1</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Base64 Encode and Decode API
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            Simple, copy-ready GET endpoints for encoding UTF-8 text and decoding Base64 back into
            text. URL values work as ordinary text inputs—no separate URL endpoint is needed.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-surface border border-border/80 shadow-tool space-y-5">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-muted font-mono">
              Quick start
            </span>
            <code className="block overflow-x-auto whitespace-nowrap rounded-2xl bg-code-surface-subtle border border-border/80 px-4 py-4 text-sm text-foreground font-mono">
              GET {encodeEndpoint}?text=YOUR_TEXT&amp;format=base64url
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted">
            <div className="rounded-2xl border border-border/70 bg-background p-4">
              <strong className="block text-foreground mb-1">text</strong>
              Required for encoding. Percent-encode the query value; ordinary URLs can be passed as text.
            </div>
            <div className="rounded-2xl border border-border/70 bg-background p-4">
              <strong className="block text-foreground mb-1">format</strong>
              Use <code>base64</code> or <code>base64url</code>. Base64URL omits padding by default.
            </div>
            <div className="rounded-2xl border border-border/70 bg-background p-4">
              <strong className="block text-foreground mb-1">limits</strong>
              8,192 text characters, 16 KiB UTF-8, and 60 requests per minute per client.
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Available endpoints</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Both endpoints are read-only GET requests. Inputs are processed in memory and capped
              before encoding or decoding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <code className="text-sm font-semibold text-foreground">GET {encodeEndpoint}</code>
              <p className="text-xs text-muted leading-relaxed">
                Encode UTF-8 text as standard Base64 or Base64URL. Use <code>padding=include</code> or <code>omit</code> when needed.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-3">
              <code className="text-sm font-semibold text-foreground">GET {decodeEndpoint}</code>
              <p className="text-xs text-muted leading-relaxed">
                Decode Base64 into UTF-8 text with strict character, length, padding, and UTF-8 validation.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CodeBlock code={encodeExample} language="bash" title="Encode text · cURL" />
            <CodeBlock code={decodeExample} language="bash" title="Decode text · cURL" />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Try it with cURL</h2>
            <CodeBlock code={curlExample} language="bash" title="Request · cURL" />
            <p className="text-xs text-muted leading-relaxed">
              Always percent-encode text and Base64 query values. This keeps spaces, <code>+</code>, <code>/</code>, and <code>=</code> intact.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border/80 shadow-whisper space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Browser JavaScript</h2>
            <CodeBlock code={javascriptExample} language="javascript" title="Request · fetch()" />
            <p className="text-xs text-muted leading-relaxed">
              Cross-origin GET requests are supported with read-only CORS headers.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Response shape</h2>
          <CodeBlock code={jsonExample} language="json" title="200 OK · application/json" />
          <p className="text-sm text-muted leading-relaxed">
            Error responses use <code>success: false</code> and a stable error code. Rate-limit
            details are returned as <code>X-RateLimit-*</code> headers rather than response-body metadata.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#84CC16]/10 dark:bg-[#BEF264]/10 border border-[#84CC16]/25 space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <ShieldCheckIcon size={17} />
              <span>What the API stores</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              The application processes submitted values in memory and does not save them to a
              database, file, analytics event, or application log. Rate limiting keeps only a
              temporary client identifier and counter—not the input or result.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 space-y-3">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <WarningIcon size={17} />
              <span>Keep GET inputs non-sensitive</span>
            </div>
            <p className="text-xs leading-relaxed">
              Query strings can appear in browser history, networks, CDNs, or hosting-provider logs.
              Do not send passwords, private tokens, or confidential data. Base64 is encoding, not encryption.
            </p>
          </div>
        </section>

        <p className="text-center text-xs text-muted">
          See the full data-handling details in our <Link href="/privacy" className="underline underline-offset-2 text-foreground">Privacy Policy</Link> and usage conditions in our <Link href="/terms" className="underline underline-offset-2 text-foreground">Terms of Service</Link>.
        </p>
      </div>
    </main>
  );
}
