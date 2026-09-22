import Skeleton from "@/components/skeletons/Skeleton";

export default function PostListSkeleton() {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <Skeleton className="h-[42px] flex-1" />
        <Skeleton className="h-[42px] w-[42px] shrink-0" />
      </div>

      <div className="mb-8 flex gap-2.5 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-28 shrink-0 rounded-xl sm:rounded-[3px]" />
        ))}
      </div>

      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_1fr] gap-6 items-start border-t border-forest/15 py-6"
          >
            <div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="mt-2.5 h-4 w-full" />
              <Skeleton className="mt-1.5 h-4 w-2/3" />
              <Skeleton className="mt-3 h-4 w-24" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-3.5 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
