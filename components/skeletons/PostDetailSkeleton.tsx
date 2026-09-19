import Skeleton from "@/components/skeletons/Skeleton";

export default function PostDetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="max-w-[720px]">
        <div className="flex items-center gap-2.5 mb-4">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-3.5 w-8" />
          <Skeleton className="h-3.5 w-24" />
        </div>

        <Skeleton className="h-9 w-full" />
        <Skeleton className="mt-2.5 h-9 w-2/3" />

        <div className="mt-5 pb-5 border-b border-forest/15">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="mt-2 h-5 w-4/5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-8 md:gap-16 items-start mt-5">
        <div className="max-w-[720px] w-full">
          {[
            "w-full",
            "w-11/12",
            "w-full",
            "w-3/4",
            "w-full",
            "w-5/6",
            "w-2/3",
            "w-full",
          ].map((w, i) => (
            <Skeleton key={i} className={`h-4 ${w} mb-5`} />
          ))}
        </div>

        <aside className="hidden md:flex md:flex-col md:gap-10 w-[180px]">
          <Skeleton className="h-8 w-full" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3.5 w-5/6" />
            <Skeleton className="h-3.5 w-1/2" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
        </aside>
      </div>
    </div>
  );
}
