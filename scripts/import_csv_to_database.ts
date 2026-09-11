import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function cleanValue(value: string): string | null {
  if (!value || value === "" || value === "0.0") return null
  return value.replace(/^["']|["']$/g, "")
}

function generateRating(): number {
  return Math.round((Math.random() * (5.0 - 4.8) + 4.8) * 10) / 10
}

async function importCSV() {
  console.log("[v0] Starting CSV import...")

  // Read the CSV file from read-only context
  const csvPath = path.join(process.cwd(), "user_read_only_context", "text_attachments", "Aigent_Smith-ZJ41C.csv")
  const csvContent = fs.readFileSync(csvPath, "utf-8")
  const lines = csvContent.split("\n").filter((line) => line.trim())

  console.log(`[v0] Found ${lines.length - 1} tools to import`)

  // Skip header
  const dataLines = lines.slice(1)

  let imported = 0
  let errors = 0

  for (const line of dataLines) {
    try {
      const fields = parseCSVLine(line)

      const tool_id = cleanValue(fields[0])
      const app_name = cleanValue(fields[1])
      const url = cleanValue(fields[2])
      const short_description = cleanValue(fields[3])
      const category_1 = cleanValue(fields[4])
      const category_2 = cleanValue(fields[5])
      const category_3 = cleanValue(fields[6])
      const tags = cleanValue(fields[7])
      const platforms = cleanValue(fields[8])
      const promo_code = cleanValue(fields[9])
      const featured_today = cleanValue(fields[10]) === "1"
      const sponsored = cleanValue(fields[11]) === "1"
      const date_added = cleanValue(fields[12]) || new Date().toISOString().split("T")[0]
      const last_updated = cleanValue(fields[13]) || new Date().toISOString().split("T")[0]
      const source_name_or_link = cleanValue(fields[14])

      // Skip if no app name
      if (!app_name) continue

      const toolData = {
        tool_id: tool_id || `tool_${app_name.toLowerCase().replace(/\s+/g, "_")}`,
        name: app_name,
        description: short_description || "No description available",
        url: url || "#",
        category_1: category_1,
        category_2: category_2,
        category_3: category_3,
        tags: tags,
        platforms: platforms,
        rating: generateRating(),
        promo_code: promo_code,
        featured_today: featured_today,
        sponsored: sponsored,
        date_added: date_added,
        last_updated: last_updated,
        source_name_or_link: source_name_or_link,
      }

      const { error } = await supabase.from("ai_tools").upsert(toolData, { onConflict: "tool_id" })

      if (error) {
        console.error(`[v0] Error importing ${app_name}:`, error.message)
        errors++
      } else {
        imported++
        if (imported % 50 === 0) {
          console.log(`[v0] Imported ${imported} tools...`)
        }
      }
    } catch (err) {
      console.error("[v0] Error processing line:", err)
      errors++
    }
  }

  console.log(`[v0] Import complete!`)
  console.log(`[v0] Successfully imported: ${imported} tools`)
  console.log(`[v0] Errors: ${errors}`)

  // Verify AVA AI is in the database
  const { data: avaAI } = await supabase.from("ai_tools").select("*").ilike("name", "%ava%").limit(5)

  console.log("[v0] Found AVA AI tools:", avaAI)
}

importCSV().catch(console.error)
