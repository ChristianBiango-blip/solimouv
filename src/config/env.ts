/**
 * Configuration des variables d'environnement
 *
 * Ce fichier centralise toutes les variables d'environnement de l'application.
 * Il permet de valider la présence des variables requises au démarrage
 * et d'avoir un seul point d'accès pour toute la config.
 */

export const env = {
  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI ?? "",
  MONGODB_DB: process.env.MONGODB_DB || "solimouv",

  // NextAuth
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",

  // Axeptio (consentement cookies)
  NEXT_PUBLIC_AXEPTIO_CLIENT_ID: process.env.NEXT_PUBLIC_AXEPTIO_CLIENT_ID ?? "",
  NEXT_PUBLIC_AXEPTIO_COOKIES_VERSION:
    process.env.NEXT_PUBLIC_AXEPTIO_COOKIES_VERSION ?? "",

  // Environnement
  NODE_ENV: process.env.NODE_ENV ?? "development",
} as const;

/**
 * Vérifie que les variables d'environnement critiques sont définies.
 * Lance une erreur descriptive si une variable est manquante.
 */
export function validateEnv() {
  const required: (keyof typeof env)[] = [
    "MONGODB_URI",
    "NEXTAUTH_SECRET",
  ];

  for (const key of required) {
    if (!env[key]) {
      throw new Error(
        `Variable d'environnement manquante : ${key}. Vérifiez votre fichier .env`
      );
    }
  }
}
