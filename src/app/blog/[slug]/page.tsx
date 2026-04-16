import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import BlogArticleTemplate from "@/components/blog/BlogArticleTemplate";
import { blogArticles, getBlogArticle } from "@/content/blog";

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
    title: `${article.title} | Solimouv'`,
    description: article.description,
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ece8ff_0%,#fff3f8_35%,#fff9ef_65%,#ffffff_100%)]">
      <Navbar />
      <main>
        <BlogArticleTemplate article={article} />
      </main>
    </div>
  );
}
