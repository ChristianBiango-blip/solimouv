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
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Ajouter un atelier
        </h1>
        <p className="mb-8 text-gray-600">
          Remplissez le formulaire ci-dessous pour ajouter un atelier au
          programme du festival Solimouv'.
        </p>

        {/* Toast de notification */}
        {toast && (
          <div
            className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium text-white ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
        >
          {/* Titre */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre de l'atelier <span className="text-red-500">*</span>
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
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
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
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Catégorie */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="category"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.category ? "border-red-500" : "border-gray-300"
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
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="date"
                  type="date"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.date && (
              <p className="text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          {/* Horaires */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                Heure de début <span className="text-red-500">*</span>
              </label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="startTime"
                    type="time"
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                      errors.startTime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.startTime && (
                <p className="text-sm text-red-600">{errors.startTime.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                Heure de fin <span className="text-red-500">*</span>
              </label>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="endTime"
                    type="time"
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                      errors.endTime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.endTime && (
                <p className="text-sm text-red-600">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Lieu */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Lieu <span className="text-red-500">*</span>
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
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          {/* Capacité */}
          <div className="space-y-2">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacité max <span className="text-gray-400">(optionnel)</span>
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
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.capacity ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.capacity && (
              <p className="text-sm text-red-600">
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
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Ajout en cours..." : "Ajouter l'atelier"}
          </button>
        </form>
      </div>
    </div>
  );
}
