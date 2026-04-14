"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Headphones,
  Users,
  UserPlus,
  Play,
  Pause,
  Clock,
  ArrowLeft,
  PartyPopper,
  Volume2,
} from "lucide-react"

/* ── Next-steps data ── */
type NextStep = {
  number: number
  icon: typeof Headphones
  title: string
  description: string
  href: string
  cta: string
  external?: boolean
}

const NEXT_STEPS: NextStep[] = [
  {
    number: 1,
    icon: Headphones,
    title: "האזינו לסיפור הראשון שלכם",
    description: "בחרו סיפור מהמאגר והתחילו להאזין עם הילדים.",
    href: "/stories",
    cta: "למאגר הסיפורים",
  },
  {
    number: 2,
    icon: UserPlus,
    title: "הוסיפו את פרטי הילדים",
    description: "כדי שנתאים סיפורים לגיל ונשלח ברכת יום הולדת.",
    href: "/signup",
    cta: "להוסיף ילדים",
  },
  {
    number: 3,
    icon: Users,
    title: "הצטרפו לקהילת WhatsApp",
    description: "טיפים, עדכונים, ושיח הורים מדהים.",
    href: "https://chat.whatsapp.com/sipuron",
    cta: "להצטרף לקהילה",
    external: true,
  },
]

/* ── Confetti particle component ── */
function ConfettiParticle({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <motion.div
      className="absolute top-0 w-2 h-2 rounded-full pointer-events-none"
      style={{ left: `${x}%`, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, scale: 1, rotate: 0 }}
      animate={{
        y: ["-20px", "100vh"],
        opacity: [1, 1, 0],
        rotate: [0, 360, 720],
        scale: [1, 0.8, 0.4],
      }}
      transition={{
        duration: 3,
        delay,
        ease: "easeIn",
      }}
    />
  )
}

const CONFETTI_COLORS = ["#F59E0B", "#D97706", "#7C3AED", "#FB7185", "#10B981", "#3B82F6"]

export default function WelcomePage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <ConfettiParticle
            key={i}
            delay={i * 0.1}
            x={Math.random() * 100}
            color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
          />
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
        {/* Hero celebration */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 12 }}
        >
          <motion.div
            className="text-6xl sm:text-7xl mb-6"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <PartyPopper className="h-16 w-16 sm:h-20 sm:w-20 text-primary mx-auto" />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.3 }}
          >
            ברוכים הבאים למשפחת סיפורון!
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ההרשמה הושלמה בהצלחה. עכשיו מתחילה ההרפתקה.
          </motion.p>
        </motion.div>

        {/* Audio greeting from Menachem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card className="rounded-3xl border-2 border-primary/20 mb-10">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-105 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 mr-[-2px]" />
                  )}
                </button>
                <div>
                  <p className="font-bold text-foreground">
                    ברכת ברוכים הבאים ממנחם שרון
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Volume2 className="h-3.5 w-3.5" />
                    הודעה אישית למשפחות חדשות
                  </p>
                </div>
              </div>
              {/* Audio progress placeholder */}
              <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={isPlaying ? { width: "60%" } : {}}
                  transition={{ duration: 8, ease: "linear" }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next steps */}
        <div className="space-y-4 mb-10">
          <motion.h2
            className="text-xl font-bold text-foreground text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            3 צעדים ראשונים
          </motion.h2>

          {NEXT_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1 + i * 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Card className="rounded-2xl hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {step.number}
                        </Badge>
                        <h3 className="font-bold text-foreground text-sm">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {step.description}
                      </p>
                      {step.external ? (
                        <a
                          href={step.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                          >
                            {step.cta}
                            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                          </Button>
                        </a>
                      ) : (
                        <Link href={step.href}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                          >
                            {step.cta}
                            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Daily reminder info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <div className="rounded-2xl bg-secondary/60 border border-primary/20 p-5 text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">
                כל יום ב-17:00 — סיפור חדש מגיע!
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              נשלח לכם התראה ב-WhatsApp עם הסיפור היומי.
            </p>
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <Link href="/stories">
            <Button
              size="lg"
              className="h-12 rounded-xl text-base font-bold px-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              לדף הסיפורים
              <ArrowLeft className="h-4 w-4 mr-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
