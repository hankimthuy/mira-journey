import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getClientIp, hashIp, countRecentByIp, LIKE_RATE_LIMIT } from "@/lib/spam";

const POSTGRES_UNIQUE_VIOLATION = "23505";

export async function POST(request: Request) {
  let body: { postSlug?: unknown; clientId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ." }, { status: 400 });
  }

  const postSlug = typeof body.postSlug === "string" ? body.postSlug : "";
  const clientId = typeof body.clientId === "string" ? body.clientId : "";
  if (!postSlug || !clientId) {
    return NextResponse.json({ error: "Thiếu postSlug/clientId." }, { status: 400 });
  }

  const post = await getPostBySlug(postSlug);
  if (!post) {
    return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });
  }

  const ipHash = hashIp(getClientIp(request));
  const recentCount = await countRecentByIp(
    "post_likes",
    ipHash,
    LIKE_RATE_LIMIT.windowMinutes
  );
  if (recentCount >= LIKE_RATE_LIMIT.max) {
    return NextResponse.json(
      { error: "Bạn thao tác hơi nhanh, thử lại sau nhé." },
      { status: 429 }
    );
  }

  const { error } = await supabaseAdmin
    .from("post_likes")
    .insert({ post_slug: postSlug, client_id: clientId, ip_hash: ipHash });

  if (error) {
    if (error.code === POSTGRES_UNIQUE_VIOLATION) {
      // Already liked by this client — treat a replay as success, not an error.
      return NextResponse.json({ liked: true, alreadyLiked: true });
    }
    console.error("[api/likes] insert failed:", error.message);
    return NextResponse.json({ error: "Có lỗi xảy ra, thử lại sau." }, { status: 500 });
  }

  return NextResponse.json({ liked: true, alreadyLiked: false });
}
