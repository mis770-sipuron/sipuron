"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
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

export function PricingSection() {
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
            הצטרפו למשפחת סיפורון
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            ₪5 = פחות מקפה. 30 לילות שקטים.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Monthly — enters from the right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 14 }}
          >
            <Card className="relative p-8 border-2 border-border hover:border-primary/40 transition-colors h-full">
              <h3 className="text-xl font-bold text-foreground mb-1">חודשי</h3>
              <p className="text-sm text-muted-foreground mb-6">גמישות מלאה</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <motion.span
                    className="text-4xl font-extrabold text-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 150, damping: 10, delay: 0.2 }}
                  >
                    ₪49.90
                  </motion.span>
                  <span className="text-muted-foreground">/חודש</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1 bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
                  <Sparkles className="h-3.5 w-3.5" />
                  ₪5 בחודש הראשון!
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button className="relative w-full rounded-full overflow-hidden" size="lg" asChild>
                <Link href="/checkout?plan=monthly">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  />
                  <span className="relative z-10">להתחיל ב-₪5</span>
                </Link>
              </Button>
            </Card>
          </motion.div>

          {/* Annual — enters from the left with gold glow pulse */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 14, delay: 0.1 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(234, 179, 8, 0)",
                  "0 0 30px 4px rgba(234, 179, 8, 0.15)",
                  "0 0 0 0 rgba(234, 179, 8, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl h-full"
            >
              <Card className="relative p-8 border-2 border-primary shadow-lg shadow-primary/10 h-full">
                <Badge className="absolute -top-3 right-6 bg-primary text-primary-foreground px-3">
                  חיסכון ₪120
                </Badge>

                <h3 className="text-xl font-bold text-foreground mb-1">שנתי</h3>
                <p className="text-sm text-muted-foreground mb-6">הכי משתלם</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      className="text-4xl font-extrabold text-foreground"
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
                  <div className="mt-2 inline-flex items-center gap-1 bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
                    <Sparkles className="h-3.5 w-3.5" />
                    ₪5 בחודש הראשון!
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button className="relative w-full rounded-full bg-primary hover:bg-primary/90 overflow-hidden" size="lg" asChild>
                  <Link href="/checkout?plan=annual">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                    />
                    <span className="relative z-10">להתחיל ב-₪5 + חיסכון</span>
                  </Link>
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Final CTA */}
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
