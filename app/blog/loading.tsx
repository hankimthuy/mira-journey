import PostListSkeleton from "@/components/skeletons/PostListSkeleton";

export default function BlogIndexLoading() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-2">
        Tất cả bài viết
      </p>
      <h1 className="font-serif italic text-3xl sm:text-[34px] font-semibold text-forest-deep mb-8">
        Những chặng đã đi qua
      </h1>
      <PostListSkeleton />
    </div>
  );
}
