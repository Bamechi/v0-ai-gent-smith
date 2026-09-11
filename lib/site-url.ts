const DEFAULT_SITE_URL = "https://aigentsmith.app"

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!raw) return DEFAULT_SITE_URL

  try {
    return new URL(raw).origin
  } catch {
    try {
      return new URL(`https://${raw}`).origin
    } catch {
      return DEFAULT_SITE_URL
    }
  }
}
