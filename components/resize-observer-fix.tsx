"use client"

import { useEffect } from "react"

export function ResizeObserverFix() {
  useEffect(() => {
    // This error occurs when layout changes trigger continuous resize observations
    // It's a benign warning that doesn't affect functionality
    const resizeObserverError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.stopImmediatePropagation()
      }
    }

    window.addEventListener("error", resizeObserverError)

    return () => {
      window.removeEventListener("error", resizeObserverError)
    }
  }, [])

  return null
}
