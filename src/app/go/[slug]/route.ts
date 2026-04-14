import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createHash } from "crypto";

/**
 * Redirect handler for short links.
 * GET /go/:slug -> look up in short_links, log click, redirect 302.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const supabase = await createClient();

    // Look up the slug
    const { data: link, error } = await supabase
      .from("short_links")
      .select("id, original_url, is_active")
      .eq("slug", slug)
      .single();

    if (error || !link || !link.is_active) {
      return Response.redirect(new URL("/", request.url), 302);
    }

    // Fire-and-forget: log click + increment counter
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || null;
    const country = request.headers.get("x-vercel-ip-country") || null;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHash = createHash("sha256").update(ip).digest("hex");
    const deviceType = parseDeviceType(userAgent);

    // Non-blocking: don't await these
    supabase
      .from("link_clicks")
      .insert({
        link_id: link.id,
        user_agent: userAgent,
        referer,
        country,
        ip_hash: ipHash,
        device_type: deviceType,
      })
      .then(({ error: clickError }) => {
        if (clickError) console.error("[go] Failed to log click:", clickError.message);
      });

    supabase
      .rpc("increment_click_count", { link_id_input: link.id })
      .then(({ error: rpcError }) => {
        if (rpcError) {
          // Fallback: direct update if RPC doesn't exist
          supabase
            .from("short_links")
            .update({ click_count: (link as Record<string, unknown>).click_count as number + 1 })
            .eq("id", link.id)
            .then(() => {});
        }
      });

    return Response.redirect(link.original_url, 302);
  } catch (err) {
    console.error("[go] Redirect error:", err);
    return Response.redirect(new URL("/", request.url), 302);
  }
}

function parseDeviceType(ua: string): "mobile" | "tablet" | "desktop" {
  const lower = ua.toLowerCase();
  if (/tablet|ipad|playbook|silk/.test(lower)) return "tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/.test(lower)) return "mobile";
  return "desktop";
}
