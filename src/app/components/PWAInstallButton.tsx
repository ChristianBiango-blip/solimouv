"use client";

import { useState, useEffect } from "react";

/**
 * Avant l'installation de la PWA, le navigateur déclenche l'événement `beforeinstallprompt`.
 * On le capture pour pouvoir déclencher l'installation au clic sur le bouton.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Bouton d'installation de la PWA.
 *
 * - Sur Android/Chrome : utilise l'API `beforeinstallprompt` pour déclencher l'install native
 * - Sur iOS/Safari : affiche une modal avec les instructions "Partager → Sur l'écran d'accueil"
 */
export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(display-mode: standalone)").matches;
  });

  useEffect(() => {
    // Capture l'événement beforeinstallprompt (Android/Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const installHandler = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Détecte quand l'app a été installée
    window.addEventListener("appinstalled", installHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installHandler);
    };
  }, []);

  /**
   * Détecte si l'utilisateur est sur iOS/Safari
   */
  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;

  async function handleInstallClick() {
    if (deferredPrompt) {
      // Android/Chrome : déclenche le prompt natif
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      // iOS : affiche les instructions
      setShowIOSModal(true);
    }
  }

  // Ne pas afficher si déjà installé
  if (isInstalled) return null;

  // Ne pas afficher le bouton si pas de prompt disponible et pas iOS
  if (!deferredPrompt && !isIOS) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 rounded-xl border-2 border-brand-primary bg-white px-4 py-2.5 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
      >
        <span>📱</span>
        Installer l&apos;application
      </button>

      {/* Modal instructions iOS */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-glow">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Installer sur iPhone / iPad
            </h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                  1
                </span>
                Appuyez sur le bouton{" "}
                <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 font-mono text-xs">
                  ⬆️ Partager
                </span>{" "}
                en bas de l&apos;écran
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                  2
                </span>
                Faites défiler et appuyez sur{" "}
                <strong>&quot;Sur l&apos;écran d&apos;accueil&quot;</strong>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                  3
                </span>
                Appuyez sur{" "}
                <strong>&quot;Ajouter&quot;</strong> en haut à droite
              </li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
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
