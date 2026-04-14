"use client"

import Link from "next/link"
import { Music, ChevronRight } from "lucide-react"

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 via-amber-50/30 to-background dark:from-slate-900 dark:via-slate-900/80 dark:to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-sky-200/50 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-700/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Back link */}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="size-4" />
              <span>חזרה לסיפורון</span>
            </Link>

            {/* Branding */}
            <Link href="/learn" className="flex items-center gap-2 group">
              <Music className="size-5 text-sky-600 transition-transform group-hover:scale-110 dark:text-sky-400" />
              <span className="text-lg font-bold bg-gradient-to-l from-sky-600 via-sky-500 to-amber-500 bg-clip-text text-transparent">
                סיפורון | טעמי מקרא
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
