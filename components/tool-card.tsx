"use client"

import { Star, ArrowUpRight } from "lucide-react"
import type { AITool } from "@/lib/types"
import { hostOf, initialsOf } from "@/lib/preview"

interface ToolCardProps {
  tool: AITool
  onClick: () => void
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  const cats = [tool.category_1, tool.category_2].filter(Boolean) as string[]

  return (
    <article
      onClick={onClick}
      onMouseMove={onMove}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      tabIndex={0}
      role="button"
      className="tool-card group flex h-full cursor-pointer flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-tint font-display text-sm text-green">
            {initialsOf(tool.app_name)}
          </span>
          <h3 className="font-display text-[1.1rem] leading-tight tracking-tight text-ink">{tool.app_name}</h3>
        </div>
        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-mute transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green" />
      </div>

      <div className="mono mt-3 flex items-center gap-3 text-[11px] text-ink-mute">
        <span className="truncate">{hostOf(tool.url)}</span>
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 text-ink-mute" />
          {tool.star_rating ? tool.star_rating.toFixed(1) : "Unrated"}
        </span>
        {tool.featured_today && <span className="font-semibold text-green">Featured</span>}
      </div>

      <p className="mono-description mt-3 line-clamp-3 text-[13px] text-ink-soft">{tool.short_description}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {cats.map((c) => (
          <span key={c} className="rounded-md bg-green-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-green-deep">{c}</span>
        ))}
        {tool.tags?.slice(0, 2).map((t) => (
          <span key={t} className="rounded-md border border-line bg-white px-2.5 py-1 font-sans text-[11px] text-ink-soft">{t}</span>
        ))}
      </div>
    </article>
  )
}
