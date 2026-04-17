"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/admin/accueil", label: "Tableau de bord", icon: "🏠" },
  { href: "/admin/ateliers", label: "Ateliers", icon: "📅" },
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-gray-900 text-white transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      {/* Logo + bouton fermer (mobile) */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <Image src="/solimouv-blanc.svg" alt="Solimouv'" width={32} height={32} className="shrink-0" />
          <div>
            <p className="text-sm font-semibold tracking-wide">Solimouv&apos;</p>
            <p className="text-xs text-gray-400">Administration</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer le menu"
          className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-primary text-white shadow-glow"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Infos utilisateur + Déconnexion */}
      {session?.user && (
        <div className="border-t border-white/10 px-3 py-4">
          <div className="mb-3 px-4">
            <p className="text-sm font-medium text-white">{session.user.name}</p>
            <p className="truncate text-xs text-gray-400">{session.user.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/connexion" })}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
          >
            <span className="text-lg">🚪</span>
            Se déconnecter
          </button>
        </div>
      )}

      {/* Retour au site */}
      <div className="border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
        >
          <span className="text-lg">🌐</span>
          Retour au site
        </Link>
      </div>
    </aside>
  );
}
