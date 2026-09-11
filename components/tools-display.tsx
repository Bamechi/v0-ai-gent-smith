"use client"

import { useState, useMemo, useEffect } from "react"
import { ViewSwitcher } from "./view-switcher"
import { ToolCard } from "./tool-card"
import { ToolTable } from "./tool-table"
import { SearchBar } from "./search-bar"
import { FilterPanel } from "./filter-panel"
import { Pagination } from "./pagination"
import { ToolDetailModal } from "./tool-detail-modal"
import { CategoryShowcase } from "./category-showcase"
import { SortDropdown } from "./sort-dropdown"
import type { AITool, ViewMode, FilterState, SortOption } from "@/lib/types"

interface ToolsDisplayProps {
  initialTools: AITool[]
}

const PER_PAGE = 24

export function ToolsDisplay({ initialTools }: ToolsDisplayProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null)
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const [filters, setFilters] = useState<FilterState>({ categories: [], tags: [], searchQuery: "" })

  const { availableCategories, categoryCounts, availableTags } = useMemo(() => {
    const counts: Record<string, number> = {}
    const tags = new Set<string>()
    for (const t of initialTools) {
      for (const c of [t.category_1, t.category_2, t.category_3]) if (c) counts[c] = (counts[c] || 0) + 1
      t.tags?.forEach((tag) => tags.add(tag))
    }
    return {
      availableCategories: Object.keys(counts).sort(),
      categoryCounts: counts,
      availableTags: Array.from(tags).sort(),
    }
  }, [initialTools])

  const filteredTools = useMemo(() => {
    const q = filters.searchQuery.trim().toLowerCase()
    const result = initialTools.filter((tool) => {
      if (selectedMainCategory && ![tool.category_1, tool.category_2, tool.category_3].includes(selectedMainCategory)) return false
      if (q) {
        const hay = [tool.app_name, tool.short_description, tool.category_1, tool.category_2, tool.category_3, tool.platforms, ...(tool.tags || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (filters.categories.length && ![tool.category_1, tool.category_2, tool.category_3].some((c) => c && filters.categories.includes(c))) return false
      if (filters.tags.length && !tool.tags?.some((t) => filters.tags.includes(t))) return false
      return true
    })
    const by: Record<SortOption, (a: AITool, b: AITool) => number> = {
      "name-asc": (a, b) => a.app_name.localeCompare(b.app_name),
      "name-desc": (a, b) => b.app_name.localeCompare(a.app_name),
      "rating-high": (a, b) => (b.star_rating || 0) - (a.star_rating || 0),
      "rating-low": (a, b) => (a.star_rating || 0) - (b.star_rating || 0),
      newest: (a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime() || a.app_name.localeCompare(b.app_name),
      oldest: (a, b) => new Date(a.date_added).getTime() - new Date(b.date_added).getTime(),
    }
    return result.sort(by[sortOption])
  }, [initialTools, filters, selectedMainCategory, sortOption])

  const totalPages = Math.max(1, Math.ceil(filteredTools.length / PER_PAGE))
  useEffect(() => setCurrentPage(1), [filters, selectedMainCategory, sortOption])
  const paginatedTools = useMemo(() => filteredTools.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE), [filteredTools, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    document.getElementById("directory")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <div className="space-y-6">
        <CategoryShowcase
          categories={availableCategories}
          counts={categoryCounts}
          onCategorySelect={(c) => setSelectedMainCategory((prev) => (prev === c ? null : c))}
          selectedCategory={selectedMainCategory || undefined}
        />

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1">
            <SearchBar value={filters.searchQuery} onChange={(v) => setFilters((p) => ({ ...p, searchQuery: v }))} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <FilterPanel filters={filters} onFiltersChange={setFilters} availableCategories={availableCategories} availableTags={availableTags} />
            <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
            <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-line pb-3 mono text-[11px] tracking-[0.14em] text-ink-mute">
          <span>
            {filteredTools.length === 0
              ? "0 TOOLS"
              : `${(currentPage - 1) * PER_PAGE + 1}–${Math.min(currentPage * PER_PAGE, filteredTools.length)} OF ${filteredTools.length} TOOLS`}
          </span>
          {totalPages > 1 && <span>PAGE {currentPage} / {totalPages}</span>}
        </div>

        {filteredTools.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line bg-white px-6 py-20 text-center">
            <p className="font-display text-2xl text-ink">Nothing matches that yet.</p>
            <p className="mono-description mt-2 text-ink-mute">Clear a filter, try a broader word, or submit the tool you were looking for.</p>
          </div>
        ) : viewMode === "cards" ? (
          <div key={`${currentPage}-${sortOption}-${selectedMainCategory}`} className="reveal-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onClick={() => setSelectedTool(tool)} />
            ))}
          </div>
        ) : (
          <ToolTable tools={paginatedTools} onToolClick={setSelectedTool} />
        )}

        {totalPages > 1 && (
          <div className="pt-6">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>

      <ToolDetailModal tool={selectedTool} open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)} />
    </>
  )
}
