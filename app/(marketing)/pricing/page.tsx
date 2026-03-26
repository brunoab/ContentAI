import Link from "next/link"
import { Check, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UpgradeButton } from "@/components/upgrade-button"

const FREE_FEATURES = [
  "5 AI generations per day",
  "LinkedIn Post generator",
  "Cold Email generator",
  "Profile Bio generator",
]

const PRO_FEATURES = [
  "Unlimited AI generations",
  "LinkedIn Post generator",
  "Cold Email generator",
  "Profile Bio generator",
  "Priority generation speed",
  "Full generation history",
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {/* Free plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-xl">Free</CardTitle>
              <CardDescription>Perfect for trying out ContentAI</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-2">
                {FREE_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" render={<Link href="/register" />} nativeButton={false}>
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Pro plan */}
          <Card className="relative border-primary ring-1 ring-primary/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-3">Most Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription>For professionals who need more</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-2">
                {PRO_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <UpgradeButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
