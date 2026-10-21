import type { Metadata } from "next";

/**
 * Base64 Toolkit — Centralized SEO & Domain Configuration
 *
 * Deployment Instructions:
 * Configure `NEXT_PUBLIC_SITE_URL` in your hosting environment (e.g. Vercel, Cloudflare, Docker).
 * Example: NEXT_PUBLIC_SITE_URL="https://yourcustomdomain.com"
 * If not specified, it falls back to the current production deployment
 * "https://best-base64-toolkit.vercel.app".
 */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://best-base64-toolkit.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Base64 Toolkit";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/og-image.png`;
export const SOCIAL_IMAGE_ALT =
  "Base64 Toolkit — fast, private in-browser tools for encoding, decoding, and converting Base64";

/**
 * Resolves an absolute URL based on the single configurable site origin.
 */
export function absoluteUrl(path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export interface RouteMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

/**
 * Helper to build consistent, fully-formed Next.js Metadata with canonical URLs,
 * OpenGraph, and Twitter tags without duplication.
 */
export function buildRouteMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  noIndex = false,
}: RouteMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: DEFAULT_TWITTER_IMAGE, alt: SOCIAL_IMAGE_ALT }],
    },
  };
}

/**
 * Schema.org WebApplication structured data generator compliant with Google documentation:
 * https://developers.google.com/search/docs/appearance/structured-data/software-app
 *
 * Does NOT emit fabricated reviews, ratings, or misleading price claims.
 */
export function generateWebApplicationSchema({
  name,
  description,
  path,
  applicationCategory = "DeveloperApplication",
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: "DeveloperApplication" | "UtilitiesApplication";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory,
    operatingSystem: "Any (Modern Web Browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
  };
}

/**
 * Schema.org Article structured data generator for educational guides:
 * https://developers.google.com/search/docs/appearance/structured-data/article
 */
export function generateArticleSchema({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    ...(datePublished ? { datePublished } : {}),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Schema.org BreadcrumbList structured data generator:
 * https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
export function generateBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
