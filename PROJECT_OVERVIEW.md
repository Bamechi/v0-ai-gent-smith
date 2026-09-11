# AiGENT SMITH — Project Source of Truth

A complete breakdown of the website: architecture, routes, components, data layer, and how to run it locally (e.g. in Claude Code).

---

## 1. What this is

**AiGENT SMITH** is a directory / discovery site for AI tools and applications. Users can:

- Browse 500+ AI tools in table or card views, with search, filtering, and sorting.
- See a highlighted "AI App of the Day" (featured tool).
- Take a 3-minute survey ("AI Tool Finder") that scores them into a profile and recommends tools/resources.
- Read an "AI Alchemy Dictionary" of AI terminology.
- Submit their own AI tool to the directory.
- Sign up for a beta waitlist (email capture).
- View an advertise page.

The visual style is a bold, high-contrast editorial look: heavy black uppercase display type, a monospace "description" style, and a dark green (`#004208`) primary accent.

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, theme in `app/globals.css`) |
| UI primitives | shadcn/ui + Radix UI |
| Database / backend | Supabase (Postgres + RLS) |
| Auth/SSR helper | `@supabase/ssr` |
| Icons | lucide-react |
| Charts | recharts (survey results) |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` |
| Forms | react-hook-form + zod |
| Toasts | sonner |

Package manager: **pnpm** (a `bun.lock` also exists). Node scripts: `dev`, `build`, `start`, `lint`.

---

## 3. Routes (App Router)

All under `app/`:

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` (+ `page.client.tsx`) | Home: hero, survey CTA, beta signup, featured tool, tools directory, submit CTA. Server component that fetches tools from Supabase. |
| `/survey` | `app/survey/page.tsx` | 12-question AI Tool Finder survey with scored results. |
| `/dictionary` | `app/dictionary/page.tsx` (+ `loading.tsx`) | AI terminology dictionary. |
| `/submit` | `app/submit/page.tsx` | Form to submit a new AI tool. |
| `/submit/success` | `app/submit/success/page.tsx` | Post-submit confirmation. |
| `/advertise` | `app/advertise/page.tsx` | Advertising / sponsorship info. |
| `not-found` / `global-error` | `app/not-found.tsx`, `app/global-error.tsx` | Error + 404 states. |

### API routes / server actions

| Endpoint | File | Purpose |
|---|---|---|
| `POST /api/beta-signup` | `app/api/beta-signup/route.ts` | Insert email into `beta_signups`. |
| `POST /api/import-csv` | `app/api/import-csv/route.ts` | Import tools from CSV. |
| `POST /api/bulk-import-csv` | `app/api/bulk-import-csv/route.ts` | Bulk CSV import. |
| `POST /api/delete-gibberish` | `app/api/delete-gibberish/route.ts` | Cleanup utility for bad rows. |
| `submitTool()` | `app/actions/submit-tool.ts` | Server action inserting into `ai_tools`. |

### SEO / metadata files
`app/layout.tsx` (metadata + fonts), `app/robots.ts`, `app/sitemap.ts`, `app/icon.tsx`, `app/apple-icon.tsx`, `components/structured-data.tsx` (JSON-LD), `public/manifest.json`.

---

## 4. Components (`components/`)

**Layout & chrome:** `header.tsx`, `footer.tsx`, `theme-provider.tsx`, `resize-observer-fix.tsx`

**Directory / tools:** `tools-display.tsx` (orchestrates view + filters), `tool-card.tsx`, `tool-table.tsx`, `tool-kanban.tsx`, `tool-detail-modal.tsx`, `featured-tool.tsx`, `category-showcase.tsx`, `view-switcher.tsx`, `sort-dropdown.tsx`, `filter-panel.tsx`, `search-bar.tsx`, `pagination.tsx`

**Submission & signup:** `submit-tool-form.tsx`, `beta-signup.tsx`, `beta-signup-modal.tsx`, `sign-in-access-modal.tsx`, `import-button.tsx`

