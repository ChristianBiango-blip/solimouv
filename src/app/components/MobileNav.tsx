"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/accueil", label: "Accueil" },
  { href: "/atelier", label: "Ateliers" },
  { href: "/dons", label: "Dons" },
  { href: "/a-propos", label: "À propos" },
  { href: "/inscription-festival", label: "S'inscrire au festival" },
  { href: "/blog", label: "Blog" },
];

export default function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <div className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-6 ${className ?? ""}`}>
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-full bg-[#fbfbfb] shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
        >
          <span className="h-[2px] w-[22px] rounded-full bg-[#211f1f]" />
          <span className="h-[2px] w-[22px] rounded-full bg-[#211f1f]" />
        </button>
        <Link
          href="/mon-compte"
          aria-label="Mon compte"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbfbfb] shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#211f1f"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#211f1f] px-6 py-10">
          <div className="flex justify-end">
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbfbfb]/10 text-[#fbfbfb]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-10 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#fbfbfb]/10 py-4 font-black italic text-[28px] leading-[33px] tracking-[-1.5px] text-[#fbfbfb]"
              >
                {link.label}
              </Link>
            ))}
            {session?.user && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="mt-2 w-full border-b border-[#fbfbfb]/10 py-4 text-left font-black italic text-[28px] leading-[33px] tracking-[-1.5px] text-[#fbfbfb]/50"
              >
                Déconnexion
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
