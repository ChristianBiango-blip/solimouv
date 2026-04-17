import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import BlogArticleTemplate from "@/components/blog/BlogArticleTemplate";
import { blogArticles, getBlogArticle } from "@/content/blog";
import {
  getBlogPostingSchema,
  getFestivalEventSchema,
  getOrganizationSchema,
  siteName,
  siteOrigin,
  toAbsoluteUrl,
} from "@/lib/seo";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return {
      title: "Article introuvable | Solimouv'",
    };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteOrigin}/blog/${article.slug}`,
      title: `${article.title} | ${siteName}`,
      description: article.description,
      publishedTime: article.publishedAt,
      images: [
        {
          url: toAbsoluteUrl(article.coverImage),
          alt: article.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${siteName}`,
      description: article.description,
      images: [toAbsoluteUrl(article.coverImage)],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  const structuredData = [
    getOrganizationSchema(),
    getFestivalEventSchema(),
    getBlogPostingSchema(article),
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <BlogArticleTemplate article={article} />
      </main>
    </div>
  );
}
