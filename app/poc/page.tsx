import type { Metadata } from "next";
import { getAllPocs } from "@/lib/pocs";
import { LINKEDIN_URL } from "@/lib/seo";
import PocCard from "@/components/PocCard";
import OpenSign from "@/components/OpenSign";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Xưởng chế tác của tôi",
  description: "Nơi những ý tưởng thành sản phẩm.",
};

export default async function PocPage() {
  const pocs = await getAllPocs();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="animate-reveal-focus mb-9 flex flex-col-reverse items-start gap-6 sm:flex-row sm:justify-between">
        <div className="max-w-2xl">
          {/* No eyebrow here — the nav link right above already says "Trạm PoC". */}
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
          Trạm đang dọn hàng. Quay lại sau nhé.
        </p>
      ) : (
        <div className="poc-grid grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pocs.map((poc, i) => (
            <div
              key={poc.id}
              className="poc-reveal h-full"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <PocCard poc={poc} />
            </div>
          ))}
        </div>
      )}

      <section className="mt-12 border-t border-forest/15 pt-8">
        {/* Full container width on purpose — this is one thought, and the old
            max-w-2xl was breaking it into a narrow, choppy column. */}
        <p className="mb-6 font-serif text-lg italic leading-relaxed text-forest-deep">
          Mỗi thứ bắt đầu từ một câu hỏi, một sự khó chịu, hoặc đơn giản là một
          ý tưởng tôi muốn xem thử nó có thành hình được không.
        </p>
        <p className="flex flex-wrap items-baseline gap-x-2 leading-relaxed text-ink/80">
          Nếu có project nào khiến bạn tò mò và muốn thảo luận
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-rewind inline-block font-serif text-lg font-medium italic text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60"
          >
            Kết nối cùng mình tại LinkedIn →
          </a>
        </p>
      </section>
    </div>
  );
}
