"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

/** Counts from 0 to `to` when scrolled into view. */
export function CountUp({ to, duration = 1600, suffix = "", prefix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - p, 4)
          setV(Math.round(to * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toLocaleString()}
      {suffix}
    </span>
  )
}
