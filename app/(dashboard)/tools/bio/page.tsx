import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { GenerateForm } from "@/components/generate-form"
import { UserCircle } from "lucide-react"

const FIELDS = [
  {
    type: "input" as const,
    name: "role",
    label: "Your title / expertise",
    placeholder: "e.g. Freelance UX Designer & Product Strategist",
  },
  {
    type: "select" as const,
    name: "platform",
    label: "Platform",
    placeholder: "Select a platform",
    options: [
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Twitter/X", label: "Twitter / X" },
      { value: "Upwork", label: "Upwork" },
      { value: "GitHub", label: "GitHub" },
    ],
  },
  {
    type: "textarea" as const,
    name: "achievements",
    label: "2–3 key achievements",
    placeholder: "e.g. Grew a SaaS product from 0 to 5k users; Shipped 12 mobile apps; Featured in Forbes",
    rows: 3,
  },
  {
    type: "select" as const,
    name: "length",
    label: "Length",
    placeholder: "Select a length",
    options: [
      { value: "short (~50 words)", label: "Short (~50 words)" },
      { value: "medium (~150 words)", label: "Medium (~150 words)" },
      { value: "long (~300 words)", label: "Long (~300 words)" },
    ],
  },
]

export default async function BioPage() {
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
          <UserCircle className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Profile Bio</h1>
          <p className="text-sm text-muted-foreground">
            Craft a compelling bio tailored to any platform.
          </p>
        </div>
      </div>

      <GenerateForm
        tool="BIO"
        fields={FIELDS}
        creditsUsed={user.creditsUsedToday}
        plan={user.subscriptionStatus}
      />
    </div>
  )
}
