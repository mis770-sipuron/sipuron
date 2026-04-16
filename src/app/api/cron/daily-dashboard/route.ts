import { type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const GREEN_INSTANCE = process.env.GREEN_API_INSTANCE!;
const GREEN_TOKEN = process.env.GREEN_API_TOKEN!;
const YOSEF_CHAT_ID = "972532208749@c.us";

async function supabaseGet(path: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  return res.ok ? res.json() : [];
}

async function sendWhatsApp(message: string) {
  await fetch(
    `https://7105.api.greenapi.com/waInstance${GREEN_INSTANCE}/sendMessage/${GREEN_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId: YOSEF_CHAT_ID, message }),
    }
  );
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Active subscribers (num_of_payments >= 2 = recurring)
    const allTx: { status: string; amount: number; num_of_payments: number }[] =
      await supabaseGet("cardcom_transactions?select=status,amount,num_of_payments&status=eq.success");
    const activeSubs = allTx.filter((t) => t.num_of_payments >= 2).length;
    const revenue = allTx.reduce((s, t) => s + Number(t.amount), 0);

    // Failed payments
    const failed: { id: string }[] =
      await supabaseGet("cardcom_transactions?select=id&status=eq.failed");

    // WhatsApp groups
    const groups: { name: string; member_count: number; previous_member_count: number }[] =
      await supabaseGet("whatsapp_groups?select=name,member_count,previous_member_count&status=eq.active&order=member_count.desc");
    const totalMembers = groups.reduce((s, g) => s + g.member_count, 0);
    const newMembers = groups.reduce((s, g) => s + Math.max(0, g.member_count - g.previous_member_count), 0);

    // Active campaigns
    const campaigns: { title: string; spots_total: number; spots_remaining: number }[] =
      await supabaseGet("campaigns?select=title,spots_total,spots_remaining&is_active=eq.true");

    // Build message
    const topGroups = groups.slice(0, 3).map((g) => {
      const delta = g.member_count - g.previous_member_count;
      return `  - ${g.name}: ${g.member_count.toLocaleString()}${delta > 0 ? ` (+${delta})` : ""}`;
    }).join("\n");

    const campaignLines = campaigns.map(
      (c) => `  - ${c.title}: ${(c.spots_total ?? 0) - (c.spots_remaining ?? 0)}/${c.spots_total ?? "?"} מקומות`
    ).join("\n");

    const msg = `בוקר טוב יוסף!

*מנויים:* ${activeSubs.toLocaleString()} פעילים
*הכנסות החודש:* ${revenue.toLocaleString()} ש"ח
*תשלומים שנכשלו:* ${failed.length}
*קהילות:* ${totalMembers.toLocaleString()} חברים${newMembers > 0 ? ` (+${newMembers} חדשים)` : ""}
${topGroups}${campaigns.length > 0 ? `\n*קמפיינים פעילים:*\n${campaignLines}` : ""}

יום מעולה!`;

    await sendWhatsApp(msg);
    console.log("[Cron] Daily dashboard sent");

    return Response.json({ sent: true });
  } catch (error) {
    console.error("[Cron] daily-dashboard error:", error);
    return Response.json(
      { sent: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
