"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"
import type { SortOption } from "@/lib/types"

interface SortDropdownProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
}

export function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  return (
    <Select value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
      <SelectTrigger className="w-[200px] font-bold">
        <ArrowUpDown className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc" className="font-semibold">
          Name: A → Z
        </SelectItem>
        <SelectItem value="name-desc" className="font-semibold">
          Name: Z → A
        </SelectItem>
        <SelectItem value="rating-high" className="font-semibold">
          Rating: High to Low
        </SelectItem>
        <SelectItem value="rating-low" className="font-semibold">
          Rating: Low to High
        </SelectItem>
        <SelectItem value="newest" className="font-semibold">
          Newest First
        </SelectItem>
        <SelectItem value="oldest" className="font-semibold">
          Oldest First
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
