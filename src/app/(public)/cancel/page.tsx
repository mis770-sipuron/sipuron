"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  Gift,
  Headphones,
  Wrench,
  PenLine,
  ArrowRight,
  Quote,
} from "lucide-react"

/* ── Cancellation reasons ── */
type CancelReason = "expensive" | "not-listening" | "technical" | "other" | ""

const REASONS: { value: CancelReason; label: string }[] = [
  { value: "expensive", label: "יקר לי" },
  { value: "not-listening", label: "לא מאזינים מספיק" },
  { value: "technical", label: "בעיה טכנית" },
  { value: "other", label: "סיבה אחרת" },
]

/* ── Counter-offer cards ── */
const COUNTER_OFFERS: Record<
  Exclude<CancelReason, "">,
  { icon: typeof Heart; title: string; body: string; cta?: string }
> = {
  expensive: {
    icon: Gift,
    title: "מה אם &#8362;29.90 לחודשיים הבאים?",
    body: "אנחנו רוצים שתישארו. הנה הצעה מיוחדת — מחיר מוזל לשני החודשים הקרובים.",
    cta: "לקבל את ההצעה",
  },
  "not-listening": {
    icon: Headphones,
    title: "נסו את סדרת מושקה — המומלצת ביותר!",
    body: 'הילדים מתלהבים ממנה. 8 פרקים קצרים, מצחיקים, עם ערכים. ייתכן שעוד לא גיליתם את ה"פינה" הנכונה.',
    cta: "להאזין למושקה",
  },
  technical: {
    icon: Wrench,
    title: "נפתור לכם!",
    body: "צוות התמיכה שלנו ישמח לעזור. שלחו לנו הודעה ונטפל בזה.",
    cta: "WhatsApp: 054-846-0430",
  },
  other: {
    icon: PenLine,
    title: "ספרו לנו — נשתפר",
    body: "המשוב שלכם חשוב לנו. מה היינו יכולים לעשות טוב יותר?",
  },
}

export default function CancelPage() {
  const [reason, setReason] = useState<CancelReason>("")
  const [freeText, setFreeText] = useState("")
  const [cancelled, setCancelled] = useState(false)

  const offer = reason ? COUNTER_OFFERS[reason] : null

  if (cancelled) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
              המנוי בוטל
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              תמיד אפשר לחזור. המשפחה ממתינה.
            </p>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl h-12"
              >
                לדף הבית
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        {/* Headline */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
            בטוחים שרוצים לבטל?
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            לפני שנפרדים, נשמח להבין מה קרה — ואולי נמצא פתרון.
          </p>
        </motion.div>

        {/* Menachem quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="rounded-3xl border-primary/20 mb-8">
            <CardContent className="p-5 sm:p-6">
              <div className="flex gap-3">
                <Quote className="h-8 w-8 text-primary/40 shrink-0 mt-1" />
                <div>
                  <p className="text-foreground italic leading-relaxed">
                    &ldquo;כל ילד שמאזין לסיפור לפני השינה — נרדם עם חיוך, עם
                    דמיון, עם ביטחון. אני מספר כל סיפור כאילו אני מספר
                    לנכדים שלי.&rdquo;
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">
                    — מנחם שרון
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reason selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <Label className="mb-2 block text-sm font-medium">
            למה מבטלים?
          </Label>
          <Select
            value={reason}
            onValueChange={(v) => setReason(v as CancelReason)}
          >
            <SelectTrigger className="h-12 w-full rounded-xl text-base">
              <SelectValue placeholder="בחרו סיבה..." />
            </SelectTrigger>
            <SelectContent>
              {REASONS.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Counter-offer card */}
        <AnimatePresence mode="wait">
          {offer && (
            <motion.div
              key={reason}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
              className="mb-8"
            >
              <Card className="rounded-2xl border-2 border-primary/30 bg-secondary/30">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <offer.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-bold text-foreground mb-1"
                        dangerouslySetInnerHTML={{ __html: offer.title }}
                      />
                      <p className="text-sm text-muted-foreground mb-4">
                        {offer.body}
                      </p>

                      {/* Free text for "other" */}
                      {reason === "other" && (
                        <div className="mb-4">
                          <Textarea
                            placeholder="ספרו לנו..."
                            value={freeText}
                            onChange={(e) => setFreeText(e.target.value)}
                            className="rounded-xl resize-none"
                            rows={3}
                          />
                        </div>
                      )}

                      {/* CTA for the counter-offer */}
                      {offer.cta && (
                        reason === "technical" ? (
                          <a
                            href="https://wa.me/972548460430"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="rounded-lg" size="sm">
                              <MessageCircle className="h-4 w-4" />
                              {offer.cta}
                            </Button>
                          </a>
                        ) : reason === "not-listening" ? (
                          <Link href="/stories">
                            <Button className="rounded-lg" size="sm">
                              <Headphones className="h-4 w-4" />
                              {offer.cta}
                            </Button>
                          </Link>
                        ) : (
                          <Button className="rounded-lg" size="sm">
                            <Gift className="h-4 w-4" />
                            {offer.cta}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/stories" className="w-full sm:w-auto sm:flex-1">
            <Button
              size="lg"
              className="w-full h-12 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              <Heart className="h-4 w-4" />
              אני רוצה להישאר!
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive text-xs"
            onClick={() => setCancelled(true)}
          >
            ביטול סופי
            <ArrowRight className="h-3 w-3 mr-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
