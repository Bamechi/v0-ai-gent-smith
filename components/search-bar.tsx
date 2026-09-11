"use client"

import { useEffect, useRef } from "react"
import { Search } from "lucide-react"

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") { e.preventDefault(); ref.current?.focus() }
    }
    window.addEventListener("keydown", k)
    return () => window.removeEventListener("keydown", k)
  }, [])
  return (
    <label className="relative block w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
      <input
        ref={ref}
        type="search"
        placeholder="Search tools, categories, tags"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-12 font-sans text-sm text-ink shadow-sm placeholder:text-ink-mute focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
      />
      <kbd className="mono pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-mute">/</kbd>
    </label>
  )
}
