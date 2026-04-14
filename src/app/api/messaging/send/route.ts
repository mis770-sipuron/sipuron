import { sendMessage, sendFileByUrl } from "@/lib/greenapi/client";

interface SendRequest {
  to: string;
  message: string;
  type: "text" | "file";
  fileUrl?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendRequest;

    if (!body.to || !body.message) {
      return Response.json(
        { error: "Missing required fields: to, message" },
        { status: 400 }
      );
    }

    if (body.type === "file") {
      if (!body.fileUrl) {
        return Response.json(
          { error: "fileUrl is required when type is 'file'" },
          { status: 400 }
        );
      }

      const result = await sendFileByUrl(body.to, body.fileUrl, body.message);
      return Response.json(result);
    }

    const result = await sendMessage(body.to, body.message);
    return Response.json(result);
  } catch (error) {
    console.error("[API] /api/messaging/send error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
