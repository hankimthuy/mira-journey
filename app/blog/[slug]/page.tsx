import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/categories";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const category = getCategoryBySlug(post.category);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <div className="flex items-center gap-2 text-xs text-forest/70 mb-4 flex-wrap">
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

      <h1 className="text-4xl font-extrabold text-forest-deep leading-tight mb-3">
        {post.title}
      </h1>

      {post.description && (
        <p className="text-lg text-ink/75 mb-8">{post.description}</p>
      )}

      <div
        className="prose-post max-w-none text-ink leading-relaxed [&>*]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="mt-12 pt-6 border-t border-forest/10">
        <Link href="/blog" className="text-sm font-semibold text-terracotta hover:underline">
          ← Về danh sách bài viết
        </Link>
      </div>
    </article>
  );
}
