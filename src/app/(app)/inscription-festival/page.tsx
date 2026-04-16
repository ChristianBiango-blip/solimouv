"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitFestivalRegistration } from "@/hooks/use-submit-festival-registration";
import {
  HANDICAP_OPTIONS,
  festivalRegistrationSchema,
  type FestivalRegistrationFormType,
} from "@/types/festival-registration";

const SEX_OPTIONS = [
  { value: "femme", label: "Femme" },
  { value: "homme", label: "Homme" },
  { value: "autre", label: "Autre" },
  { value: "non_precise", label: "Ne souhaite pas préciser" },
] as const;

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
 * Page d'inscription au festival Solimouv'.
 */
export default function FestivalRegistrationPage() {
  const registrationMutation = useSubmitFestivalRegistration();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FestivalRegistrationFormType>({
    resolver: zodResolver(festivalRegistrationSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      dateOfBirth: "",
      sex: "non_precise",
      email: "",
      phone: "",
      handicap: "malvoyant",
    },
  });

  const onSubmit = async (data: FestivalRegistrationFormType) => {
    const result = await registrationMutation.mutateAsync(data);

    if (result.success) {
      reset({
        lastName: "",
        firstName: "",
        dateOfBirth: "",
        sex: "non_precise",
        email: "",
        phone: "",
        handicap: "malvoyant",
      });
    }
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,rgba(66,0,254,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(242,56,167,0.12),transparent_26%),linear-gradient(180deg,#fffaf5_0%,#ffffff_42%,#f8fbff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <section className="rounded-[2rem] bg-[#231f20] p-8 text-white shadow-[0_24px_70px_rgba(35,31,32,0.2)] sm:p-10">
          <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Festival Solimouv'
          </p>
          <h1 className="mt-6 text-4xl leading-none font-black italic tracking-[-0.06em] sm:text-6xl">
            Inscription au festival
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-tight text-white/85 sm:text-xl">
            Renseignez vos informations pour participer au festival Solimouv'.
            Nous utilisons ces données pour l'organisation et les besoins
            d'accessibilité.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Inscription rapide</p>
              <p className="mt-1">Un formulaire court, validé en temps réel.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Organisation</p>
              <p className="mt-1">Les données partent en base et vers Make.</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-[linear-gradient(135deg,#4200fe,#f238a7,#ff270b)] p-5 text-white shadow-glow">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/85">
              Besoin d'aide ?
            </p>
            <p className="mt-2 text-base leading-tight text-white/95">
              Si vous avez une question sur l'inscription ou l'accessibilité,
              contactez l'équipe via la page contact.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(35,31,32,0.08)] ring-1 ring-gray-100 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Formulaire d'inscription
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Tous les champs sont obligatoires sauf le handicap si vous ne
                souhaitez rien préciser.
              </p>
            </div>
          </div>

          {registrationMutation.isSuccess && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm font-medium text-green-700">
              {registrationMutation.data.message}
              {!registrationMutation.data.webhookDelivered &&
                " L'inscription est bien enregistrée, mais l'envoi automatique au webhook a échoué."}
            </div>
          )}

          {registrationMutation.isError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-medium text-red-700">
              {registrationMutation.error.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="lastName"
                label="Nom"
                error={errors.lastName?.message}
                render={({ id, className }) => (
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={id}
                        type="text"
                        placeholder="Votre nom"
                        className={className}
                      />
                    )}
                  />
                )}
              />

              <Field
                id="firstName"
                label="Prénom"
                error={errors.firstName?.message}
                render={({ id, className }) => (
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={id}
                        type="text"
                        placeholder="Votre prénom"
                        className={className}
                      />
                    )}
                  />
                )}
              />

              <Field
                id="dateOfBirth"
                label="Date de naissance"
                error={errors.dateOfBirth?.message}
                render={({ id, className }) => (
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={id}
                        type="date"
                        className={className}
                      />
                    )}
                  />
                )}
              />

              <Field
                id="sex"
                label="Sexe"
                error={errors.sex?.message}
                render={({ id, className }) => (
                  <Controller
                    name="sex"
                    control={control}
                    render={({ field }) => (
                      <select {...field} id={id} className={className}>
                        {SEX_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                )}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="email"
                label="Email"
                error={errors.email?.message}
                render={({ id, className }) => (
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={id}
                        type="email"
                        placeholder="votre@email.fr"
                        className={className}
                      />
                    )}
                  />
                )}
              />

              <Field
                id="phone"
                label="Téléphone"
                error={errors.phone?.message}
                render={({ id, className }) => (
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={id}
                        type="tel"
                        placeholder="06 00 00 00 00"
                        className={className}
                      />
                    )}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Handicap
                </label>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  Sélectionnez une seule option.
                </p>
              </div>
              <Controller
                name="handicap"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {HANDICAP_OPTIONS.map((option) => {
                      const isChecked = field.value === option;

                      return (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 px-4 py-3 text-sm transition-all ${
                            isChecked
                              ? "border-brand-primary bg-brand-primary/5 text-gray-900"
                              : "border-gray-200 bg-gray-50 text-gray-700 hover:border-brand-primary/40 hover:bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="handicap"
                            checked={isChecked}
                            onChange={() => field.onChange(option)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                          />
                          <span className="leading-tight">
                            {HANDICAP_LABELS[option]}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              />
              {errors.handicap && (
                <p className="text-sm font-medium text-red-500">
                  {errors.handicap.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={registrationMutation.isPending}
              className="w-full rounded-2xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent px-5 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-glow disabled:scale-100 disabled:opacity-50"
            >
              {registrationMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Envoi de l'inscription...
                </span>
              ) : (
                "S'inscrire au festival"
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  render,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  render: (args: { id: string; className: string }) => React.ReactNode;
}) {
  const inputClassName = `w-full rounded-2xl border-2 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 ${
    error ? "border-red-400 bg-red-50/50" : "border-gray-200"
  }`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      {hint && <p className="text-xs leading-relaxed text-gray-500">{hint}</p>}
      {render({ id, className: inputClassName })}
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
