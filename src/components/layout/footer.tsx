import Link from "next/link"
import { BookOpen, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-extrabold text-primary">סיפורון</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              סיפורי שמע איכותיים לילדים בקול של מנחם שרון.
              <br />
              כל לילה סיפור חדש. כל סיפור — עולם שלם.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">קישורים</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/stories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                מאגר סיפורים
              </Link>
              <Link href="/join" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                הצטרפות למועדון
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                תנאי שימוש
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                מדיניות פרטיות
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                צור קשר
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">צור קשר</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/972548460430"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4" />
                054-846-0430
              </a>
              <a
                href="mailto:info@sipuron.co.il"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@sipuron.co.il
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} סיפורון — מנחם שרון. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  )
}
