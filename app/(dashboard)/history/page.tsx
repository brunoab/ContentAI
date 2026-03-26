import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, UserCircle, History } from "lucide-react"
import { HistoryRow } from "./history-row"

type ToolFilter = "ALL" | "LINKEDIN" | "EMAIL" | "BIO"

const FILTERS: { value: ToolFilter; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "EMAIL", label: "Email" },
  { value: "BIO", label: "Bio" },
]

const PAGE_SIZE = 10

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string; page?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const params = await searchParams
  const validFilters: ToolFilter[] = ["ALL", "LINKEDIN", "EMAIL", "BIO"]
  const tool: ToolFilter = validFilters.includes(params.tool as ToolFilter)
    ? (params.tool as ToolFilter)
    : "ALL"
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1)

  const where = {
    userId: session.user.id,
    ...(tool !== "ALL" ? { tool: tool as "LINKEDIN" | "EMAIL" | "BIO" } : {}),
  }

  let generations: Awaited<ReturnType<typeof db.generation.findMany>> = []
  let total = 0
  let dbError = false

  try {
    ;[generations, total] = await Promise.all([
      db.generation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      db.generation.count({ where }),
    ])
  } catch {
    dbError = true
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  function buildUrl(newTool: ToolFilter, newPage: number) {
    const p = new URLSearchParams()
    if (newTool !== "ALL") p.set("tool", newTool)
    if (newPage > 1) p.set("page", String(newPage))
    const qs = p.toString()
    return `/history${qs ? `?${qs}` : ""}`
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-muted-foreground text-sm mt-1">All your past AI generations.</p>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(({ value, label }) => (
          <Button
            key={value}
            variant={tool === value ? "default" : "outline"}
            size="sm"
            render={<Link href={buildUrl(value, 1)} />}
            nativeButton={false}
          >
            {label}
          </Button>
        ))}
      </div>

      {dbError ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-8 text-center text-sm text-destructive">
          Unable to load history. Please check your database connection and try again.
        </div>
      ) : generations.length === 0 ? (
        /* Empty state */
        <div className="rounded-lg border border-dashed border-border py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted mx-auto mb-4">
            <History className="size-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-sm">No generations yet</h3>
          <p className="text-muted-foreground text-sm mt-1 mb-4">
            {tool !== "ALL"
              ? `No ${tool.toLowerCase()} generations found.`
              : "Pick a tool below to create your first piece of content."}
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button size="sm" render={<Link href="/tools/linkedin" />} nativeButton={false}>
              <Linkedin className="size-3.5" />
              LinkedIn Post
            </Button>
            <Button variant="outline" size="sm" render={<Link href="/tools/email" />} nativeButton={false}>
              <Mail className="size-3.5" />
              Cold Email
            </Button>
            <Button variant="outline" size="sm" render={<Link href="/tools/bio" />} nativeButton={false}>
              <UserCircle className="size-3.5" />
              Profile Bio
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Generation list */}
          <div className="space-y-2">
            {generations.map((gen) => (
              <HistoryRow key={gen.id} generation={gen} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">
                Page {page} of {totalPages} · {total} total
              </span>
              <div className="flex gap-2">
                {page > 1 ? (
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={buildUrl(tool, page - 1)} />}
                    nativeButton={false}
                  >
                    Previous
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                )}
                {page < totalPages ? (
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={buildUrl(tool, page + 1)} />}
                    nativeButton={false}
                  >
                    Next
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
