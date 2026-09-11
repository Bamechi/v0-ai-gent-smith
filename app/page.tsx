import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero/hero"
import { SignupBand } from "@/components/signup-band"
import { FeaturedTool } from "@/components/featured-tool"
import { ToolsDisplay } from "@/components/tools-display"
import { StructuredData } from "@/components/structured-data"
import { ImportButton } from "@/components/import-button"
import type { AITool } from "@/lib/types"
import { MOCK_TOOLS } from "@/lib/mock-tools"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "AiGENT SMITH | The AI tools directory, updated weekly",
  description: "Every useful AI tool, categorized and vetted in one place. Browse 580+ tools, find your fit in three minutes, and learn the language of AI.",
}

const isValidTool = (t: AITool) => {
  const name = (t.app_name || "").trim()
  if (!name) return false
  if (/^[A-Z\s]{1,20}$/.test(name) && !/[AEIOU]/i.test(name)) return false
  if (/^(.{1,3})\1+$/i.test(name) && name.length <= 10) return false
  if (t.status && t.status !== "published") return false
  return true
}

export default async function HomePage() {
  let rows: AITool[] = []
  let featuredRow: AITool | null = null
  if (process.env.MOCK_TOOLS === "1") {
    rows = MOCK_TOOLS
  } else {
    const supabase = await createClient()
    const [f, all] = await Promise.all([
      supabase.from("ai_tools").select("*").eq("featured_today", true).limit(1).maybeSingle(),
      supabase.from("ai_tools").select("*").order("app_name", { ascending: true }),
    ])
    if (all.error) console.error("[aigent] tools fetch failed:", all.error.message)
    rows = (all.data as AITool[]) || []
    featuredRow = (f.data as AITool | null) || null
  }

  const tools = rows.filter(isValidTool)
  const featured = featuredRow || tools.find((t) => /callava|^ava ai$/i.test(`${t.url} ${t.app_name}`)) || tools[0] || null

  const categories = new Set<string>()
  for (const t of tools) for (const c of [t.category_1, t.category_2, t.category_3]) if (c) categories.add(c)
  const tickerNames = tools.slice().sort(() => 0.5 - Math.random()).slice(0, 40).map((t) => t.app_name)

  return (
    <>
      <StructuredData type="website" />
      <div className="grid-bg flex min-h-screen flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">
          <Hero toolCount={tools.length} categoryCount={categories.size} names={tickerNames.length ? tickerNames : ["AiGENT SMITH"]} />

          <div className="mx-auto max-w-[1400px] space-y-24 px-5 pb-24 pt-16 sm:px-8 lg:px-12">
            <section><SignupBand /></section>

            {featured && (
              <section id="featured" className="scroll-mt-24 space-y-6">
                <SectionHead index="01" title="App of the day" note="One tool, one look, every day." />
                <FeaturedTool tool={featured} />
              </section>
            )}

            <section id="directory" className="scroll-mt-24 space-y-8">
              <SectionHead index="02" title="The directory" note={`${tools.length} tools across ${categories.size} categories. Press / to search.`} />
              {tools.length > 0 ? (
                <ToolsDisplay initialTools={tools} />
              ) : (
                <div className="rounded-xl border border-dashed border-line bg-white p-10 text-center">
                  <p className="font-display text-2xl text-ink">The directory is empty.</p>
                  <p className="mono-description mt-2 text-ink-mute">Run the SQL in /scripts against Supabase, or import the CSV.</p>
                  <div className="mt-6"><ImportButton /></div>
                </div>
              )}
            </section>

            {/* About */}
            <section id="about" className="scroll-mt-24">
              <div className="reveal overflow-hidden rounded-2xl border border-line bg-white">
                <div className="grid md:grid-cols-[1.3fr_1fr]">
                  <div className="p-7 sm:p-10">
                    <div className="mono text-[11px] tracking-[0.18em] text-ink-mute">ABOUT</div>
                    <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-5xl">Built by High Lvl AI.</h2>
                    <p className="mt-5 max-w-[52ch] font-sans text-ink-soft">
                      AiGENT SMITH is a living directory of the AI tools worth your time — categorized, vetted, and refreshed every week. It is built and maintained by High Lvl AI, an agency and collective helping creators and operators put AI to work. Want more AI apps, custom builds, or to work with us? Follow up and see what the collective is building.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <a href="https://19keys.com/ai" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-6 font-display text-sm text-white transition-colors hover:bg-green">
                        More on the collective <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <a href="mailto:cnfdnt.ai@gmail.com" className="inline-flex h-12 items-center rounded-lg border border-line px-6 font-sans text-sm text-ink transition-colors hover:border-green hover:text-green">
                        cnfdnt.ai@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="grid-bg-dark relative hidden bg-[radial-gradient(80%_120%_at_70%_0%,#0f3a22,#060806_70%)] md:block">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="font-display text-[#f2f5f0]" style={{ fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-0.04em" }}>
                        HIGH <span className="text-signal">LVL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTAs */}
            <section className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
              <Tile index="03" title="Submit a tool" body="Built something worth using? Put it in front of the people who ship." href="/submit" cta="Submit" />
              <Tile index="04" title="AI Alchemy Dictionary" body="Agents, RAG, MCP, tokens. The vocabulary, in plain English." href="/dictionary" cta="Open the dictionary" />
              <Tile index="05" title="Join the community" body="CNFDNT members on Ziion get weekly AI trainings and full access." href="https://ziion.io/nations/cnfdnt" cta="Join Ziion" />
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

function SectionHead({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <div className="reveal flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
      <div className="flex items-baseline gap-4">
        <span className="mono text-xs text-green">{index}</span>
        <h2 className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl">{title}</h2>
      </div>
      <p className="mono text-xs text-ink-mute">{note}</p>
    </div>
  )
}

function Tile({ index, title, body, href, cta }: { index: string; title: string; body: string; href: string; cta: string }) {
  const external = href.startsWith("http")
  const inner = (
    <>
      <span className="mono text-xs text-green">{index}</span>
      <div>
        <h3 className="font-display text-2xl leading-tight text-ink">{title}</h3>
        <p className="mt-3 font-sans text-sm text-ink-soft">{body}</p>
      </div>
      <span className="inline-flex items-center gap-2 font-display text-sm text-ink group-hover:text-green">{cta} <ArrowUpRight className="h-4 w-4" /></span>
    </>
  )
  const cls = "group flex flex-col justify-between gap-10 bg-white p-7 transition-colors hover:bg-green-tint/40 sm:p-9"
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>
}
