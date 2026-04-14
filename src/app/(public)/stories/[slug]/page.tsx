import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock, Lock, User, Share2, BookOpen } from "lucide-react"

// ---------- mock data (same as browse page) ----------
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

type Story = {
  id: number
  slug: string
  title: string
  description: string
  fullDescription: string
  category: string
  categorySlug: string
  duration: number
  ageMin: number
  ageMax: number
  premium: boolean
  gradient: string
  narrator: string
}

const STORIES: Story[] = [
  { id: 1, slug: "shamir-worm", title: "תולעת השמיר ובניית המקדש", description: "סיפור מרתק מהתלמוד על הנס שאפשר לבנות את בית המקדש ללא כלי ברזל.", fullDescription: "סיפור מרתק מהתלמוד על הנס שאפשר לבנות את בית המקדש ללא כלי ברזל, בעזרת תולעת קטנה וקסומה. שלמה המלך, החכם מכל אדם, ידע שאסור להשתמש בברזל — כלי מלחמה — לבניית בית השלום. אז הוא חיפש פתרון אחר. המסע המופלא לחיפוש תולעת השמיר, היצור הזעיר שיכול לחתוך אבנים בלי מגע, הוא אחד הסיפורים היפים והמסתוריים ביותר בתלמוד. סיפור על חכמה, אמונה, ונס קטן שבנה דבר גדול.", category: "סיפורי תלמוד", categorySlug: "talmud", duration: 12, ageMin: 5, ageMax: 10, premium: false, gradient: GRADIENTS[0], narrator: "מנחם שרון" },
  { id: 2, slug: "silence-that-taught", title: "השקט שלימד להקשיב", description: "סיפור חג מיוחד על ילד שגילה שדווקא ברגעי השקט אפשר לשמוע את הדברים הכי חשובים.", fullDescription: "סיפור חג מיוחד על ילד שגילה שדווקא ברגעי השקט אפשר לשמוע את הדברים הכי חשובים. בליל חג שקט, כשכל המשפחה ישנה, דני יצא לחצר ושמע קולות שלא שמע קודם — רוח בין העצים, ציפורי לילה, ולחישה חמה מהלב. סיפור על הקשבה, על רגעים קטנים שהופכים גדולים, ועל הקסם שמתגלה כשעוצרים לרגע ופשוט שומעים.", category: "חגים ומועדים", categorySlug: "holidays", duration: 8, ageMin: 4, ageMax: 8, premium: false, gradient: GRADIENTS[1], narrator: "מנחם שרון" },
  { id: 3, slug: "mushka-magic-garden", title: "מושקה והגן הקסום", description: "מושקה מגלה גן סודי מלא פרחים מדברים ופרפרים צבעוניים.", fullDescription: "מושקה מגלה גן סודי מלא פרחים מדברים ופרפרים צבעוניים, ולומדת על חשיבות השמירה על הטבע. מאחורי הגדר הישנה של בית סבתא, מושקה מוצאת שביל סודי שמוביל לגן הכי מיוחד בעולם. שם הפרחים מספרים סיפורים, הפרפרים שרים, והעצים זוכרים הכל. אבל הגן צריך עזרה — ומושקה מגלה שלפעמים הדרך הכי טובה לקבל היא לתת.", category: "סדרת מושקה", categorySlug: "mushka-series", duration: 15, ageMin: 3, ageMax: 7, premium: true, gradient: GRADIENTS[2], narrator: "מנחם שרון" },
  { id: 4, slug: "lion-and-ant", title: "האריה והנמלה", description: "משל מרגש על אריה גדול וחזק שלמד מנמלה קטנטנה.", fullDescription: "משל מרגש על אריה גדול וחזק שלמד מנמלה קטנטנה שגודל אינו קובע — רק המעשים. האריה הגדול, מלך כל החיות, צחק על הנמלה הזעירה. ״מה את יכולה לעשות?״ שאל. אבל כשהאריה נלכד ברשת ציידים, דווקא הנמלה הקטנה הצילה אותו. סיפור על ענווה, על כבוד לכל בריה, ועל הכוח הגדול שמתחבא בקטנות.", category: "ערכים ומידות", categorySlug: "values", duration: 10, ageMin: 4, ageMax: 8, premium: true, gradient: GRADIENTS[3], narrator: "מנחם שרון" },
  { id: 5, slug: "rabbi-akiva-rachel", title: "רבי עקיבא ורחל", description: "סיפורם המרגש של רבי עקיבא ורחל — על אהבה, מסירות ואמונה.", fullDescription: "סיפורם המרגש של רבי עקיבא ורחל — על אהבה, מסירות ואמונה שהפכו רועה צאן לגדול הדור. רחל, בתו של כלבא שבוע, ראתה ברועה הפשוט ניצוץ מיוחד. היא האמינה בו כשאף אחד לא האמין, חיכתה עשרים וארבע שנה, וויתרה על הכל. הסיפור של שניהם הוא אחד הסיפורים היפים ביותר על כוחה של אמונה וכוחו של חלום.", category: "סיפורי צדיקים", categorySlug: "tzadikim", duration: 18, ageMin: 6, ageMax: 12, premium: true, gradient: GRADIENTS[4], narrator: "מנחם שרון" },
  { id: 6, slug: "sukkah-adventure", title: "הרפתקה בסוכה", description: "בלילה החשוך של סוכות, שני ילדים יוצאים להרפתקה מפתיעה בסוכה.", fullDescription: "בלילה החשוך של סוכות, שני ילדים יוצאים להרפתקה מפתיעה בסוכה — ופוגשים אורחים מיוחדים. כשאבא ואמא נרדמו, יעל ואלי שמעו רחשים מוזרים מהסוכה. הם יצאו בזהירות, ומה שמצאו שם שינה להם את החג לנצח. סיפור חם ומלא קסם על אושפיזין, על אמונה, ועל הלילה המיוחד שבו הסוכה הפכה לשער לעולם אחר.", category: "חגים ומועדים", categorySlug: "holidays", duration: 12, ageMin: 3, ageMax: 7, premium: false, gradient: GRADIENTS[5], narrator: "מנחם שרון" },
  { id: 7, slug: "arthur-lost-key", title: "ארתור והמפתח האבוד", description: "ארתור האריה יוצא למסע מרתק כדי למצוא מפתח עתיק שנעלם.", fullDescription: "ארתור האריה יוצא למסע מרתק כדי למצוא מפתח עתיק שנעלם — ומגלה שהאוצר האמיתי היה במסע עצמו. דרך יערות חשוכים, מעל הרים גבוהים ומתחת לנהרות עמוקים, ארתור מחפש את המפתח שסבא שלו השאיר. בדרך הוא פוגש חברים חדשים, מתגבר על פחדים, ומבין שהמפתח האמיתי לאושר — הוא בתוכנו.", category: "סדרת ארתור", categorySlug: "arthur-series", duration: 20, ageMin: 5, ageMax: 10, premium: true, gradient: GRADIENTS[6], narrator: "מנחם שרון" },
  { id: 8, slug: "baal-shem-tov-child", title: "הבעל שם טוב והילד", description: "סיפור חסידי נפלא על הבעש\"ט שפגש ילד עני ברחוב.", fullDescription: "סיפור חסידי נפלא על הבעש\"ט שפגש ילד עני ברחוב — ושינה את חייו בדרך שלא ציפה לה. הבעל שם טוב הלך ברחוב וראה ילד קטן בוכה. הילד היה רעב, לבד, ופוחד. מה שקרה אחר כך הוא סיפור על חסד, על אור פנימי, ועל הנס שקורה כשאדם גדול מתכופף לילד קטן ואומר: ״אני רואה אותך.״", category: "סיפורי חסידים", categorySlug: "hasidim", duration: 14, ageMin: 5, ageMax: 10, premium: true, gradient: GRADIENTS[7], narrator: "מנחם שרון" },
  { id: 9, slug: "parashat-bereshit", title: "סיפור לפרשת בראשית", description: "מעשה בראשית מסופר בצורה קסומה ומרגשת.", fullDescription: "מעשה בראשית מסופר בצורה קסומה ומרגשת — איך נברא העולם בשבעה ימים מופלאים. ביום הראשון היה חושך, ואז אמר הקב\"ה: ״יהי אור!״ — ופתאום הכל האיר. יום אחרי יום, פלא אחרי פלא, העולם התמלא בצבעים, בחיים, ובקסם. עד שהגיע היום השביעי — יום המנוחה, יום השבת, הכתר של הבריאה.", category: "פרשת שבוע", categorySlug: "parashat-shavua", duration: 11, ageMin: 4, ageMax: 8, premium: true, gradient: GRADIENTS[8], narrator: "מנחם שרון" },
  { id: 10, slug: "yossi-dream", title: "החלום של יוסי", description: "יוסי הקטן עוצם עיניים ונכנס לחלום מופלא.", fullDescription: "יוסי הקטן עוצם עיניים ונכנס לחלום מופלא — מלא כוכבים, עננים רכים, והפתעה מתוקה בסוף. יוסי טס על ענן כותנה, רוכב על קשת בענן, ומשחק עם כוכבים שמספרים לו סודות. סיפור שינה מתוק ורגוע שמלווה את הילדים אל תוך חלומות טובים, עם מוזיקה עדינה ודמויות חמות.", category: "לפני השינה", categorySlug: "bedtime", duration: 8, ageMin: 2, ageMax: 5, premium: false, gradient: GRADIENTS[9], narrator: "מנחם שרון" },
  { id: 11, slug: "little-hero", title: "הגיבור הקטן", description: "הרפתקה מסעירה של ילד רגיל שגילה שגיבורים אמיתיים לא צריכים כוחות על.", fullDescription: "הרפתקה מסעירה של ילד רגיל שגילה שגיבורים אמיתיים לא צריכים כוחות על — רק לב אמיץ. דניאל חלם להיות גיבור-על, עם גלימה ומסכה. אבל ביום שבו השכנה הזקנה נפלה, חתול נתקע על עץ, וילדה קטנה אבדה בפארק — דניאל גילה שגיבורים אמיתיים פשוט עוזרים. בלי כוחות-על. בלי גלימה. רק עם לב.", category: "הרפתקאות", categorySlug: "adventures", duration: 16, ageMin: 6, ageMax: 10, premium: true, gradient: GRADIENTS[10], narrator: "מנחם שרון" },
  { id: 12, slug: "mushka-at-school", title: "מושקה בבית הספר", description: "יום ראשון בבית הספר! מושקה מתרגשת, קצת מפחדת.", fullDescription: "יום ראשון בבית הספר! מושקה מתרגשת, קצת מפחדת, ומגלה שחברות חדשה יכולה לצמוח במקומות לא צפויים. התיק החדש על הגב, שמלה חדשה, ובטן מלאה פרפרים. מושקה נכנסת לכיתה ולא מכירה אף אחד. אבל אז היא שמה לב לילדה אחת שיושבת לבד בפינה... סיפור חם על יום ראשון, על פחד ואומץ, ועל החיבור הראשון שהופך את הכל.", category: "סדרת מושקה", categorySlug: "mushka-series", duration: 13, ageMin: 4, ageMax: 8, premium: true, gradient: GRADIENTS[11], narrator: "מנחם שרון" },
]

