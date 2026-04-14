"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Music, BookOpen, Award, ChevronLeft, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ---------- data ----------
const SECTIONS = [
  {
    title: "מאגר הטעמים",
    description: "כל טעמי המקרא במקום אחד — עם סימנים, הסברים ודוגמאות שמיעה",
    href: "/learn/taamim",
    icon: Music,
    gradient: "from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/30",
    iconColor: "text-sky-600 dark:text-sky-400",
    comingSoon: false,
  },
  {
    title: "שיעורים",
    description: "שיעורים מובנים צעד אחר צעד — מהמפסיקים הגדולים ועד המשרתים הקטנים",
    href: "/learn/lessons",
    icon: BookOpen,
    gradient: "from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    comingSoon: true,
  },
  {
    title: "הכנה לבר מצווה",
    description: "תוכנית הכנה מלאה לקריאה בתורה — תרגול טעמים, ניגון ופסוקים",
    href: "/learn/bar-mitzvah",
    icon: Award,
    gradient: "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    comingSoon: true,
  },
] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

// ---------- component ----------
export default function LearnPage() {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* ---- Hero ---- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Icon */}
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-amber-400 shadow-lg shadow-sky-500/20">
            <Music className="size-8 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            לומדים טעמי מקרא
          </h1>

          <p className="mt-3 text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            מאגר טעמים אינטראקטיבי — לילדים ולהורים
          </p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-6 inline-flex items-center gap-3 sm:gap-4 rounded-full bg-white/80 dark:bg-slate-800/60 px-5 py-2.5 shadow-sm ring-1 ring-sky-200/60 dark:ring-sky-700/40"
          >
            <StatItem value="14" label="טעמים" />
            <Divider />
            <StatItem value="4" label="שיעורים" />
            <Divider />
            <span className="flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400">
              <Sparkles className="size-3.5" />
              הכנה לבר/בת מצווה
            </span>
          </motion.div>
        </motion.div>

        {/* ---- Section Cards ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5"
        >
          {SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <motion.div key={section.title} variants={item}>
                <Link href={section.comingSoon ? "#" : section.href} className={section.comingSoon ? "pointer-events-none" : ""}>
                  <Card className={`relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-gradient-to-l ${section.gradient}`}>
                    <CardContent className="flex items-center gap-5 py-6 sm:py-8">
                      {/* Icon */}
                      <div className="flex-shrink-0 flex size-14 sm:size-16 items-center justify-center rounded-xl bg-white/70 dark:bg-slate-800/60 shadow-sm">
                        <Icon className={`size-7 sm:size-8 ${section.iconColor}`} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg sm:text-xl font-bold text-foreground">
                            {section.title}
                          </h2>
                          {section.comingSoon && (
                            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-amber-200/80 text-amber-800 dark:bg-amber-800/40 dark:text-amber-200">
                              בקרוב
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {section.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      {!section.comingSoon && (
                        <Button variant="ghost" size="icon" className="flex-shrink-0 size-10 rounded-full bg-white/60 dark:bg-slate-700/40 hover:bg-white dark:hover:bg-slate-700">
                          <ChevronLeft className="size-5 text-sky-600 dark:text-sky-400" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ---------- helpers ----------
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <span className="text-sm font-medium text-foreground">
      <span className="font-bold text-sky-600 dark:text-sky-400">{value}</span>{" "}
      {label}
    </span>
  )
}

function Divider() {
  return <span className="h-4 w-px bg-sky-200 dark:bg-sky-700" />
}
