"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DictionaryTerm } from "@/lib/dictionary-data"

interface DictionaryCardProps {
  term: DictionaryTerm
  onClick: () => void
}

export function DictionaryCard({ term, onClick }: DictionaryCardProps) {
  return (
    <Card
      className="group relative flex cursor-pointer flex-col overflow-hidden transition-all hover:scale-[1.02] rounded-xl border border-[#004208]/20 bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#a5d6a7] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_4px_12px_-2px_rgba(0,66,8,0.15)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_8px_20px_-4px_rgba(0,66,8,0.25)] hover:border-[#004208]/40"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-black uppercase tracking-tight text-[#004208] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          <span className="line-clamp-1 text-balance">{term.term}</span>
        </CardTitle>

        <CardDescription className="line-clamp-3 mono-description text-balance leading-relaxed text-[#1a3a1a] font-medium">
          {term.definition}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 mt-auto">
        <div className="flex flex-wrap gap-2">
          <Badge className="text-xs font-bold bg-[#004208] text-white hover:bg-[#004208]/90 border-none shadow-sm">
            {term.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
