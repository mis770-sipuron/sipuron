import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "מאגר הסיפורים",
  description:
    "200+ סיפורי שמע לילדים — פרשת שבוע, חגים, ערכים, הרפתקאות, סדרות ועוד. חפשו לפי גיל, קטגוריה או מילת חיפוש.",
  openGraph: {
    title: "מאגר הסיפורים — סיפורון",
    description:
      "200+ סיפורי שמע לילדים — פרשת שבוע, חגים, ערכים, הרפתקאות, סדרות ועוד.",
  },
}

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
