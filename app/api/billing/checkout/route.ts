import { auth } from "@/lib/auth"
import { stripe, getOrCreateStripeCustomer, PLANS } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const priceId = PLANS.PRO.priceId
    if (!priceId) {
      console.error("STRIPE_PRO_PRICE_ID is not configured")
      return NextResponse.json({ error: "Pricing not configured" }, { status: 500 })
    }

    const customerId = await getOrCreateStripeCustomer(
      session.user.id,
      session.user.email!,
      session.user.name
    )

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
