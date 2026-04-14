"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import {
  Send, Bot, Users, MessageSquare, Radio, Search,
  Plus, ExternalLink, AlertTriangle, Eye, Clock, CheckCheck,
} from "lucide-react"

// ─── Mock Data ───────────────────────────────────────────────

const BROADCASTS = [
  {
    id: 1,
    title: "סיפור יומי — האריה והנמלה",
    date: "2026-04-14",
    recipients: 1180,
    delivered: 1152,
    read: 987,
    status: "sent" as const,
  },
  {
    id: 2,
    title: "מבצע כרטיס טיסה — ₪5 לחודש",
    date: "2026-04-13",
    recipients: 1226,
    delivered: 1200,
    read: 1044,
    status: "sent" as const,
  },
  {
    id: 3,
    title: "סיפור יומי — הנסיכה והצפרדע",
    date: "2026-04-12",
    recipients: 1170,
    delivered: 1140,
    read: 912,
    status: "sent" as const,
  },
  {
    id: 4,
    title: "עדכון — סיפורים חדשים לפסח",
    date: "2026-04-15",
    recipients: 1226,
    delivered: 0,
    read: 0,
    status: "scheduled" as const,
  },
  {
    id: 5,
    title: "סקר שביעות רצון חודשי",
    date: "2026-04-10",
    recipients: 0,
    delivered: 0,
    read: 0,
    status: "draft" as const,
  },
]

const BOT_FLOWS = [
  {
    trigger: "הודעה ראשונה",
    description: "Welcome flow — 4 הודעות ברצף",
    status: "active" as const,
    messageCount: 4,
  },
  {
    trigger: "הצטרפות",
    description: "קישור לדף המכירה",
    status: "active" as const,
    messageCount: 1,
  },
  {
    trigger: "ביטול",
    description: "Retention flow — הנחה + שאלון סיבה",
    status: "active" as const,
    messageCount: 3,
  },
  {
    trigger: "סיפור / מה מומלץ",
    description: "ממליץ סיפורים לפי גיל וטעם",
    status: "planned" as const,
    messageCount: 0,
  },
  {
    trigger: "עזרה",
    description: "FAQ — שאלות נפוצות",
    status: "active" as const,
    messageCount: 5,
  },
  {
    trigger: "כשל תשלום",
    description: "Dunning flow — תזכורת תשלום + עדכון כרטיס",
    status: "planned" as const,
    messageCount: 0,
  },
]

const GROUPS = [
  {
    name: "סיפורון 16",
    members: 1850,
    capacity: 2000,
    status: "active" as const,
    inviteLink: "https://chat.whatsapp.com/abc16",
  },
  {
    name: "סיפורון 17",
    members: 1200,
    capacity: 2000,
    status: "active" as const,
    inviteLink: "https://chat.whatsapp.com/abc17",
  },
  {
    name: "סיפורון 18",
    members: 450,
    capacity: 2000,
    status: "active" as const,
    inviteLink: "https://chat.whatsapp.com/abc18",
  },
  {
    name: "סיפורון VIP",
    members: 320,
    capacity: 2000,
    status: "active" as const,
    inviteLink: "https://chat.whatsapp.com/vip1",
  },
  {
    name: "סיפורון — הורים",
    members: 980,
    capacity: 2000,
    status: "active" as const,
    inviteLink: "https://chat.whatsapp.com/parents1",
  },
]

const CONTACTS = [
  {
    name: "שרה כהן",
    phone: "050-1234567",
    source: "signup" as const,
    tags: ["מנוי פעיל", "חודשי"],
    engagement: 92,
    lastMessage: "2026-04-14",
  },
  {
    name: "דוד לוי",
    phone: "052-9876543",
    source: "bot" as const,
    tags: ["מנוי פעיל", "שנתי"],
    engagement: 85,
    lastMessage: "2026-04-13",
  },
  {
    name: "רחל מזרחי",
    phone: "054-5551234",
    source: "signup" as const,
    tags: ["ביטול"],
    engagement: 15,
    lastMessage: "2026-04-10",
  },
  {
    name: "יעקב אברהם",
    phone: "058-7771234",
    source: "import" as const,
    tags: ["מנוי פעיל", "חודשי", "VIP"],
    engagement: 98,
    lastMessage: "2026-04-14",
  },
  {
    name: "מרים ביטון",
    phone: "050-3334444",
    source: "bot" as const,
    tags: ["ליד"],
    engagement: 45,
    lastMessage: "2026-04-11",
  },
  {
    name: "אלי פרץ",
    phone: "053-2221111",
    source: "signup" as const,
    tags: ["מנוי פעיל", "חודשי"],
    engagement: 72,
    lastMessage: "2026-04-12",
  },
]

