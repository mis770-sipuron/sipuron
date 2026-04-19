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
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Search, UserPlus, Filter, MoreHorizontal, MessageCircle, Eye,
  Loader2, Upload, Target, TrendingUp, Users, Megaphone,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type LeadStatus = "lead" | "contacted" | "trial" | "converted" | "churned" | "inactive"

interface Lead {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  campaign: string | null
  status: LeadStatus
  join_date: string | null
  last_activity_at: string | null
  schooler_student_id: number | null
}

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  lead:      { label: "ליד",       className: "bg-slate-500/15 text-slate-700 dark:text-slate-300" },
  contacted: { label: "נוצר קשר", className: "bg-blue-500/15 text-blue-700 dark:text-blue-400" },
  trial:     { label: "ניסיון",    className: "bg-purple-500/15 text-purple-700 dark:text-purple-400" },
  converted: { label: "מנוי פעיל", className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  churned:   { label: "נטש",       className: "bg-red-500/15 text-red-700 dark:text-red-400" },
  inactive:  { label: "לא פעיל",   className: "bg-gray-500/15 text-gray-700 dark:text-gray-400" },
}

const STATUS_FILTERS: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all",       label: "הכל" },
  { value: "lead",      label: "לידים" },
  { value: "converted", label: "מנויים" },
  { value: "churned",   label: "נטשו" },
  { value: "contacted", label: "נוצר קשר" },
  { value: "trial",     label: "ניסיון" },
]

const CAMPAIGN_FILTERS = [
  { value: "all", label: "כל המבצעים" },
  { value: "מנוי - מאגר הסיפורים", label: "מנוי פעיל" },
  { value: "מאגר הניצחון (חינמי)", label: "מאגר הניצחון" },
  { value: "חודש כסלו (עונתי)", label: "חודש כסלו" },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all")
  const [campaignFilter, setCampaignFilter] = useState("all")
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<any>(null)
  const [stats, setStats] = useState({
    total: 0, leads: 0, converted: 0, churned: 0,
  })

  /* ---- Fetch leads ---- */
  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    let query = supabase
      .from("leads")
      .select("id, name, email, phone, campaign, status, join_date, last_activity_at, schooler_student_id")
      .order("join_date", { ascending: false })

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter)
    }
    if (campaignFilter !== "all") {
      query = query.eq("campaign", campaignFilter)
    }
    if (search.trim()) {
      query = query.or(
        `name.ilike.%${search.trim()}%,phone.ilike.%${search.trim()}%,email.ilike.%${search.trim()}%`
      )
    }

    const { data, error } = await query.limit(200)

    if (!error && data) {
      setLeads(data as Lead[])
    }
    setLoading(false)
  }, [search, statusFilter, campaignFilter])

  /* ---- Fetch stats ---- */
  useEffect(() => {
    const supabase = createClient()
    async function fetchStats() {
      const [totalRes, leadsRes, convertedRes, churnedRes] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "lead"),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "converted"),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "churned"),
      ])
      setStats({
        total: totalRes.count ?? 0,
        leads: leadsRes.count ?? 0,
        converted: convertedRes.count ?? 0,
        churned: churnedRes.count ?? 0,
      })
    }
    fetchStats()
  }, [importResult])

  /* ---- Debounced search ---- */
  useEffect(() => {
    const timer = setTimeout(() => fetchLeads(), 300)
    return () => clearTimeout(timer)
  }, [fetchLeads])

  /* ---- Import from Schooler ---- */
  async function handleImport() {
    setImporting(true)
    setImportResult(null)
    try {
      const res = await fetch("/api/admin/leads/import-schooler", { method: "POST" })
      const data = await res.json()
      setImportResult(data)
      fetchLeads()
    } catch (err) {
      setImportResult({ error: "שגיאה בייבוא" })
    }
    setImporting(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">ניהול לידים</h1>
          <p className="text-muted-foreground text-sm">כל הלידים מ-Schooler ומקורות נוספים</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={handleImport}
            disabled={importing}
          >
            {importing ? (
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 ml-2" />
            )}
            {importing ? "מייבא..." : "ייבוא מ-Schooler"}
          </Button>
        </div>
      </div>

      {/* Import result */}
      {importResult && (
        <Card className="p-4 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
          {importResult.error ? (
            <p className="text-red-600 text-sm">{importResult.error}</p>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="font-bold text-emerald-700 dark:text-emerald-400">
                ייבוא הושלם בהצלחה
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-muted-foreground">
                <span>תלמידי בי&quot;ס: {importResult.stats?.school_students_fetched}</span>
                <span>תלמידי כסלו: {importResult.stats?.kislev_students_fetched}</span>
                <span>ייחודיים: {importResult.stats?.unique_students}</span>
                <span>נוספו: {importResult.stats?.inserted}</span>
              </div>
              {importResult.campaigns && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(importResult.campaigns).map(([campaign, count]) => (
                    <Badge key={campaign} variant="secondary" className="text-xs">
                      {campaign}: {count as number}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">סה&quot;כ לידים</span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-xl font-extrabold text-foreground">{stats.total.toLocaleString()}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">לידים חדשים</span>
            <Target className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-xl font-extrabold text-blue-600">{stats.leads.toLocaleString()}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">הומרו למנויים</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-emerald-600">{stats.converted.toLocaleString()}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">נטשו</span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </div>
          <div className="text-xl font-extrabold text-red-600">{stats.churned.toLocaleString()}</div>
        </Card>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש לפי שם, טלפון או מייל..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {STATUS_FILTERS.map((opt) => (
              <Button
                key={opt.value}
                variant={statusFilter === opt.value ? "default" : "outline"}
                size="sm"
                className="shrink-0"
                onClick={() => setStatusFilter(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
          {/* Campaign chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CAMPAIGN_FILTERS.map((opt) => (
              <Button
                key={opt.value}
                variant={campaignFilter === opt.value ? "default" : "outline"}
                size="sm"
                className="shrink-0 text-xs"
                onClick={() => setCampaignFilter(opt.value)}
              >
                <Megaphone className="h-3 w-3 ml-1" />
                {opt.label}
              </Button>
            ))}
          </div>
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
                  <TableHead className="text-right">מבצע</TableHead>
                  <TableHead className="text-right">סטטוס</TableHead>
                  <TableHead className="text-right">הצטרפות</TableHead>
                  <TableHead className="text-right">פעילות אחרונה</TableHead>
                  <TableHead className="text-right">פעולות</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {stats.total === 0
                        ? 'אין לידים עדיין. לחץ "ייבוא מ-Schooler" כדי להתחיל'
                        : "לא נמצאו לידים לפי הסינון"}
                    </TableCell>
                  </TableRow>
                )}
                {leads.map((lead) => {
                  const statusCfg = STATUS_CONFIG[lead.status]
                  return (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name || "---"}</TableCell>
                      <TableCell dir="ltr" className="text-right">{lead.phone || "---"}</TableCell>
                      <TableCell dir="ltr" className="text-right text-xs">{lead.email || "---"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          {lead.campaign || "---"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusCfg.className}>
                          {statusCfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {lead.join_date
                          ? new Date(lead.join_date).toLocaleDateString("he-IL")
                          : "---"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {lead.last_activity_at
                          ? new Date(lead.last_activity_at).toLocaleDateString("he-IL")
                          : "---"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" side="bottom">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 ml-2" />
                              צפייה
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageCircle className="h-4 w-4 ml-2" />
                              שלח הודעה
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="h-4 w-4 ml-2" />
                              המר למנוי
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
