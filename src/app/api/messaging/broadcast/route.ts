import { sendMessage, sendFileByUrl } from "@/lib/greenapi/client";

interface BroadcastRequest {
  recipients: string[];
  message: string;
  type: "text" | "file";
  fileUrl?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BroadcastRequest;

    if (!body.recipients?.length || !body.message) {
      return Response.json(
        { error: "Missing required fields: recipients (non-empty array), message" },
        { status: 400 }
      );
    }

    if (body.type === "file" && !body.fileUrl) {
      return Response.json(
        { error: "fileUrl is required when type is 'file'" },
        { status: 400 }
      );
    }

    let sent = 0;
    let failed = 0;

    for (let i = 0; i < body.recipients.length; i++) {
      const recipient = body.recipients[i];

      try {
        if (body.type === "file" && body.fileUrl) {
          await sendFileByUrl(recipient, body.fileUrl, body.message);
        } else {
          await sendMessage(recipient, body.message);
        }
        sent++;
      } catch (error) {
        console.error(`[Broadcast] Failed to send to ${recipient}:`, error);
        failed++;
      }

      // Rate limiting: 1s delay between sends (skip after last)
      if (i < body.recipients.length - 1) {
        await sleep(1000);
      }
    }

    return Response.json({ sent, failed });
  } catch (error) {
    console.error("[API] /api/messaging/broadcast error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
