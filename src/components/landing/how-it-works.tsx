"use client"

import { Headphones, BookOpen, Moon } from "lucide-react"
import { motion } from "framer-motion"

const STEPS = [
  {
    icon: Headphones,
    title: "נרשמים",
    description: "הצטרפות ב-₪5 בלבד. 30 שניות ואתם בפנים.",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  {
    icon: BookOpen,
    title: "כל יום סיפור חדש ב-17:00",
    description: "סיפורים מותאמים לגיל — ישירות ל-WhatsApp ולנגן באתר.",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
  {
    icon: Moon,
    title: "שינה טובה ומתוקה",
    description: "הילדים נרדמים בשמחה. אתם נהנים מרגע שקט.",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            איך זה עובד?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            3 צעדים פשוטים לשינוי שעת ההשכבה
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: i * 0.15 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${step.color} mb-5`}
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 12, delay: i * 0.15 + 0.1 }}
                >
                  <Icon className="h-8 w-8" />
                </motion.div>
                <div className="text-sm font-bold text-primary mb-2">
                  שלב {i + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
