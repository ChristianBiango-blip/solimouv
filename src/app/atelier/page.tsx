import type { Metadata } from "next";
import AteliersScreen from "./AteliersScreen";

export const metadata: Metadata = {
  title: "Ateliers — Solimouv'",
  description:
    "Découvrez les ateliers Solimouv' : yoga adapté, boxe mixte, basket, foot, badminton et bien plus encore. Bougez à votre rythme.",
};

export default function AtelierPage() {
  return <AteliersScreen />;
}
