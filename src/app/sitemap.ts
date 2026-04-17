import type { MetadataRoute } from "next";
import { blogArticles } from "@/content/blog";
import { siteOrigin, toAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: siteOrigin,
      lastModified: "2026-04-17",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${siteOrigin}/blog`,
      lastModified: "2026-04-17",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteOrigin}/a-propos`,
      lastModified: "2026-04-17",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteOrigin}/atelier`,
      lastModified: "2026-04-17",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteOrigin}/dons`,
      lastModified: "2026-04-17",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteOrigin}/contact`,
      lastModified: "2026-04-17",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  const articlePages = blogArticles.map((article) => ({
    url: `${siteOrigin}/blog/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    images: [toAbsoluteUrl(article.coverImage)],
  }));

  return [...staticPages, ...articlePages];
}
