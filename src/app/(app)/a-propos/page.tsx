import Image from "next/image";
import Link from "next/link";

const storyParagraphs = [
  "Le projet est né d'une envie simple : Proposer une experience plus chaleureuse, plus inclusive et plus vivante pour celles et ceux qui veulent bouger ensemble, se retrouver et creer de vraies connexions.",
  "L'aventure Up Sport ! commence il y a 10 ans avec deux bénévoles et une mission : rendre le sport accessible à tous, notamment aux personnes en situation de précarité et de fragilité. Dès le départ, l'association s'inscrit dans une démarche de sport inclusif à Paris, au service du bien-être et de l'inclusion par le sport.",
  "Les premières séances de sport adapté réunissent une dizaine de femmes en fragilité psychiatrique dans un centre social du 15ᵉ arrondissement. Malgré des débuts parfois atypiques, les bienfaits du sport santé se font rapidement sentir : apaisement, confiance retrouvée et amélioration du quotidien.",
  "Aujourd'hui, Up Sport ! rassemble 5 salariés et 25 bénévoles engagés pour favoriser l'accès au sport pour tous. L'association accompagne des centaines de personnes chaque année, créant du lien social et redonnant à chacun une place grâce au sport solidaire à Paris.",
];

const valuesParagraphs = [
  "Chez Up Sport !, nous défendons une vision forte : celle de l'inclusion par le sport, fondée sur l'échange, le partage et la mixité sociale. À travers chaque séance, nous créons un environnement propice au vivre-ensemble, où chacun peut trouver sa place, quel que soit son parcours.",
  "Nos valeurs, nous y croyons, mieux : nous les vivons !",
  "Bénévoles et bénéficiaires, venus d'horizons différents, construisent ensemble des liens sociaux durables. Cette dynamique collective permet de sortir de l'isolement et de favoriser des rencontres enrichissantes, où chacun apporte et reçoit.",
  "Au cœur de notre action, l'activité physique agit comme un levier puissant. Elle favorise l'épanouissement personnel, redonne confiance et contribue à une meilleure intégration sociale, permettant à chacun de se reconstruire et de s'inscrire pleinement dans la société.",
];

const valueCards = [
  { title: "Rencontrer", description: "Des formats simples pour encourager les premiers échanges.", bg: "bg-[#4200fe]" },
  { title: "Participer", description: "Des activités ouvertes, visibles et faciles à rejoindre.", bg: "bg-[#f238a7]" },
  { title: "Partager", description: "Des souvenirs collectifs qui donnent envie de recommencer.", bg: "bg-[#ff270b]" },
];

const testimonials = [
  {
    quote: "Avec Up Sport ! je suis très heureux. Je suis vraiment content de pouvoir bénéficier de ces séances de sport chaque semaine et très heureux de pouvoir retrouver tout le monde lors des activités. Etant quelqu'un avec beaucoup d'énergie, le sport est la seule chose que j'aime qui me permet de me calmer. J'espère continuer encore longtemps avec vous tous et toutes, encore merci et vive Up Sport !",
    author: "Aziz",
    role: "Up Sportif",
  },
  {
    quote: "Avec Up Sport ! j'ai profité d'une vraie remise en forme. Pour le moral, on dit que faire du sport produit des endorphines, je confirme. L'association m'a permis de reprendre confiance en moi, de m'aider à trouver un rythme de vie ponctué par les activités sportives hebdomadaires.",
    author: "Laurence",
    role: "Up Sportive",
  },
];

const socialLinks = [
  { href: "https://www.facebook.com/upsportunispourlesport", label: "Facebook", icon: <FacebookIcon /> },
  { href: "https://www.instagram.com/unispourlesport/", label: "Instagram", icon: <InstagramIcon /> },
  { href: "https://www.linkedin.com/company/up-sport-unis-pour-le-sport/", label: "LinkedIn", icon: <LinkedInIcon /> },
];

const T = "text-[24px] font-black italic tracking-[-0.06em]";
const B = "text-base leading-relaxed";

