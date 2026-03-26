import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
})

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    creditsPerDay: 5,
    priceId: null,
  },
  PRO: {
    name: "Pro",
    price: 9,
    creditsPerDay: Infinity,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
  },
}

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name?: string | null
): Promise<string> {
  const { db } = await import("@/lib/db")
  const user = await db.user.findUnique({ where: { id: userId } })

  if (user?.stripeCustomerId) return user.stripeCustomerId

  const customer = await stripe.customers.create({ email, name: name ?? undefined })

  await db.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  })

  return customer.id
}
