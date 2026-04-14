import { type NextRequest } from "next/server";
import { getTransactions } from "@/lib/cardcom/client";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const from = request.nextUrl.searchParams.get("from");
  const to = request.nextUrl.searchParams.get("to");

  if (!from || !to) {
    return Response.json(
      { error: "Missing required query params: from, to (DDMMYYYY format)" },
      { status: 400 }
    );
  }

  try {
    const data = await getTransactions(from, to);
    return Response.json(data);
  } catch (error) {
    console.error("[API] /api/cardcom/transactions error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
