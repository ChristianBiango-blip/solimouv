import Sidebar from "./components/Sidebar";

/**
 * Layout partagé pour toutes les pages admin.
 * Affiche la sidebar + la zone de contenu principale.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Contenu principal décalé à droite */}
      <main className="ml-64 flex-1">{children}</main>
    </div>
  );
}
