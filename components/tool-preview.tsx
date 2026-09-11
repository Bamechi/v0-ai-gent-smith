"use client"

import { useEffect, useState } from "react"
import { hostOf, initialsOf, screenshotUrl } from "@/lib/preview"
import type { AITool } from "@/lib/types"

type Stage = "curated" | "og" | "shot" | "fallback"

/**
 * 16:9 preview for the detail modal. Walks the candidate chain:
 *   curated preview_image_url → og:image (/api/preview) → live screenshot → branded plate.
 */
export function ToolPreview({ tool }: { tool: AITool }) {
  const [src, setSrc] = useState<string | null>(tool.preview_image_url || null)
  const [stage, setStage] = useState<Stage>(tool.preview_image_url ? "curated" : "og")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (stage !== "og") return
    let alive = true
    fetch(`/api/preview?url=${encodeURIComponent(tool.url)}`)
      .then((r) => r.json())
      .then((d: { image: string | null }) => {
        if (!alive) return
        if (d.image) setSrc(d.image)
        else { setStage("shot"); setSrc(screenshotUrl(tool.url)) }
      })
      .catch(() => { if (alive) { setStage("shot"); setSrc(screenshotUrl(tool.url)) } })
    return () => { alive = false }
  }, [stage, tool.url])

  const onError = () => {
    setLoaded(false)
    if (stage === "curated" || stage === "og") { setStage("shot"); setSrc(screenshotUrl(tool.url)) }
    else { setStage("fallback"); setSrc(null) }
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-green-tint">
      {!loaded && stage !== "fallback" && (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#e6f4e8,#f4fbf5_45%,#e6f4e8)]" />
      )}
      {src && stage !== "fallback" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`${tool.app_name} preview`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={onError}
          className={`h-full w-full object-cover object-top transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {stage === "fallback" && <BrandPlate tool={tool} />}

      <div className="mono pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-10 text-[11px] tracking-[0.14em] text-[#c9dccf]">
        <span>{hostOf(tool.url)}</span>
        <span>{stage === "curated" ? "PREVIEW" : stage === "og" ? "LOADING" : stage === "shot" ? "LIVE CAPTURE" : "NO PREVIEW"}</span>
      </div>
    </div>
  )
}

/** Branded default plate — AiGENT SMITH green, tool initials, category. */
function BrandPlate({ tool }: { tool: AITool }) {
  return (
    <div className="grid-bg-dark absolute inset-0 flex flex-col justify-between bg-[radial-gradient(80%_120%_at_20%_0%,#0f3a22_0%,#060806_70%)] p-6 pb-14">
      <div className="flex items-start justify-between">
        <span className="font-display text-[11px] tracking-[0.2em] text-[#8fa58c]">AiGENT SMITH</span>
        <span className="h-2 w-2 rounded-full bg-signal" />
      </div>
      <div>
        <div className="font-display leading-none text-[#f2f5f0]" style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)", letterSpacing: "-0.05em" }}>
          {initialsOf(tool.app_name)}
        </div>
        <div className="mono mt-3 max-w-[70%] truncate text-xs text-[#8fa58c]">{tool.category_1 || "AI tool"}</div>
      </div>
    </div>
  )
}
