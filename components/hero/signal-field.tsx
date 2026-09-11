"use client"

import { useEffect, useRef } from "react"

/**
 * SignalField — animated Matrix grid on <canvas> for the dark hero.
 * Scroll progress pushes the camera forward; pointer tilts the horizon.
 * Zero assets. Auto-replaced by <ScrollScrub/> when Higgsfield frames exist.
 */
export function SignalField({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0, h = 0, dpr = 1, raf = 0, mx = 0, my = 0, tmx = 0, tmy = 0
    const COLS = 60, ROWS = 36

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const onMove = (e: PointerEvent) => { tmx = (e.clientX / window.innerWidth - 0.5) * 2; tmy = (e.clientY / window.innerHeight - 0.5) * 2 }

    const draw = (t: number) => {
      const time = reduced ? 0 : t * 0.00045
      const p = progressRef.current
      mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04
      ctx.clearRect(0, 0, w, h)
      const horizon = h * (0.4 + my * 0.03)
      const fov = w * 0.9
      const camZ = p * 26
      const spread = w * 0.055
      const pts: { x: number; y: number; a: number }[][] = []
      for (let r = 0; r < ROWS; r++) {
        const row: { x: number; y: number; a: number }[] = []
        const z = r + 1.2 + (camZ % 1)
        for (let c = 0; c < COLS; c++) {
          const gx = (c - COLS / 2) * spread
          const worldZ = r + Math.floor(camZ)
          const wave = Math.sin(gx * 0.012 + time * 2 + worldZ * 0.35) * 24 + Math.cos(worldZ * 0.55 - time * 1.4) * 16 + Math.sin((gx + worldZ * 40) * 0.006) * 32
          const gy = 130 + wave
          const scale = fov / (fov + z * 140)
          const x = w / 2 + (gx + mx * 120) * scale
          const y = horizon + gy * scale
          row.push({ x, y, a: Math.max(0, 1 - z / (ROWS + 1)) })
        }
        pts.push(row)
      }
      ctx.lineWidth = 1
      for (let r = 0; r < ROWS; r++) {
        const a = pts[r][0].a
        ctx.strokeStyle = `rgba(0,255,65,${0.05 + a * 0.3})`
        ctx.beginPath()
        for (let c = 0; c < COLS; c++) { const pt = pts[r][c]; c === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y) }
        ctx.stroke()
      }
      for (let c = 0; c < COLS; c += 2) {
        ctx.strokeStyle = "rgba(120,220,150,0.10)"
        ctx.beginPath()
        for (let r = 0; r < ROWS; r++) { const pt = pts[r][c]; r === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y) }
        ctx.stroke()
      }
      for (let r = 0; r < 10; r++) for (let c = 0; c < COLS; c += 2) {
        const pt = pts[r][c]
        ctx.fillStyle = `rgba(0,255,65,${0.35 + pt.a * 0.5})`
        ctx.fillRect(pt.x - 1, pt.y - 1, 2, 2)
      }
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, "rgba(6,8,6,0.9)"); g.addColorStop(0.42, "rgba(6,8,6,0)"); g.addColorStop(1, "rgba(6,8,6,0.96)")
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
      raf = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove) }
  }, [progressRef])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
}
