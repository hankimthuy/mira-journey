import type { Post, PostMeta } from "@/lib/posts";
import TableOfContents from "@/components/TableOfContents";
import ShareButton from "@/components/ShareButton";
import RelatedPosts from "@/components/RelatedPosts";
import BackToTop from "@/components/BackToTop";

export default function PostSidebar({
  post,
  relatedPosts,
}: {
  post: Post;
  relatedPosts: PostMeta[];
}) {
  return (
    <>
      <aside className="hidden md:flex md:flex-col md:gap-10 md:sticky md:top-12 md:self-start w-[180px]">
        <ShareButton title={post.title} />
        <TableOfContents headings={post.headings} />
        <RelatedPosts posts={relatedPosts} />
      </aside>
      <BackToTop />
    </>
  );
}
