"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import { fmtCurrency } from "@/lib/constants"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import {
  TrendingUp, TrendingDown, DollarSign, Users,
  RefreshCw, RotateCcw, CreditCard, Percent, Loader2, Wifi, WifiOff,
} from "lucide-react"
import Link from "next/link"
import {
  useCardcomTransactions,
  useCardcomFailures,
  useSyncCardcom,
} from "@/lib/hooks/use-cardcom-data"

/* ───────── KPI data ───────── */
// TODO: Replace with dynamic Supabase fetch (cardcom_transactions + whatsapp_groups)
// Data synced from Cardcom on 2026-04-16: March=45,081 NIS, April(partial)=25,600 NIS
// Communities synced from Green API: 36 announcement groups, 15,719 members
const KPIs = [
  {
    title: "MRR (מרץ)",
    value: fmtCurrency(45081),
    change: "+27.3%",
    subtitle: "מפברואר (35,415)",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "אפריל (חלקי)",
    value: fmtCurrency(25600),
    change: "598 עסקאות",
    subtitle: "עד 16/04",
    trend: "up" as const,
    icon: CreditCard,
  },
  {
    title: "קהילות הכרזות",
    value: "15,719",
    change: "36 קבוצות",
    subtitle: "חברים בקבוצות סיפורון",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "שיעור נטישה",
    value: "0.1%",
    change: "0 ביטולים באפריל",
    subtitle: "ביטול 1 במרץ",
    trend: "down" as const,
    icon: Percent,
  },
]

/* ───────── Revenue chart data ───────── */
const revenueData = [
  { month: "אוג׳ 25", mrr: 2110 },
  { month: "ספט׳", mrr: 13990 },
  { month: "אוק׳", mrr: 26280 },
  { month: "נוב׳", mrr: 25990 },
  { month: "דצמ׳", mrr: 26893 },
  { month: "ינו׳ 26", mrr: 29232 },
  { month: "פבר׳", mrr: 35415 },
  { month: "מרץ", mrr: 45216 },
  { month: "אפר׳ (חלקי)", mrr: 22540 },
]

/* ───────── Subscriber growth data ───────── */
const subscriberData = [
  { month: "אוג׳ 25", new: 299, cancel: 5 },
  { month: "ספט׳", new: 374, cancel: 31 },
  { month: "אוק׳", new: 0, cancel: 30 },
  { month: "נוב׳", new: 87, cancel: 13 },
  { month: "דצמ׳", new: 0, cancel: 5 },
  { month: "ינו׳ 26", new: 175, cancel: 4 },
  { month: "פבר׳", new: 117, cancel: 6 },
  { month: "מרץ", new: 201, cancel: 1 },
  { month: "אפר׳", new: 35, cancel: 0 },
]

/* ───────── Failed payments mock ───────── */
const failedPayments = [
  {
    name: "יעל אברהמי",
    phone: "054-7891234",
    amount: 49.9,
    date: "2026-04-12",
    retries: 2,
    status: "ממתין",
  },
  {
    name: "משה דוידוב",
    phone: "052-3456789",
    amount: 49.9,
    date: "2026-04-10",
    retries: 3,
    status: "נכשל סופית",
  },
  {
    name: "רונית שפירא",
    phone: "050-1122334",
    amount: 478.8,
    date: "2026-04-11",
    retries: 1,
    status: "ממתין",
  },
]

/* ───────── Recent transactions mock ───────── */
const recentTransactions = [
  { name: "שרה כהן", amount: 49.9, status: "הצליח", date: "2026-04-14" },
  { name: "דוד לוי", amount: 478.8, status: "הצליח", date: "2026-04-14" },
  { name: "חנה פרידמן", amount: 5, status: "הצליח", date: "2026-04-13" },
  { name: "אבי גולן", amount: 49.9, status: "הצליח", date: "2026-04-13" },
  { name: "יעל אברהמי", amount: 49.9, status: "נכשל", date: "2026-04-12" },
  { name: "מירב שלום", amount: 49.9, status: "הצליח", date: "2026-04-12" },
  { name: "רונית שפירא", amount: 478.8, status: "נכשל", date: "2026-04-11" },
  { name: "עמית ברק", amount: 5, status: "הצליח", date: "2026-04-11" },
  { name: "משה דוידוב", amount: 49.9, status: "נכשל", date: "2026-04-10" },
  { name: "נועה רביד", amount: 49.9, status: "הצליח", date: "2026-04-10" },
]

/* ───────── Custom tooltip ───────── */
function CurrencyTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg bg-background/95 backdrop-blur-sm border border-border px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="text-sm font-bold" style={{ color: entry.color }}>
          {entry.name}: {entry.dataKey === "mrr" ? fmtCurrency(entry.value) : entry.value}
        </p>
      ))}
    </div>
  )
}

