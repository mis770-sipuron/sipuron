"use client"

import { useState } from "react"
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
  Search, Users, Filter, MoreHorizontal, Eye, Edit, XCircle, MessageCircle,
} from "lucide-react"

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
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const SUBSCRIBERS: Subscriber[] = [
  { id: "1", name: "שרה כהן",      phone: "054-1234567", email: "sara@email.com",     status: "active",    plan: "חודשי",  joinedAt: "2026-01-15" },
  { id: "2", name: "דוד לוי",      phone: "052-9876543", email: "david@email.com",    status: "active",    plan: "שנתי",   joinedAt: "2025-11-02" },
  { id: "3", name: "רחל מזרחי",    phone: "050-5551234", email: "rachel@email.com",   status: "cancelled", plan: "חודשי",  joinedAt: "2025-09-20" },
  { id: "4", name: "יעקב אברהם",   phone: "053-7778899", email: "yaakov@email.com",   status: "trial",     plan: "ניסיון", joinedAt: "2026-04-10" },
  { id: "5", name: "מרים גולדשטיין", phone: "058-3334455", email: "miriam@email.com",  status: "active",    plan: "שנתי",   joinedAt: "2025-12-01" },
  { id: "6", name: "אברהם פרידמן",  phone: "054-6667788", email: "avraham@email.com",  status: "failed",    plan: "חודשי",  joinedAt: "2026-02-14" },
  { id: "7", name: "חנה ברקוביץ׳",  phone: "052-1112233", email: "chana@email.com",    status: "trial",     plan: "ניסיון", joinedAt: "2026-04-12" },
  { id: "8", name: "משה שמעוני",    phone: "050-4445566", email: "moshe@email.com",    status: "active",    plan: "חודשי",  joinedAt: "2026-03-05" },
]

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

  const filtered = SUBSCRIBERS.filter((s) => {
    const matchesSearch =
      !search ||
      s.name.includes(search) ||
      s.phone.includes(search) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || s.status === filter
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: SUBSCRIBERS.length,
    active: SUBSCRIBERS.filter((s) => s.status === "active").length,
    trial: SUBSCRIBERS.filter((s) => s.status === "trial").length,
    cancelledThisMonth: SUBSCRIBERS.filter(
      (s) => s.status === "cancelled" && s.joinedAt >= "2026-04-01"
    ).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">ניהול מנויים</h1>
          <p className="text-muted-foreground text-sm">חיפוש, סינון וניהול כל המנויים</p>
        </div>
        <Button variant="outline" size="sm">
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
        <div className="flex gap-2 flex-wrap">
          {FILTER_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={filter === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
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
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  לא נמצאו מנויים
                </TableCell>
              </TableRow>
            )}
            {filtered.map((sub) => {
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
      </Card>
    </div>
  )
}
