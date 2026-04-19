import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    console.log("[Cardcom Webhook] Received:", JSON.stringify(data))

    const dealResponse = data.DealResponse || data.dealResponse
    const transactionId = data.InternalDealNumber || data.internalDealNumber
    const amount = data.Amount || data.amount
    const cardOwnerName = data.CardOwnerName || data.cardOwnerName || ""
    const returnValue = data.ReturnValue || data.returnValue || "{}"

    let meta: { plan?: string; email?: string; phone?: string } = {}
    try {
      meta = JSON.parse(returnValue)
    } catch {}

    const supabase = await createClient()

    if (dealResponse === "0") {
      // Payment successful
      console.log("[Cardcom Webhook] Payment success:", transactionId, amount)

      // Find user by phone or email
      let userId: string | null = null
      if (meta.phone) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("phone", meta.phone)
          .single()
        userId = profile?.id ?? null
      }
      if (!userId && meta.email) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", meta.email)
          .single()
        userId = profile?.id ?? null
      }

      if (userId) {
        // Find plan
        const planSlug = meta.plan === "annual" ? "annual" : "monthly"
        const { data: plan } = await supabase
          .from("plans")
          .select("id, price_monthly")
          .eq("slug", planSlug)
          .single()

        // Create subscription
        if (plan) {
          await supabase.from("subscriptions").insert({
            user_id: userId,
            plan_id: plan.id,
            status: "trial",
            cardcom_transaction_id: transactionId,
            amount: parseFloat(amount || "5"),
            start_date: new Date().toISOString(),
            next_billing_date: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
          })
        }

        // Create payment record
        await supabase.from("payments").insert({
          user_id: userId,
          amount: parseFloat(amount || "5"),
          status: "success",
          cardcom_transaction_id: transactionId,
          cardcom_response: data,
        })

        // Update profile status
        await supabase
          .from("profiles")
          .update({ subscription_status: "trial" })
          .eq("id", userId)
      }
    } else {
      // Payment failed
      console.log("[Cardcom Webhook] Payment failed:", dealResponse, data)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[Cardcom Webhook] Error:", error)
    return NextResponse.json({ ok: true }) // Always return 200 to Cardcom
  }
}
