import PostListSkeleton from "@/components/skeletons/PostListSkeleton";
import Skeleton from "@/components/skeletons/Skeleton";
import { exploreStation } from "@/lib/categories";

export default function ExploreLoading() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-ochre">
        Series đặc biệt
      </p>
      <h1 className="mb-8 font-serif text-3xl font-semibold italic text-forest-deep sm:text-[38px]">
        {exploreStation.name}
      </h1>
      <div className="mb-16 grid gap-3 lg:grid-cols-2 lg:gap-0">
        <Skeleton className="h-[22rem] rounded-[14px] lg:rounded-r-none" />
        <Skeleton className="h-[22rem] rounded-[14px] lg:rounded-l-none" />
      </div>
      <PostListSkeleton />
    </div>
  );
}
