import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const revalidate = 604800 // 7 days

/**
 * GET /api/preview?url=https://tool.example
 * Returns { image: string | null } — the site's og:image / twitter:image,
 * resolved to an absolute URL. Cached at the edge for a week.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const target = searchParams.get("url")
  if (!target || !/^https?:\/\//i.test(target)) {
    return NextResponse.json({ image: null, error: "url required" }, { status: 400 })
  }

  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 6000)
    const res = await fetch(target, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; AiGENTSmithBot/1.0; +https://aigentsmith.app)",
        accept: "text/html,application/xhtml+xml",
      },
    })
    clearTimeout(t)
    if (!res.ok) return json(null)
    const html = (await res.text()).slice(0, 200_000)
    const pick = (re: RegExp) => html.match(re)?.[1] ?? null
    const raw =
      pick(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i) ||
      pick(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      pick(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i) ||
      pick(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)
    if (!raw) return json(null)
    const abs = new URL(raw, res.url).toString()
    return json(abs)
  } catch {
    return json(null)
  }
}

function json(image: string | null) {
  return NextResponse.json(
    { image },
    { headers: { "cache-control": "public, s-maxage=604800, stale-while-revalidate=86400" } },
  )
}
