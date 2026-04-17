"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin/ateliers");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-brand-secondary px-6 pb-24 pt-14 gap-16">
      <Image
        src="/solimouv-blanc.svg"
        alt="Solimouv"
        width={231}
        height={30}
        priority
      />

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[358px] flex-col gap-14"
      >
        <div className="flex flex-col gap-6">
          {error && (
            <div className="rounded-lg bg-white/20 px-4 py-3 text-sm text-white">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[17px] font-bold text-[#fbfbfb]">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="h-[50px] w-full rounded-lg bg-[#fbfbfb] px-4 text-sm text-foreground placeholder:text-[#6c6c6c] outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[17px] font-bold text-[#fbfbfb]">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="h-[50px] w-full rounded-lg bg-[#fbfbfb] px-4 pr-12 text-sm text-foreground placeholder:text-[#6c6c6c] outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6c6c6c]"
              >
                {showPassword ? (
                  <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z" fill="#6c6c6c" />
                  </svg>
                ) : (
                  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M1 1L21 17M9.18 3.37C9.77 3.14 10.38 3 11 3C16 3 20.27 6.11 22 10.5C21.47 11.86 20.7 13.08 19.73 14.11M14.74 14.07C13.6 14.66 12.34 15 11 15C6 15 1.73 11.89 0 7.5C0.88 5.27 2.44 3.38 4.41 2.08M8 10.5C8 8.84 9.34 7.5 11 7.5" stroke="#6c6c6c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="h-[50px] w-full max-w-[325px] rounded-lg bg-[#211f1f] text-[17px] text-[#fbfbfb] transition-opacity disabled:opacity-50 hover:opacity-90"
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

            <Link
              href="#"
              className="text-sm text-[#fbfbfb] underline underline-offset-2"
            >
              mot de passe oublié ?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
