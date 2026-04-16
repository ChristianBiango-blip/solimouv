"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import PWAInstallButton from "./PWAInstallButton";

/**
 * Liens de navigation publique.
 */
const PUBLIC_NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/blog", label: "Blog" },
  { href: "/programme", label: "Programme" },
  { href: "/dons", label: "Dons" },
  { href: "/contact", label: "Contact" },
];

/**
 * Navbar principale du site public.
 * Affiche le logo, les liens de navigation, le bouton PWA
 * et les boutons connexion/inscription (ou le profil si connecté).
 * Responsive avec menu burger sur mobile.
 */
export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-2">
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

          {/* Desktop actions */}
          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-6">
              {PUBLIC_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <PWAInstallButton />

              {session?.user ? (
                <>
                  {session.user.role === "admin" && (
                    <Link
                      href="/admin/ateliers"
                      className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
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
                </>
              ) : (
                <>
                  <Link
                    href="/connexion"
                    className="rounded-xl border-2 border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-brand-primary hover:text-brand-primary"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/inscription"
                    className="btn-primary rounded-xl px-4 py-2 text-sm"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Burger button (mobile first) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm transition-colors hover:border-brand-primary hover:text-brand-primary lg:hidden"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-gray-100 bg-white px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.06)] lg:hidden"
        >
          <div className="space-y-2">
            {PUBLIC_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:border-brand-primary hover:bg-white hover:text-brand-primary"
              >
                <span>{link.label}</span>
                <span className="text-xs text-gray-400">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4">
            <div className="sm:hidden">
              <PWAInstallButton />
            </div>

            <div className="mt-3 space-y-2">
              {session?.user ? (
                <>
                  {session.user.role === "admin" && (
                    <Link
                      href="/admin/ateliers"
                      onClick={closeMenu}
                      className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      closeMenu();
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/connexion"
                    onClick={closeMenu}
                    className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/inscription"
                    onClick={closeMenu}
                    className="btn-primary block rounded-xl px-4 py-3 text-center text-sm"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
