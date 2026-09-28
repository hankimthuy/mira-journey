import type { Metadata } from "next";
import { getAllPocs } from "@/lib/pocs";
import { LINKEDIN_URL } from "@/lib/seo";
import ProductRail, { StageLegend } from "@/components/ProductRail";
import OpenSign from "@/components/OpenSign";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Xưởng chế tác của tôi",
  description: "Nơi những ý tưởng thành sản phẩm.",
  alternates: {
    canonical: "/products",
  },
};

export default async function ProductsPage() {
  const pocs = await getAllPocs();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="animate-reveal-focus mb-9 flex flex-col-reverse items-start gap-6 sm:flex-row sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="mb-3 font-serif text-3xl font-semibold italic leading-[1.15] text-forest-deep sm:text-[38px]">
            Xưởng chế tác của tôi
          </h1>
          <p className="text-lg leading-relaxed text-ink/85">
            Nơi những ý tưởng{" "}
            <span className="font-semibold text-terracotta">thành sản phẩm</span>
            .
          </p>
        </div>
        <OpenSign />
      </section>

      {pocs.length === 0 ? (
        <p className="py-12 text-center text-forest/70">
          Xưởng đang dọn hàng. Quay lại sau nhé.
        </p>
      ) : (
        <>
          <div className="mb-10 border-y border-forest/15 py-3">
            <StageLegend />
          </div>
          <ProductRail pocs={pocs} />
        </>
      )}

      <section className="mt-12 border-t border-forest/15 pt-8">
        {/* Full container width on purpose — this is one thought, and the old
            max-w-2xl was breaking it into a narrow, choppy column. */}
        <p className="mb-6 font-serif text-lg italic leading-relaxed text-forest-deep">
          Mỗi thứ bắt đầu từ một câu hỏi, một sự khó chịu, hoặc đơn giản tôi có rất nhiều ý tưởng trong đầu, tôi muốn xem thử có thể triển khai được không.
        </p>
        <p className="flex flex-wrap items-baseline gap-x-2 leading-relaxed text-ink/80">
          Nếu có project nào khiến bạn tò mò và muốn thảo luận
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-rewind inline-block font-serif text-lg font-medium italic text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60"
          >
            Let&apos;s connect →
          </a>
        </p>
      </section>
    </div>
  );
}
