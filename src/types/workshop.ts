import { z } from "zod";

/**
 * Schéma de validation d'un atelier avec Zod.
 * Utilisé pour valider le formulaire côté client et côté serveur.
 *
 * Collection MongoDB : "workshops"
 *
 * Structure d'un document :
 * {
 *   _id: ObjectId,
 *   title: string,           // Nom de l'atelier
 *   description: string,     // Description détaillée
 *   date: string,            // Date au format YYYY-MM-DD
 *   startTime: string,       // Heure de début (HH:mm)
 *   endTime: string,         // Heure de fin (HH:mm)
 *   location: string,        // Lieu / adresse
 *   capacity: number | null, // Capacité max (optionnel)
 *   category: string,        // Catégorie de l'atelier
 *   createdAt: Date,
 *   updatedAt: Date,
 * }
 */
export const workshopSchema = z
  .object({
    title: z
      .string()
      .min(1, "Le titre est obligatoire.")
      .min(3, "Le titre doit contenir au moins 3 caractères.")
      .max(100, "Le titre ne doit pas dépasser 100 caractères."),
    description: z
      .string()
      .min(1, "La description est obligatoire.")
      .min(10, "La description doit contenir au moins 10 caractères.")
      .max(1000, "La description ne doit pas dépasser 1000 caractères."),
    date: z.string().min(1, "La date est obligatoire."),
    startTime: z.string().min(1, "L'heure de début est obligatoire."),
    endTime: z.string().min(1, "L'heure de fin est obligatoire."),
    location: z
      .string()
      .min(1, "Le lieu est obligatoire.")
      .max(200, "Le lieu ne doit pas dépasser 200 caractères."),
    capacity: z.string().optional(),
    category: z.enum([
      "sport",
      "bien-etre",
      "decouverte",
      "inclusion",
      "culture",
      "autre",
    ], {
      message: "Veuillez choisir une catégorie.",
    }),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "L'heure de fin doit être après l'heure de début.",
    path: ["endTime"],
  });

export type WorkshopFormType = z.infer<typeof workshopSchema>;

/**
 * Type d'un atelier tel que stocké en base (avec les champs MongoDB).
 */
export type Workshop = {
  _id?: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};
