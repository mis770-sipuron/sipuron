import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/links — List all short links (ordered by created_at DESC).
 * POST /api/links — Create a new short link.
 */

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("short_links")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ links: data });
  } catch (err) {
    console.error("[API] GET /api/links error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, title, slug, tags } = body as {
      url: string;
      title?: string;
      slug?: string;
      tags?: string[];
    };

    if (!url) {
      return Response.json({ error: "url is required" }, { status: 400 });
    }

    const finalSlug = slug || generateSlug();

    const supabase = await createClient();

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("short_links")
      .select("id")
      .eq("slug", finalSlug)
      .single();

    if (existing) {
      return Response.json({ error: "Slug already in use" }, { status: 409 });
    }

    const { data, error } = await supabase
      .from("short_links")
      .insert({
        original_url: url,
        slug: finalSlug,
        title: title || null,
        tags: tags || [],
        click_count: 0,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
    const shortUrl = `${baseUrl}/go/${data.slug}`;

    return Response.json({ link: { ...data, short_url: shortUrl } }, { status: 201 });
  } catch (err) {
    console.error("[API] POST /api/links error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

function generateSlug(length = 6): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