export default function AProposPage() {
  return (
    <div className="bg-[#fbfbfb] text-[#211f1f]">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-14 lg:px-8">
        <div className="absolute left-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-[#4200fe]/8 blur-3xl" />
        <div className="absolute right-[-5rem] top-20 h-56 w-56 rounded-full bg-[#ff270b]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mt-8 max-w-4xl">
            <HeroSticker>Qui nous sommes ?</HeroSticker>
            <h1 className={`mt-8 ${T} text-[#211f1f]`}>Notre histoire</h1>
          </div>
        </div>
      </section>

      <main className="px-4 pb-0 sm:px-6 lg:px-8 pt-10">
        {/* Notre histoire */}
        <section className="mx-auto max-w-6xl">
          <div className={`max-w-5xl space-y-5 ${B} text-[#0a0a0a]`}>
            {storyParagraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-10 overflow-hidden rounded-[2.25rem] shadow-[0_28px_60px_rgba(35,31,32,0.12)]">
            <Image src="/blog/concept-image.jpeg" alt="Participants jouant ensemble sur un terrain extérieur" width={1152} height={768} className="h-auto w-full object-cover" sizes="(max-width: 768px) 100vw, 72rem" />
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="mx-auto mt-14 max-w-6xl">
          <h2 className={`${T} text-[#211f1f]`}>Nos valeurs</h2>
          <div className={`mt-6 max-w-5xl space-y-5 ${B} text-[#0a0a0a]`}>
            {valuesParagraphs.map((p, i) => (
              <p key={p} className={i === 1 ? "font-semibold italic" : undefined}>
                {i === 1 ? `« ${p} »` : p}
              </p>
            ))}
          </div>
          <div className="mt-8 grid gap-4">
            {valueCards.map((card) => (
              <article key={card.title} className={`${card.bg} rounded-[2rem] px-7 py-7 text-white shadow-[0_20px_40px_rgba(35,31,32,0.12)] sm:px-8 sm:py-8`}>
                <h3 className={T}>{card.title}</h3>
                <p className={`mt-3 ${B} text-white/90`}>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Nos témoignages */}
        <section className="mx-auto mt-14 max-w-6xl">
          <h2 className={`${T} text-[#211f1f]`}>Nos témoignages</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="flex flex-col justify-between rounded-[2rem] border border-[#e8e4de] bg-white px-7 py-7 shadow-[0_8px_32px_rgba(35,31,32,0.07)] sm:px-8 sm:py-8">
                <div>
                  <QuoteIcon />
                  <p className={`mt-4 ${B} text-[#211f1f]`}>{t.quote}</p>
                </div>
                {t.author && (
                  <footer className="mt-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff270b]/15 text-sm font-black text-[#ff270b]">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="text-base font-semibold tracking-[-0.02em] text-[#211f1f]">{t.author}</p>
                      <p className="text-sm text-[#211f1f]/50">{t.role}</p>
                    </div>
                  </footer>
                )}
              </blockquote>
            ))}
          </div>
        </section>

        {/* Don */}
        <section className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-t-[2.4rem] bg-[#4200fe] px-6 py-9 text-white shadow-[0_28px_60px_rgba(66,0,254,0.24)] sm:px-10 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-start justify-between gap-4">
                <h2 className={T}>Nous aider en faisant un don</h2>
                <ArrowIcon className="mt-1 h-5 w-5 shrink-0" />
              </div>
              <p className={`mt-4 ${B} text-white/90`}>
                Notre association étant 90 % bénévole et ne disposant que de très faibles subventions publiques, toute aide est la bienvenue !
              </p>
            </div>
            <Link href="/dons" className="inline-flex w-fit items-center justify-center rounded-full bg-white px-7 py-4 text-base font-semibold text-[#211f1f] transition-transform hover:-translate-y-1">
              Faire un don
            </Link>
          </div>

          {/* Carte don — illustration retirée */}
          <Link href="/dons" className="mt-8 block overflow-hidden rounded-[2rem] bg-white p-5 text-[#211f1f] shadow-[0_24px_50px_rgba(15,0,82,0.18)] transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={`${T} uppercase`}>Don</p>
                <p className={`mt-3 ${B} text-[#211f1f]/70`}>
                  Contribuez à financer des activités accessibles, des temps de rencontre et l&apos;accompagnement des publics les plus fragiles.
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fef200]">
                <DonationGlyph />
              </span>
            </div>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#ff270b] px-4 py-12 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center">
            <Image src="/blog/blanc-solimouv.svg" alt="Solimouv'" width={240} height={70} className="h-auto w-52 sm:w-64" />
          </div>
          <div className="mt-8 border-t border-dashed border-white/75 pt-8">
            <p className={T}>Coordonnées</p>
            <p className={`mt-4 ${B}`}>20 Rue Brillat Savarin, 75013 Paris</p>
          </div>
          <div className="mt-8 border-t border-dashed border-white/75 pt-8">
            <p className={T}>Liens utiles</p>
            <div className="mt-5 flex justify-center gap-6">
              {socialLinks.map((link) => (
                <Link key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-white/10 transition-colors hover:bg-white/20">
                  {link.icon}
                </Link>
              ))}
            </div>
            <div className={`mt-6 flex flex-col items-center gap-3 ${B} underline underline-offset-4`}>
              <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
              <Link href="/mentions-legales">Mentions légales</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroSticker({ children }: { children: React.ReactNode }) {
  return (
    <span className="-rotate-3 inline-flex rounded-[20px] border border-[#d8d5d0] bg-white px-6 py-3 text-[24px] font-black italic tracking-[-0.06em] text-[#ff270b] shadow-[0_10px_24px_rgba(35,31,32,0.08)]">
      {children}
    </span>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
      <path d="M0 24V14.4C0 10.4 1.06667 7.06667 3.2 4.4C5.38667 1.73333 8.53333 0.266667 12.64 0L13.76 2.24C11.2533 2.72 9.33333 3.84 8 5.6C6.72 7.30667 6.08 9.28 6.08 11.52H12.8V24H0ZM19.2 24V14.4C19.2 10.4 20.2667 7.06667 22.4 4.4C24.5867 1.73333 27.7333 0.266667 31.84 0L32 2.24C29.4933 2.72 27.5733 3.84 26.24 5.6C24.96 7.30667 24.32 9.28 24.32 11.52H31.04V24H19.2Z" fill="#ff270b" fillOpacity="0.18" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 19L19 5" /><path d="M9 5h10v10" />
    </svg>
  );
}

function DonationGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#211f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M12 20s-6-3.6-6-9a3.5 3.5 0 0 1 6-2.1A3.5 3.5 0 0 1 18 11c0 5.4-6 9-6 9Z" />
      <path d="M12 7v8M9.5 10.5H14" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M13.3 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.7V11H8.2v2.8h2.4V21h2.7Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M6.8 8.6a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM5.3 9.8h3v8.9h-3V9.8Zm4.9 0H13v1.2h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v4.6h-3v-4.1c0-1 0-2.2-1.3-2.2s-1.5 1.1-1.5 2.1v4.2h-3V9.8Z" />
    </svg>
  );
}
