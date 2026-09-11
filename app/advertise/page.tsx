import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, Layers, Tag, Users, Database, Rocket, MessageSquare, BarChart3, Globe, Plus } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Advertise | AiGENT SMITH",
  description: "Advertise where AI builders actually look. Partner with the world's most structured AI tools database.",
}

export default function AdvertisePage() {
  return (
    <div className="grid-bg flex min-h-screen flex-col bg-paper pt-16">
      {/* Header component for consistent navigation */}
      <Header />

      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6">
              Advertise Where AI Builders Actually Look.
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-4">
              AiGENT SMITH is building the world's most structured AI tools database — a living registry used by
              builders, operators, founders, and teams who actively evaluate and adopt AI tools.
            </p>
            <p className="text-sm text-neutral-500 mb-10 font-medium">
              Visibility through structure. Reach through relevance.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="bg-green hover:bg-green-deep text-white font-semibold px-8" asChild>
                <a href="mailto:cnfdnt.ai@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in touch
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green text-green hover:bg-green-tint font-semibold px-8 bg-transparent"
                asChild
              >
                <Link href="/submit">
                  <Plus className="mr-2 h-5 w-5" />
                  Submit AI Tool
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-16 text-center">Why Partner</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Main value prop card */}
              <div className="md:col-span-2 bg-gradient-to-br from-[#0f8a3e] to-[#006610] rounded-2xl p-8 md:p-10 text-white">
                <p className="text-xl md:text-2xl font-light mb-4">AiGENT SMITH is not a newsletter or a trend blog.</p>
                <p className="text-3xl md:text-4xl font-bold">It's an active discovery system.</p>
                <p className="text-lg text-white/80 mt-6">People don't come here to browse — they come to decide.</p>
              </div>

              {/* Feature cards */}
              <div className="bg-[#f8faf8] border-2 border-[#0f8a3e]/20 rounded-2xl p-6 hover:border-[#0f8a3e]/40 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Compared Side-by-Side</h3>
                <p className="text-neutral-600">Tools are evaluated against real alternatives in context</p>
              </div>

              <div className="bg-[#f8faf8] border-2 border-[#0f8a3e]/20 rounded-2xl p-6 hover:border-[#0f8a3e]/40 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center mb-4">
                  <Tag className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Categorized by Real Use Case</h3>
                <p className="text-neutral-600">Not generic labels — actual workflow categories</p>
              </div>

              <div className="bg-[#f8faf8] border-2 border-[#0f8a3e]/20 rounded-2xl p-6 hover:border-[#0f8a3e]/40 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Evaluated Over Time</h3>
                <p className="text-neutral-600">Long-term visibility, not fleeting impressions</p>
              </div>

              <div className="bg-[#f8faf8] border-2 border-[#0f8a3e]/20 rounded-2xl p-6 hover:border-[#0f8a3e]/40 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Revisited at Decision Time</h3>
                <p className="text-neutral-600">Teams return when they're ready to adopt</p>
              </div>
            </div>

            {/* Bottom highlight */}
            <div className="text-center bg-green/5 rounded-2xl p-8 border border-[#0f8a3e]/10">
              <p className="text-lg text-neutral-600 mb-2">This creates a different kind of exposure:</p>
              <p className="text-2xl md:text-3xl font-bold text-black">Intent-driven. Contextual. Repeatable.</p>
            </div>
          </div>
        </section>

        {/* What You're Advertising Into - Updated cards with green gradient like tool cards */}
        <section className="py-20 px-4 bg-[#f8faf8]">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 text-center">What You're Advertising Into</h2>
            <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
              A structured ecosystem built for discovery and decision-making
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="flex items-start gap-4 p-6 rounded-2xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(200, 230, 201, 0.7) 0%, rgba(165, 214, 167, 0.8) 50%, rgba(129, 199, 132, 0.7) 100%)",
                  boxShadow:
                    "inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 66, 8, 0.1), 0 4px 12px rgba(0, 66, 8, 0.15)",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center shrink-0 shadow-md">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green text-lg mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                    Growing AI Tools Registry
                  </h3>
                  <p className="text-[#1a3a1a] font-medium">Updated continuously with new tools and data</p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 p-6 rounded-2xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(200, 230, 201, 0.7) 0%, rgba(165, 214, 167, 0.8) 50%, rgba(129, 199, 132, 0.7) 100%)",
                  boxShadow:
                    "inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 66, 8, 0.1), 0 4px 12px rgba(0, 66, 8, 0.15)",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center shrink-0 shadow-md">
                  <Tag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green text-lg mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                    Category & Tag Discovery
                  </h3>
                  <p className="text-[#1a3a1a] font-medium">Not algorithm feeds — structured, intentional browsing</p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 p-6 rounded-2xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(200, 230, 201, 0.7) 0%, rgba(165, 214, 167, 0.8) 50%, rgba(129, 199, 132, 0.7) 100%)",
                  boxShadow:
                    "inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 66, 8, 0.1), 0 4px 12px rgba(0, 66, 8, 0.15)",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center shrink-0 shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green text-lg mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                    Decision-Makers
                  </h3>
                  <p className="text-[#1a3a1a] font-medium">
                    Builders, operators, and teams actively searching for solutions
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 p-6 rounded-2xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(200, 230, 201, 0.7) 0%, rgba(165, 214, 167, 0.8) 50%, rgba(129, 199, 132, 0.7) 100%)",
                  boxShadow:
                    "inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 66, 8, 0.1), 0 4px 12px rgba(0, 66, 8, 0.15)",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center shrink-0 shadow-md">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green text-lg mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                    Scaling Infrastructure
                  </h3>
                  <p className="text-[#1a3a1a] font-medium">
                    Designed to become the largest structured AI database on the web
                  </p>
                </div>
              </div>
            </div>
            <p className="text-green/70 mt-10 text-center text-lg italic">
              "Advertising here is closer to product placement than traditional ads."
            </p>
          </div>
        </section>

        {/* Advertising Opportunities */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 text-center">Advertising Opportunities</h2>
            <p className="text-neutral-600 mb-12 text-center">
              Formats designed to meet users at the moment of discovery.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2 border-neutral-200 hover:border-[#0f8a3e] hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-lg bg-green flex items-center justify-center shrink-0">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-black">Featured Tool Placement</span>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2 border-neutral-200 hover:border-[#0f8a3e] hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-lg bg-green flex items-center justify-center shrink-0">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-black">Sponsored Category Visibility</span>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2 border-neutral-200 hover:border-[#0f8a3e] hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-lg bg-green flex items-center justify-center shrink-0">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-black">Product Launch Highlights</span>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2 border-neutral-200 hover:border-[#0f8a3e] hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-lg bg-green flex items-center justify-center shrink-0">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-black">Directory-Level Sponsorships</span>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl bg-white border-2 border-neutral-200 hover:border-[#0f8a3e] hover:shadow-lg transition-all md:col-span-2 lg:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-green flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-black">
                  Future placements across guides, education, and community surfaces
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-[#f8faf8]">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-16 text-center">We Keep It Simple.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
                <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-green text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-bold text-black mb-3">Express Interest</h3>
                  <p className="text-neutral-600">
                    Share what you're building, your goals, and your timing. This helps us determine fit.
                  </p>
                </div>
              </div>
              <div className="relative bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
                <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-green text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-bold text-black mb-3">Placement Design</h3>
                  <p className="text-neutral-600">
                    We align your product with the right category, context, and discovery surface.
                  </p>
                </div>
              </div>
              <div className="relative bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
                <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-green text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-bold text-black mb-3">Signal & Feedback</h3>
                  <p className="text-neutral-600">
                    As the platform evolves, placements gain long-term discovery value — not just one-time impressions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-green">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Availability</h2>
            <p className="text-white/80 mb-4 text-lg">
              AiGENT SMITH is intentionally selective about partnerships.
              <br />
              Not every product is a fit — and that's by design.
            </p>
            <p className="text-white/80 mb-10 text-lg">
              If you're building something useful and want to be discovered in the right context, start the
              conversation.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="bg-white text-green hover:bg-white/90 font-semibold px-8" asChild>
                <Link href="mailto:cnfdnt.ai@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in touch
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-8 bg-transparent"
                asChild
              >
                <Link href="/submit">
                  <Plus className="mr-2 h-5 w-5" />
                  Submit AI Tool
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer component for consistency */}
      <Footer />
    </div>
  )
}
