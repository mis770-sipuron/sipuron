import { NextRequest, NextResponse } from "next/server"

const TERMINAL = process.env.CARDCOM_TERMINAL!
const API_NAME = process.env.CARDCOM_API_NAME!
const API_PASSWORD = process.env.CARDCOM_API_PASSWORD!
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sipuron.vercel.app"

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, plan } = await request.json()

    if (!name || !phone || !email || !plan) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const amount = 5 // Trial price — ₪5 first month
    const description =
      plan === "annual"
        ? "סיפורון — מנוי שנתי (חודש ניסיון ₪5)"
        : "סיפורון — מנוי חודשי (חודש ניסיון ₪5)"

    // Create Cardcom Low Profile payment page
    const params = new URLSearchParams({
      TerminalNumber: TERMINAL,
      ApiName: API_NAME,
      SumToBill: amount.toString(),
      CoinID: "1", // ILS
      Language: "he",
      SuccessRedirectUrl: `${SITE_URL}/welcome?status=success`,
      ErrorRedirectUrl: `${SITE_URL}/checkout?status=failed`,
      WebHookUrl: `${SITE_URL}/api/cardcom/webhook`,
      ProductName: description,
      InvoiceDescription: description,
      IsAutoRecurring: "true",
      RecurringPayments_AutoSum: plan === "annual" ? "39.90" : "49.90",
      ReturnValue: JSON.stringify({ plan, email, phone }),
      CardOwnerName: name,
      CardOwnerEmail: email,
      CardOwnerPhone: phone,
    })

    const response = await fetch(
      "https://secure.cardcom.solutions/Interface/LowProfile.aspx",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    )

    const text = await response.text()

    // Parse response — Cardcom returns key=value pairs separated by ;
    const parsed: Record<string, string> = {}
    text.split(";").forEach((pair) => {
      const [key, ...rest] = pair.split("=")
      if (key) parsed[key.trim()] = rest.join("=").trim()
    })

    if (parsed.ResponseCode !== "0" && parsed.LowProfileCode) {
      // Some terminals return non-zero but still have a code
    }

    const lowProfileCode = parsed.LowProfileCode
    if (!lowProfileCode) {
      console.error("Cardcom LowProfile error:", text)
      return NextResponse.json(
        { error: "Payment setup failed", details: parsed.Description || text },
        { status: 500 }
      )
    }

    const iframeUrl = `https://secure.cardcom.solutions/External/LowProfileClearing.aspx?LowProfileCode=${lowProfileCode}`

    return NextResponse.json({ iframeUrl, lowProfileCode })
  } catch (error) {
    console.error("Create payment error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
