import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://base64toolkit.com";

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/base64-encoder`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/base64-decoder`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/file-to-base64`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/base64-to-file`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/image-to-base64`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/base64-to-image`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/base64-inspector`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/base64-size-calculator`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/data-uri-generator`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/base64url-encoder`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/base64url-decoder`,
      lastModified: "2026-10-16",
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
