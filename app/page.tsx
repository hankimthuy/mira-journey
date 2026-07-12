import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <section className="mb-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-3">
          Xin chào, mình là Han Kim Thuy
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-deep leading-tight mb-4">
          Cỗ Máy Thời Gian — Mira Journey 🕰️
        </h1>
        <p className="text-lg text-ink/85 leading-relaxed max-w-2xl">
          Đây là nơi mình tua đi tua lại giữa những chủ đề mình đang tò mò:
          công nghệ, trải nghiệm người dùng, tâm lý học, hệ thống vận hành, và
          vô số mảnh vụn thú vị nhặt được dọc đường. Không có lịch đăng bài cố
          định — mình viết khi có điều gì đó đáng để dừng lại ghi chép.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link
            href="/blog"
            className="rounded-full bg-forest text-cream px-5 py-2.5 text-sm font-semibold hover:bg-forest-deep transition-colors"
          >
            Đọc tất cả bài viết
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-forest/30 text-forest-deep px-5 py-2.5 text-sm font-semibold hover:bg-paper transition-colors"
          >
            Về Mira
          </Link>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-bold text-forest-deep mb-4">
          Các trạm dừng chân
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-2xl border border-forest/10 bg-paper/60 p-4 hover:border-ochre transition-colors"
            >
              <p className="text-lg font-bold text-forest-deep">
                {c.emoji} {c.name}
              </p>
              <p className="text-sm text-ink/75 mt-1">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-forest-deep">Mới viết gần đây</h2>
          <Link href="/blog" className="text-sm text-terracotta font-semibold hover:underline">
            Xem tất cả →
          </Link>
        </div>
        {latestPosts.length === 0 ? (
          <p className="text-forest/70">Chưa có bài viết nào. Sắp có rồi!</p>
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
