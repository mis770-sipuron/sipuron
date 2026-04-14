import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      {/* Logo */}
      <div className="flex items-center gap-2 pt-8 pb-4">
        <BookOpen className="h-8 w-8 text-primary" />
        <span className="text-2xl font-extrabold text-foreground">
          סיפורון
        </span>
      </div>

      {/* Page content */}
      <div className="w-full flex-1 px-4">{children}</div>

      {/* Footer link */}
      <div className="py-6 text-center">
        <Link
          href="/"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  )
}
