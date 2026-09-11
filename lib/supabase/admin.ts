import { createClient } from "@supabase/supabase-js"

/** Service-role client. Server only. Never import from a client component. */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error("Supabase service role credentials are missing")
  return createClient(url, key, { auth: { persistSession: false } })
}

/** Shared guard for admin API routes: `Authorization: Bearer <ADMIN_TOKEN>`. */
export function isAuthorized(req: Request) {
  const token = process.env.ADMIN_TOKEN
  if (!token) return false
  return req.headers.get("authorization") === `Bearer ${token}`
}
