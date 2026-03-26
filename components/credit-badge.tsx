import { Badge } from "@/components/ui/badge"
import { Zap, Infinity } from "lucide-react"

interface CreditBadgeProps {
  creditsUsed: number
  plan: "FREE" | "PRO"
}

export function CreditBadge({ creditsUsed, plan }: CreditBadgeProps) {
  if (plan === "PRO") {
    return (
      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 gap-1">
        <Infinity className="size-3" />
        Unlimited
      </Badge>
    )
  }

  const remaining = Math.max(0, 5 - creditsUsed)

  return (
    <Badge variant="outline" className="gap-1">
      <Zap className="size-3" />
      {remaining} / 5 credits today
    </Badge>
  )
}
