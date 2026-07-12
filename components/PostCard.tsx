import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";

export default function PostCard({ post }: { post: PostMeta }) {
  const category = getCategoryBySlug(post.category);

  return (
    <article className="group rounded-2xl border border-forest/10 bg-paper/60 p-5 transition-colors hover:border-ochre">
      <div className="flex items-center gap-2 text-xs text-forest/70 mb-2 flex-wrap">
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 font-medium text-forest-deep hover:bg-ochre-light/50"
          >
            {category.emoji} {category.name}
          </Link>
        )}
        <span className="uppercase tracking-wide rounded-full border border-ochre/50 px-2 py-0.5 text-[10px] text-ochre">
          {post.lang}
        </span>
        <span>{formatDate(post.date)}</span>
        <span>· {post.readingMinutes} phút đọc</span>
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
