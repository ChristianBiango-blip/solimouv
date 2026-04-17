import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://www.facebook.com/upsportunispourlesport",
    label: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    href: "https://www.instagram.com/unispourlesport/",
    label: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    href: "https://www.linkedin.com/company/up-sport-unis-pour-le-sport/",
    label: "LinkedIn",
    icon: <LinkedInIcon />,
  },
];

export default function YogaPage() {
  return (
    <div className="bg-[#211f1f] text-white">
      {/* Header & description */}
      <section className="px-6 pb-10 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-4">
            <Link
              href="/ateliers"
              aria-label="Retour aux ateliers"
              className="flex h-10 w-10 shrink-0 items-center justify-center text-white/70 transition-colors hover:text-white"
            >
              <ChevronLeftIcon />
            </Link>

            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff270b]">
                <YogaIcon />
              </span>
              <h1 className="text-[1.5rem] font-black italic leading-none tracking-[-0.06em] text-white sm:text-[2rem]">
                Le Yoga adapté
              </h1>
            </div>
          </div>

          <p className="mt-6 text-[1rem] leading-[1.5] tracking-[-0.04em] text-white/90 sm:text-[1.125rem]">
            Découvrez le{" "}
            <strong className="font-semibold text-white">yoga</strong>, une
            pratique qui relie le corps et l&apos;esprit pour apporter équilibre
            et sérénité.
            <br />
            Grâce aux postures, à la respiration et à la méditation, il aide à
            réduire le stress et à améliorer le bien-être. Accessible à tous, le
            yoga est une invitation à prendre soin de soi au quotidien.
          </p>
        </div>
      </section>

      {/* Illustration */}
      <section className="px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#fbfbfb] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
            <div className="h-56 sm:h-72">
              <YogaIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Event stickers + CTA */}
      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-start gap-3">
            <HeroSticker className="rotate-[2deg]">
              Au centre sportif
            </HeroSticker>
            <HeroSticker className="-rotate-3">LE 6 JUIN</HeroSticker>
            <HeroSticker className="translate-x-10 -rotate-[2deg]">
              Paris 13
            </HeroSticker>
          </div>

          <div className="mt-10">
            <Link
              href="/inscription-festival"
              className="flex w-full items-center justify-center rounded-full bg-[#fbfbfb] px-9 py-4 text-[1rem] font-semibold tracking-[-0.02em] text-[#211f1f] shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-0.5 sm:text-[1.125rem]"
            >
              Inscrivez vous au festival
            </Link>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="bg-white px-6 py-8 text-[#211f1f] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-[1.5rem] font-black italic leading-none tracking-[-0.06em] sm:text-[2rem]">
            Nos partenaires
          </h2>
          <div className="mt-6 flex items-end justify-around gap-6 sm:justify-start sm:gap-16">
            <BerryBoisForetsLogo />
            <GMALogo />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#ff270b] px-4 py-12 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center">
            <Image
              src="/solimouv-blanc.svg"
              alt="Solimouv'"
              width={220}
              height={52}
              className="h-auto w-44 sm:w-56"
            />
          </div>

          <div className="mt-8 border-t border-dashed border-white/75 pt-8">
            <p className="text-xl font-medium sm:text-2xl">Coordonnées</p>
            <p className="mt-4 text-base leading-tight sm:text-lg">
              20 Rue Brillat Savarin, 75013 Paris
            </p>
          </div>

          <div className="mt-8 border-t border-dashed border-white/75 pt-8">
            <p className="text-xl font-medium sm:text-2xl">Liens utiles</p>
            <div className="mt-5 flex justify-center gap-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/10 transition-colors hover:bg-white/20"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 text-base underline underline-offset-4 sm:text-lg">
              <Link href="/politique-de-confidentialite">
                Politique de confidentialité
              </Link>
              <Link href="/mentions-legales">Mentions légales</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
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
      className={`inline-flex rounded-[1.25rem] bg-white px-5 py-2 text-[1.5rem] font-black italic tracking-[-0.08em] text-[#ff270b] shadow-[0_6px_18px_rgba(0,0,0,0.18)] sm:text-[1.75rem] ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function YogaIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <circle cx="10" cy="4.2" r="2.2" fill="none" />
      <path d="M10 6.8v4.2m-3.8.4 3.8-1.7 3.8 1.7M7.1 16.5l2.9-3 2.9 3" />
    </svg>
  );
}

function YogaIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden="true">
      <path
        d="M150 22c7 0 12 4.5 12 11.3 0 7.2-5.4 12.1-12.8 12.1-6.4 0-11.2-4.2-11.2-10.4 0-7.4 5.5-13 12-13Z"
        fill="none"
        stroke="#161616"
        strokeWidth="2.5"
      />
      <path
        d="M150.5 46.5c6 6.1 8.5 13 7.8 21.7m-8.8-4.6c-5 2.9-10 7.8-14.9 14.5m20-10.4c-.9 9.8-1.2 19.9-.5 30.5m-1.2 0c-15.1-1-29.4-.2-43 2.1m43.3-17.1c9.4 9.4 17.9 18.7 25.4 28m-45.6-33.7c-10.3 10-17.1 19.4-20.5 28.6m39.2-9.5L115 130"
        fill="none"
        stroke="#161616"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <path
        d="M80 145c0 15 31.3 22.5 70 22.5S220 160 220 145"
        fill="none"
        stroke="#161616"
        strokeOpacity="0.15"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
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
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M6.8 8.6a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM5.3 9.8h3v8.9h-3V9.8Zm4.9 0H13v1.2h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v4.6h-3v-4.1c0-1 0-2.2-1.3-2.2s-1.5 1.1-1.5 2.1v4.2h-3V9.8Z" />
    </svg>
  );
}

function BerryBoisForetsLogo() {
  return (
    <div className="leading-none text-[#243287]">
      <div className="text-[18px] font-semibold tracking-[-0.08em] sm:text-[26px]">BERRY</div>
      <div className="text-[10px] font-medium tracking-[0.1em] text-[#b07437] sm:text-[14px]">BOIS</div>
      <div className="text-[17px] font-light tracking-[-0.06em] text-[#6daa52] sm:text-[24px]">FORÊTS</div>
    </div>
  );
}

function GMALogo() {
  return (
    <div className="flex flex-col items-center text-[#555b67]">
      <svg viewBox="0 0 34 50" fill="none" className="h-9 w-6 sm:h-12 sm:w-8" aria-hidden="true">
        <path d="M16.8 2c4.8 6.3 8.6 10.6 8.6 17.2A8.6 8.6 0 1 1 8.2 19.2C8.2 12.7 12 8.4 16.8 2Z" fill="#76c5ef" />
        <path d="M19.4 23c5.6 4.9 9.6 8.4 9.6 13.8a9.6 9.6 0 1 1-19.2 0c0-5.3 4-8.9 9.6-13.8Z" fill="#b8d764" />
      </svg>
      <div className="mt-1 text-[20px] font-light tracking-[-0.08em] sm:text-[28px]">GMA</div>
      <div className="text-[5px] uppercase tracking-[0.1em] text-[#6a6f79] sm:text-[6px]">
        Gaz & matériel d&apos;Auvergne
      </div>
    </div>
  );
}
