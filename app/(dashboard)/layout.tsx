import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      creditsUsedToday: true,
      subscriptionStatus: true,
    },
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="admin-theme min-h-screen bg-background">
      <DashboardSidebar
        user={{
          name: user.name,
          email: user.email,
          image: user.image,
        }}
        creditsUsed={user.creditsUsedToday}
        plan={user.subscriptionStatus}
        currentPageTitle="Dashboard"
      />
      {/* Main content — offset for desktop sidebar and mobile topbar */}
      <main className="lg:pl-60 pt-14 lg:pt-0 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
