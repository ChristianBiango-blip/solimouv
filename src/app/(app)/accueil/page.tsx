import Image from "next/image";
import Link from "next/link";

const festivalPhotos = [
  {
    title: "#DJetteEnPlace",
    subtitle: "Table de camping, vibes de pro",
    palette: "from-[#f6efe4] via-[#d6efe9] to-[#f8c6a8]",
  },
  {
    title: "Cricket urbain",
    subtitle: "Du mouvement et une ambiance solaire",
    palette: "from-[#d8f0df] via-[#b9dce8] to-[#f7e4a5]",
  },
  {
    title: "Départ collectif",
    subtitle: "Tout le monde joue, tout le monde compte",
    palette: "from-[#d7dbff] via-[#f8d8cf] to-[#f5f2e8]",
  },
];

const workshops = [
  {
    name: "Yoga adapte",
    color: "#ff5f2a",
    background: "from-white via-white to-[#f2f2f0]",
    illustration: <YogaIllustration />,
  },
  {
    name: "Boxe mixte",
    color: "#38d7ff",
    background: "from-white via-white to-[#eff9ff]",
    illustration: <BoxingIllustration />,
  },
  {
    name: "Basket",
    color: "#ff9d16",
    background: "from-[#fffef6] via-[#fffdf3] to-[#f7f0d8]",
    illustration: <BasketIllustration />,
  },
  {
    name: "Foot",
    color: "#20ef3a",
    background: "from-[#fffef6] via-[#fffdf6] to-[#eef2d9]",
    illustration: <FootballIllustration />,
  },
  {
    name: "Badminton",
    color: "#4e1cff",
    background: "from-[#fffef6] via-[#fffef5] to-[#f1eedf]",
    illustration: <BadmintonIllustration />,
    featured: true,
  },
];

const partners = [
  {
    name: "Berry Bois Forets",
    subtitle: "Bois & forets",
    accent: "text-[#14216c]",
  },
  {
    name: "GMA",
    subtitle: "Gaz & materiel d'Auvergne",
    accent: "text-[#5d6672]",
  },
  {
    name: "UP Sport !",
    subtitle: "Association partenaire",
    accent: "text-[#0081c6]",
  },
];

