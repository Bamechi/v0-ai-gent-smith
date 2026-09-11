import type {
  SurveyAnswers,
  AILevel,
  AIPath,
  ProfileType,
  Codename,
  SurveyResults,
  ToolRecommendation,
  ResourceRecommendation,
} from "./survey-types"

export function calculateResults(answers: SurveyAnswers): SurveyResults {
  const level = calculateLevel(answers)
  const path = calculatePath(answers)
  const { profileType, codename } = calculateProfile(answers, level, path)
  const whereYouAre = generateWhereYouAre(answers, level, path)
  const whatToFocus = generateWhatToFocus(answers, level, path)
  const recommendedTools = getToolRecommendations(path)
  const resources = getResourceRecommendations(path)

  return {
    level,
    path,
    profileType,
    codename,
    whereYouAre,
    whatToFocus,
    recommendedTools,
    resources,
  }
}

function calculateLevel(answers: SurveyAnswers): AILevel {
  let score = 0

  // Q1: Direct familiarity assessment
  if (answers.q1_familiarity === "All-Star") score += 3
  else if (answers.q1_familiarity === "Builder") score += 2
  else score += 1

  // Q7: Tools used (more tools = higher level)
  const toolCount = answers.q7_tools.length
  if (answers.q7_tools.includes("None yet")) score -= 1
  else if (toolCount >= 4) score += 3
  else if (toolCount >= 2) score += 2
  else score += 1

  // Q9: Time investment
  if (answers.q9_time === "3+ hours") score += 2
  else if (answers.q9_time === "1–3 hours") score += 1
  else if (answers.q9_time === "Less than 30 minutes") score -= 1

  // Q10: Current usage level
  if (answers.q10_usage === "Built into workflows/systems") score += 3
  else if (answers.q10_usage === "Real deliverables weekly") score += 2
  else if (answers.q10_usage === "Small tasks only") score += 1
  else score += 0

  // Q8: Blockers (more blockers = lower level signals)
  if (answers.q8_blocker === "Too many tools / don't know what to pick") score -= 1
  if (answers.q8_blocker === "Too technical") score -= 1

  if (score >= 9) return "All-Star"
  if (score >= 5) return "Builder"
  return "Starter"
}

function calculatePath(answers: SurveyAnswers): AIPath {
  const pathScores = {
    "Content & Creative": 0,
    "Business Ops & Automation": 0,
    "Research & Decision Support": 0,
    "Sales & Growth": 0,
  }

  // Q2: Primary goal (highest weight)
  if (answers.q2_goal.includes("content") || answers.q2_goal.includes("creative")) {
    pathScores["Content & Creative"] += 3
  } else if (answers.q2_goal.includes("time") || answers.q2_goal.includes("simplify")) {
    pathScores["Business Ops & Automation"] += 3
  } else if (answers.q2_goal.includes("Research") || answers.q2_goal.includes("decisions")) {
    pathScores["Research & Decision Support"] += 3
  } else if (answers.q2_goal.includes("leads") || answers.q2_goal.includes("sales")) {
    pathScores["Sales & Growth"] += 3
  }

  // Q3: Where AI helps most (second highest weight)
  if (answers.q3_help.includes("Writing") || answers.q3_help.includes("creative")) {
    pathScores["Content & Creative"] += 2
  } else if (answers.q3_help.includes("Automation") || answers.q3_help.includes("workflows")) {
    pathScores["Business Ops & Automation"] += 2
  } else if (answers.q3_help.includes("Summaries") || answers.q3_help.includes("research")) {
    pathScores["Research & Decision Support"] += 2
  } else if (answers.q3_help.includes("Outreach") || answers.q3_help.includes("sales")) {
    pathScores["Sales & Growth"] += 2
  }

  // Q6: Statement tiebreaker
  if (answers.q6_statement.includes("research")) {
    pathScores["Research & Decision Support"] += 1
  } else if (answers.q6_statement.includes("leads")) {
    pathScores["Sales & Growth"] += 1
  } else if (answers.q6_statement === "I need both") {
    pathScores["Research & Decision Support"] += 0.5
    pathScores["Sales & Growth"] += 0.5
  }

  // Q4: Content needs
  if (answers.q4_content !== "I don't create content") {
    pathScores["Content & Creative"] += 1
  }

  // Q5: Ops needs
  if (answers.q5_ops !== "Ops isn't my focus") {
    pathScores["Business Ops & Automation"] += 1
  }

  // Find highest scoring path
  const entries = Object.entries(pathScores) as [AIPath, number][]
  entries.sort((a, b) => b[1] - a[1])
  return entries[0][0]
}