// ─── Helpers ─────────────────────────────────────────────────

function pct(a: number, b: number) {
  if (b === 0) return "—"
  return `${Math.round((a / b) * 100)}%`
}

function statusBadge(status: "sent" | "scheduled" | "draft") {
  const map = {
    sent: { label: "נשלח", variant: "default" as const },
    scheduled: { label: "מתוזמן", variant: "secondary" as const },
    draft: { label: "טיוטה", variant: "outline" as const },
  }
  const s = map[status]
  return <Badge variant={s.variant}>{s.label}</Badge>
}

function sourceBadge(source: "signup" | "bot" | "import") {
  const map = {
    signup: "הרשמה",
    bot: "בוט",
    import: "ייבוא",
  }
  return <Badge variant="secondary">{map[source]}</Badge>
}

// ─── Tab Definitions ─────────────────────────────────────────

type TabKey = "broadcasts" | "bot" | "groups" | "contacts"

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "broadcasts", label: "שידורים", icon: Radio },
  { key: "bot", label: "בוט", icon: Bot },
  { key: "groups", label: "קבוצות", icon: Users },
  { key: "contacts", label: "אנשי קשר", icon: MessageSquare },
]

// ─── Stat Card ───────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number
  icon: React.ElementType
}) {
  return (
    <Card className="glass border-0 p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-5 w-5 text-amber-500/70" />
      </div>
      <div className="text-2xl font-extrabold text-foreground">{value}</div>
    </Card>
  )
}

// ─── Tab: Broadcasts ─────────────────────────────────────────

