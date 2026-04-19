import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/stories — List published stories with optional filters.
 *
 * Query params:
 *   category  — filter by category slug
 *   age_min   — only stories suitable for at least this age
 *   age_max   — only stories suitable for at most this age
 *   premium   — "true" | "false"
 *   search    — partial title match (ilike)
 *   limit     — max rows (default 50)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = request.nextUrl;

    const category = searchParams.get("category");
    const ageMin = searchParams.get("age_min");
    const ageMax = searchParams.get("age_max");
    const premium = searchParams.get("premium");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Check if user is an active subscriber
    const { data: { user } } = await supabase.auth.getUser();
    let isActiveSubscriber = false;
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_status")
        .eq("id", user.id)
        .single();
      isActiveSubscriber = profile?.subscription_status === "active" || profile?.subscription_status === "trial";
    }

    let query = supabase
      .from("stories")
      .select(`
        *,
        story_category_map(
          story_categories(id, name, slug, type, icon)
        )
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq("story_category_map.story_categories.slug", category);
    }
    if (ageMin) query = query.gte("age_max", parseInt(ageMin));
    if (ageMax) query = query.lte("age_min", parseInt(ageMax));
    if (premium === "true") query = query.eq("is_premium", true);
    if (premium === "false") query = query.eq("is_premium", false);
    if (search) query = query.ilike("title", `%${search}%`);

    const { data, error } = await query;

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Strip audio_url from premium stories for non-subscribers
    const stories = (data ?? []).map((story: any) => {
      if (story.is_premium && !isActiveSubscriber) {
        return { ...story, audio_url: null };
      }
      return story;
    });

    return Response.json({ stories });
  } catch (err) {
    console.error("[API] GET /api/stories error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
