import "next-auth";

/**
 * Extension des types NextAuth pour inclure le rôle utilisateur.
 * Permet d'accéder à session.user.role et session.user.id
 * dans tout le code côté client.
 */
declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      id?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}
