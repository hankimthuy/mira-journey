import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-[720px] mt-8 pt-8 border-t border-forest/15">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-ochre mb-4">
        Cùng chủ đề
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group block rounded-xl border border-forest/15 bg-white/40 p-4 transition-colors hover:border-terracotta/50"
          >
            <p className="text-[11px] text-forest/50">{formatDate(p.date)}</p>
            <p className="mt-1.5 text-[14px] font-semibold text-forest-deep leading-snug transition-colors group-hover:text-terracotta">
              {p.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