// ---------- page component ----------
export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = STORIES.find((s) => s.slug === slug) || STORIES[0]

  // pick 3 related stories from same category (excluding current), pad with random
  const related = STORIES.filter(
    (s) => s.id !== story.id && s.categorySlug === story.categorySlug
  ).slice(0, 3)
  while (related.length < 3) {
    const candidate = STORIES.find(
      (s) => s.id !== story.id && !related.some((r) => r.id === s.id)
    )
    if (candidate) related.push(candidate)
    else break
  }

  const whatsappText = encodeURIComponent(
    `שמעו את הסיפור "${story.title}" בסיפורון!\nhttps://sipuron.org/stories/${story.slug}`
  )

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/40 to-background dark:from-slate-900 dark:to-background min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/stories" className="hover:text-amber-600 transition-colors">
            מאגר הסיפורים
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{story.title}</span>
        </nav>

        {/* cover */}
        <div
          className={`relative aspect-[16/8] rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center shadow-xl mb-8`}
        >
          <div className="size-20 sm:size-24 rounded-full bg-amber-500/90 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Play className="size-10 sm:size-12 text-white fill-white ms-1" />
          </div>

          {story.premium && (
            <div className="absolute top-4 start-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <Lock className="size-3.5" />
              פרימיום
            </div>
          )}
        </div>

        {/* title */}
        <h1 className="text-3xl font-extrabold text-foreground mb-4">
          {story.title}
        </h1>

        {/* metadata row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant="secondary" className="gap-1">
            <Clock className="size-3.5" />
            {story.duration} דק׳
          </Badge>
          <Badge variant="outline">
            גילאי {story.ageMin}-{story.ageMax}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <BookOpen className="size-3.5" />
            {story.category}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <User className="size-3.5" />
            {story.narrator}
          </Badge>
        </div>

        {/* description */}
        <p className="text-muted-foreground leading-relaxed text-lg mb-8 max-w-2xl">
          {story.fullDescription}
        </p>

        {/* action buttons */}
        <div className="flex flex-wrap gap-3 mb-16">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-12 px-8 text-base rounded-xl shadow-lg shadow-amber-500/20">
            <Play className="size-5 fill-white" />
            האזינו עכשיו
          </Button>
          <Button
            variant="outline"
            className="gap-2 h-12 px-6 rounded-xl"
            asChild
          >
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Share2 className="size-4" />
              שתפו בוואטסאפ
            </a>
          </Button>
        </div>

        {/* related stories */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            סיפורים דומים
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.id} href={`/stories/${r.slug}`}>
                <div className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 bg-card border border-border/50">
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${r.gradient} flex items-center justify-center`}
                  >
                    <div className="size-10 rounded-full bg-amber-500/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="size-4 text-white fill-white ms-0.5" />
                    </div>
                    {r.premium && (
                      <div className="absolute top-2 start-2 size-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <Lock className="size-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-foreground mb-1 line-clamp-1">
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <Clock className="size-3" />
                        {r.duration} דק׳
                      </span>
                      <span>{r.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
