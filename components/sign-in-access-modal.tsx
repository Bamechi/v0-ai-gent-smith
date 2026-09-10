"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

interface SignInAccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resourceTitle: string
}

export function SignInAccessModal({ open, onOpenChange, resourceTitle }: SignInAccessModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)

  const handleSignInClick = () => {
    setShowEmailInput(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate routing to login flow
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSubmitting(false)
    // Reset and close - in real implementation, this would route to auth
    handleClose(false)
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setShowEmailInput(false)
        setEmail("")
      }, 200)
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-8">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-[#004208]/10 flex items-center justify-center mb-6">
            <Lock className="h-6 w-6 text-[#004208]" />
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-3">Sign in to access</h2>

          <p className="text-muted-foreground text-sm mb-8">
            These resources are available to members of the AiGENT SMITH ecosystem.
          </p>

          {showEmailInput ? (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="access-email" className="text-sm text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="access-email"
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
                className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          ) : (
            <div className="w-full space-y-4">
              <Button
                onClick={handleSignInClick}
                className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white font-medium"
              >
                Sign in
              </Button>

              <button
                onClick={handleSignInClick}
                className="text-sm text-muted-foreground hover:text-[#004208] transition-colors"
              >
                Create an account
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
