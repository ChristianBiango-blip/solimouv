import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { getDb } from "@/lib/mongodb";
import { workshopSchema } from "@/types/workshop";
import { env } from "@/config/env";

/**
 * PUT /api/workshops/[id]
 * Met à jour un atelier existant.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req: request, secret: env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return NextResponse.json({ error: "Accès interdit." }, { status: 403 });
  }

  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ID d'atelier invalide." },
        { status: 400 }
      );
    }

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

    // Conversion de la capacité
    const capacity = parsed.data.capacity
      ? parseInt(parsed.data.capacity, 10)
      : null;

    // Mise à jour de l'atelier
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: parsed.data.title,
          description: parsed.data.description,
          date: parsed.data.date,
          startTime: parsed.data.startTime,
          endTime: parsed.data.endTime,
          location: parsed.data.location,
          capacity,
          category: parsed.data.category,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Atelier introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Atelier mis à jour avec succès !",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'atelier :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/workshops/[id]
 * Supprime un atelier.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req: request, secret: env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return NextResponse.json({ error: "Accès interdit." }, { status: 403 });
  }

  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "ID d'atelier invalide." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db
      .collection("workshops")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Atelier introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Atelier supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'atelier :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression." },
      { status: 500 }
    );
  }
}
