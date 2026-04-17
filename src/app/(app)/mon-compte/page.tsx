"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const PARTICIPATION_COUNT = 0;
const FESTIVAL_LOCATION = "Adresse communiquee apres confirmation";

const participationLinks = [
  {
    href: "/atelier",
    label: "Voir les ateliers",
    description: "Retrouver les activites et preparer sa prochaine participation.",
    icon: "🗓️",
  },
  {
    href: "/contact",
    label: "Soutenir Solimouv'",
    description: "Contribuer a la cagnotte ou proposer un coup de main utile.",
    icon: "💸",
  },
  {
    href: "/a-propos",
    label: "FAQ",
    description: "Comprendre le festival, son fonctionnement et les infos utiles.",
    icon: "❓",
  },
];

const legalLinks = [
  {
    href: "/contact",
    label: "Donnees personnelles",
    description: "Poser une question ou demander l'acces a ses informations.",
    icon: "🔐",
  },
  {
    href: "/politique-de-confidentialite",
    label: "Politique de confidentialite",
    description: "Consulter les engagements de protection des donnees.",
    icon: "📄",
  },
  {
    href: "/mentions-legales",
    label: "Mentions legales",
    description: "Retrouver les informations legales de Solimouv'.",
    icon: "⚖️",
  },
];

const contactLinks = [
  {
    href: "/contact",
    label: "Nous contacter",
    description: "Une question precise ? L'equipe peut vous repondre directement.",
    icon: "📧",
  },
  {
    href: "/a-propos",
    label: "Reseaux sociaux",
    description: "Les acces sociaux seront ajoutes ici des qu'ils sont confirmes.",
    icon: "📱",
  },
];

function getFirstName(name?: string | null) {
  return name?.trim().split(/\s+/)[0] ?? "";
}

function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.trim() || "S";
  return source.slice(0, 1).toUpperCase();
}

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/82 p-5 shadow-[0_24px_80px_rgba(17,24,39,0.08)] backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-primary/70">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-black text-gray-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ActionRow({
  href,
  label,
  description,
  icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-[1.4rem] border border-gray-200/80 bg-white px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-[0_18px_40px_rgba(66,0,254,0.10)]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-xl text-white">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-950">{label}</p>
        <p className="mt-1 text-sm leading-5 text-gray-500">{description}</p>
      </div>
      <div className="text-lg text-gray-300 transition-colors group-hover:text-brand-primary">
        ›
      </div>
    </Link>
  );
}

export default function MonComptePage() {
  const { data: session } = useSession();
  const firstName = getFirstName(session?.user?.name);
  const initials = getInitials(session?.user?.name, session?.user?.email);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,#ffe1f2_0%,#fff7ea_28%,#f6f7ff_65%,#eef2ff_100%)] pb-28 pt-6 lg:pb-12">
      <div className="container-custom mx-auto flex max-w-3xl flex-col gap-5">
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gray-950 px-5 pb-6 pt-7 text-white shadow-[0_30px_120px_rgba(17,24,39,0.30)]">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-secondary/30 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-28 w-28 rounded-full bg-brand-primary/40 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(135deg,#4200fe_0%,#8b5cf6_45%,#f238a7_100%)] text-4xl font-black shadow-[0_18px_45px_rgba(66,0,254,0.45)]">
              {initials}
            </div>

            <div className="mt-5 space-y-2">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1 text-sm text-white/80 backdrop-blur">
                Mon compte
              </span>
              <h1 className="text-3xl font-black">
                {firstName || "Bienvenue"}
              </h1>
              <p className="mx-auto max-w-md text-sm leading-6 text-white/70">
                Retrouvez vos participations, les infos utiles du festival et
                les acces de contact au meme endroit.
              </p>
            </div>

            {session?.user?.email && (
              <p className="mt-3 text-sm text-white/60">{session.user.email}</p>
            )}
          </div>
        </section>

        <SectionCard eyebrow="Participations" title="Mes participations">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
              <div className="rounded-[1.6rem] bg-[linear-gradient(135deg,#4200fe_0%,#f238a7_100%)] p-5 text-white">
                <p className="text-sm text-white/75">Mes participations</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-5xl font-black">{PARTICIPATION_COUNT}</span>
                  <span className="pb-1 text-sm text-white/80">
                    activite{PARTICIPATION_COUNT > 1 ? "s" : ""} reservee
                    {PARTICIPATION_COUNT > 1 ? "s" : ""}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/80">
                  Votre historique sera enrichi a mesure que les inscriptions
                  seront connectees a l&apos;espace compte.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-gray-200 bg-[#fffaf4] p-5">
                <p className="text-sm font-semibold text-gray-600">
                  Localisation
                </p>
                <p className="mt-2 text-lg font-black text-gray-950">
                  {FESTIVAL_LOCATION}
                </p>
                <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-white bg-[linear-gradient(180deg,#f8d7e8_0%,#efe7ff_42%,#ffffff_100%)] p-4">
                  <div className="relative h-28 rounded-[1.1rem] bg-[linear-gradient(135deg,#ffffff_0%,#f6f7ff_100%)]">
                    <div className="absolute left-5 top-6 h-2 w-24 rounded-full bg-brand-primary/15" />
                    <div className="absolute left-16 top-16 h-2 w-20 rounded-full bg-brand-secondary/20" />
                    <div className="absolute left-10 top-12 h-10 w-10 rounded-full border-8 border-brand-accent/15" />
                    <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-950 text-xl text-white shadow-[0_12px_30px_rgba(17,24,39,0.22)]">
                      📍
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                      Apercu carte
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {participationLinks.map((link) => (
                <ActionRow key={link.label} {...link} />
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Parametres" title="Parametres & legal">
          <div className="space-y-3">
            {legalLinks.map((link) => (
              <ActionRow key={link.label} {...link} />
            ))}

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center justify-between rounded-[1.4rem] border border-red-200 bg-red-50 px-4 py-4 text-left text-red-700 transition-colors hover:bg-red-100"
            >
              <div>
                <p className="text-sm font-semibold">Se deconnecter</p>
                <p className="mt-1 text-sm text-red-500">
                  Quitter la session et revenir a l&apos;accueil public.
                </p>
              </div>
              <span className="text-lg">↗</span>
            </button>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Contact" title="Contact direct">
          <div className="space-y-3">
            {contactLinks.map((link) => (
              <ActionRow key={link.label} {...link} />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
