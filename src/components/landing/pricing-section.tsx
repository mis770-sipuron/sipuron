"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Crown } from "lucide-react"
import { motion } from "framer-motion"

const FEATURES = [
  "גישה מלאה למאגר (200+ סיפורים)",
  "סיפור חדש כל שבוע",
  "לפי גילאים: 2-4, 4-6, 6-8, 8-10, 10-13",
  "פרשת שבוע, חגים, ערכים, הרפתקאות, סדרות",
  "ברכת יום הולדת אישית ממנחם שרון",
  "נגן נוח — ממשיכים מאיפה שעצרתם",
  "ביטול בכל זמן, בלי שאלות",
]

function FeatureList() {
  return (
    <ul className="space-y-3 mb-8">
      {FEATURES.map((f, i) => (
        <motion.li
          key={f}
          className="flex items-start gap-2.5 text-sm text-foreground"
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Check className="h-3 w-3 text-primary" />
          </div>
          {f}
        </motion.li>
      ))}
    </ul>
  )
}

export function PricingSection() {
  return (
    <section className="py-20 sm:py-28 bg-card relative noise-overlay">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            הצטרפו למשפחת סיפורון
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ₪5 = פחות מקפה. 30 לילות שקטים.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
          {/* Monthly plan */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="h-full"
          >
            <div className="glass-card rounded-2xl p-8 border border-border/50 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-foreground mb-1">חודשי</h3>
              <p className="text-sm text-muted-foreground mb-6">גמישות מלאה</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <motion.span
                    className="text-4xl font-extrabold text-foreground count-up-number"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 150, damping: 10, delay: 0.2 }}
                  >
                    ₪49.90
                  </motion.span>
                  <span className="text-muted-foreground">/חודש</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-bold px-3.5 py-1.5 rounded-full">
                  <Sparkles className="h-3.5 w-3.5" />
                  ₪5 בחודש הראשון!
                </div>
              </div>

              <FeatureList />

              <div className="mt-auto">
                <Button
                  className="relative w-full rounded-full overflow-hidden group"
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <Link href="/checkout?plan=monthly">
                    <span className="relative z-10 font-bold group-hover:text-primary transition-colors">
                      להתחיל ב-₪5
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Annual plan — FEATURED with animated gradient border */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
            className="h-full"
          >
            {/* Animated gradient border wrapper */}
            <div className="animated-border rounded-2xl p-[2px] h-full">
              {/* Glow pulse behind card */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-50 blur-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(124,58,237,0.2), rgba(251,113,133,0.2))",
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative bg-card rounded-2xl p-8 h-full flex flex-col">
                {/* Popular badge */}
                <div className="absolute -top-3.5 right-6">
                  <Badge className="bg-gradient-to-l from-amber-500 to-orange-500 text-white px-4 py-1 text-sm font-bold shadow-lg shadow-amber-500/25 border-0">
                    <Crown className="h-3.5 w-3.5 ml-1.5" />
                    חיסכון ₪120
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">שנתי</h3>
                <p className="text-sm text-muted-foreground mb-6">הכי משתלם</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      className="text-4xl font-extrabold text-foreground count-up-number"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 150, damping: 10, delay: 0.3 }}
                    >
                      ₪39.90
                    </motion.span>
                    <span className="text-muted-foreground">/חודש</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ₪478.80 לשנה (במקום ₪598.80)
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-bold px-3.5 py-1.5 rounded-full">
                    <Sparkles className="h-3.5 w-3.5" />
                    ₪5 בחודש הראשון!
                  </div>
                </div>

                <FeatureList />

                <div className="mt-auto">
                  <Button
                    className="relative w-full rounded-full bg-primary hover:bg-primary/90 overflow-hidden group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                    size="lg"
                    asChild
                  >
                    <Link href="/checkout?plan=annual">
                      {/* Shimmer */}
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                      />
                      <span className="relative z-10 font-bold">להתחיל ב-₪5 + חיסכון</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final trust line */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-muted-foreground text-sm">
            סליקה מאובטחת | ביטול בקליק | 10,000+ משפחות כבר בפנים
          </p>
        </motion.div>
      </div>
    </section>
  )
}
