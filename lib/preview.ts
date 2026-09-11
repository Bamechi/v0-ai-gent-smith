/**
 * Preview resolution for a tool's detail view.
 * Order: curated preview_image_url → the site's own og:image (via /api/preview)
 * → live screenshot service → branded fallback plate (<ToolPreview/>).
 */
export function screenshotUrl(siteUrl: string, width = 1200, height = 675) {
  // WordPress mShots is free + unauthenticated; good enough for modal-only previews.
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(siteUrl)}?w=${width}&h=${height}`
}

export function hostOf(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, "") } catch { return url }
}

export function initialsOf(name: string) {
  const parts = name.trim().split(/[\s\-_]+/).filter(Boolean)
  return (parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase()
}
