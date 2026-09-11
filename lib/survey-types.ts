export interface SurveyAnswers {
  // Demographics (optional)
  ageRange?: string
  sex?: string
  raceEthnicity?: string[]

  // AI Questions
  q1_familiarity: string
  q2_goal: string
  q3_help: string
  q4_content: string
  q5_ops: string
  q6_statement: string
  q7_tools: string[]
  q8_blocker: string
  q9_time: string
  q10_usage: string
  q11_support: string[]
  q12_price: string
}

export type AILevel = "Starter" | "Builder" | "All-Star"
export type AIPath =
  | "Content & Creative"
  | "Business Ops & Automation"
  | "Research & Decision Support"
  | "Sales & Growth"
export type ProfileType = "Rookie" | "Riser" | "Specialist" | "Strategist" | "All-Star" | "MVP"
export type Codename = "Neo" | "Oracle" | "Trinity" | "Morpheus" | "Zion" | "Agent"

export interface SurveyResults {
  level: AILevel
  path: AIPath
  profileType: ProfileType
  codename: Codename
  whereYouAre: string[]
  whatToFocus: string[]
  recommendedTools: ToolRecommendation[]
  resources: ResourceRecommendation[]
}

export interface ToolRecommendation {
  name: string
  description: string
  link: string
  isExternal?: boolean
}

export interface ResourceRecommendation {
  title: string
  type: "free" | "paid" | "community"
  description: string
  deliveryMethod?: string
}
