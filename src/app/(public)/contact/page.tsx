"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MessageCircle, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire up to API route
    console.log("Contact form:", { name, email, message })
    setSent(true)
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/40 to-background dark:from-slate-900 dark:to-background min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            צור קשר
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            יש לכם שאלה? רוצים לשתף משהו? נשמח לשמוע
          </p>
        </div>

        {/* Quick contact options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <a
            href="https://wa.me/972548460430"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <MessageCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground" dir="ltr">054-846-0430</p>
                </div>
              </CardContent>
            </Card>
          </a>

          <a
            href="mailto:info@sipuron.co.il"
            className="group"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">דוא&quot;ל</h3>
                  <p className="text-sm text-muted-foreground" dir="ltr">info@sipuron.co.il</p>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Contact form */}
        <Card className="border-0 shadow-lg rounded-3xl">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">
              שלחו לנו הודעה
            </h2>

            {sent ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground">ההודעה נשלחה בהצלחה!</h3>
                <p className="text-muted-foreground">
                  נחזור אליכם בהקדם האפשרי
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSent(false)
                    setName("")
                    setEmail("")
                    setMessage("")
                  }}
                >
                  שלחו הודעה נוספת
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">שם</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="השם שלכם"
                    className="h-12 rounded-xl text-base"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">
                    דוא&quot;ל
                    <span className="text-xs text-muted-foreground mr-1">(לא חובה)</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-12 rounded-xl text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">הודעה</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="ספרו לנו במה נוכל לעזור..."
                    className="min-h-[120px] rounded-xl text-base resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl text-base font-bold"
                  disabled={!name.trim() || !message.trim()}
                >
                  <Send className="h-4 w-4" />
                  שלח הודעה
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          הדרך המהירה ביותר לתשובה? שלחו הודעת WhatsApp
        </p>
      </div>
    </section>
  )
}
