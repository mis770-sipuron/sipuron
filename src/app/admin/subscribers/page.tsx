"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Search, Users, Filter, MoreHorizontal, Eye, Edit, XCircle, MessageCircle, Loader2,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SubscriberStatus = "active" | "trial" | "cancelled" | "failed"

interface Subscriber {
  id: string
  name: string
  phone: string
  email: string
  status: SubscriberStatus
  plan: string
  joinedAt: string
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG: Record<SubscriberStatus, { label: string; className: string }> = {
  active:    { label: "פעיל",    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  trial:     { label: "ניסיון",  className: "bg-blue-500/15 text-blue-700 dark:text-blue-400" },
  cancelled: { label: "מבוטל",   className: "bg-red-500/15 text-red-700 dark:text-red-400" },
  failed:    { label: "כשל תשלום", className: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
}

const FILTER_OPTIONS: { value: SubscriberStatus | "all"; label: string }[] = [
  { value: "all",       label: "הכל" },
  { value: "active",    label: "פעילים" },
  { value: "trial",     label: "ניסיון" },
  { value: "cancelled", label: "מבוטלים" },
  { value: "failed",    label: "כשל תשלום" },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SubscribersPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<SubscriberStatus | "all">("all")
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, active: 0, trial: 0, cancelledThisMonth: 0 })

  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    // Build query — profiles joined with latest subscription for plan info
    let query = supabase
      .from("profiles")
      .select("id, full_name, phone, email, subscription_status, created_at, subscriptions(plan_id, amount, plans(name))")
      .order("created_at", { ascending: false })

    // Apply status filter at DB level
    if (filter !== "all") {
      query = query.eq("subscription_status", filter)
    }

    // Apply search at DB level
    if (search.trim()) {
      // Use or filter for name, phone, email
      query = query.or(
        `full_name.ilike.%${search.trim()}%,phone.ilike.%${search.trim()}%,email.ilike.%${search.trim()}%`
      )
    }

    const { data, error } = await query.limit(200)

    if (!error && data) {
      const mapped: Subscriber[] = data.map((p: any) => {
        const latestSub = Array.isArray(p.subscriptions) && p.subscriptions.length > 0
          ? p.subscriptions[p.subscriptions.length - 1]
          : null
        const planName = latestSub?.plans?.name || (p.subscription_status === "trial" ? "ניסיון" : "---")

        // Map subscription_status to our display status
        let status: SubscriberStatus = "active"
        if (p.subscription_status === "cancelled") status = "cancelled"
        else if (p.subscription_status === "trial" || p.subscription_status === "free") status = "trial"
        else if (p.subscription_status === "failed") status = "failed"
        else if (p.subscription_status === "expired") status = "cancelled"

        return {
          id: p.id,
          name: p.full_name || "---",
          phone: p.phone || "---",
          email: p.email || "---",
          status,
          plan: planName,
          joinedAt: p.created_at,
        }
      })
      setSubscribers(mapped)
    }
    setLoading(false)
  }, [search, filter])

  // Fetch stats separately (always full counts, not affected by filters)
  useEffect(() => {
    const supabase = createClient()

    async function fetchStats() {
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()

      const [totalRes, activeRes, trialRes, cancelledRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("subscription_status", "active"),
        supabase.from("profiles").select("id", { count: "exact", head: true }).in("subscription_status", ["trial", "free"]),
        supabase.from("subscriptions").select("id", { count: "exact", head: true })
          .eq("status", "cancelled")
          .gte("updated_at", monthStart),
      ])

      setStats({
        total: totalRes.count ?? 0,
        active: activeRes.count ?? 0,
        trial: trialRes.count ?? 0,
        cancelledThisMonth: cancelledRes.count ?? 0,
      })
    }

    fetchStats()
  }, [])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSubscribers()
    }, 300)
    return () => clearTimeout(timer)
  }, [fetchSubscribers])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">ניהול מנויים</h1>
          <p className="text-muted-foreground text-sm">חיפוש, סינון וניהול כל המנויים</p>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 ml-2" />
          ייצוא
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">סה&quot;כ מנויים</span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-xl font-extrabold text-foreground">{stats.total}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">פעילים</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-emerald-600">{stats.active}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">ניסיון</span>
            <span className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <div className="text-xl font-extrabold text-blue-600">{stats.trial}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">ביטולים החודש</span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </div>
          <div className="text-xl font-extrabold text-red-600">{stats.cancelledThisMonth}</div>
        </Card>
      </div>

      {/* Search + filter chips */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש לפי שם, טלפון או מייל..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={filter === opt.value ? "default" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => setFilter(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
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
              <TableHead className="text-right">מייל</TableHead>
              <TableHead className="text-right">סטטוס</TableHead>
              <TableHead className="text-right">תוכנית</TableHead>
              <TableHead className="text-right">תאריך הצטרפות</TableHead>
              <TableHead className="text-right">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  לא נמצאו מנויים
                </TableCell>
              </TableRow>
            )}
            {subscribers.map((sub) => {
              const statusCfg = STATUS_CONFIG[sub.status]
              return (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.name}</TableCell>
                  <TableCell dir="ltr" className="text-right">{sub.phone}</TableCell>
                  <TableCell dir="ltr" className="text-right">{sub.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusCfg.className}>
                      {statusCfg.label}
                    </Badge>
                  </TableCell>
                  <TableCell>{sub.plan}</TableCell>
                  <TableCell>{new Date(sub.joinedAt).toLocaleDateString("he-IL")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" side="bottom">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 ml-2" />
                          צפייה
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 ml-2" />
                          עריכה
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="h-4 w-4 ml-2" />
                          שלח הודעה
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <XCircle className="h-4 w-4 ml-2" />
                          ביטול מנוי
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        )}
        </div>
      </Card>
    </div>
  )
}
