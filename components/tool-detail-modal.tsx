"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Calendar, Tag } from "lucide-react"
import type { AITool } from "@/lib/types"
import Link from "next/link"

interface ToolDetailModalProps {
  tool: AITool | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ToolDetailModal({ tool, open, onOpenChange }: ToolDetailModalProps) {
  if (!tool) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-3xl font-black uppercase tracking-tight">{tool.app_name}</DialogTitle>
              {tool.featured_today && (
                <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                  <Star className="mr-1 h-3 w-3 fill-primary" />
                  Featured Today
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rating Section */}
          {tool.star_rating && (
            <div className="flex items-center gap-4 rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(tool.star_rating!) ? "fill-primary text-primary" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{tool.star_rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({tool.review_count?.toLocaleString()} reviews)</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide">Description</h4>
            <p className="mono-description text-foreground/90 leading-relaxed">{tool.short_description}</p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
              <Tag className="h-4 w-4" />
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {tool.category_1 && (
                <Badge variant="default" className="text-sm font-bold">
                  {tool.category_1}
                </Badge>
              )}
              {tool.category_2 && (
                <Badge variant="secondary" className="text-sm font-bold">
                  {tool.category_2}
                </Badge>
              )}
              {tool.category_3 && (
                <Badge variant="outline" className="text-sm font-bold">
                  {tool.category_3}
                </Badge>
              )}
            </div>
          </div>

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wide">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="mono-description">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide">Pricing</h4>
              <p className="mono-description text-muted-foreground font-bold text-[#004208]">
                {tool.pricing || "$Freemium"}
              </p>
            </div>
            {tool.platforms && (
              <div>
                <h4 className="mb-2 text-sm font-bold uppercase tracking-wide">Platforms</h4>
                <p className="mono-description text-muted-foreground">{tool.platforms}</p>
              </div>
            )}
            {tool.date_added && (
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
                  <Calendar className="h-4 w-4" />
                  Added
                </h4>
                <p className="mono-description text-muted-foreground">
                  {new Date(tool.date_added).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Promo Code */}
          {tool.promo_code && (
            <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide">Promo Code</h4>
              <code className="rounded bg-background px-3 py-1 text-lg font-mono font-bold">{tool.promo_code}</code>
            </div>
          )}

          {/* CTA Button */}
          <Button asChild size="lg" className="w-full text-lg font-black uppercase">
            <Link href={tool.url} target="_blank" rel="noopener noreferrer">
              Visit {tool.app_name}
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
