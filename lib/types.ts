export interface AITool {
  id: string
  tool_id: string
  app_name: string
  url: string
  short_description: string | null
  category_1: string | null
  category_2: string | null
  category_3: string | null
  tags: string[] | null
  platforms: string | null
  pricing?: string | null
  promo_code: string | null
  featured_today: boolean
  sponsored: boolean
  date_added: string
  last_updated: string
  source_name_or_link: string | null
  created_at: string
  star_rating: number | null
  review_count: number | null
}

export type ViewMode = "table" | "cards"

export type SortOption = "name-asc" | "name-desc" | "rating-high" | "rating-low" | "newest" | "oldest"

export interface FilterState {
  categories: string[]
  tags: string[]
  searchQuery: string
}
