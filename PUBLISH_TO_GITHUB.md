# Publish AiGENT SMITH v3 to GitHub → Vercel

You have two ways. The zip is the simplest.

## Option A — you push it (5 minutes, no AI needed)

1. Unzip `aigent-smith-v3.zip`.
2. In a terminal inside the unzipped folder:
```
git init            # only if it isn't already a repo
git remote add origin https://github.com/Bamechi/v0-ai-gent-smith.git  # skip if already set
git checkout -b v3-construct
git add -A
git commit -m "v3 The Construct — redesign + weekly intake automation"
git push -u origin v3-construct
```
3. Open the repo on GitHub → Vercel auto-builds a preview URL for the branch.
   Review it, then merge `v3-construct` into `main` to go live on aigentsmith.app.
4. In Vercel → Project → Settings → Environment Variables, add:
   `ADMIN_TOKEN` = (any long random string)
   and confirm `NEXT_PUBLIC_SITE_URL` = `https://aigentsmith.app`.
5. In Supabase → SQL editor, paste and run `scripts/006_preview_status_and_rls.sql`.

## Option B — paste this to ChatGPT (or any terminal agent with git access)

> I have a Next.js project folder for my site AiGENT SMITH. Push it to my GitHub
> repo https://github.com/Bamechi/v0-ai-gent-smith.git on a new branch called
> `v3-construct`, without touching `main`. Steps: initialize git if needed, set the
> remote to that URL, create and switch to branch `v3-construct`, stage everything,
> commit with the message "v3 The Construct — redesign + weekly intake automation",
> and push with upstream tracking. Then give me the exact Vercel preview URL pattern
> for that branch and remind me to (1) add a Vercel env var ADMIN_TOKEN, (2) confirm
> NEXT_PUBLIC_SITE_URL is https://aigentsmith.app, and (3) run
> scripts/006_preview_status_and_rls.sql in Supabase. Do not force-push and do not
> modify main.

## Notes
- The build command is the Next.js default (`next build`); Vercel detects it.
- Fonts (Archivo Black / Archivo / Geist Mono) load from Google Fonts at build — no action needed on Vercel.
- To turn the hero into the cinematic video scrub later: drop ~180 JPG frames into
  `public/frames/hero/` plus a `manifest.json` ({"count":180,"pattern":"frame_{i}.jpg","pad":4});
  the hero swaps from the animated canvas to the video scrub automatically on the next deploy.
