import Skeleton from "@/components/skeletons/Skeleton";
import PostListSkeleton from "@/components/skeletons/PostListSkeleton";

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Skeleton className="h-3.5 w-20 mb-2" />
      <Skeleton className="h-9 w-64 mb-2" />
      <Skeleton className="h-4 w-full max-w-md mb-8" />
      <PostListSkeleton />
    </div>
  );
}
