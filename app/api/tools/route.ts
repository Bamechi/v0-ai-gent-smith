import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 3600

/** GET /api/tools?fields=url  — lightweight public list used by the discovery task for dedupe. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const fields = (searchParams.get("fields") || "tool_id,app_name,url").replace(/[^a-z0-9_,]/gi, "")
  const supabase = await createClient()
  const { data, error } = await supabase.from("ai_tools").select(fields).eq("status", "published")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ count: data?.length || 0, tools: data })
}
