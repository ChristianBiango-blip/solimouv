import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware principal de l'application.
 *
 * Règles :
 * - Pages authentifiées (/accueil, /programme, /about, /partners, /contact)
 *   → nécessite connexion, sinon redirige vers /login
 * - /admin/* → nécessite connexion + rôle "admin"
 * - Utilisateur connecté sur /login ou /register → redirige vers /accueil
 * - / (landing) → reste public
 */
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Pages authentifiées de l'app
  const authenticatedRoutes = [
    "/accueil",
    "/programme",
    "/about",
    "/partners",
    "/contact",
  ];

  const isAuthRoute = authenticatedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Protection des pages authentifiées
  if (isAuthRoute) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protection des pages admin (sauf /admin/connexion)
  if (pathname.startsWith("/admin") && pathname !== "/admin/connexion") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/connexion", req.url));
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/accueil", req.url));
    }
  }

  // Admin connecté sur /admin/connexion → rediriger vers /admin/workshops
  if (token && token.role === "admin" && pathname === "/admin/connexion") {
    return NextResponse.redirect(new URL("/admin/workshops", req.url));
  }

  // Utilisateur connecté : rediriger vers /accueil s'il va sur /, /login ou /register
  if (token && (pathname === "/" || pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/accueil", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/accueil/:path*",
    "/programme/:path*",
    "/about/:path*",
    "/partners/:path*",
    "/contact/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
