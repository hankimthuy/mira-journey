import type { Post, PostMeta } from "@/lib/posts";
import TableOfContents, { MobileTableOfContents } from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";

export default function PostSidebar({
  post,
  relatedPosts,
}: {
  post: Post;
  relatedPosts: PostMeta[];
}) {
  return (
    <>
      <aside className="hidden md:flex md:flex-col md:gap-10 md:sticky md:top-24 md:self-start w-full">
        <TableOfContents headings={post.headings} />
        <RelatedPosts posts={relatedPosts} />
      </aside>
      <MobileTableOfContents headings={post.headings} />
    </>
  );
}
