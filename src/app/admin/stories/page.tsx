"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Search, Plus, Edit, Trash2, Clock, Lock, BookOpen, Users, Filter, Loader2,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

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
/*  Gradient pool                                                      */
/* ------------------------------------------------------------------ */

const GRADIENTS = [
  "from-amber-400 via-orange-400 to-amber-600",
  "from-orange-300 via-amber-400 to-yellow-500",
  "from-yellow-400 via-amber-500 to-orange-500",
  "from-amber-500 via-orange-500 to-red-400",
  "from-orange-400 via-amber-500 to-yellow-400",
  "from-yellow-500 via-orange-400 to-amber-500",
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StoriesPage() {
  const [categoryFilter, setCategoryFilter] = useState("הכל")
  const [statusFilter, setStatusFilter] = useState<"all" | StoryStatus>("all")
  const [premiumOnly, setPremiumOnly] = useState(false)
  const [stories, setStories] = useState<Story[]>([])
  const [categories, setCategories] = useState<string[]>(["הכל"])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, premium: 0 })

  // Fetch categories once
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("story_categories")
      .select("name")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setCategories(["הכל", ...data.map((c: { name: string }) => c.name)])
        }
      })
  }, [])

  // Fetch stats (unfiltered counts)
  useEffect(() => {
    const supabase = createClient()

    async function fetchStats() {
      const [totalRes, publishedRes, draftRes, premiumRes] = await Promise.all([
        supabase.from("stories").select("id", { count: "exact", head: true }),
        supabase.from("stories").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("stories").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("stories").select("id", { count: "exact", head: true }).eq("is_premium", true),
      ])

      setStats({
        total: totalRes.count ?? 0,
        published: publishedRes.count ?? 0,
        draft: draftRes.count ?? 0,
        premium: premiumRes.count ?? 0,
      })
    }

    fetchStats()
  }, [])

  // Fetch stories with filters
  const fetchStories = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    // Get stories with their categories via the M2M table
    let query = supabase
      .from("stories")
      .select("id, title, duration_seconds, is_premium, status, story_category_map(story_categories(name))")
      .order("sort_order", { ascending: true })

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter)
    }

    if (premiumOnly) {
      query = query.eq("is_premium", true)
    }

    const { data, error } = await query.limit(200)

    if (!error && data) {
      let mapped: Story[] = data.map((s: any, i: number) => {
        // Extract first category name from the nested join
        const catMaps = s.story_category_map || []
        const categoryName = catMaps.length > 0 && catMaps[0].story_categories
          ? catMaps[0].story_categories.name
          : "---"

        return {
          id: s.id,
          title: s.title,
          category: categoryName,
          duration: Math.round((s.duration_seconds || 0) / 60),
          premium: s.is_premium,
          status: s.status as StoryStatus,
          gradient: GRADIENTS[i % GRADIENTS.length],
        }
      })

      // Apply category filter client-side (since it's a M2M join)
      if (categoryFilter !== "הכל") {
        mapped = mapped.filter((s) => s.category === categoryFilter)
      }

      setStories(mapped)
    }
    setLoading(false)
  }, [statusFilter, premiumOnly, categoryFilter])

  useEffect(() => {
    fetchStories()
  }, [fetchStories])

  // Toggle story status
  async function toggleStatus(storyId: string, currentStatus: StoryStatus) {
    const supabase = createClient()
    const newStatus = currentStatus === "published" ? "draft" : "published"
    const updateData: Record<string, any> = { status: newStatus }
    if (newStatus === "published") {
      updateData.published_at = new Date().toISOString()
    }
    const { error } = await supabase
      .from("stories")
      .update(updateData)
      .eq("id", storyId)
    if (!error) {
      fetchStories()
      // Update stats too
      setStats((prev) => ({
        ...prev,
        published: prev.published + (newStatus === "published" ? 1 : -1),
        draft: prev.draft + (newStatus === "draft" ? 1 : -1),
      }))
    }
  }

  // Toggle premium flag
  async function togglePremium(storyId: string, currentPremium: boolean) {
    const supabase = createClient()
    const { error } = await supabase
      .from("stories")
      .update({ is_premium: !currentPremium })
      .eq("id", storyId)
    if (!error) {
      fetchStories()
      setStats((prev) => ({
        ...prev,
        premium: prev.premium + (!currentPremium ? 1 : -1),
      }))
    }
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
            {categories.map((cat) => (
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
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="mr-2 text-muted-foreground">טוען...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              לא נמצאו סיפורים
            </div>
          )}
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              {/* Cover gradient placeholder */}
              <div className={`h-36 bg-gradient-to-br ${story.gradient} relative`}>
                {/* Premium badge overlay */}
                {story.premium && (
                  <button
                    onClick={() => togglePremium(story.id, story.premium)}
                    className="absolute top-3 left-3 cursor-pointer"
                    title="לחץ להסרת פרימיום"
                  >
                    <Badge className="bg-black/60 text-white backdrop-blur-sm border-0">
                      <Lock className="h-3 w-3 ml-1" />
                      פרימיום
                    </Badge>
                  </button>
                )}
                {!story.premium && (
                  <button
                    onClick={() => togglePremium(story.id, story.premium)}
                    className="absolute top-3 left-3 cursor-pointer"
                    title="לחץ להפיכה לפרימיום"
                  >
                    <Badge variant="secondary" className="bg-white/80 text-foreground backdrop-blur-sm border-0">
                      חינם
                    </Badge>
                  </button>
                )}
                {/* Status — clickable to toggle */}
                <button
                  onClick={() => toggleStatus(story.id, story.status)}
                  className="absolute top-3 right-3 cursor-pointer"
                  title={story.status === "published" ? "לחץ להעברה לטיוטה" : "לחץ לפרסום"}
                >
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
                </button>
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
      )}
    </div>
  )
}
