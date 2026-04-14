"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Phone, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  function handleSendPhone() {
    console.log("Send OTP to phone:", phone)
    setOtpSent(true)
  }

  function handleSendEmail() {
    console.log("Send magic link to email:", email)
    setOtpSent(true)
  }

  function handleVerifyOtp() {
    console.log("Verify OTP:", { method: activeTab, otp, phone, email })
  }

  function handleTabChange(value: string | number | null) {
    if (value === "phone" || value === "email") {
      setActiveTab(value)
      setOtpSent(false)
      setOtp("")
    }
  }

  return (
    <div className="mx-auto max-w-md py-12 sm:py-20">
      <Card className="shadow-lg rounded-3xl border-0 ring-0">
        <CardContent className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              <span className="text-xl font-extrabold text-foreground">
                סיפורון
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              היכנסו לחשבון שלכם
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="phone" onValueChange={handleTabChange}>
            <TabsList className="mb-6 grid w-full grid-cols-2 h-11 rounded-xl">
              <TabsTrigger value="phone" className="gap-1.5 rounded-lg">
                <Phone className="h-4 w-4" />
                טלפון
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-1.5 rounded-lg">
                <Mail className="h-4 w-4" />
                מייל
              </TabsTrigger>
            </TabsList>

            {/* Phone tab */}
            <TabsContent value="phone">
              {!otpSent ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">מספר טלפון</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="054-XXX-XXXX"
                      className="h-12 rounded-xl text-base"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                  <Button
                    className="h-12 w-full rounded-xl text-base font-bold"
                    onClick={handleSendPhone}
                    disabled={!phone.trim()}
                  >
                    שלח קוד
                  </Button>
                </div>
              ) : (
                <OtpInput
                  otp={otp}
                  onChange={setOtp}
                  onVerify={handleVerifyOtp}
                />
              )}
            </TabsContent>

            {/* Email tab */}
            <TabsContent value="email">
              {!otpSent ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">כתובת מייל</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 rounded-xl text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                  <Button
                    className="h-12 w-full rounded-xl text-base font-bold"
                    onClick={handleSendEmail}
                    disabled={!email.trim()}
                  >
                    שלח לינק כניסה
                  </Button>
                </div>
              ) : (
                <OtpInput
                  otp={otp}
                  onChange={setOtp}
                  onVerify={handleVerifyOtp}
                />
              )}
            </TabsContent>
          </Tabs>

          {/* Signup link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            עדיין לא נרשמתם?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              הצטרפו עכשיו
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

/* ── OTP input sub-component ── */

function OtpInput({
  otp,
  onChange,
  onVerify,
}: {
  otp: string
  onChange: (v: string) => void
  onVerify: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <Label>הזינו את הקוד שקיבלתם</Label>
        <Input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="______"
          className="h-12 rounded-xl text-center text-2xl tracking-[0.5em] font-bold"
          value={otp}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(0, 6)
            onChange(v)
          }}
          dir="ltr"
        />
      </div>
      <Button
        className="h-12 w-full rounded-xl text-base font-bold"
        onClick={onVerify}
        disabled={otp.length < 6}
      >
        אמת
      </Button>
    </div>
  )
}
