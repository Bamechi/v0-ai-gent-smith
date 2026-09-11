"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react"
import type { AITool } from "@/lib/types"

interface ToolTableProps {
  tools: AITool[]
  onToolClick: (tool: AITool) => void
}

export function ToolTable({ tools, onToolClick }: ToolTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px] font-display text-xs tracking-[0.12em] text-ink">Name</TableHead>
            <TableHead className="w-[120px] font-display text-xs tracking-[0.12em] text-ink">Rating</TableHead>
            <TableHead className="max-w-[300px] font-display text-xs tracking-[0.12em] text-ink">Description</TableHead>
            <TableHead className="font-display text-xs tracking-[0.12em] text-ink">Categories</TableHead>
            <TableHead className="w-[150px] font-display text-xs tracking-[0.12em] text-ink">Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow
              key={tool.id}
              className="group cursor-pointer hover:bg-green-tint/40 "
              onClick={() => onToolClick(tool)}
            >
              <TableCell className="font-bold">
                <div className="flex items-center gap-2">
                  {tool.featured_today && <Star className="h-4 w-4 fill-green text-green flex-shrink-0" />}
                  <span className="line-clamp-1 text-ink">{tool.app_name}</span>
                </div>
              </TableCell>
              <TableCell>
                {tool.star_rating && tool.star_rating > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-green text-green" />
                    <span className="font-bold text-ink">{tool.star_rating.toFixed(1)}</span>
                    {tool.review_count && tool.review_count > 0 && (
                      <span className="text-xs text-ink-mute">({tool.review_count})</span>
                    )}
                  </div>
                ) : (
                  <span className="mono text-xs text-ink-mute">Unrated</span>
                )}
              </TableCell>
              <TableCell className="max-w-[300px] overflow-hidden">
                <p className="truncate mono-description text-ink text-sm">{tool.short_description}</p>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {tool.category_1 && (
                    <Badge className="w-fit text-xs font-bold bg-green text-white hover:bg-green-deep">
                      {tool.category_1}
                    </Badge>
                  )}
                  {tool.category_2 && (
                    <Badge className="w-fit text-xs font-bold bg-green text-white hover:bg-green-deep">
                      {tool.category_2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <Badge className="mono-description text-xs border border-line bg-green-tint text-green-deep">
                      {tool.tags[0]}
                    </Badge>
                    {tool.tags.length > 1 && (
                      <Badge className="mono-description text-xs border border-line bg-green-tint text-green-deep">
                        +{tool.tags.length - 1}
                      </Badge>
                    )}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