/* ───────── Month options ───────── */
const MONTH_OPTIONS = [
  { value: "012026", label: "ינואר 2026" },
  { value: "022026", label: "פברואר 2026" },
  { value: "032026", label: "מרץ 2026" },
  { value: "042026", label: "אפריל 2026" },
  { value: "052026", label: "מאי 2026" },
  { value: "062026", label: "יוני 2026" },
  { value: "072026", label: "יולי 2026" },
  { value: "082026", label: "אוגוסט 2026" },
  { value: "092026", label: "ספטמבר 2026" },
  { value: "102026", label: "אוקטובר 2026" },
  { value: "112026", label: "נובמבר 2026" },
  { value: "122026", label: "דצמבר 2026" },
  { value: "082025", label: "אוגוסט 2025" },
  { value: "092025", label: "ספטמבר 2025" },
  { value: "102025", label: "אוקטובר 2025" },
  { value: "112025", label: "נובמבר 2025" },
  { value: "122025", label: "דצמבר 2025" },
]

/* ───────── Page ───────── */
export default function FinanceDashboard() {
  /* ── Live/Mock state ── */
  const [useLiveData, setUseLiveData] = useState(false)
  const now = new Date()
  const defaultMonth = `${String(now.getMonth() + 1).padStart(2, "0")}${now.getFullYear()}`
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth)

  // Calculate DDMMYYYY date range from selectedMonth (MMYYYY)
  const { fromDate, toDate } = useMemo(() => {
    const mm = selectedMonth.slice(0, 2)
    const yyyy = selectedMonth.slice(2)
    const lastDay = new Date(Number(yyyy), Number(mm), 0).getDate()
    return {
      fromDate: `01${mm}${yyyy}`,
      toDate: `${String(lastDay).padStart(2, "0")}${mm}${yyyy}`,
    }
  }, [selectedMonth])

  // Conditionally fetch (pass empty strings when in mock mode to skip)
  const {
    data: liveTransactions,
    loading: txLoading,
    error: txError,
    refetch: refetchTx,
  } = useCardcomTransactions(useLiveData ? fromDate : "", useLiveData ? toDate : "")

  const {
    data: liveFailures,
    loading: failLoading,
    error: failError,
    refetch: refetchFail,
  } = useCardcomFailures(useLiveData ? fromDate : "", useLiveData ? toDate : "")

  const { sync, syncing, result: syncResult, error: syncError } = useSyncCardcom()

  // Determine connection status
  const isConnected = useLiveData && !txError && !failError
  const hasError = useLiveData && (!!txError || !!failError)
  const isLoading = txLoading || failLoading

  // Build transaction table from live data or fallback to mock
  const displayTransactions = useMemo(() => {
    if (!useLiveData || liveTransactions.length === 0) return recentTransactions
    return liveTransactions.map((tx) => ({
      name: tx.CardOwnerName || "---",
      amount: tx.Amount,
      status: tx.StatusCode === 0 ? "הצליח" : "נכשל",
      date: tx.TransactionDate?.slice(0, 10) || "",
    }))
  }, [useLiveData, liveTransactions])

  // Build failed payments from live data or fallback to mock
  const displayFailures = useMemo(() => {
    if (!useLiveData || liveFailures.length === 0) return failedPayments
    return liveFailures.map((f) => ({
      name: f.CardOwnerName || "---",
      phone: "---",
      amount: f.Amount,
      date: f.TransactionDate?.slice(0, 10) || "",
      retries: 0,
      status: f.FailureReason || f.StatusDescription || "נכשל",
    }))
  }, [useLiveData, liveFailures])

  function handleRefreshAll() {
    refetchTx()
    refetchFail()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">דשבורד כספים</h1>
          <p className="text-muted-foreground text-sm">
            נתוני הכנסות, מנויים ותשלומים — {new Date().toLocaleDateString("he-IL")}
          </p>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
          <Link href="/admin">
            <RotateCcw className="h-4 w-4 ml-2" />
            חזרה לסקירה
          </Link>
        </Button>
      </div>

      {/* ── Data Source Controls ── */}
      <Card className="p-4 glass border-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
          {/* Live/Mock toggle */}
          <div className="flex items-center gap-3">
            <Label htmlFor="live-toggle" className="text-sm font-medium cursor-pointer">
              נתונים חיים
            </Label>
            <Switch
              id="live-toggle"
              checked={useLiveData}
              onCheckedChange={setUseLiveData}
            />
          </div>

          {/* Month selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">חודש:</span>
            <Select value={selectedMonth} onValueChange={(v) => setSelectedMonth(v as string)}>
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTH_OPTIONS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Connection status */}
          <div className="flex items-center gap-2">
            {useLiveData ? (
              isConnected ? (
                <Badge variant="default" className="bg-emerald-600 text-white gap-1.5">
                  <Wifi className="h-3 w-3" />
                  Cardcom מחובר
                </Badge>
              ) : hasError ? (
                <Badge variant="destructive" className="gap-1.5">
                  <WifiOff className="h-3 w-3" />
                  שגיאת חיבור
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  מתחבר...
                </Badge>
              )
            ) : (
              <Badge variant="secondary" className="gap-1.5">
                נתוני דמו
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:mr-auto sm:ml-0">
            {useLiveData && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshAll}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 ml-2" />
                )}
                רענן נתונים
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={sync}
              disabled={syncing}
            >
              {syncing ? (
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 ml-2" />
              )}
              Sync Now
            </Button>
          </div>
        </div>

        {/* Error / sync result messages */}
        {(txError || failError) && useLiveData && (
          <p className="text-destructive text-sm mt-3">
            שגיאה: {txError || failError} — מציג נתוני דמו כגיבוי
          </p>
        )}
        {syncResult && (
          <p className="text-emerald-600 text-sm mt-3">
            סנכרון הושלם — {syncResult.count ?? 0} עסקאות
          </p>
        )}
        {syncError && (
          <p className="text-destructive text-sm mt-3">
            שגיאת סנכרון: {syncError}
          </p>
        )}
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIs.map((kpi) => {
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
                <div
                  className={`text-xs mt-1 flex items-center gap-1 ${
                    kpi.title === "שיעור נטישה"
                      ? "text-emerald-600"
                      : kpi.trend === "up"
                        ? "text-emerald-600"
                        : "text-amber-600"
                  }`}
                >
                  {kpi.title === "שיעור נטישה" ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {kpi.change}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.subtitle}</p>
            </Card>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-4 sm:p-6 glass border-0">
          <h2 className="text-lg font-bold text-foreground mb-4">
            הכנסות חודשיות (MRR)
          </h2>
          <div className="h-64 sm:h-72 min-h-[250px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `₪${(v / 1000).toFixed(0)}K`}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CurrencyTooltip />} />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  name="MRR"
                  stroke="var(--color-chart-1, #F59E0B)"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "var(--color-chart-1, #F59E0B)" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Subscriber Growth Chart */}
        <Card className="p-4 sm:p-6 glass border-0">
          <h2 className="text-lg font-bold text-foreground mb-4">
            צמיחת מנויים
          </h2>
          <div className="h-64 sm:h-72 min-h-[250px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriberData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CurrencyTooltip />} />
                <Legend
                  formatter={(value) =>
                    value === "new" ? "חדשים" : "ביטולים"
                  }
                />
                <Bar
                  dataKey="new"
                  name="new"
                  fill="var(--color-chart-2, #10B981)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="cancel"
                  name="cancel"
                  fill="var(--color-destructive, #F43F5E)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Failed Payments */}
      <Card className="p-4 sm:p-6 glass border-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-foreground">
            תשלומים שנכשלו
            {failLoading && <Loader2 className="inline h-4 w-4 mr-2 animate-spin" />}
          </h2>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 ml-2" />
            נסה שוב הכל
          </Button>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">שם</TableHead>
              <TableHead className="text-right">טלפון</TableHead>
              <TableHead className="text-right">סכום</TableHead>
              <TableHead className="text-right">תאריך</TableHead>
              <TableHead className="text-right">ניסיונות</TableHead>
              <TableHead className="text-right">סטטוס</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayFailures.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell dir="ltr" className="text-right">{row.phone}</TableCell>
                <TableCell>{fmtCurrency(row.amount)}</TableCell>
                <TableCell>{row.date ? new Date(row.date).toLocaleDateString("he-IL") : "---"}</TableCell>
                <TableCell>{row.retries}</TableCell>
                <TableCell>
                  <Badge
                    variant={row.status === "נכשל סופית" ? "destructive" : "secondary"}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {displayFailures.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  {failLoading ? "טוען נתונים..." : "אין תשלומים שנכשלו"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-4 sm:p-6 glass border-0">
        <h2 className="text-lg font-bold text-foreground mb-4">
          עסקאות אחרונות
          {txLoading && <Loader2 className="inline h-4 w-4 mr-2 animate-spin" />}
        </h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">שם</TableHead>
              <TableHead className="text-right">סכום</TableHead>
              <TableHead className="text-right">סטטוס</TableHead>
              <TableHead className="text-right">תאריך</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTransactions.map((tx, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{tx.name}</TableCell>
                <TableCell>{fmtCurrency(tx.amount)}</TableCell>
                <TableCell>
                  <Badge
                    variant={tx.status === "נכשל" ? "destructive" : "default"}
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {tx.date ? new Date(tx.date).toLocaleDateString("he-IL") : "---"}
                </TableCell>
              </TableRow>
            ))}
            {displayTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  {txLoading ? "טוען נתונים..." : "אין עסקאות לתצוגה"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </Card>
    </div>
  )
}
