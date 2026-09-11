#!/usr/bin/env node
/**
 * Weekly sync: Google Sheet (status = approved) → enrich → Supabase upsert → mark published.
 *
 * Env:
 *   SHEET_WEBAPP_URL   Apps Script web-app URL (…/exec)
 *   SHEET_SYNC_KEY     value of SYNC_KEY script property
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   SITE_URL           https://aigentsmith.app (for revalidation)
 *   ADMIN_TOKEN        matches ADMIN_TOKEN on Vercel (for /api/revalidate)
 *   DRY_RUN=1          print, do not write
 */
import { createClient } from "@supabase/supabase-js"

const env = (k, req = true) => {
  const v = process.env[k]
  if (!v && req) throw new Error(`Missing env ${k}`)
  return v
}
const DRY = !!process.env.DRY_RUN
const sb = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false } })

const hostOf = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "").toLowerCase()
  } catch {
    return ""
  }
}
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "")
const splitTags = (s) => String(s || "").split(/[,;|]/).map((t) => t.trim()).filter(Boolean)

async function ogImage(url) {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(url, { signal: ctrl.signal, headers: { "user-agent": "Mozilla/5.0 AiGENTSmithBot/1.0" } })
    clearTimeout(t)
    if (!res.ok) return null
    const html = (await res.text()).slice(0, 200000)
    const m =
      html.match(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      html.match(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i)
    return m ? new URL(m[1], res.url).toString() : null
  } catch {
    return null
  }
}

async function main() {
  const sheetUrl = `${env("SHEET_WEBAPP_URL")}?key=${encodeURIComponent(env("SHEET_SYNC_KEY"))}&status=approved`
  const { ok, rows, error } = await (await fetch(sheetUrl, { redirect: "follow" })).json()
  if (!ok) throw new Error(`Sheet fetch failed: ${error}`)
  console.log(`Approved rows: ${rows.length}`)
  if (!rows.length) return

  // Existing hosts + tool_ids in Supabase → dedupe
  const { data: existing, error: exErr } = await sb.from("ai_tools").select("tool_id,url")
  if (exErr) throw exErr
  const hosts = new Set(existing.map((e) => hostOf(e.url)))
  const ids = new Set(existing.map((e) => e.tool_id))

  const upserts = []
  const publishedIds = []
  const skipped = []
  for (const r of rows) {
    const host = hostOf(r.websiteUrl)
    if (!host) { skipped.push([r.appName, "bad url"]); continue }
    if (hosts.has(host)) { skipped.push([r.appName, `duplicate ${host}`]); publishedIds.push(r.id); continue }
    let tool_id = r.toolId ? slug(r.toolId) : slug(r.appName)
    while (ids.has(tool_id)) tool_id = `${tool_id}_${Math.random().toString(36).slice(2, 5)}`
    ids.add(tool_id)
    hosts.add(host)

    const preview = r.previewImageUrl || (await ogImage(r.websiteUrl))
    upserts.push({
      tool_id,
      app_name: r.appName,
      url: r.websiteUrl,
      short_description: r.shortDescription || null,
      category_1: r.primaryCategory || "Niche / Other",
      category_2: r.secondaryCategory || null,
      category_3: r.tertiaryCategory || null,
      tags: splitTags(r.tags).length ? splitTags(r.tags) : null,
      platforms: r.platforms || null,
      pricing: r.pricing || null,
      promo_code: r.promoCode || null,
      preview_image_url: preview,
      featured_today: false,
      sponsored: false,
      status: "published",
      source_name_or_link: r.source || "sheet",
      date_added: new Date().toISOString(),
    })
    publishedIds.push(r.id)
  }

  console.log(`Upserting ${upserts.length}, skipping ${skipped.length}`)
  skipped.forEach(([n, why]) => console.log(`  skip: ${n} — ${why}`))
  if (DRY) { console.log(JSON.stringify(upserts, null, 2)); return }

  if (upserts.length) {
    const { error: upErr } = await sb.from("ai_tools").upsert(upserts, { onConflict: "tool_id" })
    if (upErr) throw upErr
  }

  // Mark rows published in the sheet
  const mark = await (await fetch(env("SHEET_WEBAPP_URL"), {
    method: "POST",
    redirect: "follow",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "markPublished", key: env("SHEET_SYNC_KEY"), ids: publishedIds }),
  })).json()
  console.log("Sheet marked:", mark)

  // Revalidate the home page
  const site = process.env.SITE_URL, token = process.env.ADMIN_TOKEN
  if (site && token) {
    const r = await fetch(`${site}/api/revalidate`, { method: "POST", headers: { authorization: `Bearer ${token}` } })
    console.log("Revalidate:", r.status)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
