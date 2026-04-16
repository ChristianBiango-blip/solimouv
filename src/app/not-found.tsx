import Link from "next/link";

/**
 * Page 404 personnalisée.
 * Affichée pour toutes les routes qui ne correspondent à aucune page.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="brand-gradient-text text-8xl font-black">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-900">
        Oups ! Page introuvable
      </p>
      <p className="mt-2 max-w-md text-gray-500">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-glow"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
