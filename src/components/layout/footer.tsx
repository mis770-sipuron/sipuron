"use client"

import Link from "next/link"
import { Phone, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"

const FOOTER_LINKS = [
  { href: "/stories", label: "מאגר סיפורים" },
  { href: "/join", label: "הצטרפות למועדון" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/contact", label: "צור קשר" },
]

export function Footer() {
  return (
    <footer className="relative bg-card mt-auto">
      {/* Gradient top border */}
      <div className="h-[2px] bg-gradient-to-l from-amber-500 via-purple-500 to-rose-500 opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <motion.img
                src="/logo.png"
                alt="סיפורון"
                className="h-10 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              סיפורי שמע איכותיים לילדים בקול של מנחם שרון.
              <br />
              כל לילה סיפור חדש. כל סיפור — עולם שלם.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">קישורים</h3>
            <nav className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">צור קשר</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/972548460430"
                className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                054-846-0430
              </a>
              <a
                href="mailto:info@sipuron.co.il"
                className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                info@sipuron.co.il
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} סיפורון — מנחם שרון. נבנה עם
            <Heart className="h-3 w-3 fill-rose-400 text-rose-400 inline" />
            כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  )
}
