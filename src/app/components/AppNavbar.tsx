"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/accueil", label: "Accueil" },
  { href: "/atelier", label: "Ateliers" },
  { href: "/blog", label: "Blog" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/dons", label: "Dons" },
  { href: "/contact", label: "Contact" },
];

export default function AppNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-lg">
        <div className="container-custom">
          <div className="flex h-16 items-center gap-3">

            {/* Burger (mobile) */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="app-mobile-menu"
              className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 p-2.5 text-gray-700 transition-colors hover:border-brand-primary hover:text-brand-primary lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Logo */}
            <Link
              href="/accueil"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
              aria-label="Accueil Solimouv"
            >
              <Image
                src="/solimouv-blanc.svg"
                alt=""
                width={28}
                height={28}
                className="rounded-lg bg-brand-primary p-1.5"
                aria-hidden="true"
              />
              <span className="brand-gradient-text hidden text-xl font-black sm:inline">
                Solimouv&apos;
              </span>
            </Link>

            {/* Nav desktop */}
            <nav
              className="hidden flex-1 items-center gap-1 lg:flex"
              aria-label="Navigation principale"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20 ${
                    isActive(link.href)
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions desktop */}
            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <Link
                href="/inscription-festival"
                className="rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/30"
              >
                S&apos;inscrire au festival
              </Link>

              {session?.user?.role === "admin" && (
                <Link
                  href="/admin/ateliers"
                  className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Admin
                </Link>
              )}

              <Link
                href="/mon-compte"
                aria-current={isActive("/mon-compte") ? "page" : undefined}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20 ${
                  isActive("/mon-compte")
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span className="hidden xl:inline">
                  {session?.user?.name ?? "Mon compte"}
                </span>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-xl border-2 border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:border-red-300 hover:text-red-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
              >
                Déconnexion
              </button>
            </div>

            {/* Icône compte (mobile) */}
            <Link
              href="/mon-compte"
              aria-label="Mon compte"
              aria-current={isActive("/mon-compte") ? "page" : undefined}
              className={`ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors lg:hidden ${
                isActive("/mon-compte")
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-gray-200 bg-white text-gray-700 hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </Link>

          </div>
        </div>
      </header>

      {/* Menu plein écran mobile */}
      {menuOpen && (
        <div
          id="app-mobile-menu"
          role="dialog"
          aria-label="Menu de navigation"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#211f1f] lg:hidden"
        >
          {/* En-tête menu */}
          <div className="flex items-center justify-between px-5 py-5">
            <Link href="/accueil" onClick={closeMenu} className="flex items-center gap-2">
              <Image
                src="/solimouv-blanc.svg"
                alt=""
                width={28}
                height={28}
                className="rounded-lg bg-brand-primary p-1.5"
                aria-hidden="true"
              />
              <span className="text-xl font-black text-white">Solimouv&apos;</span>
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Fermer le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Liens principaux */}
          <nav aria-label="Navigation mobile" className="flex flex-col px-5 mt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`border-b border-white/10 py-4 font-black italic text-[26px] leading-tight tracking-[-1.2px] transition-opacity ${
                  isActive(link.href)
                    ? "text-brand-accent opacity-100"
                    : "text-white hover:opacity-60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions en bas */}
          <div className="mt-auto space-y-3 px-5 pb-10 pt-6">
            <Link
              href="/inscription-festival"
              onClick={closeMenu}
              className="block rounded-xl bg-brand-secondary px-4 py-3.5 text-center text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              S&apos;inscrire au festival
            </Link>

            {session?.user?.role === "admin" && (
              <Link
                href="/admin/ateliers"
                onClick={closeMenu}
                className="block rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-medium text-white/80 hover:text-white"
              >
                Accès admin
              </Link>
            )}

            {session?.user && (
              <p className="text-center text-xs text-white/40">
                Connecté en tant que <span className="text-white/70">{session.user.name ?? session.user.email}</span>
              </p>
            )}

            <button
              onClick={() => { closeMenu(); signOut({ callbackUrl: "/" }); }}
              className="w-full rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:border-red-400/40 hover:text-red-400"
            >
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </>
  );
}
