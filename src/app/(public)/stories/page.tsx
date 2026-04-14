"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Clock, Lock, Search, Filter } from "lucide-react"
import { STORY_CATEGORIES } from "@/lib/constants"

// ---------- types ----------
type Story = {
  id: number
  slug: string
  title: string
  description: string
  category: string
  categorySlug: string
  duration: number
  ageMin: number
  ageMax: number
  premium: boolean
  gradient: string
}

// ---------- mock data ----------
const GRADIENTS = [
  "from-amber-300 to-orange-500",
  "from-rose-300 to-pink-500",
  "from-violet-300 to-purple-500",
  "from-sky-300 to-blue-500",
  "from-emerald-300 to-teal-500",
  "from-amber-400 to-red-400",
  "from-orange-300 to-amber-500",
  "from-fuchsia-300 to-rose-500",
  "from-indigo-300 to-violet-500",
  "from-yellow-300 to-amber-500",
  "from-lime-300 to-emerald-500",
  "from-cyan-300 to-sky-500",
]

const STORIES: Story[] = [
  { id: 1, slug: "shamir-worm", title: "תולעת השמיר ובניית המקדש", description: "סיפור מרתק מהתלמוד על הנס שאפשר לבנות את בית המקדש ללא כלי ברזל, בעזרת תולעת קטנה וקסומה.", category: "סיפורי תלמוד", categorySlug: "talmud", duration: 12, ageMin: 5, ageMax: 10, premium: false, gradient: GRADIENTS[0] },
  { id: 2, slug: "silence-that-taught", title: "השקט שלימד להקשיב", description: "סיפור חג מיוחד על ילד שגילה שדווקא ברגעי השקט אפשר לשמוע את הדברים הכי חשובים.", category: "חגים ומועדים", categorySlug: "holidays", duration: 8, ageMin: 4, ageMax: 8, premium: false, gradient: GRADIENTS[1] },
  { id: 3, slug: "mushka-magic-garden", title: "מושקה והגן הקסום", description: "מושקה מגלה גן סודי מלא פרחים מדברים ופרפרים צבעוניים, ולומדת על חשיבות השמירה על הטבע.", category: "סדרת מושקה", categorySlug: "mushka-series", duration: 15, ageMin: 3, ageMax: 7, premium: true, gradient: GRADIENTS[2] },
  { id: 4, slug: "lion-and-ant", title: "האריה והנמלה", description: "משל מרגש על אריה גדול וחזק שלמד מנמלה קטנטנה שגודל אינו קובע — רק המעשים.", category: "ערכים ומידות", categorySlug: "values", duration: 10, ageMin: 4, ageMax: 8, premium: true, gradient: GRADIENTS[3] },
  { id: 5, slug: "rabbi-akiva-rachel", title: "רבי עקיבא ורחל", description: "סיפורם המרגש של רבי עקיבא ורחל — על אהבה, מסירות ואמונה שהפכו רועה צאן לגדול הדור.", category: "סיפורי צדיקים", categorySlug: "tzadikim", duration: 18, ageMin: 6, ageMax: 12, premium: true, gradient: GRADIENTS[4] },
  { id: 6, slug: "sukkah-adventure", title: "הרפתקה בסוכה", description: "בלילה החשוך של סוכות, שני ילדים יוצאים להרפתקה מפתיעה בסוכה — ופוגשים אורחים מיוחדים.", category: "חגים ומועדים", categorySlug: "holidays", duration: 12, ageMin: 3, ageMax: 7, premium: false, gradient: GRADIENTS[5] },
  { id: 7, slug: "arthur-lost-key", title: "ארתור והמפתח האבוד", description: "ארתור האריה יוצא למסע מרתק כדי למצוא מפתח עתיק שנעלם — ומגלה שהאוצר האמיתי היה במסע עצמו.", category: "סדרת ארתור", categorySlug: "arthur-series", duration: 20, ageMin: 5, ageMax: 10, premium: true, gradient: GRADIENTS[6] },
  { id: 8, slug: "baal-shem-tov-child", title: "הבעל שם טוב והילד", description: "סיפור חסידי נפלא על הבעש\"ט שפגש ילד עני ברחוב — ושינה את חייו בדרך שלא ציפה לה.", category: "סיפורי חסידים", categorySlug: "hasidim", duration: 14, ageMin: 5, ageMax: 10, premium: true, gradient: GRADIENTS[7] },
  { id: 9, slug: "parashat-bereshit", title: "סיפור לפרשת בראשית", description: "מעשה בראשית מסופר בצורה קסומה ומרגשת — איך נברא העולם בשבעה ימים מופלאים.", category: "פרשת שבוע", categorySlug: "parashat-shavua", duration: 11, ageMin: 4, ageMax: 8, premium: true, gradient: GRADIENTS[8] },
  { id: 10, slug: "yossi-dream", title: "החלום של יוסי", description: "יוסי הקטן עוצם עיניים ונכנס לחלום מופלא — מלא כוכבים, עננים רכים, והפתעה מתוקה בסוף.", category: "לפני השינה", categorySlug: "bedtime", duration: 8, ageMin: 2, ageMax: 5, premium: false, gradient: GRADIENTS[9] },
  { id: 11, slug: "little-hero", title: "הגיבור הקטן", description: "הרפתקה מסעירה של ילד רגיל שגילה שגיבורים אמיתיים לא צריכים כוחות על — רק לב אמיץ.", category: "הרפתקאות", categorySlug: "adventures", duration: 16, ageMin: 6, ageMax: 10, premium: true, gradient: GRADIENTS[10] },
  { id: 12, slug: "mushka-at-school", title: "מושקה בבית הספר", description: "יום ראשון בבית הספר! מושקה מתרגשת, קצת מפחדת, ומגלה שחברות חדשה יכולה לצמוח במקומות לא צפויים.", category: "סדרת מושקה", categorySlug: "mushka-series", duration: 13, ageMin: 4, ageMax: 8, premium: true, gradient: GRADIENTS[11] },
]

