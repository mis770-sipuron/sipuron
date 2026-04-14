import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/analytics/clicks
 *
 * Query params:
 *   link_id  — optional, filter to specific link
 *   from     — ISO date string (e.g. 2026-04-01)
 *   to       — ISO date string (e.g. 2026-04-14)
 *   group_by — "day" | "hour" | "device" | "source"
 *
 * Returns aggregated click data from link_clicks table.
 */

type GroupBy = "day" | "hour" | "device" | "source";

const VALID_GROUP_BY: GroupBy[] = ["day", "hour", "device", "source"];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const linkId = searchParams.get("link_id");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const groupBy = searchParams.get("group_by") as GroupBy | null;

    if (groupBy && !VALID_GROUP_BY.includes(groupBy)) {
      return Response.json(
        { error: `group_by must be one of: ${VALID_GROUP_BY.join(", ")}` },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Try RPC-based aggregation first; fall back to client-side aggregation
    // if the RPC function doesn't exist yet.
    const rpcResult = await supabase.rpc("aggregate_clicks", {
      p_link_id: linkId || null,
      p_from: from || null,
      p_to: to || null,
      p_group_by: groupBy || "day",
    });

    if (!rpcResult.error) {
      return Response.json({ data: rpcResult.data });
    }

    // Fallback: fetch raw rows and aggregate in JS
    let query = supabase
      .from("link_clicks")
      .select("*")
      .order("clicked_at", { ascending: true });

    if (linkId) query = query.eq("link_id", linkId);
    if (from) query = query.gte("clicked_at", from);
    if (to) query = query.lte("clicked_at", `${to}T23:59:59.999Z`);

    const { data: clicks, error } = await query;

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const aggregated = aggregateClicks(clicks || [], groupBy || "day");

    return Response.json({ data: aggregated });
  } catch (err) {
    console.error("[API] GET /api/analytics/clicks error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

interface ClickRow {
  clicked_at: string;
  device_type: string | null;
  referer: string | null;
}

function aggregateClicks(clicks: ClickRow[], groupBy: GroupBy) {
  const buckets: Record<string, number> = {};

  for (const click of clicks) {
    let key: string;

    switch (groupBy) {
      case "day":
        key = click.clicked_at?.slice(0, 10) || "unknown";
        break;
      case "hour": {
        const d = new Date(click.clicked_at);
        key = `${d.toISOString().slice(0, 10)} ${String(d.getUTCHours()).padStart(2, "0")}:00`;
        break;
      }
      case "device":
        key = click.device_type || "unknown";
        break;
      case "source":
        key = extractSource(click.referer);
        break;
      default:
        key = "unknown";
    }

    buckets[key] = (buckets[key] || 0) + 1;
  }

  return Object.entries(buckets).map(([label, count]) => ({ label, count }));
}

function extractSource(referer: string | null): string {
  if (!referer) return "direct";
  try {
    const hostname = new URL(referer).hostname.replace("www.", "");
    return hostname || "direct";
  } catch {
    return "direct";
  }
}
