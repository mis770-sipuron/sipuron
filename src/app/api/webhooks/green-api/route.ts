import type { GreenApiWebhook } from "@/lib/greenapi/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GreenApiWebhook;

    const { typeWebhook, timestamp } = body;
    const senderData = body.body?.senderData;
    const messageData = body.body?.messageData;

    console.log(`[GreenAPI Webhook] type=${typeWebhook} timestamp=${timestamp}`);

    if (senderData) {
      console.log(
        `[GreenAPI Webhook] from=${senderData.sender} name=${senderData.senderName} chat=${senderData.chatId}`
      );
    }

    if (messageData) {
      const textContent =
        messageData.textMessageData?.textMessage ??
        messageData.extendedTextMessageData?.text ??
        messageData.fileMessageData?.caption ??
        null;

      console.log(
        `[GreenAPI Webhook] messageType=${messageData.typeMessage} text=${textContent ?? "(no text)"}`
      );
    }

    // Bot engine processing will be added here later

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[GreenAPI Webhook] Error processing webhook:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Webhook processing error" },
      { status: 500 }
    );
  }
}
