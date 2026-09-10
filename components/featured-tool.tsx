import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import type { AITool } from "@/lib/types"

interface FeaturedToolProps {
  tool: AITool
}

export function FeaturedTool({ tool }: FeaturedToolProps) {
  return (
    <Card className="border-2 border-black bg-white shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#00ff41]">
            <Sparkles className="h-6 w-6 text-black" />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <div className="mb-1">
                <h4 className="text-sm font-black uppercase text-black tracking-wide">AI App of the Day</h4>
              </div>
              <h3 className="text-2xl font-black text-balance uppercase text-black">{tool.app_name}</h3>
            </div>

            <p className="mono-description text-black leading-relaxed text-balance">{tool.short_description}</p>

            <div className="flex flex-wrap gap-2">
              {tool.category_1 && (
                <Badge className="bg-black text-white hover:bg-[#00ff41] hover:text-black">{tool.category_1}</Badge>
              )}
              {tool.category_2 && (
                <Badge className="bg-black text-white hover:bg-[#00ff41] hover:text-black">{tool.category_2}</Badge>
              )}
              {tool.tags &&
                tool.tags.slice(0, 3).map((tag, idx) => (
                  <Badge key={idx} className="mono-description bg-black text-white hover:bg-[#00ff41] hover:text-black">
                    {tag}
                  </Badge>
                ))}
            </div>

            <Link
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black hover:text-[#00ff41] font-black uppercase text-sm transition-colors"
            >
              Explore This Tool
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
