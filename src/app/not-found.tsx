import Link from "next/link"
import { BookOpen, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-50/60 to-background dark:from-slate-900 dark:to-background px-4 text-center">
      {/* Illustration area */}
      <div className="relative mb-8">
        {/* Open book with stars */}
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-100/60 dark:bg-amber-900/20 animate-pulse" />
          <BookOpen className="relative h-20 w-20 text-amber-500 dark:text-amber-400" />
        </div>

        {/* Floating sparkles */}
        <span className="absolute top-2 right-2 text-2xl animate-twinkle">&#10022;</span>
        <span className="absolute bottom-4 left-0 text-xl animate-twinkle" style={{ animationDelay: "0.5s" }}>&#10022;</span>
        <span className="absolute top-8 left-8 text-lg animate-twinkle" style={{ animationDelay: "1s" }}>&#10022;</span>
      </div>

      {/* 404 number */}
      <h1 className="text-8xl sm:text-9xl font-extrabold text-amber-500/20 dark:text-amber-400/10 select-none leading-none mb-4">
        404
      </h1>

      {/* Main headline */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
        הסיפור הזה לא נמצא...
      </h2>

      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        נראה שהדף שחיפשתם עדיין לא נכתב. אבל אל דאגה — יש לנו 200+ סיפורים
        שמחכים לכם בדף הבית!
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild className="h-12 px-6 rounded-xl text-base font-bold">
          <Link href="/">
            <Home className="h-4 w-4" />
            חזרה לדף הבית
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 px-6 rounded-xl text-base">
          <Link href="/stories">
            <Search className="h-4 w-4" />
            חפשו סיפור
          </Link>
        </Button>
      </div>

      {/* Footer note */}
      <p className="mt-12 text-xs text-muted-foreground">
        &copy; סיפורון — מנחם שרון
      </p>
    </div>
  )
}
