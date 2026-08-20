import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAllPocs, POC_STATUS, splitTagline } from "@/lib/pocs";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import TimeMachineGif from "@/components/TimeMachineGif";
import TimeRail from "@/components/TimeRail";

export const revalidate = 60;

/**
 * A hand-picked 4, not "however sorts first" — the home page is a teaser,
 * and these are the ones worth a stranger's first look. Matched by name
 * rather than id since nothing else on the home page depends on a specific
 * PoC's identity; if one gets renamed in the CMS it just quietly drops out
 * instead of breaking the page.
 */
const HOME_FEATURED_POCS = ["Aura Self AI", "Portfolio", "AI PT Chat", "Content Studio"];

export default async function HomePage() {
  const [posts, pocs] = await Promise.all([getAllPosts(), getAllPocs()]);
  const latestPosts = posts.slice(0, 5);
  const featuredPocs = HOME_FEATURED_POCS.map((name) =>
    pocs.find((p) => p.name === name)
  ).filter((p): p is (typeof pocs)[number] => Boolean(p));

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

      {featuredPocs.length > 0 && (
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
              className="shrink-0 text-sm font-bold text-terracotta hover:underline"
            >
              Ghé trạm →
            </Link>
          </div>
          <p className="text-sm text-ink/70 mb-4">
            Nơi những ý tưởng thành sản phẩm.
          </p>
          {/* Specimen index card, not a ticket — a punch-hole at the left
              edge, like something filed in a workshop archive drawer.
              Deliberately not the ticket-stub shell used for blog
              categories above; PoC needed its own silhouette. No
              "Specimen № N" label — four repeats of the same word next to
              a number nobody reads was noise, not information. Weight
              carries the hierarchy: the name is the only bold line.

              Every card is a flex column with the footer pinned via
              mt-auto, and the hook clamps to 2 lines — without both, one
              long hook (AI PT Chat's) stretches its card and every stamp
              in the row lands at a different height, a visible stagger as
              your eye moves across.

              The name links to /poc, not the live product — a 2-line
              clamp always leaves the hook cut off, and the full
              pain-point/story only exist on the /poc card, so "read more"
              has to go there. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredPocs.map((poc, i) => {
              const status = POC_STATUS[poc.status];
              return (
                <div
                  key={poc.id}
                  className={`specimen-card ticket-accent-${status.accent} animate-reveal-settle relative flex h-full flex-col rounded-[3px] border border-forest/15 bg-cream pb-3.5 pl-8 pr-4 pt-4 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/50 hover:shadow-md`}
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <span className="specimen-hole" aria-hidden="true" />
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="min-w-0 truncate font-serif text-[17px] font-semibold italic text-forest-deep">
                      <Link
                        href="/poc"
                        className="after:absolute after:inset-0 hover:text-terracotta"
                      >
                        {poc.name}
                      </Link>
                    </span>
                    {poc.yearLabel && (
                      <span className="shrink-0 text-[10px] font-medium text-ink/40">
                        {poc.yearLabel}
                      </span>
                    )}
                  </span>
                  {poc.tagline && (
                    <span className="mt-2 line-clamp-2 text-[13.5px] font-normal leading-relaxed text-ink/70">
                      {splitTagline(poc.tagline).map((part, j) =>
                        part.mark ? (
                          <span
                            key={j}
                            className="font-semibold text-forest-deep bg-ochre-light/45 px-0.5"
                          >
                            {part.text}
                          </span>
                        ) : (
                          <span key={j}>{part.text}</span>
                        )
                      )}
                    </span>
                  )}
                  <span className="mt-auto flex items-center justify-between gap-2 border-t border-dashed border-forest/15 pt-2.5">
                    <span className="poc-stamp inline-block origin-left scale-[0.72]">
                      {status.stamp}
                    </span>
                    <span className="text-[10.5px] font-semibold text-terracotta">
                      Đọc tiếp →
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
