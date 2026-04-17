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
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-4 rounded-[20px] bg-brand-primary p-4">
          <h1 className="font-black italic text-2xl leading-[33px] tracking-[-0.06em] text-white">
            Inscription au festival
          </h1>

          {registrationMutation.isSuccess && (
            <div className="rounded-[8px] bg-white/20 px-4 py-3 text-sm font-medium text-white">
              {registrationMutation.data.message}
              {!registrationMutation.data.webhookDelivered &&
                " L'inscription est bien enregistrée, mais l'envoi automatique au webhook a échoué."}
            </div>
          )}

          {registrationMutation.isError && (
            <div className="rounded-[8px] bg-white/20 px-4 py-3 text-sm font-medium text-white">
              {registrationMutation.error.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                        placeholder="Nom"
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
                        placeholder="Prénom"
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

            <div className="flex flex-col gap-2">
              <div>
                <label className="block text-[17px] font-bold leading-[20px] text-white">
                  Handicap
                </label>
                <p className="mt-1 text-xs text-white/70">
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
                          className={`flex cursor-pointer items-start gap-3 rounded-[8px] px-4 py-3 text-sm transition-all ${
                            isChecked
                              ? "bg-white text-[#211f1f]"
                              : "bg-white/20 text-white hover:bg-white/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="handicap"
                            checked={isChecked}
                            onChange={() => field.onChange(option)}
                            className="mt-1 h-4 w-4"
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
                <p className="text-sm font-medium text-white/90">
                  {errors.handicap.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={registrationMutation.isPending}
              className="h-[50px] w-full rounded-[8px] bg-[#211f1f] text-[17px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {registrationMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Envoi de l&apos;inscription...
                </span>
              ) : (
                "S'inscrire au festival"
              )}
            </button>
          </form>
        </div>
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
  const inputClassName = `w-full h-[50px] rounded-[8px] bg-white px-4 text-sm text-[#211f1f] outline-none transition-all placeholder:text-[#6c6c6c] focus:ring-2 focus:ring-white/60 ${
    error ? "ring-2 ring-red-300" : ""
  }`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="block text-[17px] font-bold leading-[20px] text-white">
        {label}
      </label>
      {hint && <p className="text-xs text-white/70">{hint}</p>}
      {render({ id, className: inputClassName })}
      {error && <p className="text-sm font-medium text-white/90">{error}</p>}
    </div>
  );
}
