import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

// GET /random            → 307 to a random post (plain links, no-JS fallback)
// GET /random?format=json → { slug, title, date } for the header's warp
//                           animation, which lands on the destination's date.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const wantsJson = url.searchParams.get("format") === "json";
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return wantsJson
      ? NextResponse.json({ error: "no posts" }, { status: 404 })
      : NextResponse.redirect(new URL("/blog", request.url));
  }

  // Don't "jump" to the post the reader is already on.
  const candidates = posts.length > 1 ? posts.filter((p) => p.slug !== from) : posts;
  const post = candidates[Math.floor(Math.random() * candidates.length)];

  const res = wantsJson
    ? NextResponse.json({ slug: post.slug, title: post.title, date: post.date })
    : NextResponse.redirect(new URL(`/blog/${post.slug}`, request.url), 307);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
