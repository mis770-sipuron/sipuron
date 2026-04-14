"use client"

import { useState } from "react"
import { CheckCircle, Clock, Zap, TrendingUp, Shield, Rocket, ArrowLeft, ArrowUp, ArrowDown, Star, Globe, MessageSquare, BarChart3, Bot, Repeat, Megaphone, Gift, Film, Languages, Mic, CreditCard, Users, CalendarCheck, Send } from "lucide-react"
import { fmtCurrency } from "@/lib/constants"

/* ── data ──────────────────────────────────────────── */

const STATS = [
  { value: "₪227,669", label: "הכנסה נטו מיום 1" },
  { value: "x21", label: "צמיחה ב-8 חודשים" },
  { value: "944", label: "מנויים פעילים" },
  { value: "17,000", label: "חברי קהילה" },
]

type Project = {
  id: string
  name: string
  description: string
  price: number
  weeks: number
  icon: typeof Rocket
  impact: string
  replaces: string
  category: "core" | "growth" | "content" | "future"
  priority: "critical" | "high" | "medium" | "nice"
}

const ALL_PROJECTS: Project[] = [
  // CORE
  {
    id: "site",
    name: "אתר + מערכת מנויים",
    description: "מחליף Skolar. ארכיון סיפורים, player, אזור אישי, ביטול עצמי, הרשמה, referral מובנה. Supabase = single source of truth.",
    price: 12000, weeks: 6, icon: Globe, category: "core", priority: "critical",
    impact: "תשתית לכל השאר", replaces: "Skolar + Fillout + Google Sheets",
  },
  {
    id: "automation",
    name: "אוטומציית ביטול + Dunning",
    description: "ביטול אוטומטי: Cardcom + Skolar + WhatsApp קבוצה + תפוצה. Dunning: הודעה ללקוח + תזכורות. Exit survey + הפצה למחלקות.",
    price: 4000, weeks: 2, icon: Zap, category: "core", priority: "critical",
    impact: "חיסכון ~60 ביטולים שקטים/חודש", replaces: "עבודה ידנית × 3 מערכות",
  },
  {
    id: "dashboard",
    name: "דשבורד + קבוצת WhatsApp יומית",
    description: "דשבורד אוטומטי מיום 1. נתונים מ-Cardcom + Green API + Bot. התראות real-time. עדכון יומי 08:00 בקבוצה ייעודית.",
    price: 3500, weeks: 2, icon: BarChart3, category: "core", priority: "critical",
    impact: "0 החלטות מתחושת בטן", replaces: "בדיקה ידנית בכל מערכת",
  },

  // GROWTH
  {
    id: "bot",
    name: "מערכת בוט חדשה (מחליפה Chatrace)",
    description: "חיבור FB, מדידה מלאה, לינק אישי, הודעות בתשלום, עדכון לינקים אוטומטי כשנפתחת קבוצה חדשה.",
    price: 5000, weeks: 3, icon: Bot, category: "growth", priority: "high",
    impact: "Flywheel אוטומטי — לינקים מתעדכנים לבד", replaces: "Chatrace + עדכון ידני",
  },
  {
    id: "evergreen",
    name: "Evergreen Referral (בוט 24/7)",
    description: "בוט referral תמיד פתוח. פרס חודשי מתחלף. עדכון לינקים אוטומטי. שהבוט לא ייסגר בין קמפיינים.",
    price: 2500, weeks: 1, icon: Repeat, category: "growth", priority: "high",
    impact: "150-300 כניסות/חודש במקום 5", replaces: "בוט שנסגר בין קמפיינים",
  },
  {
    id: "campaign-system",
    name: "מערכת קמפיינים (לוח שנה + תבניות)",
    description: "לוח שנה שנתי 12 חודשים. תבנית מוכנה לכל סוג קמפיין. טריגרים אוטומטיים. אפס חודשים ריקים.",
    price: 3000, weeks: 2, icon: CalendarCheck, category: "growth", priority: "high",
    impact: "אפס חודשים בלי קמפיין", replaces: "תכנון ידני + שכחה",
  },
  {
    id: "campaign-flight",
    name: "קמפיין כרטיס טיסה לאירופה",
    description: "תכנון + הקמת קבוצה 19 + הגדרת בוט + גיוס שותפים עסקיים + ניהול + דוח תוצאות.",
    price: 2000, weeks: 1, icon: Megaphone, category: "growth", priority: "critical",
    impact: "500-2,000 חברים חדשים", replaces: "Flywheel עומד 6 שבועות!",
  },
  {
    id: "winback",
    name: "Win-back Campaign",
    description: "108 עוזבים + 309 לא-המירו = 417 לידים חמים. הודעת WhatsApp + מייל ממוקדת לפי סיבת עזיבה.",
    price: 1500, weeks: 1, icon: Users, category: "growth", priority: "high",
    impact: "הכנסה מיידית מלידים קיימים", replaces: "417 לידים שיושבים בלי מענה",
  },

  // CONTENT & EXPERIENCE
  {
    id: "onboarding",
    name: "פלאו ברוכים הבאים חכם",
    description: "במקום בלוק הודעה ארוכה: סדרת הודעות מפוזרות. מיידי → שעה → יום 2 → יום 7. תגובות חוזרות לתפעול.",
    price: 2000, weeks: 1, icon: Send, category: "content", priority: "high",
    impact: "חוויית כניסה טובה = retention גבוה", replaces: "בלוק טקסט מסורבל",
  },
  {
    id: "birthday",
    name: "ברכות יום הולדת אישיות",
    description: "Data כבר קיים (תאריכי לידה עבריים מ-Fillout). הקלטה אישית ממנחם + הפתעה. Premium feature.",
    price: 2500, weeks: 1, icon: Gift, category: "content", priority: "medium",
    impact: "WOW effect + upsell אפשרי", replaces: "אין — פיצ'ר חדש",
  },
  {
    id: "renewal-gift",
    name: "פינוק לפני חידוש",
    description: "Cardcom: מי מתחדש בעוד יומיים? לא שישי/שבת → שליחת סיפור בונוס / הפתעה. מפחית churn.",
    price: 1500, weeks: 1, icon: Gift, category: "content", priority: "medium",
    impact: "ירידה ב-churn סביב חידוש", replaces: "חידוש בלי שום תקשורת",
  },
  {
    id: "daily-scheduler",
    name: "שידור יומי אוטומטי",
    description: "סיפור יומי למועדון ב-17:00. סיפור שבועי ל-18 קבוצות חינמיות. הכל מתוזמן מ-Supabase.",
    price: 2000, weeks: 1, icon: Clock, category: "content", priority: "high",
    impact: "0 שידורים ידניים", replaces: "שליחה ידנית כל יום",
  },

  // FUTURE
  {
    id: "shows",
    name: "לשונית הצגות באתר",
    description: "קטלוג הצגות + צפייה + הזמנה. מכירה למוסדות (~267₪). חיבור ל-Cardcom.",
    price: 3500, weeks: 2, icon: Film, category: "future", priority: "medium",
    impact: "ערוץ הכנסה חדש", replaces: "מכירה ידנית",
  },
  {
    id: "languages",
    name: "סיפורים באנגלית + צרפתית",
    description: "2 קבוצות היכרות חדשות. תרגום/הקלטה. דף נחיתה בשפות. Flywheel בשווקים חדשים.",
    price: 4000, weeks: 3, icon: Languages, category: "future", priority: "medium",
    impact: "שוק חדש לגמרי", replaces: "עברית בלבד",
  },
  {
    id: "ai-voice",
    name: "סרטוני AI בקול מנחם (11Labs)",
    description: "Voice clone של מנחם. סרטוני הלכות שבת, בין אדם לחברו. תוכן בסקייל.",
    price: 3000, weeks: 2, icon: Mic, category: "future", priority: "nice",
    impact: "תוכן אינסופי בקול מנחם", replaces: "רק הקלטות ידניות",
  },
  {
    id: "annual-plan",
    name: "חבילה שנתית + Premium",
    description: "מנוי שנתי בהנחה. שכבת Premium: ברכות אישיות, גישה מוקדמת, סיפור מותאם.",
    price: 2000, weeks: 1, icon: CreditCard, category: "future", priority: "medium",
    impact: "LTV גבוה + הכנסה צפויה", replaces: "רק מנוי חודשי",
  },
  {
    id: "community-ads",
    name: "פרסומות בקהילה החינמית",
    description: "מערכת פרסום לקהילת 15K. שותפים עסקיים. תוכן ממומן. ערוץ הכנסה נוסף.",
    price: 2500, weeks: 2, icon: Megaphone, category: "future", priority: "nice",
    impact: "מוניטיזציה של הקהילה החינמית", replaces: "קהילה חינמית בלי הכנסה",
  },
]

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  core: { label: "תשתית ליבה", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
  growth: { label: "צמיחה", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" },
  content: { label: "תוכן וחוויה", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
  future: { label: "עתידי", color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
}

const PRIORITY_LABELS: Record<string, { label: string; color: string }> = {
  critical: { label: "קריטי", color: "text-red-600" },
  high: { label: "גבוה", color: "text-amber-600" },
  medium: { label: "בינוני", color: "text-blue-600" },
  nice: { label: "נחמד", color: "text-slate-500" },
}

const MILESTONES = [
  { target: "1,200 מנויים", bonus: 3000, icon: "🎯" },
  { target: "1,500 מנויים", bonus: 5000, icon: "🚀" },
  { target: "₪60K/חודש", bonus: 4000, icon: "💰" },
  { target: "₪80K/חודש", bonus: 6000, icon: "🔥" },
]

const ROADMAP = [
  {
    quarter: "Q2 2026 (אפריל-יוני)",
    items: [
      { name: "קמפיין כרטיס טיסה", status: "ready" },
      { name: "אוטומציית ביטול + dunning", status: "ready" },
      { name: "דשבורד + קבוצת WhatsApp", status: "ready" },
      { name: "Win-back campaign (417 לידים)", status: "ready" },
      { name: "Evergreen referral", status: "ready" },
      { name: "פלאו ברוכים הבאים חכם", status: "ready" },
    ],
  },
  {
    quarter: "Q3 2026 (יולי-ספטמבר)",
    items: [
      { name: "אתר מלא + מערכת מנויים", status: "planned" },
      { name: "מערכת בוט חדשה", status: "planned" },
      { name: "שידור יומי אוטומטי", status: "planned" },
      { name: "קמפיין חופש גדול", status: "planned" },
      { name: "ברכות יום הולדת", status: "planned" },
    ],
  },
  {
    quarter: "Q4 2026 (אוקטובר-דצמבר)",
    items: [
      { name: "לשונית הצגות + מוסדות", status: "future" },
      { name: "סיפורים באנגלית + צרפתית", status: "future" },
      { name: "AI בקול מנחם (11Labs)", status: "future" },
      { name: "חבילה שנתית + Premium", status: "future" },
      { name: "קמפיין חנוכה 2.0", status: "future" },
    ],
  },
]

const STATUS_COLORS: Record<string, string> = {
  ready: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  planned: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  future: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}
const STATUS_LABELS: Record<string, string> = { ready: "מוכן להתחלה", planned: "מתוכנן", future: "עתידי" }

/* ── helpers ────────────────────────────────────────── */

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{children}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-4">
      <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text text-transparent">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

/* ── component ─────────────────────────────────────── */

export function ProposalClient() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(ALL_PROJECTS.filter(p => p.priority === "critical").map(p => p.id)))
  const [order, setOrder] = useState<string[]>(ALL_PROJECTS.map(p => p.id))

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function moveUp(id: string) {
    setOrder(prev => {
      const idx = prev.indexOf(id)
      if (idx <= 0) return prev
      const next = [...prev]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
      return next
    })
  }

  function moveDown(id: string) {
    setOrder(prev => {
      const idx = prev.indexOf(id)
      if (idx >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
      return next
    })
  }

  const orderedProjects = order.map(id => ALL_PROJECTS.find(p => p.id === id)!).filter(Boolean)
  const selectedProjects = orderedProjects.filter(p => selected.has(p.id))
  const totalPrice = selectedProjects.reduce((s, p) => s + p.price, 0)
  const totalWeeks = selectedProjects.reduce((s, p) => s + p.weeks, 0)

  // Build WhatsApp message with selection
  const waMsg = encodeURIComponent(
    `מנחם, בחרתי את הפרויקטים הבאים:\n\n` +
    selectedProjects.map((p, i) => `${i + 1}. ${p.name} — ${fmtCurrency(p.price)}`).join("\n") +
    `\n\nסה"כ: ${fmtCurrency(totalPrice)} | ${totalWeeks} שבועות\n+ תחזוקה ₪2,000/חודש\n+ 15% ממנויים חדשים\n\nבוא נדבר!`
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-warm">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">הצעת שיתוף פעולה</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            סיפורון 2026
            <br />
            <span className="bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              מפת דרכים + הצעת מחיר
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            מ-₪2,110 ל-₪45,216 ב-8 חודשים. עכשיו הזמן לבנות את התשתית שתיקח אותנו ל-₪100K.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map(s => <Stat key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <SectionTitle subtitle="מספרים אמיתיים מ-Cardcom + Green API + Bot">איפה אנחנו עומדים</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-emerald-600">מה עובד מצוין ✅</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 10 מבצעי שיתופים — 17,000 חברים בקהילה</li>
              <li>• Conversion מ-5₪ ל-45₪: <strong>87-90%</strong></li>
              <li>• Flywheel מוכח: קמפיין → קבוצה → השקה → מנויים</li>
              <li>• 200+ סיפורים, תוכן שמוכר את עצמו</li>
              <li>• Churn ירד ל-7.3% — שיפור מתמיד</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-red-500">מה צריך לתקן 🔴</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>108 מנויים עזבו בשקט</strong> — אין מערכת dunning</li>
              <li>• <strong>309 לא המירו</strong> מ-5₪ ל-45₪</li>
              <li>• ביטול ידני ב-3 מערכות</li>
              <li>• אפריל: <strong>5 כניסות לבוט</strong> — Flywheel עומד!</li>
              <li>• אין דשבורד — החלטות מתחושת בטן</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <SectionTitle subtitle="בחר את הפרויקטים שחשובים לך. דרג לפי סדר עדיפויות. הצעת מחיר מתעדכנת בזמן אמת.">
          בחר פרויקטים ודרג
        </SectionTitle>

        <div className="space-y-3">
          {orderedProjects.map((p, idx) => {
            const Icon = p.icon
            const isSelected = selected.has(p.id)
            const cat = CATEGORY_LABELS[p.category]
            const pri = PRIORITY_LABELS[p.priority]

            return (
              <div
                key={p.id}
                className={`rounded-2xl border-2 p-4 sm:p-5 transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary/40 bg-primary/5 shadow-md"
                    : "border-transparent bg-card shadow-sm opacity-60 hover:opacity-80"
                }`}
                onClick={() => toggle(p.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Rank controls */}
                  <div className="flex flex-col items-center gap-0.5 flex-shrink-0 pt-1" onClick={e => e.stopPropagation()}>
                    <button onClick={() => moveUp(p.id)} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="הזז למעלה">
                      <ArrowUp className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <span className="text-xs font-bold text-muted-foreground w-5 text-center">{idx + 1}</span>
                    <button onClick={() => moveDown(p.id)} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="הזז למטה">
                      <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Checkbox */}
                  <div className="flex-shrink-0 pt-1">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {isSelected && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm sm:text-base">{p.name}</h3>
                      <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${cat.color}`}>{cat.label}</span>
                      <span className={`text-[10px] font-bold ${pri.color}`}>{pri.label}</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" /> {p.weeks} שב׳
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-3 text-[10px]">
                      <span className="text-emerald-600 dark:text-emerald-400"><strong>אימפקט:</strong> {p.impact}</span>
                      <span className="text-slate-500"><strong>מחליף:</strong> {p.replaces}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 text-left">
                    <div className={`text-xl sm:text-2xl font-extrabold ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                      {fmtCurrency(p.price)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sticky total */}
        <div className="sticky bottom-4 mt-8 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm opacity-90">{selectedProjects.length} פרויקטים נבחרו | ~{totalWeeks} שבועות</div>
              <div className="text-3xl sm:text-4xl font-extrabold">{fmtCurrency(totalPrice)}</div>
            </div>
            <div className="text-sm opacity-90 text-left">
              <div>+ תחזוקה {fmtCurrency(2000)}/חודש</div>
              <div>+ 15% ממנויים חדשים</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <SectionTitle subtitle="מה שקורה כל חודש — בלי קשר לפרויקטים">תחזוקה + אחוזים</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm text-center">
            <div className="text-3xl font-extrabold text-primary mb-2">{fmtCurrency(2000)}</div>
            <div className="font-bold mb-2">תחזוקה חודשית</div>
            <p className="text-xs text-muted-foreground">דשבורד יומי, אוטומציות, תקלות, עדכון לינקים, מענה לבעיות</p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm text-center">
            <div className="text-3xl font-extrabold text-primary mb-2">15%</div>
            <div className="font-bold mb-2">ממנויים חדשים</div>
            <p className="text-xs text-muted-foreground">
              רק מנויים שהצטרפו בתקופת ההסכם.
              מחודש 2 (45₪). למשך 12 חודש. מנויים ישנים = ₪0.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm text-center">
            <div className="text-3xl font-extrabold text-primary mb-2">₪0</div>
            <div className="font-bold mb-2">על מנויים ישנים</div>
            <p className="text-xs text-muted-foreground">מנויים שהצטרפו לפני ההסכם? <strong>אפס.</strong> אני מקבל רק על מה שאני מביא.</p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <SectionTitle subtitle="בונוסים חד-פעמיים כשמגיעים לאבני דרך ביחד">בונוסי צמיחה</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MILESTONES.map(m => (
            <div key={m.target} className="rounded-2xl border bg-card p-5 shadow-sm text-center">
              <div className="text-3xl mb-2">{m.icon}</div>
              <div className="font-bold text-sm mb-1">{m.target}</div>
              <div className="text-xl font-extrabold text-primary">{fmtCurrency(m.bonus)}</div>
              <div className="text-[10px] text-muted-foreground mt-1">חד-פעמי</div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <SectionTitle subtitle="3 רבעונים קדימה">מפת דרכים</SectionTitle>
        <div className="space-y-8">
          {ROADMAP.map(q => (
            <div key={q.quarter}>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ArrowLeft className="h-5 w-5 text-primary" />{q.quarter}
              </h3>
              <div className="space-y-2 mr-7">
                {q.items.map(item => (
                  <div key={item.name} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                    <CheckCircle className={`h-5 w-5 flex-shrink-0 ${item.status === "ready" ? "text-emerald-500" : item.status === "planned" ? "text-amber-500" : "text-slate-400"}`} />
                    <span className="flex-1 text-sm font-medium">{item.name}</span>
                    <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${STATUS_COLORS[item.status]}`}>{STATUS_LABELS[item.status]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          בוא נבנה את זה <span className="bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">ביחד.</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          אם יש עבודה — יש תשלום. אין עבודה — אין תשלום. שותפים לצמיחה.
        </p>
        <a
          href={`https://wa.me/972532208749?text=${waMsg}`}
          className="inline-flex items-center gap-2 bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
        >
          <Star className="h-5 w-5" />
          אני מאשר — בוא נתחיל
        </a>
      </section>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        הצעה זו חסויה ומיועדת למנחם שרון בלבד. סיפורון © 2026
      </footer>
    </div>
  )
}
