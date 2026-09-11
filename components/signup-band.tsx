"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwSKYxDrpGmqWP3zzitViv6NYe-7YwlnF6v92QR9g--U2u6oz64CpQdFrXSbgzPM8No/exec"

/** Two-up band: Tool Finder + beta list. Light glass on the paper. */
export function SignupBand() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email }) })
      setState("done")
    } catch { setState("error") }
  }

  return (
    <div className="reveal grid overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_60px_rgba(15,138,62,0.08)] md:grid-cols-2">
      <Link href="/survey" className="group relative flex flex-col justify-between gap-10 border-b border-line p-7 transition-colors hover:bg-green-tint/40 sm:p-9 md:border-b-0 md:border-r">
        <div className="mono text-[11px] tracking-[0.18em] text-ink-mute">AI TOOL FINDER · 3 MINUTES</div>
        <div>
          <h2 className="font-display text-3xl leading-[0.95] text-ink sm:text-4xl">Twelve questions. Your stack, scored.</h2>
          <p className="mt-4 max-w-md font-sans text-ink-soft">Answer how you actually work and get a profile, a codename, and the tools that fit it.</p>
        </div>
        <span className="inline-flex items-center gap-2 font-display text-sm text-green">Start the finder <ArrowUpRight className="h-4 w-4" /></span>
      </Link>

      <form onSubmit={submit} className="flex flex-col justify-between gap-10 p-7 sm:p-9">
        <div className="mono text-[11px] tracking-[0.18em] text-ink-mute">WEEKLY DROP</div>
        <div>
          <h2 className="font-display text-3xl leading-[0.95] text-ink sm:text-4xl">Get the drop before it drops.</h2>
          <p className="mt-4 max-w-md font-sans text-ink-soft">New tools every week, plus guides and workshops, sent before they go public.</p>
        </div>
        {state === "done" ? (
          <div className="flex items-center gap-2 font-display text-sm text-green"><Check className="h-4 w-4" /> You are on the list.</div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-[1fr_1.2fr_auto]">
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="h-12 rounded-lg border border-line bg-white px-4 font-sans text-sm text-ink placeholder:text-ink-mute focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20" />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="h-12 rounded-lg border border-line bg-white px-4 font-sans text-sm text-ink placeholder:text-ink-mute focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20" />
            <button disabled={state === "sending"} className="h-12 rounded-lg bg-green px-5 font-display text-sm text-white transition-colors hover:bg-green-deep disabled:opacity-60">{state === "sending" ? "Sending" : "Join"}</button>
            {state === "error" && <p className="mono text-xs text-destructive sm:col-span-3">Something failed. Try again.</p>}
          </div>
        )}
      </form>
    </div>
  )
}
