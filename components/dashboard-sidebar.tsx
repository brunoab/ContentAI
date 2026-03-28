"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Linkedin,
  Mail,
  UserCircle,
  History,
  LogOut,
  Menu,
  X,
  Sparkles,
  CreditCard,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditBadge } from "@/components/credit-badge"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tools/linkedin", label: "LinkedIn Post", icon: Linkedin },
  { href: "/tools/email", label: "Cold Email", icon: Mail },
  { href: "/tools/bio", label: "Profile Bio", icon: UserCircle },
  { href: "/history", label: "History", icon: History },
]

interface DashboardSidebarProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  creditsUsed: number
  plan: "FREE" | "PRO"
  currentPageTitle: string
}

function NavLinks({ pathname, onClick }: { pathname: string; onClick?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

function UserFooter({
  user,
  creditsUsed,
  plan,
}: {
  user: DashboardSidebarProps["user"]
  creditsUsed: number
  plan: "FREE" | "PRO"
}) {
  const [billingLoading, setBillingLoading] = useState(false)
  const [upgradeLoading, setUpgradeLoading] = useState(false)

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.[0].toUpperCase() ?? "?"

  async function handleBillingPortal() {
    setBillingLoading(true)
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setBillingLoading(false)
    }
  }

  async function handleUpgrade() {
    setUpgradeLoading(true)
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
        return
      }
    } catch {
      // ignore
    }
    setUpgradeLoading(false)
  }

  return (
    <div className="border-t px-3 py-3 space-y-3">
      <CreditBadge creditsUsed={creditsUsed} plan={plan} />
      {plan === "FREE" && (
        <Button
          size="sm"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
          onClick={handleUpgrade}
          disabled={upgradeLoading}
        >
          <Zap className="size-3 mr-2" />
          {upgradeLoading ? "Redirecting…" : "Upgrade to Pro"}
        </Button>
      )}
      {plan === "PRO" && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-xs text-muted-foreground"
          onClick={handleBillingPortal}
          disabled={billingLoading}
        >
          <CreditCard className="size-3 mr-2" />
          {billingLoading ? "Loading…" : "Manage Billing"}
        </Button>
      )}
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          {user.image && <AvatarImage src={user.image} alt={user.name ?? ""} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          {user.name && (
            <p className="text-sm font-medium truncate">{user.name}</p>
          )}
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Sign out"
        >
          <LogOut className="size-4" />
          <span className="sr-only">Sign out</span>
        </Button>
      </div>
    </div>
  )
}

export function DashboardSidebar({
  user,
  creditsUsed,
  plan,
  currentPageTitle,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-4 py-4 border-b">
        <Sparkles className="size-5 text-primary" />
        <span className="font-semibold text-base">ContentAI</span>
      </div>
      <div className="flex-1 overflow-y-auto py-3">
        <NavLinks pathname={pathname} onClick={() => setMobileOpen(false)} />
      </div>
      <UserFooter user={user} creditsUsed={creditsUsed} plan={plan} />
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r bg-card fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile topbar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-30 flex items-center gap-3 border-b bg-background px-4 h-14">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
        <span className="font-medium text-sm">{currentPageTitle}</span>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 z-50 w-60 bg-card border-r flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                <span className="font-semibold text-base">ContentAI</span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-3">
              <NavLinks pathname={pathname} onClick={() => setMobileOpen(false)} />
            </div>
            <UserFooter user={user} creditsUsed={creditsUsed} plan={plan} />
          </aside>
        </>
      )}
    </>
  )
}

export function getPageTitle(pathname: string): string {
  const item = NAV_ITEMS.find((n) => n.href === pathname)
  return item?.label ?? "Dashboard"
}
