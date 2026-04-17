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
