"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Star, Link2, Check } from "lucide-react"
import type { AITool } from "@/lib/types"
import { ToolPreview } from "./tool-preview"
import { hostOf } from "@/lib/preview"

interface ToolDetailModalProps {
  tool: AITool | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ToolDetailModal({ tool, open, onOpenChange }: ToolDetailModalProps) {
  const [copied, setCopied] = useState(false)
  if (!tool) return null

  const copy = async () => {
    try { await navigator.clipboard.writeText(tool.url); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch {}
  }
  const cats = [tool.category_1, tool.category_2, tool.category_3].filter(Boolean) as string[]
  const pricing = tool.pricing || tool.tags?.find((t) => /^\$?(free|freemium|paid|trial)/i.test(t)) || "See site"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-3xl gap-0 overflow-hidden overflow-y-auto border border-line bg-white p-0 text-ink sm:rounded-2xl">
        <ToolPreview tool={tool} />

        <div className="space-y-7 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <DialogTitle className="font-display text-3xl leading-[0.95] tracking-tight text-ink sm:text-4xl">{tool.app_name}</DialogTitle>
              <div className="mono mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-mute">
                <span>{hostOf(tool.url)}</span>
                {tool.featured_today && <span className="font-semibold text-green">App of the day</span>}
                {tool.sponsored && <span>Sponsored</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-line bg-green-tint/40 px-3 py-2">
              <Star className={`h-4 w-4 ${tool.star_rating ? "fill-green text-green" : "text-ink-mute"}`} />
              {tool.star_rating ? (
                <>
                  <span className="font-display text-lg">{tool.star_rating.toFixed(1)}</span>
                  {tool.review_count ? <span className="mono text-xs text-ink-mute">({tool.review_count.toLocaleString()})</span> : null}
                </>
              ) : (
                <span className="mono text-xs text-ink-mute">Unrated</span>
              )}
            </div>
          </div>

          <p className="mono-description max-w-[62ch] text-[15px] text-ink-soft">{tool.short_description}</p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-5 sm:grid-cols-4">
            <Meta label="Pricing" value={pricing} />
            <Meta label="Platforms" value={tool.platforms || "Web"} />
            <Meta label="Added" value={tool.date_added ? new Date(tool.date_added).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"} />
            <Meta label="Category" value={tool.category_1 || "—"} />
          </dl>

          {cats.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => <span key={c} className="rounded-md bg-green px-3 py-1.5 font-sans text-xs font-semibold text-white">{c}</span>)}
              {tool.tags?.map((t) => <span key={t} className="rounded-md border border-line bg-green-tint/50 px-3 py-1.5 font-sans text-xs text-ink-soft">{t}</span>)}
            </div>
          )}

          {tool.promo_code && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-green/40 bg-green-tint p-4">
              <span className="mono text-xs tracking-[0.14em] text-ink-mute">PROMO CODE</span>
              <code className="font-display text-xl text-green">{tool.promo_code}</code>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-green font-display text-sm text-white transition-colors hover:bg-green-deep">
              Visit {tool.app_name} <ExternalLink className="h-4 w-4" />
            </a>
            <button onClick={copy} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line px-5 font-sans text-sm text-ink transition-colors hover:border-green hover:text-green">
              {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mono text-[11px] tracking-[0.16em] text-ink-mute">{label.toUpperCase()}</dt>
      <dd className="mt-1 truncate font-sans text-sm font-semibold text-ink" title={value}>{value}</dd>
    </div>
  )
}
