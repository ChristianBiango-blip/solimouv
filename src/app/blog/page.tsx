import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { blogArticles } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog | Solimouv'",
  description:
    "Découvrez les actus Solimouv', nos articles sur le sport inclusif et les informations utiles autour du festival.",
};

export default function BlogPage() {
  const [featuredArticle, ...otherArticles] = blogArticles;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ece8ff_0%,#fff3f8_35%,#fff9ef_65%,#ffffff_100%)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="overflow-hidden rounded-[2.8rem] bg-[linear-gradient(135deg,#18004f_0%,#4200fe_48%,#f238a7_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(66,0,254,0.22)] sm:px-8 sm:py-10 lg:px-10">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                Blog Solimouv&apos;
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                Découvrir nos actus
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
                Le festival, l&apos;inclusion, les formats accessibles et les moments qui donnent envie de se retrouver.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                En ce moment
              </p>
              <p className="mt-3 text-2xl font-black tracking-[-0.05em]">
                {blogArticles.length} articles pour préparer la visite et prolonger l&apos;expérience Solimouv&apos;.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <article className="overflow-hidden rounded-[2.2rem] border border-white/70 bg-white shadow-[0_18px_60px_rgba(17,24,39,0.08)]">
            <Link href={`/blog/${featuredArticle.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.coverAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  priority
                  sizes="(min-width: 1024px) 760px, 100vw"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                  <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-brand-primary">
                    {featuredArticle.category}
                  </span>
                  <span className="text-gray-400">
                    {featuredArticle.readTime} de lecture
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-gray-950 sm:text-4xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                  {featuredArticle.excerpt}
                </p>
                <span className="mt-6 inline-flex rounded-full bg-[#231f20] px-4 py-2 text-sm font-semibold text-white">
                  Lire l&apos;article
                </span>
              </div>
            </Link>
          </article>

          <div className="grid gap-6">
            {otherArticles.map((article) => (
              <article
                key={article.slug}
                className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_18px_60px_rgba(17,24,39,0.08)]"
              >
                <Link href={`/blog/${article.slug}`} className="grid h-full sm:grid-cols-[180px_minmax(0,1fr)]">
                  <div className="relative min-h-[220px] sm:min-h-full">
                    <Image
                      src={article.coverImage}
                      alt={article.coverAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 180px, 100vw"
                    />
                  </div>
                  <div className="flex flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                      <span className="rounded-full bg-[#fff3fa] px-3 py-1 text-[#b81f7b]">
                        {article.category}
                      </span>
                      <span className="text-gray-400">
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-black tracking-[-0.05em] text-gray-950">
                      {article.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 sm:text-base">
                      {article.excerpt}
                    </p>
                    <span className="mt-5 text-sm font-semibold text-brand-primary">
                      Voir plus →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