function BroadcastsTab() {
  const totalSent = BROADCASTS.filter((b) => b.status === "sent").reduce(
    (acc, b) => acc + b.recipients,
    0
  )
  const totalDelivered = BROADCASTS.filter((b) => b.status === "sent").reduce(
    (acc, b) => acc + b.delivered,
    0
  )
  const totalRead = BROADCASTS.filter((b) => b.status === "sent").reduce(
    (acc, b) => acc + b.read,
    0
  )
  const lastBroadcast = BROADCASTS.filter((b) => b.status === "sent").sort(
    (a, b) => b.date.localeCompare(a.date)
  )[0]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="סה״כ נשלחו" value={totalSent.toLocaleString("he-IL")} icon={Send} />
        <StatCard label="שיעור מסירה" value={pct(totalDelivered, totalSent)} icon={CheckCheck} />
        <StatCard label="שיעור קריאה" value={pct(totalRead, totalSent)} icon={Eye} />
        <StatCard
          label="שידור אחרון"
          value={lastBroadcast ? new Date(lastBroadcast.date).toLocaleDateString("he-IL") : "—"}
          icon={Clock}
        />
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          <Plus className="h-4 w-4 ml-2" />
          שידור חדש
        </Button>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">כותרת</TableHead>
              <TableHead className="text-right">תאריך</TableHead>
              <TableHead className="text-right">נמענים</TableHead>
              <TableHead className="text-right">נמסרו</TableHead>
              <TableHead className="text-right">נקראו</TableHead>
              <TableHead className="text-right">סטטוס</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BROADCASTS.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.title}</TableCell>
                <TableCell>{new Date(b.date).toLocaleDateString("he-IL")}</TableCell>
                <TableCell>{b.recipients.toLocaleString("he-IL")}</TableCell>
                <TableCell>{b.status === "sent" ? b.delivered.toLocaleString("he-IL") : "—"}</TableCell>
                <TableCell>{b.status === "sent" ? b.read.toLocaleString("he-IL") : "—"}</TableCell>
                <TableCell>{statusBadge(b.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

// ─── Tab: Bot Flows ──────────────────────────────────────────

function BotFlowsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {BOT_FLOWS.map((flow) => (
        <Card key={flow.trigger} className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-amber-500/70" />
              <span className="font-bold text-foreground">
                &quot;{flow.trigger}&quot;
              </span>
            </div>
            <Badge
              variant={flow.status === "active" ? "default" : "outline"}
              className={
                flow.status === "active"
                  ? "bg-emerald-600 text-white"
                  : "text-muted-foreground"
              }
            >
              {flow.status === "active" ? "פעיל" : "מתוכנן"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {flow.description}
          </p>
          <div className="flex items-center justify-between">
            {flow.messageCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {flow.messageCount} הודעות
              </span>
            )}
            <Button variant="outline" size="sm" className="mr-auto">
              עריכה
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

// ─── Tab: Groups ─────────────────────────────────────────────

function GroupsTab() {
  const nearCapacity = GROUPS.filter((g) => g.members > 1800)

  return (
    <div className="space-y-6">
      {/* Alert */}
      {nearCapacity.length > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
            <div>
              <p className="font-bold text-foreground text-sm">
                קבוצות קרובות לקיבולת מלאה
              </p>
              <p className="text-sm text-muted-foreground">
                {nearCapacity.map((g) => g.name).join(", ")} — מעל 1,800 חברים.
                מומלץ לפתוח קבוצה חדשה.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Action */}
      <div className="flex justify-end">
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          <Plus className="h-4 w-4 ml-2" />
          צור קבוצה חדשה
        </Button>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">שם קבוצה</TableHead>
              <TableHead className="text-right">חברים</TableHead>
              <TableHead className="text-right">קיבולת</TableHead>
              <TableHead className="text-right min-w-[140px]">מילוי</TableHead>
              <TableHead className="text-right">סטטוס</TableHead>
              <TableHead className="text-right">קישור הזמנה</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GROUPS.map((g) => {
              const fillPct = Math.round((g.members / g.capacity) * 100)
              const isNearFull = g.members > 1800
              return (
                <TableRow key={g.name}>
                  <TableCell className="font-medium">{g.name}</TableCell>
                  <TableCell>{g.members.toLocaleString("he-IL")}</TableCell>
                  <TableCell>{g.capacity.toLocaleString("he-IL")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={fillPct}
                        className={isNearFull ? "[&_[data-slot=progress-indicator]]:bg-amber-500" : ""}
                      />
                      <span className={`text-xs font-medium tabular-nums ${isNearFull ? "text-amber-500" : "text-muted-foreground"}`}>
                        {fillPct}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">פעילה</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={g.inviteLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

// ─── Tab: Contacts ───────────────────────────────────────────

function ContactsTab() {
  const [search, setSearch] = useState("")
  const totalContacts = 1226
  const activeContacts = CONTACTS.filter((c) => c.engagement > 50).length
  const allTags = [...new Set(CONTACTS.flatMap((c) => c.tags))]

  const filtered = CONTACTS.filter(
    (c) =>
      c.name.includes(search) ||
      c.phone.includes(search) ||
      c.tags.some((t) => t.includes(search))
  )

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="סה״כ אנשי קשר" value={totalContacts.toLocaleString("he-IL")} icon={Users} />
        <StatCard label="פעילים" value={activeContacts} icon={MessageSquare} />
        <StatCard label="תגיות" value={allTags.length} icon={Radio} />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="חיפוש לפי שם, טלפון או תגית..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">שם</TableHead>
              <TableHead className="text-right">טלפון</TableHead>
              <TableHead className="text-right">מקור</TableHead>
              <TableHead className="text-right">תגיות</TableHead>
              <TableHead className="text-right">מעורבות</TableHead>
              <TableHead className="text-right">הודעה אחרונה</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.phone}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="tabular-nums" dir="ltr">
                  {c.phone}
                </TableCell>
                <TableCell>{sourceBadge(c.source)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={c.engagement}
                      className={
                        c.engagement >= 80
                          ? "[&_[data-slot=progress-indicator]]:bg-emerald-500"
                          : c.engagement >= 50
                            ? "[&_[data-slot=progress-indicator]]:bg-amber-500"
                            : "[&_[data-slot=progress-indicator]]:bg-red-500"
                      }
                    />
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {c.engagement}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(c.lastMessage).toLocaleDateString("he-IL")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────

export default function MessagingDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>("broadcasts")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">
          הודעות ובוט
        </h1>
        <p className="text-muted-foreground">
          ניהול שידורים, תגובות בוט, קבוצות ואנשי קשר
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all cursor-pointer
                ${
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "broadcasts" && <BroadcastsTab />}
      {activeTab === "bot" && <BotFlowsTab />}
      {activeTab === "groups" && <GroupsTab />}
      {activeTab === "contacts" && <ContactsTab />}
    </div>
  )
}