function calculateProfile(
  answers: SurveyAnswers,
  level: AILevel,
  path: AIPath,
): { profileType: ProfileType; codename: Codename } {
  const codenameMap: Record<ProfileType, Codename> = {
    Rookie: "Neo",
    Riser: "Oracle",
    Specialist: "Trinity",
    Strategist: "Morpheus",
    "All-Star": "Zion",
    MVP: "Agent",
  }

  let profileType: ProfileType

  // MVP: All-Star + workflows/systems + Sales path or strong multi-tool usage
  if (
    level === "All-Star" &&
    answers.q10_usage === "Built into workflows/systems" &&
    (path === "Sales & Growth" || answers.q7_tools.length >= 4)
  ) {
    profileType = "MVP"
  }
  // All-Star: All-Star level + high output
  else if (level === "All-Star" && answers.q10_usage === "Real deliverables weekly") {
    profileType = "All-Star"
  }
  // Strategist: Builder/All-Star + balanced signals
  else if ((level === "Builder" || level === "All-Star") && answers.q11_support.length >= 3) {
    profileType = "Strategist"
  }
  // Specialist: Builder/All-Star + clearly dominant path signals
  else if (
    (level === "Builder" || level === "All-Star") &&
    (answers.q4_content !== "I don't create content" || answers.q5_ops !== "Ops isn't my focus")
  ) {
    profileType = "Specialist"
  }
  // Riser: Starter/Builder + limited time + wants structure
  else if (
    (level === "Starter" || level === "Builder") &&
    (answers.q9_time === "Less than 30 minutes" || answers.q9_time === "30–60 minutes")
  ) {
    profileType = "Riser"
  }
  // Rookie: Starter + None yet or mostly experimenting
  else if (
    level === "Starter" &&
    (answers.q7_tools.includes("None yet") || answers.q10_usage === "Mostly experimenting")
  ) {
    profileType = "Rookie"
  }
  // Default based on level
  else {
    if (level === "All-Star") profileType = "All-Star"
    else if (level === "Builder") profileType = "Specialist"
    else profileType = "Riser"
  }

  return { profileType, codename: codenameMap[profileType] }
}

function generateWhereYouAre(answers: SurveyAnswers, level: AILevel, path: AIPath): string[] {
  const bullets: string[] = []

  // Level-based insight
  if (level === "Starter") {
    bullets.push("You're early in your AI journey — that's a strength, not a weakness")
  } else if (level === "Builder") {
    bullets.push("You're actively using AI for real work, building momentum")
  } else {
    bullets.push("You've integrated AI into your systems and workflow")
  }

  // Path-based insight
  const pathInsights: Record<AIPath, string> = {
    "Content & Creative": "Your focus is on content creation and creative output",
    "Business Ops & Automation": "You're drawn to efficiency, systems, and automation",
    "Research & Decision Support": "You value research, synthesis, and smarter decisions",
    "Sales & Growth": "Growth and revenue are your primary drivers",
  }
  bullets.push(pathInsights[path])

  // Blocker insight
  const blockerInsights: Record<string, string> = {
    "Too many tools / don't know what to pick": "Tool overload is slowing you down — clarity is the fix",
    "Inconsistent results": "You need better prompts and processes for reliable output",
    "Too technical": "Simpler, more approachable tools will unlock your potential",
    "No system or workflow": "A structured approach will multiply your results",
    "Don't trust accuracy": "Verification workflows will build your confidence",
  }
  if (blockerInsights[answers.q8_blocker]) {
    bullets.push(blockerInsights[answers.q8_blocker])
  }

  return bullets.slice(0, 3)
}

function generateWhatToFocus(answers: SurveyAnswers, level: AILevel, path: AIPath): string[] {
  const bullets: string[] = []

  // Level-based focus
  if (level === "Starter") {
    bullets.push("Start with one tool and master it before adding more")
  } else if (level === "Builder") {
    bullets.push("Connect your tools into repeatable workflows")
  } else {
    bullets.push("Optimize your existing systems for even higher leverage")
  }

  // Path-based focus
  const pathFocus: Record<AIPath, string> = {
    "Content & Creative": "Focus on one content format first, then expand",
    "Business Ops & Automation": "Automate your most repetitive task this week",
    "Research & Decision Support": "Build a research workflow you can reuse",
    "Sales & Growth": "Set up one automated touchpoint in your sales process",
  }
  bullets.push(pathFocus[path])

  // Time-based focus
  if (answers.q9_time === "Less than 30 minutes" || answers.q9_time === "30–60 minutes") {
    bullets.push("Use your limited time on high-impact, quick wins")
  } else {
    bullets.push("Dedicate focused blocks to building AI skills")
  }

  return bullets.slice(0, 3)
}

