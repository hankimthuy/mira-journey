import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import TimeMachineDial from "@/components/TimeMachineDial";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="mb-16 grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-3">
            Han Kim Thuy
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-deep leading-tight mb-4">
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
              className="rounded-md bg-forest text-cream px-5 py-2.5 text-sm font-semibold hover:bg-forest-deep transition-colors"
            >
              Đọc tất cả bài viết
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-forest/30 text-forest-deep px-5 py-2.5 text-sm font-semibold hover:bg-paper transition-colors"
            >
              Giới thiệu
            </Link>
          </div>
        </div>
        <TimeMachineDial className="w-full max-w-xs mx-auto md:max-w-none" />
      </section>

      <section className="mb-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-forest/70 mb-4">
          Chủ đề
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-lg border border-forest/10 bg-paper/60 p-4 hover:border-ochre transition-colors"
            >
              <p className="text-lg font-bold text-forest-deep">{c.name}</p>
              <p className="text-sm text-ink/75 mt-1">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-forest/70">
            Bài viết mới nhất
          </h2>
          <Link href="/blog" className="text-sm text-terracotta font-semibold hover:underline">
            Xem tất cả →
          </Link>
        </div>
        {latestPosts.length === 0 ? (
          <p className="text-forest/70">Chưa có bài viết nào. Sắp có rồi.</p>
        ) : (
          <div className="grid gap-4">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
