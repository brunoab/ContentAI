"use client"

import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Zap, Check } from "lucide-react"

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PRO_FEATURES = [
  "Unlimited AI generations per day",
  "Priority generation speed",
  "Access to all 3 content tools",
  "Full generation history",
]

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex size-8 items-center justify-center rounded-full bg-amber-500/10">
              <Zap className="size-4 text-amber-500" />
            </div>
            <DialogTitle>You&apos;ve reached your daily limit</DialogTitle>
          </div>
          <DialogDescription>
            You&apos;ve used all 5 free credits for today. Upgrade to Pro for unlimited generations.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2 py-2">
          {PRO_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="size-4 shrink-0 text-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />} nativeButton={false}>
            Maybe later
          </DialogClose>
          <Button render={<Link href="/pricing" onClick={() => onOpenChange(false)} />} nativeButton={false}>
            <Zap className="size-4" />
            Upgrade to Pro — $9/month
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
