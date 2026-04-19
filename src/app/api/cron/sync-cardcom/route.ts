import { type NextRequest } from "next/server";
import { getTransactions, getFailedTransactions } from "@/lib/cardcom/client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function supabaseUpsert(table: string, rows: Record<string, unknown>[]) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
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
    throw new Error(`Supabase upsert ${table} failed: ${res.status} ${text}`);
  }
  return res;
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const monthStr = String(month).padStart(2, "0");
    const yearStr = String(year);
    const fromDate = `01${monthStr}${yearStr}`;
    const lastDay = new Date(year, month, 0).getDate();
    const toDate = `${String(lastDay).padStart(2, "0")}${monthStr}${yearStr}`;

    console.log(`[Cron] Syncing Cardcom ${fromDate} → ${toDate}`);

    // Fetch successful transactions
    const txData = await getTransactions(fromDate, toDate);
    const transactions = txData.CreditCardTransactions ?? [];
    const txCount = transactions.length;
    console.log(`[Cron] Fetched ${txCount} transactions`);

    if (txCount > 0) {
      const rows = transactions.map((tx) => ({
        transaction_id: tx.Id,
        amount: tx.Amount,
        card_owner_name: tx.Last4DigitsStr || String(tx.Last4Digits),
        last4_digits: tx.Last4DigitsStr || String(tx.Last4Digits),
        transaction_date: tx.CreateDate || tx.TransacDate,
        status: "success" as const,
        status_code: tx.ActionCode ?? 0,
        num_of_payments: tx.NoPayments ?? 1,
        currency: String(tx.Currency ?? "ILS"),
        invoice_number: tx.CouponNumber,
        raw_response: tx,
      }));

      await supabaseUpsert("cardcom_transactions", rows);
      console.log(`[Cron] Upserted ${rows.length} transactions`);
    }

    // Fetch failed/special transactions
    const failData = await getFailedTransactions(fromDate, toDate);
    const failCount = failData.SpecialTransactions?.length ?? 0;
    console.log(`[Cron] Fetched ${failCount} failed transactions`);

    if (failCount > 0) {
      const failRows = failData.SpecialTransactions.map((tx: import("@/lib/cardcom/types").CardcomFailedTransaction) => ({
        transaction_id: tx.TransactionId,
        amount: tx.Amount,
        card_owner_name: tx.CardOwnerName,
        last4_digits: tx.Last4Digits,
        transaction_date: tx.TransactionDate,
        status: "failed" as const,
        status_code: tx.StatusCode,
        status_description: tx.StatusDescription,
        num_of_payments: tx.NumOfPayments,
        failure_reason: tx.FailureReason,
        currency: tx.Currency,
        raw_response: tx,
      }));

      await supabaseUpsert("cardcom_transactions", failRows);
      console.log(`[Cron] Upserted ${failRows.length} failed transactions`);
    }

    return Response.json({
      synced: true,
      transactions: txCount,
      failures: failCount,
    });
  } catch (error) {
    console.error("[Cron] sync-cardcom error:", error);
    return Response.json(
      { synced: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
