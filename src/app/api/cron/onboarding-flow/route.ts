// Cron: runs daily at 09:00 IST
// Drives the subscription state machine — sends onboarding messages,
// pre-billing warnings, dunning sequences, and win-back messages.
// Vercel cron: "0 6 * * *" UTC = 09:00 IST

import { type NextRequest } from "next/server";
import { sendMessage } from "@/lib/greenapi/client";
import {
  type SubscriptionRecord,
  type OnboardingEvent,
  getNextTransition,
  renderMessage,
  ONBOARDING_MESSAGES,
} from "@/lib/subscription/state-machine";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://sipuron.vercel.app";

async function supabaseQuery<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${path} error: ${res.status} ${text}`);
  }
  return res.json();
}

async function markEventSent(
  subscriptionId: string,
  event: OnboardingEvent
): Promise<void> {
  // Append event to onboarding_events table
  await supabaseQuery("onboarding_events", {
    method: "POST",
    body: JSON.stringify({
      subscription_id: subscriptionId,
      event,
      sent_at: new Date().toISOString(),
    }),
    headers: { Prefer: "return=minimal" },
  });
}

async function updateSubscriptionState(
  subscriptionId: string,
  state: string
): Promise<void> {
  await supabaseQuery(
    `subscriptions?id=eq.${subscriptionId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status: state, updated_at: new Date().toISOString() }),
      headers: { Prefer: "return=minimal" },
    }
  );
}

function toChatId(phone: string): string {
  // Normalize to WhatsApp chatId format: "972501234567@c.us"
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("972") ? digits : `972${digits.replace(/^0/, "")}`;
  return `${normalized}@c.us`;
}

function buildPersonalLink(shortCode: string): string {
  return `${APP_URL}/go/${shortCode}`;
}

function buildPaymentUpdateLink(subscriptionId: string): string {
  return `${APP_URL}/update-card?sid=${subscriptionId}`;
}

function buildRejoiningLink(): string {
  return `${APP_URL}/join?utm_source=winback`;
}

function getBillingDate(trialStart: Date): string {
  const d = new Date(trialStart);
  d.setDate(d.getDate() + 30);
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long" });
}

interface RawSubscription {
  id: string;
  status: string;
  start_date: string;
  payment_failed_at: string | null;
  cancelled_at: string | null;
  cardcom_token: string | null;
  profiles: {
    phone: string;
    first_name: string | null;
    short_links: Array<{ slug: string }>;
  };
  onboarding_events: Array<{ event: string }>;
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const results = { processed: 0, sent: 0, errors: 0, skipped: 0 };
  const log: string[] = [];

  // Fetch all subscriptions that need processing
  const statuses = ["trial", "dunning", "cancelled"];
  const statusFilter = statuses.map((s) => `status.eq.${s}`).join(",");

  const rawSubs = await supabaseQuery<RawSubscription[]>(
    `subscriptions?or=(${statusFilter})&select=id,status,start_date,payment_failed_at,cancelled_at,cardcom_token,profiles(phone,first_name,short_links(slug)),onboarding_events(event)`
  );

  for (const raw of rawSubs) {
    results.processed++;

    try {
      const phone = raw.profiles?.phone;
      if (!phone) {
        results.skipped++;
        continue;
      }

      const sentEvents = (raw.onboarding_events ?? []).map(
        (e) => e.event as OnboardingEvent
      );
      const shortCode = raw.profiles.short_links?.[0]?.slug ?? "";

      const sub: SubscriptionRecord = {
        id: raw.id,
        phone,
        first_name: raw.profiles.first_name ?? "חברה יקרה",
        state: raw.status as SubscriptionRecord["state"],
        trial_start: new Date(raw.start_date),
        payment_failed_at: raw.payment_failed_at
          ? new Date(raw.payment_failed_at)
          : null,
        cancelled_at: raw.cancelled_at ? new Date(raw.cancelled_at) : null,
        personal_link: buildPersonalLink(shortCode),
        payment_update_link: buildPaymentUpdateLink(raw.id),
        events_sent: sentEvents,
      };

      const transition = getNextTransition(sub, now);
      if (!transition || !transition.send) {
        results.skipped++;
        continue;
      }

      const msgTemplate = ONBOARDING_MESSAGES.find(
        (m) => m.event === transition.send
      )?.message;
      if (!msgTemplate) {
        results.skipped++;
        continue;
      }

      const message = renderMessage(msgTemplate, {
        first_name: sub.first_name,
        personal_link: sub.personal_link,
        story_count: "200+",
        billing_date: getBillingDate(sub.trial_start),
        payment_update_link: sub.payment_update_link,
        grace_end_date: sub.payment_failed_at
          ? new Date(
              sub.payment_failed_at.getTime() + 7 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("he-IL")
          : "",
        rejoin_link: buildRejoiningLink(),
      });

      const chatId = toChatId(phone);
      await sendMessage(chatId, message);
      await markEventSent(raw.id, transition.send);

      if (transition.nextState !== sub.state) {
        await updateSubscriptionState(raw.id, transition.nextState);
      }

      results.sent++;
      log.push(`✅ ${sub.first_name} (${phone}) ← ${transition.send}`);
    } catch (err) {
      results.errors++;
      log.push(`❌ ${raw.id}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log("[Onboarding Cron]", results, log);
  return Response.json({ ...results, log });
}
