"use client"

import { useState, useRef, useCallback } from "react"
import {
  CheckCircle, Clock, Zap, TrendingUp, Rocket, ArrowLeft, ArrowDown,
  Star, Globe, BarChart3, Bot, Repeat, Megaphone, Gift, Film,
  Languages, Mic, CreditCard, Users, CalendarCheck, Send,
  GripVertical, ChevronDown, ChevronUp, Heart, Phone, Shield,
  AlertTriangle, TrendingDown, Sparkles, Gamepad2, X, Check,
  Wrench, MessageCircle, RefreshCw, Link, FileBarChart, Database,
  MonitorSmartphone, BookOpen,
} from "lucide-react"
import { fmtCurrency } from "@/lib/constants"

/* ── types & data ──────────────────────────────────── */

const DISCOUNT = 0.30

type Project = {
  id: string
  name: string
  subtitle: string
  description: string
  whyNow: string
  originalPrice: number
  weeks: number
  icon: typeof Rocket
  impact: string
  replaces: string
  category: "core" | "growth" | "content" | "future" | "special"
}

const ALL_PROJECTS: Project[] = [
  // ── Core Infrastructure ──
  {
    id: "site",
    name: "אתר + מערכת מנויים",
    subtitle: "פלטפורמה אחת במקום 5 כלים. פשוט.",
    description: "אתר סיפורון מלא: ארכיון 200+ סיפורים עם נגן, אזור אישי למנויים (סטטוס, תשלומים, ביטול עצמי), דף הרשמה עם הפניות מובנה. Supabase = מקום אחד לכל המידע. סנכרון דו-כיווני עם Cardcom + Green API.",
    whyNow: "Skolar + Google Sheets + Fillout = 3 מערכות שלא מדברות אחת עם השנייה. כל שינוי = עבודה ידנית ב-3 מקומות. חד משמעית לא יחזיק.",
    originalPrice: 12000, weeks: 6, icon: Globe, category: "core",
    impact: "תשתית לכל השאר", replaces: "Skolar + Fillout + Google Sheets",
  },
  {
    id: "automation",
    name: "אוטומציית ביטול + טיפול בתשלומים כושלים",
    subtitle: "108 מנויים עזבו בשקט. בלי שידענו. בלי שנלחמנו על אף אחד.",
    description: "מערכת אוטומטית שמטפלת בכל ביטול: קריאת Gmail של מנחם → ביטול ב-Cardcom + WhatsApp קבוצה + תפוצה → הודעת פרידה עם סקר סיבה → שמירה ב-Supabase → הפצה למחלקות. כולל טיפול באשראי כושל: כשכרטיס אשראי לא עובר → הודעה למנוי → תזכורת אחרי 3 ימים → סימון אחרי 7.",
    whyNow: "כל חודש 40-70 אנשים מפסיקים לשלם בשקט. אין סקר יציאה, אין טיפול באשראי כושל, אין ניסיון להחזיר. כסף שזורם החוצה.",
    originalPrice: 4000, weeks: 2, icon: Zap, category: "core",
    impact: "עוצרים ~60 ביטולים שקטים בחודש", replaces: "עבודה ידנית × 3 מערכות",
  },
  {
    id: "dashboard",
    name: "דשבורד + קבוצת WhatsApp יומית",
    subtitle: "עסק של ₪45K בלי לדעת מה קורה בו. תכלס, זה חייב להשתנות.",
    description: "דשבורד אוטומטי עם כל הנתונים מיום 1: הכנסות מ-Cardcom, כניסות מהבוט, גדלי קבוצות מ-Green API. התראות על כשלי אשראי, נטישה, ו-מנוע השיתופים שנעצר. כל בוקר ב-08:00 — סיכום יומי נשלח לקבוצת WhatsApp ייעודית דרך Green API.",
    whyNow: "בשביל לקבל את הנתונים שהצגתי לך — הייתי צריך לשלוף ידנית מ-3 APIs שונים. עם דשבורד, זה יגיע לבד כל בוקר.",
    originalPrice: 3500, weeks: 2, icon: BarChart3, category: "core",
    impact: "0 החלטות מתחושת בטן", replaces: "בדיקה ידנית בכל מערכת",
  },

  // ── Growth ──
  {
    id: "campaign-flight",
    name: "קמפיין כרטיס טיסה לאירופה",
    subtitle: "ה-מנוע השיתופים עומד כבר 6 שבועות. בוא נתניע.",
    description: "תכנון מלא של קמפיין שיתופים: פתיחת קבוצה 19, הגדרת בוט עם לינק אישי, גיוס שותפים עסקיים לפרסים, ניהול הקמפיין, ודוח תוצאות מפורט.",
    whyNow: "באפריל נכנסו רק 5 אנשים לבוט. בקמפיין תשעה באב נכנסו 2,752. ההבדל = קמפיין.",
    originalPrice: 2000, weeks: 1, icon: Megaphone, category: "growth",
    impact: "500-2,000 משפחות חדשות", replaces: "מנוע השיתופים עומד",
  },
  {
    id: "bot",
    name: "מערכת בוט חדשה (מחליפה Chatrace)",
    subtitle: "בוט שמודד, מחובר לפייסבוק, ומעדכן לינקים לבד.",
    description: "מערכת בוט מלאה: חיבור לפייסבוק, לינק אישי לכל חבר, מדידה מלאה (מי הפנה, כמה נרשמו), הודעות בתשלום כשצריך. כשנפתחת קבוצה חדשה — כל הלינקים בכל ההודעות מתעדכנים אוטומטית.",
    whyNow: "Chatrace לא נותנת מדידה מספיקה ואין עדכון לינקים אוטומטי. כל קבוצה חדשה = עדכון ידני בעשרות מקומות.",
    originalPrice: 5000, weeks: 3, icon: Bot, category: "growth",
    impact: "הלינקים מתעדכנים לבד", replaces: "Chatrace + עדכון ידני",
  },
  {
    id: "evergreen",
    name: "בוט שיתופים קבוע — בוט שלא נסגר",
    subtitle: "היום הבוט סגור בין קמפיינים. 5 כניסות ביום. לדעתי זה בזבוז.",
    description: "בוט הפניות שפתוח 24/7, כל חודש עם פרס אחר. כל חבר בקהילה יכול תמיד לשתף ולהרוויח. כשנפתחת קבוצה חדשה — הלינקים מתעדכנים אוטומטית בכל מקום.",
    whyNow: "בין קמפיינים — 5 כניסות ביום. עם בוט קבוע — 150-300. ההבדל = ₪0 השקעה, רק שהבוט פתוח.",
    originalPrice: 2500, weeks: 1, icon: Repeat, category: "growth",
    impact: "150-300 כניסות/חודש במקום 5", replaces: "בוט שנסגר בין קמפיינים",
  },
  {
    id: "campaign-system",
    name: "מערכת קמפיינים + לוח שנה",
    subtitle: "12 חודשים מתוכננים מראש. אפס חודשים ריקים.",
    description: "לוח שנה שנתי שמתואם לחגים יהודיים (חופש גדול, תשרי, חנוכה, פורים). תבנית מוכנה לכל סוג קמפיין (A-E). טריגרים אוטומטיים: קבוצה בשלה? התראה. אין קמפיין מתוכנן? התראה.",
    whyNow: "הקמפיינים עד היום היו ספונטניים. לפעמים 7 קבוצות בחודש, לפעמים 0. צריך מערכת שלא שוכחת.",
    originalPrice: 3000, weeks: 2, icon: CalendarCheck, category: "growth",
    impact: "אפס חודשים בלי קמפיין", replaces: "תכנון ידני",
  },
  {
    id: "winback",
    name: "החזרת מנויים — להחזיר את מי שעזב",
    subtitle: "417 אנשים ששילמו לנו ונעלמו. יש לנו את הטלפון שלהם.",
    description: "108 מנויים שעזבו אחרי ששילמו 45₪ + 309 שלא המירו מ-5₪. לכל אחד יש שם, טלפון, ומייל מ-Cardcom. נשלח הודעת WhatsApp אישית ממוקדת: מי שעזב בגלל מחיר → הצעה מיוחדת. מי שלא המיר → תזכורת עם סיפור טעימה.",
    whyNow: "המשפחות האלה כבר הכירו את סיפורון. כל יום שעובר = פחות סיכוי להחזיר אותם.",
    originalPrice: 1500, weeks: 1, icon: Users, category: "growth",
    impact: "הכנסה מיידית ממשפחות קיימות", replaces: "417 משפחות שיושבות",
  },

  // ── Content & Experience ──
  {
    id: "onboarding",
    name: "פלאו ברוכים הבאים חכם",
    subtitle: "במקום בלוק טקסט ענק — סדרת הודעות שבונה חיבור.",
    description: "מנוי חדש מקבל סדרת הודעות מפוזרות: מיידי → הסיפור הראשון (אחרי שעה) → טיפ ליום 2 → שאלה ביום 7. תגובות חוזרות למערכת. חוויית כניסה שמרגישה אישית.",
    whyNow: "37% מהעוזבים עוזבים אחרי חודש 1. חוויית כניסה טובה = הסיכוי הכי גדול לשמור אותם.",
    originalPrice: 2000, weeks: 1, icon: Send, category: "content",
    impact: "פחות עוזבים בחודש הראשון", replaces: "בלוק טקסט מסורבל",
  },
  {
    id: "birthday",
    name: "ברכות יום הולדת אישיות",
    subtitle: "תאריכי לידה עבריים כבר קיימים מ-Fillout. רק צריך לחבר את זה.",
    description: "כל ילד של מנוי מקבל ברכת יום הולדת אישית: הקלטה מיוחדת ממנחם + הפתעה. אפקט וואו שגורם להורים לשתף. אפשרות לפיצ׳ר בתשלום.",
    whyNow: "הנתונים קיימים — רק צריך לבנות את האוטומציה. השקעה קטנה, תוצאה גדול.",
    originalPrice: 2500, weeks: 1, icon: Gift, category: "content",
    impact: "הורים ישתפו מעצמם", replaces: "אין — דבר חדש",
  },
  {
    id: "renewal-gift",
    name: "פינוק לפני חידוש מנוי",
    subtitle: "יומיים לפני שיורד החיוב — הפתעה קטנה. פשוט עובד.",
    description: "Cardcom API: מי מתחדש בעוד יומיים? אם לא שישי/שבת → שליחת סיפור בונוס או הפתעה. המנוי מרגיש שחושבים עליו בדיוק ברגע שהוא שוקל לבטל.",
    whyNow: "הרבה ביטולים קורים סביב תאריך החידוש. פינוק קטן = ההבדל בין להישאר לעזוב.",
    originalPrice: 1500, weeks: 1, icon: Heart, category: "content",
    impact: "פחות ביטולים סביב חידוש", replaces: "חידוש בלי שום תקשורת",
  },
  {
    id: "daily-scheduler",
    name: "שידור יומי אוטומטי",
    subtitle: "סיפור כל יום ב-17:00, בלי שמישהו ילחץ ׳שלח׳. המערכת עושה הכל.",
    description: "מערכת שידור: סיפור יומי למועדון ב-17:00 + סיפור שבועי ל-18 קבוצות חינמיות. הכל מתוזמן מ-Supabase. מנחם מעלה סיפור → המערכת שולחת בזמן הנכון לכל המשפחות.",
    whyNow: "שידור ידני לכל הקבוצות = זמן שמנחם צריך לסיפורים. שכחה = יום בלי סיפור.",
    originalPrice: 2000, weeks: 1, icon: Clock, category: "content",
    impact: "0 שידורים ידניים", replaces: "שליחה ידנית כל יום",
  },

  // ── Future / Expansion ──
  {
    id: "shows",
    name: "לשונית הצגות באתר",
    subtitle: "הצגות באתר — צפייה + מכירה לגנים ומוסדות.",
    description: "קטלוג הצגות באתר: צפייה אונליין, הזמנה להצגה חיה. מכירה לגנים ומוסדות (~267₪ להצגה). חיבור ל-Cardcom לתשלום.",
    whyNow: "מנחם כבר מופיע בהצגות. המכירה ידנית. אתר = להגיע לעוד מוסדות.",
    originalPrice: 3500, weeks: 2, icon: Film, category: "future",
    impact: "ערוץ הכנסה חדש", replaces: "מכירה ידנית",
  },
  {
    id: "languages",
    name: "סיפורים באנגלית + צרפתית",
    subtitle: "2 שווקים חדשים לגמרי. אותו מודל, שפה אחרת.",
    description: "פתיחת 2 קבוצות היכרות בשפות חדשות. תרגום/הקלטה של סיפורים נבחרים. דף נחיתה בשפה. אותו מנוע השיתופים — שוק חדש.",
    whyNow: "מנחם הציע את זה ב-13.4. יש ביקוש מהקהילות בחו\"ל.",
    originalPrice: 4000, weeks: 3, icon: Languages, category: "future",
    impact: "שוק חדש", replaces: "עברית בלבד",
  },
  {
    id: "ai-voice",
    name: "AI בקול מנחם (11Labs)",
    subtitle: "סיפורים ותכנים בלי שמנחם ישב מול מיקרופון כל היום.",
    description: "שכפול קול של מנחם ב-11Labs. סרטוני הלכות שבת, בין אדם לחברו, תוכן חינוכי. מנחם מאשר את התוכן, המערכת מייצרת.",
    whyNow: "מנחם לא יכול להקליט 24 שעות ביום. עם שכפול קול — הסיפורים ממשיכים גם כשהוא לא מול המיקרופון.",
    originalPrice: 3000, weeks: 2, icon: Mic, category: "future",
    impact: "סיפורים בלי הגבלה", replaces: "רק הקלטות ידניות",
  },
  {
    id: "annual-plan",
    name: "חבילה שנתית + מסלול מיוחד",
    subtitle: "מנויים שנשארים יותר. הכנסה צפויה יותר. יציבות.",
    description: "מנוי שנתי בהנחה (₪478 במקום ₪540). מסלול מיוחד למנויים וותיקים: ברכות אישיות, גישה מוקדמת לסיפורים חדשים, סיפור מותאם אישית.",
    whyNow: "יש 944 מנויים פעילים. אם 20% עוברים לשנתי = ₪90K מובטחים. יציבות בעזרת ה׳.",
    originalPrice: 2000, weeks: 1, icon: CreditCard, category: "future",
    impact: "מנויים שנשארים + הכנסה יציבה", replaces: "רק מנוי חודשי",
  },
  {
    id: "community-ads",
    name: "מוניטיזציה של הקהילה",
    subtitle: "15,690 הורים שמקבלים סיפור שבועי — אפשר לעשות עם זה עוד דברים.",
    description: "שיתופי פעולה עם עסקים: תוכן ממומן, פרסום מותאם, ברטר. הכנסה שלא תלויה במנויים.",
    whyNow: "הקהילה החינמית = 15,690 הורים. כל הכנסה מפה = בונוס נקי.",
    originalPrice: 2500, weeks: 2, icon: Megaphone, category: "future",
    impact: "הכנסה מהקהילה החינמית", replaces: "קהילה בלי הכנסה",
  },

  // ── Special Projects ──
  {
    id: "nigunquest",
    name: "NigunQuest — אפליקציית בר מצווה",
    subtitle: "אפליקציה ללימוד קריאת התורה בסגנון משחק. כבר יש תכנון מלא + אב-טיפוס.",
    description: "אפליקציה בסגנון דואולינגו ללימוד טעמי המקרא ופרשת בר מצווה. מפת מסע עם שלבים, שיעורי אודיו, הקלטה ותרגול קולי, פאנל ניהול למורים. כבר קיים תכנון טכני מלא ואב-טיפוס ב-Lovable.",
    whyNow: "הפרויקט כבר מתוכנן. יש אב-טיפוס. צריך רק לבנות גרסה סופית. מתאים ל-2027 — אבל התכנון מתחיל עכשיו.",
    originalPrice: 15000, weeks: 8, icon: Gamepad2, category: "special",
    impact: "מוצר חדש — שוק בר מצוות", replaces: "אין — מוצר חדש לגמרי",
  },
]

