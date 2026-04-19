"use client"

import Link from "next/link"
import { STORY_CATEGORIES } from "@/lib/constants"
import { motion } from "framer-motion"

export function CategoriesPreview() {
  const total = STORY_CATEGORIES.length
  const center = (total - 1) / 2

  return (
    <section className="py-20 sm:py-28 bg-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            סיפורים לכל רגע
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            200+ סיפורים מחולקים לקטגוריות — תמיד תמצאו מה להאזין
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {STORY_CATEGORIES.map((cat, i) => {
            const distFromCenter = Math.abs(i - center)
            const delay = distFromCenter * 0.04

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
                  delay,
                }}
                whileHover={{ scale: 1.08, y: -2 }}
              >
                <Link
                  href={`/categories/${cat.slug}`}
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full glass-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
