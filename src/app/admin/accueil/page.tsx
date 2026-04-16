"use client";

import { useStats } from "@/hooks/use-stats";

/**
 * Card KPI réutilisable.
 */
function KpiCard({
  icon,
  label,
  value,
  subtext,
  gradient,
}: {
  icon: string;
  label: string;
  value: number | string;
  subtext?: string;
  gradient: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-glow">
      {/* Fond décoratif gradient */}
      <div
        className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 ${gradient}`}
      />
      <div className="relative">
        <span className="text-3xl">{icon}</span>
        <p className="mt-3 text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-4xl font-black text-gray-900">{value}</p>
        {subtext && (
          <p className="mt-1 text-xs text-gray-400">{subtext}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Page tableau de bord admin.
 * Affiche les KPI principaux.
 */
export default function AdminAccueilPage() {
  const { stats, isLoading } = useStats();

  return (
    <div className="px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        🏠 Tableau de bord
      </h1>
      <p className="mt-1 text-gray-500">
        Bienvenue dans l'administration de Solimouv'.
      </p>

      {/* KPI Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            {/* Skeletons */}
            <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />
            <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />
            <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />
          </>
        ) : (
          <>
            <KpiCard
              icon="👥"
              label="Inscrits sur l'application"
              value={stats.totalUsers}
              subtext="Total des comptes créés"
              gradient="bg-brand-primary"
            />
            <KpiCard
              icon="🎉"
              label="Inscrits au prochain festival"
              value={stats.festivalRegistrations}
              subtext="Festival Solimouv' 2026"
              gradient="bg-brand-secondary"
            />
            <KpiCard
              icon="📅"
              label="Ateliers créés"
              value={stats.totalWorkshops}
              subtext="Programme du festival"
              gradient="bg-brand-accent"
            />
          </>
        )}
      </div>
    </div>
  );
}