const MILESTONES = [
  { target: "1,200 מנויים", bonus: 3000, icon: "🎯" },
  { target: "1,500 מנויים", bonus: 5000, icon: "🚀" },
  { target: "₪60K/חודש", bonus: 4000, icon: "💰" },
  { target: "₪80K/חודש", bonus: 6000, icon: "🔥" },
]

const ROADMAP = [
  {
    quarter: "מיידי — אפריל-מאי 2026",
    emoji: "🔥",
    items: [
      { name: "קמפיין כרטיס טיסה — להתניע את ה-מנוע השיתופים", status: "ready" as const },
      { name: "אוטומציית ביטול + טיפול באשראי כושל — לעצור את הדליפה", status: "ready" as const },
      { name: "דשבורד יומי + קבוצת WhatsApp — לראות מה קורה", status: "ready" as const },
      { name: "החזרת מנויים — 417 משפחות שמחכות לחזור", status: "ready" as const },
      { name: "בוט קבוע הפניות — בוט שלא נסגר", status: "ready" as const },
      { name: "פלאו ברוכים הבאים — חוויית כניסה חכמה", status: "ready" as const },
    ],
  },
  {
    quarter: "קיץ — יוני-ספטמבר 2026",
    emoji: "☀️",
    items: [
      { name: "אתר מלא + מערכת מנויים (מחליף Skolar)", status: "planned" as const },
      { name: "מערכת בוט חדשה (מחליפה Chatrace)", status: "planned" as const },
      { name: "שידור יומי אוטומטי — 0 שליחות ידניות", status: "planned" as const },
      { name: "קמפיין חופש גדול", status: "planned" as const },
      { name: "ברכות יום הולדת אישיות לילדים", status: "planned" as const },
    ],
  },
  {
    quarter: "סתיו-חורף — אוקטובר-דצמבר 2026",
    emoji: "🍂",
    items: [
      { name: "לשונית הצגות + מכירה למוסדות", status: "future" as const },
      { name: "סיפורים באנגלית + צרפתית — שווקים חדשים", status: "future" as const },
      { name: "AI בקול מנחם (11Labs)", status: "future" as const },
      { name: "חבילה שנתית + מסלול מיוחד", status: "future" as const },
      { name: "קמפיין חנוכה 2.0", status: "future" as const },
    ],
  },
  {
    quarter: "2027 — בעזרת ה׳, הרחבה",
    emoji: "🌍",
    items: [
      { name: "NigunQuest — השקת אפליקציית בר מצווה", status: "future" as const },
      { name: "מוניטיזציה של הקהילה החינמית", status: "future" as const },
    ],
  },
]

