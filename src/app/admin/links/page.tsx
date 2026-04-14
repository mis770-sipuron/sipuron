"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import { fmtNumber } from "@/lib/constants"
import {
  LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts"
import {
  Link as LinkIcon, ExternalLink, Copy, QrCode, BarChart3,
  Eye, MousePointerClick, TrendingUp, Smartphone, Monitor,
} from "lucide-react"

/* ───────── Chart colors ───────── */
const AMBER = "#F59E0B"
const PURPLE = "#7C3AED"
const CORAL = "#FB7185"
const EMERALD = "#10B981"
const BLUE = "#3B82F6"

/* ───────── Mock: Short Links ───────── */
const LINKS = [
  {
    title: "דף מכירה השקה 18",
    short: "s.sipuron.org/grp18",
    original: "https://sipuron.org/groups/18?utm_source=whatsapp&utm_campaign=launch18",
    clicks: 1247,
    unique: 983,
    created: "2026-04-01",
  },
  {
    title: "מבצע כרטיס טיסה",
    short: "s.sipuron.org/europe",
    original: "https://sipuron.org/promo/europe-ticket?ref=wa",
    clicks: 892,
    unique: 714,
    created: "2026-03-28",
  },
  {
    title: "סיפור מושקה — חינם",
    short: "s.sipuron.org/mushka",
    original: "https://sipuron.org/stories/mushka-free-preview",
    clicks: 543,
    unique: 489,
    created: "2026-04-05",
  },
  {
    title: "טופס הגרלה פסח",
    short: "s.sipuron.org/pesach",
    original: "https://sipuron.org/contest/pesach-2026",
    clicks: 2103,
    unique: 1876,
    created: "2026-03-20",
  },
  {
    title: "וואטסאפ ברוכים הבאים",
    short: "s.sipuron.org/welcome",
    original: "https://sipuron.org/welcome?src=wa-auto",
    clicks: 3421,
    unique: 2954,
    created: "2026-02-10",
  },
  {
    title: "דף נחיתה ראשי",
    short: "s.sipuron.org/home",
    original: "https://sipuron.org/?utm_source=shortlink",
    clicks: 1876,
    unique: 1602,
    created: "2026-01-15",
  },
]

const totalClicks = LINKS.reduce((s, l) => s + l.clicks, 0)
const totalUnique = LINKS.reduce((s, l) => s + l.unique, 0)
const topLink = LINKS.reduce((a, b) => (a.clicks > b.clicks ? a : b))

/* ───────── Mock: Analytics ───────── */
const DAILY_CLICKS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date("2026-04-01")
  d.setDate(d.getDate() + i)
  const label = `${d.getDate()}/${d.getMonth() + 1}`
  // trending up with some noise
  const base = 180 + i * 18
  const noise = Math.round((Math.sin(i * 1.3) * 40))
  return { day: label, clicks: base + noise, unique: Math.round((base + noise) * 0.78) }
})

const TOP_PAGES = [
  { path: "/", views: 4250, unique: 3120, avgTime: "1:42" },
  { path: "/stories", views: 3180, unique: 2340, avgTime: "3:15" },
  { path: "/groups/18", views: 1890, unique: 1470, avgTime: "2:28" },
  { path: "/promo/europe-ticket", views: 1120, unique: 890, avgTime: "1:55" },
  { path: "/welcome", views: 980, unique: 820, avgTime: "0:48" },
  { path: "/pricing", views: 760, unique: 610, avgTime: "2:05" },
]

const TRAFFIC_SOURCES = [
  { name: "WhatsApp", value: 65, color: EMERALD },
  { name: "Direct", value: 20, color: AMBER },
  { name: "Organic", value: 10, color: PURPLE },
  { name: "Campaign links", value: 5, color: CORAL },
]

const FUNNEL = [
  { stage: "נחיתה", count: 1000 },
  { stage: "סיפורים", count: 600 },
  { stage: "הרשמה", count: 200 },
  { stage: "תשלום", count: 80 },
  { stage: "ברוכים הבאים", count: 65 },
]

/* ───────── Helpers ───────── */
function fmt(n: number) {
  return n.toLocaleString("he-IL")
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "short",
  })
}

/* ───────── Component ───────── */
export default function LinksAnalyticsPage() {
  const [tab, setTab] = useState<"links" | "analytics">("links")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">לינקים + אנליטיקס</h1>
        <p className="text-muted-foreground">ניהול לינקים קצרים ומעקב ביצועים</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={tab === "links" ? "default" : "outline"}
          size="sm"
          onClick={() => setTab("links")}
        >
          <LinkIcon className="h-4 w-4 ml-1" />
          לינקים קצרים
        </Button>
        <Button
          variant={tab === "analytics" ? "default" : "outline"}
          size="sm"
          onClick={() => setTab("analytics")}
        >
          <BarChart3 className="h-4 w-4 ml-1" />
          אנליטיקס
        </Button>
      </div>

      {tab === "links" ? <LinksTab /> : <AnalyticsTab />}
    </div>
  )
}

/* ═══════════════════════════════════════
   TAB 1: לינקים קצרים
   ═══════════════════════════════════════ */
