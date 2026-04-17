"use client";

import Link from "next/link";
import MobileNav from "@/app/components/MobileNav";
import SportCardsGrid from "@/app/components/SportCardsGrid";

const LOGO_HERO =
  "https://www.figma.com/api/mcp/asset/37ccfb66-aeb6-45c0-93e2-400a562316b3";
const LOGO_FOOTER =
  "https://www.figma.com/api/mcp/asset/039628cf-bbb0-4d04-9eb0-8808b8bd52f8";
const IMG_DON =
  "https://www.figma.com/api/mcp/asset/733c3c30-09d2-4415-8b51-3b6667fed9ef";

const FESTIVAL_PHOTOS = [
  "https://www.figma.com/api/mcp/asset/c545da13-f18d-47a7-9129-fd7be8112127",
  "https://www.figma.com/api/mcp/asset/969492c4-33bb-45b5-8b9a-329df3a01811",
  "https://www.figma.com/api/mcp/asset/09e46198-d7a7-4cb4-a56f-2668fa57c7fd",
  "https://www.figma.com/api/mcp/asset/0fac9d51-6198-4199-8618-c4c3e09894dc",
  "https://www.figma.com/api/mcp/asset/e9ea4d5c-97e6-4b31-8f32-fe7503a21729",
];


const PARTNERS = [
  "https://www.figma.com/api/mcp/asset/93ff6e1f-e1fb-46e1-9745-b8414dd8a6d3",
  "https://www.figma.com/api/mcp/asset/18bc9307-4de9-41e5-8940-10a2536286d3",
  "https://www.figma.com/api/mcp/asset/d6f027f6-8426-411a-9fe6-8ad366895ae5",
  "https://www.figma.com/api/mcp/asset/8889025d-7f92-442f-8e16-eafb09229c66",
  "https://www.figma.com/api/mcp/asset/928dc684-ded9-41bf-9bf3-8adfba1be4bb",
  "https://www.figma.com/api/mcp/asset/6d46e0bf-26db-4982-977f-5244d1651719",
  "https://www.figma.com/api/mcp/asset/08f8f547-2c8f-4d3d-be53-ac25d7fdb180",
  "https://www.figma.com/api/mcp/asset/e4716224-e455-4343-81c2-16a278a04821",
  "https://www.figma.com/api/mcp/asset/47595dfe-5182-4dda-a9e0-671296fcf00a",
  "https://www.figma.com/api/mcp/asset/3190d936-7a3e-44b8-bd9c-7c66e9b9fe2b",
];

