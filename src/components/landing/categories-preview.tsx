import Link from "next/link"
import { STORY_CATEGORIES } from "@/lib/constants"

export function CategoriesPreview() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            סיפורים לכל רגע
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            200+ סיפורים מחולקים לקטגוריות — תמיד תמצאו מה להאזין
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {STORY_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-sm font-medium text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
