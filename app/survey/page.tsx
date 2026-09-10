"use client"

import { useState, Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SurveyProgress } from "@/components/survey/survey-progress"
import { SurveyQuestion } from "@/components/survey/survey-question"
import { SurveyResultsPage } from "@/components/survey/survey-results"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { calculateResults } from "@/lib/survey-scoring"
import type { SurveyAnswers, SurveyResults } from "@/lib/survey-types"

const TOTAL_STEPS = 17 // 2 contact + 3 demographics + 12 AI questions

const questions = [
  // Contact Info (1-2)
  {
    id: "userName",
    question: "What's your name?",
    inputType: "text" as const,
    placeholder: "Enter your name",
    multiSelect: false,
  },
  {
    id: "userEmail",
    question: "What's your email?",
    subtitle: "We'll send your results here.",
    inputType: "email" as const,
    placeholder: "you@example.com",
    multiSelect: false,
  },
  // Demographics (3-5)
  {
    id: "ageRange",
    question: "What's your age range?",
    options: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+", "Prefer not to say"],
    subtitle: "Optional — helps us improve recommendations.",
    multiSelect: false,
  },
  {
    id: "sex",
    question: "How do you identify?",
    options: ["Male", "Female", "Prefer not to say"],
    subtitle: "Optional — helps us improve recommendations.",
    multiSelect: false,
  },
  {
    id: "raceEthnicity",
    question: "What's your race/ethnicity?",
    options: [
      "Black/African descent",
      "White",
      "Hispanic/Latino",
      "Asian",
      "Middle Eastern/North African",
      "Native/Indigenous",
      "Pacific Islander",
      "Mixed/Multi-ethnic",
      "Another/self-describe",
      "Prefer not to say",
    ],
    subtitle: "Optional — helps us improve recommendations.",
    multiSelect: true,
  },
  // AI Questions (4-15)
  {
    id: "q1_familiarity",
    question: "How familiar are you with AI right now?",
    options: ["Starter", "Builder", "All-Star"],
    multiSelect: false,
  },
  {
    id: "q2_goal",
    question: "What do you want AI to help you do most in the next 30 days?",
    options: [
      "Create content or creative assets faster",
      "Save time and simplify work",
      "Research better and make decisions faster",
      "Generate leads or increase sales",
    ],
    multiSelect: false,
  },
  {
    id: "q3_help",
    question: "Where would AI help you most this week?",
    options: [
      "Writing, editing, or creative production",
      "Automation, admin, workflows",
      "Summaries, research, planning",
      "Outreach, follow-ups, marketing & sales",
    ],
    multiSelect: false,
  },
  {
    id: "q4_content",
    question: "When it comes to content, what do you need most?",
    options: [
      "Ideas and outlines",
      "Writing better drafts faster",
      "Repurposing content into multiple formats",
      "Designing assets faster",
      "I don't create content",
    ],
    multiSelect: false,
  },
  {
    id: "q5_ops",
    question: "When it comes to work or business operations, what do you need most?",
    options: [
      "Organizing tasks and priorities",
      "Automating repetitive admin",
      "Building simple workflows",
      "Creating SOPs or internal docs",
      "Ops isn't my focus",
    ],
    multiSelect: false,
  },
  {
    id: "q6_statement",
    question: "Which statement feels most true?",
    options: [
      "I need better research and synthesis to make decisions",
      "I need a system to generate leads and follow up",
      "I need both",
      "Neither",
    ],
    multiSelect: false,
  },
  {
    id: "q7_tools",
    question: "Which AI tools do you currently use?",
    options: [
      "ChatGPT / Claude / Gemini",
      "Notion AI / Copilot / Google Workspace AI",
      "Canva or image tools",
      "Zapier / Make / automations",
      "Perplexity / research tools",
      "None yet",
    ],
    multiSelect: true,
  },
  {
    id: "q8_blocker",
    question: "What's holding you back most right now?",
    options: [
      "Too many tools / don't know what to pick",
      "Inconsistent results",
      "Too technical",
      "No system or workflow",
      "Don't trust accuracy",
    ],
    multiSelect: false,
  },
  {
    id: "q9_time",
    question: "Realistically, how much time can you spend weekly learning AI?",
    options: ["Less than 30 minutes", "30–60 minutes", "1–3 hours", "3+ hours"],
    multiSelect: false,
  },
  {
    id: "q10_usage",
    question: "How do you actually use AI today?",
    options: ["Mostly experimenting", "Small tasks only", "Real deliverables weekly", "Built into workflows/systems"],
    multiSelect: false,
  },
  {
    id: "q11_support",
    question: "What kind of support do you want from AiGENT SMITH?",
    options: [
      "Curated tool recommendations",
      "Step-by-step guides",
      "Workshops / masterclasses",
      "Templates & workflows",
      "Join a community (AI Club)",
    ],
    multiSelect: true,
  },
  {
    id: "q12_price",
    question: "What would you realistically pay for something that saves you hours?",
    options: ["$0 (free only)", "$9–$29", "$30–$99", "$100+"],
    multiSelect: false,
  },
]

function SurveyContent() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Partial<SurveyAnswers>>({
    q7_tools: [],
    q11_support: [],
    raceEthnicity: [],
  })
  const [results, setResults] = useState<SurveyResults | null>(null)

  const currentQuestion = questions[currentStep - 1]

  const handleSelect = (value: string) => {
    const questionId = currentQuestion.id as keyof SurveyAnswers

    if (currentQuestion.multiSelect) {
      const currentArray = (answers[questionId] as string[]) || []
      if (currentArray.includes(value)) {
        setAnswers({
          ...answers,
          [questionId]: currentArray.filter((v) => v !== value),
        })
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...currentArray, value],
        })
      }
    } else {
      setAnswers({
        ...answers,
        [questionId]: value,
      })
    }
  }

  const canProceed = () => {
    const questionId = currentQuestion.id as keyof SurveyAnswers
    const answer = answers[questionId]

    // Name and Email are required (steps 1-2)
    if (currentStep <= 2) {
      return typeof answer === "string" && answer.trim().length > 0
    }

    // Demographics are optional (steps 3-5)
    if (currentStep >= 3 && currentStep <= 5) return true

    if (currentQuestion.multiSelect) {
      return Array.isArray(answer) && answer.length > 0
    }
    return !!answer
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate results
      const calculatedResults = calculateResults(answers as SurveyAnswers)
      setResults(calculatedResults)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    // Only for demographics (steps 3-5)
    if (currentStep >= 3 && currentStep <= 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  if (results) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <SurveyResultsPage results={results} answers={answers} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-8">
          <SurveyProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          <div className="min-h-[400px] flex items-center justify-center">
            <SurveyQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              selected={
                currentQuestion.multiSelect
                  ? (answers[currentQuestion.id as keyof SurveyAnswers] as string[]) || []
                  : (answers[currentQuestion.id as keyof SurveyAnswers] as string) || ""
              }
              onSelect={handleSelect}
              multiSelect={currentQuestion.multiSelect}
              subtitle={currentQuestion.subtitle}
              inputType={currentQuestion.inputType}
              placeholder={currentQuestion.placeholder}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1} className="text-muted-foreground">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>

            <div className="flex gap-2">
              {currentStep >= 3 && currentStep <= 5 && (
                <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed() && currentStep > 3}
                className="bg-[#004208] hover:bg-[#004208]/90"
              >
                {currentStep === TOTAL_STEPS ? "See My Results" : "Next"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function SurveyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SurveyContent />
    </Suspense>
  )
}
