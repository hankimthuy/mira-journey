import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-ochre mb-4">
        Cùng chủ đề
      </p>
      <div className="flex flex-col gap-3.5">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
            <p className="text-[13px] font-semibold text-forest-deep leading-snug transition-colors group-hover:text-terracotta">
              {p.title}
            </p>
            <p className="mt-0.5 text-[11px] text-forest/50">{formatDate(p.date)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
