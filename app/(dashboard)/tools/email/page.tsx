import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { GenerateForm } from "@/components/generate-form"
import { Mail } from "lucide-react"

const FIELDS = [
  {
    type: "input" as const,
    name: "target",
    label: "Who are you emailing?",
    placeholder: "e.g. Head of Marketing at a SaaS startup",
  },
  {
    type: "textarea" as const,
    name: "offer",
    label: "What value do you offer?",
    placeholder: "e.g. I help B2B SaaS companies reduce churn by 20% with onboarding audits",
    rows: 3,
  },
  {
    type: "select" as const,
    name: "cta",
    label: "Call to action",
    placeholder: "Select a CTA",
    options: [
      { value: "book a call", label: "Book a call" },
      { value: "reply to this email", label: "Reply to this email" },
      { value: "visit my website", label: "Visit my website" },
    ],
  },
  {
    type: "select" as const,
    name: "tone",
    label: "Tone",
    placeholder: "Select a tone",
    options: [
      { value: "formal", label: "Formal" },
      { value: "casual", label: "Casual" },
      { value: "direct", label: "Direct" },
    ],
  },
]

export default async function EmailPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { creditsUsedToday: true, subscriptionStatus: true },
  })
  if (!user) redirect("/login")

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <Mail className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Cold Email</h1>
          <p className="text-sm text-muted-foreground">
            Write a concise, personalised outreach email that gets replies.
          </p>
        </div>
      </div>

      <GenerateForm
        tool="EMAIL"
        fields={FIELDS}
        creditsUsed={user.creditsUsedToday}
        plan={user.subscriptionStatus}
      />
    </div>
  )
}
