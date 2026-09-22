import Skeleton from "@/components/skeletons/Skeleton";

export default function PocGridSkeleton() {
  return (
    <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex h-full flex-col overflow-hidden rounded-[3px] border border-forest/15 bg-cream"
        >
          <div className="flex items-start gap-3 border-b border-forest/12 px-3.5 py-3">
            <Skeleton className="size-11 shrink-0 rounded-[4px]" />
            <div className="min-w-0 flex-1 pt-0.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-1.5 h-3 w-1/3" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 px-3.5 py-3.5">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-5/6" />
            <Skeleton className="h-3.5 w-2/3" />
            <div className="mt-auto border-t border-forest/12 pt-2.5">
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
