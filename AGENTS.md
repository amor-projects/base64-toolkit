# Base64 Toolkit — Project Guide and Agent Instructions

This file is the product brief and the working agreement for any human or AI agent contributing to this repository. Read it before making architectural, product, content, or design decisions. When instructions conflict, prioritize user safety, technical correctness, accessibility, and current official platform requirements.

## 1. Project overview

### Product vision
Build a polished, privacy-first Base64 utility website for developers and everyday users. The site should be useful as a real product first and an SEO/advertising business second—not a collection of thin pages designed only to rank.

**Core promise:** Encode, decode, inspect, and convert text or files with a fast, straightforward workflow. Process user content in the browser whenever the feature permits, and make accurate, specific privacy claims only when the implementation supports them.

### Business objective
Launch a focused tool website that can earn organic search traffic and may later monetize through Google AdSense. The initial goal is to publish a useful, technically sound product, measure real search performance, and improve the pages that gain traction.

Traffic, rankings, AdSense approval, and meaningful income within three months are goals—not guarantees. Do not build plans or copy that imply these outcomes are assured.

### Target users
- Developers who need to encode/decode data while working.
- People converting images/files to Base64 or turning Base64 back into downloadable files.
- Users who need Base64URL, Data URI, or encoding diagnostics.
- Users who value a quick tool without an account or server upload.

### Product principles
1. **Utility first:** the tool is the primary content on tool pages.
2. **Privacy by architecture:** avoid uploading user inputs/files to a server for conversion.
3. **Correctness over cleverness:** handle UTF-8, binary data, padding, malformed input, and large-file limitations explicitly.
4. **Speed and clarity:** minimize steps between open, convert, copy/download, and leave.
5. **Original content:** publish technically correct explanations, tested examples, and troubleshooting guidance—not keyword-stuffed filler.
6. **Focused scope:** own the Base64 workflow before adding unrelated tools.
7. **Honest UX:** no fabricated detection results, exaggerated security claims, fake testimonials, or misleading buttons.

## 2. Initial scope

Ship a coherent first release rather than dozens of half-finished tools.

### Priority 0 — required for launch
- Responsive homepage with a useful Base64 encoder available immediately or one clear click away.
- Text Base64 encoder.
- Text Base64 decoder.
- File-to-Base64 conversion.
- Base64-to-file conversion.
- Image-to-Base64 conversion with Raw Base64 and Data URI output.
- Base64URL encode/decode support.
- Copy, download, clear/reset, useful loading/progress/error states.
- Accurate byte/character/estimated output-size information where it can be calculated reliably.
- Navigation, footer, 404 page, metadata, sitemap, robots directives, canonical URLs, favicon, and social metadata.
- About, Contact, Privacy, and Terms pages before the AdSense application.
- Automated tests for encoding/decoding edge cases and core workflows.

### Priority 1 — useful additions when the core is stable
- Data URI generator.
- Base64 validator/inspector.
- Base64-to-image preview and download.
- MIME type display with a clear explanation when the type is inferred rather than verified.
- Copy as HTML `<img>` or CSS `url(...)` for image Data URIs.
- Base64 size calculator.
- Drag-and-drop upload and keyboard-accessible file selection.
- Web Worker processing for sufficiently large inputs where it improves responsiveness.

### Not in V1
- User accounts, payments, database, upload storage, or a custom backend for conversion.
- A general-purpose directory of unrelated utilities.
- Hundreds of generated landing pages or articles.
- WebAssembly unless performance measurements demonstrate a real need.
- Ads before the core tool and page experience are complete.

## 3. Proposed URL and content architecture

Use stable, human-readable routes. Avoid publishing near-duplicate pages that differ only by wording.

### Tool routes
- `/` — homepage and tool directory; make the primary encoder prominent.
- `/base64-encoder` — flagship text encoder and links to file/image workflows.
- `/base64-decoder` — decoder.
- `/file-to-base64` — file encoder.
- `/base64-to-file` — decoded-file download workflow.
- `/image-to-base64` — image encoder with Raw Base64/Data URI options.
- `/base64-to-image` — decode, preview where safe, and download image data.
- `/base64url-encoder` — URL-safe Base64 encoder.
- `/base64url-decoder` — URL-safe Base64 decoder.
- `/data-uri-generator` — build a Data URI from a file or supplied Base64 data.
- `/base64-inspector` — validate/inspect a string and explain what can and cannot be inferred.
- `/base64-size-calculator` — estimate encoding overhead and output length.

Routes may be consolidated if two pages would provide substantially the same user experience and content. Do not create a route merely to target a keyword.

