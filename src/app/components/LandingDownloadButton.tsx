"use client";

import { useState, useEffect, useRef } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function LandingDownloadButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (showIOSModal) closeRef.current?.focus();
  }, [showIOSModal]);

  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;

  async function handleClick() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="landing-store-button"
      >
        Télécharger
      </button>

      {showIOSModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="presentation"
          onClick={(e) => { if (e.target === e.currentTarget) setShowIOSModal(false); }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dl-ios-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-glow"
          >
            <h3 id="dl-ios-title" className="mb-4 text-lg font-bold text-gray-900">
              Installer sur iPhone / iPad
            </h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">1</span>
                Appuyez sur{" "}
                <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 font-mono text-xs">
                  <span aria-hidden="true">⬆️</span>{" "}Partager
                </span>{" "}
                en bas de l&apos;écran
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">2</span>
                Appuyez sur <strong>&quot;Sur l&apos;écran d&apos;accueil&quot;</strong>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">3</span>
                Appuyez sur <strong>&quot;Ajouter&quot;</strong>
              </li>
            </ol>
            <button
              ref={closeRef}
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
