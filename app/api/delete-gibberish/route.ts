import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = await createClient()

    // Define the gibberish tool names to delete
    const gibberishNames = ["HT YH TYNY", "RTBRT"]

    // Delete these tools
    const { data, error } = await supabase
      .from("ai_tools")
      .delete()
      .in("app_name", gibberishNames)

    if (error) {
      console.error("[v0] Error deleting gibberish tools:", error)
      return NextResponse.json(
        { error: "Failed to delete tools" },
        { status: 500 }
      )
    }

    console.log("[v0] Successfully deleted gibberish tools")
    return NextResponse.json(
      { success: true, message: "Gibberish tools deleted" },
      { status: 200 }
    )
  } catch (err) {
    console.error("[v0] Unexpected error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