const STATUS_STYLES = {
  ready: { bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300", dot: "text-emerald-500", label: "מוכן עכשיו" },
  planned: { bg: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300", dot: "text-amber-500", label: "מתוכנן" },
  future: { bg: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400", dot: "text-slate-400", label: "עתידי" },
}

const CAT_LABELS: Record<string, { label: string; color: string }> = {
  core: { label: "תשתית", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  growth: { label: "צמיחה", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  content: { label: "חוויה", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
  future: { label: "עתידי", color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  special: { label: "פרויקט מיוחד", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
}

const RETAINER_ITEMS = [
  { icon: BarChart3, title: "דשבורד יומי אוטומטי", desc: "כל בוקר, נתונים מעודכנים ישירות לוואטסאפ. בלי לשאול." },
  { icon: Wrench, title: "תחזוקת אוטומציות", desc: "Make.com, webhooks, APIs — הכל רץ חלק." },
  { icon: Zap, title: "טיפול בתקלות", desc: "משהו נשבר? מטפל תוך שעות, לא ימים." },
  { icon: Link, title: "עדכון לינקים בקבוצות", desc: "קבוצה חדשה נפתחת — הכל מתעדכן לבד." },
  { icon: FileBarChart, title: "דוח חודשי מפורט", desc: "הכנסות, נטישה, צמיחה, המלצות. הכל שקוף." },
  { icon: Database, title: "גיבוי ועדכוני אבטחה", desc: "Supabase + אתר — הכל מעודכן ומגובה." },
  { icon: MonitorSmartphone, title: "ניטור 24/7", desc: "התראות על כשלים בזמן אמת. לא מחכים שמישהו ישים לב." },
]

const STRATEGY_ITEMS = [
  "פגישת אסטרטגיה חודשית (60 דקות) — פנים אל פנים על הכיוון",
  "תכנון הקמפיין הבא — מהתחלה ועד סוף",
  "סקירת מדדים והמלצות מעשיות — מה עובד, מה לשנות",
  "תכנון 3 חודשים קדימה",
]

/* ── helpers ─────────────────────────────────────────── */

function discountedPrice(original: number): number {
  return Math.round(original * (1 - DISCOUNT))
}

/* ── component ─────────────────────────────────────── */

export function ProposalClient() {
  const [selected, setSelected] = useState<Set<string>>(() =>
    new Set(["campaign-flight", "automation", "dashboard", "winback", "evergreen", "onboarding"])
  )
  const [order, setOrder] = useState<string[]>(ALL_PROJECTS.map(p => p.id))
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [strategySession, setStrategySession] = useState(false)
  const dragItem = useRef<string | null>(null)
  const dragOver = useRef<string | null>(null)

  const toggle = useCallback((id: string) => {
    setSelected(prev => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }, [])

  const toggleExpand = useCallback((id: string) => {
    setExpanded(prev => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }, [])

  function handleDragStart(id: string) { dragItem.current = id }
  function handleDragEnter(id: string) { dragOver.current = id }
  function handleDragEnd() {
    if (!dragItem.current || !dragOver.current || dragItem.current === dragOver.current) return
    setOrder(prev => {
      const next = [...prev]
      const fromIdx = next.indexOf(dragItem.current!)
      const toIdx = next.indexOf(dragOver.current!)
      const [removed] = next.splice(fromIdx, 1)
      next.splice(toIdx, 0, removed)
      return next
    })
    dragItem.current = null
    dragOver.current = null
  }

  const orderedProjects = order.map(id => ALL_PROJECTS.find(p => p.id === id)!).filter(Boolean)
  const selectedProjects = orderedProjects.filter(p => selected.has(p.id))
  const totalOriginal = selectedProjects.reduce((s, p) => s + p.originalPrice, 0)
  const totalDiscounted = selectedProjects.reduce((s, p) => s + discountedPrice(p.originalPrice), 0)
  const totalSaved = totalOriginal - totalDiscounted
  const totalWeeks = selectedProjects.reduce((s, p) => s + p.weeks, 0)
  const monthlyRetainer = 2000 + (strategySession ? 500 : 0)

  const waMsg = encodeURIComponent(
    `אחי, הנה מה שבחרתי — לפי סדר עדיפויות:\n\n` +
    selectedProjects.map((p, i) =>
      `${i + 1}. ${p.name} — ${fmtCurrency(discountedPrice(p.originalPrice))} (${p.weeks} שב')`
    ).join("\n") +
    `\n\nסה"כ פרויקטים: ${fmtCurrency(totalDiscounted)} (אחרי הנחה 30%)` +
    `\nחסכת: ${fmtCurrency(totalSaved)}` +
    `\n+ תחזוקה ${fmtCurrency(monthlyRetainer)}/חודש` +
    (strategySession ? ` (כולל פגישת אסטרטגיה)` : "") +
    `\n+ 15% ממנויים חדשים (לא ישנים)\n\nמה דעתך?`
  )

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden gradient-warm">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <p className="text-lg text-muted-foreground mb-4">מנחם, בוא נעשה סדר בדברים.</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            מ-₪0 ל-₪45,216 בחודש. 8 חודשים.
            <br />
            <span className="bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              מה הצעד הבא?
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            הכל פה — מספרים, תוכנית, הצעת מחיר.
            <br className="hidden sm:block" />
            תעבור ונדבר.
          </p>

          {/* Stats grid */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "₪227,669", label: "הכנסה כוללת" },
              { value: "x21", label: "צמיחה ב-8 חודשים" },
              { value: "944", label: "מנויים פעילים" },
              { value: "15,690", label: "משפחות בקהילות" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Extended stats row */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "929", label: "חברי מועדון (קבוצה)" },
              { value: "944", label: "משלמים 45₪ בפועל" },
              { value: "5.3", label: "חודשים ממוצע למנוי" },
              { value: "₪187", label: "ערך מנוי ממוצע" },
            ].map(s => (
              <div key={s.label} className="text-center rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-3">
                <div className="text-xl sm:text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            18 קהילות | 10 מבצעי שיתופים | 12,250 כניסות לבוט (88% הפניות) | המרה 87-90% מ-5₪ ל-45₪ | מנוי שעוזב נשאר 2.5 חודשים בממוצע
          </p>
        </div>
      </section>

      {/* ═══════════════════ WHERE WE STAND ═══════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-3">בוא נהיה כנים — מה עובד ומה לא</h2>
        <p className="text-center text-muted-foreground mb-10">נתונים אמיתיים. שלפתי ישירות מ-Cardcom, Green API והבוט.</p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-emerald-600 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> מה עובד — מעולה
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>10 מבצעי שיתופים — 15,690 משפחות ב-18 קהילות</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>המרה מ-5₪ ל-45₪: <strong>87-90%</strong> — זה מטורף</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>12,250 כניסות לבוט — 88% מהפניות אורגניות של הורים</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>מנוע השיתופים מוכח שעובד כל פעם מחדש</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>200+ סיפורים — הסיפורים מוכרים את עצמם. הנשמה שלך עושה את העבודה</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-red-500 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> מה נופל בין הכיסאות
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0 mt-0.5">●</span>
                <span><strong>108 מנויים עזבו בשקט</strong> — אין מערכת שמזהה ומטפלת</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0 mt-0.5">●</span>
                <span><strong>309 שילמו 5₪ ולא המירו</strong> — משפחות שרצו להצטרף ונפלו בדרך</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0 mt-0.5">●</span>
                <span>ביטול = עבודה ידנית ב-3 מערכות. אין טיפול באשראי כושל, אין סקר יציאה</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0 mt-0.5">●</span>
                <span>אפריל: <strong>5 כניסות לבוט ביום</strong> — ה-מנוע השיתופים עומד</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 flex-shrink-0 mt-0.5">●</span>
                <span>אין דשבורד — מנהלים עסק של ₪45K מתחושת בטן</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CHURN DEEP DIVE ═══════════════════ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 p-6 sm:p-8">
          <h3 className="text-xl font-extrabold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            יש משהו שקורה מתחת לרדאר
          </h3>
          <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-6">
            המספרים האלה לא נראים בשום מקום — כי אין דשבורד. אני חייב להראות לך.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { value: "108", label: "עזבו בשקט", sub: "מנויים ששילמו ונעלמו" },
              { value: "309", label: "לא המירו", sub: "שילמו 5₪ ונתקעו" },
              { value: "37%", label: "עוזבים בחודש 1", sub: "חוויית כניסה שבורה" },
              { value: "78%", label: "בלי בקשת החזר", sub: "פשוט נעלמו" },
            ].map(s => (
              <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400">{s.value}</div>
                <div className="text-xs font-bold text-red-700 dark:text-red-300 mt-1">{s.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 text-sm text-muted-foreground space-y-2">
            <p><strong className="text-foreground">417 משפחות</strong> ששילמו לנו ונעלמו. לכל אחת יש שם, טלפון, ומייל ב-Cardcom.</p>
            <p><strong className="text-foreground">מה חסר:</strong> אין טיפול באשראי כושל (הודעה כשאשראי נכשל), אין סקר יציאה (למה עזבו), אין ניסיון להחזיר אף משפחה.</p>
            <p className="text-red-600 dark:text-red-400 font-medium">כל חודש שעובר בלי טיפול = עוד 40-70 מנויים שזולגים החוצה.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WITHOUT ME vs WITH ME ═══════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-3">שני תרחישים. אתה בוחר.</h2>
        <p className="text-center text-muted-foreground mb-4">תכלס, תסתכל על שני הכיוונים. איפה אתה רואה את סיפורון בעוד 6 חודשים?</p>
        <p className="text-center text-xs text-muted-foreground mb-10 max-w-lg mx-auto">
          הגיוני שבלי קמפיין פעיל — 5 כניסות ביום. ראינו את זה.
          ו-108 מנויים עזבו בלי שאף אחד ידע.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* WITHOUT */}
          <div className="rounded-2xl border-2 border-red-200 dark:border-red-800/30 bg-red-50/50 dark:bg-red-950/10 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <X className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-red-700 dark:text-red-400">בלי טיפול טכני</h3>
                <p className="text-xs text-muted-foreground">ממשיכים כמו היום</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "מנוע השיתופים קפוא — 5 כניסות ביום",
                "60+ מנויים עוזבים בשקט כל חודש",
                "ביטול = עבודה ידנית ב-3 מערכות",
                "אין דשבורד — החלטות מתחושת בטן",
                "אין טיפול באשראי כושל = כסף שדולף",
                "קמפיינים ספונטניים — לפעמים 0 חודשים",
                "417 משפחות שיושבות ומתקררות",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-red-700 dark:text-red-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WITH */}
          <div className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/30 bg-emerald-50/50 dark:bg-emerald-950/10 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Check className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400">עם טיפול טכני</h3>
                <p className="text-xs text-muted-foreground">בונים את הכלים — הנשמה כבר יש</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "מנוע השיתופים תמיד דולק — 200+ כניסות/יום בקמפיינים",
                "טיפול בתשלומים כושלים תופס תשלומים כושלים אוטומטית",
                "סקר יציאה אומר לך למה משפחות עוזבות",
                "דשבורד כל בוקר ב-08:00 — נתונים חיים",
                "החזרת מנויים מחזיר מנויים שעזבו",
                "לוח שנה שנתי = 0 חודשים ריקים",
                "פלטפורמה אחת מחליפה 5 כלים נפרדים",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-emerald-700 dark:text-emerald-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════ DISCOUNT GIFT BANNER ═══════════════════ */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-l from-amber-100 via-orange-100 to-amber-100 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 border-2 border-amber-300 dark:border-amber-700 p-6 sm:p-8 text-center">
          <div className="text-4xl mb-3">🎁</div>
          <h3 className="text-2xl font-extrabold text-amber-800 dark:text-amber-300 mb-2">
            30% הנחה על כל הפרויקטים.
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-400 max-w-lg mx-auto leading-relaxed">
            בגדול — אנחנו עובדים ביחד כבר 8 חודשים. אני מאמין בעשייה הזאת.
            <br />
            כל הפרויקטים למטה כוללים 30% הנחה — מחיר מקורי מסומן, מחיר אחרי הנחה בולט.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl px-5 py-2.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
              חסכון של עד {fmtCurrency(Math.round(ALL_PROJECTS.reduce((s, p) => s + p.originalPrice, 0) * DISCOUNT))} על כל הפרויקטים
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROJECTS ═══════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-3">לדעתי, אלה הדברים שצריך לבנות</h2>
        <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
          תעבור, תסמן מה חשוב לך, תשנה סדר.
          <br />
          <strong className="text-foreground">כל פרויקט = הצעת מחיר נפרדת שאתה מאשר מראש.</strong>
        </p>
        <p className="text-center text-xs text-muted-foreground mb-10">
          מה דעתך?
        </p>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(CAT_LABELS).map(([key, cat]) => (
            <span key={key} className={`text-[10px] font-medium rounded-full px-3 py-1 ${cat.color}`}>
              {cat.label}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {orderedProjects.map((p, idx) => {
            const Icon = p.icon
            const isSel = selected.has(p.id)
            const isExp = expanded.has(p.id)
            const cat = CAT_LABELS[p.category]
            const discounted = discountedPrice(p.originalPrice)
            const saved = p.originalPrice - discounted

            return (
              <div
                key={p.id}
                draggable
                onDragStart={() => handleDragStart(p.id)}
                onDragEnter={() => handleDragEnter(p.id)}
                onDragEnd={handleDragEnd}
                onDragOver={e => e.preventDefault()}
                className={`rounded-2xl border-2 transition-all duration-200 ${
                  isSel
                    ? "border-primary/30 bg-primary/5 shadow-md"
                    : "border-transparent bg-card shadow-sm opacity-50 hover:opacity-75"
                }`}
              >
                {/* Main row */}
                <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-5">
                  {/* Drag handle */}
                  <div className="flex-shrink-0 cursor-grab active:cursor-grabbing touch-none">
                    <GripVertical className="h-5 w-5 text-muted-foreground/50" />
                  </div>

                  {/* Rank */}
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSel ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-muted-foreground"
                  }`}>
                    {idx + 1}
                  </div>

                  {/* Checkbox */}
                  <button
                    onClick={e => { e.stopPropagation(); toggle(p.id) }}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      isSel ? "border-primary bg-primary" : "border-slate-300 dark:border-slate-600 hover:border-primary/50"
                    }`}
                    aria-label={isSel ? `הסר ${p.name}` : `בחר ${p.name}`}
                  >
                    {isSel && <CheckCircle className="h-4 w-4 text-white" />}
                  </button>

                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  {/* Content */}
                  <button onClick={() => toggleExpand(p.id)} className="flex-1 min-w-0 text-right">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base">{p.name}</h3>
                      <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${cat.color}`}>{cat.label}</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" /> {p.weeks} {p.weeks === 1 ? "שבוע" : "שבועות"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.subtitle}</p>
                  </button>

                  {/* Price with discount */}
                  <div className="flex-shrink-0 text-left flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-muted-foreground line-through">
                        {fmtCurrency(p.originalPrice)}
                      </div>
                      <div className={`text-lg sm:text-2xl font-extrabold ${isSel ? "text-primary" : "text-muted-foreground"}`}>
                        {fmtCurrency(discounted)}
                      </div>
                    </div>
                    <button onClick={() => toggleExpand(p.id)} className="p-1">
                      {isExp ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {isExp && (
                  <div className="px-5 pb-5 mr-[4.5rem] sm:mr-20 border-t border-dashed pt-4 space-y-3">
                    <p className="text-sm text-foreground leading-relaxed">{p.description}</p>
                    <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-3">
                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">למה עכשיו?</p>
                      <p className="text-xs text-amber-700 dark:text-amber-400">{p.whyNow}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <span className="text-emerald-600 dark:text-emerald-400"><strong>תוצאה:</strong> {p.impact}</span>
                      <span className="text-slate-500 dark:text-slate-400"><strong>מחליף:</strong> {p.replaces}</span>
                      <span className="text-amber-600 dark:text-amber-400">
                        <strong>חסכת:</strong> {fmtCurrency(saved)} ({Math.round(DISCOUNT * 100)}% הנחה)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Sticky total bar ── */}
        <div className="sticky bottom-4 mt-8 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white p-4 sm:p-6 shadow-2xl z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm opacity-90">
                {selectedProjects.length} פרויקטים נבחרו | ~{totalWeeks} שבועות עבודה
              </div>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl sm:text-4xl font-extrabold">{fmtCurrency(totalDiscounted)}</div>
                <div className="text-base line-through opacity-60">{fmtCurrency(totalOriginal)}</div>
              </div>
              <div className="text-xs opacity-80 mt-0.5">
                חסכת {fmtCurrency(totalSaved)} עם הנחת 30%
              </div>
            </div>
            <div className="text-sm opacity-90 text-left leading-relaxed">
              <div>+ תחזוקה {fmtCurrency(monthlyRetainer)}/חודש</div>
              <div>+ 15% ממנויים חדשים בלבד</div>
              <div className="text-xs opacity-75">₪0 על מנויים ישנים</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ RETAINER DETAIL ═══════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-3">תחזוקה חודשית — {fmtCurrency(2000)}/חודש</h2>
        <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
          תכלס — מי מחזיק את כל זה?
        </p>
        <p className="text-center text-sm text-foreground mb-10 max-w-2xl mx-auto">
          Make.com, Cardcom, Green API, Supabase, האתר, הבוט, והלינקים.
          כשמשהו נשבר — ומשהו תמיד נשבר — מישהו צריך לדעת לתקן. תוך שעות, לא ימים. ₪2,000 לחודש.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {RETAINER_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Why can't do alone */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 border p-5 mb-8">
          <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            למה צריך מישהו טכני?
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            צריך ידע ב-API (Cardcom, Green API), מומחיות ב-Make.com, ניהול Supabase, ותחזוקת קוד.
            אתה מביא את הנשמה — אני מביא את הכלים. צריך מישהו שמכיר את כל החלקים ויודע לתקן בזמן.
          </p>
        </div>

        {/* Strategy session toggle */}
        <div className={`rounded-2xl border-2 p-6 transition-all ${
          strategySession
            ? "border-primary/30 bg-primary/5 shadow-md"
            : "border-dashed border-slate-300 dark:border-slate-600"
        }`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm">תוסף: פגישת אסטרטגיה חודשית</h4>
                <p className="text-xs text-muted-foreground">+{fmtCurrency(500)}/חודש — סה&quot;כ {fmtCurrency(2500)}/חודש</p>
              </div>
            </div>
            <button
              onClick={() => setStrategySession(prev => !prev)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                strategySession ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
              }`}
              aria-label="הוסף/הסר פגישת אסטרטגיה"
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all ${
                strategySession ? "left-0.5" : "left-7"
              }`} />
            </button>
          </div>

          {strategySession && (
            <div className="mt-4 mr-[3.25rem] space-y-2">
              {STRATEGY_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ PAYMENT MODEL ═══════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-3">איך עובד התשלום</h2>
        <p className="text-center text-muted-foreground mb-10">יש עבודה — יש תשלום. אין עבודה — אין תשלום.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-primary mb-3">1</div>
            <p className="text-sm font-bold mb-2">פרויקטים</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              הצעת מחיר לכל פרויקט — <strong>כולל 30% הנחה</strong>.
              <br /><br />
              אתה מאשר מראש. 50% בהתחלה, 50% במסירה.
              לא מאשר? לא משלם.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-primary mb-3">
              {fmtCurrency(2000)}<span className="text-base text-muted-foreground">/חודש</span>
            </div>
            <p className="text-sm font-bold mb-2">תחזוקה שוטפת</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              דשבורד יומי, תחזוקת אוטומציות, טיפול בתקלות, עדכון לינקים, גיבוי, ניטור 24/7.
              <br /><br />
              אופציה: +{fmtCurrency(500)} לפגישת אסטרטגיה חודשית.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-primary mb-3">15%</div>
            <p className="text-sm font-bold mb-2">ממנויים חדשים בלבד</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              רק מנויים שהצטרפו בזמן ההסכם.
              רק מחודש 2 (כשמשלמים 45₪).
              למשך 12 חודש. אחרי זה — שלך 100%.
              <br /><br />
              <strong className="text-foreground">מנויים ישנים? ₪0. אפס.</strong>
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-primary mb-3">🏆</div>
            <p className="text-sm font-bold mb-2">בונוסי אבני דרך</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              כשמגיעים לאבני דרך ביחד — מעולה, חוגגים.
              <br /><br />
              {MILESTONES.map(m => (
                <span key={m.target} className="block">
                  {m.icon} {m.target} = {fmtCurrency(m.bonus)}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ROADMAP ═══════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-3">מפת דרכים — מה קודם, מה אחר כך</h2>
        <p className="text-center text-muted-foreground mb-10">מאפריל 2026 עד 2027 — כל שלב ברור.</p>

        <div className="space-y-8">
          {ROADMAP.map(q => (
            <div key={q.quarter}>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">{q.emoji}</span> {q.quarter}
              </h3>
              <div className="space-y-2 mr-10">
                {q.items.map(item => {
                  const st = STATUS_STYLES[item.status]
                  return (
                    <div key={item.name} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                      <CheckCircle className={`h-5 w-5 flex-shrink-0 ${st.dot}`} />
                      <span className="flex-1 text-sm font-medium">{item.name}</span>
                      <span className={`text-[10px] font-medium rounded-full px-2.5 py-0.5 ${st.bg}`}>{st.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ SUMMARY ═══════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-slate-800/50 dark:to-slate-900/50 p-8">
          <h2 className="text-2xl font-extrabold mb-6 text-center">בשורה התחתונה:</h2>
          <div className="space-y-5 text-sm max-w-2xl mx-auto">
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold">1.</span>
              <div>
                <strong>פרויקטים</strong> — הצעת מחיר נפרדת לכל אחד, <strong>כולל 30% הנחה</strong>. אישור מראש. 50% בהתחלה, 50% במסירה.
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold">2.</span>
              <div>
                <strong>תחזוקה — {fmtCurrency(2000)}/חודש</strong> — דשבורד יומי, אוטומציות, תקלות, לינקים, גיבוי, ניטור 24/7. ביטול בהתראה של 30 יום.
                {strategySession && (
                  <span className="text-purple-600 dark:text-purple-400"> + פגישת אסטרטגיה {fmtCurrency(500)}/חודש</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold">3.</span>
              <div>
                <strong>15% ממנויים חדשים</strong> — רק מנויים חדשים, רק מחודש 2 (45₪), למשך 12 חודש. מנויים ישנים = ₪0.
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold">4.</span>
              <div>
                <strong>בונוסי אבני דרך</strong> — חד-פעמיים כשמגיעים ליעדים ביחד.
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg font-bold">5.</span>
              <div>
                <strong>תקופה</strong> — 6 חודשים + חידוש אוטומטי. כל צד יכול לסיים בהתראה של 30 יום. שקוף.
              </div>
            </div>
          </div>

          {/* Quick summary numbers */}
          <div className="mt-8 pt-6 border-t border-primary/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-muted-foreground mb-1">פרויקטים נבחרים</div>
                <div className="text-2xl font-extrabold text-primary">{fmtCurrency(totalDiscounted)}</div>
                <div className="text-xs text-muted-foreground line-through">{fmtCurrency(totalOriginal)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">תחזוקה חודשית</div>
                <div className="text-2xl font-extrabold text-primary">{fmtCurrency(monthlyRetainer)}</div>
                <div className="text-xs text-muted-foreground">
                  {strategySession ? "כולל אסטרטגיה" : "בלי אסטרטגיה"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">חסכת</div>
                <div className="text-2xl font-extrabold text-emerald-600">{fmtCurrency(totalSaved)}</div>
                <div className="text-xs text-muted-foreground">הנחת 30% על פרויקטים</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-muted-foreground mb-2">מנחם,</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          תעבור על הכל, תסמן.
          <br />
          <span className="bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            ובוא נדבר במוצש.
          </span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          בחרת {selectedProjects.length} פרויקטים בסך {fmtCurrency(totalDiscounted)}
          <span className="text-xs text-muted-foreground"> (חסכת {fmtCurrency(totalSaved)})</span>
          <br />
          + תחזוקה {fmtCurrency(monthlyRetainer)}/חודש
          {strategySession && <span className="text-xs"> (כולל אסטרטגיה)</span>}
          <br />
          <span className="text-sm">מה דעתך?</span>
        </p>

        <a
          href={`https://wa.me/972532208749?text=${waMsg}`}
          className="inline-flex items-center gap-3 bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all"
        >
          <Phone className="h-5 w-5" />
          שלח בוואטסאפ מה בחרת
        </a>

        <p className="mt-6 text-xs text-muted-foreground max-w-sm mx-auto">
          יש עבודה — יש תשלום. אין עבודה — ₪0.
          <br />
          הוגן.
        </p>
      </section>

      {/* ═══════════════════ PERSONAL NOTE ═══════════════════ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="rounded-2xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-200/50 dark:border-amber-800/20 p-6 sm:p-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            אחי,
            <br /><br />
            אני לא כותב את זה כדי למכור לך.
            אנחנו עובדים ביחד כבר 8 חודשים. ראיתי את סיפורון גדל מ-₪0 ל-₪45K בחודש. 15,690 משפחות בקהילות. ברוך השם.
            <br /><br />
            אני יודע שאתה לא אוהב לשלם על דברים שאתה לא מבין למה הם עולים כסף.
            אני מכבד את זה. בגלל זה כל שקל פה מוסבר.
            <br /><br />
            הלמה שלך: &quot;להצית בלב של ילד את הניצוץ הפנימי שלו — דרך סיפור.&quot;
            <br />
            הלמה שלי: לבנות את הכלים שיאפשרו לזה להגיע לכמה שיותר ילדים — בלי שתצטרך לעבוד 18 שעות ביום.
            <br /><br />
            תכלס — אם יש עבודה יש תשלום. אין עבודה אין תשלום. הוגן?
            <br /><br />
            <strong className="text-foreground">— יוסף</strong>
          </p>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        סיפורון © 2026
      </footer>
    </div>
  )
}
