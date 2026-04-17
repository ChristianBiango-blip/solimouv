import type { Metadata } from "next";
import Image from "next/image";
import HomeEventCarousel from "./components/HomeEventCarousel";
import Link from "next/link";
import LandingDownloadButton from "./components/LandingDownloadButton";
import {
  defaultOgImage,
  defaultOgImageHeight,
  defaultOgImageWidth,
  getFestivalEventSchema,
  getOrganizationSchema,
  getWebsiteSchema,
  siteDescription,
  siteName,
  siteOrigin,
  toAbsoluteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: `${siteName} — Festival Sport & Inclusion, Paris 13`,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteOrigin,
    title: `${siteName} — Festival Sport & Inclusion, Paris 13`,
    description: siteDescription,
    images: [
      {
        url: toAbsoluteUrl(defaultOgImage),
        alt: "Festival Solimouv' — sport inclusif à Paris",
        width: defaultOgImageWidth,
        height: defaultOgImageHeight,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Festival Sport & Inclusion, Paris 13`,
    description: siteDescription,
    images: [toAbsoluteUrl(defaultOgImage)],
  },
};

const eventCards = [
  {
    title: "Rencontres locales",
    description: "Des groupes qui se forment naturellement autour d'envies communes.",
    image: "/blog/event-1.jpeg",
    alt: "Activité sportive accompagnée sur le terrain",
    imageClassName: "landing-event-image-portrait",
  },
  {
    title: "Expériences en mouvement",
    description: "Marches, activités, scènes partagées et élan collectif dans une même journée.",
    image: "/blog/event-2.png",
    alt: "Pratique sportive inclusive en fauteuil roulant",
  },
  {
    title: "Moments solidaires",
    description: "Un cadre vivant pour s'engager, transmettre et célébrer ensemble.",
    image: "/blog/event-ping-pong.png",
    alt: "Partie de tennis de table en plein air",
  },
  {
    title: "Instants partagés",
    description: "Une ambiance conviviale où chaque présence compte vraiment.",
    image: "/blog/event-4.png",
    alt: "Activité sportive inclusive en salle",
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/unispourlesport/", icon: "/Instagram.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/up-sport-unis-pour-le-sport/", icon: "/Linkdin.svg" },
  { label: "Facebook", href: "https://www.facebook.com/upsportunispourlesport", icon: "/Facebook.svg" },
  { label: "Site web", href: "https://www.unispourlesport.paris/", icon: "/globe.svg" },
];

export default function Home() {
  const structuredData = [
    getWebsiteSchema(),
    getOrganizationSchema(),
    getFestivalEventSchema(),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Navbar — logo only */}
      <header className="sticky top-0 z-40 bg-brand-primary">
        <div className="container-custom">
          <div className="flex h-16 items-center">
            <a
              href="#hero"
              aria-label="Accueil Solimouv"
              className="relative h-7 w-36 shrink-0"
            >
              <Image
                src="/blog/blanc-solimouv.svg"
                alt="Solimouv"
                fill
                className="object-contain object-left"
                priority
              />
            </a>
          </div>
        </div>
      </header>
      <div className="landing-page" id="hero">
      <section className="landing-hero-shell">
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <p className="landing-hero-kicker">
              Rencontres, activités, engagement, moments partagés
            </p>
            <h1>Vivez des expériences qui vous rapprochent des autres</h1>
            <Link
              href="/inscription"
              className="landing-download-cta"
              style={{ color: "#000000" }}
            >
              Inscrivez-vous
            </Link>
          </div>

          <section
            className="landing-immersive-media"
            id="video-experience"
            aria-label="Photo immersive Solimouv"
          >
            <div className="landing-hero-photo" aria-label="Photo immersive Solimouv">
              <div className="landing-video-overlay">
                <span className="landing-video-badge">Ambiance Solimouv</span>
                <h2>Des visages, des sourires, des mouvements qui deviennent de vrais liens.</h2>
              </div>
            </div>
          </section>
        </section>
      </section>

      <main id="main-content">
        <section className="landing-concept-section" id="concept">
          <div className="landing-concept-visual-wrap">
            <div className="landing-organic-shape" aria-hidden="true"></div>
            <div className="landing-concept-visual">
              <div className="landing-concept-portrait landing-portrait-single">
                <Image
                  src="/blog/concept-image.jpeg"
                  alt="Moment de jeu et de partage sur un terrain"
                  fill
                  sizes="(max-width: 960px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="landing-concept-copy">
            <h2>Notre concept</h2>
            <p>
              Solimouv crée des occasions simples et vraies de se rencontrer autour
              d’activités, d’initiatives locales et d’expériences partagées qui
              remettent l’humain au centre.
            </p>
            <p>
              La plateforme relie celles et ceux qui veulent bouger, participer,
              s’engager et vivre des instants réels, dans une ambiance chaleureuse qui
              transforme chaque rencontre en souvenir collectif.
            </p>
          </div>
        </section>

        <section className="landing-event-section" id="event">
          <div className="landing-section-heading">
            <h2>Notre événement</h2>
            <p>
              Des formats vivants pour se retrouver, participer et créer une énergie
              commune.
            </p>
          </div>

          <HomeEventCarousel events={eventCards} />
        </section>

        <section className="landing-location-section" id="location">
          <div className="landing-location-copy">
            <h2>L’adresse du lieu</h2>

            <div className="landing-location-block">
              <h3><span aria-hidden="true">📍</span> Centre Sportif Charles Moureu, 75013 Paris</h3>
              <p>
                Le rendez-vous se tient au Centre Sportif Charles Moureu, au cœur du
                13e arrondissement de Paris.
              </p>
            </div>

            <div className="landing-location-block">
              <h3><span aria-hidden="true">📆</span> Samedi 6 juin 2026 de 10h à 18h</h3>
              <p>
                Une journée complète de rencontres, d’activités et de moments partagés
                vous attend sur place.
              </p>
            </div>

            <div className="landing-location-block">
              <h3><span aria-hidden="true">♿</span> Site accessible</h3>
              <p>
                Le site est accessible aux personnes à mobilité réduite pour permettre
                à chacun de profiter de l’événement.
              </p>
            </div>

            <div className="landing-location-block">
              <h3><span aria-hidden="true">🎟</span> Entrée gratuite</h3>
              <p>
                Entrée gratuite, inscription sur place. Pour toute information
                complémentaire, écrivez à
                {" "}
                <a className="landing-inline-link" href="mailto:unispourlesport@yahoo.fr">
                  unispourlesport@yahoo.fr
                </a>
                .
              </p>
            </div>
          </div>

          <div className="landing-location-media">
            <div className="landing-location-image-block" aria-label="Carte du lieu">
              <Image
                src="/blog/adresse-lieu-map.jpg"
                alt="Carte du Centre Sportif Charles Moureu à Paris"
                width={1471}
                height={768}
              />
            </div>
          </div>
        </section>

        <section className="landing-app-section" id="application">
          <div className="landing-app-copy">
            <h2>L’application qui rassemble les gens en mouvement</h2>
            <p>
              Retrouvez les rencontres, activités et événements Solimouv dans une
              expérience mobile simple, fluide et humaine.
            </p>
          </div>

          <div className="landing-store-buttons">
            <LandingDownloadButton />
          </div>

          <div
            className="relative mx-auto mt-14 w-full max-w-sm sm:max-w-md lg:max-w-lg"
            aria-label="Aperçu de l'application Solimouv"
          >
            <div className="landing-floating-card landing-float-left-top">+ 500 participants</div>
            <div className="landing-floating-card landing-float-right-top">15 associations</div>
            <Image
              src="/mockup.webp"
              alt="Capture d'écran de l'application Solimouv"
              width={1080}
              height={1350}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 512px"
              className="h-auto w-full rounded-3xl shadow-[0_30px_80px_rgba(66,0,254,0.25)]"
              priority
            />
          </div>
        </section>

        <section className="landing-contact-section" id="contact">
          <div className="landing-contact-info">
            <h2>Comment pouvons-nous vous aider ?</h2>
            <p>
              Nous accompagnons vos demandes autour des événements, de l’application et
              des collaborations locales.
            </p>

            <div className="landing-contact-message">
              <p>
                Une question ? Une remarque ? Envie d’en savoir plus pour vous ou pour
                des personnes que vous accompagnez ? N’hésitez pas à nous envoyer un
                message, nous veillerons à vous répondre dans les plus brefs délais.
              </p>
              <p>Vous pouvez nous joindre via :</p>
              <p>
                <strong>email :</strong>
                {" "}
                <a className="landing-inline-link" href="mailto:contact@unispourlesport.paris">
                  contact@unispourlesport.paris
                </a>
              </p>
            </div>

            <nav className="landing-social-links" aria-label="Réseaux sociaux Solimouv">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  className="landing-social-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  <Image src={link.icon} alt={link.label} width={20} height={20} />
                </a>
              ))}
            </nav>
          </div>

          <div className="landing-contact-form-wrap">
            <form className="landing-contact-form" aria-label="Formulaire de contact" noValidate>
              <div className="landing-form-row">
                <label htmlFor="contact-first-name">
                  <span>Prénom</span>
                  <input id="contact-first-name" type="text" name="first-name" placeholder="Votre prénom" autoComplete="given-name" />
                </label>
                <label htmlFor="contact-last-name">
                  <span>Nom</span>
                  <input id="contact-last-name" type="text" name="last-name" placeholder="Votre nom" autoComplete="family-name" />
                </label>
              </div>

              <label htmlFor="contact-email">
                <span>Email</span>
                <input id="contact-email" type="email" name="email" placeholder="vous@exemple.com" autoComplete="email" />
              </label>

              <label htmlFor="contact-phone">
                <span>Téléphone</span>
                <input id="contact-phone" type="tel" name="phone" placeholder="+33 6 00 00 00 00" autoComplete="tel" />
              </label>

              <label htmlFor="contact-message">
                <span>Message</span>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Parlez-nous de votre besoin"
                ></textarea>
              </label>

              <button className="landing-submit-button" type="submit">
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
