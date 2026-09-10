import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ResizeObserverFix } from "@/components/resize-observer-fix"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000")

export const metadata: Metadata = {
  metadataBase: new URL("https://aigent-smith.com"),
  title: {
    default: "AiGENT SMITH | Discover the Best AI Tools & Applications",
    template: "%s | AiGENT SMITH",
  },
  description:
    "The ultimate directory of AI tools and applications. Discover, compare, and find the perfect AI solution for your needs. Browse 500+ AI tools across all categories.",
  keywords: [
    "AI tools",
    "artificial intelligence",
    "AI directory",
    "AI applications",
    "machine learning tools",
    "AI chatbots",
    "AI image generators",
    "AI video tools",
    "AI productivity",
  ],
  authors: [{ name: "AiGENT SMITH" }],
  creator: "AiGENT SMITH",
  publisher: "AiGENT SMITH",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AiGENT SMITH | Discover the Best AI Tools",
    description: "The ultimate directory of AI tools and applications. Discover 500+ AI tools across all categories.",
    siteName: "AiGENT SMITH",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiGENT SMITH | Discover the Best AI Tools",
    description: "The ultimate directory of AI tools and applications.",
    creator: "@aigentsmith",
  },
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <ResizeObserverFix />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
