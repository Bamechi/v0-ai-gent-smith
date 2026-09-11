import { createClient } from "@/lib/supabase/server"
import { getSiteUrl } from "@/lib/site-url"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const supabase = await createClient()

  // Fetch all tools for dynamic URLs
  const { data: tools } = await supabase
    .from("ai_tools")
    .select("tool_id, last_updated")
    .order("last_updated", { ascending: false })

  const toolUrls =
    tools?.map((tool) => ({
      url: `${baseUrl}/tool/${tool.tool_id}`,
      lastModified: new Date(tool.last_updated),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...toolUrls,
  ]
}