const AGE_RANGES = [
  { label: "2-4", min: 2, max: 4 },
  { label: "4-6", min: 4, max: 6 },
  { label: "6-8", min: 6, max: 8 },
  { label: "8-10", min: 8, max: 10 },
  { label: "10-13", min: 10, max: 13 },
  { label: "הכל", min: 0, max: 99 },
]

const SORT_OPTIONS = [
  { label: "חדשים", value: "new" },
  { label: "פופולריים", value: "popular" },
  { label: "משך", value: "duration" },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]["value"]

// ---------- component ----------
export default function StoriesPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeAge, setActiveAge] = useState<string>("הכל")
  const [sort, setSort] = useState<SortValue>("new")

  const filtered = useMemo(() => {
    let result = STORIES

    // search
    if (search.trim()) {
      const q = search.trim()
      result = result.filter(
        (s) => s.title.includes(q) || s.description.includes(q) || s.category.includes(q)
      )
    }

    // category
    if (activeCategory) {
      result = result.filter((s) => s.categorySlug === activeCategory)
    }

    // age
    const ageRange = AGE_RANGES.find((a) => a.label === activeAge)
    if (ageRange && ageRange.label !== "הכל") {
      result = result.filter(
        (s) => s.ageMin <= ageRange.max && s.ageMax >= ageRange.min
      )
    }

    // sort
    if (sort === "duration") {
      result = [...result].sort((a, b) => a.duration - b.duration)
    } else if (sort === "popular") {
      result = [...result].sort((a, b) => b.id - a.id) // mock popularity
    }

    return result
  }, [search, activeCategory, activeAge, sort])

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/40 to-background dark:from-slate-900 dark:to-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ---- header ---- */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            מאגר הסיפורים
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            200+ סיפורים מחולקים לקטגוריות — תמיד תמצאו מה להאזין
          </p>

          {/* search */}
          <div className="relative mt-6 mx-auto w-full max-w-md">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="חפשו סיפור..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9 h-10 rounded-full border-amber-200 focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
            />
          </div>
        </div>

        {/* ---- category pills ---- */}
        <div className="mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2 w-max">
            <button
              onClick={() => setActiveCategory(null)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                activeCategory === null
                  ? "bg-amber-500 text-white border-amber-500 shadow-md"
                  : "bg-card border-border hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30"
              }`}
            >
              הכל
            </button>
            {STORY_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() =>
                  setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
                }
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                  activeCategory === cat.slug
                    ? "bg-amber-500 text-white border-amber-500 shadow-md"
                    : "bg-card border-border hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---- filter bar ---- */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* age */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="size-4 text-muted-foreground" />
            {AGE_RANGES.map((age) => (
              <button
                key={age.label}
                onClick={() => setActiveAge(age.label)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                  activeAge === age.label
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-card border-border hover:border-amber-300"
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>

          {/* sort */}
          <div className="flex items-center gap-1.5 me-auto">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                  sort === opt.value
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card border-border hover:border-foreground/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---- story grid ---- */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">לא נמצאו סיפורים מתאימים</p>
            <p className="text-sm mt-1">נסו לשנות את הסינון או לחפש מילה אחרת</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ---------- story card ----------
function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.slug}`}>
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer bg-card">
        {/* cover */}
        <div
          className={`relative aspect-[16/10] bg-gradient-to-br ${story.gradient} flex items-center justify-center`}
        >
          {/* play button */}
          <div className="size-14 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play className="size-6 text-white fill-white ms-0.5" />
          </div>

          {/* lock */}
          {story.premium && (
            <div className="absolute top-3 start-3 size-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Lock className="size-3.5 text-white" />
            </div>
          )}
        </div>

        <CardContent className="pt-3 pb-4 space-y-2">
          <h3 className="font-bold text-foreground leading-snug">{story.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {story.description}
          </p>

          {/* bottom row */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <Badge variant="secondary" className="gap-1 text-xs">
              <Clock className="size-3" />
              {story.duration} דק׳
            </Badge>
            <Badge variant="outline" className="text-xs">
              {story.ageMin}-{story.ageMax}
            </Badge>
            <Badge variant="ghost" className="text-xs">
              {story.category}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
