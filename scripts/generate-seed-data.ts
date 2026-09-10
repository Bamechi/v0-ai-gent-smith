// Script to convert CSV data to SQL INSERT statements
// This will be used to create the complete seed script with all 500+ tools

import fs from "fs"
import path from "path"

interface CSVRow {
  "Tool ID": string
  "App Name": string
  URL: string
  "Short Description": string
  "Category 1": string
  "Category 2": string
  "Category 3": string
  Tags: string
  Platforms: string
  "Promo Code": string
  "Featured today": string
  Sponsored: string
  "Date Added": string
  "Last Updated": string
  "Source Name or Link": string
  "Star Rating": string
  "Review Count": string
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
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

function escapeSQLString(str: string): string {
  if (!str) return ""
  return str.replace(/'/g, "''")
}

function parseTagsArray(tagsStr: string): string {
  if (!tagsStr) return "ARRAY[]::TEXT[]"
  const tags = tagsStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
  if (tags.length === 0) return "ARRAY[]::TEXT[]"
  return `ARRAY[${tags.map((t) => `'${escapeSQLString(t)}'`).join(", ")}]`
}

async function generateSeedSQL() {
  const csvPath = path.join(
    process.cwd(),
    "user_read_only_context/text_attachments/Aigent_Smith-Jizx6-Jizx6fTPSHxRKoywvkBPbGV85ChiIh.csv",
  )
  const csvContent = fs.readFileSync(csvPath, "utf-8")
  const lines = csvContent.split("\n").filter((line) => line.trim())

  const headers = parseCSVLine(lines[0])
  console.log("[v0] CSV Headers:", headers)
  console.log("[v0] Total lines (including header):", lines.length)

  const sqlStatements: string[] = []
  let batch: string[] = []
  const BATCH_SIZE = 50

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length < 15) continue

    const toolId = escapeSQLString(values[0])
    const appName = escapeSQLString(values[1])
    const url = escapeSQLString(values[2])
    const shortDescription = escapeSQLString(values[3])
    const category1 = escapeSQLString(values[4])
    const category2 = escapeSQLString(values[5])
    const category3 = escapeSQLString(values[6])
    const tags = parseTagsArray(values[7])
    const platforms = escapeSQLString(values[8])
    const promoCode = escapeSQLString(values[9])
    const featuredToday = values[10]?.toLowerCase() === "true" ? "TRUE" : "FALSE"
    const sponsored = values[11]?.toLowerCase() === "true" ? "TRUE" : "FALSE"
    const starRating = values[15] ? Number.parseFloat(values[15]) : 0
    const reviewCount = values[16] ? Number.parseInt(values[16]) : 0

    const valueString = `  ('${toolId}', '${appName}', '${url}', '${shortDescription}', '${category1}', '${category2}', '${category3}', ${tags}, '${platforms}', '${promoCode}', ${featuredToday}, ${sponsored}, NOW(), NOW(), '', ${starRating}, ${reviewCount})`

    batch.push(valueString)

    if (batch.length >= BATCH_SIZE || i === lines.length - 1) {
      const insertStatement = `INSERT INTO public.ai_tools (tool_id, app_name, url, short_description, category_1, category_2, category_3, tags, platforms, promo_code, featured_today, sponsored, date_added, last_updated, source_name_or_link, star_rating, review_count)
VALUES
${batch.join(",\n")}
ON CONFLICT (tool_id) DO NOTHING;`

      sqlStatements.push(insertStatement)
      batch = []
    }
  }

  const fullSQL = `-- Complete seed data from CSV with ${lines.length - 1} tools
-- Generated automatically from Aigent_Smith CSV

${sqlStatements.join("\n\n")}`

  fs.writeFileSync(path.join(process.cwd(), "scripts/005_seed_all_tools.sql"), fullSQL)
  console.log("[v0] Generated seed script with", lines.length - 1, "tools")
  console.log("[v0] Output file: scripts/005_seed_all_tools.sql")
}

generateSeedSQL().catch(console.error)
