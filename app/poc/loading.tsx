import PocGridSkeleton from "@/components/skeletons/PocGridSkeleton";

export default function PocLoading() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="mb-9 flex flex-col-reverse items-start gap-6 sm:flex-row sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="mb-3 font-serif text-3xl font-semibold italic leading-[1.15] text-forest-deep sm:text-[38px]">
            Xưởng chế tác của tôi
          </h1>
          <p className="text-lg leading-relaxed text-ink/85">
            Nơi những ý tưởng{" "}
            <span className="font-semibold text-terracotta">thành sản phẩm</span>.
          </p>
        </div>
      </section>
      <PocGridSkeleton />
    </div>
  );
}
