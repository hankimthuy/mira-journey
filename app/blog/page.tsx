import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";
import PostList from "@/components/PostList";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tất cả bài viết",
  description: `Toàn bộ bài viết trên ${SITE_NAME} — blog của Han Kim Thuy.`,
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categoryCounts = Object.fromEntries(
    categories.map((c) => [c.slug, posts.filter((p) => p.category === c.slug).length])
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-2">
        Tất cả bài viết
      </p>
      <h1 className="font-serif italic text-3xl sm:text-[34px] font-semibold text-forest-deep mb-8">
        Những chặng đã đi qua
      </h1>
      <PostList
        posts={posts}
        activeCategory="all"
        categoryCounts={categoryCounts}
        totalCount={posts.length}
      />
    </div>
  );
}
