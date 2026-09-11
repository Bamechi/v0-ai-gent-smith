import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "About",
  description: "AiGENT SMITH is built by High Lvl AI — an agency and collective helping creators and operators put AI to work.",
}

export default function AboutPage() {
  return (
    <div className="grid-bg flex min-h-screen flex-col bg-paper pt-16 text-ink">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-8">
        <div className="mono text-[11px] tracking-[0.18em] text-ink-mute">ABOUT AIGENT SMITH</div>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl">Built by High Lvl AI.</h1>
        <div className="mt-8 space-y-5 font-sans text-lg leading-relaxed text-ink-soft">
          <p>AiGENT SMITH is a living directory of the AI tools worth your time — categorized, vetted, and refreshed every week so you are always looking at what is current, not what was current a year ago.</p>
          <p>It is built and maintained by <span className="font-semibold text-ink">High Lvl AI</span>, an agency and collective helping creators, founders and operators put AI to work — through tools, custom builds, trainings, and community.</p>
          <p>Want more AI apps, a custom build, or to work with the collective? That is what we do. Follow up and let us show you what is possible.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="https://19keys.com/ai" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-6 font-display text-sm text-white transition-colors hover:bg-green">
            More on us <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="https://ziion.io/nations/cnfdnt" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-lg border border-line px-6 font-sans text-sm text-ink transition-colors hover:border-green hover:text-green">
            Join CNFDNT on Ziion
          </a>
          <a href="mailto:cnfdnt.ai@gmail.com" className="inline-flex h-12 items-center rounded-lg border border-line px-6 font-sans text-sm text-ink transition-colors hover:border-green hover:text-green">
            cnfdnt.ai@gmail.com
          </a>
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <Link href="/" className="mono text-sm text-green hover:underline">← Back to the directory</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