### Educational content to develop gradually
1. `/learn/what-is-base64`
2. `/learn/base64-vs-base64url`
3. `/learn/base64-padding`
4. `/learn/base64-file-size`
5. `/learn/base64-data-uri`
6. `/learn/convert-image-to-base64`
7. `/learn/convert-base64-to-image`
8. `/learn/base64-in-html`
9. `/learn/base64-in-css`
10. `/learn/base64-in-json-and-apis`

Each guide must solve a real user problem with accurate explanations, working examples, tested code, limitations, and links to the relevant tool. Do not force a target word count. Do not publish every topic just to make the site look larger.

### Trust/legal routes
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- Add a cookie/consent explanation or policy where required by the actual technologies, regions served, and applicable policies.

## 4. Recommended technical stack

Prefer a small, maintainable stack. Check official documentation and package compatibility at implementation time instead of assuming version numbers remain current.

- **Framework:** latest stable Next.js App Router release compatible with the project dependencies.
- **Language:** TypeScript with strict checks enabled.
- **UI:** React.
- **Styling:** Tailwind CSS.
- **Components:** shadcn/ui selectively; do not add a component dependency for trivial elements.
- **Icons:** Lucide.
- **Typography:** Geist/Geist Mono or a similarly legible sans-serif + monospace pairing.
- **Content:** MDX or typed local content modules for editorial pages; choose the simplest maintainable option.
- **Hosting:** Vercel is the default deployment option, but keep the application deployable elsewhere unless a platform-specific feature is justified.
- **Analytics:** Google Search Console; add GA4 only with appropriate privacy disclosures and consent handling where applicable.
- **Database/auth/storage:** none for V1.
- **Conversion processing:** browser-native APIs and TypeScript; Web Workers where useful.
- **Testing:** a unit-test runner for encoding logic plus browser-level tests for main user journeys.

### Architecture rules
- Prefer Server Components for page structure, metadata, and static editorial content.
- Isolate interaction, state, and browser APIs in small Client Components.
- Do not mark an entire route as a Client Component just because the tool needs interactivity.
- Keep conversion logic independent of React so it can be unit-tested.
- Keep metadata available in the initial HTML response.
- Do not create API routes or server infrastructure for conversions that can be done locally.
- Keep dependencies lean and explain any new runtime dependency in the change summary.

### Suggested repository layout

```text
app/
  layout.tsx
  page.tsx
  base64-encoder/page.tsx
  base64-decoder/page.tsx
  file-to-base64/page.tsx
  base64-to-file/page.tsx
  image-to-base64/page.tsx
  base64-to-image/page.tsx
  base64url-encoder/page.tsx
  base64url-decoder/page.tsx
  data-uri-generator/page.tsx
  base64-inspector/page.tsx
  base64-size-calculator/page.tsx
  learn/[slug]/page.tsx       # only if using a central MDX/content system
  about/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  sitemap.ts
  robots.ts
components/
  tools/
  navigation/
  content/
  ads/
  ui/
lib/
  base64/
    encode.ts
    decode.ts
    base64url.ts
    data-uri.ts
    file.ts
    inspect.ts
  seo/
  utils/
content/
  learn/                     # if using MDX
public/
```

Adapt this structure to the selected Next.js conventions; the layout is a guide, not a requirement to create empty files for every future page.

## 5. Functional correctness and safety requirements

Base64 is an encoding, **not encryption**. Never describe encoded output as secret or secure simply because it is Base64.

### Encoding/decoding
- Correctly support UTF-8 text; do not pass arbitrary Unicode strings directly to `btoa()`.
- Separate text encoding from arbitrary binary/file encoding.
- Support standard Base64 and Base64URL as distinct modes. Base64URL uses `-` and `_` in place of `+` and `/`; padding behavior must be explicit and consistent.
- Define how whitespace is treated by the decoder. Prefer a clear user-facing choice or a documented, predictable normalization rule.
- Validate invalid characters, impossible lengths, and malformed padding; show a useful error instead of silently corrupting data.
- Test empty inputs, ASCII, multi-byte UTF-8, emoji, zero-byte/binary data, all relevant padding cases, malformed inputs, and encode/decode round trips.
- Do not claim that a Base64 string's original filename, exact MIME type, or original file metadata can always be recovered. Explain when information is missing or only inferred.

