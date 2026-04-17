import Link from "next/link";

// Figma asset URLs — valid 7 days from 2026-04-17
const YOGA_ICON_SVG =
  "https://www.figma.com/api/mcp/asset/f8055ede-fd1b-46fd-ade8-eb85fc32c696";
const LOGO_WHITE =
  "https://www.figma.com/api/mcp/asset/46150e5e-376a-44aa-9f2a-80906d0c24b0";
const DIVIDER_LINE =
  "https://www.figma.com/api/mcp/asset/7217cfcf-f3bf-4ca9-a828-d6aaa2cdad82";

const PARTNERS = [
  {
    src: "https://www.figma.com/api/mcp/asset/44c92a16-7aaf-4280-882d-563ce53d9f23",
    alt: "Berry Boîtîm Forêts",
    w: 74,
    h: 54,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/e349d0e2-8aee-4e78-baf5-875e7df9a23d",
    alt: "GMA",
    w: 110,
    h: 89,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/0aaa515a-086b-4f9e-bbd1-6112c50e2c6b",
    alt: "Partenaire",
    w: 93,
    h: 94,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/39f6e923-12d4-445f-873e-5651455778a2",
    alt: "Partenaire",
    w: 93,
    h: 94,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/58d2c20a-08be-4d1d-ae32-6edb49cb82d1",
    alt: "Partenaire",
    w: 93,
    h: 94,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/369e6ead-b550-42be-b6f1-f6594578f63b",
    alt: "Partenaire",
    w: 85,
    h: 72,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/917b1e8f-8a8f-424f-8d68-5e11ab0523ea",
    alt: "Partenaire",
    w: 93,
    h: 94,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/588da91d-12ae-4a9d-8213-aa091d3c19c7",
    alt: "Partenaire",
    w: 97,
    h: 68,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/78514c3f-8da0-4a61-87d7-c3cafa7f5412",
    alt: "Partenaire",
    w: 129,
    h: 32,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/ff58d858-0370-4c88-9a5e-d87669aa25f2",
    alt: "Partenaire",
    w: 130,
    h: 45,
  },
];

const SOCIAL = [
  {
    href: "#",
    src: "https://www.figma.com/api/mcp/asset/64206cd1-dab3-4e56-aa3f-4ff309735de4",
    label: "Facebook",
    size: 15,
  },
  {
    href: "#",
    src: "https://www.figma.com/api/mcp/asset/2216a1e3-057b-4720-885f-9906a09206d2",
    label: "Instagram",
    size: 17,
  },
  {
    href: "#",
    src: "https://www.figma.com/api/mcp/asset/87ebc5b9-f7fa-4625-a61c-8dcea163c116",
    label: "LinkedIn",
    size: 17,
  },
];

export default function YogaPage() {
  return (
    <div className="bg-[#211f1f]">
      {/* ── Back nav + title ─────────────────────────────────── */}
      <section className="px-6 pt-6 pb-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/atelier"
              aria-label="Retour aux ateliers"
              className="flex items-center justify-center rounded-full p-1 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={YOGA_ICON_SVG}
                  alt=""
                  aria-hidden="true"
                  className="h-[14px] w-[12px]"
                />
              </div>
              <h1 className="font-black italic text-2xl tracking-[-0.06em] text-white">
                Le Yoga adapté
              </h1>
            </div>
          </div>

          <p className="text-base leading-[1.5] tracking-[-0.04em] text-white/90 max-w-[352px]">
            Découvrez le{" "}
            <span className="font-semibold text-white">yoga</span>, une
            pratique qui relie le corps et l&apos;esprit pour apporter équilibre
            et sérénité. Grâce aux postures, à la respiration et à la
            méditation, il aide à réduire le stress et à améliorer le
            bien-être. Accessible à tous, le yoga est une invitation à prendre
            soin de soi au quotidien.
          </p>
        </div>
      </section>

      {/* ── Event stickers ───────────────────────────────────── */}
      <section className="flex flex-col items-center gap-7 px-6 pb-8 pt-4">
        <div className="relative h-[154px] w-full max-w-xs">
          <div className="absolute left-[38px] top-0 -rotate-3">
            <div className="rounded-[20px] bg-white px-[17px] py-[5px] shadow-sm">
              <span className="font-black italic text-[24px] leading-[33px] tracking-[-0.06em] text-brand-accent">
                LE 6 JUIN
              </span>
            </div>
          </div>
          <div className="absolute left-0 top-[51px] rotate-2">
            <div className="rounded-[20px] bg-white px-[10px] py-[10px] shadow-sm">
              <span className="font-black italic text-[24px] leading-[33px] tracking-[-0.06em] text-brand-accent">
                Au centre sportif
              </span>
            </div>
          </div>
          <div className="absolute left-[47px] top-[102px] -rotate-2">
            <div className="rounded-[20px] bg-white px-[17px] py-[5px] shadow-sm">
              <span className="font-black italic text-[24px] leading-[33px] tracking-[-0.06em] text-brand-accent">
                Paris 13
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/inscription-festival"
          className="flex w-full max-w-sm items-center justify-center rounded-full bg-white py-3 text-base font-semibold tracking-[-0.04em] text-[#211f1f] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
        >
          Inscrivez vous au festival
        </Link>
      </section>

      {/* ── Partners ─────────────────────────────────────────── */}
      <section className="bg-white px-5 py-4">
        <h2 className="font-black italic text-[24px] leading-[33px] tracking-[-0.06em] text-[#211f1f]">
          Nos partenaires
        </h2>
        <div className="mt-4 flex items-center gap-[85px] overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PARTNERS.map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.alt + p.src}
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              className="shrink-0 object-contain"
            />
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="flex flex-col items-center gap-[26px] bg-brand-accent px-5 py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_WHITE} alt="Solimouv'" width={219} height={29} />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={DIVIDER_LINE} alt="" aria-hidden="true" className="w-full max-w-[360px]" />

        <div className="flex flex-col items-center gap-4 text-center text-base tracking-[-0.04em] text-white">
          <span className="font-semibold">Coordonées</span>
          <span>20 Rue Brillat Savarin, 75013 Paris</span>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={DIVIDER_LINE} alt="" aria-hidden="true" className="w-full max-w-[360px]" />

        <div className="flex flex-col items-center gap-4">
          <span className="text-base font-semibold tracking-[-0.04em] text-white">
            Liens utiles
          </span>
          <div className="flex items-center gap-8">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="transition-opacity hover:opacity-75"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.label}
                  width={s.size}
                  height={s.size}
                />
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1 text-base tracking-[-0.04em] text-white underline">
            <Link href="/politique-confidentialite" className="hover:opacity-75">
              Politique de confidentialité
            </Link>
            <Link href="/mentions-legales" className="hover:opacity-75">
              Mentions légales
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
