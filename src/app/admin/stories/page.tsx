"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Search, Plus, Edit, Trash2, Clock, Lock, BookOpen, Users, Filter,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type StoryStatus = "published" | "draft"

interface Story {
  id: string
  title: string
  category: string
  duration: number
  premium: boolean
  status: StoryStatus
  gradient: string
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const STORIES: Story[] = [
  {
    id: "1",
    title: "תולעת השמיר",
    category: "מדרש",
    duration: 8,
    premium: true,
    status: "published",
    gradient: "from-amber-400 via-orange-400 to-amber-600",
  },
  {
    id: "2",
    title: "השקט שלימד להקשיב",
    category: "מידות",
    duration: 5,
    premium: false,
    status: "published",
    gradient: "from-orange-300 via-amber-400 to-yellow-500",
  },
  {
    id: "3",
    title: "מושקה והגן הקסום",
    category: "דמיון",
    duration: 12,
    premium: true,
    status: "published",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
  },
  {
    id: "4",
    title: "האריה והנמלה",
    category: "משלים",
    duration: 6,
    premium: false,
    status: "draft",
    gradient: "from-amber-500 via-orange-500 to-red-400",
  },
  {
    id: "5",
    title: "רבי עקיבא ורחל",
    category: "גדולי ישראל",
    duration: 15,
    premium: true,
    status: "published",
    gradient: "from-orange-400 via-amber-500 to-yellow-400",
  },
  {
    id: "6",
    title: "הרפתקה בסוכה",
    category: "חגים",
    duration: 7,
    premium: false,
    status: "draft",
    gradient: "from-yellow-500 via-orange-400 to-amber-500",
  },
]

const CATEGORIES = ["הכל", "מדרש", "מידות", "דמיון", "משלים", "גדולי ישראל", "חגים"]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StoriesPage() {
  const [categoryFilter, setCategoryFilter] = useState("הכל")
  const [statusFilter, setStatusFilter] = useState<"all" | StoryStatus>("all")
  const [premiumOnly, setPremiumOnly] = useState(false)

  const filtered = STORIES.filter((s) => {
    const matchesCategory = categoryFilter === "הכל" || s.category === categoryFilter
    const matchesStatus = statusFilter === "all" || s.status === statusFilter
    const matchesPremium = !premiumOnly || s.premium
    return matchesCategory && matchesStatus && matchesPremium
  })

  const stats = {
    total: STORIES.length,
    published: STORIES.filter((s) => s.status === "published").length,
    draft: STORIES.filter((s) => s.status === "draft").length,
    premium: STORIES.filter((s) => s.premium).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">ניהול סיפורים</h1>
          <p className="text-muted-foreground text-sm">ניהול ועריכת כל הסיפורים בספריה</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          הוסף סיפור חדש
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">סה&quot;כ סיפורים</span>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-xl font-extrabold text-foreground">{stats.total}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">מפורסמים</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-emerald-600">{stats.published}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">טיוטות</span>
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-amber-600">{stats.draft}</div>
        </Card>
        <Card className="p-4 glass border-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">פרימיום</span>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-xl font-extrabold text-foreground">{stats.premium}</div>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "הכל")}>
          <SelectTrigger className="min-w-[140px]">
            <Filter className="h-4 w-4 ml-2 text-muted-foreground" />
            <SelectValue placeholder="קטגוריה" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            הכל
          </Button>
          <Button
            variant={statusFilter === "published" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("published")}
          >
            מפורסם
          </Button>
          <Button
            variant={statusFilter === "draft" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("draft")}
          >
            טיוטה
          </Button>
        </div>

        <div className="flex items-center gap-2 mr-auto sm:mr-0 sm:ml-auto">
          <span className="text-sm text-muted-foreground">פרימיום בלבד</span>
          <Switch checked={premiumOnly} onCheckedChange={setPremiumOnly} />
        </div>
      </div>

      {/* Story cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            לא נמצאו סיפורים
          </div>
        )}
        {filtered.map((story) => (
          <Card key={story.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            {/* Cover gradient placeholder */}
            <div className={`h-36 bg-gradient-to-br ${story.gradient} relative`}>
              {/* Premium badge overlay */}
              {story.premium && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/60 text-white backdrop-blur-sm border-0">
                    <Lock className="h-3 w-3 ml-1" />
                    פרימיום
                  </Badge>
                </div>
              )}
              {!story.premium && (
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/80 text-foreground backdrop-blur-sm border-0">
                    חינם
                  </Badge>
                </div>
              )}
              {/* Status */}
              <div className="absolute top-3 right-3">
                <Badge
                  variant="secondary"
                  className={
                    story.status === "published"
                      ? "bg-emerald-500/90 text-white border-0"
                      : "bg-white/80 text-amber-700 border-0"
                  }
                >
                  {story.status === "published" ? "מפורסם" : "טיוטה"}
                </Badge>
              </div>
            </div>

            {/* Card body */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-bold text-foreground leading-tight">{story.title}</h3>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{story.category}</Badge>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {story.duration} דק׳
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3.5 w-3.5 ml-1.5" />
                  עריכה
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
