"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export function UpgradeButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        router.push(data.url)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <Button className={className} onClick={handleUpgrade} disabled={loading}>
      <Zap className="size-4" />
      {loading ? "Redirecting…" : "Upgrade to Pro — $9/month"}
    </Button>
  )
}
