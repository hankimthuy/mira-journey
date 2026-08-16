import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import TimeMachineGif from "@/components/TimeMachineGif";
import TimeRail from "@/components/TimeRail";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 5);
  const categoryCounts = Object.fromEntries(
    categories.map((c) => [c.slug, posts.filter((p) => p.category === c.slug).length])
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <section className="mb-16 grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <div className="animate-reveal-focus">
          <p className="text-lg font-semibold tracking-wide text-ochre mb-3">
            Chào mừng đến với
          </p>
          <p className="font-serif italic text-2xl sm:text-3xl text-forest-deep mb-3">
            Cỗ Máy Thời Gian
          </p>
          <h1 className="font-serif italic font-semibold text-4xl sm:text-[50px] text-forest-deep leading-[1.12] mb-4">
            Có những điều chỉ hiểu được khi mình nhìn lại.
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
            Ghé lại hay đi tiếp?
          </Link>
        </div>
        <div className="brass-glow relative animate-reveal-focus" style={{ animationDelay: "0.15s" }}>
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="animate-dial-turn pointer-events-none absolute -right-5 -top-5 h-28 w-28 text-ochre-light opacity-35"
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
        <p className="text-sm text-ink/70 mb-4">
          Mỗi trạm dừng, một điều để nhìn lại và hiểu thêm một chút.
        </p>
        <TimeRail />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`ticket-accent-${i % 3} group animate-reveal-settle flex items-stretch overflow-hidden rounded-[3px] border border-forest/15 bg-cream text-left transition-all duration-300 hover:border-terracotta/50 hover:shadow-md hover:-translate-y-1 hover:rotate-[-0.4deg]`}
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <span className="ticket-stub" aria-hidden="true" />
              <span className="ticket-divider" aria-hidden="true">
                <span className="ticket-notch ticket-notch-top" />
                <span className="ticket-notch ticket-notch-bottom" />
              </span>
              <span className="min-w-0 flex-1 px-3 py-4">
                <p className="mb-1 flex items-center gap-1.5 font-serif italic font-semibold text-[15px] text-forest-deep">
                  {c.name}
                  <span className="text-terracotta opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    →
                  </span>
                </p>
                <p className="text-[11px] leading-relaxed text-ink/70">{c.tagline}</p>
                <p className="mt-1.5 text-[11px] text-ink/50">
                  {categoryCounts[c.slug] ?? 0} bài viết
                </p>
              </span>
            </Link>
          ))}
        </div>
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
                  className="animate-reveal-focus grid grid-cols-[120px_1fr] gap-5 py-[18px] border-b border-forest/15 items-center transition-colors hover:bg-paper/60"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <p className="text-xs font-bold text-forest-deep m-0">
                    {formatDate(post.date)}
                  </p>
                  <div>
                    {category && (
                      <span className="text-[11px] font-bold uppercase tracking-wide text-ochre">
                        {category.name}
                      </span>
                    )}
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
    </div>
  );
}
