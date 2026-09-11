"use client"

interface CategoryShowcaseProps {
  categories: string[]
  counts?: Record<string, number>
  onCategorySelect: (category: string) => void
  selectedCategory?: string
}

/** Category rail — every category with counts, high-contrast active state. */
export function CategoryShowcase({ categories, counts = {}, onCategorySelect, selectedCategory }: CategoryShowcaseProps) {
  const ordered = [...categories].sort((a, b) => (counts[b] || 0) - (counts[a] || 0))
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-2">
        <Chip active={!selectedCategory} onClick={() => selectedCategory && onCategorySelect(selectedCategory)} label="All" />
        {ordered.map((c) => (
          <Chip key={c} active={selectedCategory === c} onClick={() => onCategorySelect(c)} label={c} count={counts[c]} />
        ))}
      </div>
    </div>
  )
}

function Chip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count?: number }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 items-center gap-2 whitespace-nowrap rounded-full border px-4 font-sans text-sm font-medium transition-all ${
        active ? "border-green bg-green text-white shadow-[0_8px_24px_rgba(15,138,62,0.3)]" : "border-line bg-white text-ink-soft hover:border-green/50 hover:text-ink"
      }`}
    >
      {label}
      {count !== undefined && <span className={`mono text-[11px] ${active ? "text-white/70" : "text-ink-mute"}`}>{count}</span>}
    </button>
  )
}
