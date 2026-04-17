import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/content/blog";

type BlogArticleTemplateProps = {
  article: BlogArticle;
};

export default function BlogArticleTemplate({
  article,
}: BlogArticleTemplateProps) {
  const publishedLabel = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <article
      className="mx-auto max-w-[760px] pb-10"
      aria-labelledby="article-title"
    >
      <div className="overflow-hidden bg-white">
        <div className="relative min-h-[340px] w-full overflow-hidden bg-[#d8d8d8] sm:min-h-[520px]">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 760px, 100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,1)_78%)]" />
        </div>

        <div className="relative z-10 -mt-16 px-4 pb-6 sm:-mt-[5.6rem] sm:px-[22px] sm:pb-8">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff6b5c,#ff270b)] px-5 py-2.5 text-[0.8rem] font-medium uppercase tracking-[0.02em] text-white transition-transform hover:-translate-x-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ff270b]/25 focus-visible:ring-offset-4"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Retour aux actus
            </Link>

            <h1
              id="article-title"
              className="mt-4 font-[Georgia,'Times_New_Roman',serif] text-[clamp(2rem,8vw,3.35rem)] leading-[1.14] tracking-[-0.04em] text-[#171717]"
            >
              {article.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.94rem] font-medium text-[#615a63]">
              <time dateTime={article.publishedAt}>{publishedLabel}</time>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d5ccd7]" />
              <span aria-label={`${article.readTime} de lecture`}>
                {article.readTime}
              </span>
            </div>

            <p className="mt-[18px] text-base leading-[1.65] text-[#5d5760] sm:text-[1.05rem]">
              {article.intro}
            </p>

            <div className="mt-5 grid gap-[18px] sm:mt-6">
              {article.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mt-2 font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.45rem,5vw,2rem)] leading-[1.2] tracking-[-0.03em] text-[#171717]">
                    {section.title}
                  </h2>

                  <div className="mt-4 grid gap-[18px] text-base leading-[1.7] text-[#4f4a52]">
                    {section.blocks.map((block, index) => {
                      const key = `${section.title}-${block.type}-${index}`;

                      if (block.type === "paragraph") {
                        return <p key={key}>{block.content}</p>;
                      }

                      if (block.type === "highlight") {
                        return (
                          <p
                            key={key}
                            className="font-bold italic leading-[1.6] text-[#222222]"
                          >
                            {block.content}
                          </p>
                        );
                      }

                      return (
                        <ul
                          key={key}
                          className="mt-[-6px] mb-1 ml-5 list-disc pl-0 text-[#4f4a52]"
                        >
                          {block.items.map((item) => (
                            <li key={item} className="leading-[1.65] [&+li]:mt-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
            <div className="mt-10 rounded-[1.6rem] bg-[#faf7f2] px-5 py-5">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#8a8190]">
                Pour aller plus loin
              </p>
              <p className="mt-3 text-[0.98rem] leading-[1.62] text-[#66616a]">
                Continuez avec les autres actus du festival ou explorez le
                programme pour préparer votre venue.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex rounded-full bg-[#232021] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#232021]/20 focus-visible:ring-offset-4"
                >
                  Voir les autres articles
                </Link>
                <Link
                  href="/atelier"
                  className="inline-flex rounded-full border border-[#d4cdd7] bg-white px-5 py-3 text-base font-semibold text-[#2c2630] transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20 focus-visible:ring-offset-4"
                >
                  Voir les ateliers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
