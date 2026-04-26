// Subscription lifecycle state machine
// States derived from journey map research: 37% churn at month 1 due to
// pricing surprise, onboarding confusion, and no pre-billing warning.

export type SubscriptionState =
  | "trial"        // days 1–30, charged 5₪
  | "active"       // month 2+, charged 45₪
  | "dunning"      // payment failed, grace period
  | "cancelled"    // user requested cancellation
  | "win_back"     // 14 days post-cancel, re-engagement window
  | "expired";     // dunning exhausted, no payment

export type OnboardingEvent =
  | "welcome"          // day 1  — explain personal link + what to expect
  | "checkin_day3"     // day 3  — "how are the kids liking it?"
  | "social_proof_7"   // day 7  — "kids talking about stories at Shabbat table?"
  | "pre_billing_3d"   // day 27 — ⚠️ CRITICAL: warning before 45₪ charge
  | "dunning_1"        // payment failed — soft reminder
  | "dunning_2"        // 3 days later — stronger reminder
  | "dunning_final"    // 7 days later — "your subscription will end"
  | "win_back";        // 14 days post-cancel — come back offer

export interface OnboardingMessage {
  event: OnboardingEvent;
  dayOffset: number; // days since subscription start (or since cancel for win_back)
  message: string;
}

export const ONBOARDING_MESSAGES: OnboardingMessage[] = [
  {
    event: "welcome",
    dayOffset: 0,
    message: `ברוכה הבאה למועדון סיפורון! 🎉

*הקישור האישי שלך:*
{personal_link}

שמרי אותו — הוא שמור רק לך ומאפשר גישה לכל הסיפורים שלנו.

*מה מחכה לך:*
• סיפור חדש כל לילה ב-20:30
• מאגר של {story_count} סיפורים כבר עכשיו
• ערכים, הרפתקאות, סיפורי צדיקים

*החיוב שלך:*
חודש ראשון: ₪5 בלבד
מחודש שני: ₪45 לחודש (ניתן לבטל בכל עת)

שאלות? ענה להודעה הזו ואחזור אליך 🙂`,
  },
  {
    event: "checkin_day3",
    dayOffset: 3,
    message: `שלום {first_name} 👋

שלושה ימים עם סיפורון — איך הולך?

האם הילדים כבר מחכים לסיפור של הלילה?

אם יש משהו שלא עובד או שאת לא מוצאת — ענה כאן ואסייע.`,
  },
  {
    event: "social_proof_7",
    dayOffset: 7,
    message: `שבוע! 🌟

הורים מספרים לנו שהילדים מתחילים *לספר את הסיפורים* בשולחן שבת...

האם זה קורה גם אצלך? 😊

טיפ קטן: אם שכחת לשמוע סיפור אחד — הכל שמור בקישור האישי שלך.`,
  },
  {
    event: "pre_billing_3d",
    dayOffset: 27,
    message: `שלום {first_name},

רציתי להזכיר בצורה שקופה:

בעוד *3 ימים*, ב-{billing_date}, יחויב כרטיסך ב-*₪45* להמשך מנוי חודשי.

המנוי כולל:
• גישה לכל הסיפורים (מאגר גדל כל יום)
• סיפור יומי חדש כל לילה
• ₪45 לחודש — ניתן לבטל בכל עת

*רוצה להמשיך?* אין צורך לעשות כלום ✅
*רוצה לבטל?* ענה "ביטול" להודעה הזו

תודה שאת איתנו 🙏`,
  },
  {
    event: "dunning_1",
    dayOffset: 0, // offset from payment failure date
    message: `שלום {first_name},

נראה שהיתה בעיה קטנה עם חיוב המנוי שלך.

זה קורה לפעמים — כרטיס פג תוקף, חסימה זמנית.

*לעדכון פרטי התשלום:*
{payment_update_link}

המנוי שלך פעיל עד {grace_end_date}.`,
  },
  {
    event: "dunning_2",
    dayOffset: 3,
    message: `שלום {first_name},

עדיין לא הצלחנו לחייב את המנוי שלך.

הסיפורים עדיין זמינים עד {grace_end_date}.

*לפתרון מהיר:*
{payment_update_link}

שאלות? ענה כאן.`,
  },
  {
    event: "dunning_final",
    dayOffset: 7,
    message: `שלום {first_name},

מחר יסתיים המנוי שלך בסיפורון בגלל חיוב שלא עבר.

לא נרצה לאבד אותך — הילדים כבר מכירים את הקול של מנחם 🙂

*לחידוש מהיר לפני הסיום:*
{payment_update_link}`,
  },
  {
    event: "win_back",
    dayOffset: 14, // days since cancellation
    message: `שלום {first_name} 👋

חלפו שבועיים מאז שעצרת את סיפורון.

מנחם הקליט סיפור חדש שנוגע בדיוק בנושא שהילדים שלך אוהבים.

*חזרה בקלות — חודש ראשון ב-₪5:*
{rejoin_link}

שמחים לקבל אותך בחזרה 🎧`,
  },
];

export type TransitionResult =
  | { send: OnboardingEvent; nextState: SubscriptionState }
  | { send: null; nextState: SubscriptionState }
  | null; // no transition needed

export interface SubscriptionRecord {
  id: string;
  phone: string; // normalized: "972501234567"
  first_name: string;
  state: SubscriptionState;
  trial_start: Date;
  payment_failed_at: Date | null;
  cancelled_at: Date | null;
  personal_link: string;
  payment_update_link: string;
  events_sent: OnboardingEvent[];
}

export function getNextTransition(
  sub: SubscriptionRecord,
  now: Date
): TransitionResult {
  const daysSinceTrialStart = Math.floor(
    (now.getTime() - sub.trial_start.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (sub.state === "trial") {
    for (const msg of ONBOARDING_MESSAGES) {
      if (
        ["welcome", "checkin_day3", "social_proof_7", "pre_billing_3d"].includes(
          msg.event
        ) &&
        daysSinceTrialStart >= msg.dayOffset &&
        !sub.events_sent.includes(msg.event)
      ) {
        return { send: msg.event, nextState: "trial" };
      }
    }
    return null;
  }

  if (sub.state === "dunning" && sub.payment_failed_at) {
    const daysSinceFailed = Math.floor(
      (now.getTime() - sub.payment_failed_at.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dunningSequence: OnboardingEvent[] = [
      "dunning_1",
      "dunning_2",
      "dunning_final",
    ];

    for (const event of dunningSequence) {
      const msg = ONBOARDING_MESSAGES.find((m) => m.event === event)!;
      if (daysSinceFailed >= msg.dayOffset && !sub.events_sent.includes(event)) {
        const nextState = event === "dunning_final" ? "expired" : "dunning";
        return { send: event, nextState };
      }
    }
    return null;
  }

  if (sub.state === "cancelled" && sub.cancelled_at) {
    const daysSinceCancelled = Math.floor(
      (now.getTime() - sub.cancelled_at.getTime()) / (1000 * 60 * 60 * 24)
    );
    const winBack = ONBOARDING_MESSAGES.find((m) => m.event === "win_back")!;
    if (
      daysSinceCancelled >= winBack.dayOffset &&
      !sub.events_sent.includes("win_back")
    ) {
      return { send: "win_back", nextState: "cancelled" };
    }
    return null;
  }

  return null;
}

export function renderMessage(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}
