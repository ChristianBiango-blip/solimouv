"use client";

import { useState } from "react";
import Link from "next/link";

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

const ACTIVITIES = [
  {
    id: "yoga",
    label: "Yoga Adapté",
    image: "https://www.figma.com/api/mcp/asset/4543550c-4033-44b2-896b-6a34bd6d9fd4",
    badge: "#ff270b",
    tall: false,
    full: false,
  },
  {
    id: "boxe",
    label: "Boxe Mixte",
    image: "https://www.figma.com/api/mcp/asset/414c3262-8905-40a6-9257-ff1a53e79368",
    badge: "#10e3ff",
    tall: false,
    full: false,
  },
  {
    id: "basket",
    label: "Basket",
    image: "https://www.figma.com/api/mcp/asset/0e347593-9c93-4830-a7ad-03e10038ed2e",
    badge: "#ff8707",
    tall: true,
    full: false,
  },
  {
    id: "foot",
    label: "Foot",
    image: "https://www.figma.com/api/mcp/asset/88d114c8-5646-45a0-ad03-4b38df2f43c3",
    badge: "#00ff44",
    tall: true,
    full: false,
  },
  {
    id: "badminton",
    label: "Badminton",
    image: "https://www.figma.com/api/mcp/asset/08f3cf52-c251-41bc-906a-92e2ea9212a5",
    badge: "#4200fe",
    tall: false,
    full: true,
  },
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

const NAV_LINKS = [
  { href: "/accueil", label: "Accueil" },
  { href: "/atelier", label: "Ateliers" },
  { href: "/blog", label: "Blog" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/dons", label: "Dons" },
  { href: "/inscription-festival", label: "S'inscrire au festival" },
  { href: "/contact", label: "Contact" },
];

export default function AccueilPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        {/* ─── Hero ──────────────────────────────────────────── */}
        <section className="relative flex min-h-[720px] flex-col gap-10 overflow-hidden bg-brand-accent px-5 pt-12 pb-20">
          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-full bg-[#fbfbfb] shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
            >
              <span className="h-[2px] w-[22px] rounded-full bg-[#211f1f]" />
              <span className="h-[2px] w-[22px] rounded-full bg-[#211f1f]" />
            </button>
            <Link
              href="/mon-compte"
              aria-label="Mon compte"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbfbfb] shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#211f1f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </Link>
          </div>

          {/* Floating date/location chips */}
          <div className="relative h-[160px] w-full">
            <div className="absolute left-0 top-0 -rotate-3">
              <div className="rounded-2xl bg-[#fbfbfb] px-4 py-2 shadow-md">
                <span className="font-black italic text-[24px] tracking-[-1.4px] text-brand-accent leading-[33px]">
                  LE 6 JUIN
                </span>
              </div>
            </div>
            <div className="absolute left-8 top-[33px] rotate-2">
              <div className="rounded-2xl bg-[#fbfbfb] px-4 py-2 shadow-md">
                <span className="font-black italic text-[24px] tracking-[-1.4px] text-brand-accent leading-[33px]">
                  Au centre sportif
                </span>
              </div>
            </div>
            <div className="absolute left-[155px] top-[75px] -rotate-2">
              <div className="rounded-2xl bg-[#fbfbfb] px-4 py-2 shadow-md">
                <span className="font-black italic text-[24px] tracking-[-1.4px] text-brand-accent leading-[33px]">
                  Paris 13
                </span>
              </div>
            </div>
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
          <div className="flex flex-col gap-2">
            {/* Row 1: Yoga + Boxe */}
            <div className="flex gap-2">
              {ACTIVITIES.slice(0, 2).map((a) => (
                <div
                  key={a.id}
                  className="relative h-36 flex-1 overflow-hidden rounded-[13px] bg-[#fbfbfb]"
                >
                  <img
                    src={a.image}
                    alt={a.label}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-2.5 top-3 font-black italic text-[15px] uppercase tracking-[-0.7px] text-[#211f1f] leading-[16px] drop-shadow-sm">
                    {a.label}
                  </span>
                  <span
                    className="absolute right-2 top-2 h-6 w-6 rounded-full"
                    style={{ backgroundColor: a.badge }}
                  />
                </div>
              ))}
            </div>
            {/* Row 2: Basket + Foot (taller) */}
            <div className="flex gap-2">
              {ACTIVITIES.slice(2, 4).map((a) => (
                <div
                  key={a.id}
                  className="relative h-[218px] flex-1 overflow-hidden rounded-[16px] bg-[#fbfbfb]"
                >
                  <img
                    src={a.image}
                    alt={a.label}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-2.5 top-3 font-black italic text-[15px] uppercase tracking-[-0.7px] text-[#211f1f] leading-[16px] drop-shadow-sm">
                    {a.label}
                  </span>
                  <span
                    className="absolute right-2 top-2 h-6 w-6 rounded-full"
                    style={{ backgroundColor: a.badge }}
                  />
                </div>
              ))}
            </div>
            {/* Row 3: Badminton (full width) */}
            <div className="relative h-36 w-full overflow-hidden rounded-[13px] bg-[#fbfbfb]">
              <img
                src={ACTIVITIES[4].image}
                alt={ACTIVITIES[4].label}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-2.5 top-3 font-black italic text-[15px] uppercase tracking-[-0.7px] text-[#211f1f] leading-[16px] drop-shadow-sm">
                {ACTIVITIES[4].label}
              </span>
              <span
                className="absolute right-2 top-2 h-6 w-6 rounded-full"
                style={{ backgroundColor: ACTIVITIES[4].badge }}
              />
            </div>
          </div>
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

      {/* ─── Mobile menu overlay ─────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#211f1f] px-6 py-10 overflow-y-auto">
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbfbfb]/10 text-[#fbfbfb]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-10 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#fbfbfb]/10 py-4 font-black italic text-[28px] tracking-[-1.5px] text-[#fbfbfb] leading-[33px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
