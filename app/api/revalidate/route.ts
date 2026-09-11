import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAuthorized } from "@/lib/supabase/admin"

/** POST /api/revalidate — called by the weekly sync after publishing. */
export async function POST(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  revalidatePath("/")
  revalidatePath("/sitemap.xml")
  return NextResponse.json({ ok: true, revalidated: ["/"], at: new Date().toISOString() })
}
