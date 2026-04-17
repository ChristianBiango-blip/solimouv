import { env } from "@/config/env";
import type { BlogArticle } from "@/content/blog";

const fallbackSiteUrl = "http://localhost:3000";

export const siteUrl = new URL(env.NEXTAUTH_URL || fallbackSiteUrl);
export const siteOrigin = siteUrl.toString().replace(/\/$/, "");

export const siteName = "Solimouv'";
export const siteDescription =
  "Solimouv' est le festival organisé par Up Sport ! qui promeut l'accessibilité du sport pour toutes et tous.";
export const defaultOgImage = "/blog/event-1.jpeg";
export const defaultOgImageWidth = 1200;
export const defaultOgImageHeight = 630;

export function toAbsoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export const socialLinks = [
  "https://www.instagram.com/unispourlesport/",
  "https://www.linkedin.com/company/up-sport-unis-pour-le-sport/",
  "https://www.facebook.com/upsportunispourlesport",
  "https://www.unispourlesport.fr/",
];

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteOrigin}#website`,
    url: siteOrigin,
    name: siteName,
    description: siteDescription,
    publisher: {
      "@id": `${siteOrigin}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteOrigin}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteOrigin}#organization`,
    name: "Up Sport !",
    alternateName: siteName,
    url: siteOrigin,
    logo: toAbsoluteUrl("/solimouv.svg"),
    email: "unispourlesport@yahoo.fr",
    sameAs: socialLinks,
  };
}

export function getFestivalEventSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${siteOrigin}#event`,
    name: "Festival Solimouv' 2026",
    description:
      "Une journée de sport inclusif, d'activités accessibles et de rencontres au coeur de Paris 13.",
    image: [toAbsoluteUrl(defaultOgImage)],
    startDate: "2026-06-06T10:00:00+02:00",
    endDate: "2026-06-06T18:00:00+02:00",
    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    location: {
      "@type": "Place",
      name: "Centre Sportif Charles Moureu",
      address: {
        "@type": "PostalAddress",
        streetAddress: "20 Rue Brillat-Savarin",
        postalCode: "75013",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
    },
    organizer: {
      "@id": `${siteOrigin}#organization`,
    },
  };
}

export function getBlogCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteOrigin}/blog#webpage`,
    url: `${siteOrigin}/blog`,
    name: "Blog Solimouv'",
    description:
      "Les actualités Solimouv' autour du sport inclusif, du festival et des informations pratiques.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteOrigin}#website`,
    },
    about: {
      "@id": `${siteOrigin}#event`,
    },
    publisher: {
      "@id": `${siteOrigin}#organization`,
    },
  };
}

export function getBlogPostingSchema(article: BlogArticle) {
  const articleUrl = `${siteOrigin}/blog/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: article.title,
    description: article.description,
    url: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: [toAbsoluteUrl(article.coverImage)],
    articleSection: article.category,
    publisher: {
      "@id": `${siteOrigin}#organization`,
    },
    author: {
      "@id": `${siteOrigin}#organization`,
    },
    mainEntityOfPage: {
      "@id": `${articleUrl}#webpage`,
    },
    about: {
      "@id": `${siteOrigin}#event`,
    },
  };
}
