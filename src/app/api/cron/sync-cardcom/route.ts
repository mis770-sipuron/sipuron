import { type NextRequest } from "next/server";
import { getTransactions } from "@/lib/cardcom/client";

/**
 * Vercel Cron endpoint to sync current month's Cardcom transactions.
 * Intended to be called via vercel.json cron config.
 *
 * Protection: checks for CRON_SECRET in Authorization header.
 */
export async function POST(request: NextRequest) {
  // Verify cron secret if set (Vercel sends this automatically)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 1-based

    // Build DDMMYYYY strings for first and last day of current month
    const monthStr = String(month).padStart(2, "0");
    const yearStr = String(year);
    const fromDate = `01${monthStr}${yearStr}`;

    const lastDay = new Date(year, month, 0).getDate();
    const toDate = `${String(lastDay).padStart(2, "0")}${monthStr}${yearStr}`;

    console.log(`[Cron] Syncing Cardcom transactions from ${fromDate} to ${toDate}`);

    const data = await getTransactions(fromDate, toDate);

    const count = data.Results?.length ?? 0;
    console.log(`[Cron] Fetched ${count} transactions (ResponseCode: ${data.ResponseCode})`);

    // TODO: Insert into Supabase when ready
    if (count > 0) {
      console.log("[Cron] Sample transaction:", JSON.stringify(data.Results[0]));
    }

    return Response.json({ synced: true, count });
  } catch (error) {
    console.error("[Cron] sync-cardcom error:", error);
    return Response.json(
      { synced: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
