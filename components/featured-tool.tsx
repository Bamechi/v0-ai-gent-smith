"use client"

import { useState } from "react"
import { ArrowUpRight, Star } from "lucide-react"
import type { AITool } from "@/lib/types"
import { ToolPreview } from "./tool-preview"
import { ToolDetailModal } from "./tool-detail-modal"
import { hostOf } from "@/lib/preview"

/** App of the day — black construct panel with the tool preview. */
export function FeaturedTool({ tool }: { tool: AITool }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="reveal card-featured grid overflow-hidden rounded-2xl md:grid-cols-[1.25fr_1fr]">
        <button onClick={() => setOpen(true)} className="group relative block text-left" aria-label={`Open ${tool.app_name}`}>
          <ToolPreview tool={tool} />
          <div className="absolute inset-0 bg-signal/0 transition-colors group-hover:bg-signal/10" />
        </button>
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
          <div className="space-y-4">
            <div className="mono flex items-center gap-3 text-[11px] tracking-[0.18em] text-[#8fa58c]">
              <span className="pulse-signal inline-block h-1.5 w-1.5 rounded-full bg-signal" /> APP OF THE DAY
            </div>
            <h3 className="font-display text-3xl leading-[0.95] tracking-tight text-[#f2f5f0] sm:text-4xl">{tool.app_name}</h3>
            <p className="mono-description max-w-[48ch] text-[#c9dccf]">{tool.short_description}</p>
            <div className="flex flex-wrap gap-2">
              {[tool.category_1, tool.category_2].filter(Boolean).map((c) => (
                <span key={c as string} className="rounded-md bg-signal/15 px-3 py-1.5 font-sans text-xs font-semibold text-signal">{c}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="mono text-xs text-[#8fa58c]">
              {hostOf(tool.url)}
              <span className="ml-3 inline-flex items-center gap-1">
                <Star className={`h-3 w-3 ${tool.star_rating ? "fill-signal text-signal" : "text-[#8fa58c]"}`} />
                {tool.star_rating ? tool.star_rating.toFixed(1) : "Unrated"}
              </span>
            </div>
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 bg-signal px-5 font-display text-sm text-ink transition-transform hover:-translate-y-0.5">
              Open tool <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <ToolDetailModal tool={tool} open={open} onOpenChange={setOpen} />
    </>
  )
}
