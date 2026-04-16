"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Liens de navigation de la sidebar admin.
 */
const NAV_LINKS = [
  {
    href: "/admin/workshops",
    label: "Ateliers",
    icon: "📅",
  },
  {
    href: "/admin",
    label: "Tableau de bord",
    icon: "🏠",
  },
];

/**
 * Sidebar de navigation pour les pages admin.
 * Affiche le logo, les liens de navigation et un lien retour vers le site.
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <Image
          src="/solimouv-blanc.svg"
          alt="Solimouv' logo"
          width={40}
          height={40}
          className="shrink-0"
        />
        <div>
          <p className="text-sm font-semibold tracking-wide">Solimouv'</p>
          <p className="text-xs text-gray-400">Administration</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
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

      {/* Lien retour vers le site public */}
      <div className="border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
        >
          <span className="text-lg">🌐</span>
          Retour au site
        </Link>
      </div>
    </aside>
  );
}
