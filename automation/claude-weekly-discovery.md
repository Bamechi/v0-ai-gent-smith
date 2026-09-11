# Claude weekly discovery — scheduled task prompt

Schedule this in Claude (Cowork → Scheduled tasks, or Claude Code `--schedule`) for **Sunday 18:00 PT, before the Monday 04:44 Gmail intake and the Monday 06:44 publish.

Paste as the task prompt:

---

You are the AiGENT SMITH research desk. Find 10 AI tools launched or materially updated in the last 7 days that are useful to creators, operators, founders or small teams. Sources to check, in order: therundown.ai/tools (newest), theresanaiforthat.com (new), producthunt.com/topics/artificial-intelligence (past week), futuretools.io (newest), Hacker News "Show HN" with AI, and X/LinkedIn posts from @rowancheung, @bensbites, @mreflow.

For each tool produce exactly these fields:
- appName — official name
- websiteUrl — canonical homepage (no tracking params)
- shortDescription — one sentence, under 140 characters, states what it does
- primaryCategory — one of: Video (Create & Edit), Images (Create & Edit), Audio / Voice / Music, Meetings (Transcription & Action Items), Productivity & Notes, Revenue (Sales & Commerce), Design & Branding, Automation & Agents (Workflows), Writing & Copywriting, Data & Analytics, Coding & Dev, Marketing & SEO, HR & Recruiting, Scheduling & Publishing, Niche / Other
- secondaryCategory — optional, from the same list
- tags — comma-separated, 2–4 short tags
- pricing — Free, Freemium, Paid, or Trial
- notes — the source URL where you found it

Skip anything already in the directory: first GET https://aigentsmith.app/api/tools?fields=url to load existing hosts and dedupe by hostname.

Then POST the batch to the intake sheet:

POST {SHEET_WEBAPP_URL}
{"action":"batch","key":"{SHEET_SYNC_KEY}","source":"claude-research","status":"review","items":[ …10 objects… ]}

Reply with a short table of what was submitted and what was skipped as duplicate.

---

Secrets: store SHEET_WEBAPP_URL and SHEET_SYNC_KEY in the task's environment, never in the prompt text.
