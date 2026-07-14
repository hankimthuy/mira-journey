"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import type { Category } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import PostSidebar from "@/components/PostSidebar";

export default function PostDetail({
  post,
  category,
}: {
  post: Post;
  category: Category | undefined;
}) {
  const [fontSize, setFontSize] = useState(19);
  const [lineHeight, setLineHeight] = useState(1.8);

  return (
    <div className="mx-auto max-w-[900px] px-5 py-12">
      <div className="max-w-[720px]">
        <div className="flex items-center gap-2.5 text-xs text-forest/70 mb-4 flex-wrap">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="font-bold uppercase tracking-wide text-forest-deep hover:text-terracotta"
            >
              {category.name}
            </Link>
          )}
          <span className="text-forest/30">·</span>
          <span className="uppercase tracking-wide text-[10px] text-ochre font-bold">
            {post.lang}
          </span>
          <span className="text-forest/30">·</span>
          <span>{formatDate(post.date)}</span>
        </div>

        <h1 className="font-serif italic font-semibold text-4xl sm:text-[40px] leading-[1.15] text-forest-deep mb-3.5">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-lg text-ink/75 leading-relaxed mb-8 pb-8 border-b border-forest/15">
            {post.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-8 items-start">
        <div
          className="prose-post max-w-[720px] text-ink [&_h2]:mt-10 [&_h3]:mt-8 [&>*]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
          style={{ fontSize, lineHeight }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <PostSidebar
          post={post}
          fontSize={fontSize}
          lineHeight={lineHeight}
          onFontSizeChange={setFontSize}
          onLineHeightChange={setLineHeight}
        />
      </div>

      <div className="max-w-[720px] mt-12 pt-6 border-t border-forest/15">
        <Link href="/blog" className="text-sm font-bold text-terracotta hover:underline">
          ← Về danh sách bài viết
        </Link>
      </div>
    </div>
  );
}
