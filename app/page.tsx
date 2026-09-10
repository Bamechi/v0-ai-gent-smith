import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedTool } from "@/components/featured-tool"
import { ToolsDisplay } from "@/components/tools-display"
import { StructuredData } from "@/components/structured-data"
import { BetaSignup } from "@/components/beta-signup"
import { ImportButton } from "@/components/import-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Sparkles } from "lucide-react"
import type { AITool } from "@/lib/types"

export const metadata = {
  title: "AiGENT SMITH | Discover the Best AI Tools & Applications",
  description:
    "The ultimate directory of AI tools and applications. Discover, compare, and find the perfect AI solution for your needs. Browse 500+ AI tools across all categories.",
  openGraph: {
    title: "AiGENT SMITH | Discover the Best AI Tools",
    description: "The ultimate directory of AI tools and applications. Discover 500+ AI tools across all categories.",
    type: "website",
  },
}

export default async function HomePage() {
  const supabase = await createClient()

  let featuredTool = null

  const { data: avaData } = await supabase
    .from("ai_tools")
    .select("*")
    .or("app_name.ilike.%ava%,app_name.ilike.%callava%,url.ilike.%callava%")
    .limit(1)
    .maybeSingle()

  if (avaData) {
    featuredTool = avaData
  } else {
    const { data: anyFeatured } = await supabase
      .from("ai_tools")
      .select("*")
      .eq("featured_today", true)
      .limit(1)
      .maybeSingle()

    if (anyFeatured) {
      featuredTool = anyFeatured
    }
  }

  const { data: tools, error } = await supabase.from("ai_tools").select("*").order("app_name", { ascending: true })

  console.log("[v0] Total tools fetched:", tools?.length || 0)
  console.log("[v0] Featured tool:", featuredTool?.app_name || "None")
  if (error) {
    console.log("[v0] Error fetching tools:", error)
  }

  return (
    <>
      <StructuredData type="website" />

      <div className="flex min-h-screen flex-col bg-white">
        <Header />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 space-y-16">
            <section className="space-y-6 text-center py-16 border-b-2 border-border">
              <h1 className="text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl leading-[0.95] uppercase">
                <span className="gradient-text">Discover The Best</span> <br />
                <span className="text-black">AI Tools</span>
              </h1>
              <p className="mx-auto max-w-2xl text-2xl font-black text-black leading-tight">
                Join the beta and get early access
              </p>
              <p className="mx-auto max-w-3xl text-lg mono-description text-black leading-relaxed">
                The most useful AI tools — organized and categorized in one spot.
              </p>
            </section>

            <section className="max-w-xl mx-auto">
              <Link 
                href="/survey"
                className="flex items-center justify-between gap-4 bg-gradient-to-r from-[#e8f5e9] to-[#c8e6c9] border border-[#004208]/20 rounded-lg px-5 py-3 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#004208]" />
                  <span className="font-bold text-sm text-black">Take the 3-Minute AI Tool Finder</span>
                </div>
                <span className="text-xs text-[#004208] font-medium group-hover:translate-x-0.5 transition-transform">Free &rarr;</span>
              </Link>
            </section>

            <section className="max-w-2xl mx-auto">
              <BetaSignup />
            </section>

            {/* Featured Tool - only show if we have tools */}
            {featuredTool && (
              <section className="max-w-6xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-black uppercase tracking-tight text-black">AI App of the Day</h2>
                </div>
                <FeaturedTool tool={featuredTool as AITool} />
              </section>
            )}

            {/* Tools Display with Filters and Views */}
            <section>
              {tools && tools.length > 0 ? (
                <ToolsDisplay initialTools={(tools as AITool[]) || []} />
              ) : (
                <div className="text-center py-20 space-y-6">
                  <h3 className="text-3xl font-black uppercase text-black">No Tools Found</h3>
                  <p className="mono-description text-lg text-black">
                    Click the button below to import all 583 AI tools from the CSV file.
                  </p>
                  <div className="bg-yellow-50 border-2 border-yellow-400 p-8 rounded-lg max-w-2xl mx-auto space-y-4">
                    <p className="font-bold text-black text-xl">Quick Setup</p>
                    <ImportButton />
                    <p className="text-sm text-black/70 mono-description">
                      This will import all 583 AI tools from the CSV file directly into your database. Takes about 1-2
                      minutes.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Submit AI Tool section */}
            {tools && tools.length > 0 && (
              <section className="bg-black py-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <h2 className="text-4xl font-black uppercase tracking-tight text-white">Submit AI Tool</h2>
                  <p className="text-lg mono-description text-white max-w-2xl mx-auto leading-relaxed">
                    Have an AI tool you'd like to share? Submit it to our directory and help others discover innovative
                    solutions.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="font-bold uppercase tracking-wide bg-[#004208] text-white hover:bg-[#004208]/90"
                  >
                    <Link href="/submit">
                      <Plus className="mr-2 h-5 w-5" />
                      Submit Your Tool
                    </Link>
                  </Button>
                </div>
              </section>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
