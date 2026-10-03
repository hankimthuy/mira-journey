import type { Post } from "@/lib/posts";
import TableOfContents, { MobileTableOfContents } from "@/components/TableOfContents";

export default function PostSidebar({ post }: { post: Post }) {
  return (
    <>
      <aside className="hidden md:block md:sticky md:top-24 md:self-start w-full">
        <TableOfContents headings={post.headings} />
      </aside>
      <MobileTableOfContents headings={post.headings} />
    </>
  );
}
