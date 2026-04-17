import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { WorkshopFormType } from "@/types/workshop";

/**
 * Réponse de l'API après création d'un atelier.
 */
interface WorkshopMutationResponse {
  success: boolean;
  message: string;
  insertedId: string;
}

/**
 * Hook pour soumettre un atelier via l'API.
 * Utilise useMutation de React Query.
 * Invalide le cache "workshops" après une création réussie.
 */
export function useSubmitWorkshop() {
  const queryClient = useQueryClient();

  return useMutation<WorkshopMutationResponse, Error, WorkshopFormType>({
    mutationFn: async (data: WorkshopFormType) => {
      const response = await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'ajout de l'atelier.");
      }

      return result as WorkshopMutationResponse;
    },
    onSuccess: () => {
      // Invalide le cache pour refetch la liste
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
    },
  });
}