### Files and browser memory
- Process file content locally by default; do not upload input data to a server.
- Set a configurable file-size limit based on actual browser memory/performance tests. State the limit in the UI before conversion.
- Base64 output is approximately one-third larger than the binary input, before any Data URI prefix. Explain this as an estimate where appropriate.
- For large files, avoid freezing the main UI. Use a Web Worker or other measured approach where appropriate, and show progress/cancel behavior if the implementation supports it.
- Do not promise unlimited file sizes or streaming support unless truly implemented and tested.
- Treat decoded content as untrusted. Never execute decoded content, inject it as HTML, or render arbitrary decoded SVG/HTML directly without a deliberate sanitization/security design.
- Sanitize suggested download filenames; do not trust user-provided MIME labels or file extensions as proof of content type.
- Revoke object URLs when they are no longer needed.
- Clear large in-memory values when the user resets or leaves the workflow where practical.

### Privacy claims
- Do not say “files never leave your device” unless network inspection and code review support that claim for the relevant workflow.
- If analytics, advertising, or third-party scripts are added, document what they collect and ensure they do not receive tool input/output data.
- Never log, track, or send user-provided encoded/decoded text or file bytes to analytics.

## 6. Visual design and UX

### Master UI Direction — Premium, Elegant, Fluid Developer Experience
The product should feel like a beautiful application that happens to be an exceptionally useful Base64 toolkit—not a basic utility website decorated to look attractive. It blends Apple-like restraint, clarity, and precision typography with the warmth, softness, and fluid microinteractions of modern developer tools (such as Linear and Raycast).

### Visual tokens
- **Primary background:** Warm off-white `#FAFAF8` (Dark: `#0E0E10`)
- **Main surfaces:** Pure white `#FFFFFF` (Dark: `#161618`)
- **Primary text:** Deep charcoal `#171717` (Dark: `#F4F4F5`)
- **Secondary / muted text:** Balanced neutral gray `#737373` (Dark: `#A1A1AA`)
- **Borders:** Subtle stone gray `#E7E5E4` (Dark: `#27272A`)
- **Primary accent:** Restrained indigo `#6259E8`, hover `#5348DE` (Dark: `#756EF0`)
- **Success:** Muted emerald `#15803D` (Dark: `#22C55E`)
- **Error:** Balanced crimson `#DC2626` (Dark: `#EF4444`)
- **Code / input surfaces:** Refined soft gray `#F6F6F4` (Dark: `#1A1A1E`)
- **Elevation / Shadows:** Whisper-soft multi-layered shadows (`0 1px 2px rgba(0,0,0,0.03), 0 6px 20px rgba(0,0,0,0.02)`); avoid heavy muddy drop shadows.

### Shape language and radii
- **Small controls and badges:** 8–10px (`rounded-lg` / `rounded-xl`)
- **Buttons and inputs:** 10–14px (`rounded-xl` / `rounded-2xl`)
- **Cards and secondary surfaces:** 16–22px (`rounded-2xl`)
- **Major tool containers:** 20–26px (`rounded-3xl`)
- **Tactile feedback:** Subtle border highlights, soft inner glow, and smooth focus rings (`focus-visible:ring-2 focus-visible:ring-[#6259E8]/30 focus-visible:border-[#6259E8]`).

### Motion and fluid interaction principles
- **Fluid, not animated for animation's sake:** Microinteractions must communicate state, establish visual continuity, and feel effortless.
- **Timing & Easing:** Microinteractions in 120–220ms; larger view transitions in 180–300ms. Use natural fluid easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Physicality:** Subtle press transitions (`active:scale-[0.985]`), smooth tab transitions, and calm state shifts without layout shifts.
- **Accessibility:** Full compliance with `prefers-reduced-motion`. All animations must degrade gracefully to instantaneous state changes.

### UX principles
- The primary tool is immediately accessible on desktop and mobile viewports without wading through marketing clutter.
- Provide Text / File / Image workflows as clear segmented controls.
- Distinct input, output, options, and actions regions with clear visual separation.
- Clear empty states with helpful microcopy, intuitive error feedback, and tactile copy/download actions.
- Drag-and-drop file upload with natural drag-over response.
- Prevent horizontal scroll/overflow on long Base64 strings using smart wrapping and monospace layout.
- Strictly no fake buttons or links; unreleased features must be visibly marked or disabled.

### Flagship encoder page order
1. H1 and a concise, accurate explanation.
2. Functional encoder UI.
3. Brief privacy/processing statement matching the actual implementation.
4. Supported modes and key features.
5. A tested input/output example.
6. Useful explanation of Base64, padding, file-size overhead, or UTF-8 edge cases.
7. Common errors/troubleshooting.
8. Relevant related tools and educational guides.
9. FAQ only where it answers genuine questions.

## 7. Content standards

