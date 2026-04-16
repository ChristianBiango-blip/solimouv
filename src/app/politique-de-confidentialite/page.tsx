import Navbar from "../components/Navbar";

const sections = [
  {
    title: "Donnees collectees",
    content: [
      "Selon les usages du site, Solimouv' peut collecter des donnees d'identification et de contact telles que le nom, l'adresse email et les informations necessaires a la gestion des comptes.",
      "Des donnees techniques peuvent egalement etre enregistrees pour assurer la securite, la maintenance et l'amelioration du service.",
    ],
  },
  {
    title: "Finalites du traitement",
    content: [
      "Les donnees sont utilisees pour gerer les inscriptions, administrer les comptes, repondre aux demandes de contact et assurer le bon fonctionnement du site.",
      "Elles peuvent aussi servir a produire des statistiques internes strictement liees a l'activite du festival et a son organisation.",
    ],
  },
  {
    title: "Base legale et duree de conservation",
    content: [
      "Les traitements reposent sur l'execution du service, le respect des obligations legales et, lorsque cela s'applique, le consentement de l'utilisateur.",
      "Les durees de conservation doivent etre precisees en fonction des obligations administratives et des besoins operationnels : a completer.",
    ],
  },
  {
    title: "Partage et securite",
    content: [
      "Les donnees ne sont communiquees qu'aux personnes ou prestataires autorises qui en ont besoin dans le cadre de leurs missions.",
      "Des mesures techniques et organisationnelles raisonnables sont mises en oeuvre pour proteger les donnees contre la perte, l'acces non autorise ou la divulgation.",
    ],
  },
  {
    title: "Vos droits",
    content: [
      "Conformement a la reglementation applicable, vous pouvez demander l'acces, la rectification, l'effacement, la limitation ou la portabilite de vos donnees, ainsi que vous opposer a certains traitements.",
      "Pour exercer ces droits ou poser une question, utilisez la page de contact. Les coordonnees du referent ou du delegue a la protection des donnees sont a completer si necessaire.",
    ],
  },
];

export default function PolitiqueDeConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe8ef_0%,#f7f4ff_38%,#ffffff_100%)]">
      <Navbar />
      <main className="container-custom py-10">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/70 bg-white/88 p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] backdrop-blur sm:p-8">
          <span className="inline-flex rounded-full bg-brand-secondary/10 px-4 py-1 text-sm font-semibold text-brand-secondary">
            Donnees personnelles
          </span>
          <h1 className="mt-4 text-4xl font-black text-gray-950">
            Politique de confidentialite
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Cette page explique comment Solimouv&apos; collecte, utilise et protege
            les donnees personnelles. Les elements marques &quot;a completer&quot;
            devront etre finalises avec les informations juridiques exactes de
            la structure.
          </p>

          <div className="mt-8 space-y-4">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-[1.75rem] border border-gray-200 bg-white p-5"
              >
                <h2 className="text-xl font-black text-gray-950">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
