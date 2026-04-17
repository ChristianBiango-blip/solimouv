import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getDb } from "@/lib/mongodb";

/**
 * POST /api/seed-admin
 * Crée un utilisateur admin par défaut s'il n'existe pas encore.
 *
 * ⚠️ À utiliser une seule fois pour initialiser le premier admin.
 * ⚠️ À supprimer ou protéger en production.
 *
 * Identifiants par défaut :
 *   Email : admin@solimouv.fr
 *   Mot de passe : admin123
 */
export async function POST() {
  try {
    const db = await getDb();
    const collection = db.collection("users");

    // Vérifie si un admin existe déjà
    const existingAdmin = await collection.findOne({ role: "admin" });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Un admin existe déjà." },
        { status: 409 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await hash("admin123", 12);

    // Création de l'admin
    const admin = {
      name: "Admin Solimouv",
      email: "admin@solimouv.fr",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    };

    await collection.insertOne(admin);

    return NextResponse.json({
      success: true,
      message: "Admin créé avec succès !",
      credentials: {
        email: "admin@solimouv.fr",
        password: "admin123",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'admin :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de l'admin." },
      { status: 500 }
    );
  }
}
