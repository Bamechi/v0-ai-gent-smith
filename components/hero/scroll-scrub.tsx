"use client"

import { useEffect, useRef, useState } from "react"

/**
 * ScrollScrub — canvas frame-sequence scrub (the "cinematic 3D" engine from the
 * High Lvl Cinematic Website Playbook). Drop ~180 JPGs into
 * /public/frames/<name>/frame_0001.jpg … and a manifest.json:
 *   { "count": 180, "pattern": "frame_{i}.jpg", "pad": 4 }
 * The frame shown is chosen by `progressRef` (0..1).
 */
export function ScrollScrub({ name, progressRef }: { name: string; progressRef: React.MutableRefObject<number> }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const frames = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    let cancelled = false
    fetch(`/frames/${name}/manifest.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((m: { count: number; pattern: string; pad: number }) => {
        const imgs: HTMLImageElement[] = []
        let loaded = 0
        for (let i = 1; i <= m.count; i++) {
          const img = new Image()
          img.src = `/frames/${name}/${m.pattern.replace("{i}", String(i).padStart(m.pad, "0"))}`
          img.onload = () => {
            loaded++
            if (loaded === 1 && !cancelled) setReady(true)
          }
          imgs.push(img)
        }
        frames.current = imgs
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [name])

  useEffect(() => {
    if (!ready) return
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!
    let raf = 0, last = -1
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      last = -1
    }
    const draw = () => {
      const list = frames.current
      const idx = Math.min(list.length - 1, Math.floor(progressRef.current * (list.length - 1)))
      const img = list[idx]
      if (idx !== last && img?.complete && img.naturalWidth) {
        last = idx
        const cw = canvas.width, ch = canvas.height
        const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
        const dw = img.naturalWidth * s, dh = img.naturalHeight * s
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
      }
      raf = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener("resize", resize)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [ready, progressRef])

  if (!ready) return null
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
}
