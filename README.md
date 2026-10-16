# Base64 Toolkit

Base64 Toolkit is a privacy-first web utility for encoding, decoding, inspecting, and converting text, files, images, Base64URL values, and Data URIs. Conversion work runs in the browser; the application does not use an API route to receive tool inputs or file bytes.

The project is built with Next.js App Router, React, TypeScript, Tailwind CSS, and browser-native APIs. It is intentionally focused on useful Base64 workflows rather than a directory of unrelated utilities.

## Current scope

Implemented routes include:

- `/` — homepage and tool directory
- `/base64-encoder` and `/base64-decoder` — UTF-8-aware text conversion
- `/file-to-base64` and `/base64-to-file` — local file conversion and download
- `/image-to-base64` and `/base64-to-image` — image Base64/Data URI conversion and preview
- `/base64url-encoder` and `/base64url-decoder` — URL-safe RFC 4648 conversion
- `/data-uri-generator` — Data URI and HTML/CSS snippet generation
- `/base64-inspector` — validation, format diagnostics, and common file-signature detection
- `/base64-size-calculator` — encoded-size and overhead calculations
- `/learn` — technical guides covering Base64, Base64URL, padding, file size, and Data URIs
- `/about`, `/contact`, `/privacy`, and `/terms` — product and trust pages

The conversion engine includes UTF-8 handling, standard and URL-safe alphabets, padding modes, whitespace policy, malformed-input validation, byte-size metrics, Data URI parsing, filename sanitization, and a conservative 10 MB file-input limit.

## Getting started

Requirements:

- Node.js compatible with the installed Next.js version
- pnpm 12 or a compatible pnpm release

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

```bash
pnpm dev        # Start the development server
pnpm build      # Create a production build
pnpm start      # Serve the production build
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript without emitting files
pnpm test       # Run the Vitest test suite
```

Run the relevant checks before submitting changes. Browser-level coverage can be added with the installed Playwright dependency when end-to-end journeys need verification.

## Configuration

The canonical site URL defaults to `https://best-base64-toolkit.vercel.app`. Set `NEXT_PUBLIC_SITE_URL` in the deployment environment when using another domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

The value is used for canonical URLs, Open Graph metadata, structured data, sitemap URLs, and `robots.txt`.

## Project structure

```text
app/                  Next.js routes, metadata, sitemap, and robots.txt
components/           Shared UI, navigation, and interactive tool components
lib/base64/           Pure conversion, validation, file, and Data URI logic
lib/content/          Local educational guide content
lib/seo/              Canonical URL, metadata, and structured-data helpers
public/               Static assets
```

Conversion logic should remain independent of React so it can be tested without a browser. Interactive components should use client-side browser APIs only when needed; page structure, metadata, and editorial content should remain server-rendered.

## Privacy and safety model

- Text, file, and image conversions happen locally in the browser.
- User strings, file bytes, filenames, and decoded output must not be sent to analytics, third-party APIs, or a conversion backend.
- Base64 is an encoding, not encryption. The product must not describe encoded output as secret or secure.
- Decoded content is treated as untrusted. Do not execute or inject decoded HTML/SVG content without a deliberate sanitization design.
- File conversion has a default 10 MB limit to reduce browser memory and responsiveness problems.
- The privacy policy currently describes hosting access logs and the browser-local processing model.

## Owner and publication details

The current operator and contact details are:

- **Operator:** Abdul Samad, also known as `amorzephyr`
- **Residence/jurisdiction:** Pakistan
- **General contact:** [base64.toolkit@gmail.com](mailto:base64.toolkit@gmail.com)
- **Privacy contact:** [amorzephyr@gmail.com](mailto:amorzephyr@gmail.com)
- **Bug reports:** [GitHub Issues](https://github.com/amor-projects/base64-toolkit/issues)
- **Production URL:** [best-base64-toolkit.vercel.app](https://best-base64-toolkit.vercel.app/)

The effective date for the Privacy Policy and Terms still needs to be selected before those pages are treated as final.

The effective date is still pending on the [Privacy](app/privacy/page.tsx) and [Terms](app/terms/page.tsx) pages.

## Contribution expectations

Keep changes focused and preserve the product principles in [AGENTS.md](AGENTS.md): utility first, accurate technical behavior, truthful privacy claims, accessible interaction, no fabricated trust signals, and no SEO-only filler. Update tests and visible documentation when conversion behavior or supported workflows change.

## License and ownership

No public license has been selected yet. Add the intended license and copyright/ownership notice here before publishing the repository as open source.
