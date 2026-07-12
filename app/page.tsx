import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import TimeMachineDial from "@/components/TimeMachineDial";

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
            Đây là nơi mình ghi lại quá trình tìm hiểu về sản phẩm, tâm lý
            học, hệ thống — và cả những quan sát đời thường len lỏi vào giữa
            đó. Không theo lịch cố định, bài chỉ xuất hiện khi có điều gì đó
            mình thấy đáng để dừng lại và viết ra.
          </p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/blog"
              className="rounded-[2px] bg-terracotta text-cream px-5 py-3 text-sm font-bold hover:bg-forest-deep transition-colors"
            >
              Đọc tất cả bài viết
            </Link>
            <Link
              href="/about"
              className="rounded-[2px] border border-forest/30 text-forest-deep px-5 py-3 text-sm font-bold hover:bg-paper transition-colors"
            >
              Giới thiệu
            </Link>
          </div>
        </div>
        <TimeMachineDial className="w-full max-w-xs mx-auto md:max-w-none" />
      </section>

      <section className="mb-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-forest/70 mb-4">
          Chủ đề
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-[3px] border border-forest/15 bg-cream text-center px-3.5 py-4"
            >
              <p className="font-serif italic font-semibold text-base text-forest-deep mb-1.5">
                {c.name}
              </p>
              <p className="text-[11px] leading-snug text-ink/70">{c.tagline}</p>
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
