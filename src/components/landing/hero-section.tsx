import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-warm">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              מעל 10,000 משפחות כבר מאזינות
            </span>
          </div>

          {/* Headline — שיטת יהב: ספציפי + הבטחה + timeframe */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}>
            כל לילה סיפור חדש.
            <br />
            <span className="bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              כל סיפור — עולם שלם.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}>
            סיפורי שמע מרגשים לילדים, בקול של מנחם שרון.
            <br className="hidden sm:block" />
            הפקה תיאטרלית עם ערכים יהודיים — מושלם לשעת השינה.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
              <Link href="/join">
                <Play className="h-5 w-5 ml-2 fill-current" />
                להאזין בחינם
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 rounded-full">
              <Link href="/join">
                להצטרף ב-₪5 בלבד
              </Link>
            </Button>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            ביטול בכל זמן, בלי שאלות. סליקה מאובטחת.
          </p>
        </div>
      </div>
    </section>
  )
}
