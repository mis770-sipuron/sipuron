import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של סיפורון — סיפורי שמע לילדים",
}

export default function PrivacyPage() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/40 to-background dark:from-slate-900 dark:to-background min-h-screen">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-amber dark:prose-invert prose-headings:font-extrabold prose-p:leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          מדיניות פרטיות
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          עודכן לאחרונה: 15 באפריל 2026
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">1. כללי</h2>
        <p className="text-foreground/90 mb-4">
          סיפורון (להלן: &quot;אנחנו&quot;, &quot;השירות&quot;) מחויבת להגנה על פרטיות
          המשתמשים שלנו. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים
          על המידע האישי שלכם.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">2. מידע שאנו אוספים</h2>
        <p className="text-foreground/90 mb-3">אנו אוספים את הסוגים הבאים של מידע:</p>
        <ul className="list-disc list-inside text-foreground/90 space-y-2 mb-4 pr-4">
          <li><strong>פרטי הרשמה:</strong> שם מלא, מספר טלפון, כתובת דוא&quot;ל.</li>
          <li><strong>פרטי ילדים:</strong> שם פרטי וקבוצת גיל (לצורך התאמת תכנים).</li>
          <li><strong>פרטי תשלום:</strong> מעובדים באופן מאובטח דרך Cardcom — אנחנו לא שומרים פרטי כרטיס אשראי.</li>
          <li><strong>נתוני שימוש:</strong> סיפורים שהאזנתם להם, זמני שימוש, העדפות תוכן.</li>
          <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">3. כיצד אנו משתמשים במידע</h2>
        <ul className="list-disc list-inside text-foreground/90 space-y-2 mb-4 pr-4">
          <li>ניהול חשבון המנוי ומתן גישה לתכנים.</li>
          <li>התאמה אישית של סיפורים לגילאי הילדים.</li>
          <li>שליחת עדכונים על סיפורים חדשים ותכנים רלוונטיים.</li>
          <li>שיפור השירות וחוויית המשתמש.</li>
          <li>עמידה בדרישות חוקיות.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">4. שיתוף מידע עם צדדים שלישיים</h2>
        <p className="text-foreground/90 mb-3">
          אנו לא מוכרים, סוחרים או משכירים מידע אישי. אנו משתפים מידע רק עם:
        </p>
        <ul className="list-disc list-inside text-foreground/90 space-y-2 mb-4 pr-4">
          <li><strong>Cardcom:</strong> לצורך עיבוד תשלומים.</li>
          <li><strong>Supabase:</strong> לאחסון נתונים מאובטח.</li>
          <li><strong>שירותי ניתוח:</strong> נתונים אנונימיים בלבד לשיפור השירות.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">5. אבטחת מידע</h2>
        <p className="text-foreground/90 mb-4">
          אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלכם, כולל הצפנת נתונים
          בהעברה ובאחסון, גישה מוגבלת למידע, וניטור שוטף של מערכות האבטחה.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">6. זכויות המשתמש</h2>
        <p className="text-foreground/90 mb-3">יש לכם את הזכות:</p>
        <ul className="list-disc list-inside text-foreground/90 space-y-2 mb-4 pr-4">
          <li>לעיין במידע האישי שנשמר עליכם.</li>
          <li>לבקש תיקון מידע שגוי.</li>
          <li>לבקש מחיקת המידע שלכם.</li>
          <li>להתנגד לעיבוד מידע לצרכי שיווק.</li>
          <li>לקבל את המידע שלכם בפורמט דיגיטלי.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">7. עוגיות (Cookies)</h2>
        <p className="text-foreground/90 mb-4">
          האתר משתמש בעוגיות חיוניות לתפקוד השירות (התחברות, העדפות). אנו לא
          משתמשים בעוגיות מעקב של צדדים שלישיים.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">8. פרטיות ילדים</h2>
        <p className="text-foreground/90 mb-4">
          אנו רגישים במיוחד לפרטיות ילדים. אנו אוספים מידע מינימלי על ילדים
          (שם פרטי וקבוצת גיל בלבד) ורק לצורך התאמת תכנים. אנו לא פונים ישירות
          לילדים ולא אוספים מהם מידע.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">9. שינויים במדיניות</h2>
        <p className="text-foreground/90 mb-4">
          אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר
          ובהודעה למנויים.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">10. יצירת קשר</h2>
        <p className="text-foreground/90 mb-4">
          לשאלות בנוגע למדיניות הפרטיות, פנו אלינו בוואטסאפ: 054-846-0430
          או בדוא&quot;ל: info@sipuron.co.il.
        </p>
      </article>
    </section>
  )
}
