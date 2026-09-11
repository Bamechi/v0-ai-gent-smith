import type { AITool } from "./types"

/** Local development data. Enable with MOCK_TOOLS=1 to run the site without Supabase. */
const base = {
  platforms: "Web",
  promo_code: null,
  featured_today: false,
  sponsored: false,
  source_name_or_link: "mock",
  status: "published",
}
const mk = (i: number, app_name: string, url: string, short_description: string, category_1: string, category_2: string | null, tags: string[], star_rating: number | null, review_count: number | null): AITool => ({
  ...base,
  id: `mock-${i}`,
  tool_id: app_name.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
  app_name,
  url,
  short_description,
  category_1,
  category_2,
  category_3: null,
  tags,
  star_rating,
  review_count,
  date_added: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  last_updated: new Date().toISOString(),
  created_at: new Date().toISOString(),
})

export const MOCK_TOOLS: AITool[] = [
  { ...mk(0, "AVA AI", "https://callava.ai/", "AI voice agents that answer, qualify and book calls for your business around the clock.", "Automation & Agents (Workflows)", "Revenue (Sales & Commerce)", ["Voice", "Call center"], null, null), featured_today: true },
  mk(1, "Adobe Firefly", "https://firefly.adobe.com/", "AI image generation and editing designed for creator and brand workflows.", "Images (Create & Edit)", "Design & Branding", ["Automation workflows"], null, null),
  mk(2, "Suno", "https://suno.com/", "Generate full songs with vocals from a text prompt.", "Audio / Voice / Music", null, ["Music", "Generation"], null, null),
  mk(3, "Agorapulse", "https://www.agorapulse.com/", "Social media management with inbox, publishing, and reporting.", "Scheduling & Publishing", "Data & Analytics", ["Email assistant"], null, null),
  mk(4, "Airgram", "https://www.airgram.io/", "Meeting notes and transcription with AI summaries.", "Meetings (Transcription & Action Items)", "Productivity & Notes", ["Transcription", "Meeting notes"], null, null),
  mk(5, "AI Dungeon", "https://aidungeon.com/", "AI storytelling game for interactive narratives and roleplay writing.", "Writing & Copywriting", null, ["Storytelling"], null, null),
  mk(6, "Higgsfield", "https://higgsfield.ai/", "Cinematic AI video and image generation with camera-motion controls.", "Video (Create & Edit)", "Images (Create & Edit)", ["Video", "Cinematic"], null, null),
  mk(7, "Krea", "https://www.krea.ai/", "Real-time image and video generation with an agentic creative workspace.", "Images (Create & Edit)", "Video (Create & Edit)", ["Realtime"], null, null),
  mk(8, "Notion AI", "https://www.notion.so/product/ai", "Writing, summarizing and Q&A across your workspace.", "Productivity & Notes", "Writing & Copywriting", ["Docs", "Search"], null, null),
  mk(9, "ElevenLabs", "https://elevenlabs.io/", "Lifelike text-to-speech, voice cloning and dubbing.", "Audio / Voice / Music", null, ["Voice", "Dubbing"], null, null),
  mk(10, "Gamma", "https://gamma.app/", "Generate presentations, documents and websites from a prompt.", "Design & Branding", "Productivity & Notes", ["Slides"], null, null),
  mk(11, "AdCreative AI", "https://www.adcreative.ai/", "Generates ad creatives and variations optimized for performance marketing.", "Design & Branding", "Revenue (Sales & Commerce)", ["Ads creative", "Forms / intake"], null, null),
  mk(12, "Cursor", "https://cursor.com/", "AI-native code editor that writes and edits alongside you.", "Coding & Dev", null, ["IDE", "Agents"], null, null),
]
