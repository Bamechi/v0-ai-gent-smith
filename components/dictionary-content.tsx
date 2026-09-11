"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DictionaryCard } from "@/components/dictionary-card"
import { DictionaryModal } from "@/components/dictionary-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SortAsc, SortDesc, BookOpen, ChevronDown } from "lucide-react"
import { dictionaryTerms, dictionaryCategories, type DictionaryTerm } from "@/lib/dictionary-data"

type SortOption = "a-z" | "z-a"

const ITEMS_PER_PAGE = 12

export function DictionaryContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState<SortOption>("a-z")
  const [selectedTerm, setSelectedTerm] = useState<DictionaryTerm | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const filteredAndSortedTerms = useMemo(() => {
    let filtered = dictionaryTerms

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (term) => term.term.toLowerCase().includes(query) || term.definition.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((term) => term.category === selectedCategory)
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "a-z") {
        return a.term.localeCompare(b.term)
      } else {
        return b.term.localeCompare(a.term)
      }
    })

    return sorted
  }, [searchQuery, selectedCategory, sortOption])

  const visibleTerms = useMemo(() => {
    return filteredAndSortedTerms.slice(0, visibleCount)
  }, [filteredAndSortedTerms, visibleCount])

  const hasMore = visibleCount < filteredAndSortedTerms.length

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredAndSortedTerms.length))
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleSortChange = (value: SortOption) => {
    setSortOption(value)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const handleTermClick = (term: DictionaryTerm) => {
    setSelectedTerm(term)
    setModalOpen(true)
  }

  return (
    <div className="grid-bg min-h-screen bg-paper pt-16">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green/10 text-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            <span>150 AI Terms & Definitions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-black">AI DICTIONARY</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master the language of artificial intelligence. From fundamentals to cutting-edge concepts, find clear
            definitions for every term you need to know.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-[200px] h-12">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {dictionaryCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={sortOption === "a-z" ? "default" : "outline"}
              onClick={() => handleSortChange("a-z")}
              className={sortOption === "a-z" ? "bg-green hover:bg-green-deep" : ""}
            >
              <SortAsc className="h-4 w-4 mr-2" />
              A-Z
            </Button>
            <Button
              variant={sortOption === "z-a" ? "default" : "outline"}
              onClick={() => handleSortChange("z-a")}
              className={sortOption === "z-a" ? "bg-green hover:bg-green-deep" : ""}
            >
              <SortDesc className="h-4 w-4 mr-2" />
              Z-A
            </Button>
          </div>
        </div>

        {/* Results Count - Updated to show visible vs total */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {visibleTerms.length} of {filteredAndSortedTerms.length} terms
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </div>

        {/* Terms Grid */}
        {visibleTerms.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleTerms.map((term) => (
                <DictionaryCard key={term.id} term={term} onClick={() => handleTermClick(term)} />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-10">
                <Button
                  onClick={handleViewMore}
                  variant="outline"
                  size="lg"
                  className="border-[#0f8a3e] text-green hover:bg-green hover:text-white px-8 bg-transparent"
                >
                  <span>View More</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                  <span className="ml-2 text-sm opacity-70">
                    ({Math.min(ITEMS_PER_PAGE, filteredAndSortedTerms.length - visibleCount)} more)
                  </span>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No terms found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      <Footer />

      <DictionaryModal term={selectedTerm} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
