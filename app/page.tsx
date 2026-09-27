import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAllPocs } from "@/lib/pocs";
import { getAllPlaces } from "@/lib/places";
import {
  EXPLORE_PATH,
  categories,
  exploreStation,
  getCategoryBySlug,
  isExplorePost,
} from "@/lib/categories";
import { formatDate } from "@/lib/format";
import TimeMachineGif from "@/components/TimeMachineGif";
import TimeRail from "@/components/TimeRail";
import { StageDot } from "@/components/ProductRail";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, pocs, places] = await Promise.all([
    getAllPosts(),
    getAllPocs(),
    getAllPlaces(),
  ]);
  const stampCount = places.filter((p) => !p.isHome).length;
  // The travel series has its own station; it gets a teaser, not a spot in
  // the post timeline.
  const timeline = posts.filter((p) => !isExplorePost(p));
  const latestTrip = posts.find(isExplorePost);
  const latestPosts = timeline.slice(0, 5);
  const categoryCounts: Record<string, number> = Object.fromEntries(
    categories.map((c) => [c.slug, timeline.filter((p) => p.category === c.slug).length])
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 overflow-x-hidden">
      <section className="mb-16 grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <div className="animate-reveal-focus">
          <p className="text-lg font-semibold tracking-wide text-ochre mb-3">
            Chào mừng đến với
          </p>
          <p className="font-serif italic text-2xl sm:text-3xl text-forest-deep mb-3">
            Cỗ Máy Thời Gian
          </p>
          <h1 className="font-serif italic font-semibold text-3xl sm:text-[40px] lg:text-[44px] text-forest-deep leading-[1.08] mb-4">
            Nhìn lại những gì đã đi qua, để mang theo điều có ý nghĩa nhất.
          </h1>
          <p className="text-lg text-ink/85 leading-relaxed max-w-xl mb-6">
            Những điều mình học, những điều khiến mình{" "}
            <span className="font-semibold text-terracotta">tò mò</span>, và những cuộc gặp
            gỡ trên đường đi.
          </p>
          <Link
            href="/blog"
            className="cta-rewind inline-block font-serif italic text-lg font-medium text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta/60 focus-visible:outline-offset-4"
          >
            Bạn muốn ghé lại, hay đi tiếp?
          </Link>
        </div>
        <div className="brass-glow relative animate-reveal-focus" style={{ animationDelay: "0.15s" }}>
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="animate-dial-turn pointer-events-none absolute -right-2 -top-2 h-16 w-16 text-ochre-light opacity-35 sm:-right-5 sm:-top-5 sm:h-28 sm:w-28"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </svg>
          <TimeMachineGif className="w-full max-w-xs mx-auto md:max-w-none" />
          <p className="mt-2 text-right font-serif italic text-sm text-[#465B52]">
            — Hàn Kim Thủy
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-serif italic text-2xl text-forest-deep mb-1.5">
          Những trạm dừng
        </h2>
        <p className="text-sm text-ink/70 mb-6">
          Mỗi trạm dừng, một điều để nhìn lại và hiểu thêm một chút.
        </p>
        {/* One continuous route instead of a row of boxed tickets: a dot per
            station on the track, the words hanging underneath. Vertical on
            mobile (same rail language as /products), horizontal from lg:. */}
        <div className="relative">
          <TimeRail />
          <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-5">
            <span
              className="product-rail-line absolute bottom-2 left-[6px] top-2 w-[2px] lg:hidden"
              aria-hidden="true"
            />
            {categories.map((c, i) => (
              <li
                key={c.slug}
                className="animate-reveal-settle"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <Link
                  href={`/category/${c.slug}`}
                  className="group relative block pl-8 lg:pl-0 lg:pt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60"
                >
                  <span
                    className="station-dot absolute left-0 top-[3px] size-3.5 rounded-full border-2 border-forest-deep bg-cream transition-colors group-hover:border-terracotta group-hover:bg-terracotta lg:top-0"
                    aria-hidden="true"
                  />
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-ochre">
                    Trạm {i + 1}
                    {categoryCounts[c.slug] > 0 && (
                      <span className="text-ink/45"> · {categoryCounts[c.slug]} bài</span>
                    )}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 font-serif text-lg font-semibold italic text-forest-deep transition-colors group-hover:text-terracotta">
                    {c.name}
                    <span
                      className="text-terracotta opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink/70">
                    {c.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 border-t border-dashed border-forest/20 pt-5 font-serif text-lg italic text-forest-deep">
          Muốn rẽ khỏi đường ray một chút?{" "}
          <Link href={EXPLORE_PATH} className="font-semibold text-terracotta hover:underline">
            Ghé {exploreStation.name.toLowerCase()} →
          </Link>
          {stampCount > 0 && (
            <span className="font-sans text-[13px] not-italic text-ink/60">
              {" "}· {stampCount} con dấu trong hộ chiếu
            </span>
          )}
          {latestTrip && (
            <span className="mt-1 block font-sans text-[13px] not-italic text-ink/60">
              Chuyến gần nhất:{" "}
              <Link href={`/blog/${latestTrip.slug}`} className="hover:text-terracotta">
                {latestTrip.title}
              </Link>
            </span>
          )}
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-forest/70">
            Bài viết mới nhất
          </h2>
          <Link href="/blog" className="text-sm text-terracotta font-bold hover:underline">
            Xem tất cả →
          </Link>
        </div>
        {latestPosts.length === 0 ? (
          <p className="text-forest/70">Chưa có bài viết nào. Sắp có rồi.</p>
        ) : (
          <div>
            {latestPosts.map((post, i) => {
              const category = getCategoryBySlug(post.category);
              return (
                <div
                  key={post.slug}
                  className="animate-reveal-focus flex flex-col py-[18px] border-b border-forest/15 transition-colors hover:bg-paper/60 sm:grid sm:grid-cols-[120px_1fr] sm:items-center sm:gap-5"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  {/* The date column only exists from sm: up. On mobile it was
                      eating a fixed third of the width from the title — the
                      part people actually scan — so it moves inline next to
                      the category instead, small and de-emphasized. */}
                  <p className="hidden text-xs font-bold text-forest-deep m-0 sm:block">
                    {formatDate(post.date)}
                  </p>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-1.5">
                      {category && (
                        <span className="text-[11px] font-bold uppercase tracking-wide text-ochre">
                          {category.name}
                        </span>
                      )}
                      <span className="text-[11px] text-ink/45 sm:hidden">
                        {category ? `· ${formatDate(post.date)}` : formatDate(post.date)}
                      </span>
                    </div>
                    <p className="font-serif font-semibold text-xl text-forest-deep mt-1">
                      <Link href={`/blog/${post.slug}`} className="hover:text-terracotta">
                        {post.title}
                      </Link>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {pocs.length > 0 && (
        <section className="mt-16">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="font-serif italic text-2xl text-forest-deep">
              Trạm chế tạo
            </h2>
            <Link
              href="/products"
              className="shrink-0 text-sm font-bold text-terracotta hover:underline"
            >
              Ghé xưởng →
            </Link>
          </div>
          {/* Just the names, one line that wraps — a teaser for /products,
              not a second copy of it. The dot is the stage (hollow PoC, half
              MVP, solid Live), explained by the legend over there; it also does
              the separating, so no "·" that could wrap to a line start. */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-serif italic text-base sm:text-lg text-forest-deep">
            {pocs.map((poc) => (
              <li key={poc.id}>
                <Link
                  href={`/products#${poc.id}`}
                  className="inline-flex items-center gap-1.5 hover:text-terracotta"
                >
                  <StageDot stage={poc.stage} className="size-2.5" />
                  {poc.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
