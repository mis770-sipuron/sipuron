"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe, CreditCard, MessageSquare, Database, Server, Settings,
} from "lucide-react"
import { DOMAIN, SITE_URL } from "@/lib/constants"

/* ── Connection status items ── */

interface StatusItem {
  label: string
  value: string
  status: "connected" | "warning" | "error"
  icon: React.ElementType
  detail?: string
}

const CONNECTIONS: StatusItem[] = [
  {
    label: "דומיין",
    value: DOMAIN,
    status: "connected",
    icon: Globe,
    detail: SITE_URL,
  },
  {
    label: "Cardcom סליקה",
    value: "מחובר",
    status: "connected",
    icon: CreditCard,
    detail: "טרמינל פעיל — חיובים חוזרים",
  },
  {
    label: "Green API (WhatsApp)",
    value: "מחובר",
    status: "connected",
    icon: MessageSquare,
    detail: "Instance פעיל — שליחה וקבלה",
  },
  {
    label: "Supabase",
    value: "מחובר",
    status: "connected",
    icon: Database,
    detail: "PostgreSQL + Auth + Storage",
  },
]

const ENV_INFO = [
  { label: "סביבה", value: process.env.NODE_ENV ?? "development" },
  { label: "Next.js", value: "16.2.3" },
  { label: "React", value: "19.2.4" },
  { label: "אזור", value: "he-IL" },
  { label: "כיוון", value: "RTL" },
]

/* ── Status dot component ── */

function StatusDot({ status }: { status: StatusItem["status"] }) {
  const colors = {
    connected: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  }

  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-50 ${colors[status]}`}
      />
      <span
        className={`relative inline-flex h-3 w-3 rounded-full ${colors[status]}`}
      />
    </span>
  )
}

/* ── Page ── */

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6" />
          הגדרות
        </h1>
        <p className="text-muted-foreground">סטטוס חיבורים ומידע על הסביבה</p>
      </div>

      {/* Site URL */}
      <Card className="p-5 border-0 shadow-md">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">כתובת האתר</p>
            <p className="text-lg font-bold text-foreground" dir="ltr">
              {SITE_URL}
            </p>
          </div>
        </div>
      </Card>

      {/* Connections */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">סטטוס חיבורים</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONNECTIONS.map((conn) => {
            const Icon = conn.icon
            return (
              <Card key={conn.label} className="border-0 shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-sm">
                          {conn.label}
                        </h3>
                        {conn.detail && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {conn.detail}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusDot status={conn.status} />
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {conn.value}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Environment info */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">מידע על הסביבה</h2>
        <Card className="border-0 shadow-md">
          <CardContent className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {ENV_INFO.map((info) => (
                <div key={info.label}>
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-bold text-foreground" dir="ltr">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
