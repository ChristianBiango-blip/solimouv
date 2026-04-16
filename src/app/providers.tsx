"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Provider de session NextAuth.
 * À envelopper autour de l'application pour que useSession() fonctionne.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
