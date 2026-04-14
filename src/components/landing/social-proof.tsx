"use client"

import { Card } from "@/components/ui/card"
import { Star, Users, BookOpen, Calendar } from "lucide-react"
import { motion } from "framer-motion"

const TESTIMONIALS = [
  {
    quote: "הילדים מחכים כל ערב לסיפור. שעת ההשכבה הפכה לרגע הכי טוב ביום.",
    name: "שרה כ.",
    detail: "אמא ל-4",
  },
  {
    quote: "אלטרנטיבה מושלמת למסכים. תוכן איכותי עם ערכים שחשובים לנו.",
    name: "רחלי מ.",
    detail: "אמא ל-3",
  },
  {
    quote: "הילד מבקש את מנחם כל לילה. העדפתי לשלם ₪45 מאשר לריב על הטלפון.",
    name: "דבורה ל.",
    detail: "אמא ל-5",
  },
]

const STATS = [
  { icon: Users, value: "10,000+", label: "משפחות" },
  { icon: BookOpen, value: "200+", label: "סיפורים" },
  { icon: Calendar, value: "כל יום", label: "סיפור חדש" },
  { icon: Star, value: "4.9/5", label: "דירוג הורים" },
]

export function SocialProof() {
  return (
    <section className="py-16 sm:py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: i * 0.1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 10, delay: i * 0.1 + 0.1 }}
                >
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                </motion.div>
                <motion.div
                  className="text-2xl sm:text-3xl font-extrabold text-foreground"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120, delay: i * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            מה ההורים אומרים
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: i * 0.12 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Card
                className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow h-full"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                        delay: i * 0.12 + j * 0.06,
                      }}
                    >
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-sm">
                  <span className="font-bold text-foreground">{t.name}</span>
                  <span className="text-muted-foreground"> — {t.detail}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
