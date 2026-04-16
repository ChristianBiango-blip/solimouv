"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitWorkshop } from "@/hooks/use-submit-workshop";
import { type WorkshopFormType, workshopSchema } from "@/types/workshop";

/**
 * Page d'administration pour ajouter un atelier.
 * Accessible via /admin/workshops
 */

const CATEGORY_OPTIONS = [
  { value: "sport", label: "🏃 Sport" },
  { value: "bien-etre", label: "🧘 Bien-être" },
  { value: "decouverte", label: "🔍 Découverte" },
  { value: "inclusion", label: "🤝 Inclusion" },
  { value: "culture", label: "🎨 Culture" },
  { value: "autre", label: "📌 Autre" },
] as const;

export default function AdminWorkshopsPage() {
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { mutate, isPending } = useSubmitWorkshop();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkshopFormType>({
    resolver: zodResolver(workshopSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      capacity: "",
      category: "sport",
    },
  });

  const onSubmit = async (data: WorkshopFormType) => {
    try {
      const result = await mutate(data);
      setToast({
        type: "success",
        message: result.message || "Atelier ajouté avec succès !",
      });
      reset();
    } catch {
      setToast({
        type: "error",
        message: "Erreur lors de l'ajout de l'atelier. Réessayez.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* En-tête avec gradient */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <h1 className="text-3xl font-black text-gray-900">
              Ajouter un atelier
            </h1>
          </div>
          <p className="text-gray-500">
            Remplissez le formulaire ci-dessous pour ajouter un atelier au
            programme du festival Solimouv'.
          </p>
        </div>

        {/* Toast de notification */}
        {toast && (
          <div
            className={`mb-6 flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium text-white shadow-lg transition-all ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-red-500 to-rose-600"
            }`}
          >
            <span className="text-lg">
              {toast.type === "success" ? "✅" : "❌"}
            </span>
            {toast.message}
          </div>
        )}

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-2xl bg-white p-8 shadow-glow ring-1 ring-gray-100"
        >
          {/* Titre */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700"
            >
              Titre de l'atelier <span className="text-brand-accent">*</span>
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="title"
                  type="text"
                  placeholder="Ex : Yoga inclusif pour tous"
                  className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                    errors.title ? "border-red-400 bg-red-50/50" : "border-gray-200"
                  }`}
                />
              )}
            />
            {errors.title && (
              <p className="text-sm font-medium text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Description <span className="text-brand-accent">*</span>
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="description"
                  rows={4}
                  placeholder="Décrivez l'atelier, son public cible, les activités prévues..."
                  className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                    errors.description ? "border-red-400 bg-red-50/50" : "border-gray-200"
                  }`}
                />
              )}
            />
            {errors.description && (
              <p className="text-sm font-medium text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Catégorie */}
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700"
            >
              Catégorie <span className="text-brand-accent">*</span>
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="category"
                  className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                    errors.category ? "border-red-400 bg-red-50/50" : "border-gray-200"
                  }`}
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.category && (
              <p className="text-sm font-medium text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-gray-700"
            >
              Date <span className="text-brand-accent">*</span>
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="date"
                  type="date"
                  className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                    errors.date ? "border-red-400 bg-red-50/50" : "border-gray-200"
                  }`}
                />
              )}
            />
            {errors.date && (
              <p className="text-sm font-medium text-red-500">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Horaires */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="startTime"
                className="block text-sm font-semibold text-gray-700"
              >
                Heure de début <span className="text-brand-accent">*</span>
              </label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="startTime"
                    type="time"
                    className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                      errors.startTime ? "border-red-400 bg-red-50/50" : "border-gray-200"
                    }`}
                  />
                )}
              />
              {errors.startTime && (
                <p className="text-sm font-medium text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endTime"
                className="block text-sm font-semibold text-gray-700"
              >
                Heure de fin <span className="text-brand-accent">*</span>
              </label>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="endTime"
                    type="time"
                    className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                      errors.endTime ? "border-red-400 bg-red-50/50" : "border-gray-200"
                    }`}
                  />
                )}
              />
              {errors.endTime && (
                <p className="text-sm font-medium text-red-500">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Lieu */}
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Lieu <span className="text-brand-accent">*</span>
            </label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="location"
                  type="text"
                  placeholder="Ex : Gymnase Victor Hugo, Paris 11e"
                  className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                    errors.location ? "border-red-400 bg-red-50/50" : "border-gray-200"
                  }`}
                />
              )}
            />
            {errors.location && (
              <p className="text-sm font-medium text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Capacité */}
          <div className="space-y-2">
            <label
              htmlFor="capacity"
              className="block text-sm font-semibold text-gray-700"
            >
              Capacité max{" "}
              <span className="text-gray-400 font-normal">(optionnel)</span>
            </label>
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="capacity"
                  type="number"
                  min="1"
                  placeholder="Ex : 30"
                  className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                    errors.capacity ? "border-red-400 bg-red-50/50" : "border-gray-200"
                  }`}
                />
              )}
            />
            {errors.capacity && (
              <p className="text-sm font-medium text-red-500">
                {typeof errors.capacity.message === "string"
                  ? errors.capacity.message
                  : "Valeur invalide"}
              </p>
            )}
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-glow disabled:scale-100 disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Ajout en cours...
              </span>
            ) : (
              "Ajouter l'atelier 🎉"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
