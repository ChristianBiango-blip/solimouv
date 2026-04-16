import { useQuery } from "@tanstack/react-query";

/**
 * Statistiques du tableau de bord admin.
 */
interface DashboardStats {
  totalUsers: number;
  totalWorkshops: number;
  festivalRegistrations: number;
}

/**
 * Hook pour récupérer les statistiques du dashboard.
 */
export function useStats() {
  const { data, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des statistiques.");
      }
      return response.json();
    },
  });

  return {
    stats: data ?? { totalUsers: 0, totalWorkshops: 0, festivalRegistrations: 0 },
    isLoading,
    error,
  };
}
