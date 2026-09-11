import type React from "react"
import type { Metadata } from "next"
import { Archivo, Archivo_Black, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ResizeObserverFix } from "@/components/resize-observer-fix"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { Cursor } from "@/components/motion/cursor"
import { RevealObserver } from "@/components/motion/reveal"
import "./globals.css"

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" })
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-archivo-black", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aigentsmith.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AiGENT SMITH | The AI tools directory, updated weekly",
    template: "%s | AiGENT SMITH",
  },
  description:
    "Every useful AI tool, categorized and reviewed in one place. Browse 580+ tools, find your fit with the 3-minute AI Tool Finder, and learn the language of AI.",
  keywords: [
    "AI tools", "artificial intelligence", "AI directory", "AI applications", "machine learning tools",
    "AI chatbots", "AI image generators", "AI video tools", "AI productivity", "AI agents",
  ],
  authors: [{ name: "AiGENT SMITH" }],
  creator: "AiGENT SMITH",
  publisher: "AiGENT SMITH",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AiGENT SMITH | The AI tools directory, updated weekly",
    description: "Every useful AI tool, categorized and reviewed in one place.",
    siteName: "AiGENT SMITH",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiGENT SMITH | The AI tools directory",
    description: "Every useful AI tool, categorized and reviewed in one place.",
    creator: "@aigentsmith",
  },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
}

export const viewport = {
  themeColor: "#eef7ef",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoBlack.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased ">
        <ResizeObserverFix />
        <SmoothScroll />
        <RevealObserver />
        <Cursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
