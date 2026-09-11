"use client"

import { useEffect, useRef } from "react"

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      const t = e.target as HTMLElement | null
      ring.current?.classList.toggle("is-hover", !!t?.closest("a, button, [role=button], input, select, textarea, .tool-card"))
    }
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener("mousemove", move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf) }
  }, [])
  return (<><div ref={dot} className="cursor-dot" aria-hidden /><div ref={ring} className="cursor-ring" aria-hidden /></>)
}
