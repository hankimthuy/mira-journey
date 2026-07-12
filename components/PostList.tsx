"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";

type FilterLang = "all" | "vi" | "en";

const FILTERS: { key: FilterLang; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "vi", label: "Tiếng Việt" },
  { key: "en", label: "English" },
];

export default function PostList({ posts }: { posts: PostMeta[] }) {
  const [filter, setFilter] = useState<FilterLang>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.lang === filter);
  }, [posts, filter]);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-forest text-cream"
                : "bg-paper text-forest-deep hover:bg-ochre-light/50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-forest/70">Chưa có bài viết nào ở đây. Ghé lại sau nhé!</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
