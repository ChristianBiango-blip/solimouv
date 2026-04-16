import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  festivalRegistrationSchema,
  HANDICAP_OPTIONS,
} from "@/types/festival-registration";

const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/wxnehl1xuhaac45b1sl7ssd58oywwoet";

const HANDICAP_LABELS: Record<(typeof HANDICAP_OPTIONS)[number], string> = {
  malvoyant: "Malvoyant",
  ampute_haut_du_corps: "Amputé haut du corps",
  ampute_bas_du_corps: "Amputé bas du corps",
  malentendant: "Malentendant",
  tetraplegique: "Tétraplégique",
  paraplegique: "Paraplégique",
  autisme: "Autisme",
  avc: "Accident vasculaire cérébral (AVC)",
};

/**
 * POST /api/festival-registrations
 * Crée une inscription festival en base et transmet les données au webhook Make.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = festivalRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => issue.message);
      return NextResponse.json(
        { error: "Données invalides", details: errors },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("festival_registrations");

    const registration = {
      lastName: parsed.data.lastName,
      firstName: parsed.data.firstName,
      dateOfBirth: parsed.data.dateOfBirth,
      sex: parsed.data.sex,
      email: parsed.data.email,
      phone: parsed.data.phone,
      handicap: parsed.data.handicap,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(registration);

    let webhookDelivered = false;

    try {
      const webhookResponse = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...registration,
          handicapLabel: HANDICAP_LABELS[registration.handicap],
          insertedId: result.insertedId.toString(),
        }),
      });

      webhookDelivered = webhookResponse.ok;

      if (!webhookResponse.ok) {
        console.error(
          "Erreur webhook Make lors de l'inscription au festival :",
          webhookResponse.status,
          webhookResponse.statusText
        );
      }
    } catch (webhookError) {
      console.error(
        "Impossible d'envoyer l'inscription festival au webhook Make :",
        webhookError
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inscription au festival enregistrée avec succès !",
        insertedId: result.insertedId,
        webhookDelivered,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription au festival :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription au festival." },
      { status: 500 }
    );
  }
}
