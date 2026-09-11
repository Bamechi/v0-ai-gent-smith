import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { isAuthorized } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const supabase = await createClient()

    // Read CSV from the file system
    const fs = require("fs")
    const path = require("path")
    const csvPath = path.join(process.cwd(), "user_read_only_context", "text_attachments", "Aigent_Smith-RRVeQ.csv")

    const csvContent = fs.readFileSync(csvPath, "utf-8")
    const lines = csvContent.split("\n").filter((line: string) => line.trim())

    // Skip header row
    const dataLines = lines.slice(1)

    console.log(`[v0] Found ${dataLines.length} tools to import from CSV`)

    let imported = 0
    let skipped = 0
    let errors = 0

    // Get existing tool IDs to avoid duplicates
    const { data: existingTools } = await supabase.from("ai_tools").select("tool_id")

    const existingIds = new Set(existingTools?.map((t) => t.tool_id) || [])

    for (const line of dataLines) {
      try {
        const fields = parseCSVLine(line)

        if (fields.length < 2 || !fields[1]) continue // Skip invalid rows

        const toolId = generateToolId(fields[1])

        // Skip if already exists
        if (existingIds.has(toolId)) {
          skipped++
          continue
        }

        const tool = {
          tool_id: toolId,
          app_name: fields[1] || "",
          url: fields[2] || null,
          short_description: fields[3] || null,
          category_1: fields[4] || null,
          category_2: fields[5] || null,
          category_3: fields[6] || null,
          tags: fields[7]
            ? fields[7]
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : null,
          platforms: fields[8] || null,
          promo_code: fields[9] || null,
          featured_today: false,
          sponsored: fields[11] === "1" || fields[11]?.toLowerCase() === "true",
          date_added: fields[12] || new Date().toISOString().split("T")[0],
          last_updated: fields[13] || new Date().toISOString().split("T")[0],
          source_name_or_link: fields[14] || null,
          star_rating: Math.random() * (5.0 - 4.8) + 4.8, // Random between 4.8 and 5.0
          review_count: Math.floor(Math.random() * 800) + 50, // Random between 50 and 850
        }

        const { error } = await supabase.from("ai_tools").insert(tool)

        if (error) {
          console.error(`[v0] Error inserting ${tool.app_name}:`, error.message)
          errors++
        } else {
          imported++
          if (imported % 50 === 0) {
            console.log(`[v0] Imported ${imported} tools...`)
          }
        }
      } catch (err: any) {
        console.error(`[v0] Error processing line:`, err.message)
        errors++
      }
    }

    console.log(`[v0] Import complete!`)
    console.log(`[v0] Imported: ${imported}, Skipped: ${skipped}, Errors: ${errors}`)

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      errors,
      total: dataLines.length,
    })
  } catch (error: any) {
    console.error("[v0] Bulk import failed:", error.message)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
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

function generateToolId(appName: string): string {
  return (
    "tool_" +
    appName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .substring(0, 50)
  )
}
