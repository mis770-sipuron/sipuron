"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Unlock, ChevronRight, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ---------- types ----------
type Taam = {
  id: number
  hebrewName: string
  englishName: string
  symbol: string
  type: "מפסיק" | "משרת"
  description: string
}

type TaamGroup = {
  id: string
  title: string
  subtitle: string
  gradient: string
  borderColor: string
  taamim: Taam[]
}

// ---------- data ----------
const TAAM_GROUPS: TaamGroup[] = [
  {
    id: "melachim",
    title: "מפסיקי מלכים",
    subtitle: "Emperor stops",
    gradient: "from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800/40",
    taamim: [
      {
        id: 1,
        hebrewName: "סוף פסוק",
        englishName: "Sof Pasuk",
        symbol: "׃",
        type: "מפסיק",
        description: "מסמן את סוף הפסוק — העצירה הגדולה ביותר",
      },
      {
        id: 2,
        hebrewName: "אתנחתא",
        englishName: "Etnachta",
        symbol: "֑",
        type: "מפסיק",
        description: "ההפסקה הראשית — מחלק את הפסוק לשניים",
      },
    ],
  },
  {
    id: "sarim",
    title: "מפסיקי שרים",
    subtitle: "King stops",
    gradient: "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800/40",
    taamim: [
      {
        id: 3,
        hebrewName: "זקף קטן",
        englishName: "Zakef Katan",
        symbol: "֔",
        type: "מפסיק",
        description: "הפסקה בינונית — אחד הטעמים הנפוצים ביותר",
      },
      {
        id: 4,
        hebrewName: "זקף גדול",
        englishName: "Zakef Gadol",
        symbol: "֕",
        type: "מפסיק",
        description: "כמו זקף קטן אך מודגש יותר — מופיע במילה בודדת",
      },
      {
        id: 5,
        hebrewName: "סגולתא",
        englishName: "Segolta",
        symbol: "֒",
        type: "מפסיק",
        description: "הפסקה חזקה — מופיע בתחילת יחידה חדשה בפסוק",
      },
      {
        id: 6,
        hebrewName: "שלשלת",
        englishName: "Shalshelet",
        symbol: "֓",
        type: "מפסיק",
        description: "טעם נדיר בעל ניגון ארוך — מופיע רק 4 פעמים בתורה",
      },
    ],
  },
  {
    id: "mishne",
    title: "מפסיקי משנה",
    subtitle: "Duke stops",
    gradient: "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800/40",
    taamim: [
      {
        id: 7,
        hebrewName: "רביע",
        englishName: "Revi'i",
        symbol: "֗",
        type: "מפסיק",
        description: "הפסקה קלה — מחלק קטעים משניים בפסוק",
      },
      {
        id: 8,
        hebrewName: "פשטא",
        englishName: "Pashta",
        symbol: "֙",
        type: "מפסיק",
        description: "הפסקה קטנה שנמצאת מעל האות האחרונה של המילה",
      },
      {
        id: 9,
        hebrewName: "יתיב",
        englishName: "Yetiv",
        symbol: "֚",
        type: "מפסיק",
        description: "מופיע לפני פשטא — ניגון דומה אך כיוון הפוך",
      },
      {
        id: 10,
        hebrewName: "תביר",
        englishName: "Tevir",
        symbol: "֛",
        type: "מפסיק",
        description: "הפסקה קלה — משמש לחלוקה משנית של הפסוק",
      },
    ],
  },
  {
    id: "meshartim",
    title: "משרתים",
    subtitle: "Servants",
    gradient: "from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20",
    borderColor: "border-green-200 dark:border-green-800/40",
    taamim: [
      {
        id: 11,
        hebrewName: "מונח",
        englishName: "Munach",
        symbol: "֣",
        type: "משרת",
        description: "המשרת הנפוץ ביותר — מחבר מילים יחד לפני מפסיק",
      },
      {
        id: 12,
        hebrewName: "מהפך",
        englishName: "Mahpach",
        symbol: "֤",
        type: "משרת",
        description: "משרת בעל ניגון עולה — מכין את המילה הבאה",
      },
      {
        id: 13,
        hebrewName: "דרגא",
        englishName: "Darga",
        symbol: "֧",
        type: "משרת",
        description: "משרת בעל ניגון מתגלגל — מוביל אל התביר",
      },
      {
        id: 14,
        hebrewName: "קדמא",
        englishName: "Kadma",
        symbol: "֨",
        type: "משרת",
        description: "משרת הקודם למפסיק — מסמן זירוז בקריאה",
      },
    ],
  },
]

const totalTaamim = TAAM_GROUPS.reduce((sum, g) => sum + g.taamim.length, 0)

// ---------- animations ----------
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const groupVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
}

// ---------- component ----------
export default function TaamimPage() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ---- Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Breadcrumb */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-sky-600 transition-colors mb-4"
          >
            <ChevronRight className="size-3.5" />
            חזרה למרכז הלמידה
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-md">
              <Music className="size-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
              מאגר הטעמים
            </h1>
          </div>

          <p className="text-muted-foreground max-w-lg leading-relaxed">
            {totalTaamim} טעמי מקרא מחולקים ל-4 קבוצות — מהמלכים ועד המשרתים
          </p>
        </motion.div>

        {/* ---- Groups ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          {TAAM_GROUPS.map((group) => (
            <motion.div key={group.id} variants={groupVariants}>
              {/* Group header */}
              <div className={`rounded-xl bg-gradient-to-l ${group.gradient} border ${group.borderColor} px-5 py-3.5 mb-4`}>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  {group.title}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {group.subtitle} — {group.taamim.length} טעמים
                </p>
              </div>

              {/* Taam cards grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {group.taamim.map((taam) => (
                  <TaamCard key={taam.id} taam={taam} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---------- taam card ----------
function TaamCard({ taam }: { taam: Taam }) {
  return (
    <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card">
        <CardContent className="flex items-start gap-4 py-4">
          {/* Symbol */}
          <div className="flex-shrink-0 flex size-14 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/30 ring-1 ring-sky-200/60 dark:ring-sky-700/40">
            <span className="text-3xl leading-none text-sky-600 dark:text-sky-400 font-serif select-all">
              {taam.symbol}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top row: name + type badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-foreground text-base leading-snug">
                {taam.hebrewName}
              </h3>
              <Badge
                variant="secondary"
                className={`text-[10px] px-1.5 py-0 ${
                  taam.type === "מפסיק"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                }`}
              >
                {taam.type}
              </Badge>
            </div>

            {/* English name */}
            <p className="text-xs text-muted-foreground mt-0.5">
              {taam.englishName}
            </p>

            {/* Description */}
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-1">
              {taam.description}
            </p>

            {/* Bottom row: play + unlocked */}
            <div className="flex items-center gap-2 mt-2.5">
              <Button
                variant="outline"
                size="xs"
                className="gap-1 rounded-full border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-700 dark:text-sky-400 dark:hover:bg-sky-900/30"
                onClick={(e) => {
                  e.preventDefault()
                  // placeholder for audio playback
                }}
              >
                <Play className="size-3 fill-current" />
                <span>ניגון</span>
              </Button>
              <span className="inline-flex items-center gap-1 text-[11px] text-green-600 dark:text-green-400">
                <Unlock className="size-3" />
                פתוח
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
