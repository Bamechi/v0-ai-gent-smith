"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedTool } from "@/components/featured-tool"
import { ToolsDisplay } from "@/components/tools-display"
import { StructuredData } from "@/components/structured-data"
import { BetaSignup } from "@/components/beta-signup"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { AITool } from "@/lib/types"

export default function PageClient({
  featuredTool,
  tools,
}: {
  featuredTool: AITool | null
  tools: AITool[] | null
}) {
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
                <div className="text-center py-20 space-y-4">
                  <h3 className="text-3xl font-black uppercase text-black">No Tools Found</h3>
                  <p className="mono-description text-lg text-black">
                    Please run the database seed scripts to populate the AI tools directory.
                  </p>
                  <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg max-w-2xl mx-auto">
                    <p className="font-bold mb-4 text-black text-lg">Quick Import: Load All 583 Tools from CSV</p>
                    <button
                      onClick={async () => {
                        const btn = event?.target as HTMLButtonElement
                        btn.disabled = true
                        btn.textContent = "Importing..."

                        const response = await fetch("/api/bulk-import-csv", { method: "POST" })
                        const result = await response.json()

                        if (result.success) {
                          alert(
                            `Import complete! Imported: ${result.imported}, Skipped: ${result.skipped}, Errors: ${result.errors}`,
                          )
                          window.location.reload()
                        } else {
                          alert("Import failed: " + result.error)
                          btn.disabled = false
                          btn.textContent = "Import All Tools from CSV"
                        }
                      }}
                      className="bg-[#004208] text-white px-6 py-3 rounded-lg font-bold uppercase hover:bg-[#004208]/90"
                    >
                      Import All Tools from CSV
                    </button>
                    <p className="text-sm text-black/70 mt-3 mono-description">
                      This will import all 583 AI tools from the CSV file directly into your database. This may take 1-2
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
            {/* AI Assessment section - Beta/Coming Soon */}
            {tools && tools.length > 0 && (
              <section className="bg-white py-16 border-2 border-[#004208] rounded-lg">
                <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 flex items-center justify-center">
                      <Image
                        src="/favicon.png"
                        alt="AIGENT Smith Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="inline-block">
                    <Badge className="bg-[#004208] text-white text-sm font-bold uppercase px-4 py-1.5 mb-4">
                      Coming Soon • Beta
                    </Badge>
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tight text-black">Take the AI Assessment</h2>
                  <p className="text-lg mono-description text-black max-w-2xl mx-auto leading-relaxed">
                    Discover which AI tools are perfect for your specific needs. Our comprehensive assessment will
                    analyze your workflow and recommend personalized solutions.
                  </p>
                  <Button
                    size="lg"
                    disabled
                    className="font-bold uppercase tracking-wide bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Get Early Access
                  </Button>
                  <p className="text-sm mono-description text-black/60">
                    Join our beta waitlist to be the first to try the AI Assessment tool
                  </p>
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
