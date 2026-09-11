"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { SignalField } from "./signal-field"
import { ScrollScrub } from "./scroll-scrub"
import { CountUp } from "@/components/motion/count-up"

interface HeroProps {
  toolCount: number
  categoryCount: number
  names: string[]
}

const WORD = "AiGENT SMITH"

/** Dark Matrix "construct" hero (~200vh sticky) sitting above the light paper page. */
export function Hero({ toolCount, categoryCount, names }: HeroProps) {
  const section = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const [p, setP] = useState(0)
  const [hasFrames, setHasFrames] = useState(false)

  useEffect(() => {
    fetch("/frames/hero/manifest.json", { method: "HEAD" }).then((r) => setHasFrames(r.ok)).catch(() => {})
  }, [])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const el = section.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const v = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)))
        progress.current = v
        setP((prev) => (Math.abs(prev - v) > 0.004 ? v : prev))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const fade = Math.max(0, 1 - p * 1.7)
  const lift = p * -70

  return (
    <section ref={section} className="construct-dark relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#060806]">
        {/* static grid base under the canvas so it looks right even before JS */}
        <div className="grid-bg-dark absolute inset-0 opacity-70" aria-hidden />
        {hasFrames ? <ScrollScrub name="hero" progressRef={progress} /> : <SignalField progressRef={progress} />}
        {/* green base glow — the "construct loading" light */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: "radial-gradient(60% 100% at 50% 120%, rgba(0,255,65,0.35), transparent 70%)" }}
          aria-hidden
        />

        <div
          className="relative z-10 flex h-full flex-col justify-between px-5 pb-24 pt-24 sm:px-8 lg:px-12"
          style={{ opacity: fade, transform: `translate3d(0, ${lift}px, 0)` }}
        >
          <div className="mono flex items-center gap-3 text-[11px] tracking-[0.18em] text-[#8fa58c]">
            <span className="pulse-signal inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            LIVE DIRECTORY · UPDATED WEEKLY
          </div>

          <div className="space-y-8">
            <h1 className="font-display text-[#f2f5f0]" style={{ fontSize: "clamp(3.4rem, 13.5vw, 14rem)", lineHeight: 0.86, letterSpacing: "-0.045em" }} aria-label={WORD}>
              {WORD.split(" ").map((word, wi) => (
                <span key={wi} className="block">
                  {word.split("").map((ch, i) => (
                    <span key={i} className="rise-mask">
                      <span style={{ animationDelay: `${0.12 + (wi * 6 + i) * 0.045}s`, color: wi === 1 ? "var(--signal)" : undefined }}>{ch}</span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl font-sans text-lg leading-snug text-[#c9dccf] sm:text-2xl">
                Every useful AI tool, categorized and vetted in one place. Find your fit in three minutes, or browse the whole grid.
              </p>
              <div className="mono flex flex-wrap gap-x-10 gap-y-4 text-[#8fa58c]">
                <Stat value={toolCount} label="tools" />
                <Stat value={categoryCount} label="categories" />
                <Stat value={7} label="day refresh" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#directory" className="inline-flex h-12 items-center gap-2 bg-signal px-6 font-display text-sm tracking-tight text-ink transition-transform hover:-translate-y-0.5">
                Browse the directory <ArrowDown className="h-4 w-4" />
              </Link>
              <Link href="/survey" className="inline-flex h-12 items-center border border-white/25 px-6 font-sans text-sm text-[#f2f5f0] transition-colors hover:border-signal hover:text-signal">
                Take the 3-minute Tool Finder
              </Link>
            </div>
          </div>
        </div>

        <div className="marquee absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[#060806]/70 py-3 backdrop-blur-sm">
          <div className="marquee-track mono text-xs tracking-[0.14em] text-[#8fa58c]">
            {[...names, ...names].map((n, i) => (
              <span key={i} className="px-6">{n.toUpperCase()}<span className="pl-6 text-signal/60">/</span></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="leading-none">
      <div className="font-display text-3xl text-[#f2f5f0] sm:text-4xl"><CountUp to={value} /></div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.18em]">{label}</div>
    </div>
  )
}
