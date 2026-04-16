import { useMutation } from "@tanstack/react-query";
import type { DonationFormType } from "@/types/donation";

/**
 * Réponse de l'API après soumission d'un don.
 */
interface DonationMutationResponse {
  success: boolean;
  message: string;
}

/**
 * Hook pour soumettre un don via l'API.
 * Utilise useMutation de React Query.
 */
export function useSubmitDonation() {
  return useMutation<DonationMutationResponse, Error, DonationFormType>({
    mutationFn: async (data: DonationFormType) => {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi du don.");
      }

      return result as DonationMutationResponse;
    },
  });
}
