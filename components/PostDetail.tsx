import Link from "next/link";
import type { Post, PostMeta } from "@/lib/posts";
import type { Category } from "@/lib/categories";
import { COMMENTS_OPEN, type PublicComment } from "@/lib/comments";
import { formatDate } from "@/lib/format";
import PostSidebar from "@/components/PostSidebar";
import { PostActions, ReactionsProvider } from "@/components/PostReactions";
import CommentSection from "@/components/CommentSection";

const READING_FONT_SIZE = 16;
const READING_LINE_HEIGHT = 1.8;

export default function PostDetail({
  post,
  category,
  relatedPosts,
  likeCount,
  comments,
}: {
  post: Post;
  category: Category | undefined;
  relatedPosts: PostMeta[];
  likeCount: number;
  comments: PublicComment[];
}) {
  return (
    <ReactionsProvider postSlug={post.slug} title={post.title} initialCount={likeCount}>
    <div className="mx-auto max-w-5xl px-5 py-12">
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
          <PostActions className="ml-auto" />
        </div>

        <h1 className="font-serif italic font-semibold text-4xl sm:text-[40px] leading-[1.15] text-forest-deep mb-3.5">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-lg text-ink/75 leading-relaxed mb-5 pb-5 border-b border-forest/15">
            {post.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-8 md:gap-16 items-start">
        <div
          className="prose-post max-w-[720px] text-ink [&_h2]:mt-10 [&_h3]:mt-8 [&>*]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
          style={{ fontSize: READING_FONT_SIZE, lineHeight: READING_LINE_HEIGHT }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <PostSidebar post={post} relatedPosts={relatedPosts} />
      </div>

      <div className="max-w-[720px] mt-8 pt-8 border-t border-forest/15 flex items-center gap-4">
        <p className="font-serif italic text-[15px] text-ink/55 shrink-0">
          Bạn thấy hành trình này thế nào?
        </p>
        <span className="like-row-rule" aria-hidden="true" />
        <PostActions />
      </div>

      {(COMMENTS_OPEN || comments.length > 0) && (
        <div className="max-w-[720px] mt-8 pt-8 border-t border-forest/15">
          <CommentSection
            postSlug={post.slug}
            initialComments={comments}
            open={COMMENTS_OPEN}
          />
        </div>
      )}

      <div className="max-w-[720px] mt-12 pt-6 border-t border-forest/15">
        <Link href="/blog" className="text-sm font-bold text-terracotta hover:underline">
          ← Về danh sách bài viết
        </Link>
      </div>
    </div>
    </ReactionsProvider>
  );
}
