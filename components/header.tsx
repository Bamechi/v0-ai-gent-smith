"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { BetaSignupModal } from "@/components/beta-signup-modal"
import { SignInAccessModal } from "@/components/sign-in-access-modal"

const GATED = ["AI Club", "Guides", "Workshops", "Courses"]

export function Header() {
  const [showBeta, setShowBeta] = useState(false)
  const [showAccess, setShowAccess] = useState(false)
  const [accessTitle, setAccessTitle] = useState("")
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const inner = usePathname() !== "/"

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  const gate = (t: string) => { setAccessTitle(t); setShowAccess(true); setMenu(false) }
  const solid = scrolled || menu || inner
  const link = "font-sans text-sm text-ink-soft transition-colors hover:text-green"

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-2.5" aria-label="AiGENT SMITH home">
            <Image src="/logo-mark.png" alt="AiGENT SMITH" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-display text-lg tracking-tight text-ink">
              A<span className="lowercase">i</span>GENT <span className="text-green">SMITH</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/dictionary" className={link}>Dictionary</Link>
            {GATED.map((g) => <button key={g} onClick={() => gate(g)} className={link}>{g}</button>)}
            <Link href="/advertise" className={link}>Advertise</Link>
            <button onClick={() => setShowBeta(true)} className="inline-flex h-9 items-center rounded-lg bg-ink px-4 font-display text-xs text-white transition-colors hover:bg-green">
              Log in
            </button>
          </nav>

          <button className="text-ink md:hidden" onClick={() => setMenu(v => !v)} aria-label="Menu">
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menu && (
          <div className="border-t border-line px-5 pb-6 pt-2 md:hidden">
            <div className="flex flex-col gap-4 py-4">
              <Link href="/dictionary" className={link} onClick={() => setMenu(false)}>Dictionary</Link>
              {GATED.map((g) => <button key={g} onClick={() => gate(g)} className={`${link} text-left`}>{g}</button>)}
              <Link href="/advertise" className={link} onClick={() => setMenu(false)}>Advertise</Link>
              <button onClick={() => { setShowBeta(true); setMenu(false) }} className="inline-flex h-11 items-center justify-center rounded-lg bg-ink font-display text-sm text-white">Log in</button>
            </div>
          </div>
        )}
      </header>

      <BetaSignupModal open={showBeta} onOpenChange={setShowBeta} />
      <SignInAccessModal open={showAccess} onOpenChange={setShowAccess} resourceTitle={accessTitle} />
    </>
  )
}
