"use client"

import { useEffect } from "react"

/**
 * One observer for every `.reveal` / `.reveal-stagger` element on the page.
 * Adds `.is-in` once, when the element enters the viewport.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    )
    const scan = () => document.querySelectorAll(".reveal:not(.is-in), .reveal-stagger:not(.is-in)").forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return null
}
