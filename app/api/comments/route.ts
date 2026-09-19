import { NextResponse, after } from "next/server";
import { getPostBySlug } from "@/lib/posts";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getClientIp, hashIp, countRecentByIp, COMMENT_RATE_LIMIT } from "@/lib/spam";
import { checkContent } from "@/lib/moderation/keywords";
import { notifyNewComment } from "@/lib/notifyComment";
import { SITE_URL } from "@/lib/seo";

const MIN_SUBMIT_MS = 3000;

export async function POST(request: Request) {
  let body: {
    postSlug?: unknown;
    clientId?: unknown;
    authorName?: unknown;
    content?: unknown;
    website?: unknown; // honeypot — must stay empty
    renderedAt?: unknown; // client timestamp, ms since epoch
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ." }, { status: 400 });
  }

  // Honeypot tripped: fake success so bots don't learn the field is a trap.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const renderedAt = typeof body.renderedAt === "number" ? body.renderedAt : 0;
  if (!renderedAt || Date.now() - renderedAt < MIN_SUBMIT_MS) {
    return NextResponse.json(
      { error: "Bạn gửi hơi nhanh, thử lại sau vài giây nhé." },
      { status: 400 }
    );
  }

  const postSlug = typeof body.postSlug === "string" ? body.postSlug : "";
  const clientId = typeof body.clientId === "string" ? body.clientId : "";
  const authorNameRaw = typeof body.authorName === "string" ? body.authorName.trim() : "";
  const authorName = authorNameRaw || "Ẩn danh";
  const content = typeof body.content === "string" ? body.content.trim() : "";

  if (!postSlug || !clientId) {
    return NextResponse.json({ error: "Thiếu postSlug/clientId." }, { status: 400 });
  }
  if (authorName.length > 80) {
    return NextResponse.json({ error: "Tên quá dài." }, { status: 400 });
  }
  if (content.length < 1 || content.length > 2000) {
    return NextResponse.json({ error: "Nội dung bình luận không hợp lệ." }, { status: 400 });
  }

  const post = await getPostBySlug(postSlug);
  if (!post) {
    return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });
  }

  const ipHash = hashIp(getClientIp(request));
  const recentCount = await countRecentByIp(
    "post_comments",
    ipHash,
    COMMENT_RATE_LIMIT.windowMinutes
  );
  if (recentCount >= COMMENT_RATE_LIMIT.max) {
    return NextResponse.json(
      { error: "Bạn bình luận hơi nhiều, thử lại sau nhé." },
      { status: 429 }
    );
  }

  const { flagged, reason } = checkContent(content, authorName);

  const { data, error } = await supabaseAdmin
    .from("post_comments")
    .insert({
      post_slug: postSlug,
      author_name: authorName,
      content,
      client_id: clientId,
      ip_hash: ipHash,
      flagged,
      flag_reason: reason ?? null,
    })
    .select("id, post_slug, author_name, content, created_at")
    .single();

  if (error || !data) {
    console.error("[api/comments] insert failed:", error?.message);
    return NextResponse.json({ error: "Có lỗi xảy ra, thử lại sau." }, { status: 500 });
  }

  after(() =>
    notifyNewComment({
      postSlug: post.slug,
      postTitle: post.title,
      authorName,
      content,
      commentUrl: `${SITE_URL}/blog/${post.slug}#comment-${data.id}`,
    })
  );

  return NextResponse.json({
    id: data.id,
    postSlug: data.post_slug,
    authorName: data.author_name,
    content: data.content,
    createdAt: data.created_at,
  });
}
