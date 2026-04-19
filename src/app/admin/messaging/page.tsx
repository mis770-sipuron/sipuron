"use client"

import { useState, useEffect, useCallback } from "react"
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
  Plus, ExternalLink, AlertTriangle, Eye, Clock, CheckCheck, Loader2,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

// ─── Types ──────────────────────────────────────────────────

interface Broadcast {
  id: string
  title: string
  date: string
  recipients: number
  delivered: number
  read: number
  status: "sent" | "scheduled" | "draft"
}

interface BotFlow {
  trigger: string
  description: string
  status: "active" | "planned"
  messageCount: number
}

interface Group {
  id: string
  name: string
  members: number
  capacity: number
  status: string
  inviteLink: string
}

interface Contact {
  id: string
  name: string
  phone: string
  source: "signup" | "bot" | "import"
  tags: string[]
  engagement: number
  lastMessage: string
}

// ─── Mock Data (for broadcasts & bot — no real data tables yet) ───

const MOCK_BOT_FLOWS: BotFlow[] = [
  {
    trigger: "הודעה ראשונה",
    description: "Welcome flow — 4 הודעות ברצף",
    status: "active",
    messageCount: 4,
  },
  {
    trigger: "הצטרפות",
    description: "קישור לדף המכירה",
    status: "active",
    messageCount: 1,
  },
  {
    trigger: "ביטול",
    description: "Retention flow — הנחה + שאלון סיבה",
    status: "active",
    messageCount: 3,
  },
  {
    trigger: "סיפור / מה מומלץ",
    description: "ממליץ סיפורים לפי גיל וטעם",
    status: "planned",
    messageCount: 0,
  },
  {
    trigger: "עזרה",
    description: "FAQ — שאלות נפוצות",
    status: "active",
    messageCount: 5,
  },
  {
    trigger: "כשל תשלום",
    description: "Dunning flow — תזכורת תשלום + עדכון כרטיס",
    status: "planned",
    messageCount: 0,
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

// ─── Tab: Broadcasts (from Supabase broadcasts table) ────────

function BroadcastsTab() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("broadcasts")
      .select("id, title, scheduled_at, sent_at, total_recipients, delivered, status")
      .order("scheduled_at", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (!error && data) {
          setBroadcasts(
            data.map((b: any) => ({
              id: b.id,
              title: b.title,
              date: b.sent_at || b.scheduled_at || "",
              recipients: b.total_recipients || 0,
              delivered: b.delivered || 0,
              read: 0, // no read tracking column yet
              status: b.status === "sent" ? "sent" : b.status === "scheduled" ? "scheduled" : "draft",
            }))
          )
        }
        setLoading(false)
      })
  }, [])

  const sentBroadcasts = broadcasts.filter((b) => b.status === "sent")
  const totalSent = sentBroadcasts.reduce((acc, b) => acc + b.recipients, 0)
  const totalDelivered = sentBroadcasts.reduce((acc, b) => acc + b.delivered, 0)
  const lastBroadcast = sentBroadcasts.sort((a, b) => b.date.localeCompare(a.date))[0]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="סה״כ נשלחו" value={totalSent.toLocaleString("he-IL")} icon={Send} />
        <StatCard label="שיעור מסירה" value={pct(totalDelivered, totalSent)} icon={CheckCheck} />
        <StatCard label="שידורים" value={broadcasts.length} icon={Eye} />
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="mr-2 text-muted-foreground">טוען...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">כותרת</TableHead>
                <TableHead className="text-right">תאריך</TableHead>
                <TableHead className="text-right">נמענים</TableHead>
                <TableHead className="text-right">נמסרו</TableHead>
                <TableHead className="text-right">סטטוס</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {broadcasts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    אין שידורים
                  </TableCell>
                </TableRow>
              )}
              {broadcasts.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.title}</TableCell>
                  <TableCell>{b.date ? new Date(b.date).toLocaleDateString("he-IL") : "—"}</TableCell>
                  <TableCell>{b.recipients.toLocaleString("he-IL")}</TableCell>
                  <TableCell>{b.status === "sent" ? b.delivered.toLocaleString("he-IL") : "—"}</TableCell>
                  <TableCell>{statusBadge(b.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}

// ─── Tab: Bot Flows (still static — no dynamic table) ───────

function BotFlowsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {MOCK_BOT_FLOWS.map((flow) => (
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

// ─── Tab: Groups (from Supabase whatsapp_groups) ────────────

function GroupsTab() {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("whatsapp_groups")
      .select("id, name, member_count, max_capacity, status, invite_link")
      .order("name", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setGroups(
            data.map((g: any) => ({
              id: g.id,
              name: g.name,
              members: g.member_count || 0,
              capacity: g.max_capacity || 2000,
              status: g.status || "active",
              inviteLink: g.invite_link || "",
            }))
          )
        }
        setLoading(false)
      })
  }, [])

  const nearCapacity = groups.filter((g) => g.members > 1800)

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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="mr-2 text-muted-foreground">טוען...</span>
          </div>
        ) : (
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
              {groups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    אין קבוצות
                  </TableCell>
                </TableRow>
              )}
              {groups.map((g) => {
                const fillPct = Math.round((g.members / g.capacity) * 100)
                const isNearFull = g.members > 1800
                return (
                  <TableRow key={g.id}>
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
                      <Badge variant="secondary">
                        {g.status === "active" ? "פעילה" : g.status === "full" ? "מלאה" : "ארכיון"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {g.inviteLink ? (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={g.inviteLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}

// ─── Tab: Contacts (from Supabase contacts table) ───────────

function ContactsTab() {
  const [search, setSearch] = useState("")
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [totalContacts, setTotalContacts] = useState(0)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    let query = supabase
      .from("contacts")
      .select("id, name, phone, source, tags, engagement_score, last_message_at")
      .order("last_message_at", { ascending: false })

    if (search.trim()) {
      query = query.or(
        `name.ilike.%${search.trim()}%,phone.ilike.%${search.trim()}%`
      )
    }

    const { data, error } = await query.limit(100)

    if (!error && data) {
      setContacts(
        data.map((c: any) => ({
          id: c.id,
          name: c.name || "---",
          phone: c.phone || "---",
          source: (c.source === "signup" || c.source === "bot" ? c.source : "import") as "signup" | "bot" | "import",
          tags: Array.isArray(c.tags) ? c.tags : [],
          engagement: c.engagement_score || 0,
          lastMessage: c.last_message_at || "",
        }))
      )
    }
    setLoading(false)
  }, [search])

  // Count total contacts once
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("contacts")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => {
        setTotalContacts(count ?? 0)
      })
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts()
    }, 300)
    return () => clearTimeout(timer)
  }, [fetchContacts])

  const activeContacts = contacts.filter((c) => c.engagement > 50).length
  const allTags = [...new Set(contacts.flatMap((c) => c.tags))]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="סה״כ אנשי קשר" value={totalContacts.toLocaleString("he-IL")} icon={Users} />
        <StatCard label="פעילים (מתצוגה)" value={activeContacts} icon={MessageSquare} />
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="mr-2 text-muted-foreground">טוען...</span>
          </div>
        ) : (
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
              {contacts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    לא נמצאו אנשי קשר
                  </TableCell>
                </TableRow>
              )}
              {contacts.map((c) => (
                <TableRow key={c.id}>
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
                    {c.lastMessage ? new Date(c.lastMessage).toLocaleDateString("he-IL") : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
          הודעות ובוט
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          ניהול שידורים, תגובות בוט, קבוצות ואנשי קשר
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all cursor-pointer whitespace-nowrap
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
      </div>

      {/* Tab Content */}
      {activeTab === "broadcasts" && <BroadcastsTab />}
      {activeTab === "bot" && <BotFlowsTab />}
      {activeTab === "groups" && <GroupsTab />}
      {activeTab === "contacts" && <ContactsTab />}
    </div>
  )
}
