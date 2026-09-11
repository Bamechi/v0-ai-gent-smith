export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.va) {
    window.va("track", eventName, properties)
  }
}

export function trackToolView(toolId: string, toolName: string) {
  trackEvent("tool_viewed", { toolId, toolName })
}

export function trackToolClick(toolId: string, toolName: string) {
  trackEvent("tool_clicked", { toolId, toolName })
}

export function trackSearch(query: string, resultsCount: number) {
  trackEvent("search_performed", { query, resultsCount })
}

export function trackFilterApplied(filterType: string, filterValue: string) {
  trackEvent("filter_applied", { filterType, filterValue })
}

declare global {
  interface Window {
    va?: (command: string, eventName: string, properties?: Record<string, unknown>) => void
  }
}
