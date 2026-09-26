import { NextResponse } from "next/server";
import { getAllPostSlugs } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const slugs = await getAllPostSlugs();

  if (slugs.length === 0) {
    return NextResponse.redirect(new URL("/blog", request.url));
  }

  // Don't "jump" to the post the reader is already on.
  const candidates = slugs.length > 1 ? slugs.filter((s) => s !== from) : slugs;
  const slug = candidates[Math.floor(Math.random() * candidates.length)];

  const res = NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 307);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
