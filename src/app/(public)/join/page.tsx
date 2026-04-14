"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  BookOpen,
  Clock,
  Send,
  Star,
  Shield,
  Users,
  Sparkles,
  Gift,
  Headphones,
  Heart,
  Quote,
  ChevronDown,
  Check,
  Crown,
  MonitorSmartphone,
  Cake,
  Calendar,
  Play,
  ThumbsUp,
  Zap,
} from "lucide-react";

/* ───────── scroll-reveal hook ───────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-in-up");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Section({
  children,
  className = "",
  cream = false,
}: {
  children: React.ReactNode;
  className?: string;
  cream?: boolean;
}) {
  const ref = useScrollReveal();
  return (
    <section
      ref={ref}
      style={{ opacity: 0 }}
      className={`py-16 sm:py-24 px-4 sm:px-6 ${cream ? "bg-[#FFFBF0]" : "bg-white"} ${className}`}
    >
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

/* ───────── CTA Button ───────── */
function CtaButton({ className = "" }: { className?: string }) {
  return (
    <Link href="/checkout">
      <Button
        size="lg"
        className={`rounded-full bg-primary hover:bg-primary/90 text-white text-lg sm:text-xl font-bold px-10 py-7 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 cursor-pointer ${className}`}
      >
        להתחיל ב-₪5 עכשיו
      </Button>
    </Link>
  );
}

/* ═══════════════════════════════════════
   JOIN PAGE
   ═══════════════════════════════════════ */
