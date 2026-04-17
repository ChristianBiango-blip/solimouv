"use client";

import { useState, useEffect, useRef } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(display-mode: standalone)").matches;
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
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

  // Déplacer le focus sur le bouton fermer quand la modale s'ouvre
  useEffect(() => {
    if (showIOSModal) {
      closeButtonRef.current?.focus();
    }
  }, [showIOSModal]);

  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;

  async function handleInstallClick() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setIsInstalled(true);
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  }

  if (isInstalled) return null;
  if (!deferredPrompt && !isIOS) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 rounded-xl border-2 border-brand-primary bg-white px-4 py-2.5 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
      >
        <span aria-hidden="true">📱</span>
        Installer l&apos;application
      </button>

      {/* Modale instructions iOS */}
      {showIOSModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="presentation"
          onClick={(e) => { if (e.target === e.currentTarget) setShowIOSModal(false); }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-ios-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-glow"
          >
            <h3 id="pwa-ios-title" className="mb-4 text-lg font-bold text-gray-900">
              Installer sur iPhone / iPad
            </h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white" aria-hidden="true">
                  1
                </span>
                Appuyez sur le bouton{" "}
                <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 font-mono text-xs">
                  <span aria-hidden="true">⬆️</span>
                  {" "}Partager
                </span>{" "}
                en bas de l&apos;écran
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white" aria-hidden="true">
                  2
                </span>
                Faites défiler et appuyez sur{" "}
                <strong>&quot;Sur l&apos;écran d&apos;accueil&quot;</strong>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white" aria-hidden="true">
                  3
                </span>
                Appuyez sur <strong>&quot;Ajouter&quot;</strong> en haut à droite
              </li>
            </ol>
            <button
              ref={closeButtonRef}
              onClick={() => setShowIOSModal(false)}
              aria-label="Fermer les instructions d'installation"
              className="mt-6 w-full rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
            >
              J&apos;ai compris !
            </button>
          </div>
        </div>
      )}
    </>
  );
}
