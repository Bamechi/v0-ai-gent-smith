import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import type { AITool } from "@/lib/types"

interface ToolKanbanProps {
  tools: AITool[]
  categories: string[]
}

export function ToolKanban({ tools, categories }: ToolKanbanProps) {
  // Group tools by primary category
  const toolsByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = tools.filter((tool) => tool.category_1 === category)
      return acc
    },
    {} as Record<string, AITool[]>,
  )

  // Add uncategorized tools
  const uncategorized = tools.filter((tool) => !tool.category_1)
  if (uncategorized.length > 0) {
    toolsByCategory["Uncategorized"] = uncategorized
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {Object.entries(toolsByCategory).map(
        ([category, categoryTools]) =>
          categoryTools.length > 0 && (
            <div key={category} className="flex min-w-[320px] flex-col gap-4">
              {/* Column Header */}
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <h3 className="font-semibold text-balance">{category}</h3>
                <Badge variant="secondary">{categoryTools.length}</Badge>
              </div>

              {/* Column Cards */}
              <div className="flex flex-col gap-3">
                {categoryTools.map((tool) => (
                  <Card key={tool.id} className="transition-all hover:shadow-md hover:border-primary/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base line-clamp-1 text-balance">{tool.app_name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-balance leading-relaxed">
                        {tool.short_description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {tool.tags && tool.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {tool.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs font-normal">
                              {tag}
                            </Badge>
                          ))}
                          {tool.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs font-normal">
                              +{tool.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                      <Link
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        Visit Tool
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  )
}
