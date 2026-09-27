"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase();
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
  const [query, setQuery] = useState("");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const activeChipRef = useRef<HTMLAnchorElement | null>(null);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    activeChipRef.current?.scrollIntoView({
      behavior: "instant" as ScrollBehavior,
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

  useEffect(() => {
    if (!langMenuOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [langMenuOpen]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return posts.filter((p) => {
      if (lang !== "all" && p.lang !== lang) return false;
      if (q && !normalize(p.title).includes(q) && !normalize(p.description ?? "").includes(q)) {
        return false;
      }
      return true;
    });
  }, [posts, lang, query]);

  const stations = [
    { key: "all", href: "/blog", kicker: "Ga đầu", name: "Tất cả", count: totalCount },
    ...categories.map((c, i) => ({
      key: c.slug,
      href: `/category/${c.slug}`,
      kicker: `Trạm ${i + 1}`,
      name: c.name,
      count: categoryCounts?.[c.slug],
    })),
  ];

  const activeLangLabel = LANG_FILTERS.find((f) => f.key === lang)?.label ?? "Tất cả";

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm bài viết..."
            className="w-full rounded-[3px] border border-forest/15 bg-cream py-2.5 pl-3 pr-9 text-sm text-ink placeholder:text-ink/40 outline-none transition-colors focus:border-terracotta/60"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <div className="relative shrink-0" ref={langMenuRef}>
          <button
            type="button"
            onClick={() => setLangMenuOpen((v) => !v)}
            aria-label={`Lọc theo ngôn ngữ (đang chọn: ${activeLangLabel})`}
            aria-expanded={langMenuOpen}
            className={`relative flex items-center gap-1.5 rounded-[3px] border px-3 py-2.5 text-[13px] font-semibold transition-colors ${
              lang !== "all"
                ? "border-terracotta text-terracotta"
                : "border-forest/15 text-forest-deep hover:border-terracotta/50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            <span className="hidden sm:inline">{activeLangLabel}</span>
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 top-[calc(100%+6px)] z-10 w-32 overflow-hidden rounded-[3px] border border-forest/15 bg-cream shadow-md">
              {LANG_FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setLang(f.key);
                    setLangMenuOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-[13px] font-semibold transition-colors ${
                    lang === f.key
                      ? "bg-paper text-forest-deep"
                      : "text-forest-deep/70 hover:bg-paper"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* The categories as stations on one rail — the same route as the
          homepage, with the station you're on lit up. Scrolls sideways on
          phones; spreads across the width from sm: up. */}
      <nav aria-label="Các trạm dừng" className="relative mb-10 min-w-0">
        <div className="-mx-5 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          <ol className="relative flex w-max gap-7 sm:grid sm:w-full sm:grid-cols-6 sm:gap-4">
            <span
              className="time-rail-line absolute left-0 right-0 top-[6px] h-[2px]"
              aria-hidden="true"
            />
            {stations.map((station) => {
              const active = activeCategory === station.key;
              return (
                <li key={station.key} className="min-w-[6.5rem] sm:min-w-0">
                  <Link
                    href={station.href}
                    ref={active ? activeChipRef : undefined}
                    aria-current={active ? "page" : undefined}
                    className="group relative block pt-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60"
                  >
                    <span
                      className={`absolute left-0 top-0 size-3.5 rounded-full border-2 transition-colors ${
                        active
                          ? "station-dot border-terracotta bg-terracotta"
                          : "border-forest-deep bg-cream group-hover:border-terracotta group-hover:bg-terracotta"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="block whitespace-nowrap text-[11px] font-semibold uppercase tracking-widest text-ochre">
                      {station.kicker}
                      {typeof station.count === "number" && (
                        <span className="text-ink/45"> · {station.count}</span>
                      )}
                    </span>
                    <span
                      className={`mt-1 block font-serif text-[17px] font-semibold italic leading-snug transition-colors ${
                        active ? "text-terracotta" : "text-forest-deep group-hover:text-terracotta"
                      }`}
                    >
                      {station.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent sm:hidden" />
      </nav>

      {filtered.length === 0 ? (
        <p className="text-forest/70">
          {query.trim()
            ? `Không tìm thấy bài viết nào khớp với "${query.trim()}".`
            : "Chưa có bài viết nào ở đây. Ghé lại sau nhé!"}
        </p>
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
