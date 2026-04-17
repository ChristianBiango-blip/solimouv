"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitDonation } from "@/hooks/use-submit-donation";
import { donationSchema, type DonationFormType } from "@/types/donation";

export default function DonsPage() {
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const mutation = useSubmitDonation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DonationFormType>({
    resolver: zodResolver(donationSchema),
    defaultValues: { lastName: "", firstName: "", email: "", amount: "" },
  });

  const onSubmit = async (data: DonationFormType) => {
    try {
      const result = await mutation.mutateAsync(data);
      setToast({ type: "success", message: result.message || "Merci pour votre don !" });
      reset();
    } catch {
      setToast({ type: "error", message: "Erreur lors de l'envoi du don. Veuillez réessayer." });
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          <span aria-hidden="true">💝</span>
          {" "}Faire un don
        </h1>
        <p className="mt-3 text-gray-500">
          Soutenez le festival Solimouv&apos; et contribuez à rendre la culture
          accessible à tous.
        </p>
      </div>

      {/* Toast — annoncé dynamiquement aux lecteurs d'écran */}
      {toast && (
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          className={`mx-auto mt-6 flex max-w-2xl items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium text-white shadow-lg ${
            toast.type === "success"
              ? "bg-gradient-to-r from-green-500 to-emerald-600"
              : "bg-gradient-to-r from-red-500 to-rose-600"
          }`}
        >
          <span aria-hidden="true" className="text-lg">
            {toast.type === "success" ? "✅" : "❌"}
          </span>
          {toast.message}
          <button
            onClick={() => setToast(null)}
            className="ml-auto opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            aria-label="Fermer la notification"
          >
            ✕
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-labelledby="dons-title"
        className="mx-auto mt-10 max-w-2xl space-y-6 rounded-2xl bg-white p-8 shadow-glow ring-1 ring-gray-100"
      >
        {/* Nom & Prénom */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
              Nom{" "}
              <span className="text-brand-accent" aria-hidden="true">*</span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="lastName"
                  type="text"
                  placeholder="Dupont"
                  autoComplete="family-name"
                  className={`w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-colors ${
                    errors.lastName
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-200 bg-gray-50 focus:border-brand-primary focus:bg-white"
                  }`}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
              )}
            />
            {errors.lastName && (
              <p id="lastName-error" role="alert" className="text-xs text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
              Prénom{" "}
              <span className="text-brand-accent" aria-hidden="true">*</span>
              <span className="sr-only">(obligatoire)</span>
            </label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="firstName"
                  type="text"
                  placeholder="Marie"
                  autoComplete="given-name"
                  className={`w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-colors ${
                    errors.firstName
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-200 bg-gray-50 focus:border-brand-primary focus:bg-white"
                  }`}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
              )}
            />
            {errors.firstName && (
              <p id="firstName-error" role="alert" className="text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email{" "}
            <span className="text-brand-accent" aria-hidden="true">*</span>
            <span className="sr-only">(obligatoire)</span>
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                placeholder="marie.dupont@email.com"
                autoComplete="email"
                className={`w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-colors ${
                  errors.email
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-gray-200 bg-gray-50 focus:border-brand-primary focus:bg-white"
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            )}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Montant */}
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">
            Montant du don (€){" "}
            <span className="text-brand-accent" aria-hidden="true">*</span>
            <span className="sr-only">(obligatoire)</span>
          </label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <input
                  {...field}
                  id="amount"
                  type="number"
                  min="1"
                  max="100000"
                  step="any"
                  placeholder="50"
                  className={`w-full rounded-xl border-2 px-4 py-3 pr-10 text-sm outline-none transition-colors ${
                    errors.amount
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-200 bg-gray-50 focus:border-brand-primary focus:bg-white"
                  }`}
                  aria-invalid={!!errors.amount}
                  aria-describedby={errors.amount ? "amount-error" : undefined}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400" aria-hidden="true">
                  €
                </span>
              </div>
            )}
          />
          {errors.amount && (
            <p id="amount-error" role="alert" className="text-xs text-red-500">
              {errors.amount.message}
            </p>
          )}

          {/* Suggestions de montants */}
          <div className="flex flex-wrap gap-2 pt-2" role="group" aria-label="Montants suggérés">
            {[10, 25, 50, 100].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setValue("amount", String(suggestion))}
                aria-label={`Définir le montant à ${suggestion} euros`}
                className="rounded-lg border-2 border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
              >
                {suggestion} €
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          aria-busy={mutation.isPending}
          className="btn-primary w-full rounded-xl py-4 text-base font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                aria-hidden="true"
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Envoi en cours…
            </span>
          ) : (
            <>
              Envoyer mon don{" "}
              <span aria-hidden="true">💝</span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          Vos données sont transmises de manière sécurisée.
        </p>
      </form>
    </div>
  );
}
