import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";

export default function PostCard({ post }: { post: PostMeta }) {
  const category = getCategoryBySlug(post.category);

  return (
    <article className="grid grid-cols-[2fr_1fr] gap-6 items-start border-t border-forest/15 py-6">
      <div>
        <h3 className="font-serif font-semibold text-xl sm:text-[23px] text-forest-deep">
          <Link href={`/blog/${post.slug}`} className="hover:text-terracotta">
            {post.title}
          </Link>
        </h3>

        {post.description && (
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            {post.description}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="mt-2.5 inline-block text-[13px] font-bold text-terracotta hover:underline"
        >
          Đọc tiếp →
        </Link>
      </div>

      <div className="text-right text-xs text-ink/65">
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="block font-bold uppercase tracking-wide text-forest-deep hover:text-terracotta"
          >
            {category.name}
          </Link>
        )}
        <p className="mt-1">{formatDate(post.date)}</p>
        <p className="mt-1 uppercase font-bold text-ochre">{post.lang}</p>
      </div>
    </article>
  );
}
