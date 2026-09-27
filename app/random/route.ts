import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { getAllPlaces } from "@/lib/places";
import { EXPLORE_PATH, isExplorePost } from "@/lib/categories";
import { STATIONS } from "@/lib/stations";
import { randomInt } from "@/lib/draw";

export const dynamic = "force-dynamic";

type Destination = { href: string; title: string; date: string };

// GET /random            → 307 to a random spot on the journey (plain links,
//                          no-JS fallback)
// GET /random?format=json → { href, title, date } for the header's warp
//                           animation, which lands on the destination's date.
// ?from=<pathname> keeps the warp from landing where the reader already is.
//
// Every station is equally likely; the spot inside it is then picked at
// random (a post, a stamped place, or the station page itself), so a station
// with many entries doesn't swallow the others.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = normalizeFrom(url.searchParams.get("from"));
  const wantsJson = url.searchParams.get("format") === "json";
  const [posts, places] = await Promise.all([getAllPosts(), getAllPlaces()]);

  // Pages with no date of their own land on today.
  const today = new Date().toISOString().slice(0, 10);
  const stationPage = (href: string): Destination => ({
    href,
    title: STATIONS.find((s) => s.href === href)?.label ?? "",
    date: today,
  });

  const spots: Record<string, Destination[]> = {
    "/blog": posts
      .filter((p) => !isExplorePost(p))
      .map((p) => ({ href: `/blog/${p.slug}`, title: p.title, date: p.date })),
    "/products": [stationPage("/products")],
    [EXPLORE_PATH]: [
      ...places.map((p) => ({
        href: `${EXPLORE_PATH}/${p.slug}`,
        title: p.name,
        date: p.visitedOn ?? today,
      })),
      ...posts
        .filter(isExplorePost)
        .map((p) => ({ href: `/blog/${p.slug}`, title: p.title, date: p.date })),
    ],
    "/aha": [stationPage("/aha")],
    "/about": [stationPage("/about")],
  };

  const stations = STATIONS.map((s) => {
    const list = spots[s.href] ?? [];
    // Empty station (e.g. no posts yet): its own page is still a place to land.
    const all = list.length > 0 ? list : [stationPage(s.href)];
    return all.filter((d) => d.href !== from);
  }).filter((list) => list.length > 0);

  const pool = stations[randomInt(stations.length)];
  const dest = pool[randomInt(pool.length)];

  const res = wantsJson
    ? NextResponse.json(dest)
    : NextResponse.redirect(new URL(dest.href, request.url), 307);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

// `from` is the current pathname. A bare slug (older links) means a post.
function normalizeFrom(from: string | null): string {
  if (!from) return "";
  const path = from.startsWith("/") ? from : `/blog/${from}`;
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}
