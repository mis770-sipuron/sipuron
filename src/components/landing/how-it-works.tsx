"use client"

import { Headphones, BookOpen, Moon } from "lucide-react"
import { motion } from "framer-motion"

const STEPS = [
  {
    icon: Headphones,
    title: "נרשמים",
    description: "הצטרפות ב-₪5 בלבד. 30 שניות ואתם בפנים.",
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245, 158, 11, 0.3)",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-950/20",
  },
  {
    icon: BookOpen,
    title: "כל יום סיפור חדש ב-17:00",
    description: "סיפורים מותאמים לגיל — ישירות ל-WhatsApp ולנגן באתר.",
    gradient: "from-purple-400 to-violet-500",
    glow: "rgba(124, 58, 237, 0.3)",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-950/20",
  },
  {
    icon: Moon,
    title: "שינה טובה ומתוקה",
    description: "הילדים נרדמים בשמחה. אתם נהנים מרגע שקט.",
    gradient: "from-blue-400 to-indigo-500",
    glow: "rgba(59, 130, 246, 0.3)",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950/20",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-card relative noise-overlay">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            איך זה עובד?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
            3 צעדים פשוטים לשינוי שעת ההשכבה
          </p>
        </motion.div>

        {/* Steps grid with timeline connector */}
        <div className="relative">
          {/* Timeline connector line — desktop only */}
          <div className="hidden md:block absolute top-[4.5rem] left-[16.67%] right-[16.67%] h-[2px]">
            <motion.div
              className="h-full bg-gradient-to-l from-blue-400 via-purple-400 to-amber-400 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ transformOrigin: "right" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: [0.2, 0.8, 0.2, 1],
                    delay: i * 0.15,
                  }}
                >
                  {/* Glass card wrapper */}
                  <div className={`glass-card rounded-2xl p-8 ${step.bgLight} ${step.bgDark} h-full`}>
                    {/* Numbered circle with gradient */}
                    <motion.div
                      className="relative mx-auto mb-6"
                      initial={{ scale: 0, rotate: -30 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                        delay: i * 0.15 + 0.2,
                      }}
                    >
                      {/* Glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full blur-lg"
                        style={{ background: step.glow }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.4, 0.15, 0.4],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                      />
                      {/* Icon circle */}
                      <div
                        className={`relative h-18 w-18 mx-auto rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                        style={{ width: 72, height: 72 }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                        {/* Step number badge */}
                        <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-background border-2 border-current text-xs font-bold flex items-center justify-center text-foreground shadow-sm">
                          {i + 1}
                        </div>
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
