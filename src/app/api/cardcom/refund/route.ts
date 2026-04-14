import { type NextRequest } from "next/server";
import { refundTransaction } from "@/lib/cardcom/client";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { transactionId?: string; amount?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.transactionId) {
    return Response.json(
      { error: "Missing required field: transactionId" },
      { status: 400 }
    );
  }

  try {
    const data = await refundTransaction(body.transactionId, body.amount);
    return Response.json(data);
  } catch (error) {
    console.error("[API] /api/cardcom/refund error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
