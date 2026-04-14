"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Phone,
  Mail,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

/* ── Types ── */

interface Child {
  name: string
  ageGroup: string
}

type Plan = "monthly" | "annual"

const AGE_GROUPS = [
  { value: "2-4", label: "2-4" },
  { value: "4-6", label: "4-6" },
  { value: "6-8", label: "6-8" },
  { value: "8-10", label: "8-10" },
  { value: "10-13", label: "10-13" },
]

const MAX_CHILDREN = 6

const FEATURES = [
  "גישה מלאה למאגר (200+ סיפורים)",
  "סיפור חדש כל שבוע",
  "לפי גילאים: 2-4, 4-6, 6-8, 8-10, 10-13",
  "ברכת יום הולדת אישית ממנחם שרון",
  "ביטול בכל זמן, בלי שאלות",
]

/* ── Page Component ── */

export default function SignupPage() {
  const [step, setStep] = useState(1)

  /* Step 1 */
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  /* Step 2 */
  const [children, setChildren] = useState<Child[]>([
    { name: "", ageGroup: "" },
  ])

  /* Step 3 */
  const [plan, setPlan] = useState<Plan>("monthly")

  /* ── Handlers ── */

  function addChild() {
    if (children.length < MAX_CHILDREN) {
      setChildren([...children, { name: "", ageGroup: "" }])
    }
  }

  function removeChild(index: number) {
    setChildren(children.filter((_, i) => i !== index))
  }

  function updateChild(index: number, field: keyof Child, value: string) {
    const updated = [...children]
    updated[index] = { ...updated[index], [field]: value }
    setChildren(updated)
  }

  function handleSubmit() {
    console.log("Signup data:", {
      fullName,
      phone,
      email,
      children,
      plan,
    })
  }

  /* ── Validation per step ── */

  const step1Valid = fullName.trim().length > 0 && phone.trim().length > 0
  const step2Valid =
    children.length > 0 &&
    children.every((c) => c.name.trim().length > 0 && c.ageGroup.length > 0)

  /* ── Render ── */

  return (
    <div className="mx-auto max-w-md py-8 sm:py-16">
      <Card className="shadow-lg rounded-3xl border-0 ring-0">
        <CardContent className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              <span className="text-xl font-extrabold text-foreground">
                סיפורון
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              הצטרפו למשפחת סיפורון
            </p>
          </div>

          {/* Progress bar */}
          <ProgressSteps current={step} />

          {/* Steps */}
          {step === 1 && (
            <Step1
              fullName={fullName}
              setFullName={setFullName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
            />
          )}

          {step === 2 && (
            <Step2
              children={children}
              addChild={addChild}
              removeChild={removeChild}
              updateChild={updateChild}
            />
          )}

          {step === 3 && (
            <Step3 plan={plan} setPlan={setPlan} />
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                className="h-12 flex-1 rounded-xl text-base"
                onClick={() => setStep(step - 1)}
              >
                <ChevronRight className="h-4 w-4" />
                חזרה
              </Button>
            )}

            {step < 3 && (
              <Button
                className="h-12 flex-1 rounded-xl text-base font-bold"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !step1Valid : !step2Valid}
              >
                הבא
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            {step === 3 && (
              <Button
                className="h-12 flex-1 rounded-xl text-base font-bold shimmer-effect"
                onClick={handleSubmit}
              >
                <Sparkles className="h-4 w-4" />
                להתחיל ב-₪5
              </Button>
            )}
          </div>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            כבר יש לכם חשבון?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              התחברו כאן
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

/* ══════════════════════════════════════════
   Sub-components
   ══════════════════════════════════════════ */

/* ── Progress indicator ── */

function ProgressSteps({ current }: { current: number }) {
  const steps = [
    { num: 1, label: "פרטים אישיים" },
    { num: 2, label: "ילדים" },
    { num: 3, label: "תוכנית" },
  ]

  return (
    <div className="mb-8">
      {/* Step labels */}
      <div className="mb-2 flex items-center justify-between px-1">
        {steps.map((s) => (
          <span
            key={s.num}
            className={`text-xs font-medium ${
              s.num <= current
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {s.label}
          </span>
        ))}
      </div>

      {/* Bar */}
      <div className="flex h-2 w-full gap-1.5 overflow-hidden rounded-full">
        {steps.map((s) => (
          <div
            key={s.num}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              s.num <= current ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Fraction */}
      <p className="mt-1.5 text-center text-xs text-muted-foreground">
        {current}/3
      </p>
    </div>
  )
}

/* ── Step 1: Personal details ── */

function Step1({
  fullName,
  setFullName,
  phone,
  setPhone,
  email,
  setEmail,
}: {
  fullName: string
  setFullName: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  email: string
  setEmail: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">
          <User className="h-4 w-4 text-muted-foreground" />
          שם מלא
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="ישראל ישראלי"
          className="h-12 rounded-xl text-base"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-phone">
          <Phone className="h-4 w-4 text-muted-foreground" />
          טלפון
        </Label>
        <Input
          id="signup-phone"
          type="tel"
          placeholder="054-XXX-XXXX"
          className="h-12 rounded-xl text-base"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          dir="ltr"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">
          <Mail className="h-4 w-4 text-muted-foreground" />
          מייל
          <span className="text-xs text-muted-foreground">(לא חובה)</span>
        </Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="name@example.com"
          className="h-12 rounded-xl text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dir="ltr"
        />
      </div>
    </div>
  )
}

/* ── Step 2: Children ── */

function Step2({
  children,
  addChild,
  removeChild,
  updateChild,
}: {
  children: Child[]
  addChild: () => void
  removeChild: (i: number) => void
  updateChild: (i: number, field: keyof Child, value: string) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        ספרו לנו על הילדים כדי שנתאים סיפורים בדיוק בשבילם
      </p>

      {children.map((child, i) => (
        <div
          key={i}
          className="relative rounded-xl border border-border bg-muted/30 p-4 space-y-3"
        >
          {/* Remove button (show only if more than 1) */}
          {children.length > 1 && (
            <button
              type="button"
              onClick={() => removeChild(i)}
              className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              aria-label="הסר ילד"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          <div className="space-y-2">
            <Label htmlFor={`child-name-${i}`}>שם הילד/ה</Label>
            <Input
              id={`child-name-${i}`}
              type="text"
              placeholder="שם פרטי"
              className="h-12 rounded-xl text-base"
              value={child.name}
              onChange={(e) => updateChild(i, "name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>קבוצת גיל</Label>
            <Select
              value={child.ageGroup}
              onValueChange={(v) => updateChild(i, "ageGroup", v as string)}
            >
              <SelectTrigger className="h-12 w-full rounded-xl text-base">
                <SelectValue placeholder="בחרו גיל" />
              </SelectTrigger>
              <SelectContent>
                {AGE_GROUPS.map((ag) => (
                  <SelectItem key={ag.value} value={ag.value}>
                    גילאי {ag.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}

      {children.length < MAX_CHILDREN && (
        <Button
          variant="outline"
          className="h-12 w-full rounded-xl text-base"
          onClick={addChild}
        >
          <Plus className="h-4 w-4" />
          הוסף ילד/ה
        </Button>
      )}
    </div>
  )
}

/* ── Step 3: Plan selection ── */

function Step3({
  plan,
  setPlan,
}: {
  plan: Plan
  setPlan: (v: Plan) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        בחרו את התוכנית שמתאימה לכם
      </p>

      {/* Monthly */}
      <button
        type="button"
        onClick={() => setPlan("monthly")}
        className={`relative w-full rounded-2xl border-2 p-5 text-right transition-all ${
          plan === "monthly"
            ? "border-primary bg-primary/5 shadow-md"
            : "border-border hover:border-primary/30"
        }`}
      >
        {plan === "monthly" && (
          <div className="absolute top-4 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-3.5 w-3.5" />
          </div>
        )}
        <h3 className="text-lg font-bold text-foreground">חודשי</h3>
        <p className="text-xs text-muted-foreground mb-2">גמישות מלאה</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-foreground">
            ₪49.90
          </span>
          <span className="text-sm text-muted-foreground">/חודש</span>
        </div>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <Sparkles className="h-3 w-3" />
          ₪5 בחודש הראשון!
        </div>
      </button>

      {/* Annual */}
      <button
        type="button"
        onClick={() => setPlan("annual")}
        className={`relative w-full rounded-2xl border-2 p-5 text-right transition-all ${
          plan === "annual"
            ? "border-primary bg-primary/5 shadow-md"
            : "border-border hover:border-primary/30"
        }`}
      >
        <Badge className="absolute -top-3 right-5 bg-primary text-primary-foreground px-2.5 text-xs">
          חיסכון ₪120
        </Badge>
        {plan === "annual" && (
          <div className="absolute top-4 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-3.5 w-3.5" />
          </div>
        )}
        <h3 className="text-lg font-bold text-foreground">שנתי</h3>
        <p className="text-xs text-muted-foreground mb-2">הכי משתלם</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-foreground">
            ₪39.90
          </span>
          <span className="text-sm text-muted-foreground">/חודש</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          ₪478.80 לשנה (במקום ₪598.80)
        </p>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <Sparkles className="h-3 w-3" />
          ₪5 בחודש הראשון!
        </div>
      </button>

      {/* Features list */}
      <ul className="mt-2 space-y-2">
        {FEATURES.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-foreground"
          >
            <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
