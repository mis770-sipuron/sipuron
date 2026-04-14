"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar, Target, TrendingUp, Users, DollarSign,
  Megaphone, ShieldCheck, Cog, Scale, Cpu, Heart,
  BarChart3, Sparkles
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────

type Department = "CMO" | "CSO" | "CPO" | "CTO" | "CCO" | "CFO" | "COO" | "CLO"
type Status = "planned" | "in_progress" | "completed" | "on_hold"

interface Milestone {
  label: string
  done: boolean
}

interface Project {
  id: string
  name: string
  description: string
  progress: number
  status: Status
  owners: Department[]
  targetDate: string
  milestones: Milestone[]
}

interface DepartmentInfo {
  key: Department
  label: string
  hebrewTitle: string
  color: string
  icon: React.ElementType
  kpis: { label: string; value: string; trend?: string }[]
}

// ─── Department Config ───────────────────────────────────────────────

const DEPARTMENTS: DepartmentInfo[] = [
  {
    key: "CMO", label: "CMO שיווק", hebrewTitle: "שיווק", color: "#F59E0B",
    icon: Megaphone,
    kpis: [
      { label: "חברי קהילה", value: "17,200", trend: "+1,200" },
      { label: "קבוצות פעילות", value: "18" },
      { label: "שיעור הפניות", value: "4.2%", trend: "+0.8%" },
    ],
  },
  {
    key: "CSO", label: "CSO מכירות", hebrewTitle: "מכירות", color: "#10B981",
    icon: TrendingUp,
    kpis: [
      { label: "MRR", value: "45,216 ₪", trend: "+12.3%" },
      { label: "מנויים פעילים", value: "836", trend: "+201" },
      { label: "שיעור המרה", value: "8.5%", trend: "+1.2%" },
    ],
  },
  {
    key: "CPO", label: "CPO מוצר", hebrewTitle: "מוצר", color: "#8B5CF6",
    icon: Sparkles,
    kpis: [
      { label: "סיפורים בספריה", value: "340" },
      { label: "זמן האזנה ממוצע", value: "6.2 דק'" },
      { label: "NPS מוצר", value: "72", trend: "+5" },
    ],
  },
  {
    key: "CTO", label: "CTO טכנולוגיה", hebrewTitle: "טכנולוגיה", color: "#3B82F6",
    icon: Cpu,
    kpis: [
      { label: "Uptime", value: "99.8%" },
      { label: "API Latency", value: "120ms" },
      { label: "אוטומציות פעילות", value: "14" },
    ],
  },
  {
    key: "CCO", label: "CCO שירות", hebrewTitle: "שירות", color: "#EC4899",
    icon: Heart,
    kpis: [
      { label: "CSAT", value: "4.6/5" },
      { label: "זמן תגובה", value: "< 2 שעות" },
      { label: "פניות פתוחות", value: "7" },
    ],
  },
  {
    key: "CFO", label: "CFO כספים", hebrewTitle: "כספים", color: "#14B8A6",
    icon: DollarSign,
    kpis: [
      { label: "הכנסה חודשית", value: "45,216 ₪" },
      { label: "Churn Rate", value: "3.2%", trend: "-0.5%" },
      { label: "LTV ממוצע", value: "580 ₪" },
    ],
  },
  {
    key: "COO", label: "COO תפעול", hebrewTitle: "תפעול", color: "#F97316",
    icon: Cog,
    kpis: [
      { label: "תהליכים אוטומטיים", value: "8/14" },
      { label: "כשלי תשלום", value: "3" },
      { label: "Dunning Recovery", value: "0%", trend: "טרם הופעל" },
    ],
  },
  {
    key: "CLO", label: "CLO משפטים", hebrewTitle: "משפטים", color: "#6B7280",
    icon: Scale,
    kpis: [
      { label: "חוזים פעילים", value: "1" },
      { label: "סטטוס תקנון", value: "בעדכון" },
      { label: "GDPR", value: "תואם" },
    ],
  },
]

const DEPT_MAP = Object.fromEntries(DEPARTMENTS.map((d) => [d.key, d])) as Record<Department, DepartmentInfo>

