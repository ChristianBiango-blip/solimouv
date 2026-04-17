import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { env } from "@/config/env";
import type { NextRequest } from "next/server";

/**
 * DELETE /api/auth/account
 * Supprime définitivement le compte de l'utilisateur connecté.
 * Authentification requise (JWT).
 */
export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request, secret: env.NEXTAUTH_SECRET });

  if (!token?.id) {
    return NextResponse.json(
      { error: "Non authentifié." },
      { status: 401 }
    );
  }

  try {
    const db = await getDb();
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(token.id as string) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Compte introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression compte :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression." },
      { status: 500 }
    );
  }
}