**Dictionary:** `dictionary-content.tsx`, `dictionary-card.tsx`, `dictionary-modal.tsx`

**Survey:** `survey/survey-question.tsx`, `survey/survey-progress.tsx`, `survey/survey-results.tsx`

**UI kit:** `components/ui/*` — full shadcn/ui set (button, card, dialog, select, table, etc.).

---

## 5. Data layer

### Supabase client helpers (`lib/supabase/`)
- `server.ts` — server component / route client (`createClient()`), reads cookies.
- `client.ts` — browser client.
- `proxy.ts` — redirect/proxy helper for auth callbacks.

### Domain types (`lib/`)
- `types.ts` — `AITool`, `ViewMode`, `SortOption`, `FilterState`.
- `survey-types.ts` — `SurveyAnswers`, `SurveyResults`, `AILevel`, `AIPath`, `ProfileType`, `Codename`, recommendations.
- `survey-scoring.ts` — logic that turns answers into a scored profile.
- `dictionary-data.ts` — dictionary term dataset.
- `analytics.ts` — analytics helpers.
- `utils.ts` — `cn()` classname helper.

### Database schema (`scripts/*.sql`)

**`ai_tools`** (main directory table):
`id` (uuid pk), `tool_id` (unique text), `app_name`, `url`, `short_description`, `category_1/2/3`, `tags` (text[]), `platforms`, `promo_code`, `featured_today` (bool), `sponsored` (bool), `date_added`, `last_updated`, `source_name_or_link`, `created_at`, plus `star_rating` and `review_count` (added in later migration). RLS: public read + public insert. GIN indexes for full-text search on name/description/tags.

**`beta_signups`**:
`id` (uuid pk), `email` (unique), `signed_up_at`, `created_at`. RLS: public insert.

Migration/seed order:
1. `001_create_tools_table.sql` — create `ai_tools`.
2. `002_seed_ai_tools.sql` — initial seed.
3. `003_add_rating_columns.sql` / `003_add_rating_fields.sql` — add `star_rating`, `review_count`.
4. `004_create_beta_signups.sql` — waitlist table.
5. `005_seed_all_583_tools.sql` / `999_import_all_tools_FINAL.sql` — full tool dataset.

Helper generators (not needed at runtime): `scripts/*.py`, `scripts/*.ts` build the seed SQL from a CSV.

---

## 6. Environment variables

Required to run (Supabase):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_SECRET_KEY
SUPABASE_JWT_SECRET
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
```

Postgres direct-connection vars (Supabase-provided, used by scripts/tools):
```
POSTGRES_URL, POSTGRES_PRISMA_URL, POSTGRES_URL_NON_POOLING,
POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE
```

Put these in `.env.local` when running locally.

---

## 7. Assets (`public/`)

- `favicon.png`, `apple-icon.png`, `icon-light-32x32.png`, `icon-dark-32x32.png`, `icon.svg`, `manifest.json`
- `images/aigentsmith-15-ways-to-make-money-with-ai.png`
- `images/aigentsmith-ai-alchemy-dictionary-2026-v2.png`
- `images/aigentsmith-ai-tools-suite-1.png`
- `placeholder-logo.png/svg`, `placeholder-user.jpg`, `placeholder.jpg/svg`

---

## 8. Run locally (Claude Code)

```bash
pnpm install
# create .env.local with the Supabase vars from section 6
pnpm dev            # http://localhost:3000
```

If the tools list is empty, the home page shows an "Import" button, or you can run the SQL in `scripts/` against your Supabase project (in order) to create tables and seed data.

---

## 9. Design tokens

Defined in `app/globals.css` (Tailwind v4 `@theme`). Primary accent is dark green `#004208`; the look leans on black uppercase display type, a `.gradient-text` heading treatment, and a `.mono-description` monospace body style. Keep to the existing 3–5 color palette when extending.
