"use client"

import Link from "next/link"
import { Sparkles, BarChart3, FileText, Zap, TrendingUp } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          {/* Logo / Brand */}
          <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">ContentAI</span>
          </Link>

          {children}
        </div>
      </div>

      {/* Right side — Decorative visual panel */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[52%] relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400" />

        {/* Abstract shapes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-400/30 blur-3xl" />
        <div className="absolute bottom-10 -left-16 w-72 h-72 rounded-full bg-teal-300/25 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-56 h-56 rounded-full bg-emerald-300/20 blur-2xl" />

        {/* Geometric accents */}
        <div className="absolute top-16 right-16 w-24 h-24 rounded-2xl bg-white/10 rotate-12 backdrop-blur-sm" />
        <div className="absolute bottom-24 left-12 w-16 h-16 rounded-xl bg-white/10 -rotate-6 backdrop-blur-sm" />

        {/* Floating cards */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          {/* Stats card */}
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 w-64 mb-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Content Generated</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">2,847</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-medium text-emerald-600">+23%</span>
              <span className="text-xs text-gray-400">this month</span>
            </div>
            {/* Mini chart bars */}
            <div className="flex items-end gap-1 mt-4 h-10">
              {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-emerald-500/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Feature cards row */}
          <div className="flex gap-4 mb-6">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl p-4 w-36 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 mb-2.5">
                <FileText className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">LinkedIn</p>
              <p className="text-xs text-gray-500 mt-0.5">AI-powered posts</p>
            </div>
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl p-4 w-36 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50 mb-2.5">
                <Zap className="h-4.5 w-4.5 text-violet-600 dark:text-violet-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Cold Emails</p>
              <p className="text-xs text-gray-500 mt-0.5">Personalized outreach</p>
            </div>
          </div>

          {/* Tagline card */}
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 w-72 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/50">
                <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Your content, your rules</p>
                <p className="text-xs text-gray-500">Powered by AI, crafted by you</p>
              </div>
            </div>
            <div className="flex gap-2">
              {["Strategy", "SEO", "Tone"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
