# Claude Scheduled Task — "Monday AI Intake + Newsletter Brief"

Set this up as a **recurring scheduled task in Claude** (Cowork/Claude app → Scheduled tasks,
or the "Tasks" feature). Two runs, matching the times you set:

- **Run A — Monday 4:44 AM PT: Email + web intake** (finds tools, files them for the site)
- **Run B — Monday 6:44 AM PT: Publish + newsletter brief** (publishes, then emails you the brief)

Requires: your Gmail connector enabled in Claude, and (for auto-add) the Google Sheet
web-app URL + SYNC_KEY available to the task.

---

## RUN A — paste as the 4:44 AM task prompt

```
You are the AiGENT SMITH research desk. Today is Monday. Do two things.

1) SCAN MY EMAIL. Search my Gmail for the last 7 days from these senders and pull every
   NEW AI tool, app, or website they mention (name + URL + one-line description):
   - Mark@earlyaidopterscommunity.com
   - dan@tldrnewsletter.com
   - newsletter@mobbin.com
   - news@daily.therundown.ai
   - noreply@skool.com  (Nate Herk)
   - ben@benai.co
   - adam@apgsoftware.com.au

2) SEARCH THE WEB for AI tools launched or updated in the last 7 days that are highly rated
   and useful to creators/operators, weighted toward: video editing, image/photo, audio/music,
   content creation, storyboarding, design — then operations/organization (email, scheduling,
   CRM, automation). Aim for 10–20 good ones.

For EVERY tool, output these fields exactly:
  appName | websiteUrl | shortDescription (<140 chars) | primaryCategory | secondaryCategory
  | tags (2–4, comma-separated) | pricing (Free/Freemium/Paid/Trial) | source

primaryCategory must be one of: Video (Create & Edit), Images (Create & Edit),
Audio / Voice / Music, Design & Branding, Writing & Copywriting, Marketing & SEO,
Revenue (Sales & Commerce), Chatbots & Assistants, Productivity & Notes,
Research & Knowledge, Data & Analytics, Coding & Developer Tools,
Automation & Agents (Workflows), Meetings (Transcription & Action Items),
Docs Forms & Data Capture, HR & Recruiting, App & App Builder / Support,
Cybersecurity & Privacy, Niche / Other.

Dedupe against what's already live: GET https://aigentsmith.app/api/tools?fields=url first
and skip any hostname already listed.

Then POST the batch to my intake sheet so they queue for approval:
  POST {SHEET_WEBAPP_URL}
  {"action":"batch","key":"{SHEET_SYNC_KEY}","source":"claude-monday","status":"review","items":[ ...all tools... ]}

Reply with a short table of what you submitted and what you skipped as a duplicate.
```

## RUN B — paste as the 6:44 AM task prompt

```
You are the AiGENT SMITH editor. Today is Monday. Do two things.

1) PUBLISH: trigger the weekly sync so approved tools go live
   (POST https://aigentsmith.app/api/revalidate is handled by the GitHub Action; if it hasn't
   run, remind me to approve rows in the sheet).

2) WRITE MY MONDAY AI NEWSLETTER BRIEF. Search the web + my scanned newsletters from this
   week and produce a ready-to-send AI news brief I can paste into my newsletter. Format:

   SUBJECT LINE OPTIONS (3, punchy)
   ---
   THE 5 BIGGEST AI STORIES THIS WEEK  (each: 2–3 sentences, why it matters, source link)
   NEW TOOLS WORTH TRYING  (5–8, one line each, with link — pull from what we queued for the site)
   ONE THING TO DO THIS WEEK  (a practical action for creators/operators)
   SOURCES  (list every link used)

   Keep it in the 19Keys voice: sharp, useful, no fluff. ~600–900 words.
   Email the finished brief to me at cnfdnt.ai@gmail.com with subject "Monday AI Brief — [date]".
```

---

## Notes
- Run A only *queues* tools (status: review). You still approve them at /admin or in the sheet
  before they publish — this keeps junk off the site. To go fully hands-off later, change
  "status":"review" to "status":"approved" in Run A.
- Keep SHEET_WEBAPP_URL and SHEET_SYNC_KEY in the task's saved environment/secrets, not typed
  into the chat each week.
- If the Gmail connector isn't enabled, Run A will still do the web search half.
