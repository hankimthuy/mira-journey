import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";

export default function PostCard({ post }: { post: PostMeta }) {
  const category = getCategoryBySlug(post.category);

  return (
    <article className="group rounded-lg border border-forest/10 bg-paper/60 p-5 transition-colors hover:border-ochre">
      <div className="flex items-center gap-2.5 text-xs text-forest/70 mb-2 flex-wrap">
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="font-semibold uppercase tracking-wide text-forest-deep hover:text-terracotta"
          >
            {category.name}
          </Link>
        )}
        <span className="text-forest/30">·</span>
        <span className="uppercase tracking-wide text-[10px] text-ochre font-medium">
          {post.lang}
        </span>
        <span className="text-forest/30">·</span>
        <span>{formatDate(post.date)}</span>
        <span className="text-forest/30">·</span>
        <span>{post.readingMinutes} phút đọc</span>
      </div>

      <h3 className="text-xl font-bold text-forest-deep">
        <Link href={`/blog/${post.slug}`} className="hover:text-terracotta">
          {post.title}
        </Link>
      </h3>

      {post.description && (
        <p className="mt-2 text-sm text-ink/80 leading-relaxed">
          {post.description}
        </p>
      )}

      <Link
        href={`/blog/${post.slug}`}
        className="mt-3 inline-block text-sm font-semibold text-terracotta hover:underline"
      >
        Đọc tiếp →
      </Link>
    </article>
  );
}