export default function AccueilPage() {

  return (
    <>
      <div className="flex flex-col" id="main-content">
        {/* ─── Hero ──────────────────────────────────────────── */}
        <section className="relative flex min-h-[720px] flex-col gap-10 overflow-hidden bg-brand-accent px-5 pt-24 pb-20" aria-label="Héro du festival Solimouv">
          {/* Nav */}
          <MobileNav />

          {/* Floating date/location chips */}
          <div className="flex justify-center">
<<<<<<< HEAD
          <div
            className="relative h-[130px] w-[250px] sm:h-[160px] sm:w-[320px]"
            aria-label="Le 6 juin au centre sportif Paris 13"
            role="note"
          >
            <div className="absolute left-0 top-0 -rotate-3">
              <div className="rounded-2xl bg-[#fbfbfb] px-3 py-1.5 shadow-md sm:px-4 sm:py-2">
                <span className="font-black italic leading-[1.4] tracking-[-1.2px] text-brand-accent text-[18px] sm:text-[22px] lg:text-[24px]">
                  LE 6 JUIN
                </span>
              </div>
            </div>
            <div className="absolute left-6 top-[26px] rotate-2 sm:left-8 sm:top-[33px]">
              <div className="rounded-2xl bg-[#fbfbfb] px-3 py-1.5 shadow-md sm:px-4 sm:py-2">
                <span className="font-black italic leading-[1.4] tracking-[-1.2px] text-brand-accent text-[18px] sm:text-[22px] lg:text-[24px]">
                  Au centre sportif
                </span>
              </div>
            </div>
            <div className="absolute left-[108px] top-[60px] -rotate-2 sm:left-[155px] sm:top-[75px]">
              <div className="rounded-2xl bg-[#fbfbfb] px-3 py-1.5 shadow-md sm:px-4 sm:py-2">
                <span className="font-black italic leading-[1.4] tracking-[-1.2px] text-brand-accent text-[18px] sm:text-[22px] lg:text-[24px]">
                  Paris 13
                </span>
              </div>
            </div>
          </div>
=======
<div className="relative h-[165px] w-[250px] sm:h-[205px] sm:w-[320px]">
  <div className="absolute left-[44px] top-0 -rotate-3 sm:left-[57px]">
    <div className="rounded-2xl bg-[#fbfbfb] px-3 py-1.5 shadow-md sm:px-4 sm:py-2">
      <span className="font-black italic leading-[1.4] tracking-[-1.2px] text-brand-accent text-[18px] sm:text-[22px] lg:text-[24px]">
        LE 6 JUIN
      </span>
    </div>
  </div>

  <div className="absolute left-0 top-[60px] rotate-2 sm:top-[77px]">
    <div className="rounded-2xl bg-[#fbfbfb] px-3 py-1.5 shadow-md sm:px-4 sm:py-2">
      <span className="font-black italic leading-[1.4] tracking-[-1.2px] text-brand-accent text-[18px] sm:text-[22px] lg:text-[24px]">
        Au centre sportif
      </span>
    </div>
  </div>

  <div className="absolute left-[56px] top-[120px] -rotate-2 sm:left-[72px] sm:top-[154px]">
    <div className="rounded-2xl bg-[#fbfbfb] px-3 py-1.5 shadow-md sm:px-4 sm:py-2">
      <span className="font-black italic leading-[1.4] tracking-[-1.2px] text-brand-accent text-[18px] sm:text-[22px] lg:text-[24px]">
        Paris 13
      </span>
    </div>
  </div>
</div>
>>>>>>> 37fdd8f (feat: delete account)
          </div>

          {/* Logo + subtitle + CTA */}
          <div className="flex flex-col items-center gap-4">
            <img src={LOGO_HERO} alt="Solimouv" width={317} height={41} />
            <p className="text-sm font-semibold capitalize tracking-[1.36px] text-[#fbfbfb] text-center">
              Le festival du sport inclusif
            </p>
            <Link
              href="/inscription-festival"
              className="mt-6 flex h-12 w-full max-w-[345px] items-center justify-center rounded-full bg-[#fbfbfb] text-base font-semibold tracking-[-1px] text-[#211f1f] transition-opacity hover:opacity-90"
            >
              Inscrivez vous au festival
            </Link>
          </div>
        </section>

        {/* ─── Notre dernier festival ─────────────────────── */}
        <section className="flex flex-col gap-5 px-5 py-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-black italic text-[24px] tracking-[-1.4px] text-[#211f1f] leading-[33px]">
              Notre dernier festival
            </h2>
            <p className="text-base tracking-[-1px] text-[#211f1f] leading-[24px]">
              Revivez les{" "}
              <strong className="font-semibold">moments forts</strong> de notre
              dernier festival :{" "}
              <br />
              du sport, de l&apos;énergie et beaucoup de bonne humeur.
              <br />
              Merci à tous les participants pour cette ambiance inoubliable !
            </p>
          </div>
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {FESTIVAL_PHOTOS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Photo festival ${i + 1}`}
                className="h-[190px] w-40 shrink-0 rounded-xl object-cover"
              />
            ))}
          </div>
        </section>

        {/* ─── Ateliers ───────────────────────────────────── */}
        <section className="flex flex-col gap-8 bg-[#211f1f] px-5 py-16">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <h2 className="font-black italic text-[24px] tracking-[-1.4px] text-[#fbfbfb] leading-[33px]">
                Découvrez nos ateliers
              </h2>
              <Link href="/atelier" aria-label="Voir les ateliers" className="mt-1 shrink-0">
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1l10 9-10 9"
                    stroke="#fbfbfb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
            <p className="text-base tracking-[-1px] text-[#fbfbfb] leading-[24px]">
              Bougez à votre rythme avec des activités variées :{" "}
              <br />
              yoga adapté, boxe, basket, foot et plus encore.
            </p>
          </div>

          {/* Cards grid */}
          <SportCardsGrid />
        </section>

        {/* ─── Don ────────────────────────────────────────── */}
        <section className="flex flex-col gap-3 bg-brand-primary px-5 py-16">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-black italic text-[24px] tracking-[-1.4px] text-[#fbfbfb] leading-[33px]">
              Nous aider en faisant un don
            </h2>
            <Link href="/dons" aria-label="Faire un don" className="mt-1 shrink-0">
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1l10 9-10 9"
                  stroke="#fbfbfb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <p className="text-base tracking-[-1px] text-[#fbfbfb] leading-[24px]">
            Notre association étant 90 % bénévole et ne disposant que de très
            faibles subventions publiques, toute aide est la bienvenue !
          </p>
          <Link
            href="/dons"
            className="relative mt-2 flex h-[152px] w-full overflow-hidden rounded-[14px] bg-[#fbfbfb]"
          >
            <span className="absolute left-2.5 top-3 font-black italic text-[17px] uppercase tracking-[-0.8px] text-[#211f1f] leading-[17px]">
              Don
            </span>
            <img
              src={IMG_DON}
              alt="Faire un don"
              className="ml-auto h-full w-[55%] object-cover"
            />
          </Link>
          <Link
            href="/dons"
            className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-[#fbfbfb] text-base font-semibold tracking-[-1px] text-brand-primary transition-opacity hover:opacity-90"
          >
            Faire un don
          </Link>
        </section>

        {/* ─── Partenaires ────────────────────────────────── */}
        <section className="flex flex-col gap-4 px-5 py-8">
          <h2 className="font-black italic text-[24px] tracking-[-1.4px] text-[#211f1f] leading-[33px]">
            Nos partenaires
          </h2>
          <div
            className="flex items-center gap-8 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {PARTNERS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Partenaire ${i + 1}`}
                className="h-16 shrink-0 object-contain"
              />
            ))}
          </div>
        </section>

        {/* ─── Footer ─────────────────────────────────────── */}
        <footer className="flex flex-col items-center gap-6 bg-brand-accent px-5 py-16">
          <img src={LOGO_FOOTER} alt="Solimouv" width={219} height={29} />

          <div className="h-px w-full max-w-[360px] bg-[#fbfbfb]/40" />

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-base font-semibold tracking-[-1px] text-[#fbfbfb]">
              Coordonnées
            </p>
            <p className="text-base tracking-[-1px] text-[#fbfbfb]">
              20 Rue Brillat Savarin, 75013 Paris
            </p>
          </div>

          <div className="h-px w-full max-w-[360px] bg-[#fbfbfb]/40" />

          <div className="flex flex-col items-center gap-4">
            <p className="text-base font-semibold tracking-[-1px] text-[#fbfbfb]">
              Liens utiles
            </p>
            <div className="flex items-center gap-8">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.figma.com/api/mcp/asset/05cbacd8-61b2-41ab-b34d-8935f7a9f41d"
                  alt="Facebook"
                  width={15}
                  height={15}
                />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.figma.com/api/mcp/asset/a51a751b-3e00-4fe3-ac87-92c8658519d4"
                  alt="Instagram"
                  width={17}
                  height={17}
                />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.figma.com/api/mcp/asset/e54f2107-e1ce-4cb8-a745-9ded030476f7"
                  alt="LinkedIn"
                  width={17}
                  height={17}
                />
              </a>
            </div>
            <div className="flex flex-col items-center gap-1 text-base tracking-[-1px] text-[#fbfbfb]">
              <Link
                href="/politique-de-confidentialite"
                className="underline underline-offset-2"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/mentions-legales"
                className="underline underline-offset-2"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </footer>
      </div>

    </>
  );
}
