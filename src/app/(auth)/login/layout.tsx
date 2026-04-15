import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "התחברות",
  description: "היכנסו לחשבון סיפורון שלכם והמשיכו להאזין לסיפורים.",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
