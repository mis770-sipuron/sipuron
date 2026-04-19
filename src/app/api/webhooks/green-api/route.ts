import type { GreenApiWebhook } from "@/lib/greenapi/types"
import { sendMessage } from "@/lib/greenapi/client"
import { createClient } from "@/lib/supabase/server"

// Bot keyword triggers
const JOIN_KEYWORDS = ["הצטרפות", "להצטרף", "רוצה להצטרף", "מנוי", "להירשם", "הרשמה", "start"]
const CANCEL_KEYWORDS = ["ביטול", "לבטל", "ביטול מנוי", "cancel"]
const HELP_KEYWORDS = ["עזרה", "help", "תפריט", "מה אפשר", "פקודות"]
const STORY_KEYWORDS = ["סיפור", "story", "להאזין", "סיפור יומי", "סיפור חדש"]
const PRICE_KEYWORDS = ["מחיר", "כמה עולה", "עלות", "תמחור", "price"]

function extractText(body: GreenApiWebhook["body"]): string | null {
  return (
    body.messageData?.textMessageData?.textMessage ??
    body.messageData?.extendedTextMessageData?.text ??
    body.messageData?.fileMessageData?.caption ??
    null
  )
}

function matchKeywords(text: string, keywords: string[]): boolean {
  const lower = text.trim()
  return keywords.some((kw) => lower.includes(kw))
}

async function handleJoin(chatId: string, senderName: string) {
  const msg = `שלום ${senderName}! 👋

ברוכים הבאים לסיפורון — סיפורי שמע לילדים! 🎧

להצטרפות ב-₪5 בלבד (חודש ניסיון):
👉 https://sipuron.vercel.app/checkout?plan=monthly

מה תקבלו:
✅ 200+ סיפורים מרתקים
✅ סיפור חדש כל שבוע
✅ הפקה תיאטרלית עם ערכים יהודיים
✅ נגן נוח ומותאם לגילאים

ביטול בכל זמן, בלי שאלות.`

  await sendMessage(chatId, msg)
}

async function handleCancel(chatId: string) {
  const msg = `חבל שאתם שוקלים לעזוב 😔

לפני שמבטלים — זכרו:
• יש לנו 200+ סיפורים שממתינים לכם
• כל שבוע מתווסף תוכן חדש
• הילדים שלכם אוהבים את זה!

אם בכל זאת רוצים לבטל:
📧 שלחו מייל ל-info@sipuron.co.il
📱 או התקשרו: 054-846-0430

נשמח לעזור בכל שאלה!`

  await sendMessage(chatId, msg)
}

async function handleHelp(chatId: string) {
  const msg = `🎧 *סיפורון — תפריט*

כתבו אחת מהפקודות:

📖 *סיפור* — לקבל המלצה לסיפור
💰 *מחיר* — לראות מחירים
📝 *הצטרפות* — להירשם
❌ *ביטול* — מידע על ביטול
❓ *עזרה* — תפריט זה

או פשוט כתבו מה מעניין אתכם ונשמח לעזור! 😊`

  await sendMessage(chatId, msg)
}

async function handleStoryRequest(chatId: string) {
  const supabase = await createClient()

  // Pick random published story
  const { data: stories } = await supabase
    .from("stories")
    .select("title, slug, duration_seconds, age_min, age_max")
    .eq("status", "published")
    .eq("is_premium", false)
    .limit(50)

  if (!stories || stories.length === 0) {
    await sendMessage(chatId, "אין סיפורים זמינים כרגע. נסו שוב מאוחר יותר!")
    return
  }

  const story = stories[Math.floor(Math.random() * stories.length)]
  const duration = Math.ceil(story.duration_seconds / 60)

  const msg = `📖 *${story.title}*

⏱ ${duration} דקות | גילאי ${story.age_min}-${story.age_max}

👉 להאזנה: https://sipuron.vercel.app/stories/${story.slug}

רוצים עוד? כתבו *סיפור* לעוד המלצה!`

  await sendMessage(chatId, msg)
}

async function handlePrice(chatId: string) {
  const msg = `💰 *מחירון סיפורון*

🔹 *חודשי* — ₪49.90/חודש
🔹 *שנתי* — ₪39.90/חודש (חיסכון ₪120!)

🎁 *חודש ניסיון ב-₪5 בלבד!*

להצטרפות:
👉 https://sipuron.vercel.app/join

ביטול בכל זמן, בלי שאלות.`

  await sendMessage(chatId, msg)
}

async function handleUnknown(chatId: string, senderName: string) {
  const msg = `שלום ${senderName}! 😊

תודה שפנית לסיפורון.
כתבו *עזרה* לתפריט מלא, או *סיפור* לקבל המלצה.

אם יש שאלה ספציפית — נחזור אליכם בהקדם!`

  await sendMessage(chatId, msg)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GreenApiWebhook

    const { typeWebhook } = body
    const senderData = body.body?.senderData
    const messageData = body.body?.messageData

    // Only process incoming messages
    if (typeWebhook !== "incomingMessageReceived" || !senderData || !messageData) {
      return Response.json({ ok: true })
    }

    const chatId = senderData.chatId
    const senderName = senderData.senderName || "חבר/ה"
    const text = extractText(body.body)

    // Skip group messages (only handle private chats)
    if (chatId.includes("@g.us")) {
      return Response.json({ ok: true })
    }

    console.log(`[Bot] Message from ${senderName} (${chatId}): ${text}`)

    if (!text) {
      // Non-text message (image, audio, etc.)
      await sendMessage(chatId, `קיבלנו את ההודעה שלכם! 📩\nכתבו *עזרה* לתפריט.`)
      return Response.json({ ok: true })
    }

    // Route to handler based on keywords
    if (matchKeywords(text, JOIN_KEYWORDS)) {
      await handleJoin(chatId, senderName)
    } else if (matchKeywords(text, CANCEL_KEYWORDS)) {
      await handleCancel(chatId)
    } else if (matchKeywords(text, HELP_KEYWORDS)) {
      await handleHelp(chatId)
    } else if (matchKeywords(text, STORY_KEYWORDS)) {
      await handleStoryRequest(chatId)
    } else if (matchKeywords(text, PRICE_KEYWORDS)) {
      await handlePrice(chatId)
    } else {
      await handleUnknown(chatId, senderName)
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error("[Bot] Error:", error)
    return Response.json({ ok: true }) // Always 200 to Green API
  }
}
