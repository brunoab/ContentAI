import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.customer && session.subscription) {
          await db.user.updateMany({
            where: { stripeCustomerId: session.customer as string },
            data: {
              subscriptionId: session.subscription as string,
              subscriptionStatus: "PRO",
            },
          })
        }
        break
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const isActive = ["active", "trialing"].includes(subscription.status)
        await db.user.updateMany({
          where: { stripeCustomerId: subscription.customer as string },
          data: {
            subscriptionStatus: isActive ? "PRO" : "FREE",
            subscriptionId: isActive ? subscription.id : null,
          },
        })
        break
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await db.user.updateMany({
          where: { stripeCustomerId: subscription.customer as string },
          data: { subscriptionStatus: "FREE", subscriptionId: null },
        })
        break
      }
    }
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
