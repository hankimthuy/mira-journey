"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { categories } from "@/lib/categories";
import PostCard from "@/components/PostCard";

type LangFilter = "all" | "vi" | "en";

const LANG_FILTERS: { key: LangFilter; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "vi", label: "VI" },
  { key: "en", label: "EN" },
];

function cardClass(active: boolean) {
  return `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-left text-[13px] transition-all duration-150 active:scale-[0.96] sm:whitespace-normal sm:rounded-[3px] sm:px-3.5 sm:py-2.5 sm:text-[15px] ${
    active
      ? "animate-card-pop border-terracotta bg-paper shadow-sm"
      : "border-forest/15 bg-cream hover:border-terracotta/50 hover:shadow-sm hover:-translate-y-0.5"
  }`;
}

export default function PostList({
  posts,
  activeCategory = "all",
  categoryCounts,
  totalCount,
}: {
  posts: PostMeta[];
  activeCategory?: string;
  categoryCounts?: Record<string, number>;
  totalCount?: number;
}) {
  const [lang, setLang] = useState<LangFilter>("all");

  const filtered = useMemo(() => {
    if (lang === "all") return posts;
    return posts.filter((p) => p.lang === lang);
  }, [posts, lang]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="relative min-w-0 w-full sm:w-auto">
          <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
            <Link href="/blog" className={cardClass(activeCategory === "all")}>
              <p className="font-semibold text-forest-deep sm:font-serif sm:italic">
                Theo dòng thời gian
              </p>
              {typeof totalCount === "number" && (
                <p className="mt-0.5 hidden text-[11px] text-ink/50 sm:block">
                  {totalCount} bài viết
                </p>
              )}
            </Link>
            {categories.map((c) => {
              const active = activeCategory === c.slug;
              return (
                <Link key={c.slug} href={`/category/${c.slug}`} className={cardClass(active)}>
                  <p className="font-semibold text-forest-deep sm:font-serif sm:italic">
                    {c.name}
                  </p>
                  {categoryCounts && (
                    <p className="mt-0.5 hidden text-[11px] text-ink/50 sm:block">
                      {categoryCounts[c.slug] ?? 0} bài viết
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent sm:hidden" />
        </div>

        <div className="flex items-center gap-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink/45">
          {LANG_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setLang(f.key)}
              className={`rounded-[3px] px-2 py-1 transition-colors ${
                lang === f.key ? "bg-paper text-forest-deep" : "hover:text-forest-deep"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
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
