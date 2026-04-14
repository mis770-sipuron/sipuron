import { getGroups, createGroup } from "@/lib/greenapi/client";

export async function GET() {
  try {
    const groups = await getGroups();
    return Response.json(groups);
  } catch (error) {
    console.error("[API] /api/groups GET error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

interface CreateGroupRequest {
  name: string;
  participants: string[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateGroupRequest;

    if (!body.name || !body.participants?.length) {
      return Response.json(
        { error: "Missing required fields: name, participants (non-empty array)" },
        { status: 400 }
      );
    }

    const result = await createGroup(body.name, body.participants);
    return Response.json(result);
  } catch (error) {
    console.error("[API] /api/groups POST error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
