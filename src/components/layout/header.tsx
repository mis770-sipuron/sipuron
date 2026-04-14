"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, BookOpen, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"

const NAV_LINKS = [
  { href: "/stories", label: "סיפורים" },
  { href: "/categories", label: "קטגוריות" },
  { href: "/join", label: "הצטרפות" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <BookOpen className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <span className="text-2xl font-extrabold bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              סיפורון
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">
                <LogIn className="h-4 w-4 ml-2" />
                כניסה
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/join">
                להתחיל ב-₪5
              </Link>
            </Button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t mt-2 pt-4 space-y-3 animate-fade-in-up">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-foreground/80 hover:text-primary transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t">
              <Button variant="outline" asChild>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <LogIn className="h-4 w-4 ml-2" />
                  כניסה
                </Link>
              </Button>
              <Button asChild>
                <Link href="/join" onClick={() => setMobileOpen(false)}>
                  להתחיל ב-₪5
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
