import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAllPocs, POC_STATUS } from "@/lib/pocs";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import TimeMachineGif from "@/components/TimeMachineGif";
import TimeRail from "@/components/TimeRail";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, pocs] = await Promise.all([getAllPosts(), getAllPocs()]);
  const latestPosts = posts.slice(0, 5);

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
        {/* One row per category, not a grid — 2 columns left an orphan card
            alone on its own row with 5 items. Padding stays tight so each
            row reads as a long thin ticket instead of a tall block. */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2.5">
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
              <span className="min-w-0 flex-1 px-3 py-2.5">
                <p className="mb-0.5 flex items-center gap-1.5 font-serif italic font-semibold text-[15px] text-forest-deep">
                  {c.name}
                  <span className="text-terracotta opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    →
                  </span>
                </p>
                <p className="text-[11px] leading-relaxed text-ink/70">{c.tagline}</p>
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
          <div className="mb-1.5 flex items-center justify-between gap-4">
            {/* No `uppercase` here — it would flatten "PoC" into "POC". Same
                heading treatment as "Những trạm dừng" above, not the small
                eyebrow style — the two sections read as peers now. */}
            <h2 className="font-serif italic text-2xl text-forest-deep">
              Trạm PoC
            </h2>
            <Link
              href="/poc"
              className="text-sm font-bold text-terracotta hover:underline"
            >
              Xem tất cả {pocs.length} PoC →
            </Link>
          </div>
          <p className="text-sm text-ink/70 mb-4">
            Nơi những ý tưởng thành sản phẩm.
          </p>
          {/* Same ticket-stub shell as the category rows above — a flat
              emoji-and-label pill didn't carry any of the "shelf of
              PoC" character the actual /poc cards have. One row on
              mobile so the tile, name, and stamp all get room to breathe. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {pocs.slice(0, 4).map((poc, i) => {
              const status = POC_STATUS[poc.status];
              const tagline = poc.tagline.replace(/\*\*/g, "");
              return (
                <Link
                  key={poc.id}
                  href="/poc"
                  className={`poc-card ticket-accent-${status.accent} group animate-reveal-settle relative flex items-stretch overflow-hidden rounded-[3px] border border-forest/15 bg-cream transition-all duration-300 hover:border-terracotta/50 hover:shadow-md hover:-translate-y-1 hover:rotate-[-0.4deg]`}
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <span className="ticket-stub" aria-hidden="true" />
                  <span className="ticket-divider" aria-hidden="true">
                    <span className="ticket-notch ticket-notch-top" />
                    <span className="ticket-notch ticket-notch-bottom" />
                  </span>
                  <span className="relative z-[1] min-w-0 flex-1 px-3 py-2.5">
                    <span className="mb-1 flex items-center gap-2">
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-[4px] border border-forest/12 bg-gradient-to-br from-paper to-ochre-light/45 text-base"
                        aria-hidden="true"
                      >
                        {poc.emoji || "◍"}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-serif text-[13px] font-semibold italic text-forest-deep">
                        {poc.name}
                      </span>
                    </span>
                    {tagline && (
                      <span className="mb-1.5 block truncate text-[11px] text-ink/60">
                        {tagline}
                      </span>
                    )}
                    <span className="poc-stamp inline-block origin-left scale-[0.72]">
                      {status.stamp}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
