import Navbar from "../components/Navbar";

const sections = [
  {
    title: "Editeur du site",
    content: [
      "Le site Solimouv' est edite par Up Sport ! dans le cadre de ses actions autour du sport, de l'inclusion et de la solidarite.",
      "Nom de la structure : Up Sport !",
      "Statut, adresse du siege, numero SIREN/SIRET et responsable de publication : a completer.",
    ],
  },
  {
    title: "Hebergement",
    content: [
      "Les informations relatives a l'hebergeur technique du site doivent etre precisees ici.",
      "Nom de l'hebergeur, adresse postale et contact : a completer.",
    ],
  },
  {
    title: "Propriete intellectuelle",
    content: [
      "L'ensemble des contenus presents sur le site, incluant notamment les textes, visuels, elements graphiques, logos et marques, est protege par le droit de la propriete intellectuelle.",
      "Toute reproduction, representation, adaptation ou exploitation, totale ou partielle, sans autorisation prealable, est interdite sauf disposition legale contraire.",
    ],
  },
  {
    title: "Responsabilite",
    content: [
      "Solimouv' s'efforce de diffuser des informations fiables et a jour, sans garantir l'absence d'erreurs, d'omissions ou d'indisponibilites temporaires.",
      "L'utilisateur reste responsable de l'usage qu'il fait des informations diffusees sur le site.",
    ],
  },
  {
    title: "Contact",
    content: [
      "Pour toute demande legale, administrative ou editoriale, merci d'utiliser la page de contact du site.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#eef2ff_0%,#fff6e8_38%,#ffffff_100%)]">
      <Navbar />
      <main className="container-custom py-10">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/70 bg-white/88 p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] backdrop-blur sm:p-8">
          <span className="inline-flex rounded-full bg-brand-primary/10 px-4 py-1 text-sm font-semibold text-brand-primary">
            Cadre legal
          </span>
          <h1 className="mt-4 text-4xl font-black text-gray-950">
            Mentions legales
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Cette page rassemble les informations legales essentielles du site
            Solimouv&apos;. Les champs indiques &quot;a completer&quot; servent de pense-bete
            avant publication finale.
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
