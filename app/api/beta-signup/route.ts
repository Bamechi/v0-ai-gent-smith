import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const supabase = await createClient()

    // Create beta_signups table if it doesn't exist (handled in migration)
    // Insert the email
    const { error } = await supabase.from("beta_signups").insert([{ email, signed_up_at: new Date().toISOString() }])

    if (error) {
      console.error("[v0] Beta signup error:", error)
      // If it's a duplicate email error, still return success
      if (error.code === "23505") {
        return NextResponse.json({ message: "Already signed up!" })
      }
      return NextResponse.json({ error: "Failed to sign up" }, { status: 500 })
    }

    return NextResponse.json({ message: "Successfully signed up!" })
  } catch (error) {
    console.error("[v0] Beta signup error:", error)
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 })
  }
}
