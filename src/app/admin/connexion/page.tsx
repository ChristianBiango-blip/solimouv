"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * Page de connexion réservée à l'administration.
 * Accessible via /admin/connexion
 */
export default function AdminConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      router.push("/admin/workshops");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <Image
            src="/solimouv-blanc.svg"
            alt="Solimouv'"
            width={56}
            height={56}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Administration</h1>
          <p className="mt-1 text-sm text-gray-400">
            Réservé aux administrateurs de Solimouv'
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-8 shadow-glow"
        >
          {/* Erreur */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <span>❌</span>
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="admin-email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@solimouv.fr"
              required
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-2">
            <label
              htmlFor="admin-password"
              className="block text-sm font-semibold text-gray-700"
            >
              Mot de passe
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-glow disabled:scale-100 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Connexion...
              </span>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Retour */}
        <p className="mt-6 text-center text-sm text-gray-500">
          <a href="/" className="transition-colors hover:text-white">
            ← Retour au site
          </a>
        </p>
      </div>
    </div>
  );
}
