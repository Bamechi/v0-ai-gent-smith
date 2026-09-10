"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
      <Input
        type="search"
        placeholder="Search AI tools..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-gray-100 text-black placeholder:text-black/50 border-gray-300"
      />
    </div>
  )
}
