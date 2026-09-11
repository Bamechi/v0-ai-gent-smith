/**
 * AiGENT SMITH — Intake Sheet (Google Apps Script)
 * Deploy as Web App: Execute as "Me", access "Anyone".
 *
 * Sheet tabs:
 *   Intake   — one row per candidate tool (columns below)
 *   Signups  — beta list (name, email, timestamp)
 *   Log      — what the weekly sync did
 *
 * Intake columns (row 1, exact order):
 *   id | timestamp | status | source | toolId | appName | websiteUrl | affiliateUrl |
 *   affiliateCommission | shortDescription | primaryCategory | secondaryCategory |
 *   tertiaryCategory | tags | platforms | pricing | promoCode | previewImageUrl | notes | publishedAt
 *
 * status values: review (default) → approved → published | rejected
 *
 * Script Properties (Project Settings → Script properties):
 *   SYNC_KEY        shared secret for doGet / mark-published calls
 *   GMAIL_LABEL     label to scan for tool candidates (default: "AI Tools Intake")
 */

const SHEET_INTAKE = "Intake";
const SHEET_SIGNUPS = "Signups";
const SHEET_LOG = "Log";
const HEADERS = [
  "id", "timestamp", "status", "source", "toolId", "appName", "websiteUrl", "affiliateUrl",
  "affiliateCommission", "shortDescription", "primaryCategory", "secondaryCategory",
  "tertiaryCategory", "tags", "platforms", "pricing", "promoCode", "previewImageUrl", "notes", "publishedAt",
];

function props_() { return PropertiesService.getScriptProperties(); }
function ss_() { return SpreadsheetApp.getActiveSpreadsheet(); }

function sheet_(name) {
  let sh = ss_().getSheetByName(name);
  if (!sh) {
    sh = ss_().insertSheet(name);
    if (name === SHEET_INTAKE) sh.appendRow(HEADERS);
    if (name === SHEET_SIGNUPS) sh.appendRow(["name", "email", "timestamp"]);
    if (name === SHEET_LOG) sh.appendRow(["timestamp", "action", "detail"]);
  }
  return sh;
}

function log_(action, detail) { sheet_(SHEET_LOG).appendRow([new Date(), action, String(detail).slice(0, 2000)]); }

function json_(obj, code) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------------- Intake helpers ---------------- */

