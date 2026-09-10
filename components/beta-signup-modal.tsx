"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Sparkles } from "lucide-react"

interface BetaSignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BetaSignupModal({ open, onOpenChange }: BetaSignupModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call - replace with actual beta signup logic
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 200)
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-[#004208]" />
            Coming Soon
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Login functionality is not available yet. Sign up for our beta to get early access and be notified when we
            launch!
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-[#004208] mb-4" />
            <h3 className="text-lg font-semibold text-[#004208]">You're on the list!</h3>
            <p className="text-muted-foreground mt-2">We'll notify you when the beta is ready.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus-visible:ring-[#004208]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up for Beta"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
