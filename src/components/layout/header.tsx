"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, LogIn, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { useAuth } from "@/lib/hooks/use-auth"
import { motion, AnimatePresence } from "framer-motion"

const NAV_LINKS = [
  { href: "/stories", label: "סיפורים" },
  { href: "/categories", label: "קטגוריות" },
  { href: "/join", label: "הצטרפות" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, loading, signOut } = useAuth()

  const isAdmin = user?.app_metadata?.role === "admin"
  const displayName =
    user?.user_metadata?.full_name || user?.email || user?.phone || ""
  const avatarInitial = displayName.charAt(0).toUpperCase() || "?"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-sm border-b border-border/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.img
              src="/logo.png"
              alt="סיפורון"
              className="h-10 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-foreground/70 hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {loading ? null : user ? (
              <>
                {isAdmin && (
                  <Button variant="ghost" size="sm" className="rounded-full" asChild>
                    <Link href="/admin">
                      <Shield className="h-4 w-4 ml-2" />
                      ניהול
                    </Link>
                  </Button>
                )}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-600 text-primary-foreground text-sm font-bold shadow-sm">
                  {avatarInitial}
                </div>
                <Button variant="ghost" size="sm" className="rounded-full" onClick={signOut}>
                  <LogOut className="h-4 w-4 ml-2" />
                  יציאה
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="rounded-full" asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4 ml-2" />
                    כניסה
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20"
                  asChild
                >
                  <Link href="/join">להתחיל ב-₪5</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-full"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden pb-4 border-t mt-2 pt-4 space-y-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block text-base font-medium text-foreground/80 hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-primary/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t">
                {loading ? null : user ? (
                  <>
                    {isAdmin && (
                      <Button variant="outline" className="w-full h-11 text-base rounded-full" asChild>
                        <Link href="/admin" onClick={() => setMobileOpen(false)}>
                          <Shield className="h-4 w-4 ml-2" />
                          ניהול
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full h-11 text-base rounded-full"
                      onClick={() => {
                        setMobileOpen(false)
                        signOut()
                      }}
                    >
                      <LogOut className="h-4 w-4 ml-2" />
                      יציאה
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full h-11 text-base rounded-full" asChild>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        <LogIn className="h-4 w-4 ml-2" />
                        כניסה
                      </Link>
                    </Button>
                    <Button className="w-full h-11 text-base rounded-full shadow-sm shadow-primary/20" asChild>
                      <Link href="/join" onClick={() => setMobileOpen(false)}>
                        להתחיל ב-₪5
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
