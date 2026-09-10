"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { DictionaryTerm } from "@/lib/dictionary-data"

interface DictionaryModalProps {
  term: DictionaryTerm | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DictionaryModal({ term, open, onOpenChange }: DictionaryModalProps) {
  if (!term) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight text-[#004208]">{term.term}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h4 className="text-sm font-bold uppercase text-muted-foreground mb-2">Definition</h4>
            <p className="text-[#1a3a1a] leading-relaxed">{term.definition}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase text-muted-foreground mb-2">Category</h4>
            <Badge className="text-sm font-bold bg-[#004208] text-white hover:bg-[#004208]/90 border-none">
              {term.category}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
