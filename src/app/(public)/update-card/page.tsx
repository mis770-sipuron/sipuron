"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CreditCard,
  ShieldCheck,
  Lock,
  AlertCircle,
  MessageCircle,
} from "lucide-react"

export default function UpdateCardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-5">
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
            עדכון פרטי אשראי
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            הכרטיס שלכם לא עבר. עדכנו ותמשיכו להאזין.
          </p>
        </motion.div>

        {/* Alert */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-start gap-3 rounded-2xl bg-destructive/5 border border-destructive/20 p-4">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                החיוב האחרון לא הצליח
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                עדכנו את פרטי הכרטיס כדי להמשיך לגשת לכל הסיפורים.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cardcom iframe placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <Card className="rounded-3xl mb-6">
            <CardContent className="p-6 sm:p-8">
              <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-10 text-center">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-medium text-muted-foreground">
                  מערכת סליקה תחובר בקרוב
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Cardcom iframe יופיע כאן
                </p>
              </div>

              <Button
                size="lg"
                className="w-full h-12 rounded-xl text-base font-bold mt-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                עדכון כרטיס
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

        {/* Help link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://wa.me/972548460430"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            צריכים עזרה? WhatsApp: 054-846-0430
          </a>
        </motion.div>
      </div>
    </div>
  )
}
