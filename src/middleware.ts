import { withAuth } from "next-auth/middleware";

/**
 * Middleware de protection des routes.
 *
 * - Toutes les pages /admin/* nécessitent une authentification + rôle "admin"
 * - Les autres pages sont accessibles publiquement
 */
export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    /**
     * Vérifie si l'utilisateur autorisé peut accéder à la route demandée.
     */
    authorized({ token, req }) {
      const { pathname } = req.nextUrl;

      // Les pages /admin/* nécessitent le rôle "admin"
      if (pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }

      // Les autres pages sont publiques
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
