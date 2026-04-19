"use client"

import { Card } from "@/components/ui/card"
import { Star, Users, BookOpen, Calendar, Quote } from "lucide-react"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

/* ── Count-up number component ── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    if (target >= 1000) return Math.round(latest).toLocaleString("he-IL")
    if (target % 1 !== 0) return latest.toFixed(1)
    return Math.round(latest).toString()
  })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, target, {
      duration: 2,
      ease: [0.2, 0.8, 0.2, 1],
    })
    return controls.stop
  }, [isInView, count, target])

  return (
    <span ref={ref} className="count-up-number">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const TESTIMONIALS = [
  {
    quote: "הסיפורים שלך מרתקים! הילדים כל אחד שומע ונרדמים בשלווה. תודה רבה!",
    name: "אמא מהקהילה",
    detail: "אמא ל-3",
    initials: "א",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    quote: "יש לי ילד שאם הוא לא שומע סיפור — הוא לא ישב. הסיפורים שלך הפכו את הערב שלנו.",
    name: "הורה מהקהילה",
    detail: "אמא ל-4",
    initials: "ה",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  },
  {
    quote: "הילדות שלי מחכות כל ערב לסיפור חדש. ומבקשות לשמוע כמה פעמים! אתה מספר בצורה מחממת!",
    name: "דבורה",
    detail: "אמא ל-5",
    initials: "ד",
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  },
  {
    quote: "נכנסנו לשגרה חדשה. הסיפורים מעניינים, מפתחים דמיון וקשב. וגם אני כאמא מאזינה!",
    name: "רחלי",
    detail: "אמא ל-3",
    initials: "ר",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  {
    quote: "התוכן איכותי ביותר ומועבר בדרך מעניינת שמאפשרת פיתוח הדמיון.",
    name: "שרה",
    detail: "אמא ל-4",
    initials: "ש",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  {
    quote: "הילדים מחכים כל יום לשמוע את הסיפורים! ומבקשים להשמיע בצורה חוויתית ורגועה.",
    name: "מרים",
    detail: "אמא ל-6",
    initials: "מ",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
]

const STATS = [
  { icon: Users, value: 10000, suffix: "+", label: "משפחות", color: "text-amber-500" },
  { icon: BookOpen, value: 200, suffix: "+", label: "סיפורים", color: "text-purple-500" },
  { icon: Calendar, value: 365, suffix: "", displayText: "כל יום", label: "סיפור חדש", color: "text-blue-500" },
  { icon: Star, value: 4.9, suffix: "/5", label: "דירוג הורים", color: "text-rose-500" },
]

export function SocialProof() {
  return (
    <section className="py-20 sm:py-28 bg-card relative noise-overlay">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="text-center glass-card rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 10, delay: i * 0.1 + 0.1 }}
                >
                  <Icon className={`h-7 w-7 ${stat.color} mx-auto mb-3`} />
                </motion.div>
                <div className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1">
                  {stat.displayText ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 120, delay: i * 0.1 + 0.2 }}
                    >
                      {stat.displayText}
                    </motion.span>
                  ) : (
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            מה ההורים אומרים
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.08 }}
            >
              <Card className="group relative p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden hover:-translate-y-1">
                {/* Decorative gradient corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />

                {/* Quote icon */}
                <Quote className="h-8 w-8 text-primary/15 mb-3 -scale-x-100" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                        delay: i * 0.08 + j * 0.05,
                      }}
                    >
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-foreground leading-relaxed mb-5 text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author with avatar */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.detail}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
