import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { GenerateForm } from "@/components/generate-form"
import { Linkedin } from "lucide-react"

const FIELDS = [
  {
    type: "textarea" as const,
    name: "topic",
    label: "What's your post about?",
    placeholder: "e.g. A lesson I learned from a failed project…",
    rows: 3,
  },
  {
    type: "select" as const,
    name: "tone",
    label: "Tone",
    placeholder: "Select a tone",
    options: [
      { value: "professional", label: "Professional" },
      { value: "inspirational", label: "Inspirational" },
      { value: "storytelling", label: "Storytelling" },
      { value: "contrarian", label: "Contrarian" },
    ],
  },
  {
    type: "select" as const,
    name: "length",
    label: "Length",
    placeholder: "Select a length",
    options: [
      { value: "short (~150 words)", label: "Short (~150 words)" },
      { value: "medium (~300 words)", label: "Medium (~300 words)" },
      { value: "long (~500 words)", label: "Long (~500 words)" },
    ],
  },
  {
    type: "switch" as const,
    name: "hashtags",
    label: "Include hashtags",
    placeholder: "Add relevant hashtags at the end",
  },
]

export default async function LinkedInPage() {
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
          <Linkedin className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">LinkedIn Post</h1>
          <p className="text-sm text-muted-foreground">
            Generate an engaging professional post for your LinkedIn feed.
          </p>
        </div>
      </div>

      <GenerateForm
        tool="LINKEDIN"
        fields={FIELDS}
        creditsUsed={user.creditsUsedToday}
        plan={user.subscriptionStatus}
      />
    </div>
  )
}
