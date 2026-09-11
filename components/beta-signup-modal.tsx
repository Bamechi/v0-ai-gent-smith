"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ArrowUpRight, Check } from "lucide-react"

interface BetaSignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ZIION_URL = "https://ziion.io/nations/cnfdnt"
const CNFDNT_URL = "https://cnfdnt.co"
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwSKYxDrpGmqWP3zzitViv6NYe-7YwlnF6v92QR9g--U2u6oz64CpQdFrXSbgzPM8No/exec"

/** "Log in" entry point — same Ziion/CNFDNT routing as the resource gate. */
export function BetaSignupModal({ open, onOpenChange }: BetaSignupModalProps) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "done">("idle")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState("sending")
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "login", email }),
      })
    } catch {}
    setState("done")
  }

  const close = (o: boolean) => {
    if (!o) setTimeout(() => { setState("idle"); setEmail("") }, 200)
    onOpenChange(o)
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-lg overflow-hidden border-0 bg-ink p-0 text-[#f2f5f0] sm:rounded-2xl">
        <div className="grid-bg-dark p-7 sm:p-9">
          <div className="mono mb-4 flex items-center gap-2 text-[11px] tracking-[0.18em] text-[#8fa58c]">
            <span className="pulse-signal inline-block h-1.5 w-1.5 rounded-full bg-signal" /> AIGENT SMITH ACCESS
          </div>
          <DialogTitle className="font-display text-3xl leading-[0.95] tracking-tight">Sign in with Ziion</DialogTitle>
          <p className="mono-description mt-4 text-[#c9dccf]">
            Nation members of CNFDNT on Ziion get full access to the resources of AiGENT SMITH. Join Ziion for weekly AI
            trainings and to be part of the community. Visit CNFDNT.CO for more.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a href={ZIION_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-signal font-display text-sm text-ink transition-transform hover:-translate-y-0.5">
              Join CNFDNT on Ziion <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={CNFDNT_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/25 px-5 font-sans text-sm transition-colors hover:border-signal hover:text-signal">
              CNFDNT.CO
            </a>
          </div>

          <div className="mt-7 border-t border-white/10 pt-6">
            {state === "done" ? (
              <div className="flex items-center gap-2 font-display text-sm text-signal">
                <Check className="h-4 w-4" /> You're in the system.
              </div>
            ) : (
              <>
                <p className="mono mb-2 text-[11px] tracking-[0.16em] text-[#8fa58c]">SIGN IN WITH EMAIL</p>
                <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                    className="h-11 flex-1 border border-white/15 bg-white/5 px-4 font-sans text-sm text-[#f2f5f0] placeholder:text-[#8fa58c] focus:border-signal focus:outline-none" />
                  <button disabled={state === "sending"}
                    className="h-11 bg-white px-5 font-display text-sm text-ink transition-colors hover:bg-signal disabled:opacity-60">
                    {state === "sending" ? "..." : "Enter"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
