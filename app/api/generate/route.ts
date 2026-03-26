import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { generateContent, ToolType } from "@/lib/ai"
import { NextResponse } from "next/server"

const DAILY_FREE_LIMIT = 5

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { tool, prompt } = await req.json()
    if (!tool || !prompt) {
      return NextResponse.json({ error: "Tool and prompt are required" }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Reset daily credits if new day
    const now = new Date()
    const lastReset = new Date(user.lastCreditReset)
    const isNewDay = now.toDateString() !== lastReset.toDateString()

    if (isNewDay) {
      await db.user.update({
        where: { id: user.id },
        data: { creditsUsedToday: 0, lastCreditReset: now },
      })
      user.creditsUsedToday = 0
    }

    // Check credit limit for FREE users
    if (user.subscriptionStatus === "FREE" && user.creditsUsedToday >= DAILY_FREE_LIMIT) {
      return NextResponse.json(
        { error: "Daily limit reached", code: "LIMIT_REACHED" },
        { status: 429 }
      )
    }

    // Generate content
    const result = await generateContent(tool as ToolType, prompt)

    // Save to DB and increment credits
    await db.generation.create({
      data: { userId: user.id, tool: tool as ToolType, prompt, result },
    })
    await db.user.update({
      where: { id: user.id },
      data: { creditsUsedToday: { increment: 1 } },
    })

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Generate error:", error)
    // Extract message from Anthropic API errors
    const message = error instanceof Error ? error.message : "Internal error"
    let userMessage = "AI generation failed. Please try again."
    try {
      const parsed = JSON.parse(message.replace(/^\d+ /, ""))
      userMessage = parsed?.error?.message ?? userMessage
    } catch {
      // not a JSON error
    }
    return NextResponse.json({ error: userMessage }, { status: 500 })
  }
}
