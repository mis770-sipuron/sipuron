import { type NextRequest } from "next/server";
import { getGroups, getGroupInfo } from "@/lib/greenapi/client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Only announcement groups: "סיפורון עם מנחם שרון #N" or "#N"
// Exclude: מועדון, Discussion, דיון, קובץ הישן, אסטרטגיה, סדר סיפורים
const EXCLUDE_KEYWORDS = [
  "מועדון", "Discussion", "דיון", "קובץ הישן",
  "אסטרטגיה", "סדר סיפורים", "לוקחים אחריות",
  "חינוך בנועם", "משפחה מחוברת", "מחזיקות ראש",
  "הדרכת הורים", "מועדון ההורים",
];

function isSipuronAnnouncementGroup(name: string): boolean {
  if (!name.includes("סיפורון עם מנחם שרון")) return false;
  if (EXCLUDE_KEYWORDS.some((kw) => name.includes(kw))) return false;
  // Must have # followed by a number (announcement groups)
  return /#\d+/.test(name) || /\d+#/.test(name);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("[Cron] Syncing Green API groups...");

    const allGroups = await getGroups();
    const sipuronGroups = allGroups.filter((g) => g.name && isSipuronAnnouncementGroup(g.name));

    console.log(`[Cron] Found ${sipuronGroups.length} Sipuron groups out of ${allGroups.length} total`);

    // Get current member counts from Supabase (for previous_member_count)
    const currentRes = await fetch(
      `${SUPABASE_URL}/rest/v1/whatsapp_groups?select=group_id,member_count`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    const currentGroups: { group_id: string; member_count: number }[] = currentRes.ok
      ? await currentRes.json()
      : [];
    const currentMap = new Map(currentGroups.map((g) => [g.group_id, g.member_count]));

    // Fetch detailed member counts via getGroupData
    const rows = [];
    for (const g of sipuronGroups) {
      try {
        const detail = await getGroupInfo(g.id);
        const memberCount = detail.participants?.length ?? 0;
        rows.push({
          group_id: g.id,
          name: g.name,
          member_count: memberCount,
          previous_member_count: currentMap.get(g.id) ?? 0,
          status: "active",
          updated_at: new Date().toISOString(),
        });
        // Rate limit: 300ms between requests
        await new Promise((r) => setTimeout(r, 300));
      } catch (e) {
        console.log(`[Cron] Skipping group ${g.id}: ${e instanceof Error ? e.message : "error"}`);
      }
    }

    if (rows.length > 0) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/whatsapp_groups`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify(rows),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Supabase upsert whatsapp_groups failed: ${res.status} ${text}`);
      }

      console.log(`[Cron] Upserted ${rows.length} groups`);
    }

    return Response.json({
      synced: true,
      groups: rows.length,
      totalMembers: rows.reduce((sum, g) => sum + g.member_count, 0),
    });
  } catch (error) {
    console.error("[Cron] sync-greenapi error:", error);
    return Response.json(
      { synced: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
