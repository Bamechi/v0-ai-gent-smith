"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, Sparkles } from "lucide-react"

interface BetaSignupProps {
  isClubSignup?: boolean
}

export function BetaSignup({ isClubSignup = false }: BetaSignupProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwSKYxDrpGmqWP3zzitViv6NYe-7YwlnF6v92QR9g--U2u6oz64CpQdFrXSbgzPM8No/exec"

    try {
      // POST to Google Apps Script with exact keys: name, email
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      // With no-cors mode, we can't read the response but assume success if no error thrown
      setStatus("success")
      setMessage("You're on the list!")
      setName("")
      setEmail("")
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="rounded-xl border-2 border-[#004208]/20 bg-gradient-to-br from-[#f0f9f0] to-[#e8f5e9] p-8 md:p-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#004208]" />
          <p className="text-sm uppercase tracking-widest text-[#004208]/70 font-semibold">
            {isClubSignup ? "AI Club" : "Beta Access"}
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          {isClubSignup ? "Join the community" : "Get early access to new features"}
        </h2>
        <p className="text-muted-foreground text-sm max-w-md">
          Be the first to try new tools and features before they launch.
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-[#004208] bg-[#004208]/10 px-4 py-3 rounded-lg">
            <Check className="w-5 h-5" />
            <span className="font-semibold">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-2 mt-2">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 text-sm bg-white border-[#004208]/20 text-black placeholder:text-gray-400 focus:border-[#004208] rounded-lg"
              disabled={status === "loading"}
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 text-sm bg-white border-[#004208]/20 text-black placeholder:text-gray-400 focus:border-[#004208] rounded-lg"
              disabled={status === "loading"}
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="h-11 px-6 font-semibold text-sm bg-[#004208] text-white hover:bg-[#004208]/90 rounded-lg whitespace-nowrap"
            >
              {status === "loading" ? "..." : (
                <>
                  Join <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  )
}
