import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Hook pour supprimer un atelier via l'API.
 * Invalide le cache "workshops" après suppression.
 */
export function useDeleteWorkshop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/workshops/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Erreur lors de la suppression de l'atelier."
        );
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
    },
  });
}
