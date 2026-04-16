"use client";

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
  { href: "/programme", label: "Programme", icon: "📅" },
  { href: "/about", label: "À propos", icon: "💡" },
  { href: "/partners", label: "Partenaires", icon: "🤝" },
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

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/accueil" className="flex items-center gap-2">
          <Image
            src="/solimouv-blanc.svg"
            alt="Solimouv'"
            width={32}
            height={32}
            className="rounded-lg bg-brand-primary p-1.5"
          />
          <span className="brand-gradient-text text-xl font-black">
            Solimouv'
          </span>
        </Link>

        {/* Navigation centre */}
        <nav className="hidden items-center gap-1 lg:flex">
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
        </nav>

        {/* Actions droite */}
        <div className="flex items-center gap-3">
          <PWAInstallButton />

          {/* Lien admin si rôle admin */}
          {session?.user?.role === "admin" && (
            <Link
              href="/admin/accueil"
              className="rounded-xl bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
            >
              Accès admin
            </Link>
          )}

          {/* Profil + déconnexion */}
          {session?.user && (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
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
        </div>
      </div>

      {/* Navigation mobile (bas d'écran) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-200 bg-white py-2 lg:hidden">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-medium transition-all ${
                isActive
                  ? "text-brand-primary"
                  : "text-gray-400"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
