"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type WorkshopCard = {
  title: string;
  accent: string;
  badge: React.ReactNode;
  illustration: React.ReactNode;
  keywords: string[];
  wide?: boolean;
};

const workshopCards: WorkshopCard[] = [
  {
    title: "Yoga adapté",
    accent: "#ff270b",
    badge: <YogaIcon />,
    illustration: <YogaIllustration />,
    keywords: ["yoga", "adapte", "adapté", "bien-etre", "bien-être"],
  },
  {
    title: "Boxe mixte",
    accent: "#10e3ff",
    badge: <BoxeIcon />,
    illustration: <BoxingIllustration />,
    keywords: ["boxe", "combat", "mixte"],
  },
  {
    title: "Basket",
    accent: "#ff8707",
    badge: <BasketIcon />,
    illustration: <BasketIllustration />,
    keywords: ["basket", "basketball", "panier"],
  },
  {
    title: "Foot",
    accent: "#00ff44",
    badge: <YogaIcon />,
    illustration: <FootballIllustration />,
    keywords: ["foot", "football", "ballon"],
  },
  {
    title: "Badminton",
    accent: "#4200fe",
    badge: <ShuttleIcon />,
    illustration: <BadmintonIllustration />,
    keywords: ["badminton", "raquette", "volant"],
    wide: true,
  },
];

const headerIcons = [
  { accent: "#ff270b", icon: <YogaIcon /> },
  { accent: "#10e3ff", icon: <BoxeIcon /> },
  { accent: "#00ff44", icon: <YogaIcon /> },
  { accent: "#ff8707", icon: <BasketIcon /> },
];