function LinksTab() {
  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <Button size="sm">
          <LinkIcon className="h-4 w-4 ml-1" />
          צור לינק חדש
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="סה״כ לינקים"
          value={fmt(LINKS.length)}
          icon={<LinkIcon className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="סה״כ קליקים"
          value={fmt(totalClicks)}
          icon={<MousePointerClick className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="קליקים ייחודיים"
          value={fmt(totalUnique)}
          icon={<Eye className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="לינק מוביל"
          value={fmt(topLink.clicks)}
          subtitle={topLink.title}
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
        />
      </div>

      {/* Links table */}
      <Card className="glass border-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">כותרת</TableHead>
                <TableHead className="text-right">לינק קצר</TableHead>
                <TableHead className="text-right">כתובת מקורית</TableHead>
                <TableHead className="text-center">קליקים</TableHead>
                <TableHead className="text-center">ייחודיים</TableHead>
                <TableHead className="text-center">נוצר</TableHead>
                <TableHead className="text-center">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LINKS.map((link) => (
                <TableRow key={link.short}>
                  <TableCell className="font-medium">{link.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {link.short}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-48 truncate text-xs text-muted-foreground">
                    {link.original}
                  </TableCell>
                  <TableCell className="text-center font-semibold">{fmt(link.clicks)}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{fmt(link.unique)}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {fmtDate(link.created)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <QrCode className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

/* ═══════════════════════════════════════
   TAB 2: אנליטיקס
   ═══════════════════════════════════════ */
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="צפיות היום"
          value={fmt(1842)}
          icon={<Eye className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="מבקרים ייחודיים"
          value={fmt(1203)}
          icon={<MousePointerClick className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="זמן ממוצע בדף"
          value="2:14"
          icon={<BarChart3 className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="שיעור נטישה"
          value="34%"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
        />
      </div>

      {/* Click trend chart */}
      <Card className="glass border-0 p-5">
        <h3 className="font-bold text-foreground mb-4">מגמת קליקים — 14 ימים אחרונים</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DAILY_CLICKS}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 24px rgba(0,0,0,.12)",
                }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                name="קליקים"
                stroke={AMBER}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="unique"
                name="ייחודיים"
                stroke={PURPLE}
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two-column: Top pages + Traffic sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <Card className="glass border-0 overflow-hidden">
          <div className="p-5 pb-3">
            <h3 className="font-bold text-foreground">דפים מובילים</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">נתיב</TableHead>
                  <TableHead className="text-center">צפיות</TableHead>
                  <TableHead className="text-center">ייחודיים</TableHead>
                  <TableHead className="text-center">זמן ממוצע</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOP_PAGES.map((page) => (
                  <TableRow key={page.path}>
                    <TableCell className="font-mono text-xs">{page.path}</TableCell>
                    <TableCell className="text-center font-semibold">{fmt(page.views)}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{fmt(page.unique)}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{page.avgTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Traffic sources pie */}
        <Card className="glass border-0 p-5">
          <h3 className="font-bold text-foreground mb-4">מקורות תנועה</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TRAFFIC_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >
                  {TRAFFIC_SOURCES.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 4px 24px rgba(0,0,0,.12)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {TRAFFIC_SOURCES.map((src) => (
              <div key={src.name} className="flex items-center gap-1.5 text-xs">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: src.color }}
                />
                <span className="text-muted-foreground">{src.name}</span>
                <span className="font-semibold">{src.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Device split */}
      <Card className="glass border-0 p-5">
        <h3 className="font-bold text-foreground mb-4">חלוקה לפי מכשיר</h3>
        <div className="space-y-3">
          <DeviceBar icon={<Smartphone className="h-4 w-4" />} label="Mobile" pct={94} color={AMBER} />
          <DeviceBar icon={<Monitor className="h-4 w-4" />} label="Desktop" pct={6} color={PURPLE} />
        </div>
      </Card>

      {/* Conversion funnel */}
      <Card className="glass border-0 p-5">
        <h3 className="font-bold text-foreground mb-5">משפך המרה</h3>
        <div className="space-y-3">
          {FUNNEL.map((step, i) => {
            const maxCount = FUNNEL[0].count
            const widthPct = (step.count / maxCount) * 100
            const dropOff = i > 0
              ? Math.round((1 - step.count / FUNNEL[i - 1].count) * 100)
              : null

            // gradient colors per step
            const colors = [AMBER, PURPLE, CORAL, EMERALD, BLUE]
            const barColor = colors[i % colors.length]

            return (
              <div key={step.stage} className="flex items-center gap-3">
                <span className="w-28 text-sm font-medium text-foreground shrink-0 text-start">
                  {step.stage}
                </span>
                <div className="flex-1 relative">
                  <div className="h-9 rounded-lg bg-muted/40 w-full" />
                  <div
                    className="h-9 rounded-lg absolute top-0 start-0 flex items-center justify-end px-3 transition-all"
                    style={{ width: `${widthPct}%`, backgroundColor: barColor }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow">
                      {fmt(step.count)}
                    </span>
                  </div>
                </div>
                <span className="w-16 text-xs text-muted-foreground shrink-0 text-start">
                  {dropOff !== null ? (
                    <span className="text-rose-500">-{dropOff}%</span>
                  ) : (
                    <span className="text-emerald-500">100%</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
        {/* Overall conversion */}
        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground flex items-center justify-between">
          <span>המרה כוללת (נחיתה &#x2192; ברוכים הבאים)</span>
          <Badge variant="secondary" className="font-bold">
            {((FUNNEL[FUNNEL.length - 1].count / FUNNEL[0].count) * 100).toFixed(1)}%
          </Badge>
        </div>
      </Card>
    </div>
  )
}

/* ───────── Shared: Stat card ───────── */
function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
}) {
  return (
    <Card className="glass border-0 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-extrabold text-foreground">{value}</div>
      {subtitle && (
        <div className="text-xs mt-1 text-muted-foreground truncate">{subtitle}</div>
      )}
    </Card>
  )
}

/* ───────── Shared: Device bar ───────── */
function DeviceBar({
  icon,
  label,
  pct,
  color,
}: {
  icon: React.ReactNode
  label: string
  pct: number
  color: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 w-24 shrink-0 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex-1 h-6 rounded-full bg-muted/40 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-12 text-sm font-bold text-foreground text-start">{pct}%</span>
    </div>
  )
}
