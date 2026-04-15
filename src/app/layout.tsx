import type { Metadata } from "next"
import { Assistant } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { PlayerProvider } from "@/components/player/player-provider"
import { MiniPlayer } from "@/components/player/mini-player"
import "./globals.css"

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin", "hebrew"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: "סיפורון — סיפורי שמע לילדים",
    template: "%s | סיפורון",
  },
  description:
    "מאגר סיפורי שמע איכותיים לילדים בקול של מנחם שרון. סיפורים מרגשים עם ערכים יהודיים, מושלם לשעת השינה.",
  keywords: [
    "סיפורון",
    "סיפורי שמע",
    "ילדים",
    "מנחם שרון",
    "סיפורים לפני השינה",
    "ערכים יהודיים",
    "פרשת שבוע",
  ],
  authors: [{ name: "מנחם שרון" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "סיפורון — סיפורי שמע לילדים",
    description: "כל לילה סיפור חדש. כל סיפור — עולם שלם.",
    locale: "he_IL",
    type: "website",
    siteName: "סיפורון",
    url: "https://sipuron.org",
    images: [
      {
        url: "https://sipuron.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "סיפורון — סיפורי שמע לילדים",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "סיפורון — סיפורי שמע לילדים",
    description: "כל לילה סיפור חדש. כל סיפור — עולם שלם.",
    images: ["https://sipuron.org/og-image.png"],
  },
  metadataBase: new URL("https://sipuron.org"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <PlayerProvider>
              {children}
              <MiniPlayer />
            </PlayerProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
