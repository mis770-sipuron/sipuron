import { Mic, Heart } from "lucide-react"

export function AboutMenachem() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Avatar placeholder */}
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-900 mb-6 shadow-lg">
            <Mic className="h-10 w-10 text-amber-800 dark:text-amber-200" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            הקול מאחורי הסיפורים
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            <strong className="text-foreground">מנחם שרון</strong> — קריין, מספר סיפורים ואבא.
            כל סיפור נכתב ומופק ברמה תיאטרלית, עם דגש על ערכים יהודיים,
            דמיון עשיר ושפה שילדים אוהבים.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            &ldquo;החזון שלי פשוט — שכל ילד יהודי בעולם ירדם עם סיפור טוב.
            <br />
            סיפור שמלמד, מרגש ובונה עולם פנימי עשיר.&rdquo;
          </p>

          <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
            <Heart className="h-4 w-4 fill-primary" />
            מאז 2025 — כל לילה סיפור חדש, בלי הפסקה
          </div>
        </div>
      </div>
    </section>
  )
}
