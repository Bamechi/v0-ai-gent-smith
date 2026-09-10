"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface SubmitToolData {
  toolId: string
  appName: string
  url: string
  shortDescription: string
  category1: string
  category2: string
  category3: string
  tags: string[]
  platforms: string
  promoCode: string
}

export async function submitTool(data: SubmitToolData) {
  try {
    const supabase = await createClient()

    // Insert the new tool
    const { error } = await supabase.from("ai_tools").insert({
      tool_id: data.toolId,
      app_name: data.appName,
      url: data.url,
      short_description: data.shortDescription,
      category_1: data.category1 || null,
      category_2: data.category2 || null,
      category_3: data.category3 || null,
      tags: data.tags.length > 0 ? data.tags : null,
      platforms: data.platforms || null,
      promo_code: data.promoCode || null,
      featured_today: false,
      sponsored: false,
    })

    if (error) {
      console.error("[v0] Error submitting tool:", error)
      if (error.code === "23505") {
        return { error: "A tool with this ID already exists. Please use a unique Tool ID." }
      }
      return { error: "Failed to submit tool. Please try again." }
    }

    // Revalidate the home page to show the new tool
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
