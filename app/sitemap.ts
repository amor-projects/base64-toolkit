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
  ];
}