Content must be useful even if the visitor never clicks another page. A tool page may be the main content, but it still needs to explain its behavior, limitations, supported inputs, and likely use cases clearly.

### Editorial requirements
- Write for users first, using plain but technically accurate language.
- Test all code examples and outputs before publishing.
- Prefer original worked examples, comparison tables, diagrams, small interactive demonstrations, and troubleshooting notes over generic filler.
- Explain limitations and edge cases, including where Base64 is inappropriate (for example, very large inline images or secrets that require encryption).
- Keep claims about browser support, MIME types, privacy, performance, and security evidence-based.
- Avoid paraphrasing other tool sites and avoid mass-producing pages with the same text and only a keyword swapped.
- Do not add filler to reach a word count. Do not invent authors, qualifications, customer quotes, reviews, or first-hand tests.
- Cite authoritative references where useful, especially standards and browser behavior. Link to a tool only when it helps the reader complete the task.
- Keep content maintained when implementation details change.

### Minimum useful documentation for initial release
Prioritize several genuinely complete guides over publishing all ten immediately:
- What Is Base64?
- Base64 vs Base64URL
- How Base64 Padding Works
- Base64 File-Size Overhead
- Base64 Data URIs and Image Embedding

Each guide should have a clear purpose, an original explanation, working examples, limitations/common mistakes, and internal links to the relevant tool.

## 8. SEO requirements

SEO should help search engines understand useful pages; it must not dictate the creation of thin pages.

- Give every indexable route a unique, accurate title and meta description.
- Use one clear H1 and meaningful heading hierarchy.
- Use canonical URLs and stable route naming.
- Generate a sitemap containing only canonical, indexable pages; keep utility/internal routes out if they should not be indexed.
- Configure `robots.txt` deliberately; do not accidentally block CSS/JS needed to render the site.
- Add descriptive internal links between closely related tools and guides.
- Provide useful Open Graph metadata and a consistent social preview.
- Add structured data only when it accurately describes visible page content. Consider `WebApplication`/`SoftwareApplication` and breadcrumbs only where appropriate; validate against current official documentation. Never fabricate ratings or reviews.
- Verify the production domain in Google Search Console and submit the sitemap after deployment.
- Monitor indexing, impressions, clicks, queries, and page-level performance. Treat third-party keyword-volume/KD metrics as estimates, not guarantees.
- Review the real search results and AI-generated search features before investing heavily in a keyword. Prioritize queries where people need to upload, transform, inspect, preview, or download data rather than just read a definition.
- Do not promise rankings or a fixed time to traffic.

## 9. AdSense readiness and advertising rules

AdSense approval is a review decision, not a checklist guarantee. Recheck current official program policies immediately before applying because policies can change.

Before applying:
- The site must be fully functional on desktop and mobile.
- Every published route should have a clear purpose and complete content; remove placeholders, broken links, empty pages, and unfinished UI.
- Publish original, useful content and ensure navigation is clear.
- Include About, Contact, Privacy, and Terms pages; ensure contact details and privacy statements are truthful.
- Check ownership/site verification requirements and all current AdSense/Publisher policies.
- Configure required consent management for applicable visitors/regions and advertising integrations.
- Confirm ads/analytics never collect or expose tool input/output data.

Ad placement principles:
- Do not place ads inside the main converter controls or make ads resemble buttons, downloads, navigation, or tool outputs.
- Do not use accidental-click layouts, pop-ups that interfere with navigation, or pages built primarily to display ads.
- Keep the tool useful and visible. Ads should not dominate the page or block task completion.
- Do not ship placeholder ad units in development as if they were live inventory. Keep ad integration isolated and disabled until the site is approved/configured.

Reference the official policies in Section 12 before an application or material ad-layout change.

## 10. Analytics, measurement, and business expectations

Use Google Search Console as the primary SEO measurement system. GA4 is optional and should be added only with appropriate disclosures/consent for the implementation and jurisdictions involved.

Track aggregate product events only when useful, such as tool mode selected, conversion completed, error category, and copy/download action. Do not record actual strings, Base64 payloads, filenames, file contents, or decoded output. Ensure measurement is privacy-preserving and disclosed.

Primary early indicators:
- Tool routes work correctly and have no high-severity bugs.
- Pages are crawlable, indexed, and receive impressions.
- Search queries reveal relevant long-tail demand.
- Users complete the tool workflows without errors or confusing friction.
- Returning visitors and external references begin to appear.

A three-month launch-to-income target is aspirational. Do not use speculative ad-revenue estimates as project facts. Monetization depends on traffic, user geography, advertiser demand, ad experience, and approval.

