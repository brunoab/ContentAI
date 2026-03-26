import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export type ToolType = "LINKEDIN" | "EMAIL" | "BIO"

const systemPrompts: Record<ToolType, string> = {
  LINKEDIN: `You are an expert LinkedIn content creator. Write engaging, professional LinkedIn posts that drive engagement. Use line breaks for readability. Be authentic and avoid corporate jargon.`,
  EMAIL: `You are an expert cold email copywriter. Write concise, personalized cold emails with high open and reply rates. Keep emails under 150 words. Be direct and lead with value.`,
  BIO: `You are an expert personal branding copywriter. Write compelling professional bios that capture attention and communicate value clearly.`,
}

export async function generateContent(
  tool: ToolType,
  userPrompt: string
): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: systemPrompts[tool],
    messages: [{ role: "user", content: userPrompt }],
  })

  const block = message.content[0]
  if (block.type !== "text") throw new Error("Unexpected response type from AI")
  return block.text
}
