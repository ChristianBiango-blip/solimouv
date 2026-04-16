import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getDb } from "@/lib/mongodb";

/**
 * POST /api/auth/register
 * Crée un nouveau compte utilisateur.
 *
 * Body attendu :
 * { "name": "string", "email": "string", "password": "string" }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validation basique
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nom, email et mot de passe requis." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("users");

    // Vérifie si l'email est déjà utilisé
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet email." },
        { status: 409 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await hash(password, 12);

    // Création de l'utilisateur (rôle "user" par défaut)
    const user = {
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    };

    await collection.insertOne(user);

    return NextResponse.json(
      {
        success: true,
        message: "Compte créé avec succès ! Vous pouvez maintenant vous connecter.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription." },
      { status: 500 }
    );
  }
}
