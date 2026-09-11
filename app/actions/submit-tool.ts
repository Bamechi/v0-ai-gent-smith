"use server"

import { createAdminClient } from "@/lib/supabase/admin"
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

/** Public submissions land as `pending`; the weekly review publishes them. */
export async function submitTool(data: SubmitToolData) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from("ai_tools").insert({
      tool_id: data.toolId.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_"),
      app_name: data.appName.trim(),
      url: data.url.trim(),
      short_description: data.shortDescription.trim(),
      category_1: data.category1 || null,
      category_2: data.category2 || null,
      category_3: data.category3 || null,
      tags: data.tags.length > 0 ? data.tags : null,
      platforms: data.platforms || null,
      promo_code: data.promoCode || null,
      featured_today: false,
      sponsored: false,
      status: "pending",
      source_name_or_link: "site-submit-form",
    })

    if (error) {
      if (error.code === "23505") return { error: "A tool with this ID already exists. Choose a different Tool ID." }
      console.error("[aigent] submit failed:", error.message)
      return { error: "The submission could not be saved. Try again." }
    }
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    console.error("[aigent] submit error:", e)
    return { error: "The submission could not be saved. Try again." }
  }
}
