import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "הצטרפו לסיפורון — ₪5 בחודש הראשון",
  description:
    "סיפורי שמע לילדים בקול של מנחם שרון. 200+ סיפורים, פרשת שבוע, חגים, ערכים. הצטרפו ב-₪5 בלבד.",
  openGraph: {
    title: "הצטרפו לסיפורון — ₪5 בחודש הראשון",
    description:
      "סיפורי שמע לילדים בקול של מנחם שרון. 200+ סיפורים, פרשת שבוע, חגים, ערכים. הצטרפו ב-₪5 בלבד.",
  },
}

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
