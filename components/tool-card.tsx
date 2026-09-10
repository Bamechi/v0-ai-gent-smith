"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { AITool } from "@/lib/types"

interface ToolCardProps {
  tool: AITool
  onClick: () => void
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <Card
      className="group relative flex cursor-pointer flex-col overflow-hidden transition-all hover:scale-[1.02] rounded-xl border border-[#004208]/20 bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#a5d6a7] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_4px_12px_-2px_rgba(0,66,8,0.15)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_8px_20px_-4px_rgba(0,66,8,0.25)] hover:border-[#004208]/40"
      onClick={onClick}
    >
      {tool.featured_today && (
        <div className="absolute right-2 top-2 z-10">
          <Badge className="bg-[#004208] text-white border-none font-bold shadow-md">
            <Star className="mr-1 h-3 w-3 fill-white" />
            FEATURED
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-black uppercase tracking-tight text-[#004208] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          <span className="line-clamp-1 text-balance">{tool.app_name}</span>
        </CardTitle>

        {/* Rating */}
        {tool.star_rating && tool.star_rating > 0 && (
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(tool.star_rating!) ? "fill-[#004208] text-[#004208]" : "text-[#004208]/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-[#004208]">{tool.star_rating.toFixed(1)}</span>
            {tool.review_count && tool.review_count > 0 && (
              <span className="text-xs font-medium text-[#004208]/70">({tool.review_count?.toLocaleString()})</span>
            )}
          </div>
        )}

        <CardDescription className="line-clamp-2 mono-description text-balance leading-relaxed text-[#1a3a1a] font-medium">
          {tool.short_description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {tool.category_1 && (
            <Badge className="text-xs font-bold bg-[#004208] text-white hover:bg-[#004208]/90 border-none shadow-sm">
              {tool.category_1}
            </Badge>
          )}
          {tool.category_2 && (
            <Badge className="text-xs font-bold bg-[#004208] text-white hover:bg-[#004208]/90 border-none shadow-sm">
              {tool.category_2}
            </Badge>
          )}
        </div>

        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tool.tags.slice(0, 3).map((tag, idx) => (
              <Badge
                key={idx}
                className="mono-description text-xs bg-white/60 text-[#004208] border border-[#004208]/40 hover:bg-white/80 font-medium shadow-sm"
              >
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge className="mono-description text-xs bg-white/60 text-[#004208] border border-[#004208]/40 font-medium shadow-sm">
                +{tool.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
