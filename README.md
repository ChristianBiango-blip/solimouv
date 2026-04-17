# Solimouv'

Application web progressive (PWA) du festival du sport inclusif **Solimouv'**, organisé à Paris 13 par l'association **Up Sport !**

- **Production** : https://solimouv-dc.vercel.app
- **Repository** : https://github.com/ChristianBiango-blip/solimouv

---

## Stack

| Technologie | Rôle |
|---|---|
| Next.js 16 (App Router) | Framework fullstack |
| React 19 + TypeScript | Interface et typage |
| Tailwind CSS v4 | Styles |
| MongoDB Atlas | Base de données |
| NextAuth v4 | Authentification |
| React Query v5 | State serveur |
| Zod + React Hook Form | Validation et formulaires |

---

## Démarrage local

### Prérequis

- Node.js 18+
- Un cluster MongoDB Atlas (ou local)
- Un compte Vercel (optionnel, pour le déploiement)

### Installation

```bash
git clone https://github.com/ChristianBiango-blip/solimouv.git
cd solimouv
npm install
```

### Variables d'environnement

Copier `.env.example` en `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | URI de connexion MongoDB Atlas |
| `NEXTAUTH_SECRET` | Clé JWT — générer avec `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL de l'app (`http://localhost:3000` en dev) |
| `NEXT_PUBLIC_AXEPTIO_CLIENT_ID` | ID client Axeptio |
| `NEXT_PUBLIC_AXEPTIO_COOKIES_VERSION` | Version config Axeptio |

### Lancer l'application

```bash
npm run dev       # Développement → http://localhost:3000
npm run build     # Build de production
npm run lint      # Vérification ESLint
npm start         # Serveur de production
```

---

## Structure des routes

| Route | Accès | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/connexion` | Public | Connexion |
| `/inscription` | Public | Création de compte |
| `/blog` | Public | Liste des articles |
| `/blog/[slug]` | Public | Article |
| `/accueil` | Connecté | Accueil app |
| `/atelier` | Connecté | Ateliers sportifs |
| `/dons` | Connecté | Faire un don |
| `/contact` | Connecté | Contact |
| `/partenaires` | Connecté | Partenaires |
| `/inscription-festival` | Connecté | Inscription festival |
| `/admin/*` | Admin | Panneau d'administration |

La protection des routes est gérée dans `src/proxy.ts`.

---

## Structure du projet

```
src/
├── app/
│   ├── (app)/              Pages authentifiées
│   ├── admin/              Pages admin
│   ├── blog/               Blog public
│   ├── accueil/            Accueil post-connexion
│   ├── components/         Composants partagés (MobileNav, SportCardsGrid…)
│   └── api/                Routes API
├── components/blog/        Template article
├── content/blog.ts         Articles (statique)
├── lib/                    auth, mongodb, seo
├── config/env.ts           Variables d'env validées
├── hooks/                  Hooks React Query
└── types/                  Types TypeScript
```

---

## Contribuer

### Workflow

```bash
# 1. Créer une branche depuis main
git checkout main && git pull
git checkout -b feat/nom-de-la-feature

# 2. Développer et commiter
git add .
git commit -m "feat: description courte de la modification"

# 3. Pousser et ouvrir une Pull Request
git push origin feat/nom-de-la-feature
```

Ouvrir une Pull Request vers `main` sur GitHub. Un déploiement de preview Vercel est automatiquement créé pour chaque PR.

### Convention de commits

| Préfixe | Usage |
|---|---|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `style:` | Modification visuelle sans changement logique |
| `refactor:` | Refactoring sans ajout de fonctionnalité |
| `chore:` | Maintenance, dépendances, config |
| `docs:` | Documentation uniquement |

### Ce qu'il faut vérifier avant de pousser

```bash
npm run lint      # Aucune erreur ESLint
npm run build     # Build sans erreur TypeScript
```

---

## Ajouter un article de blog

1. Ouvrir `src/content/blog.ts`
2. Ajouter un objet dans le tableau `blogArticles` :

```ts
{
  slug: "mon-article",
  title: "Titre de l'article",
  excerpt: "Résumé court affiché sur la liste.",
  description: "Description SEO (meta description).",
  coverImage: "/blog/mon-image.jpg",
  coverAlt: "Description de l'image",
  publishedAt: "2026-06-01",
  content: `Contenu de l'article en texte libre...`,
}
```

3. Placer l'image dans `public/blog/`
4. Commiter et pousser — le déploiement est automatique

---

## Déploiement

Le déploiement est continu via **Vercel** :

- Chaque push sur `main` met à jour la production automatiquement
- Chaque Pull Request génère une URL de preview

Variables d'environnement à configurer dans **Vercel → Settings → Environment Variables**.

---

## Licence

Propriété de l'association **Up Sport !** — Tous droits réservés.