function getToolRecommendations(path: AIPath): ToolRecommendation[] {
  const toolsByPath: Record<AIPath, ToolRecommendation[]> = {
    "Content & Creative": [
      {
        name: "Opus Clips",
        description: "Turn long videos into viral short clips automatically",
        link: "/?search=opus",
      },
      {
        name: "Submagic",
        description: "AI-powered captions and video editing for social content",
        link: "/?search=submagic",
      },
      {
        name: "Captions",
        description: "Auto-generate captions with AI styling and animations",
        link: "/?search=captions",
      },
      { name: "HeyGen", description: "Create AI avatar videos for marketing and training", link: "/?search=heygen" },
    ],
    "Business Ops & Automation": [
      { name: "Make.com", description: "Visual automation platform for connecting apps", link: "/?search=make" },
      { name: "Zapier", description: "Connect 5,000+ apps with no-code automations", link: "/?search=zapier" },
      { name: "n8n", description: "Open-source workflow automation for technical teams", link: "/?search=n8n" },
      {
        name: "Perplexity",
        description: "AI-powered research assistant for faster answers",
        link: "/?search=perplexity",
      },
    ],
    "Research & Decision Support": [
      {
        name: "Perplexity",
        description: "AI-powered research assistant for faster answers",
        link: "/?search=perplexity",
      },
      { name: "Gamma", description: "Create presentations and documents with AI", link: "/?search=gamma" },
    ],
    "Sales & Growth": [
      { name: "Whop", description: "Sell digital products, memberships, and communities", link: "/?search=whop" },
    ],
  }

  return toolsByPath[path]
}

function getResourceRecommendations(path: AIPath): ResourceRecommendation[] {
  const resourcesByPath: Record<AIPath, ResourceRecommendation[]> = {
    "Content & Creative": [
      {
        title: "30-Second Prompts to Level Up AI Visuals",
        type: "free",
        description: "Quick prompts for better AI-generated images",
        deliveryMethod: "email",
      },
      {
        title: "AI Voice Agent Blueprint",
        type: "free",
        description: "Set up automated voice agents for your business",
        deliveryMethod: "email",
      },
      {
        title: "AI Implementer Toolkit",
        type: "paid",
        description: "Complete toolkit for implementing AI in your workflow",
      },
      { title: "Content Systems for Creators", type: "paid", description: "Build repeatable content creation systems" },
      { title: "Join AI Club", type: "community", description: "Connect with other AI-powered creators" },
    ],
    "Business Ops & Automation": [
      {
        title: "AiGENT SMITH Writing & Copy Tools",
        type: "free",
        description: "Curated writing tools guide",
        deliveryMethod: "email",
      },
      {
        title: "AiGENT SMITH Prompting 101",
        type: "free",
        description: "Master the basics of AI prompting",
        deliveryMethod: "email",
      },
      {
        title: "AiGENT SMITH Chatbots & LLMs Support",
        type: "free",
        description: "Guide to chatbots and language models",
        deliveryMethod: "email",
      },
      {
        title: "15 Ways to Make Money With AI in 2026",
        type: "free",
        description: "Monetization strategies with AI",
        deliveryMethod: "email",
      },
      { title: "Executive Operator Pack", type: "paid", description: "Premium templates and workflows for operators" },
      { title: "Join AI Club", type: "community", description: "Network with automation experts" },
    ],
    "Research & Decision Support": [
      {
        title: "AiGENT SMITH Research Support",
        type: "free",
        description: "Research tools and techniques guide",
        deliveryMethod: "email",
      },
      {
        title: "AiGENT SMITH Writing & Copy Tools",
        type: "free",
        description: "Curated writing tools guide",
        deliveryMethod: "email",
      },
      {
        title: "15 Ways to Make Money With AI in 2026",
        type: "free",
        description: "Monetization strategies with AI",
        deliveryMethod: "email",
      },
      { title: "Executive Operator Pack", type: "paid", description: "Premium research and decision frameworks" },
    ],
    "Sales & Growth": [
      {
        title: "AiGENT SMITH Web Design eBook",
        type: "free",
        description: "Design high-converting pages",
        deliveryMethod: "email",
      },
      {
        title: "AiGENT SMITH Writing & Copy Tools",
        type: "free",
        description: "Sales copy tools guide",
        deliveryMethod: "email",
      },
      {
        title: "AiGENT SMITH Content Tools",
        type: "free",
        description: "Content tools for growth",
        deliveryMethod: "email",
      },
      {
        title: "15 Ways to Make Money With AI in 2026",
        type: "free",
        description: "Monetization strategies with AI",
        deliveryMethod: "email",
      },
      { title: "Executive Operator Pack", type: "paid", description: "Premium sales and growth templates" },
    ],
  }

  return resourcesByPath[path]
}
