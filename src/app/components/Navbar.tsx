"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import PWAInstallButton from "./PWAInstallButton";

/**
 * Navbar principale du site public.
 * Affiche le logo, les liens de navigation, le bouton PWA
 * et les boutons connexion/inscription (ou le profil si connecté).
 */
export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/solimouv-blanc.svg"
            alt="Solimouv'"
            width={32}
            height={32}
            className="rounded-lg bg-brand-primary p-1.5"
          />
          <span className="brand-gradient-text text-xl font-black">
            Solimouv&apos;
          </span>
        </Link>

        {/* Navigation centre */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-primary"
          >
            Accueil
          </Link>
          <Link
            href="/a-propos"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-primary"
          >
            À propos
          </Link>
          <Link
            href="/programme"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-primary"
          >
            Programme
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Actions droite */}
        <div className="flex items-center gap-3">
          <PWAInstallButton />

          {session?.user ? (
            <div className="flex items-center gap-3">
              {/* Si admin, lien vers l'admin */}
              {session.user.role === "admin" && (
                <Link
                  href="/admin/ateliers"
                  className="hidden rounded-xl bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:block"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-xl border-2 border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-brand-primary hover:text-brand-primary"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/connexion"
                className="rounded-xl border-2 border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-brand-primary hover:text-brand-primary"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="btn-primary hidden rounded-xl px-4 py-2 text-sm sm:inline-flex"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
