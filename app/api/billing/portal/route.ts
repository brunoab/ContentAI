import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({ where: { id: session.user.id } })
    if (!user?.stripeCustomerId) {
      return NextResponse.json({ error: "No subscription found" }, { status: 400 })
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error("Portal error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
