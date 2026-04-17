import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

/**
 * Route API POST pour tester l'insertion en base de données.
 * Insère un document de test dans la collection "test" et le retourne.
 */
export async function POST() {
  try {
    const db = await getDb();
    const collection = db.collection("test");

    const document = {
      message: "Test MongoDB réussi ! 🎉",
      date: new Date(),
      projet: "Solimouv",
    };

    const result = await collection.insertOne(document);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
      document,
    });
  } catch (error) {
    console.error("Erreur lors de l'insertion MongoDB :", error);
    return NextResponse.json(
      { success: false, error: "Erreur de connexion à la base de données" },
      { status: 500 }
    );
  }
}
