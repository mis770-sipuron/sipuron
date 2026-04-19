import { type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/audio/[id] — Gated audio endpoint.
 * Only serves audio for premium stories to active subscribers.
 * Free stories are accessible to everyone.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch story
  const { data: story, error } = await supabase
    .from("stories")
    .select("id, audio_url, is_premium, title")
    .eq("id", id)
    .eq("status", "published")
    .single()

  if (error || !story) {
    return Response.json({ error: "סיפור לא נמצא" }, { status: 404 })
  }

  if (!story.audio_url) {
    return Response.json({ error: "אין קובץ אודיו" }, { status: 404 })
  }

  // Free stories — return audio URL directly
  if (!story.is_premium) {
    return Response.json({ audio_url: story.audio_url })
  }

  // Premium stories — verify subscription
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: "נדרשת הרשמה" }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single()

  const isActive = profile?.subscription_status === "active" || profile?.subscription_status === "trial"
  if (!isActive) {
    return Response.json(
      { error: "תוכן זה זמין לחברי מועדון בלבד", upgrade_url: "/checkout" },
      { status: 403 }
    )
  }

  return Response.json({ audio_url: story.audio_url })
}
