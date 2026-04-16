"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitWorkshop } from "@/hooks/use-submit-workshop";
import { useUpdateWorkshop } from "@/hooks/use-update-workshop";
import { useDeleteWorkshop } from "@/hooks/use-delete-workshop";
import { useWorkshops } from "@/hooks/use-workshops";
import {
  type WorkshopFormType,
  type Workshop,
  workshopSchema,
} from "@/types/workshop";

/**
 * Page d'administration : listing + formulaire d'ajout/modification d'ateliers.
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

const CATEGORY_LABELS: Record<string, string> = {
  sport: "🏃 Sport",
  "bien-etre": "🧘 Bien-être",
  decouverte: "🔍 Découverte",
  inclusion: "🤝 Inclusion",
  culture: "🎨 Culture",
  autre: "📌 Autre",
};

export default function AdminWorkshopsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { workshops, isLoading } = useWorkshops();
  const createMutation = useSubmitWorkshop();
  const updateMutation = useUpdateWorkshop();
  const deleteMutation = useDeleteWorkshop();

  const isEditing = editingWorkshop !== null;
  const isPending = createMutation.isPending || updateMutation.isPending;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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

  // Pré-remplir le formulaire quand on édite
  useEffect(() => {
    if (editingWorkshop) {
      setValue("title", editingWorkshop.title);
      setValue("description", editingWorkshop.description);
      setValue("date", editingWorkshop.date);
      setValue("startTime", editingWorkshop.startTime);
      setValue("endTime", editingWorkshop.endTime);
      setValue("location", editingWorkshop.location);
      setValue("capacity", editingWorkshop.capacity?.toString() || "");
      setValue("category", editingWorkshop.category as WorkshopFormType["category"]);
      setShowForm(true);
    }
  }, [editingWorkshop, setValue]);

  function handleEdit(workshop: Workshop) {
    setEditingWorkshop(workshop);
  }

  function handleCancelEdit() {
    setEditingWorkshop(null);
    setShowForm(false);
    reset();
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Supprimer l'atelier "${title}" ?`)) return;

    try {
      await deleteMutation.mutateAsync(id);
      setToast({ type: "success", message: `Atelier "${title}" supprimé.` });
    } catch {
      setToast({ type: "error", message: "Erreur lors de la suppression." });
    }
  }

  const onSubmit = async (data: WorkshopFormType) => {
    try {
      if (isEditing && editingWorkshop) {
        await updateMutation.mutateAsync({ id: editingWorkshop._id!, data });
        setToast({
          type: "success",
          message: "Atelier mis à jour avec succès !",
        });
      } else {
        const result = await createMutation.mutateAsync(data);
        setToast({
          type: "success",
          message: result.message || "Atelier créé avec succès !",
        });
      }
      reset();
      setShowForm(false);
      setEditingWorkshop(null);
    } catch {
      setToast({
        type: "error",
        message: "Erreur lors de l'enregistrement. Réessayez.",
      });
    }
  };

  return (
    <div className="px-8 py-12">
      {/* En-tête */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📅 Ateliers</h1>
          <p className="mt-1 text-gray-500">
            Gérez les ateliers du festival Solimouv'
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2 rounded-xl"
          >
            + Ajouter un atelier
          </button>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium text-white shadow-lg ${
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

      {/* Formulaire (ajout / modification) */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-8 space-y-6 rounded-2xl bg-white p-8 shadow-glow ring-1 ring-gray-100"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "✏️ Modifier l'atelier" : "Nouvel atelier"}
            </h2>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              ✕ Annuler
            </button>
          </div>

          {/* Titre */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700"
            >
              Titre <span className="text-brand-accent">*</span>
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
                    errors.title
                      ? "border-red-400 bg-red-50/50"
                      : "border-gray-200"
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
                  rows={3}
                  placeholder="Décrivez l'atelier..."
                  className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                    errors.description
                      ? "border-red-400 bg-red-50/50"
                      : "border-gray-200"
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

          {/* Catégorie + Date */}
          <div className="grid grid-cols-2 gap-4">
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
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

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
                      errors.date
                        ? "border-red-400 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                  />
                )}
              />
            </div>
          </div>

          {/* Horaires */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="startTime"
                className="block text-sm font-semibold text-gray-700"
              >
                Début <span className="text-brand-accent">*</span>
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
                      errors.startTime
                        ? "border-red-400 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="endTime"
                className="block text-sm font-semibold text-gray-700"
              >
                Fin <span className="text-brand-accent">*</span>
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
                      errors.endTime
                        ? "border-red-400 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                  />
                )}
              />
            </div>
          </div>

          {/* Lieu + Capacité */}
          <div className="grid grid-cols-2 gap-4">
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
                    placeholder="Ex : Gymnase Victor Hugo"
                    className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
                      errors.location
                        ? "border-red-400 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="capacity"
                className="block text-sm font-semibold text-gray-700"
              >
                Capacité{" "}
                <span className="font-normal text-gray-400">(optionnel)</span>
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
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                  />
                )}
              />
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-glow disabled:scale-100 disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Enregistrement...
              </span>
            ) : isEditing ? (
              "Enregistrer les modifications"
            ) : (
              "Ajouter l'atelier 🎉"
            )}
          </button>
        </form>
      )}

      {/* Listing */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Ateliers existants ({workshops.length})
        </h2>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-primary/30 border-t-brand-primary" />
          </div>
        )}

        {!isLoading && workshops.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-4xl">📭</p>
            <p className="mt-3 text-gray-500">Aucun atelier pour le moment.</p>
            <p className="text-sm text-gray-400">
              Cliquez sur "+ Ajouter un atelier" pour commencer.
            </p>
          </div>
        )}

        {!isLoading && workshops.length > 0 && (
          <div className="space-y-3">
            {workshops.map((workshop) => (
              <div
                key={workshop._id}
                className="flex items-center justify-between rounded-xl border-2 border-gray-100 bg-gray-50/50 px-5 py-4 transition-all hover:border-brand-primary/20 hover:bg-white"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">
                      {workshop.title}
                    </h3>
                    <span className="rounded-lg bg-brand-primary/10 px-2 py-0.5 text-xs font-medium text-brand-primary">
                      {CATEGORY_LABELS[workshop.category] || workshop.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                    {workshop.description}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                    <span>
                      📅{" "}
                      {new Date(workshop.date).toLocaleDateString("fr-FR")}
                    </span>
                    <span>
                      🕐 {workshop.startTime} - {workshop.endTime}
                    </span>
                    <span>📍 {workshop.location}</span>
                    {workshop.capacity && (
                      <span>👥 {workshop.capacity} places</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-4 flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(workshop)}
                    className="rounded-lg bg-brand-primary/10 px-3 py-2 text-xs font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                    title="Modifier"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(workshop._id!, workshop.title)
                    }
                    className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
