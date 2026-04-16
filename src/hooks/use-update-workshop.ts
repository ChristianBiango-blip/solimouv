import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { WorkshopFormType } from "@/types/workshop";

/**
 * Hook pour mettre à jour un atelier via l'API.
 * Utilise useMutation de React Query.
 * Invalide le cache "workshops" après une mise à jour réussie.
 */
export function useUpdateWorkshop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: WorkshopFormType;
    }) => {
      const response = await fetch(`/api/workshops/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Erreur lors de la mise à jour de l'atelier."
        );
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
    },
  });
}
