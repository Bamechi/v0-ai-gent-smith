"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, X } from "lucide-react"
import type { FilterState } from "@/lib/types"

interface FilterPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableCategories: string[]
  availableTags: string[]
}

// Helper to rename and reorder tags - $Paid and $Freemium first
const formatTagsForDisplay = (tags: string[]) => {
  const tagMap: Record<string, string> = {
    "Paid": "$Paid",
    "Freemium": "$Freemium",
  }
  
  const priorityTags = ["$Paid", "$Freemium"]
  
  return tags
    .map(tag => tagMap[tag] || tag)
    .sort((a, b) => {
      const aIsPriority = priorityTags.includes(a)
      const bIsPriority = priorityTags.includes(b)
      if (aIsPriority && !bIsPriority) return -1
      if (!aIsPriority && bIsPriority) return 1
      if (aIsPriority && bIsPriority) return priorityTags.indexOf(a) - priorityTags.indexOf(b)
      return a.localeCompare(b)
    })
}

// Helper to convert display tag back to original
const getOriginalTag = (displayTag: string) => {
  const reverseMap: Record<string, string> = {
    "$Paid": "Paid",
    "$Freemium": "Freemium",
  }
  return reverseMap[displayTag] || displayTag
}

export function FilterPanel({ filters, onFiltersChange, availableCategories, availableTags }: FilterPanelProps) {
  const activeFiltersCount = filters.categories.length + filters.tags.length
  const displayTags = formatTagsForDisplay(availableTags)

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]
    onFiltersChange({ ...filters, tags: newTags })
  }

  const clearAllFilters = () => {
    onFiltersChange({ categories: [], tags: [], searchQuery: filters.searchQuery })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Categories Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" className="h-12 gap-2 rounded-xl border border-line bg-white px-4 font-sans text-sm font-medium text-ink shadow-sm hover:border-green/50 hover:bg-green-tint/40 hover:text-ink">
            <Filter className="h-4 w-4" />
            Categories
            {filters.categories.length > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs bg-green text-white">
                {filters.categories.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 rounded-xl border border-line bg-white shadow-xl" align="start">
          <div className="space-y-4">
            <h4 className="font-display text-sm text-ink">Categories</h4>
            <div className="max-h-80 space-y-3 overflow-y-auto">
              {availableCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                    className="border-ink/30 data-[state=checked]:bg-green data-[state=checked]:border-green data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor={`cat-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-ink-soft"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Tags Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" className="h-12 gap-2 rounded-xl border border-line bg-white px-4 font-sans text-sm font-medium text-ink shadow-sm hover:border-green/50 hover:bg-green-tint/40 hover:text-ink">
            <Filter className="h-4 w-4" />
            Tags
            {filters.tags.length > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs bg-green text-white">{filters.tags.length}</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 rounded-xl border border-line bg-white shadow-xl" align="start">
          <div className="space-y-4">
            <h4 className="font-display text-sm text-ink">Tags</h4>
            <div className="max-h-80 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {displayTags.map((displayTag) => {
                  const originalTag = getOriginalTag(displayTag)
                  const isSelected = filters.tags.includes(originalTag)
                  return (
                    <button
                      key={displayTag}
                      onClick={() => handleTagToggle(originalTag)}
                      className={`px-3 py-1.5 rounded-lg font-sans text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-green text-white border border-green'
                          : 'bg-white text-ink-soft border border-line hover:border-green/50 hover:text-ink'
                      }`}
                    >
                      {displayTag}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge key={category} className="gap-1 rounded-md bg-green text-white hover:bg-green-deep">
                {category}
                <button onClick={() => handleCategoryToggle(category)} className="ml-1 rounded-full hover:bg-white/20">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {filters.tags.map((tag) => (
              <Badge key={tag} className="gap-1 rounded-md bg-green text-white hover:bg-green-deep">
                {tag}
                <button onClick={() => handleTagToggle(tag)} className="ml-1 rounded-full hover:bg-white/20">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-ink-mute hover:text-green hover:bg-green-tint"
          >
            Clear all
          </Button>
        </>
      )}
    </div>
  )
}