export default function AteliersScreen() {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeText(query);
  const filteredCards = workshopCards.filter((card) => {
    if (!normalizedQuery) return true;
    return [card.title, ...card.keywords].some((v) =>
      normalizeText(v).includes(normalizedQuery)
    );
  });

  return (
    <div className="min-h-screen bg-[#211f1f] text-white">
      <main id="main-content">
        {/* ── Section principale ── */}
        <section className="px-[10px] pb-11 pt-3 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="mx-auto max-w-[393px] sm:max-w-[640px] lg:max-w-none">

              {/* Status bar (mobile only) */}
              <div className="sm:hidden">
                <StatusBar />
              </div>

              {/* Boutons nav flottants */}
              <div className="mt-3 flex items-center justify-between sm:mt-0 lg:pt-10">
                <CircleButton label="Ouvrir le menu">
                  <MenuIcon />
                </CircleButton>
                <CircleButton label="Ouvrir le profil">
                  <ProfileIcon />
                </CircleButton>
              </div>

              <div className="lg:mt-14 lg:grid lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start lg:gap-10">

                {/* ── Colonne gauche : titre + description + recherche ── */}
                <div>
                  <div className="mt-[62px] flex items-center justify-between gap-4 lg:mt-0">
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
                    <div className="grid grid-cols-2 gap-[7px] sm:gap-4 lg:grid-cols-3">
                      {filteredCards.map((card) => (
                        <article
                          key={card.title}
                          className={`overflow-hidden rounded-[14px] bg-white px-3 pb-3 pt-[10px] text-[#111111] shadow-[0_18px_38px_rgba(0,0,0,0.22)] sm:rounded-[18px] sm:px-4 sm:pb-4 sm:pt-3 ${
                            card.wide ? "col-span-2 lg:col-span-3" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h2 className="font-black italic uppercase leading-none tracking-[-0.06em] text-[13px] sm:text-[16px]">
                              {card.title}
                            </h2>
                            <span
                              className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full sm:h-[26px] sm:w-[26px]"
                              style={{ backgroundColor: card.accent }}
                            >
                              {card.badge}
                            </span>
                          </div>

                          <div
                            className={
                              card.wide
                                ? "mt-2 h-[90px] sm:h-[140px] lg:h-[160px]"
                                : "mt-2 h-[140px] sm:h-[200px] lg:h-[220px]"
                            }
                          >
                            {card.illustration}
                          </div>
                        </article>
                      ))}
                    </div>
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

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[18px] text-[11px] font-semibold text-white">
      <span>9:41</span>
      <div className="h-[34px] w-[88px] rounded-full bg-white/90" />
      <div className="flex items-center gap-[6px]">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function CircleButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white text-[#211f1f] shadow-[0_4px_15px_rgba(0,0,0,0.15)] sm:h-[56px] sm:w-[56px]"
    >
      {children}
    </button>
  );
}

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

function MenuIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
      <path d="M4 7h14M4 15h14" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <circle cx="11" cy="8" r="3" />
      <path d="M5.5 18c1.2-2.5 3-3.8 5.5-3.8s4.3 1.3 5.5 3.8" />
    </svg>
  );
}

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

function SignalIcon() {
  return (
    <svg viewBox="0 0 18 12" fill="none" className="h-[10px] w-[18px]" aria-hidden="true">
      <path d="M1.5 10V8.5m4 1.5V7m4 3V5m4 5V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 12" fill="none" className="h-[10px] w-[15px]" aria-hidden="true">
      <path d="M2 4.8a9.1 9.1 0 0 1 12 0M4.5 7.1a5.4 5.4 0 0 1 7 0M7 9.3a2 2 0 0 1 2.2 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 26 13" fill="none" className="h-[11px] w-[25px]" aria-hidden="true">
      <rect x="1" y="1" width="20" height="11" rx="2.7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="3" width="15.5" height="7" rx="1.6" fill="currentColor" />
      <path d="M22.3 4.4h2.5v4.2h-2.5z" fill="currentColor" />
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

function ShuttleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[11px] w-[11px] sm:h-3 sm:w-3" aria-hidden="true">
      <path d="m7.5 6.2 6 6m-1-7.5 2.3 2.3-2.5 1-1 2.5-2.3-2.3 3.5-3.5Zm-6.5 7 2.5-.8.8-2.5 2.2 2.2-1.7 1.7-1.7 1.7-2.1-2.3Z" />
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

// ─── Illustrations SVG ─────────────────────────────────────────────────────────

function YogaIllustration() {
  return (
    <svg viewBox="0 0 150 150" className="h-full w-full" aria-hidden="true">
      <path d="M69 28c5.7 0 10 3.8 10 9.4 0 6-4.5 10.1-10.7 10.1-5.3 0-9.3-3.5-9.3-8.7 0-6.2 4.6-10.8 10-10.8Z" fill="none" stroke="#161616" strokeWidth="2.3" />
      <path d="M69.4 46.8c5 5.1 7.1 10.8 6.5 18.1m-7.4-3.8c-4.2 2.4-8.3 6.5-12.4 12.1m16.7-8.7c-.8 8.2-1 16.6-.4 25.4m-1 0c-12.6-.8-24.5-.2-35.9 1.8m36.1-14.2c7.8 7.8 14.9 15.6 21.2 23.3m-38-28.1c-8.6 8.3-14.3 16.2-17.1 23.8m32.7-7.9L52.5 111" fill="none" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
    </svg>
  );
}

function BoxingIllustration() {
  return (
    <svg viewBox="0 0 150 150" className="h-full w-full" aria-hidden="true">
      <path d="M82 34.5c0 6-4.5 10.5-10.5 10.5S61 40.5 61 34.5 65.5 24 71.5 24 82 28.5 82 34.5Z" fill="none" stroke="#161616" strokeWidth="2.3" />
      <path d="M70.8 45.2c-2 9.1-1.7 17.1.8 24m-10.8-8.6c7.1-.9 14.3.6 21.5 4.4m-4-6.7c10.4-1.6 18.4.9 24 7.7m-26 4.3c5 6.7 8.3 14.6 9.8 23.9m-17.8-17.9c-7.4 5.7-12.9 13.6-16.6 23.7m17.6-1.7 10.8 18.4m8.3-44.6 11.3-13.1m-9.7 8.5 18.3 6.2m-60.7 27.7-11.9 11.4" fill="none" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
    </svg>
  );
}

function BasketIllustration() {
  return (
    <svg viewBox="0 0 150 150" className="h-full w-full" aria-hidden="true">
      <path d="M92 53.5c0 6-4.7 10.5-10.6 10.5S71 59.5 71 53.5 75.6 43 81.4 43 92 47.5 92 53.5Z" fill="none" stroke="#161616" strokeWidth="2.3" />
      <path d="M81.2 64.4c4.6 5.7 6.8 12.4 6.7 20.3m-10.8-2.8c-6.3 1.4-12.4 4.4-18.4 9m19.3-.2c2 7.3 3.4 14.9 4.3 22.7m-3-17.3c-9 2.4-16 8.6-21 18.4m19.7-8.2c-8.9-.6-16.4-2.9-22.7-7m31.5-8.2 17.9 21.9" fill="none" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
      <circle cx="75" cy="127" r="14.8" fill="none" stroke="#161616" strokeWidth="2.3" />
      <path d="M60.8 127H89m-8.7-13.9c-4.5 4-7.1 8.7-7.8 13.9m0 0c.7 5.2 3.3 9.8 7.8 13.9" fill="none" stroke="#161616" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function FootballIllustration() {
  return (
    <svg viewBox="0 0 150 150" className="h-full w-full" aria-hidden="true">
      <path d="M102 49c0 5.8-4.4 10-10.3 10s-10.2-4.2-10.2-10 4.4-10 10.2-10S102 43.2 102 49Z" fill="none" stroke="#161616" strokeWidth="2.3" />
      <path d="M90.3 59.4c-3.7 8.8-9.4 16.6-17 23.5m7.8-11.3c7.6 5.1 15.8 8.8 24.8 11.2m-18.4-4.9c-8.2.4-16.5 4.3-24.9 11.8m16.2-4.4c2 9 5.4 17.6 10.2 25.9M58 95.8c-5.4 5.5-10.5 12.5-15.4 21m46.3-19.7 14.2 22.2" fill="none" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
      <circle cx="120" cy="125" r="14.7" fill="none" stroke="#161616" strokeWidth="2.3" />
      <path d="m120 113.2 6.2 4.4-2.4 7.5h-7.6l-2.4-7.5 6.2-4.4Zm-10.3 11.9 6.5-.2m7.6 0 6.4.2m-15.9 5.7 3.6-5.7m8.7 0 3.7 5.7" fill="none" stroke="#161616" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BadmintonIllustration() {
  return (
    <svg viewBox="0 0 320 110" className="h-full w-full" aria-hidden="true">
      <path d="M42.7 36.5c0 5.1-3.9 8.8-8.8 8.8s-8.8-3.7-8.8-8.8 3.9-8.8 8.8-8.8 8.8 3.8 8.8 8.8Zm208.6 6.5c0 5.1-3.9 8.8-8.8 8.8s-8.8-3.7-8.8-8.8 3.9-8.8 8.8-8.8 8.8 3.8 8.8 8.8Z" fill="none" stroke="#161616" strokeWidth="2.1" />
      <path d="M34.2 45.7c5.4 4.3 9.1 10.5 11.2 18.6m-16-7.4c-6.6 6-12.3 13.6-17 22.9m29.7-8.4c7.4-.9 13.7-3.7 19-8.3m3.7-1.6c3.6 5.7 5.7 12.2 6.2 19.6m15.6 9.9-20-9.5m160.4-28.2c4.5 4.7 8.1 10.8 10.9 18.1m-5.8-8.7 17.5-4.2m-7.4 12.6c9.2 1.5 17.8 5.4 25.9 11.7m-34.3-7.3c-2.2 7.6-4.4 15.2-6.6 22.7m-7.5-9.3 11.9 18.5" fill="none" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" />
      <path d="M0 103h68m158 0h94" stroke="#161616" strokeOpacity="0.22" strokeWidth="2" />
      <path d="M10 26 24 40m-2-16 7.5 15.6m240.5-5.3 11 13m-4.5-17 10.5 12.7" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
      <circle cx="80" cy="82" r="12.8" fill="none" stroke="#161616" strokeWidth="1.9" />
      <path d="m80 69.5 3.3 11.1H94m-23.7 0h10.8L80 91.8" fill="none" stroke="#161616" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="302" cy="88" r="12.8" fill="none" stroke="#161616" strokeWidth="1.9" />
      <path d="m302 75.5 3.3 11.1H316m-23.7 0h10.8L302 97.8" fill="none" stroke="#161616" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
