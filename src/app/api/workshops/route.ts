import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getDb } from "@/lib/mongodb";
import { workshopSchema } from "@/types/workshop";
import { env } from "@/config/env";

/**
 * POST /api/workshops
 * Crée un nouvel atelier dans la collection "workshops".
 */
export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret: env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return NextResponse.json({ error: "Accès interdit." }, { status: 403 });
  }

  try {
    const body = await request.json();

    // Validation des données avec Zod
    const parsed = workshopSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => issue.message);
      return NextResponse.json(
        { error: "Données invalides", details: errors },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("workshops");

    // Conversion de la capacité : string → number | null
    const capacity = parsed.data.capacity
      ? parseInt(parsed.data.capacity, 10)
      : null;

    // Construction du document à insérer
    const workshop = {
      title: parsed.data.title,
      description: parsed.data.description,
      date: parsed.data.date,
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      location: parsed.data.location,
      capacity,
      category: parsed.data.category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(workshop);

    return NextResponse.json(
      {
        success: true,
        message: "Atelier créé avec succès !",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'atelier :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de l'atelier." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/workshops
 * Récupère tous les ateliers, triés par date.
 */
export async function GET() {
  try {
    const db = await getDb();
    const workshops = await db
      .collection("workshops")
      .find({})
      .sort({ date: 1, startTime: 1 })
      .toArray();

    return NextResponse.json(workshops);
  } catch (error) {
    console.error("Erreur lors de la récupération des ateliers :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des ateliers." },
      { status: 500 }
    );
  }
}
