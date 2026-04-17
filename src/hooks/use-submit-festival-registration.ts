import { useMutation } from "@tanstack/react-query";
import type { FestivalRegistrationFormType } from "@/types/festival-registration";

/**
 * Réponse de l'API après création d'une inscription festival.
 */
interface FestivalRegistrationMutationResponse {
  success: boolean;
  message: string;
  insertedId: string;
  webhookDelivered: boolean;
}

/**
 * Hook pour soumettre une inscription au festival via l'API.
 */
export function useSubmitFestivalRegistration() {
  return useMutation<
    FestivalRegistrationMutationResponse,
    Error,
    FestivalRegistrationFormType
  >({
    mutationFn: async (data: FestivalRegistrationFormType) => {
      const response = await fetch("/api/festival-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Erreur lors de l'inscription au festival."
        );
      }

      return result as FestivalRegistrationMutationResponse;
    },
  });
}
