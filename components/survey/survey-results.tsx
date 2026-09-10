"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, ExternalLink, Mail, Zap, Target, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import type { SurveyResults, SurveyAnswers } from "@/lib/survey-types"

interface SurveyResultsPageProps {
  results: SurveyResults
  answers?: Partial<SurveyAnswers>
}

export function SurveyResultsPage({ results }: SurveyResultsPageProps) {

  // Badge styling - use green theme with visual differentiation via outlines, fills, and shadows
  const levelStyles = {
    Starter: "bg-white border-2 border-[#004208] text-[#004208] shadow-[3px_3px_0_0_#004208]",
    Builder: "bg-[#004208] border-2 border-[#004208] text-white shadow-lg",
    "All-Star": "bg-gradient-to-r from-[#004208] to-[#006410] border-2 border-[#004208] text-white shadow-lg ring-2 ring-[#004208]/30 ring-offset-2",
  }

  const pathStyles = {
    "Content & Creative": "bg-[#004208]/10 border-2 border-dashed border-[#004208] text-[#004208]",
    "Business Ops & Automation": "bg-[#004208]/10 border-2 border-dashed border-[#004208] text-[#004208]",
    "Research & Decision Support": "bg-[#004208]/10 border-2 border-dashed border-[#004208] text-[#004208]",
    "Sales & Growth": "bg-[#004208]/10 border-2 border-dashed border-[#004208] text-[#004208]",
  }

  const profileStyles = "bg-[#004208] text-white border-2 border-[#004208] shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.2)]"

  return (
    <div className="space-y-12">
      {/* Results Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
          Your AiGENT SMITH Results
        </h1>

        {/* Badges */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className={`${levelStyles[results.level]} text-lg px-5 py-2.5 font-bold rounded-lg`}>
              {results.level}
            </Badge>
            <Badge className={`${pathStyles[results.path]} text-lg px-5 py-2.5 font-bold rounded-lg`}>
              {results.path}
            </Badge>
            <Badge className={`${profileStyles} text-lg px-5 py-2.5 font-bold rounded-lg`}>
              {results.profileType}
            </Badge>
          </div>
          {/* Codename - centered below all badges */}
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-[#004208]/60 font-semibold">Codename</span>
            <span className="text-2xl md:text-3xl font-black text-[#004208] tracking-tight">{results.codename}</span>
          </div>
        </div>
      </div>

      {/* Where You Are / What to Focus */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="border-2 border-[#004208]/30 bg-gradient-to-br from-white to-[#f0f9f0]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-black">
              <Target className="w-5 h-5 text-[#004208]" />
              Where you are right now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.whereYouAre.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#004208] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#004208]/30 bg-gradient-to-br from-white to-[#f0f9f0]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-black">
              <Zap className="w-5 h-5 text-[#004208]" />
              What to focus on next
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.whatToFocus.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-[#004208] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Tools */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black uppercase text-center text-black">Your Recommended Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {results.recommendedTools.map((tool) => (
            <Link key={tool.name} href={tool.link}>
              <Card className="h-full cursor-pointer transition-all hover:scale-[1.02] border-2 border-[#004208]/20 hover:border-[#004208]/40 bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#a5d6a7]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-[#004208]">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#1a3a1a]">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {results.recommendedTools.length < 3 && (
          <div className="text-center">
            <Link href={`/?category=${encodeURIComponent(results.path.split(" ")[0])}`}>
              <Button
                variant="outline"
                className="border-[#004208] text-[#004208] hover:bg-[#004208]/10 bg-transparent"
              >
                Browse more {results.path.toLowerCase()} tools
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Always Worth Having */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black uppercase text-center text-black">Always Worth Having in Your Stack</h2>
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <Card className="border-2 border-[#004208]/20 bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#a5d6a7]">
            <CardHeader>
              <Badge className="w-fit bg-[#004208] text-white mb-2">Featured</Badge>
              <CardTitle className="text-lg font-bold text-[#004208]">AVA AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-[#1a3a1a]">
                Automate inbound calls, lead qualification, booking, and follow-up with an AI voice agent.
              </p>
              <Button asChild className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white">
                <a href="https://callava.ai" target="_blank" rel="noopener noreferrer">
                  Explore AVA AI
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#004208]/20 bg-white">
            <CardHeader>
              <Badge className="w-fit bg-[#004208] text-white mb-2">Toolkit</Badge>
              <CardTitle className="text-lg font-bold text-black">AI Implementor Toolkit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">Strategy, apps, visuals, and writing tools to deploy AI for real outcomes. Built for builders who ship.</p>
              <Button asChild className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white">
                <a href="https://polar.sh/checkout/polar_c_2XdA6IK0W4slOxtTV8zValDVakyvpoSx0uBsl352OpN" target="_blank" rel="noopener noreferrer">
                  Get the Toolkit
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#004208]/20 bg-white">
            <CardHeader>
              <Badge className="w-fit bg-[#004208] text-white mb-2">Bundle</Badge>
              <CardTitle className="text-lg font-bold text-black">Content Systems for Creators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">Build your brand world, create better visuals, and turn content into a repeatable system with clear monetization paths.</p>
              <Button asChild className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white">
                <a href="https://polar.sh/checkout/polar_c_kQDGhG68TryVbEl2DWyHcDZzkrJrHddjLrNX30xbhjf" target="_blank" rel="noopener noreferrer">
                  Get the Bundle
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recommended Resources - Free CNFDNT.CO Products */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black uppercase text-black">Free Resources</h2>
          <p className="text-gray-600">Powered by CNFDNT.CO in collaboration with AiGENT SMITH</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* 15 Ways to Make Money With AI */}
          <Card className="border-2 border-[#004208]/20 bg-white overflow-hidden hover:border-[#004208]/40 transition-all hover:shadow-lg">
            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]">
              <img 
                src="/images/aigentsmith-15-ways-to-make-money-with-ai.png"
                alt="15 Ways to Make Money With AI"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <Badge className="w-fit bg-[#004208] text-white mb-2">Free eGuide</Badge>
              <CardTitle className="text-lg font-bold text-black">15 Ways to Make Money With AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">A practical guide for turning AI into income — fast, clean, and scalable. 15 methods with delivery, speed, and skill breakdowns.</p>
              <Button asChild className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white">
                <a href="https://buy.polar.sh/polar_cl_VdEPRWwiSXgN0FyScUOAAvfM1iDeGwP5Dh2552CdrVK" target="_blank" rel="noopener noreferrer">
                  Get Free eGuide
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* AI Alchemy Dictionary */}
          <Card className="border-2 border-[#004208]/20 bg-white overflow-hidden hover:border-[#004208]/40 transition-all hover:shadow-lg">
            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]">
              <img 
                src="/images/aigentsmith-ai-alchemy-dictionary-2026-v2.png"
                alt="AI Alchemy Dictionary 2026+"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <Badge className="w-fit bg-[#004208] text-white mb-2">Free Dictionary</Badge>
              <CardTitle className="text-lg font-bold text-black">AI Alchemy Dictionary 2026+</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">150 foundational AI terms defined clearly. No gatekeeping, no academic fluff — just language you can actually use.</p>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white">
                  <a href="https://buy.polar.sh/polar_cl_pl7gfAOXgJleu3iQm5BTyVXbhC3DA1zzrVJN12VmZpX" target="_blank" rel="noopener noreferrer">
                    Get Free eBook
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full border-[#004208] text-[#004208] hover:bg-[#004208]/10 bg-transparent">
                  <Link href="/dictionary">
                    Browse Dictionary
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Tools Suite 1.0 */}
          <Card className="border-2 border-[#004208]/20 bg-white overflow-hidden hover:border-[#004208]/40 transition-all hover:shadow-lg">
            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]">
              <img 
                src="/images/aigentsmith-ai-tools-suite-1.png"
                alt="AiGENT SMITH AI Tools Suite 1.0"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <Badge className="w-fit bg-[#004208] text-white mb-2">Free Suite</Badge>
              <CardTitle className="text-lg font-bold text-black">AI Tools Suite 1.0</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">The complete AI operating system for creators, operators, and builders. Tool maps, guides, and decision matrices.</p>
              <Button asChild className="w-full bg-[#004208] hover:bg-[#004208]/90 text-white">
                <a href="https://buy.polar.sh/polar_cl_NHiICflm0jEa8ZAl7t2QdjeKGnJ6IWAcVfDJN4G0wZN" target="_blank" rel="noopener noreferrer">
                  Get Free Suite
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-[#004208]/20">
        <Button asChild size="lg" className="bg-[#004208] hover:bg-[#004208]/90 text-white">
          <Link href="/">
            <BookOpen className="mr-2 w-5 h-5" />
            Browse All AI Tools
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-[#004208] text-[#004208] hover:bg-[#004208]/10 bg-transparent"
        >
          <Link href="#">
            <Users className="mr-2 w-5 h-5" />
            Join AI Club
          </Link>
        </Button>
      </section>
    </div>
  )
}
