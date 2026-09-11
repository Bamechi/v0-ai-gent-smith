"use client"

import { LayoutGrid, LayoutList } from "lucide-react"
import type { ViewMode } from "@/lib/types"

export function ViewSwitcher({ currentView, onViewChange }: { currentView: ViewMode; onViewChange: (v: ViewMode) => void }) {
  const btn = (v: ViewMode, Icon: typeof LayoutGrid, label: string) => (
    <button onClick={() => onViewChange(v)} aria-pressed={currentView === v}
      className={`flex h-12 items-center gap-2 px-4 font-sans text-sm transition-colors ${currentView === v ? "bg-green text-white" : "bg-white text-ink-soft hover:text-ink"}`}>
      <Icon className="h-4 w-4" /><span className="hidden sm:inline">{label}</span>
    </button>
  )
  return <div className="flex overflow-hidden rounded-xl border border-line">{btn("cards", LayoutGrid, "Cards")}{btn("table", LayoutList, "Table")}</div>
}
