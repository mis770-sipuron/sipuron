import { Card } from "@/components/ui/card"
import { Star, Users, BookOpen, Calendar } from "lucide-react"

const TESTIMONIALS = [
  {
    quote: "הילדים מחכים כל ערב לסיפור. שעת ההשכבה הפכה לרגע הכי טוב ביום.",
    name: "שרה כ.",
    detail: "אמא ל-4",
  },
  {
    quote: "אלטרנטיבה מושלמת למסכים. תוכן איכותי עם ערכים שחשובים לנו.",
    name: "רחלי מ.",
    detail: "אמא ל-3",
  },
  {
    quote: "הילד מבקש את מנחם כל לילה. העדפתי לשלם ₪45 מאשר לריב על הטלפון.",
    name: "דבורה ל.",
    detail: "אמא ל-5",
  },
]

const STATS = [
  { icon: Users, value: "10,000+", label: "משפחות" },
  { icon: BookOpen, value: "200+", label: "סיפורים" },
  { icon: Calendar, value: "כל יום", label: "סיפור חדש" },
  { icon: Star, value: "4.9/5", label: "דירוג הורים" },
]

export function SocialProof() {
  return (
    <section className="py-16 sm:py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            מה ההורים אומרים
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card
              key={i}
              className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="text-sm">
                <span className="font-bold text-foreground">{t.name}</span>
                <span className="text-muted-foreground"> — {t.detail}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
