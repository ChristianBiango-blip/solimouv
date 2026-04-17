import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { blogArticles } from "@/content/blog";
import {
  getBlogCollectionSchema,
  getFestivalEventSchema,
  getOrganizationSchema,
  siteName,
  siteOrigin,
  toAbsoluteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Découvrez les actus Solimouv', nos articles sur le sport inclusif et les informations utiles autour du festival.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${siteOrigin}/blog`,
    title: `Blog | ${siteName}`,
    description:
      "Découvrez les actus Solimouv', nos articles sur le sport inclusif et les informations utiles autour du festival.",
    images: [
      {
        url: toAbsoluteUrl("/blog/event-1.jpeg"),
        alt: "Actualités Solimouv'",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteName}`,
    description:
      "Découvrez les actus Solimouv', nos articles sur le sport inclusif et les informations utiles autour du festival.",
    images: [toAbsoluteUrl("/blog/event-1.jpeg")],
  },
};

export default function BlogPage() {
  const structuredData = [
    getOrganizationSchema(),
    getFestivalEventSchema(),
    getBlogCollectionSchema(),
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f2ebff_0%,#fcfbf8_20%,#fdfcf9_52%,#ffffff_100%)]">
      <Navbar />

      <main
        id="main-content"
        className="mx-auto max-w-[1180px] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8"
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <section className="max-w-[38rem]" aria-labelledby="blog-page-title">
          <h1 className="text-[2.35rem] font-black leading-[0.94] tracking-[-0.07em] text-brand-primary sm:text-[3.35rem]">
            <span id="blog-page-title">Découvrir nos actus</span>
          </h1>
          <p className="mt-4 text-base leading-7 text-[#5d5760] sm:text-lg">
            Des articles conçus pour être lisibles, bien référencés et simples
            à parcourir sur mobile comme au clavier.
          </p>
        </section>

        <section
          className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3"
          aria-label="Liste des articles du blog"
        >
          {blogArticles.map((article, index) => (
            <article
              key={article.slug}
              className="rounded-[2rem] border border-[#e6dfd8] bg-white p-3 shadow-[0_18px_48px_rgba(34,25,25,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col rounded-[1.55rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20 focus-visible:ring-offset-4"
              >
                <div className="relative aspect-[1/1.08] overflow-hidden rounded-[1.55rem] bg-[#e8e2db]">
                  <Image
                    src={article.coverImage}
                    alt={article.coverAlt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 44vw, calc(100vw - 32px)"
                  />
                </div>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4">
                  <h2 className="text-[2.05rem] leading-[0.95] tracking-[-0.08em] text-[#221f24] sm:text-[2.35rem]">
                    {article.title}
                  </h2>

                  <p className="mt-4 flex-1 text-[1.04rem] leading-8 text-[#5f5a62]">
                    {article.excerpt}
                  </p>

                  <span className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#232021] px-6 text-base font-semibold text-white shadow-[0_12px_24px_rgba(35,32,33,0.14)] transition-colors group-hover:bg-[#161314]">
                    Voir plus
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
