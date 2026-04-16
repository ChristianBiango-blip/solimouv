import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

/**
 * GET /api/stats
 * Retourne les statistiques du tableau de bord admin.
 */
export async function GET() {
  try {
    const db = await getDb();

    // Nombre total d'utilisateurs inscrits
    const totalUsers = await db.collection("users").countDocuments();

    // Nombre total d'ateliers
    const totalWorkshops = await db
      .collection("workshops")
      .countDocuments();

    return NextResponse.json({
      totalUsers,
      totalWorkshops,
      // Chiffre fictif pour le hackathon
      festivalRegistrations: 142,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des stats :", error);
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
