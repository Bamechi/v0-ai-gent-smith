# AiGENT SMITH — weekly intake automation

One staging queue (a Google Sheet), three feeders, one weekly publisher. Nothing
goes live until you approve it.

```
 Site submit form ─┐
 You (manual rows) ─┤                              Monday 06:44 PT
 Gmail newsletters ─┼─▶ Google Sheet "Intake" ─▶ GitHub Action ─▶ Supabase ─▶ aigentsmith.app
 Claude discovery ──┘   (review → approved)       sync script     (published)   revalidated
                              ▲
                     you approve rows (sheet menu: AiGENT SMITH → Approve)
```

## The three feeders

1. **You, manually.** Open the intake sheet and add a row, or submit through the
   site form at /submit (it writes to the same sheet as `review`).
2. **Claude discovery.** A scheduled Claude task researches ~10 fresh, top-reviewed
   AI tools online each week and batch-posts them to the sheet as `review`
   (prompt: `automation/claude-weekly-discovery.md`).
3. **Gmail newsletters.** The Apps Script scans the last 7 days from your AI
   newsletters every **Monday 04:44 PT**, pulls tool links + the sentence around
   them, and files them as `review`. Senders wired in:
   - Mark@earlyaidopterscommunity.com (Early AI Adopters)
   - dan@tldrnewsletter.com (TLDR AI)
   - newsletter@mobbin.com (Mobbin)
   - news@daily.therundown.ai (The Rundown)
   - noreply@skool.com (Nate Herk)
   - ben@benai.co (Ben's AI)
   - adam@apgsoftware.com.au (APG Software)

## The publisher

**Monday 06:44 PT** (2 hours after Gmail intake so it catches that week's drops),
a GitHub Action runs `sync-sheet-to-supabase.mjs`: pulls every `approved` row,
dedupes by hostname, pulls an og:image preview, upserts to Supabase as
`published`, marks the sheet rows `published`, and revalidates the site.

## Your weekly loop (about 5 minutes)

- Monday morning: candidates from all three feeders are sitting in the sheet as `review`.
- Open the sheet, select the good rows, **AiGENT SMITH → Approve selected rows**.
- At 06:44 the Action publishes everything approved. Done.

If you want it fully hands-off later, change the Gmail/Claude feeders to write
`approved` instead of `review` — but keep the human gate for at least a month so
the directory does not fill with junk.

## Setup (once, ~30 min)

1. **Sheet.** Extensions → Apps Script → paste `apps-script/Code.gs`. Project
   Settings → Script properties: `SYNC_KEY` (long random string),
   `GMAIL_LABEL` = `AI Tools Intake`. Run `installTriggers` once (authorize Gmail).
   Deploy → Manage deployments → keep the SAME web-app URL so the site forms keep working.
2. **Supabase.** Run `scripts/006_preview_status_and_rls.sql`.
3. **Vercel env.** Add `ADMIN_TOKEN` (random string).
4. **GitHub secrets.** `SHEET_WEBAPP_URL`, `SHEET_SYNC_KEY`, `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_TOKEN`. Run the workflow once with `dry_run=1`.
5. **Claude task.** Schedule `claude-weekly-discovery.md` for Sunday evening.

## Manual run

```
DRY_RUN=1 SHEET_WEBAPP_URL=… SHEET_SYNC_KEY=… SUPABASE_URL=… \
  SUPABASE_SERVICE_ROLE_KEY=… node automation/sync-sheet-to-supabase.mjs
```
