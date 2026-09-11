# AiGENT SMITH — v0 → Claude port (v2 "The Forge")

## What changed

**Design system** (`app/globals.css`, `app/layout.tsx`)
- Tokens: ink `#07110b`, moss `#12301c`, forest `#004208` (kept), sage `#8fa58c`, bone `#ece8da`, signal `#00ff41` (kept, used only for live/active states).
- Type: Archivo Black (display), Archivo (body), Geist Mono (descriptions/meta). Replaces the Arial Black/Impact fallback.
- Motion: Lenis momentum scroll, custom cursor, one scroll-reveal observer, count-up stats, film grain, reduced-motion respected.

**Home** (`app/page.tsx`)
- Sticky 220vh hero with a scroll-driven canvas. Default visual is `SignalField` (procedural wireframe terrain, no assets). Drop Higgsfield frames into `public/frames/hero/` + `manifest.json` and `ScrollScrub` takes over automatically.
- Ticker of tool names, count-up stats, two-up Tool Finder / Beta band, App of the Day with preview image, directory with category rail (every category, with counts), `/` to focus search, three closing tiles.
- Gibberish filter and `status = published` filter now run server-side.

**Detail modal** (`components/tool-detail-modal.tsx`, `components/tool-preview.tsx`)
- 16:9 preview at the top of every modal. Chain: `preview_image_url` → site og:image (`/api/preview`) → live screenshot (thum.io) → branded AiGENT SMITH plate.

**Data / security**
- `scripts/006_preview_status_and_rls.sql`: `preview_image_url`, `pricing`, `status`; public read limited to `published`; public INSERT policy removed.
- `app/actions/submit-tool.ts`: submissions land as `pending` via service role.
- `/api/import-csv`, `/api/bulk-import-csv`, `/api/delete-gibberish` now require `Authorization: Bearer $ADMIN_TOKEN`.
- New: `/api/revalidate` (POST, token), `/api/tools` (GET, public, dedupe feed).

**Automation** — see `automation/README.md`.

## Deploy

1. Push this repo to a new branch, e.g. `v2-forge`, and open a PR (or push to `main`).
2. Vercel env: add `ADMIN_TOKEN`, confirm `NEXT_PUBLIC_SITE_URL=https://aigentsmith.app`.
3. Supabase: run `scripts/006_preview_status_and_rls.sql`.
4. Merge. Vercel builds with `npm install` / `next build`.

## Run locally

```
npm install
MOCK_TOOLS=1 npm run dev        # no Supabase needed
# or create .env.local with the Supabase vars from PROJECT_OVERVIEW.md §6
```

## Cinematic hero (optional, ~$2 of Higgsfield credits)

1. Generate one hero image (nano_banana_pro, 16:9): "a matte black forge anvil under a single phosphor-green light, drifting sparks, ultra sharp, editorial".
2. Generate an 8s seedance_2_0 clip at 1080p with that image as `start_image`: "slow forward dolly through the forge, sparks parallax, no cuts".
3. `ffmpeg -i clip.mp4 -vf "fps=22,scale=1600:-1" -q:v 3 public/frames/hero/frame_%04d.jpg`
4. `public/frames/hero/manifest.json` → `{"count":<n>,"pattern":"frame_{i}.jpg","pad":4}`
The hero swaps to the frame scrub on the next deploy.
