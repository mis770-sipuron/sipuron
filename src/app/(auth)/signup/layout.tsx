import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "הרשמה לסיפורון",
  description:
    "הצטרפו למשפחת סיפורון — 200+ סיפורי שמע לילדים, סיפור חדש כל שבוע, חודש ראשון ב-₪5 בלבד.",
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
