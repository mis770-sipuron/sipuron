import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/links/:id — Single link details + click count.
 * PUT /api/links/:id — Update link (title, tags, is_active).
 * DELETE /api/links/:id — Soft-delete (set is_active=false).
 */

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("short_links")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return Response.json({ error: "Link not found" }, { status: 404 });
    }

    return Response.json({ link: data });
  } catch (err) {
    console.error(`[API] GET /api/links/${id} error:`, err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { title, tags, is_active } = body as {
      title?: string;
      tags?: string[];
      is_active?: boolean;
    };

    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title;
    if (tags !== undefined) updates.tags = tags;
    if (is_active !== undefined) updates.is_active = is_active;

    if (Object.keys(updates).length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("short_links")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return Response.json({ error: "Link not found" }, { status: 404 });
    }

    return Response.json({ link: data });
  } catch (err) {
    console.error(`[API] PUT /api/links/${id} error:`, err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("short_links")
      .update({ is_active: false })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return Response.json({ error: "Link not found" }, { status: 404 });
    }

    return Response.json({ link: data });
  } catch (err) {
    console.error(`[API] DELETE /api/links/${id} error:`, err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
