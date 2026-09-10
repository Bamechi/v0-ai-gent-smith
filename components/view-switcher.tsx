"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, LayoutList } from "lucide-react"
import type { ViewMode } from "@/lib/types"

interface ViewSwitcherProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
      <Button
        variant={currentView === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("table")}
        className={`gap-2 font-bold ${currentView === "table" ? "bg-[#004208] text-white hover:bg-[#004208]/90" : ""}`}
      >
        <LayoutList className="h-4 w-4" />
        <span className="hidden sm:inline">TABLE</span>
      </Button>
      <Button
        variant={currentView === "cards" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("cards")}
        className={`gap-2 font-bold ${currentView === "cards" ? "bg-[#004208] text-white hover:bg-[#004208]/90" : ""}`}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">CARDS</span>
      </Button>
    </div>
  )
}
