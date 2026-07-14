import type { Post } from "@/lib/posts";
import TableOfContents from "@/components/TableOfContents";
import ReadingPrefs from "@/components/ReadingPrefs";
import ShareButton from "@/components/ShareButton";
import BackToTop from "@/components/BackToTop";

export default function PostSidebar({
  post,
  fontSize,
  lineHeight,
  onFontSizeChange,
  onLineHeightChange,
}: {
  post: Post;
  fontSize: number;
  lineHeight: number;
  onFontSizeChange: (value: number) => void;
  onLineHeightChange: (value: number) => void;
}) {
  return (
    <>
      <aside className="hidden md:flex md:flex-col md:gap-10 md:sticky md:top-12 md:self-start w-[180px]">
        <TableOfContents headings={post.headings} />
        <ReadingPrefs
          fontSize={fontSize}
          lineHeight={lineHeight}
          onFontSizeChange={onFontSizeChange}
          onLineHeightChange={onLineHeightChange}
        />
        <ShareButton title={post.title} />
      </aside>
      <BackToTop />
    </>
  );
}