## 11. Suggested implementation sequence

### Phase 1 — foundation
- Create the Next.js App Router project with strict TypeScript and linting.
- Establish design tokens, header/footer, page layout, typography, and responsive shell.
- Add metadata defaults, sitemap, robots, 404, and basic accessibility.

### Phase 2 — conversion engine
- Implement pure encode/decode functions with tests.
- Handle UTF-8 and binary bytes correctly.
- Add explicit Base64URL handling and validation.
- Test error states and known test vectors.

### Phase 3 — flagship tool
- Build `/base64-encoder` and its responsive interactive UI.
- Add copy, clear, download, length/size feedback, and keyboard support.
- Verify the initial HTML includes the page heading and explanatory content.

### Phase 4 — files and related tools
- Add file-to-Base64, Base64-to-file, image/Data URI workflow, and decoder.
- Add limits and responsive processing. Test large-input behavior on realistic devices.
- Consider inspector and size calculator only after core workflows are stable.

### Phase 5 — content and SEO
- Publish complete About/Contact/Privacy/Terms pages.
- Publish the first few best educational guides with tested examples.
- Add route-specific metadata, canonical URLs, internal links, sitemap, and appropriate structured data.
- Run mobile, accessibility, performance, and technical SEO checks.

### Phase 6 — launch and monetization readiness
- Deploy to a real domain with HTTPS.
- Test all workflows in production.
- Set up Search Console and submit sitemap.
- Check privacy/consent/analytics and current AdSense policies.
- Apply for AdSense only when the product and published content are genuinely complete.

### Phase 7 — iterate
- Use Search Console data and actual user feedback to decide what to improve.
- Improve pages that receive impressions but underperform.
- Add routes only when the workflow is meaningfully distinct and there is clear user/search demand.

## 12. Official references to re-check

Use these sources as a starting point; verify they are still current before a significant technical or monetization decision.

- Next.js App Router: https://nextjs.org/docs/app
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Metadata and Open Graph: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Google Search people-first content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AdSense eligibility: https://support.google.com/adsense/answer/9724
- AdSense site readiness: https://support.google.com/adsense/answer/7299563
- AdSense program policies: https://support.google.com/adsense/answer/48182
- AdSense policies guide: https://support.google.com/adsense/answer/23921

## 13. Instructions for coding agents

When working in this repository:

1. **Read this file first.** Preserve the project direction and scope.
2. **Inspect before editing.** Review existing files, dependencies, scripts, and current conventions before proposing a new structure.
3. **Make focused changes.** Do not rewrite the project or add dependencies unnecessarily.
4. **Keep code correct and testable.** Place encoding logic in pure functions and add/update tests for edge cases.
5. **Protect user data.** Never send tool input/output or file bytes to a server, log, analytics service, or third-party API unless a future product decision explicitly authorizes it and the user-facing privacy/security model is revised accordingly.
6. **Do not fabricate product features.** If a UI control is visible, it must work. If a feature is not implemented, don't claim it is.
7. **Preserve truthful copy.** Privacy, file limits, supported encodings, browser compatibility, and MIME detection statements must match the code.
8. **Maintain accessibility.** Labels, keyboard interaction, focus indicators, reduced-motion support, and sensible error announcements are not optional polish.
9. **Maintain SEO rendering.** Keep metadata and the main editorial content server-rendered where possible. Avoid relying on client-side JavaScript alone to produce essential page content.
10. **Follow current official docs.** Check current APIs rather than relying on memory when versions or platform rules may have changed.
11. **Run relevant checks** after changes (lint, type check, unit tests, and build where available). Report any check that could not be run.
12. **Summarize changes honestly.** State what changed, what was tested, known limitations, and any next step. Never claim a check passed if it was not executed.
13. **Do not add SEO filler or fake trust signals.** No keyword stuffing, fabricated testimonials, pretend authors, fake reviews, empty FAQ pages, or mass-produced near-duplicate routes.
14. **Do not add advertising until requested and the site is properly configured.** Keep ad components isolated and avoid deceptive placements.

## 14. Definition of done

A feature is done only when:
- It performs the advertised operation correctly for valid inputs.
- Invalid inputs and file limits produce clear, recoverable messages.
- The layout works on mobile and desktop and is keyboard-accessible.
- No user payload is exposed to a server or analytics unintentionally.
- Relevant automated tests pass, or the reason they could not run is documented.
- The page has accurate visible copy and metadata.
- Related links, empty states, loading states, and reset behavior are complete.
- The implementation does not introduce unrelated scope or unsupported claims.