export default function JoinPage() {
  return (
    <div dir="rtl" className="overflow-hidden">
      {/* ─── 1. HERO ─── */}
      <section className="relative gradient-warm py-20 sm:py-32 px-4 sm:px-6 text-center">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-purple-300/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl animate-fade-in-up">
          <p className="mb-4 text-sm sm:text-base font-medium text-muted-foreground tracking-wide">
            מעל 10,000 משפחות כבר לא נלחמות על שעת ההשכבה.
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground mb-6">
            סיפורון — איך 10,000 משפחות הפכו
            <br className="hidden sm:block" /> את שעת ההשכבה
            <br className="hidden sm:block" /> מקרב יומי{" "}
            <span className="text-primary">לרגע הכי מחכים אליו ביום.</span>
          </h1>

          <p className="mb-8 text-lg sm:text-xl text-muted-foreground">
            ₪5 בחודש הראשון. 200+ סיפורים. ביטול בקליק.
          </p>

          <CtaButton />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="size-4 text-primary" /> סליקה מאובטחת
            </span>
            <span className="flex items-center gap-1">
              <Check className="size-4 text-primary" /> ביטול בכל זמן
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-4 text-primary" /> 10,000+ משפחות
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. PROBLEM ─── */}
      <Section cream={false}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10">
          בואו נדבר תכל&apos;ס.
        </h2>

        <div className="text-center sm:text-right text-lg leading-relaxed text-foreground/90 space-y-6 mb-12">
          <p>
            עד היום הורים עמדו בפני <strong>2 אופציות:</strong>
          </p>
          <p>
            <strong>אופציה א&apos;</strong> — לשים מסך.
            <br />
            יוטיוב, נטפליקס, &quot;עוד סרטון אחד.&quot;
            <br />
            הילד שקט, אבל את יודעת מה זה עושה.
          </p>
          <p>
            <strong>אופציה ב&apos;</strong> — לספר סיפור בעצמך.
            <br />
            אחרי יום של 14 שעות.
            <br />
            כשאין לך כוח אפילו לפתוח את הפה.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 mb-12">
          {[
            "73% מההורים מודים שהם משתמשים במסכים כדי לגרום לילדים לישון.",
            "ילדים שנחשפים למסכים לפני השינה נרדמים ב-40 דקות יותר מאוחר.",
            "רק 12% מההורים מצליחים לשמור על שגרת סיפור יומית.",
            "הורה ממוצע מנסה 3 פתרונות שונים לשעת ההשכבה — לפני שמוותר.",
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl bg-[#FFFBF0] p-5 shadow-sm ring-1 ring-foreground/5"
            >
              <span className="mt-0.5 text-xl">👈</span>
              <p className="text-base leading-relaxed">{stat}</p>
            </div>
          ))}
        </div>

        {/* Solution tease */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 text-center sm:text-right shadow-md">
          <p className="text-lg font-bold mb-4">בגלל זה יצרנו את סיפורון.</p>
          <p className="text-lg mb-3">המקום היחיד שמשלב:</p>
          <ul className="space-y-2 text-base leading-relaxed text-foreground/90">
            <li>✦ סיפורי שמע בהפקה תיאטרלית</li>
            <li>✦ ערכים יהודיים שנכנסים בלי לדחוף</li>
            <li>✦ קול אותנטי שילדים מתאהבים בו</li>
          </ul>
        </div>
      </Section>

      {/* ─── 3. PAIN AMPLIFICATION ─── */}
      <Section cream>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8">
          הבעיה האמיתית?{" "}
          <span className="text-primary">אין אלטרנטיבה.</span>
        </h2>

        <div className="text-center sm:text-right text-lg leading-relaxed text-foreground/90 space-y-5 mb-12">
          <p>תקשיבי.</p>
          <p>
            יוטיוב? מלא תוכן זבל.
            <br />
            פרסומות כל 30 שניות. ערכים? אפס.
          </p>
          <p>
            ספרים? הילדים לא רוצים.
            <br />
            &quot;עוד דף? לא!&quot;
          </p>
          <p>
            סיפור בעל פה?
            <br />
            את מותשת. אין כוח. וזה בסדר.
          </p>
          <p>
            אבל יש רגע — כל ערב —<br />
            שבו את יודעת ש<strong>אפשר אחרת.</strong>
            <br />
            רגע שבו הילדים <em>מבקשים</em> ללכת לישון.
            <br />
            רגע שבו את <em>נהנית</em> מהם.
          </p>
        </div>

        {/* 3 bad options as cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: MonitorSmartphone,
              title: "אופציה 1: מסכים",
              problem:
                "הילדים שקטים. אבל המסכים הורסים שינה, קשב ודמיון. ואת יודעת את זה.",
              color: "from-red-50 to-red-100/50",
            },
            {
              icon: BookOpen,
              title: "אופציה 2: לספר בעצמך",
              problem:
                "יפה בתיאוריה. בפועל — אחרי יום עבודה, 4 ילדים, ומליון משימות? אין סיכוי.",
              color: "from-orange-50 to-orange-100/50",
            },
            {
              icon: Clock,
              title: "אופציה 3: שום דבר",
              problem:
                "\"יללה לישון!\" כל ערב. ריב. דמעות. ותחושה של הורה שנכשל.",
              color: "from-gray-50 to-gray-100/50",
            },
          ].map((opt, i) => (
            <Card
              key={i}
              className={`rounded-2xl shadow-md bg-gradient-to-br ${opt.color} border-0 ring-0`}
            >
              <CardHeader className="items-center sm:items-start pb-2">
                <opt.icon className="size-8 text-muted-foreground mb-2" />
                <CardTitle className="text-lg font-bold text-center sm:text-right">
                  {opt.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/80 text-center sm:text-right">
                  {opt.problem}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CtaButton />
        </div>
      </Section>

      {/* ─── 4. TURNING POINT ─── */}
      <Section cream={false}>
        <div className="text-center sm:text-right text-lg leading-relaxed text-foreground/90 space-y-5 mb-12">
          <p>הבנו שיש בעיה רצינית.</p>
          <p>
            10,000 משפחות בקהילות שלנו —
            <br />
            ואף אחד לא מצא פתרון אמיתי לשעת ההשכבה.
          </p>
          <p>
            לא אפליקציה. לא ספר. לא &quot;טיפ מהאינטרנט.&quot;
          </p>
          <p>
            <strong>משהו שעובד. כל לילה. בלי מאמץ.</strong>
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-white to-purple-50/30 p-8 sm:p-12 shadow-lg ring-1 ring-foreground/5">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-center mb-8">
            וברגע אחד —{" "}
            <span className="text-primary">הכל השתנה.</span>
          </h3>

          <div className="text-center sm:text-right text-lg leading-relaxed text-foreground/90 space-y-5">
            <p>
              מנחם שרון, אבא ל-6,
              <br />
              ישב מול המיקרופון{" "}
              <strong>בשעה 2:17 בלילה.</strong>
            </p>
            <p>
              הקליט סיפור אחד.
              <br />
              שלח ל-50 הורים בוואטסאפ.
            </p>
            <p>
              <strong>בבוקר — 47 הודעות:</strong>
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "\"הילד נרדם תוך 3 דקות.\"",
              "\"הילדה ביקשה לשמוע שוב.\"",
              "\"מתי הסיפור הבא?\"",
            ].map((msg, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-foreground/5"
              >
                <p className="text-lg font-semibold text-primary">{msg}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xl font-extrabold text-foreground">
            זה היה הרגע.
          </p>
        </div>
      </Section>

      {/* ─── 5. AUTHORITY ─── */}
      <Section cream>
        <div className="flex flex-col items-center text-center">
          {/* Avatar placeholder */}
          <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg">
            <Mic className="size-12 text-white" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold mb-1">
            מנחם שרון
          </h3>
          <p className="text-base text-muted-foreground mb-4">
            מייסד וקריין
          </p>
          <p className="text-lg leading-relaxed text-foreground/90 mb-6 max-w-xl">
            קריין מקצועי, אבא ל-6, יוצר 200+ סיפורי שמע בהפקה תיאטרלית
          </p>

          <blockquote className="relative rounded-2xl bg-white p-6 sm:p-8 shadow-md ring-1 ring-foreground/5 max-w-2xl">
            <Quote className="absolute top-4 right-4 size-8 text-primary/20" />
            <p className="text-lg sm:text-xl leading-relaxed font-medium italic">
              &quot;הילדים שלי היו הקהל הראשון.
              <br />
              ורק כשהם ביקשו עוד — ידעתי שזה עובד.&quot;
            </p>
          </blockquote>

          <div className="mt-10 rounded-2xl bg-gradient-to-br from-purple-50 to-amber-50/50 p-8 max-w-2xl shadow-sm">
            <p className="text-lg leading-relaxed text-foreground/80">
              <strong>המשימה פשוטה:</strong>
              <br />
              כל ילד יהודי בעולם ירדם עם סיפור טוב.
              <br />
              סיפור שמלמד, מרגש ובונה עולם פנימי עשיר.
              <br />
              <strong>בלי מסכים. בלי לחץ. עם אהבה.</strong>
            </p>
          </div>
        </div>
      </Section>

      {/* ─── 6. SOLUTION REVEAL ─── */}
      <Section cream={false}>
        <div className="text-center mb-12">
          <Badge className="mb-4 text-sm px-4 py-1">
            הפתרון
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            מציגים לכם:{" "}
            <span className="text-primary">סיפורון.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            מועדון סיפורי שמע לילדים — 200+ סיפורים בהפקה תיאטרלית,
            <br className="hidden sm:block" /> בקול של מנחם שרון.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            כל יום ב-17:00 — סיפור חדש מגיע ישירות ל-WhatsApp שלכם.
            <br />
            הילדים מאזינים. נרגעים. נרדמים בשמחה.
            <br />
            <strong className="text-foreground">ואתם? נהנים מרגע שקט.</strong>
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              name: "מאגר מלא",
              desc: "200+ סיפורים מחולקים לקטגוריות: פרשת שבוע, חגים, ערכים, הרפתקאות, סדרות",
              gradient: "from-amber-50 to-amber-100/50",
            },
            {
              icon: Users,
              name: "מותאם לגיל",
              desc: "סינון לפי: 2-4, 4-6, 6-8, 8-10, 10-13. כל ילד שומע מה שמתאים לו.",
              gradient: "from-purple-50 to-purple-100/50",
            },
            {
              icon: Send,
              name: "שידור יומי",
              desc: "כל יום ב-17:00 — סיפור חדש ישירות ל-WhatsApp. בלי שצריך לחפש.",
              gradient: "from-green-50 to-green-100/50",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className={`rounded-2xl shadow-md bg-gradient-to-br ${item.gradient} border-0 ring-0 text-center story-card-hover`}
            >
              <CardHeader className="items-center pb-2">
                <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <item.icon className="size-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── 7. BONUSES ─── */}
      <Section cream>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-4">
          וזה עוד לא הכל...
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12">
          כל מנוי מקבל גם את הבונוסים האלה:
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Cake,
              name: "ברכת יום הולדת אישית",
              desc: "מנחם שרון מקליט ברכה אישית עם שם הילד — ביום ההולדת העברי.",
              value: "₪150",
            },
            {
              icon: Calendar,
              name: "מאגר חגים מיוחד",
              desc: "סיפורים ייעודיים לכל חג: ראש השנה, סוכות, חנוכה, פורים, פסח, שבועות.",
              value: "₪200",
            },
            {
              icon: Play,
              name: "נגן חכם — ממשיכים מאיפה שעצרתם",
              desc: "הילד נרדם באמצע? הנגן זוכר. מחר ממשיכים מאותה נקודה.",
              value: "₪100",
            },
            {
              icon: Sparkles,
              name: "המלצות מותאמות",
              desc: "\"מה נשמע הלילה?\" — 3 סיפורים מותאמים לגיל הילד, מצב הרוח והשעה.",
              value: "₪80",
            },
            {
              icon: Heart,
              name: "קהילת הורים ב-WhatsApp",
              desc: "10,000+ הורים שחולקים טיפים, המלצות וחוויות. את לא לבד.",
              value: null,
            },
          ].map((bonus, i) => (
            <Card
              key={i}
              className={`rounded-2xl shadow-md bg-white border-0 ring-1 ring-foreground/5 story-card-hover ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💎</span>
                  <Badge variant="secondary" className="text-xs">
                    בונוס {i + 1}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold mt-2 flex items-center gap-2">
                  <bonus.icon className="size-5 text-primary shrink-0" />
                  {bonus.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/80 mb-3">
                  {bonus.desc}
                </p>
                {bonus.value ? (
                  <p className="text-sm text-muted-foreground">
                    שווי:{" "}
                    <span className="line-through">{bonus.value}</span>{" "}
                    <span className="font-bold text-primary">כלול במנוי</span>
                  </p>
                ) : (
                  <p className="text-sm font-bold text-primary">
                    אין לזה מחיר — כלול במנוי
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── 8. TESTIMONIALS ─── */}
      <Section cream={false}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-2">
          ההורים מדברים.
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12">
          (לא אנחנו. הם.)
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "אמא מהקהילה",
              hook: "\"הילדים נרדמים בשלווה\"",
              story:
                "הסיפורים שלך מרתקים! הילדים כל אחד שומע ונרדמים בשלווה. תודה רבה!!!",
              results: ["ילדים נרדמים בשלווה", "הקשבה פעילה"],
            },
            {
              name: "הורה מהקהילה",
              hook: "\"הילד לא ישב בלי לשמוע\"",
              story:
                "יש לי ילד שאם הוא לא שומע סיפור — הוא לא ישב. הסיפורים שלך הפכו את הערב שלנו.",
              results: ["שגרת ערב חדשה", "ילד רגוע"],
            },
            {
              name: "אמא מהקהילה",
              hook: "\"הילדות מבקשות לשמוע שוב ושוב\"",
              story:
                "הילדות שלי מחכות כל ערב לסיפור חדש. ומבקשות לשמוע כמה פעמים! אתה מספר בצורה מחממת! והכי חשוב — שזה עם ערכים.",
              results: [
                "האזנה חוזרת",
                "ערכים יהודיים",
                "ילדות מאושרות",
              ],
            },
            {
              name: "הורה מהקהילה",
              hook: "\"נכנסנו לשגרה חדשה\"",
              story:
                "נכנסנו לשגרה חדשה. הסיפורים מעניינים, מפתחים דמיון וקשב. וגם אני — כאמא — מאזינה!",
              results: [
                "שגרה חדשה",
                "פיתוח דמיון וקשב",
                "גם האמא נהנית",
              ],
            },
            {
              name: "הורה מהקהילה",
              hook: "\"תוכן איכותי בדרך מעניינת\"",
              story:
                "התוכן איכותי ביותר ומועבר בדרך מעניינת ומאפשרת פיתוח הדמיון כמו קליטת סיפור.",
              results: ["תוכן איכותי", "פיתוח דמיון"],
            },
          ].map((t, i) => (
            <Card
              key={i}
              className={`rounded-2xl shadow-md bg-gradient-to-br from-[#FFFBF0] to-white border-0 ring-1 ring-foreground/5 story-card-hover ${i >= 3 ? "lg:col-span-1" : ""}`}
            >
              <CardHeader className="pb-2">
                <p className="text-lg font-bold text-primary">{t.hook}</p>
                <CardDescription className="text-sm text-muted-foreground">
                  {t.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/80 mb-4">
                  {t.story}
                </p>
                <div className="space-y-1">
                  {t.results.map((r, j) => (
                    <p key={j} className="text-sm font-medium text-foreground/90">
                      ✅ {r}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CtaButton />
        </div>
      </Section>

      {/* ─── 9. WHO IT'S FOR ─── */}
      <Section cream>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10">
          סיפורון לא לכולם.
        </h2>

        <div className="mx-auto max-w-2xl">
          {/* Disqualification */}
          <div className="rounded-2xl bg-red-50/50 p-6 sm:p-8 mb-8 ring-1 ring-red-100">
            <p className="text-lg leading-relaxed text-foreground/80">
              אם את חושבת שיוטיוב זה מספיק — סיפורון לא בשבילך.
              <br />
              אם אין לך 5 דקות ביום לילדים — סיפורון לא בשבילך.
            </p>
          </div>

          {/* Qualification */}
          <div className="rounded-2xl bg-gradient-to-br from-green-50/50 to-amber-50/50 p-6 sm:p-8 ring-1 ring-green-100">
            <p className="text-lg font-bold mb-4">אבל אם...</p>
            <ul className="space-y-3 text-lg leading-relaxed text-foreground/90 mb-6">
              <li>✦ את רוצה שהילדים יגדלו עם ערכים — בלי לדחוף</li>
              <li>✦ את רוצה שעת השכבה שקטה — בלי מאבקים</li>
              <li>✦ את רוצה תחליף למסכים — שהילדים באמת אוהבים</li>
              <li>✦ את רוצה רגע שקט בערב — שמגיע לך</li>
            </ul>
            <p className="text-lg text-foreground/80">
              ...ואת מוכנה להשקיע ₪5 כדי לנסות?
            </p>
          </div>

          <p className="mt-8 text-center text-2xl font-extrabold text-primary">
            את חייבת להיות בפנים.
          </p>
        </div>

        <div className="mt-10 text-center">
          <CtaButton />
        </div>
      </Section>

      {/* ─── 10. PRICING ─── */}
      <Section cream={false}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10">
          כמה זה עולה?
        </h2>

        {/* Anchor */}
        <div className="mx-auto max-w-2xl text-center sm:text-right text-lg leading-relaxed text-foreground/80 mb-12">
          <p className="mb-4">בואי נחשב.</p>
          <p>
            אפליקציית סיפורים באנגלית: $9.99/חודש (₪37).
            <br />
            ספר ילדים חדש כל שבוע: ₪40-60.
            <br />
            מטפלת שמשכיבה ילדים: ₪80 לשעה.
          </p>
          <p className="mt-4 font-bold text-foreground">
            סה&quot;כ? ₪150-200 בחודש. מינימום.
          </p>
        </div>

        {/* Offer list */}
        <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 mb-12 shadow-sm">
          <p className="text-lg font-bold mb-4">בסיפורון את מקבלת:</p>
          <ul className="space-y-2 text-base leading-relaxed">
            {[
              "200+ סיפורים בהפקה תיאטרלית",
              "סיפור חדש כל שבוע",
              "מותאם לגיל (2-13)",
              "ערכים יהודיים",
              "ברכת יום הולדת אישית",
              "נגן חכם",
              "קהילת 10,000+ הורים",
              "ביטול בכל זמן",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="size-5 text-green-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {/* Monthly */}
          <Card className="rounded-2xl shadow-md bg-white border-0 ring-1 ring-foreground/10 text-center">
            <CardHeader className="items-center pb-2">
              <CardTitle className="text-xl font-bold">חודשי</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div>
                <p className="text-4xl font-extrabold text-foreground">₪49.90</p>
                <p className="text-sm text-muted-foreground">לחודש</p>
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-2">
                <p className="text-sm font-bold text-primary">
                  חודש ראשון רק ₪5
                </p>
              </div>
              <p className="text-sm text-muted-foreground">ביטול בכל זמן</p>
              <Link href="/checkout?plan=monthly" className="w-full">
                <Button
                  variant="outline"
                  className="w-full rounded-full py-6 text-base font-bold hover:bg-primary hover:text-white transition-all"
                >
                  להתחיל ב-₪5
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Annual — recommended */}
          <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-amber-50 to-white border-2 border-primary text-center relative overflow-visible">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <Badge className="bg-primary text-white px-4 py-1 text-sm font-bold shadow-md">
                <Crown className="size-4 ml-1" />
                הכי משתלם
              </Badge>
            </div>
            <CardHeader className="items-center pb-2 pt-8">
              <CardTitle className="text-xl font-bold">שנתי</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div>
                <p className="text-4xl font-extrabold text-primary">₪39.90</p>
                <p className="text-sm text-muted-foreground">לחודש</p>
              </div>
              <div className="rounded-xl bg-green-50 px-4 py-2">
                <p className="text-sm font-bold text-green-700">
                  חוסכים ₪120 בשנה
                </p>
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-2">
                <p className="text-sm font-bold text-primary">
                  חודש ראשון רק ₪5
                </p>
              </div>
              <Link href="/checkout?plan=annual" className="w-full">
                <Button className="w-full rounded-full py-6 text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all">
                  להתחיל ב-₪5 עכשיו
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          (כולל הכל. בלי הפתעות. בלי התחייבות.)
        </p>
      </Section>

      {/* ─── 11. FINAL CTA ─── */}
      <section className="relative gradient-warm py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
            הילדים שלכם
            <br />
            <span className="text-primary">מחכים לסיפור הלילה.</span>
          </h2>

          <CtaButton className="mb-6" />

          <p className="mt-6 text-sm font-medium text-primary/80">
            * מבצע ₪5 לחודש ראשון — זמני. מחר זה יכול להשתנות.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            ₪5 בחודש הראשון. ביטול בקליק. 10,000+ משפחות כבר בפנים.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="size-4 text-primary" /> סליקה מאובטחת
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="size-4 text-primary" /> ביטול בכל זמן
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-primary" /> 10,000+ משפחות
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
