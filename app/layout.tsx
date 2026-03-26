import type { Metadata } from "next"
import { Fraunces, Outfit, Syne } from "next/font/google"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
})

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ContentAI — AI-Powered Content Generator",
  description:
    "Generate professional LinkedIn posts, cold emails, and profile bios in seconds using Claude AI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${syne.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
