"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, BookOpen, DollarSign,
  MessageSquare, Link as LinkIcon, Map, Settings,
  BookOpen as Logo, ChevronRight, Menu, X, UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { href: "/admin", label: "סקירה כללית", icon: LayoutDashboard },
  { href: "/admin/subscribers", label: "מנויים", icon: Users },
  { href: "/admin/leads", label: "לידים", icon: UserPlus },
  { href: "/admin/stories", label: "סיפורים", icon: BookOpen },
  { href: "/admin/finance", label: "כספים", icon: DollarSign },
  { href: "/admin/messaging", label: "הודעות + בוט", icon: MessageSquare },
  { href: "/admin/links", label: "לינקים", icon: LinkIcon },
  { href: "/admin/roadmap", label: "רודמאפ", icon: Map },
  { href: "/admin/settings", label: "הגדרות", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40">
      <div className="flex flex-col flex-grow bg-card border-l overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b">
          <Logo className="h-7 w-7 text-primary" />
          <span className="text-xl font-extrabold text-primary">סיפורון</span>
          <span className="text-xs text-muted-foreground mr-auto">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="h-4 w-4 mr-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">י</span>
            </div>
            <span className="text-sm font-medium">יוסף</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  )
}

/* ───────── Mobile Admin Header ───────── */
export function AdminMobileHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Find current page label for the header title
  const currentPage = NAV_ITEMS.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin" && pathname.startsWith(item.href))
  )

  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-4 bg-card border-b border-border/50">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-lg font-extrabold text-primary">סיפורון</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11"
            onClick={() => setOpen(!open)}
            aria-label="תפריט"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile dropdown nav */}
      {open && (
        <div className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-sm overflow-y-auto animate-fade-in-up">
          <nav className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href))
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 mr-auto" />}
                </Link>
              )
            })}
          </nav>

          {/* User info at bottom of mobile nav */}
          <div className="px-4 py-4 mt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">י</span>
              </div>
              <span className="text-sm font-medium">יוסף</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
