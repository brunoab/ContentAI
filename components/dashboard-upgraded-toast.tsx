"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"

export function DashboardUpgradedToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (searchParams.get("upgraded") === "true") {
      toast.success("Welcome to Pro! Enjoy unlimited generations.")
      // Clean up the query param without a full reload
      router.replace(pathname)
    }
  }, [searchParams, router, pathname])

  return null
}
