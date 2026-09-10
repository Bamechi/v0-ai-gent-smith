"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { BetaSignupModal } from "@/components/beta-signup-modal"
import { SignInAccessModal } from "@/components/sign-in-access-modal"

export function Header() {
  const [showBetaModal, setShowBetaModal] = useState(false)
  const [showAccessModal, setShowAccessModal] = useState(false)
  const [accessModalTitle, setAccessModalTitle] = useState("")

  const handleGatedNavClick = (title: string) => {
    setAccessModalTitle(title)
    setShowAccessModal(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#004208] shadow-sm flex items-center justify-center p-1.5">
                <Image
                  src="/favicon.png"
                  alt="AiGENT SMITH Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain invert"
                />
              </div>
              <span className="text-2xl font-black tracking-tight uppercase">
                <span className="text-black">
                  A<span className="lowercase">i</span>GENT
                </span>{" "}
                <span className="text-[#004208]">SMITH</span>
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/dictionary"
              className="text-sm font-medium text-muted-foreground hover:text-[#004208] transition-colors"
            >
              Dictionary
            </Link>
            <button
              onClick={() => handleGatedNavClick("AI Club")}
              className="text-sm font-medium text-muted-foreground hover:text-[#004208] transition-colors"
            >
              AI Club
            </button>
            <button
              onClick={() => handleGatedNavClick("Guides")}
              className="text-sm font-medium text-muted-foreground hover:text-[#004208] transition-colors"
            >
              Guides
            </button>
            <button
              onClick={() => handleGatedNavClick("Workshops")}
              className="text-sm font-medium text-muted-foreground hover:text-[#004208] transition-colors"
            >
              Workshops
            </button>
            <button
              onClick={() => handleGatedNavClick("Courses")}
              className="text-sm font-medium text-muted-foreground hover:text-[#004208] transition-colors"
            >
              Courses
            </button>
            <Link
              href="/advertise"
              className="text-sm font-medium text-muted-foreground hover:text-[#004208] transition-colors"
            >
              Advertise
            </Link>
            <Button
              size="lg"
              className="font-bold uppercase tracking-wide bg-[#004208] text-white hover:bg-[#004208]/90"
              onClick={() => setShowBetaModal(true)}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Button>
          </nav>
        </div>
      </header>

      <BetaSignupModal open={showBetaModal} onOpenChange={setShowBetaModal} />
      <SignInAccessModal open={showAccessModal} onOpenChange={setShowAccessModal} resourceTitle={accessModalTitle} />
    </>
  )
}
