"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import PWAInstallButton from "./PWAInstallButton";

const ANCHOR_LINKS = [
  { href: "#concept", label: "Concept" },
  { href: "#event", label: "Événement" },
  { href: "#location", label: "Lieu" },
  { href: "#application", label: "Application" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLanding = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sur landing non scrollée : fond violet + texte blanc
  // Sur landing scrollée ou toute autre page : fond blanc + texte sombre
  const light = !isLanding || scrolled;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        light
          ? "border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-lg"
          : "bg-brand-primary"
      }`}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <a
            href={isLanding ? "#hero" : "/"}
            aria-label="Accueil Solimouv"
            className="relative h-7 w-36 shrink-0"
          >
            <Image
              src="/blog/blanc-solimouv.svg"
              alt="Solimouv"
              fill
              className={`object-contain object-left transition-opacity duration-300 ${
                light ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
            <Image
              src="/blog/bleu-solimouv.svg"
              alt="Solimouv"
              fill
              className={`object-contain object-left transition-opacity duration-300 ${
                light ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
          </a>

          {/* Desktop : liens d'ancre (landing uniquement) */}
          {isLanding && (
            <nav
              className="hidden flex-1 items-center justify-center gap-6 lg:flex"
              aria-label="Navigation page"
            >
              {ANCHOR_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    light
                      ? "text-gray-600 hover:text-brand-primary"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop : actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <PWAInstallButton />

            {session?.user ? (
              <>
                {session.user.role === "admin" && (
                  <Link
                    href="/admin/ateliers"
                    className={`rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                      light
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                    light
                      ? "border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary"
                      : "border-white/30 text-white hover:border-white hover:bg-white/10"
                  }`}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/connexion"
                  className={`rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                    light
                      ? "border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary"
                      : "border-white/30 text-white hover:border-white hover:bg-white/10"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    light
                      ? "bg-brand-primary text-white shadow-md hover:bg-brand-secondary"
                      : "bg-white text-brand-primary hover:bg-gray-50"
                  }`}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="navbar-mobile-menu"
            className={`inline-flex items-center justify-center rounded-xl border-2 p-2.5 transition-colors lg:hidden ${
              light
                ? "border-gray-200 bg-white text-gray-700 hover:border-brand-primary hover:text-brand-primary"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav
          id="navbar-mobile-menu"
          aria-label="Navigation mobile"
          className={`border-t px-4 py-4 lg:hidden ${
            light ? "border-gray-100 bg-white" : "border-white/20 bg-brand-primary"
          }`}
        >
          {/* Liens d'ancre (landing uniquement) */}
          {isLanding && (
            <div className="mb-4 space-y-1">
              {ANCHOR_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                    light
                      ? "border-gray-100 bg-gray-50 text-gray-700 hover:border-brand-primary hover:text-brand-primary"
                      : "border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className={`text-xs ${light ? "text-gray-400" : "text-white/40"}`}>→</span>
                </a>
              ))}
            </div>
          )}

          {/* PWA + Auth */}
          <div
            className={`rounded-2xl border p-4 space-y-2 ${
              light ? "border-gray-100 bg-white" : "border-white/20 bg-white/5"
            }`}
          >
            <div className="pb-1">
              <PWAInstallButton />
            </div>

            {session?.user ? (
              <>
                {session.user.role === "admin" && (
                  <Link
                    href="/admin/ateliers"
                    onClick={closeMenu}
                    className={`block rounded-xl border px-4 py-3 text-center text-sm font-medium transition-colors ${
                      light
                        ? "border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary"
                        : "border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => { closeMenu(); signOut({ callbackUrl: "/" }); }}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    light
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "border border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/connexion"
                  onClick={closeMenu}
                  className={`block rounded-xl border px-4 py-3 text-center text-sm font-medium transition-colors ${
                    light
                      ? "border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary"
                      : "border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  onClick={closeMenu}
                  className={`block rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors ${
                    light
                      ? "bg-brand-primary text-white hover:bg-brand-secondary"
                      : "bg-white text-brand-primary hover:bg-gray-50"
                  }`}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
