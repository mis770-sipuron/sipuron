"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  CreditCard,
  User,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react"

/* ── Plan data ── */
const PLANS = {
  monthly: {
    name: "חודשי",
    price: "49.90",
    trialPrice: "5",
    subtitle: "גמישות מלאה",
    renewLabel: "49.90 לחודש אח\"כ",
  },
  annual: {
    name: "שנתי",
    price: "39.90",
    trialPrice: "5",
    subtitle: "הכי משתלם",
    renewLabel: "39.90 לחודש אח\"כ (478.80 לשנה)",
  },
} as const

const FEATURES = [
  "גישה מלאה למאגר (200+ סיפורים)",
  "סיפור חדש כל שבוע",
  "לפי גילאים: 2-4, 4-6, 6-8, 8-10, 10-13",
  "פרשת שבוע, חגים, ערכים, הרפתקאות",
  "ברכת יום הולדת אישית ממנחם שרון",
  "נגן נוח — ממשיכים מאיפה שעצרתם",
  "ביטול בכל זמן, בלי שאלות",
]

/* ── Steps ── */
const STEPS = [
  { label: "בחירת תוכנית", key: "plan" },
  { label: "פרטים", key: "details" },
  { label: "תשלום", key: "payment" },
  { label: "הצלחה!", key: "success" },
] as const

function ProgressSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
      {STEPS.map((step, i) => (
        <div key={step.key} className="flex items-center gap-1.5 sm:gap-2">
          <span
            className={`flex items-center gap-1 font-medium transition-colors ${
              i <= currentStep
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                i < currentStep
                  ? "bg-primary text-primary-foreground"
                  : i === currentStep
                    ? "bg-primary/15 text-primary ring-2 ring-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < currentStep ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                i + 1
              )}
            </span>
            <span className="hidden sm:inline">{step.label}</span>
          </span>
          {i < STEPS.length - 1 && (
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Main checkout content (needs useSearchParams) ── */
function CheckoutContent() {
  const searchParams = useSearchParams()
  const planKey = searchParams.get("plan") === "annual" ? "annual" : "monthly"
  const plan = PLANS[planKey]

  const [form, setForm] = useState({ name: "", phone: "", email: "" })

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <ProgressSteps currentStep={1} />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-8">
            השלמת הרשמה
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* ── Order Summary (top on mobile, side on desktop) ── */}
          <motion.div
            className="lg:col-span-2 order-first"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80, delay: 0.1 }}
          >
            <Card className="border-2 border-primary/30 rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground">
                    סיכום הזמנה
                  </h2>
                  <Badge className="bg-primary/10 text-primary border-0">
                    {plan.name}
                  </Badge>
                </div>

                {/* Price highlight */}
                <div className="bg-secondary/60 rounded-2xl p-4 mb-5">
                  <div className="flex items-baseline gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-extrabold text-primary">
                      &#8362;{plan.trialPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      חודש ראשון
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    &#8362;{plan.renewLabel}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {FEATURES.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Switch plan link */}
                <div className="mt-5 pt-4 border-t border-border">
                  <Link
                    href={`/checkout?plan=${planKey === "monthly" ? "annual" : "monthly"}`}
                    className="text-xs text-primary hover:underline"
                  >
                    {planKey === "monthly"
                      ? "רוצים לחסוך ₪120? עברו לשנתי"
                      : "מעדיפים חודשי? לחצו כאן"}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── Form + Payment ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 80, delay: 0.2 }}
          >
            <Card className="rounded-3xl">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  פרטים אישיים
                </h2>

                <div className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">שם מלא</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="ישראל ישראלי"
                        value={form.name}
                        onChange={handleChange("name")}
                        className="h-12 rounded-xl pr-10 text-base"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">טלפון</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="050-1234567"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        className="h-12 rounded-xl pr-10 text-base"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">אימייל</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        className="h-12 rounded-xl pr-10 text-base"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-border" />

                {/* Payment placeholder */}
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  פרטי תשלום
                </h2>

                <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-8 text-center">
                  <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">
                    מערכת סליקה תחובר בקרוב
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Cardcom iframe יופיע כאן
                  </p>
                </div>

                {/* Submit */}
                <Button
                  size="lg"
                  className="w-full h-12 rounded-xl text-base font-bold mt-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  להשלים תשלום — &#8362;{plan.trialPrice}
                </Button>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    סליקה מאובטחת
                  </span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5" />
                    256-bit SSL
                  </span>
                  <span className="text-border">|</span>
                  <span>ביטול בכל זמן</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ── Page wrapper with Suspense for useSearchParams ── */
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">טוען...</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