export default function AccueilPage() {
  return (
    <div className="bg-white text-[#232124]">
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-[2.4rem] leading-none font-black italic tracking-[-0.06em] text-[#231f20] sm:text-6xl">
            Notre dernier festival
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-tight text-[#231f20]/90 sm:text-2xl">
            Revivez les moments forts de notre dernier festival : du sport,
            de l&apos;energie et beaucoup de bonne humeur. Merci a tous les
            participants pour cette ambiance inoubliable !
          </p>
        </div>

        <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2">
          {festivalPhotos.map((photo, index) => (
            <article
              key={photo.title}
              className={`relative h-72 min-w-[17rem] snap-start overflow-hidden rounded-[2rem] bg-gradient-to-br ${photo.palette} p-5 shadow-[0_18px_40px_rgba(35,31,32,0.14)] sm:h-80 sm:min-w-[22rem]`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.75),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.55),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.12))]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-[#231f20] backdrop-blur">
                    Festival 2025
                  </span>
                  <span className="rounded-full bg-black/55 px-2 py-1 text-xs text-white">
                    {index + 1}/7
                  </span>
                </div>
                <div>
                  <p className="max-w-[11ch] text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)]">
                    {photo.title}
                  </p>
                  <p className="mt-3 max-w-[18ch] text-base leading-tight text-[#231f20] sm:text-lg">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#221f20] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-3xl">
              <Link
                href="/programme"
                className="inline-flex items-center gap-3 text-[2.4rem] leading-none font-black italic tracking-[-0.06em] transition-transform hover:translate-x-1 sm:text-6xl"
              >
                Decouvrez nos ateliers
                <ArrowIcon className="mt-2 h-9 w-9 shrink-0 sm:h-12 sm:w-12" />
              </Link>
              <p className="mt-5 max-w-2xl text-lg leading-tight text-white/85 sm:text-2xl">
                Bougez a votre rythme avec des activites variees : yoga adapte,
                boxe, basket, foot et plus encore.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {workshops.map((workshop) => (
              <article
                key={workshop.name}
                className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${workshop.background} p-5 text-[#231f20] shadow-[0_18px_40px_rgba(0,0,0,0.24)] ${
                  workshop.featured ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[2rem] leading-none font-black uppercase italic tracking-[-0.06em]">
                    {workshop.name}
                  </h3>
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: workshop.color }}
                  >
                    <WorkshopGlyph color="#ffffff" />
                  </span>
                </div>
                <div className="mt-6 h-48 sm:h-56">{workshop.illustration}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#3d00ff_0%,#5600ff_35%,#2500cf_100%)] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-3xl">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-[2.4rem] leading-none font-black italic tracking-[-0.06em] transition-transform hover:translate-x-1 sm:text-6xl"
              >
                Nous aider en faisant un don
                <ArrowIcon className="mt-2 h-9 w-9 shrink-0 sm:h-12 sm:w-12" />
              </Link>
              <p className="mt-5 max-w-3xl text-lg leading-tight text-white/90 sm:text-2xl">
                Notre association etant majoritairement benevole et disposant de
                tres faibles subventions publiques, toute aide est la bienvenue.
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white px-5 py-5 text-[#231f20] shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[2rem] leading-none font-black uppercase italic tracking-[-0.06em]">
                Don
              </h3>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe100]">
                <DonationGlyph />
              </span>
            </div>
            <div className="mt-6 h-48 sm:h-56">
              <DonationIllustration />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-[2.4rem] leading-none font-black italic tracking-[-0.06em] text-[#231f20] sm:text-6xl">
          Nos partenaires
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <article
              key={partner.name}
              className="flex min-h-44 flex-col items-center justify-center rounded-[2rem] border border-[#ece7de] bg-white px-6 py-8 text-center shadow-[0_18px_40px_rgba(35,31,32,0.07)]"
            >
              <p
                className={`text-4xl font-semibold tracking-[-0.06em] ${partner.accent}`}
              >
                {partner.name}
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-[#7f7c7e]">
                {partner.subtitle}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#ff3117] px-4 py-12 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center">
            <Image
              src="/solimouv-blanc.svg"
              alt="Solimouv'"
              width={240}
              height={70}
              className="h-auto w-52 sm:w-64"
            />
          </div>

          <div className="mt-8 border-t border-dashed border-white/75 pt-8">
            <p className="text-2xl font-medium sm:text-4xl">Coordonnees</p>
            <p className="mt-5 text-xl leading-tight sm:text-3xl">
              20 Rue Brillat Savarin, 75013 Paris
            </p>
          </div>

          <div className="mt-8 border-t border-dashed border-white/75 pt-8">
            <p className="text-2xl font-medium sm:text-4xl">Liens utiles</p>
            <div className="mt-5 flex flex-col items-center gap-3 text-xl underline underline-offset-4 sm:text-3xl">
              <Link href="/politique-de-confidentialite">
                Politique de confidentialite
              </Link>
              <Link href="/mentions-legales">Mentions legales</Link>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-6">
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
        </div>
      </footer>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#ff3117] px-4 pb-12 pt-12 text-white sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col items-center justify-center text-center">
        <div className="relative max-w-4xl">
          <div className="absolute -left-4 top-5 hidden h-24 w-24 rounded-full bg-white/12 blur-2xl sm:block" />
          <div className="absolute -right-2 bottom-10 hidden h-28 w-28 rounded-full bg-white/10 blur-2xl sm:block" />

          <div className="relative mb-10 flex flex-col items-center gap-3 text-[#ff3117] sm:mb-14">
            <HeroSticker className="-rotate-[4deg] px-7 py-3 text-4xl sm:text-6xl">
              Le 6 juin
            </HeroSticker>
            <HeroSticker className="rotate-[2deg] px-8 py-4 text-3xl sm:text-5xl">
              Au centre sportif
            </HeroSticker>
            <HeroSticker className="translate-x-16 rotate-[1deg] px-7 py-3 text-3xl sm:translate-x-24 sm:text-5xl">
              Paris 13
            </HeroSticker>
          </div>

          <div className="flex justify-center">
            <Image
              src="/solimouv-blanc.svg"
              alt="Solimouv'"
              width={540}
              height={140}
              className="h-auto w-full max-w-[22rem] sm:max-w-[34rem]"
              priority
            />
          </div>
          <p className="mt-5 text-lg tracking-[0.12em] text-white/95 uppercase sm:text-2xl">
            Le festival du sport inclusif
          </p>

          <div className="mt-12 sm:mt-16">
            <Link
              href="/inscription"
              className="inline-flex min-w-[18rem] items-center justify-center rounded-full bg-white px-9 py-5 text-xl font-semibold tracking-[0.08em] text-[#231f20] shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-1"
            >
              Inscrivez vous
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSticker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-[1.75rem] bg-white font-black italic tracking-[-0.08em] shadow-[0_10px_18px_rgba(0,0,0,0.14)] ${className ?? ""}`}
    >
      {children}
    </span>
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
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-white/10 transition-colors hover:bg-white/20"
    >
      {children}
    </Link>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 19L19 5" />
      <path d="M9 5h10v10" />
    </svg>
  );
}

function WorkshopGlyph({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 7.5v5.5" />
      <path d="M8 10.5l4 2.5 4-2.5" />
      <path d="M9 19l3-4 3 4" />
    </svg>
  );
}

function DonationGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#231f20"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12 20s-6-3.6-6-9a3.5 3.5 0 0 1 6-2.1A3.5 3.5 0 0 1 18 11c0 5.4-6 9-6 9Z" />
      <path d="M12 7v8" />
      <path d="M9.5 10.5H14" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M13.3 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.7V11H8.2v2.8h2.4V21h2.7Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M6.7 8.8H4V20h2.7V8.8ZM5.3 4A1.6 1.6 0 1 0 5.3 7.3 1.6 1.6 0 0 0 5.3 4Zm14.7 8.9c0-3-1.6-4.4-3.9-4.4-1.8 0-2.6 1-3 1.7V8.8h-2.7V20h2.7v-6c0-1.6.3-3.1 2.3-3.1s2 1.9 2 3.2V20H20v-7.1Z" />
    </svg>
  );
}

function YogaIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <path
        d="M244 29c7 17 9 39 4 54-12 33-7 56 2 87"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M195 64c24 17 38 37 43 59 6 27 14 39 35 62"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M170 110c27-2 52 2 74 13"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M139 177c25-9 38-22 40-37 3-16 9-33 17-47"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="183" cy="82" r="11" fill="none" stroke="#111111" strokeWidth="4" />
      <path
        d="M0 216h320"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.18"
        strokeWidth="3"
      />
    </svg>
  );
}

function BoxingIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <circle cx="201" cy="62" r="16" fill="none" stroke="#111111" strokeWidth="4" />
      <path
        d="M173 95c13 4 22 12 30 22l23 28m-40-20l-34 22m42-49c16-2 30 7 47 27m-34-32l43 7m-63 9l-23 27m-15 10l29 33"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M136 214h184"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.18"
        strokeWidth="3"
      />
    </svg>
  );
}

function BasketIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <circle cx="126" cy="88" r="18" fill="none" stroke="#111111" strokeWidth="4" />
      <path
        d="M108 126c20-8 36-7 52 2m-40-8l-16 34m34-22c9 20 13 37 13 56m-48-27L70 213m58-55l59 20"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="173" cy="189" r="28" fill="none" stroke="#111111" strokeWidth="4" />
      <path
        d="M145 189h56m-28-28c12 8 20 17 24 28m-24-28c-9 8-16 17-19 28"
        fill="none"
        stroke="#111111"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FootballIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <circle cx="213" cy="70" r="16" fill="none" stroke="#111111" strokeWidth="4" />
      <path
        d="M193 95c-17 4-31 16-43 35m44-33c12 8 17 23 17 44m-47-9l-40 20m63-13l23 43m-78-49l-6 52m79-44c17 5 35 11 59 23"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="277" cy="194" r="24" fill="none" stroke="#111111" strokeWidth="4" />
      <path
        d="M263 177l14-7 13 7-2 16-11 8-14-8-1-16Z"
        fill="none"
        stroke="#111111"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function BadmintonIllustration() {
  return (
    <svg viewBox="0 0 640 220" className="h-full w-full" aria-hidden="true">
      <path
        d="M84 138c11-24 26-46 46-65m-73 8c17-7 36-7 56 0m18-20c4 12 5 24 3 36m44 58l23-24m-31 6l34 18m275-5c14-24 31-45 53-62m-80 8c18-7 40-7 61 0m20-19c4 12 5 23 3 35m42 60l26-28m-33 9l35 19"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="111" cy="116" r="18" fill="none" stroke="#111111" strokeWidth="4" />
      <circle cx="528" cy="120" r="18" fill="none" stroke="#111111" strokeWidth="4" />
      <path
        d="M96 134c18 8 28 22 28 42m-12-24l-42 27m69-39c18-8 35-8 52 1m319 0c18-8 35-8 52 1m-8 11c19 8 29 22 29 42m-10-24l-44 27m-56-64c18 8 28 22 28 42"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M280 148l17-17 17 17m-14-24l8-42m7 16l-15-11-14 11"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 214h640"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.18"
        strokeWidth="3"
      />
    </svg>
  );
}

function DonationIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <path
        d="M164 90c16-18 44-17 61 0 14 14 16 39 5 55-10 14-28 18-41 32-11-14-31-19-40-35-9-16-4-39 15-52Z"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M215 96c18 6 33 20 43 40m-75 10c-14 13-20 29-18 48m52-42l26-8m4 1c7 12 10 28 9 47"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="117" cy="69" r="7" fill="none" stroke="#111111" strokeWidth="3" />
      <circle cx="95" cy="89" r="7" fill="none" stroke="#111111" strokeWidth="3" />
      <path
        d="M82 49l8 13m21-21l13 8m16 29l13 1"
        fill="none"
        stroke="#111111"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M248 129c17-10 35-11 52-4m-47 7c10 12 14 28 12 49m-1-48l33 11m-58-13c-6 22-7 41-3 58"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 214h320"
        fill="none"
        stroke="#111111"
        strokeOpacity="0.18"
        strokeWidth="3"
      />
    </svg>
  );
}
