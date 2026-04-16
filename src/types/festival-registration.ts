import { z } from "zod";

/**
 * Schéma de validation d'une inscription au festival.
 * Utilisé côté client et côté serveur.
 */
export const festivalRegistrationSchema = z.object({
  lastName: z
    .string()
    .trim()
    .min(1, "Le nom est obligatoire.")
    .max(100, "Le nom ne doit pas dépasser 100 caractères."),
  firstName: z
    .string()
    .trim()
    .min(1, "Le prénom est obligatoire.")
    .max(100, "Le prénom ne doit pas dépasser 100 caractères."),
  dateOfBirth: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Veuillez saisir une date de naissance valide."),
  sex: z.enum(["femme", "homme", "autre", "non_precise"], {
    message: "Veuillez sélectionner un sexe.",
  }),
  email: z
    .string()
    .trim()
    .min(1, "L'email est obligatoire.")
    .email("Veuillez entrer une adresse email valide."),
  phone: z
    .string()
    .trim()
    .min(1, "Le téléphone est obligatoire.")
    .max(30, "Le téléphone ne doit pas dépasser 30 caractères."),
  handicap: z.array(z.string()).default([]),
});

export type FestivalRegistrationFormType = z.infer<
  typeof festivalRegistrationSchema
>;
