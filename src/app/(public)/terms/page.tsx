import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description: "תנאי השימוש של סיפורון — סיפורי שמע לילדים",
}

export default function TermsPage() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/40 to-background dark:from-slate-900 dark:to-background min-h-screen">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-amber dark:prose-invert prose-headings:font-extrabold prose-p:leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          תנאי שימוש
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          עודכן לאחרונה: 15 באפריל 2026
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">1. כללי</h2>
        <p className="text-foreground/90 mb-4">
          ברוכים הבאים לסיפורון (להלן: &quot;האתר&quot; או &quot;השירות&quot;). האתר מופעל
          על ידי מנחם שרון (להלן: &quot;מפעיל השירות&quot;). השימוש באתר ובשירותים
          המוצעים בו מהווה הסכמה לתנאי שימוש אלה. אם אינכם מסכימים לתנאי
          השימוש, אנא הימנעו משימוש באתר.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">2. השירות</h2>
        <p className="text-foreground/90 mb-4">
          סיפורון מספק שירות מנוי לסיפורי שמע לילדים. השירות כולל גישה למאגר
          סיפורים דיגיטליים, סיפורים חדשים שמתעדכנים באופן שוטף, ותכנים נוספים
          המוצעים מעת לעת.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">3. הרשמה ומנוי</h2>
        <p className="text-foreground/90 mb-4">
          השימוש בחלק מהתכנים באתר מותנה ברכישת מנוי. בעת ההרשמה, עליכם לספק
          פרטים מדויקים ומעודכנים. אתם אחראים לשמירה על סודיות פרטי החשבון שלכם.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">4. תשלום וביטול</h2>
        <p className="text-foreground/90 mb-4">
          התשלום עבור המנוי מתבצע באמצעות כרטיס אשראי דרך חברת הסליקה Cardcom.
          ניתן לבטל את המנוי בכל עת ללא התחייבות. ביטול המנוי ייכנס לתוקף בתום
          תקופת החיוב הנוכחית.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">5. קניין רוחני</h2>
        <p className="text-foreground/90 mb-4">
          כל התכנים באתר, לרבות סיפורים, הקלטות, טקסטים, עיצוב גרפי ולוגו, הם
          קניינו הרוחני של מפעיל השירות ומוגנים על פי חוקי זכויות יוצרים. אין
          להעתיק, להפיץ, לשדר או להשתמש בתכנים ללא אישור מפורש בכתב.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">6. שימוש מותר</h2>
        <p className="text-foreground/90 mb-4">
          המנוי מעניק זכות שימוש אישית ולא-מסחרית בתכנים. ניתן להאזין לסיפורים
          במסגרת המשפחה בלבד. חל איסור על הפצה, שיתוף חשבון עם מנויים נוספים,
          או שימוש מסחרי כלשהו בתכנים.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">7. הגבלת אחריות</h2>
        <p className="text-foreground/90 mb-4">
          השירות מסופק &quot;כפי שהוא&quot; (AS IS). מפעיל השירות אינו מתחייב לזמינות
          רצופה או ללא תקלות. מפעיל השירות לא יישא באחריות לנזק כלשהו הנובע
          משימוש באתר או מחוסר יכולת להשתמש בו.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">8. שינויים בתנאים</h2>
        <p className="text-foreground/90 mb-4">
          מפעיל השירות רשאי לעדכן תנאי שימוש אלה מעת לעת. שינויים מהותיים יפורסמו
          באתר ובהודעה למנויים. המשך השימוש באתר לאחר העדכון מהווה הסכמה לתנאים
          המעודכנים.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">9. יצירת קשר</h2>
        <p className="text-foreground/90 mb-4">
          לכל שאלה או פנייה בנוגע לתנאי השימוש, ניתן ליצור קשר דרך WhatsApp
          במספר 054-846-0430 או בדוא&quot;ל info@sipuron.co.il.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">10. דין חל וסמכות שיפוט</h2>
        <p className="text-foreground/90 mb-4">
          על תנאי שימוש אלה יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית תהיה
          לבתי המשפט המוסמכים בישראל.
        </p>
      </article>
    </section>
  )
}
