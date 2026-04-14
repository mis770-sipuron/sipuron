import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"

const FEATURES = [
  "גישה מלאה למאגר (200+ סיפורים)",
  "סיפור חדש כל שבוע",
  "לפי גילאים: 2-4, 4-6, 6-8, 8-10, 10-13",
  "פרשת שבוע, חגים, ערכים, הרפתקאות, סדרות",
  "ברכת יום הולדת אישית ממנחם שרון",
  "נגן נוח — ממשיכים מאיפה שעצרתם",
  "ביטול בכל זמן, בלי שאלות",
]

export function PricingSection() {
  return (
    <section className="py-16 sm:py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            הצטרפו למשפחת סיפורון
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            ₪5 = פחות מקפה. 30 לילות שקטים.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Monthly */}
          <Card className="relative p-8 border-2 border-border hover:border-primary/40 transition-colors">
            <h3 className="text-xl font-bold text-foreground mb-1">חודשי</h3>
            <p className="text-sm text-muted-foreground mb-6">גמישות מלאה</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">₪49.90</span>
                <span className="text-muted-foreground">/חודש</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
                <Sparkles className="h-3.5 w-3.5" />
                ₪5 בחודש הראשון!
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Button className="w-full rounded-full" size="lg" asChild>
              <Link href="/checkout?plan=monthly">
                להתחיל ב-₪5
              </Link>
            </Button>
          </Card>

          {/* Annual */}
          <Card className="relative p-8 border-2 border-primary shadow-lg shadow-primary/10">
            <Badge className="absolute -top-3 right-6 bg-primary text-primary-foreground px-3">
              חיסכון ₪120
            </Badge>

            <h3 className="text-xl font-bold text-foreground mb-1">שנתי</h3>
            <p className="text-sm text-muted-foreground mb-6">הכי משתלם</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">₪39.90</span>
                <span className="text-muted-foreground">/חודש</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                ₪478.80 לשנה (במקום ₪598.80)
              </div>
              <div className="mt-2 inline-flex items-center gap-1 bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
                <Sparkles className="h-3.5 w-3.5" />
                ₪5 בחודש הראשון!
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Button className="w-full rounded-full bg-primary hover:bg-primary/90" size="lg" asChild>
              <Link href="/checkout?plan=annual">
                להתחיל ב-₪5 + חיסכון
              </Link>
            </Button>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            סליקה מאובטחת | ביטול בקליק | 10,000+ משפחות כבר בפנים
          </p>
        </div>
      </div>
    </section>
  )
}