// ─── Status Config ───────────────────────────────────────────────────

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  planned:     { label: "מתוכנן",  className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  in_progress: { label: "בביצוע",  className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  completed:   { label: "הושלם",   className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  on_hold:     { label: "מושהה",   className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
}

// ─── Seed Data ───────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "1",
    name: "חוזה win-win חדש",
    description: "ניסוח חוזה מנוי חדש עם תנאי ביטול הוגנים שמגנים על שני הצדדים ומפחיתים churn לא רצוני.",
    progress: 30,
    status: "in_progress",
    owners: ["CLO"],
    targetDate: "מאי 2026",
    milestones: [
      { label: "מחקר חוזים בשוק", done: true },
      { label: "טיוטה ראשונה", done: true },
      { label: "עיגון תנאי ביטול", done: false },
      { label: "בדיקת עו\"ד", done: false },
      { label: "פרסום ללקוחות", done: false },
    ],
  },
  {
    id: "2",
    name: "פלטפורמה חדשה",
    description: "בניית פלטפורמת Next.js חדשה עם Supabase, ממשק אדמין מלא, וחוויית משתמש מודרנית.",
    progress: 5,
    status: "in_progress",
    owners: ["CTO", "CPO"],
    targetDate: "יוני 2026",
    milestones: [
      { label: "הקמת תשתית Next.js + Supabase", done: true },
      { label: "דשבורד אדמין בסיסי", done: false },
      { label: "אינטגרציית Cardcom", done: false },
      { label: "ממשק משתמש + נגן סיפורים", done: false },
      { label: "העברת נתונים + השקה", done: false },
    ],
  },
  {
    id: "3",
    name: "ביטול + dunning אוטומטי",
    description: "תהליך ביטול self-service ומערכת dunning חכמה לשחזור תשלומים כושלים באופן אוטומטי.",
    progress: 0,
    status: "planned",
    owners: ["COO"],
    targetDate: "מאי 2026",
    milestones: [
      { label: "מיפוי תהליך ביטול נוכחי", done: false },
      { label: "עיצוב flow ביטול", done: false },
      { label: "בניית Make scenario — dunning", done: false },
      { label: "חיבור Cardcom webhook", done: false },
    ],
  },
  {
    id: "4",
    name: "WhatsApp Growth — referral bot",
    description: "בוט הפניות אורגני בוואטסאפ עם WhatsApp Flows, מנגנון תגמולים ומעקב UTM.",
    progress: 40,
    status: "in_progress",
    owners: ["CMO"],
    targetDate: "מאי 2026",
    milestones: [
      { label: "עיצוב מנגנון refer-a-friend", done: true },
      { label: "בניית WhatsApp Flow", done: true },
      { label: "אינטגרציית Make + Supabase", done: false },
      { label: "A/B test הודעות", done: false },
      { label: "השקה ל-18 קבוצות", done: false },
    ],
  },
  {
    id: "5",
    name: "שידור יומי אוטומטי",
    description: "מערכת שידור אוטומטית של סיפור יומי לקבוצות WhatsApp — כולל scheduling, fallback ודיווח.",
    progress: 0,
    status: "planned",
    owners: ["CTO"],
    targetDate: "יוני 2026",
    milestones: [
      { label: "תכנון ארכיטקטורה", done: false },
      { label: "בניית scheduler + queue", done: false },
      { label: "חיבור Green API", done: false },
      { label: "דשבורד ניטור שליחות", done: false },
    ],
  },
  {
    id: "6",
    name: "הפקת תוכן — 11Labs",
    description: "אוטומציית יצירת אודיו לסיפורים עם 11Labs TTS, כולל בחירת קולות ובקרת איכות.",
    progress: 0,
    status: "planned",
    owners: ["CPO"],
    targetDate: "יולי 2026",
    milestones: [
      { label: "בחירת קולות + benchmark", done: false },
      { label: "בניית pipeline הפקה", done: false },
      { label: "QA אוטומטי — איכות שמע", done: false },
      { label: "אינטגרציה עם ספריית סיפורים", done: false },
    ],
  },
  {
    id: "7",
    name: "ברכות יום הולדת",
    description: "שליחת ברכות יום הולדת מותאמות אישית לילדי המנויים עם סיפור מתנה ייחודי.",
    progress: 0,
    status: "planned",
    owners: ["CCO", "CTO"],
    targetDate: "יוני 2026",
    milestones: [
      { label: "איסוף תאריכי לידה", done: false },
      { label: "עיצוב תבנית ברכה", done: false },
      { label: "בניית Make scenario", done: false },
      { label: "בדיקה + השקה", done: false },
    ],
  },
  {
    id: "8",
    name: "דשבורד אנליטיקס",
    description: "דשבורד KPI מרכזי עם נתוני הכנסות, מנויים, churn ומגמות — מחובר ל-Cardcom ו-Supabase.",
    progress: 10,
    status: "in_progress",
    owners: ["CFO"],
    targetDate: "יוני 2026",
    milestones: [
      { label: "הגדרת KPIs מרכזיים", done: true },
      { label: "חיבור Cardcom API", done: false },
      { label: "גרפים + ויזואליזציה", done: false },
      { label: "התראות חריגות", done: false },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────

function getDeptColor(dept: Department) {
  return DEPT_MAP[dept]?.color ?? "#6B7280"
}

function filterByDept(projects: Project[], dept: Department | null) {
  if (!dept) return projects
  return projects.filter((p) => p.owners.includes(dept))
}

// ─── Component ───────────────────────────────────────────────────────

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<string | null>("all")

  const activeDept = activeTab === "all" ? null : (activeTab as Department)
  const filtered = filterByDept(PROJECTS, activeDept)
  const deptInfo = activeDept ? DEPT_MAP[activeDept] : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-amber-500" />
            רודמאפ פרויקטים
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {PROJECTS.length} פרויקטים &middot; {PROJECTS.filter((p) => p.status === "in_progress").length} בביצוע &middot; {PROJECTS.filter((p) => p.status === "planned").length} מתוכננים
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as string)}
      >
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList variant="line" className="gap-0.5 flex-nowrap min-w-max">
            <TabsTrigger value="all" className="text-xs sm:text-sm px-2.5 sm:px-3">
              הכל
            </TabsTrigger>
            {DEPARTMENTS.map((dept) => (
              <TabsTrigger
                key={dept.key}
                value={dept.key}
                className="text-xs sm:text-sm px-2.5 sm:px-3"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full ml-1.5 shrink-0"
                  style={{ backgroundColor: dept.color }}
                />
                {dept.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Department KPIs — visible when a specific department is selected */}
        {deptInfo && (
          <div
            className="rounded-xl border p-4 mt-2 transition-all duration-300"
            style={{
              borderColor: `${deptInfo.color}30`,
              background: `linear-gradient(135deg, ${deptInfo.color}08, ${deptInfo.color}03)`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <deptInfo.icon
                className="h-5 w-5"
                style={{ color: deptInfo.color }}
              />
              <span className="font-bold text-foreground">
                {deptInfo.hebrewTitle} — מדדי מפתח
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-right">
              {deptInfo.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-lg bg-background/80 p-3 ring-1 ring-foreground/5"
                >
                  <div className="text-xs text-muted-foreground">{kpi.label}</div>
                  <div className="text-lg font-bold text-foreground mt-0.5">
                    {kpi.value}
                  </div>
                  {kpi.trend && (
                    <div className="text-xs text-emerald-600 mt-0.5">{kpi.trend}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All tab content (shown for "all" and department tabs) */}
        <TabsContent value="all">
          <ProjectGrid projects={filtered} />
        </TabsContent>

        {DEPARTMENTS.map((dept) => (
          <TabsContent key={dept.key} value={dept.key}>
            <ProjectGrid projects={filtered} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

// ─── Project Grid ────────────────────────────────────────────────────

function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Target className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>אין פרויקטים במחלקה זו</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

// ─── Project Card ────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const statusCfg = STATUS_CONFIG[project.status]
  const doneMilestones = project.milestones.filter((m) => m.done).length
  const totalMilestones = project.milestones.length

  return (
    <Card className="group/project hover:ring-2 hover:ring-amber-500/20 transition-all duration-300 border-0">
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-bold leading-snug">
            {project.name}
          </CardTitle>
          <span
            className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusCfg.className}`}
          >
            {statusCfg.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">התקדמות</span>
            <span className="font-semibold text-foreground tabular-nums">
              {project.progress}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${project.progress}%`,
                background:
                  project.progress >= 100
                    ? "#10B981"
                    : project.progress > 0
                    ? `linear-gradient(90deg, ${getDeptColor(project.owners[0])}, ${getDeptColor(project.owners[0])}cc)`
                    : "#d1d5db",
              }}
            />
          </div>
        </div>

        {/* Owner badges + target date */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            {project.owners.map((dept) => (
              <span
                key={dept}
                className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                style={{ backgroundColor: getDeptColor(dept) }}
              >
                {dept}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {project.targetDate}
          </div>
        </div>

        {/* Milestones checklist */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>אבני דרך</span>
            <span className="tabular-nums">{doneMilestones}/{totalMilestones}</span>
          </div>
          <div className="space-y-1.5">
            {project.milestones.map((ms, i) => (
              <label
                key={i}
                className={`flex items-center gap-2 text-sm cursor-default transition-opacity ${
                  ms.done ? "opacity-60" : ""
                }`}
              >
                <Checkbox checked={ms.done} disabled className="pointer-events-none" />
                <span className={ms.done ? "line-through text-muted-foreground" : "text-foreground"}>
                  {ms.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
