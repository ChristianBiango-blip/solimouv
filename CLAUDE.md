# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npm start        # Production server
```

No test suite is configured. No single-test runner exists.

## Environment

Required variables (see `src/config/env.ts` for validation):
- `MONGODB_URI` — MongoDB Atlas connection string
- `NEXTAUTH_SECRET` — JWT signing secret
- `NEXTAUTH_URL` — App URL (http://localhost:3000 in dev)
- `NEXT_PUBLIC_AXEPTIO_CLIENT_ID` / `NEXT_PUBLIC_AXEPTIO_COOKIES_VERSION` — Cookie consent

Always read env through the validated `env` object from `src/config/env.ts`, not directly from `process.env`.

## Architecture

### Stack

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4 · MongoDB (native driver, no ORM) · NextAuth v4 · React Query v5 · Zod v4 · React Hook Form

### Route structure

```
/                          Public landing page
/connexion  /inscription   Public auth pages
/blog /blog/[slug]         Public blog
/accueil /atelier /dons …  Authenticated (App Router group: src/app/(app)/)
/admin/*                   Admin-only (role: "admin")
```

Route protection lives entirely in `src/proxy.ts` (the Next.js 16 rename of `middleware.ts`). It reads the JWT via `next-auth/jwt`, checks role for `/admin/*`, and handles redirect loops for authenticated users landing on public auth pages.

### Auth

`src/lib/auth.ts` — NextAuth credentials provider. Passwords hashed with bcryptjs. JWT strategy, 24 h max age. The JWT callback attaches `user.role` and `user.id` to the token; the session callback exposes them to client code. Users stored in MongoDB `users` collection.

Type augmentation for the added fields: `src/types/next-auth.d.ts`.

### Data layer

MongoDB singleton in `src/lib/mongodb.ts`. Collections: `users`, `workshops`, `festival-registrations`. Donations skip MongoDB and POST directly to a Make.com webhook instead.

All mutations follow the same pattern:
1. Client form (React Hook Form + Zod schema)
2. Custom React Query hook in `src/hooks/` calls an API route via `useMutation`
3. API route (`src/app/api/`) re-validates with Zod, writes to MongoDB
4. On success, hook calls `queryClient.invalidateQueries()`

Zod schemas and TypeScript types for each domain live in `src/types/`.

### Styling

Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css` — no `tailwind.config.*` file needed). Custom theme declared with `@theme inline` in `globals.css`. Brand tokens: `--color-brand-primary` (#4200fe), `--color-brand-secondary` (#f238a7), `--color-brand-accent` (#ff270b). Font: "PP Mori" (local `.otf` files in `/public/fonts/ppmori/`).

The landing page (`/`) uses a parallel set of `.landing-*` CSS classes defined in `globals.css` — these are distinct from the Tailwind utility approach used in the rest of the app. CSS variables `--violet`, `--rose`, `--orange`, `--max-width` must remain in `:root` for those classes to work.

### Providers

`src/app/providers.tsx` wraps the app in `SessionProvider` (NextAuth) and `QueryClientProvider` (React Query, `staleTime: 60_000`). This is a client component imported by the root server layout.

### PWA

`src/app/register-service-worker.tsx` registers the service worker. `src/app/components/PWAInstallButton.tsx` handles `beforeinstallprompt` (Android/Chrome) and shows a manual instructions modal for iOS/Safari. Landing page uses `LandingHeroCTA` and `LandingAppButtons` (client components) to embed PWA install logic inline without breaking the server component boundary.
