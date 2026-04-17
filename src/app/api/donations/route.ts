import { NextRequest, NextResponse } from "next/server";
import { donationSchema } from "@/types/donation";

const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/xojffvhxivp3n7fv43ipghp9oth6cugs";

/**
 * POST /api/donations
 * Valide les données du formulaire de don et les transmet au webhook Make.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation côté serveur avec Zod
    const parsed = donationSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0];
      return NextResponse.json(
        { success: false, error: firstError || "Données invalides." },
        { status: 400 }
      );
    }

    const donationData = {
      ...parsed.data,
      amount: Number(parsed.data.amount),
      submittedAt: new Date().toISOString(),
    };

    // Envoi vers le webhook Make
    const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    });

    if (!webhookResponse.ok) {
      console.error(
        "Webhook Make error:",
        webhookResponse.status,
        webhookResponse.statusText
      );
      return NextResponse.json(
        { success: false, error: "Erreur lors de l'envoi au service externe." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Merci pour votre don ! Il a bien été enregistré.",
    });
  } catch (error) {
    console.error("Donation API error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
