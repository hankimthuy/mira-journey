import type { Metadata } from "next";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Về Mira",
  description: "Đôi lời về Cỗ Máy Thời Gian và người vận hành nó.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-5xl mb-4">🕰️</p>
      <h1 className="text-3xl font-extrabold text-forest-deep mb-4">
        Về Cỗ Máy Thời Gian
      </h1>
      <div className="space-y-4 text-ink/85 leading-relaxed text-lg">
        <p>
          Xin chào, mình là <strong>Han Kim Thuy</strong>. Blog này là cỗ máy
          thời gian nhỏ của riêng mình — nơi mình tua lại những gì đã học,
          tạm dừng ở những gì đang tò mò, và đôi khi tua nhanh tới những ý
          tưởng còn dang dở.
        </p>
        <p>
          Mình không cố định một chủ đề duy nhất, vì bản thân sự tò mò cũng
          không đi theo một đường thẳng. Mình đang khám phá xoay quanh 5 trạm
          dừng chân:
        </p>
        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <strong>
                {c.emoji} {c.name}
              </strong>{" "}
              — {c.tagline}
            </li>
          ))}
        </ul>
        <p>
          Đây là bản MVP đầu tiên: chưa có hệ thống đăng bài (CMS), mỗi khi
          có bài mới mình sẽ vào sửa code trực tiếp. Đơn giản, nhưng đủ để
          bắt đầu ghi lại hành trình.
        </p>
        <p>
          Nếu bạn tình cờ ghé qua, cảm ơn bạn đã cùng ngồi lên cỗ máy thời
          gian này một chút. 🌿
        </p>
      </div>
    </div>
  );
}
