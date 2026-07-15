import { categories } from "@/lib/categories";

export default function TimeRail() {
  return (
    <div className="relative mb-6 h-16 sm:h-14" aria-hidden="true">
      <div
        className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-forest/25"
        style={{ transform: "translateY(-50%)" }}
      />

      <div className="absolute inset-x-0 top-1/2 hidden lg:grid grid-cols-5" style={{ transform: "translateY(-50%)" }}>
        {categories.map((c) => (
          <div key={c.slug} className="flex justify-center">
            <span className="h-3 w-3 rounded-full border-2 border-forest-deep bg-cream" />
          </div>
        ))}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mimo.gif"
        alt=""
        className="animate-ride-along absolute top-1/2 h-11 w-11 sm:h-9 sm:w-9 drop-shadow-md"
        style={{ ["--mimo-w" as string]: "44px", transform: "translateY(-58%)" }}
      />
    </div>
  );
}
