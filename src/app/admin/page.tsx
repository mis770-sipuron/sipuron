import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fmtCurrency, fmtNumber } from "@/lib/constants"
import {
  TrendingUp, TrendingDown, Users, DollarSign,
  AlertTriangle, BookOpen, Plus, Search, RefreshCw, Map
} from "lucide-react"
import Link from "next/link"

// Mock data — will come from Supabase + Cardcom
const KPIs = [
  {
    title: "MRR",
    value: fmtCurrency(45216),
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "מנויים פעילים",
    value: fmtNumber(836),
    change: "+201",
    trend: "up",
    icon: Users,
  },
  {
    title: "חדשים השבוע",
    value: "35",
    change: "מתוכם 20 ב-₪5",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "כשלי תשלום",
    value: "3",
    change: "דורש טיפול",
    trend: "down",
    icon: AlertTriangle,
  },
]

const RECENT_ACTIVITY = [
  { type: "signup", text: "שרה כהן נרשמה למנוי חודשי", time: "לפני 12 דק'" },
  { type: "signup", text: "דוד לוי נרשם למנוי שנתי", time: "לפני 45 דק'" },
  { type: "story", text: "סיפור חדש פורסם: \"האריה והנמלה\"", time: "לפני 2 שעות" },
  { type: "cancel", text: "רחל מזרחי ביטלה מנוי (סיבה: יקר)", time: "אתמול" },
  { type: "milestone", text: "פרויקט \"חוזה win-win\" הגיע ל-50%", time: "אתמול" },
]

export default function AdminDashboard() {
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
              <div className={`text-xs mt-1 flex items-center gap-1 ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.change}
              </div>
            </Card>
          )
        })}
      </div>

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
        <div className="space-y-4">
          {RECENT_ACTIVITY.map((item, i) => (
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
      </Card>
    </div>
  )
}
