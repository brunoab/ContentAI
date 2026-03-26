"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreditBadge } from "@/components/credit-badge"
import { UpgradeModal } from "@/components/upgrade-modal"
import { Loader2, Copy, Check, Sparkles } from "lucide-react"

export type ToolType = "LINKEDIN" | "EMAIL" | "BIO"

interface BaseField {
  name: string
  label: string
  placeholder?: string
}

interface TextareaField extends BaseField {
  type: "textarea"
  rows?: number
}

interface InputField extends BaseField {
  type: "input"
}

interface SelectField extends BaseField {
  type: "select"
  options: { value: string; label: string }[]
}

interface SwitchField extends BaseField {
  type: "switch"
}

export type Field = TextareaField | InputField | SelectField | SwitchField

interface GenerateFormProps {
  tool: ToolType
  fields: Field[]
  creditsUsed: number
  plan: "FREE" | "PRO"
}

function buildPrompt(fields: Field[], values: Record<string, string | boolean>): string {
  return fields
    .map((field) => {
      const value = values[field.name]
      if (value === undefined || value === "" || value === false) return null
      if (field.type === "switch") {
        return value ? `Include hashtags: yes` : null
      }
      return `${field.label}: ${value}`
    })
    .filter(Boolean)
    .join("\n")
}

export function GenerateForm({ tool, fields, creditsUsed, plan }: GenerateFormProps) {
  const [values, setValues] = useState<Record<string, string | boolean>>({})
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setValue = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerate = async () => {
    const prompt = buildPrompt(fields, values)
    if (!prompt.trim()) return

    setLoading(true)
    setResult("")
    setError(null)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, prompt }),
      })

      if (res.status === 429) {
        setUpgradeOpen(true)
        return
      }

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? "Generation failed")
      }

      setResult(data.result)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Credit badge */}
      <div className="flex justify-end">
        <CreditBadge creditsUsed={creditsUsed} plan={plan} />
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <Label htmlFor={field.name}>{field.label}</Label>

            {field.type === "textarea" && (
              <Textarea
                id={field.name}
                placeholder={field.placeholder}
                rows={field.rows ?? 3}
                value={(values[field.name] as string) ?? ""}
                onChange={(e) => setValue(field.name, e.target.value)}
              />
            )}

            {field.type === "input" && (
              <Input
                id={field.name}
                placeholder={field.placeholder}
                value={(values[field.name] as string) ?? ""}
                onChange={(e) => setValue(field.name, e.target.value)}
              />
            )}

            {field.type === "select" && (
              <Select
                value={(values[field.name] as string) ?? ""}
                onValueChange={(val: string | null) => setValue(field.name, val ?? "")}
              >
                <SelectTrigger id={field.name} className="w-full" size="default">
                  <SelectValue placeholder={field.placeholder ?? "Select…"} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field.type === "switch" && (
              <div className="flex items-center gap-2">
                <button
                  id={field.name}
                  type="button"
                  role="switch"
                  aria-checked={(values[field.name] as boolean) ?? false}
                  onClick={() => setValue(field.name, !((values[field.name] as boolean) ?? false))}
                  className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:bg-primary bg-input"
                >
                  <span
                    className="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform aria-[checked=true]:translate-x-4 translate-x-0"
                    aria-checked={(values[field.name] as boolean) ?? false}
                    style={{
                      transform: (values[field.name] as boolean)
                        ? "translateX(16px)"
                        : "translateX(0)",
                    }}
                  />
                </button>
                <span className="text-sm text-muted-foreground">{field.placeholder}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Generate button */}
      <Button onClick={handleGenerate} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Generate
          </>
        )}
      </Button>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="relative rounded-lg border bg-muted/40 p-4">
          <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">{result}</pre>
          <Button
            size="sm"
            variant="outline"
            className="absolute right-3 top-3"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="size-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}

      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} />
    </div>
  )
}
