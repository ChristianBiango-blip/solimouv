"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import PWAInstallButton from "./PWAInstallButton";

/**
 * Liens de navigation de l'app (pages authentifiées).
 */
const NAV_LINKS = [
  { href: "/accueil", label: "Accueil", icon: "🏠" },
  { href: "/atelier", label: "Ateliers", icon: "📅" },
  { href: "/blog", label: "Blog", icon: "📰" },
  { href: "/a-propos", label: "À propos", icon: "💡" },
  { href: "/partenaires", label: "Partenaires", icon: "🤝" },
  { href: "/dons", label: "Dons", icon: "💝" },
  { href: "/mon-compte", label: "Mon Compte", icon: "👤" },
  { href: "/contact", label: "Contact", icon: "✉️" },
];

/**
 * Navbar de l'application (pages authentifiées).
 * Affiche le logo, la navigation principale, le bouton PWA
 * et les infos utilisateur avec déconnexion.
 */
export default function AppNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/accueil" className="flex min-w-0 items-center gap-2">
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

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Actions + burger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/inscription-festival"
              className="hidden whitespace-nowrap rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(66,0,254,0.22)] transition-all hover:translate-y-[-1px] hover:bg-brand-secondary sm:inline-flex"
            >
              S&apos;inscrire au festival
            </Link>

            <div className="hidden sm:block">
              <PWAInstallButton />
            </div>

            {session?.user?.role === "admin" && (
              <Link
                href="/admin/accueil"
                className="hidden rounded-xl bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white lg:inline-flex"
              >
                Accès admin
              </Link>
            )}

            {session?.user && (
              <div className="hidden items-center gap-3 lg:flex">
                <div className="hidden text-right xl:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-400">{session.user.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-xl border-2 border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-red-400 hover:text-red-500"
                  title="Se déconnecter"
                >
                  Déconnexion
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen((value: boolean) => !value)}
              className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm transition-colors hover:border-brand-primary hover:text-brand-primary lg:hidden"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="app-navbar-mobile-menu"
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
      </div>

      {isMenuOpen && (
        <nav
          id="app-navbar-mobile-menu"
          className="border-t border-gray-100 bg-white px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.06)] lg:hidden"
        >
          <div className="space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                      : "border-gray-100 bg-gray-50 text-gray-700 hover:border-brand-primary hover:bg-white hover:text-brand-primary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{link.icon}</span>
                    {link.label}
                  </span>
                  <span className="text-xs text-gray-400">→</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4">
            <div className="sm:hidden">
              <PWAInstallButton />
            </div>

            <div className="mt-3 space-y-2">
              <Link
                href="/inscription-festival"
                onClick={closeMenu}
                className="block rounded-xl bg-brand-primary px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-secondary"
              >
                S&apos;inscrire au festival
              </Link>

              {session?.user?.role === "admin" && (
                <Link
                  href="/admin/accueil"
                  onClick={closeMenu}
                  className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
                >
                  Accès admin
                </Link>
              )}

              {session?.user ? (
                <button
                  onClick={() => {
                    closeMenu();
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  Déconnexion
                </button>
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
