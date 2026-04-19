import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Clock, Lock, User, Share2, BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PlayButton, PlayButtonCta } from "./play-button"
import { UpgradeCta } from "./upgrade-cta"

const GRADIENTS = [
  "from-amber-300 to-orange-500",
  "from-rose-300 to-pink-500",
  "from-violet-300 to-purple-500",
  "from-sky-300 to-blue-500",
  "from-emerald-300 to-teal-500",
  "from-amber-400 to-red-400",
  "from-orange-300 to-amber-500",
  "from-fuchsia-300 to-rose-500",
  "from-indigo-300 to-violet-500",
  "from-yellow-300 to-amber-500",
  "from-lime-300 to-emerald-500",
  "from-cyan-300 to-sky-500",
]

function pickGradient(id: string) {
  let hash = 0
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) | 0
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch story
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!story) notFound()

  // Check subscription for premium content
  let canPlay = !story.is_premium // free stories always playable
  if (story.is_premium) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_status")
        .eq("id", user.id)
        .single()
      canPlay = profile?.subscription_status === "active" || profile?.subscription_status === "trial"
    }
  }

  // Fetch categories for this story
  const { data: catMap } = await supabase
    .from("story_category_map")
    .select("category_id, story_categories(name, slug)")
    .eq("story_id", story.id)

  const categories = catMap?.map((c: any) => c.story_categories).filter(Boolean) ?? []
  const primaryCategory = categories[0]?.name ?? "סיפור"

  // Fetch related stories (same category or random)
  let related: any[] = []
  if (catMap && catMap.length > 0) {
    const categoryIds = catMap.map((c: any) => c.category_id)
    const { data: relatedMap } = await supabase
      .from("story_category_map")
      .select("story_id")
      .in("category_id", categoryIds)
      .neq("story_id", story.id)
      .limit(10)

    if (relatedMap && relatedMap.length > 0) {
      const storyIds = [...new Set(relatedMap.map((r: any) => r.story_id))].slice(0, 3)
      const { data: relatedStories } = await supabase
        .from("stories")
        .select("*")
        .in("id", storyIds)
        .eq("status", "published")
        .limit(3)
      related = relatedStories ?? []
    }
  }

  // Pad with random stories if needed
  if (related.length < 3) {
    const excludeIds = [story.id, ...related.map((r: any) => r.id)]
    const { data: extra } = await supabase
      .from("stories")
      .select("*")
      .eq("status", "published")
      .not("id", "in", `(${excludeIds.join(",")})`)
      .limit(3 - related.length)
    if (extra) related.push(...extra)
  }

  const gradient = story.cover_image_url ? "" : pickGradient(story.id)
  const durationMin = Math.ceil((story.duration_seconds || 0) / 60)
  const whatsappText = encodeURIComponent(
    `שמעו את הסיפור "${story.title}" בסיפורון!\nhttps://sipuron.org/stories/${story.slug}`
  )

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/40 to-background dark:from-slate-900 dark:to-background min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/stories" className="hover:text-amber-600 transition-colors">
            מאגר הסיפורים
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{story.title}</span>
        </nav>

        {/* Cover */}
        <div
          className={`relative aspect-[16/8] rounded-2xl ${gradient ? `bg-gradient-to-br ${gradient}` : ""} flex items-center justify-center shadow-xl mb-8 overflow-hidden`}
        >
          {story.cover_image_url && (
            <img
              src={story.cover_image_url}
              alt={story.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="relative z-10">
            {canPlay ? (
              <PlayButton
                storyId={story.id}
                title={story.title}
                audioUrl={story.audio_url ?? ""}
                coverImage={story.cover_image_url ?? ""}
                duration={story.duration_seconds}
              />
            ) : (
              <UpgradeCta variant="circle" />
            )}
          </div>

          {story.is_premium && (
            <div className="absolute top-4 start-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full z-10">
              <Lock className="size-3.5" />
              פרימיום
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-foreground mb-4">
          {story.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant="secondary" className="gap-1">
            <Clock className="size-3.5" />
            {durationMin} דק׳
          </Badge>
          <Badge variant="outline">
            גילאי {story.age_min}-{story.age_max}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <BookOpen className="size-3.5" />
            {primaryCategory}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <User className="size-3.5" />
            {story.narrator}
          </Badge>
        </div>

        {/* Description */}
        {story.description && (
          <p className="text-muted-foreground leading-relaxed text-lg mb-8 max-w-2xl">
            {story.description}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-16">
          {canPlay ? (
            <PlayButtonCta
              storyId={story.id}
              title={story.title}
              audioUrl={story.audio_url ?? ""}
              coverImage={story.cover_image_url ?? ""}
              duration={story.duration_seconds}
            />
          ) : (
            <UpgradeCta variant="button" />
          )}
          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium"
          >
            <Share2 className="size-4" />
            שתפו בוואטסאפ
          </a>
        </div>

        {/* Related stories */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              סיפורים דומים
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r: any) => {
                const rGradient = pickGradient(r.id)
                const rMin = Math.ceil((r.duration_seconds || 0) / 60)
                return (
                  <Link key={r.id} href={`/stories/${r.slug}`}>
                    <div className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 bg-card border border-border/50">
                      <div
                        className={`aspect-[16/10] bg-gradient-to-br ${rGradient} flex items-center justify-center relative`}
                      >
                        <div className="size-10 rounded-full bg-amber-500/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="size-4 text-white fill-white ms-0.5" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                        </div>
                        {r.is_premium && (
                          <div className="absolute top-2 start-2 size-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <Lock className="size-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-sm text-foreground mb-1 line-clamp-1">
                          {r.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-0.5">
                            <Clock className="size-3" />
                            {rMin} דק׳
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
