import type { MetadataRoute } from "next";
import { EDUCATIONAL_GUIDES } from "@/lib/content/guides";
import { SITE_URL } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const today = "2026-10-16";

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/base64-encoder`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/base64-decoder`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/file-to-base64`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/base64-to-file`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/image-to-base64`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/base64-to-image`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/base64url-encoder`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/base64url-decoder`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/data-uri-generator`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/base64-inspector`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/base64-size-calculator`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const guideRoutes: MetadataRoute.Sitemap = EDUCATIONAL_GUIDES.map((guide) => ({
    url: `${baseUrl}/learn/${guide.slug}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const trustRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...coreRoutes, ...guideRoutes, ...trustRoutes];
}
