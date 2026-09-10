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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AITool, ViewMode, FilterState, SortOption } from "@/lib/types"

interface ToolsDisplayProps {
  initialTools: AITool[]
}

const PER_PAGE_OPTIONS = [12, 24, 48, 96]

// Helper to detect gibberish/invalid tool entries
const isValidTool = (tool: AITool): boolean => {
  // Check if app_name contains mostly uppercase gibberish patterns
  if (!tool.app_name || tool.app_name.length === 0) return false
  
  // Filter out entries that are all caps with no vowels or are single repeated characters
  const name = tool.app_name.trim()
  const upperCaseOnly = /^[A-Z\s]{1,20}$/.test(name)
  const hasRealVowels = /[AEIOU]/i.test(name)
  
  if (upperCaseOnly && !hasRealVowels) return false
  
  // Filter out random character sequences (more than 50% consonants in a row without spaces)
  const consonantSequence = /[bcdfghjklmnpqrstvwxyz]{5,}/i.test(name)
  if (consonantSequence && name.length < 10) return false
  
  // Filter out single repeated patterns like "RTBRT"
  const repeatingPattern = /^(.{1,3})\1+$/i.test(name)
  if (repeatingPattern && name.length <= 10) return false
  
  // Filter out entries with nonsensical descriptions
  if (tool.short_description) {
    const desc = tool.short_description.trim()
    const repeatingWords = /^([a-z]+\s+){2,}$/.test(desc.toLowerCase())
    if (repeatingWords && desc.split(' ').length <= 3) return false
  }
  
  return true
}

export function ToolsDisplay({ initialTools }: ToolsDisplayProps) {
  // Filter out gibberish/invalid tools
  const validTools = initialTools.filter(isValidTool)
  
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null)
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<SortOption>("name-asc")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    tags: [],
    searchQuery: "",
  })

  // Extract unique categories and tags for filters
  const availableCategories = useMemo(() => {
    const cats = new Set<string>()
    validTools.forEach((tool) => {
      if (tool.category_1) cats.add(tool.category_1)
      if (tool.category_2) cats.add(tool.category_2)
      if (tool.category_3) cats.add(tool.category_3)
    })
    return Array.from(cats).sort()
  }, [validTools])

  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    validTools.forEach((tool) => {
      tool.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [validTools])

  const filteredTools = useMemo(() => {
    const result = validTools.filter((tool) => {
      // Main category filter from showcase
      if (selectedMainCategory) {
        const hasMainCategory =
          tool.category_1?.includes(selectedMainCategory) ||
          tool.category_2?.includes(selectedMainCategory) ||
          tool.category_3?.includes(selectedMainCategory)

        if (!hasMainCategory) return false
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesSearch =
          tool.app_name.toLowerCase().includes(query) ||
          tool.short_description?.toLowerCase().includes(query) ||
          tool.category_1?.toLowerCase().includes(query) ||
          tool.category_2?.toLowerCase().includes(query) ||
          tool.category_3?.toLowerCase().includes(query) ||
          tool.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          tool.platforms?.toLowerCase().includes(query)

        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.categories.length > 0) {
        const hasCategory =
          (tool.category_1 && filters.categories.includes(tool.category_1)) ||
          (tool.category_2 && filters.categories.includes(tool.category_2)) ||
          (tool.category_3 && filters.categories.includes(tool.category_3))

        if (!hasCategory) return false
      }

      // Tag filter
      if (filters.tags.length > 0) {
        const hasTag = tool.tags?.some((tag) => filters.tags.includes(tag))
        if (!hasTag) return false
      }

      return true
    })

    switch (sortOption) {
      case "name-asc":
        result.sort((a, b) => a.app_name.localeCompare(b.app_name))
        break
      case "name-desc":
        result.sort((a, b) => b.app_name.localeCompare(a.app_name))
        break
      case "rating-high":
        result.sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
        break
      case "rating-low":
        result.sort((a, b) => (a.star_rating || 0) - (b.star_rating || 0))
        break
      case "newest":
        result.sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.date_added).getTime() - new Date(b.date_added).getTime())
        break
    }

    return result
  }, [validTools, filters, selectedMainCategory, sortOption])

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage)
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, selectedMainCategory])

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredTools.slice(startIndex, endIndex)
  }, [filteredTools, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCategorySelect = (category: string) => {
    if (category === selectedMainCategory) {
      setSelectedMainCategory(null)
    } else {
      setSelectedMainCategory(category)
    }
    setCurrentPage(1)
  }

  return (
    <>
      <div className="space-y-8">
        {/* Category Showcase */}
        <CategoryShowcase
          categories={availableCategories}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedMainCategory || undefined}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t-2 border-border pt-8">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={filters.searchQuery}
                onChange={(value) => setFilters((prev) => ({ ...prev, searchQuery: value }))}
              />
            </div>
            <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[120px] font-bold bg-white border-2 border-black text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PER_PAGE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option.toString()} className="font-bold">
                    {option} per page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
        </div>

        {/* Filters */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          availableCategories={availableCategories}
          availableTags={availableTags}
        />

        <div className="flex items-center justify-between border-b-2 pb-4">
          <p className="text-base font-black uppercase tracking-wide text-black">
            Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredTools.length)}{" "}
            of {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
          </p>
          {totalPages > 1 && (
            <p className="text-sm font-bold text-black">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Display Tools */}
        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-3xl font-black uppercase tracking-wide">No tools found</p>
            <p className="mono-description text-lg text-black mt-2">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {viewMode === "cards" && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onClick={() => setSelectedTool(tool)} />
                ))}
              </div>
            )}

            {viewMode === "table" && <ToolTable tools={paginatedTools} onToolClick={setSelectedTool} />}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-8 border-t-2 border-border">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Tool Detail Modal */}
      <ToolDetailModal
        tool={selectedTool}
        open={!!selectedTool}
        onOpenChange={(open) => !open && setSelectedTool(null)}
      />
    </>
  )
}
