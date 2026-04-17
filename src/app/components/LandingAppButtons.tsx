"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function LandingAppButtons() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsInstalled(window.matchMedia("(display-mode: standalone)").matches);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const installHandler = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installHandler);
    };
  }, []);

  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;

  const canInstall = !isInstalled && (!!deferredPrompt || isIOS);

  async function handleInstall() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setIsInstalled(true);
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  }

  return (
    <>
      <div className="landing-store-buttons">
        {/* Bouton Inscription */}
        <Link
          href="/inscription"
          className="landing-store-button"
          style={{ color: "#ffffff" }}
        >
          S&apos;inscrire au festival
        </Link>

        {/* Bouton Télécharger (PWA) — affiché uniquement si installable */}
        {canInstall && (
          <button
            onClick={handleInstall}
            className="landing-store-button"
            style={{ color: "#ffffff" }}
          >
            📱 Télécharger l&apos;app
          </button>
        )}
      </div>

      {/* Modal iOS */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-glow">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Installer sur iPhone / iPad
            </h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">1</span>
                Appuyez sur{" "}
                <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 font-mono text-xs">⬆️ Partager</span>{" "}
                en bas de l&apos;écran
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">2</span>
                Faites défiler et appuyez sur <strong>&quot;Sur l&apos;écran d&apos;accueil&quot;</strong>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">3</span>
                Appuyez sur <strong>&quot;Ajouter&quot;</strong> en haut à droite
              </li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-6 w-full rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              J&apos;ai compris !
            </button>
          </div>
        </div>
      )}
    </>
  );
}
