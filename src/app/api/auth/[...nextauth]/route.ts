import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Route handler NextAuth v4.
 * Gère toutes les routes /api/auth/* (signin, signout, callback, etc.)
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
