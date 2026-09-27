import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, type PostMeta } from "@/lib/posts";
import { EXPLORE_PATH, exploreStation, isExplorePost } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { getAllPlaces } from "@/lib/places";
import Passport from "@/components/Passport";

export const revalidate = 60;

export const metadata: Metadata = {
  title: exploreStation.name,
  description: exploreStation.tagline,
  alternates: {
    canonical: EXPLORE_PATH,
  },
};

function groupByYear(posts: PostMeta[]) {
  const groups = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()];
}

/**
 * The places visited as a passport of ink stamps (authored in the admin),
 * then the travel series as a travel log: one pin per trip on a dashed
 * route, grouped by year — the same rail language as /products.
 */
export default async function ExplorePage() {
  const [posts, places] = await Promise.all([getAllPosts(), getAllPlaces()]);
  const trips = posts.filter(isExplorePost);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="animate-reveal-focus mb-10 max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-ochre">
          Series đặc biệt
        </p>
        <h1 className="mb-3 font-serif text-3xl font-semibold italic leading-[1.15] text-forest-deep sm:text-[38px]">
          {exploreStation.name}
        </h1>
        <p className="text-lg leading-relaxed text-ink/85">
          Những chuyến đi, những nơi đã ghé qua, và vài điều{" "}
          <span className="font-semibold text-terracotta">học được dọc đường</span>.
        </p>
      </section>

      {places.length > 0 && (
        <section className="animate-reveal-focus mb-16" style={{ animationDelay: "0.1s" }}>
          <Passport places={places} />
        </section>
      )}

      <h2 className="mb-6 font-serif text-2xl font-semibold italic text-forest-deep">
        Nhật ký chuyến đi
      </h2>

      {trips.length === 0 ? (
        <p className="py-12 text-center text-forest/70">
          Hành lý đang được sắp xếp. Chuyến đầu tiên sẽ sớm lên đường.
        </p>
      ) : (
        <div className="relative">
          <div
            className="product-rail-line absolute bottom-2 left-[6px] top-2 w-[2px]"
            aria-hidden="true"
          />
          {groupByYear(trips).map(([year, items]) => (
            <section key={year} className="mb-10 last:mb-0">
              <h3 className="relative mb-5 pl-8 font-serif text-xl italic text-forest/70">
                <span
                  className="absolute left-0 top-1/2 h-[2px] w-3.5 -translate-y-1/2 bg-forest/40"
                  aria-hidden="true"
                />
                {year}
              </h3>
              <ol className="space-y-8">
                {items.map((post) => (
                  <li key={post.slug} className="station-reveal relative pl-8">
                    <span
                      className="absolute left-0 top-[7px] size-3.5 rounded-full border-2 border-terracotta bg-cream"
                      aria-hidden="true"
                    />
                    <p className="text-[12px] text-ink/55">
                      {formatDate(post.date)}
                      {post.readingMinutes > 0 && ` · ${post.readingMinutes} phút đọc`}
                    </p>
                    <h4 className="mt-0.5 font-serif text-xl font-semibold italic text-forest-deep">
                      <Link href={`/blog/${post.slug}`} className="hover:text-terracotta">
                        {post.title}
                      </Link>
                    </h4>
                    {post.description && (
                      <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-ink/80">
                        {post.description}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
