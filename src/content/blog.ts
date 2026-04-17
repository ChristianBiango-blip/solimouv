export type BlogBlock =
  | { type: "paragraph"; content: string }
  | { type: "highlight"; content: string }
  | { type: "list"; items: string[] };

export type BlogSection = {
  title: string;
  blocks: BlogBlock[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  intro: string;
  sections: BlogSection[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "festival-solimouv-paris",
    title:
      "Festival Solimouv à Paris : programme, activités sportives et infos pratiques",
    description:
      "Le programme du festival Solimouv à Paris, ses activités sportives inclusives et les infos pratiques pour en profiter.",
    excerpt:
      "À la recherche d'une sortie gratuite à Paris qui allie sport, découverte et convivialité ? Le festival Solimouv à Paris est un événement sport inclusif unique...",
    coverImage: "/blog/event-1.jpeg",
    coverAlt: "Activité sportive accompagnée sur le terrain",
    category: "Festival",
    readTime: "4 min",
    publishedAt: "2026-04-17",
    intro:
      "À la recherche d'une sortie gratuite à Paris qui allie sport, découverte et convivialité ? Le festival Solimouv à Paris est un événement sport inclusif à Paris unique qui permet à tous de découvrir des activités sportives à Paris, accessibles et gratuites.",
    sections: [
      {
        title: "Solimouv à Paris : un festival de sport inclusif ouvert à tous",
        blocks: [
          {
            type: "paragraph",
            content:
              "Chaque année, ce festival sport été Paris rassemble associations, participants et curieux autour d'une même ambition : rendre le sport accessible à tous.",
          },
          {
            type: "highlight",
            content: "Un événement sportif gratuit au coeur de Paris",
          },
          {
            type: "paragraph",
            content:
              "Le festival Solimouv Paris est un festival gratuit à Paris qui propose une journée dédiée au sport, à la rencontre et au partage. Installé en plein coeur de la capitale, il s'impose comme une réponse idéale à la question :",
          },
          {
            type: "highlight",
            content: "→ que faire à Paris sport ?",
          },
          {
            type: "paragraph",
            content:
              "Ouvert à tous, il permet de découvrir gratuitement des pratiques sportives variées dans un cadre bienveillant.",
          },
          {
            type: "highlight",
            content: "Le concept du sport inclusif et accessible",
          },
          {
            type: "paragraph",
            content:
              "Le sport inclusif Paris repose sur un principe simple : permettre à chacun de pratiquer une activité, quels que soient ses capacités ou son niveau.",
          },
          {
            type: "list",
            items: [
              "des activités adaptées",
              "un encadrement bienveillant",
              "une accessibilité pensée pour tous",
            ],
          },
          {
            type: "highlight",
            content: "→ L'objectif : faire du sport un moment de partage, sans barrière.",
          },
          {
            type: "highlight",
            content: "À qui s'adresse le festival Solimouv",
          },
          {
            type: "paragraph",
            content: "Le festival sport Paris Solimouv s'adresse à :",
          },
          {
            type: "list",
            items: [
              "des personnes en situation de handicap",
              "des familles",
              "des sportifs débutants ou confirmés",
              "toute personne souhaitant découvrir de nouvelles pratiques",
            ],
          },
          {
            type: "highlight",
            content:
              "→ C'est un événement pensé pour tous ceux qui veulent vivre une expérience sportive différente.",
          },
        ],
      },
      {
        title: "Programme Solimouv : quelles activités sportives découvrir à Paris ?",
        blocks: [
          {
            type: "highlight",
            content: "Activités inclusives (cécifoot, boccia, yoga...)",
          },
          {
            type: "paragraph",
            content:
              "Le programme du festival sport inclusif Paris met en avant des activités variées et accessibles :",
          },
          {
            type: "list",
            items: ["cécifoot", "boccia", "yoga adapté", "activités douces"],
          },
          {
            type: "paragraph",
            content:
              "Ces disciplines permettent de découvrir des pratiques souvent méconnues, dans un cadre inclusif.",
          },
          {
            type: "highlight",
            content: "Initiations sportives gratuites",
          },
          {
            type: "paragraph",
            content:
              "Le festival gratuit Paris Solimouv propose de nombreuses initiations ouvertes à tous.",
          },
          {
            type: "highlight",
            content:
              "→ Aucun niveau requis : chacun peut tester, découvrir et expérimenter à son rythme.",
          },
          {
            type: "highlight",
            content: "Activités adaptées à tous les niveaux",
          },
          {
            type: "paragraph",
            content:
              "Que vous soyez débutant ou sportif confirmé, les activités sportives Paris proposées sont pensées pour s'adapter à chacun.",
          },
          {
            type: "highlight",
            content: "→ L'objectif : permettre à tous de participer sans pression.",
          },
        ],
      },
      {
        title: "Dates, lieu et accès au festival Solimouv à Paris",
        blocks: [
          {
            type: "highlight",
            content: "Dates et horaires du festival",
          },
          {
            type: "paragraph",
            content:
              "Le festival Solimouv Paris se déroule sur une journée, généralement en période estivale, avec un accès libre tout au long de la journée.",
          },
          {
            type: "highlight",
            content:
              "→ Horaires flexibles pour permettre à chacun de participer selon ses disponibilités.",
          },
          {
            type: "highlight",
            content: "Lieu et arrondissement à Paris",
          },
          {
            type: "paragraph",
            content:
              "Organisé dans un espace accessible de la capitale, le festival prend place dans un arrondissement central de Paris, facilement accessible.",
          },
          {
            type: "highlight",
            content: "→ Un emplacement pensé pour accueillir tous les publics.",
          },
          {
            type: "highlight",
            content: "Accès métro, bus et PMR",
          },
          {
            type: "paragraph",
            content: "L'accès au festival sport Paris est facilité :",
          },
          {
            type: "list",
            items: [
              "transports en commun (métro, bus)",
              "accès PMR",
              "cheminements adaptés",
            ],
          },
          {
            type: "highlight",
            content: "→ L'objectif : garantir une accessibilité maximale.",
          },
        ],
      },
      {
        title: "Pourquoi participer au festival Solimouv à Paris ?",
        blocks: [
          {
            type: "highlight",
            content: "Découvrir des sports inclusifs",
          },
          {
            type: "paragraph",
            content:
              "Participer à Solimouv, c'est découvrir une autre manière de pratiquer le sport.",
          },
          {
            type: "highlight",
            content:
              "→ Une occasion unique de tester des disciplines accessibles et inclusives.",
          },
          {
            type: "highlight",
            content: "Participer à un événement solidaire",
          },
          {
            type: "paragraph",
            content:
              "Le festival Solimouv Paris est aussi un événement engagé, porté par des associations qui oeuvrent pour l'inclusion.",
          },
          {
            type: "highlight",
            content: "→ Un moment qui allie sport et engagement.",
          },
          {
            type: "highlight",
            content: "Profiter d'une activité gratuite à Paris",
          },
          {
            type: "paragraph",
            content: "Enfin, c'est une sortie Paris gratuite idéale pour :",
          },
          {
            type: "list",
            items: [
              "passer un moment convivial",
              "faire du sport",
              "découvrir de nouvelles activités",
            ],
          },
          {
            type: "highlight",
            content:
              "→ Une réponse concrète à la question : que faire à Paris sport ?",
          },
        ],
      },
    ],
  },
  {
    slug: "activites-sportives-inclusives-paris",
    title:
      "Activités sportives inclusives à Paris : que faire avec Solimouv ?",
    description:
      "Pourquoi le sport inclusif à Paris change l'expérience des participants, et quelles activités découvrir avec Solimouv.",
    excerpt:
      "Une activité accessible change immédiatement la qualité d'un événement et rend la participation plus naturelle, plus lisible et plus collective...",
    coverImage: "/blog/event-2.png",
    coverAlt: "Pratique sportive inclusive en fauteuil roulant",
    category: "Inclusion",
    readTime: "5 min",
    publishedAt: "2026-04-17",
    intro:
      "Vous cherchez une activité sportive à Paris accessible et ouverte à tous ? Le sport inclusif à Paris se développe de plus en plus, et le festival Solimouv' est une excellente opportunité pour découvrir des pratiques adaptées à chacun. Que vous soyez débutant ou à la recherche d'une activité accessible handicap à Paris, Solimouv' propose une approche différente du sport : plus ouverte, plus humaine et plus inclusive.",
    sections: [
      {
        title: "Pourquoi pratiquer un sport inclusif à Paris ?",
        blocks: [
          {
            type: "highlight",
            content: "Les bienfaits du sport pour tous",
          },
          {
            type: "paragraph",
            content:
              "Le sport pour tous à Paris permet de bénéficier des nombreux bienfaits de l'activité physique :",
          },
          {
            type: "list",
            items: [
              "amélioration de la santé",
              "bien-être mental",
              "confiance en soi",
            ],
          },
          {
            type: "highlight",
            content:
              "👉 Le sport inclusif Paris vise à rendre ces bénéfices accessibles à chacun, sans distinction.",
          },
          {
            type: "highlight",
            content: "Une pratique accessible à tous les publics",
          },
          {
            type: "paragraph",
            content:
              "Le sport adapté Paris repose sur l'idée que chaque personne peut pratiquer une activité, quel que soit son niveau ou sa situation.",
          },
          {
            type: "paragraph",
            content:
              "À travers des dispositifs spécifiques, les activités sportives inclusives permettent :",
          },
          {
            type: "list",
            items: [
              "une adaptation des règles",
              "un encadrement adapté",
              "un rythme personnalisé",
            ],
          },
          {
            type: "highlight",
            content: "Inclusion sociale par le sport",
          },
          {
            type: "paragraph",
            content:
              "Le sport handicap Paris joue un rôle clé dans l'inclusion sociale.",
          },
          {
            type: "highlight",
            content: "👉 Il permet de :",
          },
          {
            type: "list",
            items: [
              "créer du lien",
              "favoriser les rencontres",
              "lutter contre l'isolement",
            ],
          },
          {
            type: "paragraph",
            content:
              "Le sport devient alors un véritable outil de cohésion sociale.",
          },
        ],
      },
      {
        title: "Les activités sportives inclusives proposées à Solimouv",
        blocks: [
          {
            type: "highlight",
            content: "Le cécifoot et sports adaptés",
          },
          {
            type: "paragraph",
            content:
              "Parmi les activités proposées, le cécifoot est un exemple emblématique du sport inclusif Paris.",
          },
          {
            type: "highlight",
            content:
              "👉 D'autres sports adaptés sont également accessibles, permettant à chacun de tester des pratiques dans un cadre sécurisé et bienveillant.",
          },
          {
            type: "highlight",
            content: "Yoga, danse et activités douces",
          },
          {
            type: "paragraph",
            content: "Le festival propose aussi des activités comme :",
          },
          {
            type: "list",
            items: ["yoga", "danse", "activités physiques inclusives douces"],
          },
          {
            type: "highlight",
            content:
              "👉 Idéal pour les personnes recherchant une activité physique inclusive accessible et sans pression.",
          },
          {
            type: "highlight",
            content: "Activités ludiques accessibles",
          },
          {
            type: "paragraph",
            content:
              "Certaines activités sont pensées pour être à la fois sportives et ludiques :",
          },
          {
            type: "list",
            items: [
              "jeux collectifs",
              "animations sportives",
              "découvertes interactives",
            ],
          },
          {
            type: "highlight",
            content:
              "👉 Une manière simple et agréable de pratiquer une activité plein air Paris.",
          },
        ],
      },
      {
        title: "Des activités sportives gratuites et accessibles à Paris",
        blocks: [
          {
            type: "highlight",
            content: "Activités gratuites en plein air",
          },
          {
            type: "paragraph",
            content:
              "Solimouv' propose des activités sportives gratuites à Paris, accessibles en extérieur.",
          },
          {
            type: "highlight",
            content:
              "👉 Une solution idéale pour pratiquer sans contrainte financière.",
          },
          {
            type: "highlight",
            content: "Accessibilité pour tous les niveaux",
          },
          {
            type: "paragraph",
            content: "Les activités sportives Paris proposées sont adaptées à tous :",
          },
          {
            type: "list",
            items: ["débutants", "personnes en reprise", "sportifs réguliers"],
          },
          {
            type: "highlight",
            content: "👉 Chacun peut participer à son rythme.",
          },
          {
            type: "highlight",
            content: "Sport inclusif pour débutants",
          },
          {
            type: "paragraph",
            content:
              "Le sport pour tous Paris est particulièrement adapté aux personnes qui souhaitent reprendre une activité.",
          },
          {
            type: "highlight",
            content:
              "👉 Aucun prérequis n'est nécessaire : l'objectif est de découvrir et d'essayer.",
          },
        ],
      },
      {
        title: "Où pratiquer ces sports inclusifs à Paris toute l'année ?",
        blocks: [
          {
            type: "highlight",
            content: "Associations sportives inclusives",
          },
          {
            type: "paragraph",
            content:
              "Après Solimouv', il est possible de continuer grâce à de nombreuses associations sportives inclusives à Paris.",
          },
          {
            type: "highlight",
            content:
              "👉 Elles proposent des activités adaptées tout au long de l'année.",
          },
          {
            type: "highlight",
            content: "Clubs et structures adaptées",
          },
          {
            type: "paragraph",
            content:
              "Des clubs spécialisés permettent de pratiquer un sport adapté Paris dans un cadre encadré.",
          },
          {
            type: "highlight",
            content: "👉 Une solution pour s'engager sur le long terme.",
          },
          {
            type: "highlight",
            content: "Continuer après Solimouv",
          },
          {
            type: "paragraph",
            content: "Le festival est souvent une première étape.",
          },
          {
            type: "highlight",
            content: "👉 Il permet de :",
          },
          {
            type: "list",
            items: [
              "découvrir une activité",
              "rencontrer des structures",
              "poursuivre une pratique régulière",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sport-inclusif-france-solimouv",
    title: "Sport inclusif en France : pourquoi Solimouv à Paris est essentiel",
    description:
      "Les enjeux du sport inclusif en France et la manière dont Solimouv à Paris aide à lever les freins d'accès à la pratique.",
    excerpt:
      "Une activité légère, un cadre convivial et un rythme fluide suffisent parfois à créer un vrai moment collectif et durable...",
    coverImage: "/blog/event-ping-pong.png",
    coverAlt: "Partie de tennis de table en plein air",
    category: "Impact",
    readTime: "5 min",
    publishedAt: "2026-04-17",
    intro:
      "Le sport inclusif en France est aujourd'hui un enjeu majeur pour favoriser l'inclusion par le sport et garantir un meilleur accès au sport pour tous. Face aux inégalités encore présentes, des initiatives comme Solimouv' à Paris jouent un rôle clé dans le développement du sport handicap en France et du sport pour tous en France.",
    sections: [
      {
        title: "Le sport inclusif : définition et enjeux",
        blocks: [
          {
            type: "highlight",
            content: "Qu'est-ce que le sport inclusif ?",
          },
          {
            type: "paragraph",
            content:
              "Le sport inclusif France désigne une pratique sportive ouverte à tous, quels que soient les capacités, le niveau ou la situation de chacun.",
          },
          {
            type: "highlight",
            content: "👉 Il repose sur :",
          },
          {
            type: "list",
            items: [
              "l'adaptation des activités",
              "l'accessibilité des équipements",
              "l'inclusion de tous les publics",
            ],
          },
          {
            type: "paragraph",
            content:
              "L'objectif est de permettre à chacun de pratiquer dans les mêmes conditions.",
          },
          {
            type: "highlight",
            content: "Les publics concernés",
          },
          {
            type: "paragraph",
            content:
              "Le sport et inclusion sociale concerne une grande diversité de publics :",
          },
          {
            type: "list",
            items: [
              "personnes en situation de handicap",
              "personnes éloignées du sport",
              "publics en situation de fragilité sociale",
              "débutants",
            ],
          },
          {
            type: "highlight",
            content:
              "👉 Le sport devient alors un outil universel de participation.",
          },
          {
            type: "highlight",
            content: "Les enjeux sociétaux",
          },
          {
            type: "paragraph",
            content:
              "Développer le sport inclusif en France permet de répondre à plusieurs enjeux :",
          },
          {
            type: "list",
            items: [
              "lutter contre l'exclusion",
              "favoriser la cohésion sociale",
              "améliorer le bien-être",
            ],
          },
          {
            type: "highlight",
            content:
              "👉 L'inclusion par le sport devient un levier d'impact social fort.",
          },
        ],
      },
      {
        title: "Les inégalités d'accès au sport en France",
        blocks: [
          {
            type: "highlight",
            content: "Handicap et accessibilité",
          },
          {
            type: "paragraph",
            content:
              "L'un des principaux freins reste l'accessibilité sport Paris et plus largement en France.",
          },
          {
            type: "highlight",
            content:
              "👉 De nombreuses infrastructures ou activités ne sont pas encore adaptées à tous les publics.",
          },
          {
            type: "highlight",
            content: "Inégalités sociales",
          },
          {
            type: "paragraph",
            content:
              "Les inégalités sport France sont également liées à des facteurs économiques et sociaux.",
          },
          {
            type: "highlight",
            content:
              "👉 Le coût, le manque d'information ou l'éloignement peuvent limiter l'accès à la pratique sportive.",
          },
          {
            type: "highlight",
            content: "Freins à la pratique",
          },
          {
            type: "paragraph",
            content: "Parmi les freins identifiés :",
          },
          {
            type: "list",
            items: [
              "manque d'information claire",
              "peur de ne pas être à sa place",
              "difficulté à trouver une activité adaptée",
            ],
          },
          {
            type: "highlight",
            content:
              "💡 Insight clé : 👉 l'accès au sport ne dépend pas uniquement de l'offre, mais de sa lisibilité.",
          },
        ],
      },
      {
        title: "Solimouv : un festival inclusif à Paris",
        blocks: [
          {
            type: "highlight",
            content: "Un événement gratuit et accessible",
          },
          {
            type: "paragraph",
            content:
              "Solimouv' est un événement sport inclusif à Paris qui propose un accès gratuit à des activités sportives adaptées.",
          },
          {
            type: "highlight",
            content:
              "👉 Il permet de lever certains freins liés au coût et à l'accessibilité.",
          },
          {
            type: "highlight",
            content: "Des activités pour tous",
          },
          {
            type: "paragraph",
            content: "Le festival met en avant des activités variées :",
          },
          {
            type: "list",
            items: [
              "sports adaptés",
              "activités inclusives",
              "initiations accessibles",
            ],
          },
          {
            type: "highlight",
            content:
              "👉 Une manière concrète de promouvoir le sport pour tous en France.",
          },
          {
            type: "highlight",
            content: "Impact social local",
          },
          {
            type: "paragraph",
            content: "Solimouv' a un impact direct sur le territoire :",
          },
          {
            type: "list",
            items: [
              "création de lien social",
              "sensibilisation à l'inclusion",
              "mise en relation avec des associations",
            ],
          },
          {
            type: "highlight",
            content:
              "👉 Il contribue activement à développer le sport et inclusion sociale à l'échelle locale.",
          },
        ],
      },
      {
        title: "Développer le sport inclusif à Paris",
        blocks: [
          {
            type: "highlight",
            content: "Initiatives locales",
          },
          {
            type: "paragraph",
            content:
              "De nombreuses initiatives participent au développement du sport inclusif Paris :",
          },
          {
            type: "list",
            items: ["événements", "programmes associatifs", "actions locales"],
          },
          {
            type: "highlight",
            content: "👉 Solimouv' s'inscrit dans cette dynamique.",
          },
          {
            type: "highlight",
            content: "Associations engagées",
          },
          {
            type: "paragraph",
            content:
              "Les associations jouent un rôle central dans le sport handicap France.",
          },
          {
            type: "highlight",
            content:
              "👉 Elles accompagnent les publics et proposent des solutions adaptées.",
          },
          {
            type: "highlight",
            content: "L'avenir du sport inclusif",
          },
          {
            type: "paragraph",
            content:
              "Le développement du sport inclusif en France repose sur :",
          },
          {
            type: "list",
            items: [
              "une meilleure accessibilité",
              "une information plus claire",
              "des initiatives concrètes comme Solimouv'",
            ],
          },
          {
            type: "highlight",
            content: "👉 L'objectif : rendre le sport réellement accessible à tous.",
          },
        ],
      },
    ],
  },
];

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}
