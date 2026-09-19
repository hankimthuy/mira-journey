import { NextResponse } from "next/server";
import { getAllPostSlugs } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const slugs = await getAllPostSlugs();

  if (slugs.length === 0) {
    return NextResponse.redirect(new URL("/blog", request.url));
  }

  const slug = slugs[Math.floor(Math.random() * slugs.length)];
  return NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 307);
}
