"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = []
  const maxVisible = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const endPage = Math.min(totalPages, startPage + maxVisible - 1)

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="h-9 w-9 rounded-lg border-line bg-white text-ink hover:bg-green-tint"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 w-9 rounded-lg border-line bg-white text-ink hover:bg-green-tint"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {startPage > 1 && (
        <>
          <Button variant="outline" size="sm" onClick={() => onPageChange(1)} className="h-9 min-w-[36px] rounded-lg border-line bg-transparent font-mono text-ink hover:bg-green-tint hover:text-ink">
            1
          </Button>
          {startPage > 2 && <span className="px-2 text-ink">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          data-active={page === currentPage}
          size="sm"
          onClick={() => onPageChange(page)}
          className="h-9 min-w-[36px] rounded-lg border-line bg-transparent font-mono text-ink hover:bg-green-tint hover:text-ink rounded-lg font-mono data-[active=true]:bg-green data-[active=true]:text-white data-[active=false]:border-line data-[active=false]:bg-white data-[active=false]:text-ink hover:bg-green-tint"
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-ink">...</span>}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            className="h-9 min-w-[36px] rounded-lg border-line bg-transparent font-mono text-ink hover:bg-green-tint hover:text-ink"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 w-9 rounded-lg border-line bg-white text-ink hover:bg-green-tint"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="h-9 w-9 rounded-lg border-line bg-white text-ink hover:bg-green-tint"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
