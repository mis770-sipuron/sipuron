import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "צור קשר",
  description: "יש לכם שאלה? רוצים לשתף משהו? צרו קשר עם סיפורון דרך WhatsApp או טופס.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
