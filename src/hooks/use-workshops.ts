import { useQuery } from "@tanstack/react-query";
import type { Workshop } from "@/types/workshop";

/**
 * Hook personnalisé pour récupérer la liste des ateliers.
 * Utilise React Query (useQuery) pour le caching et le refetch automatique.
 *
 * @example
 * const { workshops, isLoading, error } = useWorkshops();
 */
export function useWorkshops() {
  const { data, isLoading, error, refetch } = useQuery<Workshop[]>({
    queryKey: ["workshops"],
    queryFn: async () => {
      const response = await fetch("/api/workshops");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des ateliers.");
      }
      return response.json();
    },
  });

  return {
    workshops: data ?? [],
    isLoading,
    error,
    refetch,
  };
}
