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
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const isLanding = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !isLanding || scrolled;

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

          {/* Liens d'ancre desktop (landing uniquement) */}
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

          {/* Actions — visibles sur toutes tailles */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <PWAInstallButton />
            </div>

            {session?.user ? (
              <>
                {session.user.role === "admin" && (
                  <Link
                    href="/admin/ateliers"
                    className={`hidden rounded-xl px-3 py-2 text-xs font-medium transition-colors lg:inline-flex ${
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
                  className={`rounded-xl border-2 px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
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
                  className={`rounded-xl border-2 px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
                    light
                      ? "border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary"
                      : "border-white/30 text-white hover:border-white hover:bg-white/10"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all sm:px-4 ${
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

        </div>
      </div>
    </header>
  );
}
