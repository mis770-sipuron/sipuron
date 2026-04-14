import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/track/pageview
 *
 * Body: { path, referrer, sessionId }
 * Captures user-agent + country from headers, inserts into page_views table.
 * Returns 200 immediately.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, referrer, sessionId } = body as {
      path: string;
      referrer?: string;
      sessionId?: string;
    };

    if (!path) {
      return Response.json({ error: "path is required" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || "";
    const country = request.headers.get("x-vercel-ip-country") || null;

    const supabase = await createClient();

    // Fire-and-forget: insert and don't block the response
    supabase
      .from("page_views")
      .insert({
        path,
        referrer: referrer || null,
        session_id: sessionId || null,
        user_agent: userAgent,
        country,
      })
      .then(({ error }) => {
        if (error) console.error("[track] Failed to log pageview:", error.message);
      });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[API] POST /api/track/pageview error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
