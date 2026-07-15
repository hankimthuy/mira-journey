import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import TimeMachineGif from "@/components/TimeMachineGif";
import TimeRail from "@/components/TimeRail";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="mb-16 grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-3">
            Han Kim Thuy
          </p>
          <h1 className="font-serif italic font-semibold text-4xl sm:text-[50px] text-forest-deep leading-[1.12] mb-4">
            Cỗ Máy Thời Gian
          </h1>
          <p className="text-lg text-ink/85 leading-relaxed max-w-xl">
            Nơi dòng thời gian đi qua được ghi chép lại.
          </p>
          <p className="text-lg text-ink/85 leading-relaxed max-w-xl mt-3">
            Trên cỗ máy luôn chuyển động này, thỉnh thoảng mình lại chọn một dấu mốc để dừng chân — lưu lại một sự tò mò, một cuộc gặp gỡ hữu duyên, rồi lại tiếp tục hành trình.
          </p>
        </div>
        <TimeMachineGif className="w-full max-w-xs mx-auto md:max-w-none" />
      </section>

      <section className="mb-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-forest/70 mb-4">
          Chủ đề
        </h2>
        <TimeRail />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group rounded-[3px] border border-forest/15 bg-cream px-4 py-5 text-left transition-all hover:border-terracotta/50 hover:shadow-sm hover:-translate-y-0.5"
            >
              <p className="font-serif italic font-semibold text-lg text-forest-deep mb-1.5 flex items-center gap-1.5">
                {c.name}
                <span className="text-terracotta opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </p>
              <p className="text-[12px] leading-relaxed text-ink/70">{c.tagline}</p>
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
            {latestPosts.map((post) => {
              const category = getCategoryBySlug(post.category);
              return (
                <div
                  key={post.slug}
                  className="grid grid-cols-[120px_1fr] gap-5 py-[18px] border-b border-forest/15 items-center"
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
