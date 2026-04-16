import { z } from "zod";

/**
 * Schéma de validation du formulaire de dons avec Zod.
 * Utilisé pour valider le formulaire côté client et côté serveur.
 */
export const donationSchema = z.object({
  lastName: z
    .string()
    .min(1, "Le nom est obligatoire.")
    .max(100, "Le nom ne doit pas dépasser 100 caractères."),
  firstName: z
    .string()
    .min(1, "Le prénom est obligatoire.")
    .max(100, "Le prénom ne doit pas dépasser 100 caractères."),
  email: z
    .string()
    .min(1, "L'email est obligatoire.")
    .email("Veuillez entrer une adresse email valide."),
  amount: z
    .string()
    .min(1, "Le montant du don est obligatoire.")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Le montant doit être un nombre positif."
    )
    .refine(
      (val) => Number(val) >= 1,
      "Le montant minimum est de 1 €."
    )
    .refine(
      (val) => Number(val) <= 100000,
      "Le montant maximum est de 100 000 €."
    ),
});

export type DonationFormType = z.infer<typeof donationSchema>;
