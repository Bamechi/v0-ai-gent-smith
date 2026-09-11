import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"

/**
 * POST /api/admin/publish  (header: x-admin-token)
 * body: { ids: string[], action: "publish" | "reject", featured?: string }
 * Flips pending rows to published/rejected and (optionally) sets one as App of the Day.
 */
export async function POST(req: Request) {
  if (req.headers.get("x-admin-token") !== process.env.ADMIN_TOKEN || !process.env.ADMIN_TOKEN)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const { ids, action, featured } = (await req.json()) as { ids: string[]; action: "publish" | "reject"; featured?: string }
    if (!Array.isArray(ids) || !ids.length) return NextResponse.json({ error: "ids required" }, { status: 400 })
    const sb = createAdminClient()

    const status = action === "reject" ? "rejected" : "published"
    const { error } = await sb.from("ai_tools").update({ status }).in("id", ids)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    if (featured && action === "publish") {
      await sb.from("ai_tools").update({ featured_today: false }).eq("featured_today", true)
      await sb.from("ai_tools").update({ featured_today: true }).eq("id", featured)
    }
    revalidatePath("/")
    return NextResponse.json({ ok: true, updated: ids.length, status })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
