"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/app/components/MobileNav";
import SportCardsGrid, { SPORT_CARDS } from "@/app/components/SportCardsGrid";

const headerIcons = [
  { accent: "#ff270b", icon: <YogaIcon /> },
  { accent: "#10e3ff", icon: <BoxeIcon /> },
  { accent: "#00ff44", icon: <YogaIcon /> },
  { accent: "#ff8707", icon: <BasketIcon /> },
];

export default function AteliersScreen() {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeText(query);
  const filteredCards = SPORT_CARDS.filter((card) => {
    if (!normalizedQuery) return true;
    return [card.label, ...card.keywords].some((v) =>
      normalizeText(v).includes(normalizedQuery)
    );
  });

  return (
    <div className="min-h-screen bg-[#211f1f] text-white">
      <main id="main-content">
        {/* ── Section principale ── */}
        <section className="px-[10px] pb-11 pt-20 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="mx-auto max-w-[393px] sm:max-w-[640px] lg:max-w-none">

              {/* Nav */}
              <MobileNav />

              <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start lg:gap-10">

                {/* ── Colonne gauche : titre + description + recherche ── */}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-[7px]">
                      {headerIcons.map((item, i) => (
                        <span
                          key={i}
                          className="flex h-[22px] w-[22px] items-center justify-center rounded-full sm:h-6 sm:w-6"
                          style={{ backgroundColor: item.accent }}
                        >
                          {item.icon}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      aria-label="Voir plus d'ateliers"
                      className="flex h-8 w-8 items-center justify-center text-white"
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>

                  <h1 className="mt-5 font-black italic leading-[0.95] tracking-[-0.06em] text-white sm:max-w-[12ch] text-[22px] sm:text-[34px] lg:text-[42px]">
                    Découvrez nos ateliers
                  </h1>

                  <p className="mt-4 max-w-[33ch] leading-[1.5] text-white/90 text-[13px] sm:text-[16px] lg:max-w-[30ch] lg:text-[18px]">
                    Bougez à votre rythme avec des activités variées : yoga
                    adapté, boxe, basket, foot et plus encore.
                  </p>

                  {/* Barre de recherche */}
                  <div className="mt-7 lg:mt-8">
                    <label
                      htmlFor="workshop-search"
                      className="flex h-[48px] cursor-text items-center gap-4 rounded-full bg-white px-6 text-[#211f1f] shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:h-[56px]"
                    >
                      <SearchIcon />
                      <input
                        id="workshop-search"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher un sport"
                        className="w-full bg-transparent font-medium outline-none placeholder:text-[#211f1f]/60 text-[14px] sm:text-[16px]"
                      />
                    </label>
                  </div>
                </div>

                {/* ── Colonne droite : grille des ateliers ── */}
                <div className="mt-8 lg:mt-0">
                  {filteredCards.length > 0 ? (
                    <SportCardsGrid cards={filteredCards} />
                  ) : (
                    <div className="rounded-[18px] bg-white px-6 py-10 text-center text-[#111111] shadow-[0_18px_38px_rgba(0,0,0,0.18)]">
                      <p className="text-[20px] font-black italic tracking-[-0.06em]">
                        Aucun atelier trouvé
                      </p>
                      <p className="mt-3 text-[14px] leading-[1.5] text-black/60">
                        Essaie un sport comme yoga, boxe, basket, foot ou badminton.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Partenaires ── */}
        <section className="bg-white px-5 pb-10 pt-5 text-[#211f1f] sm:px-8 sm:pb-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1120px]">
            <h2 className="font-black italic leading-none tracking-[-0.06em] text-[22px] sm:text-[32px]">
              Nos partenaires
            </h2>
            <div className="mt-8 flex items-end justify-around gap-6 overflow-x-auto sm:justify-start sm:gap-16 lg:mt-12 lg:gap-24">
              <BerryBoisForetsLogo />
              <GMALogo />
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-[#ff270b] px-4 pb-10 pt-8 text-center text-white sm:px-8 sm:pb-14 sm:pt-12 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-[1120px]">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/solimouv-blanc.svg"
                alt="Solimouv'"
                width={222}
                height={52}
                className="h-auto w-[180px] sm:w-[220px]"
              />
            </div>

            <div className="mt-8 border-t border-dotted border-white/50 pt-8 lg:mt-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:pt-10">
              <div className="lg:text-left">
                <p className="text-[14px] font-semibold tracking-[-0.04em] sm:text-[16px]">
                  Coordonnées
                </p>
                <p className="mx-auto mt-4 max-w-[22ch] text-[13px] leading-[1.5] sm:text-[15px] lg:mx-0">
                  20 Rue Brillat Savarin, 75013 Paris
                </p>
              </div>

              <div className="mt-8 lg:mt-0 lg:text-left">
                <p className="text-[14px] font-semibold tracking-[-0.04em] sm:text-[16px]">
                  Liens utiles
                </p>

                <div className="mt-5 flex items-center justify-center gap-8 lg:justify-start">
                  <SocialLink href="https://facebook.com" label="Facebook">
                    <FacebookIcon />
                  </SocialLink>
                  <SocialLink href="https://instagram.com" label="Instagram">
                    <InstagramIcon />
                  </SocialLink>
                  <SocialLink href="https://linkedin.com" label="LinkedIn">
                    <LinkedInIcon />
                  </SocialLink>
                </div>

                <div className="mt-5 space-y-1 text-[13px] underline underline-offset-2 sm:text-[14px]">
                  <div>
                    <Link href="/politique-de-confidentialite">
                      Politique de confidentialité
                    </Link>
                  </div>
                  <div>
                    <Link href="/mentions-legales">Mentions légales</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ─── Utilitaires ───────────────────────────────────────────────────────────────

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// ─── UI Components ─────────────────────────────────────────────────────────────

function SocialLink({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-5 w-5 items-center justify-center text-white"
    >
      {children}
    </Link>
  );
}

// ─── Icônes SVG ────────────────────────────────────────────────────────────────

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5" aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

function YogaIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[11px] w-[11px] sm:h-3 sm:w-3" aria-hidden="true">
      <circle cx="10" cy="4" r="2" fill="none" />
      <path d="M10 6.5v4m-4 .5 4-1.8 4 1.8M7 16.5l3-3 3 3" />
    </svg>
  );
}

function BoxeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[11px] w-[11px] sm:h-3 sm:w-3" aria-hidden="true">
      <path d="M4 5h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-3.5 2v-2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function BasketIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[11px] w-[11px] sm:h-3 sm:w-3" aria-hidden="true">
      <circle cx="10" cy="10" r="6.2" />
      <path d="M10 3.8c2.1 1.6 3.2 3.7 3.2 6.2s-1.1 4.6-3.2 6.2M10 3.8C7.9 5.4 6.8 7.5 6.8 10s1.1 4.6 3.2 6.2M4 10h12" />
    </svg>
  );
}


function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M13.3 20v-6.5h2.3l.3-2.5h-2.6V9.4c0-.7.2-1.2 1.3-1.2h1.4V5.8c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3V11H8.8v2.5h2.2V20h2.3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M6.4 8.9H4V20h2.4V8.9Zm-1.2-4a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM20 13c0-2.7-1.4-4-3.5-4-1.6 0-2.3.9-2.7 1.5V8.9h-2.4V20h2.4v-5.4c0-1.5.3-2.8 2-2.8s1.8 1.7 1.8 2.9V20H20V13Z" />
    </svg>
  );
}

// ─── Logos partenaires ─────────────────────────────────────────────────────────

function BerryBoisForetsLogo() {
  return (
    <div className="shrink-0 leading-none text-[#243287]">
      <div className="text-[20px] font-semibold tracking-[-0.08em] sm:text-[28px]">BERRY</div>
      <div className="text-[11px] font-medium tracking-[0.1em] text-[#b07437] sm:text-[14px]">BOIS</div>
      <div className="text-[19px] font-light tracking-[-0.06em] text-[#6daa52] sm:text-[26px]">FORÊTS</div>
    </div>
  );
}

function GMALogo() {
  return (
    <div className="flex shrink-0 flex-col items-center text-[#555b67]">
      <svg viewBox="0 0 34 50" fill="none" className="h-[40px] w-[27px] sm:h-[54px] sm:w-[36px]" aria-hidden="true">
        <path d="M16.8 2c4.8 6.3 8.6 10.6 8.6 17.2A8.6 8.6 0 1 1 8.2 19.2C8.2 12.7 12 8.4 16.8 2Z" fill="#76c5ef" />
        <path d="M19.4 23c5.6 4.9 9.6 8.4 9.6 13.8a9.6 9.6 0 1 1-19.2 0c0-5.3 4-8.9 9.6-13.8Z" fill="#b8d764" />
      </svg>
      <div className="mt-1 text-[22px] font-light tracking-[-0.08em] sm:text-[30px]">GMA</div>
      <div className="text-[5px] uppercase tracking-[0.12em] text-[#6a6f79] sm:text-[7px]">Gaz &amp; matériel d&apos;Auvergne</div>
    </div>
  );
}

