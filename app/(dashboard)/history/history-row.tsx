"use client"

import { useState, useTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Copy, Eye, Trash2, Check } from "lucide-react"
import { deleteGeneration } from "./actions"

type ToolType = "LINKEDIN" | "EMAIL" | "BIO"

interface Generation {
  id: string
  tool: ToolType
  prompt: string
  result: string
  createdAt: Date
}

const TOOL_LABELS: Record<ToolType, string> = {
  LINKEDIN: "LinkedIn",
  EMAIL: "Email",
  BIO: "Bio",
}

const TOOL_COLORS: Record<ToolType, string> = {
  LINKEDIN: "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  EMAIL: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  BIO: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function HistoryRow({ generation }: { generation: Generation }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleCopy() {
    navigator.clipboard.writeText(generation.result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDelete() {
    if (!confirm("Delete this generation? This cannot be undone.")) return
    startTransition(async () => {
      await deleteGeneration(generation.id)
    })
  }

  return (
    <>
      <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm">
        <Badge className={`shrink-0 mt-0.5 text-xs border ${TOOL_COLORS[generation.tool]}`}>
          {TOOL_LABELS[generation.tool]}
        </Badge>
        <div className="flex-1 min-w-0 space-y-0.5">
          <p className="text-muted-foreground truncate">
            {generation.prompt.slice(0, 60)}{generation.prompt.length > 60 ? "…" : ""}
          </p>
          <p className="text-foreground/70 truncate text-xs">
            {generation.result.slice(0, 100)}{generation.result.length > 100 ? "…" : ""}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 ml-2">
          <span className="text-xs text-muted-foreground hidden sm:block">{formatDate(generation.createdAt)}</span>
          <Button variant="ghost" size="icon-sm" onClick={() => setOpen(true)}>
            <Eye className="size-3.5" />
            <span className="sr-only">View</span>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDelete}
            disabled={isPending}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-3.5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Badge className={`text-xs border ${TOOL_COLORS[generation.tool]}`}>
                {TOOL_LABELS[generation.tool]}
              </Badge>
              <span className="text-sm font-normal text-muted-foreground">
                {formatDate(generation.createdAt)}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Prompt</p>
              <p className="text-sm bg-muted/50 rounded-md px-3 py-2">{generation.prompt}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Result</p>
              <p className="text-sm bg-muted/50 rounded-md px-3 py-2 whitespace-pre-wrap leading-relaxed">
                {generation.result}
              </p>
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied!" : "Copy result"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
