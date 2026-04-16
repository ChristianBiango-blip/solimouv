"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Page d'inscription.
 * Accessible via /register
 */
export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'inscription.");
        setLoading(false);
        return;
      }

      // Redirige vers la page de connexion
      router.push("/login?registered=true");
    } catch {
      setError("Impossible de contacter le serveur.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <h1 className="brand-gradient-text text-4xl font-black">
            Solimouv'
          </h1>
          <p className="mt-2 text-gray-500">Créer un compte</p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-8 shadow-glow ring-1 ring-gray-100"
        >
          {/* Erreur */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <span>❌</span>
              {error}
            </div>
          )}

          {/* Nom */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Nom
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              required
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              required
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6 caractères minimum"
              required
              minLength={6}
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
                Création du compte...
              </span>
            ) : (
              "Créer mon compte"
            )}
          </button>
        </form>

        {/* Lien connexion */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-primary hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
