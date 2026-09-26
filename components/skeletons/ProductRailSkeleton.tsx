import Skeleton from "@/components/skeletons/Skeleton";

export default function ProductRailSkeleton() {
  return (
    <div className="relative">
      <div className="mb-10 border-y border-forest/15 py-3">
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="relative space-y-8">
        <div
          className="product-rail-line absolute bottom-2 left-[6px] top-2 w-[2px]"
          aria-hidden="true"
        />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="relative pl-8">
            <span className="stage-dot absolute left-0 top-[7px] size-3.5 opacity-40" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="mt-2 h-3.5 w-full max-w-xl" />
            <Skeleton className="mt-1.5 h-3.5 w-2/3 max-w-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
