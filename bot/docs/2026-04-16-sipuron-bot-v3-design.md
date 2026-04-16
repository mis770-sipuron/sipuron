# Sipuron Bot v3 — Full Design Spec
**Date:** 2026-04-16
**Status:** Pending user review

## Context
The WhatsApp bot works but Supabase is empty — real data lives in Cardcom (payments) and Green API (communities). The bot tried to query Supabase and returned "database is empty." We need a data pipeline to fill Supabase, then make the bot DB-first.

## 3 Sub-Projects

### A. Data Pipeline — Cardcom + Green API → Supabase

**Goal:** Populate Supabase with real business data via cron sync.

**1. Cardcom Sync (daily cron)**
- File: `src/app/api/cron/sync-cardcom/route.ts` (exists, has TODO at line 39)
- Replace TODO with actual UPSERT logic using `createServiceClient()`
- Fetches current month transactions via `getTransactions()`
- Fetches failures via `getFailedTransactions()`

Mapping:
| Cardcom | Supabase |
|---------|----------|
| TransactionId | payments.cardcom_transaction_id |
| Amount | payments.amount |
| StatusCode==0 → 'success' | payments.status |
| StatusCode!=0 → 'failed' | payments.status |
| CardOwnerName | profiles.full_name |
| Last4Digits | profiles (dedup key with name) |
| NumOfPayments>=2 | subscriptions.status='active' |
| Full JSON | payments.cardcom_response |
| FailureReason | payments.cardcom_response.failure |

**2. Green API Sync (daily cron)**
- New file: `src/app/api/cron/sync-greenapi/route.ts`
- Calls `getGroups()` → filter only Sipuron groups (name contains "סיפורון"/"סיפורי שמע")
- For each group: `getGroupData(groupId)` → get member count
- UPSERT to `whatsapp_groups` table
- Store `previous_member_count` before updating `member_count` (for growth tracking)

Schema change needed:
```sql
ALTER TABLE whatsapp_groups ADD COLUMN previous_member_count INT DEFAULT 0;
```

Mapping:
| Green API | Supabase |
|-----------|----------|
| groupId | whatsapp_groups.group_id |
| groupName | whatsapp_groups.name |
| participantsCount | whatsapp_groups.member_count |
| inviteLink | whatsapp_groups.invite_link |
| (old member_count) | whatsapp_groups.previous_member_count |

**3. Cron Schedule**
- Both run daily at 06:00 IST (before daily dashboard at 08:00)
- Also callable on-demand via POST with auth header
- Vercel cron config in `vercel.json`

---

### B. Bot Intelligence — DB-first, Sipuron-only, Friendly

**Goal:** Bot queries only Supabase, filtered to Sipuron, with a warm personality.

**Personality:**
- Warm, direct, like a business partner who knows the numbers
- Hebrew, 2-5 lines, WhatsApp formatting
- Examples:
  - "842 מנויים פעילים, +3 חדשים אתמול. 5 תשלומים נכשלו — רוצה רשימה?"
  - "הקהילה הכי גדולה: סיפורון 12 עם 1,247 חברים (+18 מאתמול)"

**Data Access:**
- ALL data from Supabase REST API (curl from system prompt)
- NEVER calls Cardcom/Green API directly
- If DB empty: "הנתונים עדיין לא סונכרנו. הסנכרון רץ כל יום ב-06:00."

**Response Patterns:**
| User says | Bot does |
|-----------|---------|
| "סטטוס" | Full dashboard: subscribers, revenue, communities, failures |
| "מנויים" | `subscriptions WHERE status='active'` count + trend |
| "קהילות" | `whatsapp_groups` sorted by member_count, with growth delta |
| "כשלונות" | `payments WHERE status='failed'` last 7 days |
| "קמפיין" | `campaigns WHERE status='active'` with spot counts |
| "משימות" | Pulls from task system (Sipuron only) |
| "שלח הודעה ל..." | Green API with confirmation |
| Anything about "לוקחים אחריות" | "זה לא בתחום שלי. רוצה שאפנה?" |

**Scope Filter:**
- Sipuron only — all queries, all responses
- Green API groups: only those with "סיפורון" in name
- Memory files: only סיפורון/ directory
- Ignores: "לוקחים אחריות", "חינוך בנועם", "משפחה מחוברת", "מחזיקות ראש"

---

### C. Daily Dashboard — Proactive Morning Summary

**Goal:** Every morning at 08:00, bot sends Yosef a WhatsApp summary.

**Format:**
```
בוקר טוב יוסף!

*מנויים:* 842 פעילים (+3 חדשים אתמול, -1 ביטול)
*הכנסות החודש:* 38,470 ש"ח (85% מיעד 45K)
*קהילות:* 17,234 חברים (+47 חדשים אתמול)
  - סיפורון 12: 1,247 (+18)
  - סיפורון 15: 1,102 (+12)
*תשלומים שנכשלו:* 5 (רוצה רשימה?)
*קמפיין כרטיס טיסה:* 234/500 מקומות

יום מעולה!
```

**Implementation:**
- Vercel Cron at 08:00 IST (after 06:00 sync)
- New file: `src/app/api/cron/daily-dashboard/route.ts`
- Queries Supabase for all metrics
- Sends via Green API to Yosef's number (972532208749@c.us)
- Growth = `member_count - previous_member_count` from whatsapp_groups

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/app/api/cron/sync-cardcom/route.ts` | Modify — replace TODO with UPSERT |
| `src/app/api/cron/sync-greenapi/route.ts` | **Create** — Green API → whatsapp_groups |
| `src/app/api/cron/daily-dashboard/route.ts` | **Create** — morning summary |
| `supabase/migrations/003_add_previous_member_count.sql` | **Create** — ALTER TABLE |
| `claude-whatsapp-bot/system-prompt.txt` | Modify — DB-only queries, no direct API |
| `vercel.json` | Modify — add cron schedules |

## Verification
1. Run sync-cardcom manually → payments + subscriptions populated
2. Run sync-greenapi manually → whatsapp_groups populated with Sipuron groups only
3. Bot: "סטטוס מנויים" → real numbers from DB
4. Bot: "קהילות" → group names + member counts + growth
5. Bot: "קמפיין" → active campaign status
6. Daily dashboard arrives at 08:00 with correct numbers
7. Bot: "מה עם לוקחים אחריות?" → "זה לא בתחום שלי"
