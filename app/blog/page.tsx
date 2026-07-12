import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "Tất cả bài viết",
  description: "Toàn bộ bài viết trên Cỗ Máy Thời Gian — Mira Journey.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-2">
        Tất cả bài viết · cũng dùng cho từng Category
      </p>
      <h1 className="font-serif italic text-3xl sm:text-[34px] font-semibold text-forest-deep mb-8">
        Nhật ký hành trình
      </h1>
      <PostList posts={posts} />
    </div>
  );
}
