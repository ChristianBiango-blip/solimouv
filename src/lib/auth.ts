import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import { env } from "@/config/env";

/**
 * Configuration NextAuth v4.
 *
 * Utilise un provider Credentials (email + mot de passe)
 * avec vérification en base MongoDB.
 *
 * Collection MongoDB : "users"
 * Structure d'un document user :
 * {
 *   _id: ObjectId,
 *   name: string,
 *   email: string,
 *   password: string (hash bcryptjs),
 *   role: "admin" | "user",
 *   createdAt: Date,
 * }
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@solimouv.fr",
        },
        password: {
          label: "Mot de passe",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis.");
        }

        const db = await getDb();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Aucun compte trouvé avec cet email.");
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Mot de passe incorrect.");
        }

        // Retourne l'utilisateur sans le mot de passe
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * Ajoute le rôle de l'utilisateur dans le token JWT.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    /**
     * Transmet le rôle et l'id du token vers la session.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/connexion",
    error: "/connexion",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures
  },

  secret: env.NEXTAUTH_SECRET,
};
