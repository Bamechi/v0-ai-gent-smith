"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Check, X, Star, Loader2, ExternalLink } from "lucide-react"

interface Row {
  id: string
  app_name: string
  url: string
  short_description: string | null
  category_1: string | null
  category_2: string | null
  tags: string[] | null
  pricing: string | null
  source_name_or_link: string | null
  date_added: string
}

/**
 * In-site approval queue. Enter your ADMIN_TOKEN once (kept in memory only),
 * review pending submissions, publish or reject, and optionally set App of the Day —
 * no spreadsheet needed. The token is never stored; refresh clears it.
 */
export default function AdminPage() {
  const [token, setToken] = useState("")
  const [authed, setAuthed] = useState(false)
  const [rows, setRows] = useState<Row[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [featured, setFeatured] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const load = async (t = token) => {
    setLoading(true); setMsg("")
    try {
      const r = await fetch("/api/admin/pending", { headers: { "x-admin-token": t } })
      if (r.status === 401) { setMsg("Wrong token."); setAuthed(false); setLoading(false); return }
      const d = await r.json()
      setRows(d.rows || []); setAuthed(true)
    } catch { setMsg("Failed to load.") }
    setLoading(false)
  }

  const act = async (action: "publish" | "reject") => {
    const ids = [...selected]
    if (!ids.length) return
    setLoading(true); setMsg("")
    try {
      const r = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "content-type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ ids, action, featured: featured && ids.includes(featured) ? featured : undefined }),
      })
      const d = await r.json()
      if (!r.ok) { setMsg(d.error || "Failed."); setLoading(false); return }
      setMsg(`${action === "publish" ? "Published" : "Rejected"} ${d.updated}.`)
      setSelected(new Set()); setFeatured("")
      await load()
    } catch { setMsg("Failed.") }
    setLoading(false)
  }

  const toggle = (id: string) => {
    const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s)
  }

  if (!authed) {
    return (
      <div className="grid-bg flex min-h-screen flex-col bg-paper pt-16 text-ink">
        <Header />
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5">
          <div className="rounded-2xl border border-line bg-white p-8 shadow-lg">
            <h1 className="font-display text-2xl text-ink">Approval queue</h1>
            <p className="mono-description mt-2 text-ink-mute">Enter your admin token to review pending submissions.</p>
            <form onSubmit={(e) => { e.preventDefault(); load() }} className="mt-5 flex gap-2">
              <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="ADMIN_TOKEN"
                className="h-11 flex-1 rounded-lg border border-line bg-white px-4 font-sans text-sm text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20" />
              <button disabled={loading} className="h-11 rounded-lg bg-green px-5 font-display text-sm text-white hover:bg-green-deep disabled:opacity-60">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enter"}
              </button>
            </form>
            {msg && <p className="mono mt-3 text-xs text-destructive">{msg}</p>}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="grid-bg min-h-screen bg-paper pt-16 text-ink">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <div className="mono text-[11px] tracking-[0.18em] text-ink-mute">APPROVAL QUEUE</div>
            <h1 className="mt-2 font-display text-4xl text-ink">{rows.length} pending</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => act("reject")} disabled={!selected.size || loading}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-4 font-sans text-sm text-ink hover:border-destructive hover:text-destructive disabled:opacity-40">
              <X className="h-4 w-4" /> Reject ({selected.size})
            </button>
            <button onClick={() => act("publish")} disabled={!selected.size || loading}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-green px-5 font-display text-sm text-white hover:bg-green-deep disabled:opacity-40">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Publish ({selected.size})
            </button>
          </div>
        </div>

        {msg && <p className="mono mt-4 text-sm text-green">{msg}</p>}

        {rows.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-line bg-white p-14 text-center">
            <p className="font-display text-2xl text-ink">Queue is clear.</p>
            <p className="mono-description mt-2 text-ink-mute">New submissions from the site form and the weekly sync will show up here.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {rows.map((r) => {
              const on = selected.has(r.id)
              return (
                <div key={r.id} className={`rounded-xl border bg-white p-4 transition-colors ${on ? "border-green ring-2 ring-green/20" : "border-line"}`}>
                  <div className="flex items-start gap-4">
                    <button onClick={() => toggle(r.id)} className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${on ? "border-green bg-green text-white" : "border-line bg-white"}`}>
                      {on && <Check className="h-4 w-4" />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-display text-lg text-ink">{r.app_name}</h3>
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="mono inline-flex items-center gap-1 text-xs text-green hover:underline">
                          {r.url.replace(/^https?:\/\/(www\.)?/, "")} <ExternalLink className="h-3 w-3" />
                        </a>
                        {r.source_name_or_link && <span className="mono rounded bg-green-tint px-2 py-0.5 text-[10px] text-green-deep">{r.source_name_or_link}</span>}
                      </div>
                      <p className="mono-description mt-1 text-[13px] text-ink-soft">{r.short_description}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {[r.category_1, r.category_2].filter(Boolean).map((c) => (
                          <span key={c as string} className="rounded-md bg-green-tint px-2 py-0.5 text-[11px] font-semibold text-green-deep">{c}</span>
                        ))}
                        {r.tags?.map((t) => <span key={t} className="rounded-md border border-line px-2 py-0.5 text-[11px] text-ink-soft">{t}</span>)}
                      </div>
                    </div>
                    <button onClick={() => setFeatured(featured === r.id ? "" : r.id)} title="Set App of the Day"
                      className={`shrink-0 rounded-lg border p-2 transition-colors ${featured === r.id ? "border-green bg-green text-white" : "border-line text-ink-mute hover:border-green hover:text-green"}`}>
                      <Star className={`h-4 w-4 ${featured === r.id ? "fill-white" : ""}`} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
