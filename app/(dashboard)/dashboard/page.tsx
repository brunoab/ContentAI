import { redirect } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, UserCircle, Zap, BarChart2, Infinity, Clock } from "lucide-react"
import { UpgradeButton } from "@/components/upgrade-button"
import { DashboardUpgradedToast } from "@/components/dashboard-upgraded-toast"
import { GenerationsDonut } from "@/components/generations-donut"

const TOOLS = [
  {
    href: "/tools/linkedin",
    icon: Linkedin,
    title: "LinkedIn Post",
    description: "Generate engaging professional posts for your LinkedIn feed.",
  },
  {
    href: "/tools/email",
    icon: Mail,
    title: "Cold Email",
    description: "Write personalised outreach emails that get replies.",
  },
  {
    href: "/tools/bio",
    icon: UserCircle,
    title: "Profile Bio",
    description: "Craft a compelling bio tailored to any platform.",
  },
]

const TOOL_LABELS: Record<string, string> = {
  LINKEDIN: "LinkedIn",
  EMAIL: "Email",
  BIO: "Bio",
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const userQuery = db.user.findUnique({
    where: { id: session.user.id },
    select: {
      creditsUsedToday: true,
      subscriptionStatus: true,
      _count: { select: { generations: true } },
    },
  })
  const totalQuery = db.generation.count({ where: { userId: session.user.id } })
  const recentQuery = db.generation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, tool: true, result: true, createdAt: true },
  })
  const byToolQuery = db.generation.groupBy({
    by: ["tool"],
    where: { userId: session.user.id },
    _count: { tool: true },
  })

  const [user, totalGenerations, recentGenerations, generationsByTool] = await Promise.all([
    userQuery, totalQuery, recentQuery, byToolQuery,
  ])

  if (!user) redirect("/login")

  const isPro = user.subscriptionStatus === "PRO"
  const creditsRemaining = Math.max(0, 5 - user.creditsUsedToday)

  const toolColorMap: Record<string, string> = {
    LINKEDIN: "var(--chart-1)",
    EMAIL: "var(--chart-2)",
    BIO: "var(--chart-3)",
  }
  const donutData = generationsByTool.map((g) => ({
    type: g.tool.toLowerCase(),
    count: g._count.tool,
    fill: toolColorMap[g.tool] ?? "var(--chart-4)",
  }))

  return (
    <div className="space-y-8 max-w-5xl">
      <Suspense>
        <DashboardUpgradedToast />
      </Suspense>

      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back — here&apos;s your overview.
        </p>
      </div>

      {!isPro && (
        <div className="flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Zap className="size-4 text-amber-500 shrink-0" />
            <span>
              You&apos;re on the <strong>Free plan</strong> — {creditsRemaining} generation
              {creditsRemaining !== 1 ? "s" : ""} left today.
            </span>
          </div>
          <UpgradeButton className="shrink-0 h-8 text-xs px-3" />
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="h-[124px]">
          <CardHeader>
            <CardDescription>Generations today</CardDescription>
            <CardTitle className="text-3xl font-bold">{user.creditsUsedToday}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="size-3" />
              {isPro ? "Unlimited plan" : `${creditsRemaining} left`}
            </div>
          </CardContent>
        </Card>

        <Card className="h-[124px]">
          <CardHeader>
            <CardDescription>Current plan</CardDescription>
            <CardTitle>
              {isPro ? (
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-base px-3 py-0.5">
                  PRO
                </Badge>
              ) : (
                <Badge variant="outline" className="text-base px-3 py-0.5">
                  FREE
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {isPro ? "Billed monthly" : "5 credits/day"}
            </div>
          </CardContent>
        </Card>

        <Card className="h-[124px]">
          <CardHeader>
            <CardDescription>Credits remaining</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center gap-1">
              {isPro ? <Infinity className="size-7" /> : creditsRemaining}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {isPro ? "No daily limit" : "Resets at midnight UTC"}
            </div>
          </CardContent>
        </Card>

        <Card className="h-[124px] flex items-center justify-center overflow-hidden p-0">
          <div className="w-[110px] h-[110px] shrink-0">
            <GenerationsDonut data={donutData} total={totalGenerations} />
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-base font-semibold mb-3">Quick actions</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {TOOLS.map(({ href, icon: Icon, title, description }) => (
            <Link key={href} href={href}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-md hover:ring-primary/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </div>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent generations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Recent generations</h2>
          <Button variant="ghost" size="sm" render={<Link href="/history" />} nativeButton={false}>
            View all
          </Button>
        </div>

        {recentGenerations.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground text-sm">
              No generations yet. Pick a tool above to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentGenerations.map((gen) => (
              <Card key={gen.id} size="sm">
                <CardContent className="flex items-center gap-3 py-3">
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {TOOL_LABELS[gen.tool] ?? gen.tool}
                  </Badge>
                  <p className="flex-1 truncate text-sm text-muted-foreground">
                    {gen.result.slice(0, 80)}…
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="size-3" />
                    {formatDate(gen.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
