import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog/", "/connexion", "/inscription"],
        disallow: [
          "/admin/",
          "/api/",
          "/accueil",
          "/atelier/",
          "/dons",
          "/contact",
          "/mon-compte",
          "/partenaires",
          "/inscription-festival",
        ],
      },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
