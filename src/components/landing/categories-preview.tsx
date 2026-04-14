"use client"

import Link from "next/link"
import { STORY_CATEGORIES } from "@/lib/constants"
import { motion } from "framer-motion"

export function CategoriesPreview() {
  // Calculate delay so center pills appear first and outer ones follow
  const total = STORY_CATEGORIES.length
  const center = (total - 1) / 2

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            סיפורים לכל רגע
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
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
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150, damping: 12, delay }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={`/categories/${cat.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
