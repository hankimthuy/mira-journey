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
      <h1 className="text-3xl font-extrabold text-forest-deep mb-2">
        Tất cả bài viết
      </h1>
      <p className="text-ink/75 mb-8">
        {posts.length} bài viết và còn tiếp tục.
      </p>
      <PostList posts={posts} />
    </div>
  );
}
