"use client";

import { useState } from "react";
import type { WorkshopFormType } from "@/types/workshop";

/**
 * Hook pour soumettre un atelier via l'API.
 * Gère l'état de chargement, le succès et l'erreur.
 */
export function useSubmitWorkshop() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: WorkshopFormType) => {
    setIsPending(true);
    setIsSuccess(false);
    setError(null);

    try {
      const response = await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'ajout de l'atelier.");
      }

      setIsSuccess(true);
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur inattendue est survenue.";
      setError(message);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending, isSuccess, error };
}
