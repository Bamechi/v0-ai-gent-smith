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
    <div className="glass-card rounded-lg border-2 border-border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px] font-black uppercase text-black">Name</TableHead>
            <TableHead className="w-[120px] font-black uppercase text-black">Rating</TableHead>
            <TableHead className="max-w-[300px] font-black uppercase text-black">Description</TableHead>
            <TableHead className="font-black uppercase text-black">Categories</TableHead>
            <TableHead className="w-[150px] font-black uppercase text-black">Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow
              key={tool.id}
              className="group cursor-pointer hover:bg-muted/30 bg-white"
              onClick={() => onToolClick(tool)}
            >
              <TableCell className="font-bold">
                <div className="flex items-center gap-2">
                  {tool.featured_today && <Star className="h-4 w-4 fill-primary text-primary flex-shrink-0" />}
                  <span className="line-clamp-1 text-black">{tool.app_name}</span>
                </div>
              </TableCell>
              <TableCell>
                {tool.star_rating && tool.star_rating > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-[#004208] text-[#004208]" />
                    <span className="font-bold text-black">{tool.star_rating.toFixed(1)}</span>
                    {tool.review_count && tool.review_count > 0 && (
                      <span className="text-xs text-black">({tool.review_count})</span>
                    )}
                  </div>
                )}
              </TableCell>
              <TableCell className="max-w-[300px] overflow-hidden">
                <p className="truncate mono-description text-black text-sm">{tool.short_description}</p>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {tool.category_1 && (
                    <Badge className="w-fit text-xs font-bold bg-black text-white hover:bg-[#004208] hover:text-white">
                      {tool.category_1}
                    </Badge>
                  )}
                  {tool.category_2 && (
                    <Badge className="w-fit text-xs font-bold bg-black text-white hover:bg-[#004208] hover:text-white">
                      {tool.category_2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <Badge className="mono-description text-xs bg-[#004208] text-white hover:bg-[#004208]/80 hover:text-white">
                      {tool.tags[0]}
                    </Badge>
                    {tool.tags.length > 1 && (
                      <Badge className="mono-description text-xs bg-[#004208] text-white">
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
