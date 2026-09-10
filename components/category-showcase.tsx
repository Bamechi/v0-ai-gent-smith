"use client"

import { Button } from "@/components/ui/button"

interface CategoryShowcaseProps {
  categories: string[]
  onCategorySelect: (category: string) => void
  selectedCategory?: string
}

const CATEGORY_LIST = [
  "Video (Create & Edit)",
  "Images (Create & Edit)",
  "Audio / Voice / Music",
  "Meetings (Transcription & Action Items)",
  "Productivity & Notes",
  "Revenue (Sales & Commerce)",
]

export function CategoryShowcase({ categories, onCategorySelect, selectedCategory }: CategoryShowcaseProps) {
  return (
    <div className="space-y-6 py-8">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl text-[#004208]">Trending Tools</h2>
        <p className="text-lg mono-description text-black max-w-2xl mx-auto">
          The most useful AI tools — organized and categorized in one spot.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 px-4">
        {CATEGORY_LIST.map((category) => {
          const isSelected = selectedCategory === category

          return (
            <Button
              key={category}
              size="lg"
              onClick={() => onCategorySelect(category)}
              className={`font-bold text-sm uppercase tracking-wide transition-all ${
                isSelected
                  ? "bg-white text-black shadow-lg border-2 border-black"
                  : /* Updated button background to #004208 */
                    "bg-[#004208] text-white hover:bg-white hover:text-black border-2 border-transparent hover:border-black"
              }`}
            >
              {category}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
