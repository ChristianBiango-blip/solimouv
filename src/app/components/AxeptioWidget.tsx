"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    axeptioSettings?: {
      clientId: string;
      cookiesVersion: string;
      googleConsentMode?: {
        default: {
          analytics_storage: string;
          ad_storage: string;
          ad_user_data: string;
          ad_personalization: string;
          wait_for_update: number;
        };
      };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _axcb?: Array<(sdk: any) => void>;
  }
}

const AxeptioWidget = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const clientId = process.env.NEXT_PUBLIC_AXEPTIO_CLIENT_ID;
    const cookiesVersion = process.env.NEXT_PUBLIC_AXEPTIO_COOKIES_VERSION;

    // Vérifier que les variables d'environnement sont définies
    if (!clientId || !cookiesVersion) {
      console.error("Axeptio: Variables d'environnement manquantes", {
        clientId: !!clientId,
        cookiesVersion: !!cookiesVersion,
      });
      return;
    }

    // IMPORTANT: Définir la configuration AVANT de charger le script
    window.axeptioSettings = {
      clientId,
      cookiesVersion,
      googleConsentMode: {
        default: {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          wait_for_update: 500,
        },
      },
    };

    // Initialiser le callback Axeptio
    window._axcb = window._axcb || [];

    // Vérifier si le script est déjà chargé
    const existingScript = document.querySelector('script[src*="axept.io"]');
    if (existingScript) {
      return;
    }

    // Charger le script Axeptio
    const script = document.createElement("script");
    script.async = true;
    script.src = "//static.axept.io/sdk.js";
    
    // Insérer le script dans le head
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default AxeptioWidget;
