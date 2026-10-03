import Link from "next/link";
import type { Post, PostMeta } from "@/lib/posts";
import { categoryHref, type Category } from "@/lib/categories";
import { COMMENTS_OPEN, type PublicComment } from "@/lib/comments";
import { formatDate } from "@/lib/format";
import PostSidebar from "@/components/PostSidebar";
import RelatedPosts from "@/components/RelatedPosts";
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
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,720px)_200px] lg:grid-cols-[minmax(0,720px)_220px] justify-center gap-8 md:gap-12 items-start">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 text-xs text-forest/70 mb-4 flex-wrap">
            {category && (
              <Link
                href={categoryHref(category.slug)}
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

          <h1 className="font-serif italic font-semibold text-[28px] leading-[1.2] sm:text-[40px] sm:leading-[1.15] text-forest-deep mb-3">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-[15px] text-ink/60 leading-relaxed mb-6 pb-6 border-b border-forest/15">
              {post.description}
            </p>
          )}

          <div
            className="prose-post text-ink [&_h2]:mt-8 sm:[&_h2]:mt-10 [&_h3]:mt-7 sm:[&_h3]:mt-8 [&>*]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
            style={{ fontSize: READING_FONT_SIZE, lineHeight: READING_LINE_HEIGHT }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>

        <PostSidebar post={post} />
      </div>

      <div className="max-w-[720px] mt-8 pt-8 border-t border-forest/15 flex items-center gap-x-4 gap-y-3">
        <p className="font-serif italic text-[15px] text-ink/55 min-w-0 flex-1 sm:flex-none sm:shrink-0">
          Bạn thấy hành trình này thế nào?
        </p>
        <span className="like-row-rule hidden sm:block" aria-hidden="true" />
        <PostActions className="shrink-0" />
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

      <RelatedPosts posts={relatedPosts} />

      <div className="max-w-[720px] mt-12 pt-6 border-t border-forest/15">
        <Link href="/blog" className="text-sm font-bold text-terracotta hover:underline">
          ← Về danh sách bài viết
        </Link>
      </div>
    </div>
    </ReactionsProvider>
  );
}
