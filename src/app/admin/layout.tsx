"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";

/**
 * Layout partagé pour toutes les pages admin.
 * Affiche la sidebar sauf sur la page de connexion.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isConnexionPage = pathname === "/admin/connexion";

  // Page de connexion : pas de sidebar, fond sombre
  if (isConnexionPage) {
    return <>{children}</>;
  }

  // Pages admin avec sidebar
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1">{children}</main>
    </div>
  );
}
