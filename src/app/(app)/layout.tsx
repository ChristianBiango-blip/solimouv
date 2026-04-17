import AppNavbar from "../components/AppNavbar";

/**
 * Layout partagé pour toutes les pages authentifiées.
 * Affiche l'AppNavbar + la zone de contenu.
 * La protection d'auth est gérée par le middleware.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AppNavbar />
      <main className="pb-20 lg:pb-0">{children}</main>
    </div>
  );
}
