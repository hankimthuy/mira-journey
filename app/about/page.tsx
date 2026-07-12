import type { Metadata } from "next";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Về Mira",
  description: "Đôi lời về Cỗ Máy Thời Gian và người vận hành nó.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-3">
        About
      </p>
      <h1 className="font-serif italic text-3xl sm:text-[34px] font-semibold text-forest-deep mb-6">
        Về Cỗ Máy Thời Gian
      </h1>

      <div className="grid md:grid-cols-[1fr_260px] gap-10">
        <div className="prose-post max-w-none text-ink [&>p]:mb-[18px]">
          <p>
            Xin chào, mình là <strong>Han Kim Thuy</strong>. Blog này là cỗ
            máy thời gian nhỏ của riêng mình — nơi mình tua lại những gì đã
            học, tạm dừng ở những gì đang tò mò, và đôi khi tua nhanh tới
            những ý tưởng còn dang dở.
          </p>
          <p>
            Mình không cố định một chủ đề duy nhất, vì bản thân sự tò mò cũng
            không đi theo một đường thẳng. Đang khám phá xoay quanh 5 chủ đề
            chính, theo dọc suốt hành trình mình đi.
          </p>
          <p>
            Đây là bản MVP đầu tiên: chưa có hệ thống đăng bài (CMS), mỗi khi
            có bài mới mình sẽ vào sửa code trực tiếp. Đơn giản, nhưng đủ để
            bắt đầu ghi lại hành trình.
          </p>
          <p>
            Nếu bạn tình cờ ghé qua, cảm ơn bạn đã cùng ngồi lên cỗ máy thời
            gian này một chút.
          </p>
        </div>

        <div className="border-l border-forest/18 pl-6">
          {categories.map((c) => (
            <div key={c.slug} className="mb-4">
              <p className="font-serif italic font-bold text-[13px] text-forest-deep">
                {c.name}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-ink/65">
                {c.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