function slugify_(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, ""); }
function hostOf_(u) { try { return String(u).replace(/^https?:\/\//i, "").replace(/^www\./i, "").split(/[/?#]/)[0].toLowerCase(); } catch (e) { return ""; } }

function existingHosts_() {
  const sh = sheet_(SHEET_INTAKE);
  const last = sh.getLastRow();
  if (last < 2) return new Set();
  const urls = sh.getRange(2, HEADERS.indexOf("websiteUrl") + 1, last - 1, 1).getValues().flat();
  return new Set(urls.map(hostOf_).filter(Boolean));
}

/** Appends a candidate row. Returns {added, id} or {added:false, reason}. */
function addCandidate_(c, source, status) {
  const url = String(c.websiteUrl || c.url || "").trim();
  const name = String(c.appName || c.name || "").trim();
  if (!url || !name) return { added: false, reason: "missing name/url" };
  const host = hostOf_(url);
  if (existingHosts_().has(host)) return { added: false, reason: "duplicate host " + host };
  const id = Utilities.getUuid();
  sheet_(SHEET_INTAKE).appendRow([
    id, new Date(), status || "review", source || "manual",
    c.toolId || slugify_(name), name, url, c.affiliateUrl || "", c.affiliateCommission || "",
    c.shortDescription || c.description || "", c.primaryCategory || c.category || "Niche / Other",
    c.secondaryCategory || "", c.tertiaryCategory || "", c.tags || "", c.platforms || "",
    c.pricing || "", c.promoCode || "", c.previewImageUrl || "", c.notes || "", "",
  ]);
  return { added: true, id: id };
}

/* ---------------- Web app ---------------- */

/**
 * POST — three payload shapes:
 *   {name, email}                         → Signups (existing beta form)
 *   {appName, websiteUrl, ...}            → Intake row, status "review" (existing submit form)
 *   {action:"batch", key, source, items:[...]}      → many Intake rows (Claude weekly discovery)
 *   {action:"markPublished", key, ids:[...]}         → flips rows to published
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const key = props_().getProperty("SYNC_KEY");

    if (body.action === "batch" || body.action === "markPublished") {
      if (!key || body.key !== key) return json_({ ok: false, error: "unauthorized" });
    }

    if (body.action === "batch") {
      const results = (body.items || []).map((it) => addCandidate_(it, body.source || "claude-research", body.status || "review"));
      log_("batch", body.source + ": " + results.filter((r) => r.added).length + " added / " + results.length);
      return json_({ ok: true, results: results });
    }

    if (body.action === "markPublished") {
      const sh = sheet_(SHEET_INTAKE);
      const rows = sh.getDataRange().getValues();
      const idCol = HEADERS.indexOf("id"), stCol = HEADERS.indexOf("status"), pubCol = HEADERS.indexOf("publishedAt");
      let n = 0;
      for (let r = 1; r < rows.length; r++) {
        if (body.ids.indexOf(rows[r][idCol]) !== -1) {
          sh.getRange(r + 1, stCol + 1).setValue("published");
          sh.getRange(r + 1, pubCol + 1).setValue(new Date());
          n++;
        }
      }
      log_("markPublished", n + " rows");
      return json_({ ok: true, updated: n });
    }

    if (body.email && !body.websiteUrl) {
      sheet_(SHEET_SIGNUPS).appendRow([body.name || "", body.email, new Date()]);
      return json_({ ok: true });
    }

    const res = addCandidate_(body, "site-submit-form", "review");
    return json_({ ok: true, result: res });
  } catch (err) {
    log_("error", err);
    return json_({ ok: false, error: String(err) });
  }
}

/**
 * GET ?key=SYNC_KEY&status=approved  → JSON rows with that status (default approved)
 */
function doGet(e) {
  const key = props_().getProperty("SYNC_KEY");
  if (!key || (e.parameter.key || "") !== key) return json_({ ok: false, error: "unauthorized" });
  const want = e.parameter.status || "approved";
  const sh = sheet_(SHEET_INTAKE);
  const rows = sh.getDataRange().getValues();
  const stCol = HEADERS.indexOf("status");
  const out = [];
  for (let r = 1; r < rows.length; r++) {
    if (String(rows[r][stCol]).toLowerCase() !== want) continue;
    const o = {};
    HEADERS.forEach((h, i) => (o[h] = rows[r][i] instanceof Date ? rows[r][i].toISOString() : rows[r][i]));
    out.push(o);
  }
  return json_({ ok: true, count: out.length, rows: out });
}

/* ---------------- Gmail intake ---------------- */

/**
 * Time-driven trigger (weekly). Reads threads under GMAIL_LABEL, pulls every
 * external link + the sentence around it, and files candidates as `review`.
 * Newsletter senders to label: The Rundown, Ben's Bites, TLDR AI, Superhuman, There's An AI For That.
 */
function ingestGmailIntake() {
  const label = props_().getProperty("GMAIL_LABEL") || "AI Tools Intake";
  const done = GmailApp.getUserLabelByName(label + "/Processed") || GmailApp.createLabel(label + "/Processed");
  // Scan the last 7 days from the AI newsletter senders below (Monday 04:44 run).
  const SENDERS = [
    "Mark@earlyaidopterscommunity.com",
    "dan@tldrnewsletter.com",
    "newsletter@mobbin.com",
    "news@daily.therundown.ai",
    "noreply@skool.com",       // Nate Herk
    "ben@benai.co",
    "adam@apgsoftware.com.au",
  ];
  const fromQuery = "(" + SENDERS.map(function(a){ return "from:" + a; }).join(" OR ") + ")";
  const threads = GmailApp.search(fromQuery + " newer_than:7d -label:\"" + label + "/Processed\"", 0, 60);
  const skipHosts = /(google|gmail|youtube|twitter|x\.com|linkedin|instagram|facebook|tiktok|substack|beehiiv|mailchimp|list-manage|unsubscribe|apple|amazon|therundown|bensbites|tldr|mobbin|skool|apgsoftware|earlyaidopters)/i;
  let added = 0;

  threads.forEach((th) => {
    th.getMessages().forEach((m) => {
      const html = m.getBody();
      const text = m.getPlainBody();
      const re = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
      let match;
      const seen = new Set();
      while ((match = re.exec(html)) !== null) {
        const url = match[1].split("?")[0];
        const host = hostOf_(url);
        if (!host || skipHosts.test(host) || seen.has(host)) continue;
        seen.add(host);
        const anchor = match[2].replace(/<[^>]+>/g, "").trim();
        if (anchor.length < 2 || anchor.length > 60) continue;
        // sentence around the anchor text in plain body
        const idx = text.indexOf(anchor);
        const around = idx >= 0 ? text.slice(Math.max(0, idx - 140), idx + 200).replace(/\s+/g, " ").trim() : "";
        const r = addCandidate_(
          { appName: anchor, websiteUrl: url, shortDescription: around, notes: "from: " + m.getFrom() + " · " + m.getSubject() },
          "gmail:" + hostOf_(m.getFrom().replace(/.*@/, "http://")),
          "review"
        );
        if (r.added) added++;
      }
    });
    th.addLabel(done);
  });
  log_("ingestGmailIntake", threads.length + " threads, " + added + " candidates");
}

/** One-time: create weekly trigger for Gmail intake (Sunday 06:00). */
function installTriggers() {
  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  // Gmail intake — Monday 04:44 (nearMinute is best-effort; Apps Script fires within the hour block).
  ScriptApp.newTrigger("ingestGmailIntake").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(4).nearMinute(44).create();
}

/** Menu for quick manual approval in the sheet. */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("AiGENT SMITH")
    .addItem("Approve selected rows", "approveSelected")
    .addItem("Reject selected rows", "rejectSelected")
    .addItem("Run Gmail intake now", "ingestGmailIntake")
    .addToUi();
}
function setStatusSelected_(status) {
  const sh = sheet_(SHEET_INTAKE);
  const rng = sh.getActiveRange();
  const col = HEADERS.indexOf("status") + 1;
  for (let r = rng.getRow(); r < rng.getRow() + rng.getNumRows(); r++) if (r > 1) sh.getRange(r, col).setValue(status);
}
function approveSelected() { setStatusSelected_("approved"); }
function rejectSelected() { setStatusSelected_("rejected"); }
