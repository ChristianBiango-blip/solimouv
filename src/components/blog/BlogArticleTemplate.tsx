import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/content/blog";

type BlogArticleTemplateProps = {
  article: BlogArticle;
};

export default function BlogArticleTemplate({
  article,
}: BlogArticleTemplateProps) {
  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/blog"
        className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-primary shadow-[0_12px_30px_rgba(66,0,254,0.12)] transition-all hover:-translate-x-0.5 hover:bg-brand-primary hover:text-white"
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
        Revenir aux actus
      </Link>

      <div className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white shadow-[0_30px_90px_rgba(66,0,254,0.14)]">
        <div className="relative aspect-[16/8] min-h-[260px] w-full overflow-hidden bg-[#ece7ff]">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 1152px, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,0,91,0.04),rgba(27,0,91,0.58))]" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white">
              <span className="rounded-full bg-white/14 px-4 py-2 backdrop-blur">
                {article.category}
              </span>
              <span className="rounded-full bg-black/24 px-4 py-2 backdrop-blur">
                {article.readTime} de lecture
              </span>
            </div>
            <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
          </div>
        </div>

        <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 lg:px-10 lg:py-10">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-brand-primary/8 px-4 py-2 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
            >
              Retour aux actus
            </Link>

            <p className="mt-6 text-lg leading-8 text-gray-700 sm:text-xl">
              {article.intro}
            </p>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-black tracking-[-0.04em] text-gray-950 sm:text-3xl">
                    {section.title}
                  </h2>

                  <div className="mt-5 space-y-4 text-base leading-8 text-gray-700 sm:text-lg">
                    {section.blocks.map((block, index) => {
                      const key = `${section.title}-${block.type}-${index}`;

                      if (block.type === "paragraph") {
                        return <p key={key}>{block.content}</p>;
                      }

                      if (block.type === "highlight") {
                        return (
                          <p
                            key={key}
                            className="rounded-[1.4rem] border border-[#f4d6e9] bg-[#fff3fa] px-5 py-4 font-semibold text-[#5e1d63]"
                          >
                            {block.content}
                          </p>
                        );
                      }

                      return (
                        <ul key={key} className="space-y-3 pl-1">
                          {block.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 rounded-[1.2rem] bg-[#f8f7ff] px-4 py-3"
                            >
                              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-secondary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] bg-[linear-gradient(160deg,#18004f_0%,#4200fe_52%,#f238a7_100%)] p-6 text-white shadow-[0_22px_60px_rgba(66,0,254,0.24)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              À retenir
            </p>
            <p className="mt-4 text-2xl font-black tracking-[-0.05em]">
              Des articles pensés pour rendre le festival plus lisible, plus accueillant et plus concret.
            </p>

            <div className="mt-6 rounded-[1.6rem] bg-white/12 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                Publication
              </p>
              <p className="mt-2 text-lg font-semibold">
                {new Intl.DateTimeFormat("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(article.publishedAt))}
              </p>
            </div>

            <div className="mt-4 rounded-[1.6rem] bg-white/12 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                Prochaine étape
              </p>
              <p className="mt-2 text-base leading-7 text-white/90">
                Explorer le programme, découvrir les ateliers et préparer sa venue au festival.
              </p>
              <Link
                href="/programme"
                className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-primary transition-transform hover:-translate-y-0.5"
              >
                Voir le programme
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
