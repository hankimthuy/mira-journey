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
      <div className="flex mb-8 border border-forest/25 rounded-[2px] w-fit">
        {FILTERS.map((f, i) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-5 py-2 text-[13px] font-semibold transition-colors ${
              i > 0 ? "border-l border-forest/25" : ""
            } ${
              filter === f.key
                ? "bg-forest text-cream"
                : "bg-transparent text-forest-deep hover:bg-paper"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-forest/70">Chưa có bài viết nào ở đây. Ghé lại sau nhé!</p>
      ) : (
        <div>
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
