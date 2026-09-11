import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"

/**
 * GET /api/admin/pending  (header: x-admin-token)
 * Returns Supabase rows with status='pending' (from the site submit form + sync),
 * so you can approve/reject in the site instead of the sheet.
 */
export async function GET(req: Request) {
  if (req.headers.get("x-admin-token") !== process.env.ADMIN_TOKEN || !process.env.ADMIN_TOKEN)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const sb = createAdminClient()
    const { data, error } = await sb
      .from("ai_tools")
      .select("id,tool_id,app_name,url,short_description,category_1,category_2,tags,pricing,source_name_or_link,date_added,status")
      .eq("status", "pending")
      .order("date_added", { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ count: data?.length || 0, rows: data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
