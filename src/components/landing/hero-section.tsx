"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-warm">
      {/* Animated floating decorative blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[#d4a0a0]/25 rounded-full blur-3xl"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#a8d5ba]/20 rounded-full blur-3xl"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#d4b855]/15 rounded-full blur-3xl"
        animate={{ y: [-8, 12, -8], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 right-1/4 w-48 h-48 bg-[#d4a0a0]/15 rounded-full blur-3xl"
        animate={{ y: [5, -15, 5], rotate: [0, -4, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150, damping: 12 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              מעל 10,000 משפחות כבר מאזינות
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.15 }}
          >
            כל לילה סיפור חדש.
            <br />
            <span className="bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              כל סיפור — עולם שלם.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.3 }}
          >
            סיפורי שמע מרגשים לילדים, בקול של מנחם שרון.
            <br className="hidden sm:block" />
            הפקה תיאטרלית עם ערכים יהודיים — מושלם לשעת השינה.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.45 }}
          >
            <Button size="lg" asChild className="relative w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all overflow-hidden">
              <Link href="/join">
                {/* Shimmer overlay */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
                <Play className="h-5 w-5 ml-2 fill-current relative z-10" />
                <span className="relative z-10">להאזין בחינם</span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg px-8 py-6 rounded-full">
              <Link href="/join">
                להצטרף ב-₪5 בלבד
              </Link>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            className="mt-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            ביטול בכל זמן, בלי שאלות. סליקה מאובטחת.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
