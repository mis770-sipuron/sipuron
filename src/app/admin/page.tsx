"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fmtCurrency, fmtNumber } from "@/lib/constants"
import {
  TrendingUp, TrendingDown, Users, DollarSign,
  AlertTriangle, BookOpen, Plus, Search, RefreshCw, Map, Loader2
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface KpiData {
  activeSubscribers: number
  paymentsThisMonth: number
  groupCount: number
  failedPayments: number
}

interface ActivityItem {
  type: "signup" | "story" | "cancel" | "milestone"
  text: string
  time: string
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return "עכשיו"
  if (diffMin < 60) return `לפני ${diffMin} דק'`
  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) return `לפני ${diffHours} שעות`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return "אתמול"
  return `לפני ${diffDays} ימים`
}

export default function AdminDashboard() {
  const [kpis, setKpis] = useState<KpiData | null>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function fetchData() {
      setLoading(true)

      // All queries in parallel
      const [
        activeRes,
        paymentsRes,
        groupsRes,
        failedRes,
        recentSignupsRes,
        recentStoriesRes,
        recentCancelsRes,
      ] = await Promise.all([
        // Count active subscribers
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("subscription_status", "active"),

        // Sum payments this month
        supabase
          .from("payments")
          .select("amount")
          .eq("status", "success")
          .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),

        // Count WhatsApp groups
        supabase
          .from("whatsapp_groups")
          .select("id", { count: "exact", head: true })
          .eq("status", "active"),

        // Count failed payments this month
        supabase
          .from("payments")
          .select("id", { count: "exact", head: true })
          .eq("status", "failed")
          .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),

        // Recent signups (last 10)
        supabase
          .from("profiles")
          .select("full_name, created_at")
          .order("created_at", { ascending: false })
          .limit(5),

        // Recent published stories
        supabase
          .from("stories")
          .select("title, published_at")
          .eq("status", "published")
          .not("published_at", "is", null)
          .order("published_at", { ascending: false })
          .limit(3),

        // Recent cancellations
        supabase
          .from("subscriptions")
          .select("user_id, cancel_reason, updated_at, profiles(full_name)")
          .eq("status", "cancelled")
          .order("updated_at", { ascending: false })
          .limit(3),
      ])

      // Calculate KPIs
      const paymentsTotal = (paymentsRes.data || []).reduce(
        (sum: number, p: { amount: number }) => sum + Number(p.amount),
        0
      )

      setKpis({
        activeSubscribers: activeRes.count ?? 0,
        paymentsThisMonth: paymentsTotal,
        groupCount: groupsRes.count ?? 0,
        failedPayments: failedRes.count ?? 0,
      })

      // Build activity feed
      const items: ActivityItem[] = []

      for (const s of recentSignupsRes.data || []) {
        items.push({
          type: "signup",
          text: `${s.full_name || "משתמש חדש"} נרשם/ה`,
          time: timeAgo(s.created_at),
        })
      }

      for (const s of recentStoriesRes.data || []) {
        items.push({
          type: "story",
          text: `סיפור חדש פורסם: "${s.title}"`,
          time: timeAgo(s.published_at!),
        })
      }

      for (const c of recentCancelsRes.data || []) {
        const name = (c as any).profiles?.full_name || "משתמש"
        const reason = c.cancel_reason ? ` (סיבה: ${c.cancel_reason})` : ""
        items.push({
          type: "cancel",
          text: `${name} ביטל/ה מנוי${reason}`,
          time: timeAgo(c.updated_at),
        })
      }

      // Sort by most recent (rough approximation — the timeAgo strings aren't sortable,
      // but we can sort by original timestamp if we keep them)
      // Just interleave: signups first, then stories, then cancels — already limited
      setActivity(items.slice(0, 8))
      setLoading(false)
    }

    fetchData()
  }, [])

  const kpiCards = kpis
    ? [
        {
          title: "הכנסות החודש",
          value: fmtCurrency(kpis.paymentsThisMonth),
          change: "",
          trend: "up" as const,
          icon: DollarSign,
        },
        {
          title: "מנויים פעילים",
          value: fmtNumber(kpis.activeSubscribers),
          change: "",
          trend: "up" as const,
          icon: Users,
        },
        {
          title: "קבוצות פעילות",
          value: String(kpis.groupCount),
          change: "",
          trend: "up" as const,
          icon: TrendingUp,
        },
        {
          title: "כשלי תשלום",
          value: String(kpis.failedPayments),
          change: kpis.failedPayments > 0 ? "דורש טיפול" : "הכל תקין",
          trend: kpis.failedPayments > 0 ? ("down" as const) : ("up" as const),
          icon: AlertTriangle,
        },
      ]
    : []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">בוקר טוב, יוסף</h1>
          <p className="text-muted-foreground">סקירה כללית — {new Date().toLocaleDateString('he-IL')}</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 ml-2" />
          סנכרן Cardcom
        </Button>
      </div>

      {/* KPI Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="mr-2 text-muted-foreground">טוען...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.title} className="p-5 glass border-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{kpi.title}</span>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-2xl font-extrabold text-foreground">
                  {kpi.value}
                </div>
                {kpi.change && (
                  <div className={`text-xs mt-1 flex items-center gap-1 ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {kpi.change}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/admin/stories/new">
            <Plus className="h-5 w-5" />
            <span className="text-xs">הוסף סיפור</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/admin/subscribers">
            <Search className="h-5 w-5" />
            <span className="text-xs">חפש מנוי</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/admin/finance">
            <DollarSign className="h-5 w-5" />
            <span className="text-xs">דשבורד כספים</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
          <Link href="/admin/roadmap">
            <Map className="h-5 w-5" />
            <span className="text-xs">רודמאפ</span>
          </Link>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">פעילות אחרונה</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="mr-2 text-muted-foreground">טוען...</span>
          </div>
        ) : activity.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">אין פעילות אחרונה</p>
        ) : (
          <div className="space-y-4">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${
                  item.type === 'signup' ? 'bg-emerald-500' :
                  item.type === 'cancel' ? 'bg-red-500' :
                  item.type === 'story' ? 'bg-blue-500' :
                  'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
