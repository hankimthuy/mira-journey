import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Trạm xuất phát",
  description:
    "Vì sao mình dựng lên cỗ máy thời gian nhỏ này, và cách mình nhìn việc học như một hành trình không tuyến tính.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <section className="mb-12 grid sm:grid-cols-[1fr_180px] gap-6 items-center">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-3">
            Lời mở đầu
          </p>
          <h1 className="font-serif italic text-3xl sm:text-[38px] font-semibold text-forest-deep leading-[1.15] mb-2">
            Trạm xuất phát
          </h1>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/machine-2.png"
          alt="Minh họa cỗ máy thời gian"
          className="w-full max-w-[180px] mx-auto animate-fade-in-up"
        />
      </section>

      <div
        className="mb-10 font-serif animate-fade-in-up [&>p]:mb-4"
        style={{ animationDelay: "0.2s" }}
      >
        <p className="text-lg text-ink/85 leading-relaxed">
          Có những ý tưởng hay góc nhìn mới, nếu chỉ để yên trong đầu, theo thời gian
          sẽ dần mòn cạnh và lệch khỏi hình dạng ban đầu — không phải vì thời gian cố
          tình bào mòn, mà vì mình chưa từng dừng lại để định hình và gọi tên chúng.
        </p>
        <p className="text-lg text-ink/85 leading-relaxed">
          Đó là lý do cỗ máy thời gian nhỏ này ra đời. Viết, với mình, là một lựa
          chọn chủ động — một lời cam kết với những gì mình đã và đang học, để giữ
          nguyên độ sắc nét của kiến thức ngay tại khoảnh khắc mình chạm vào nó.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-10">
        <div className="prose-post max-w-none text-ink [&>p]:mb-[18px]">
          <h2>Vì sao lại là một &ldquo;cỗ máy thời gian&rdquo;?</h2>
          <p>
            Bởi vì mình thích hình dung việc học như một hành trình không tuyến
            tính — không đi theo một đường thẳng tắp từ đầu đến cuối. Có những
            chặng mình chủ động tua nhanh qua các chủ đề đã quen thuộc, có những ga
            mình chấp nhận dừng lại thật lâu trước một khái niệm hóc búa, và thỉnh
            thoảng, mình sẵn sàng tua ngược bánh xe để đào sâu lại một điều từng
            lướt qua dưới một lăng kính mới.
          </p>
          <p>
            Vì vậy, nơi này sẽ không đi theo một lịch đăng bài cố định nào cả. Nó
            đơn giản là chỗ mình chủ động phanh cỗ máy lại, bước xuống, ghi chép lại
            những gì vừa đi qua, rồi lại tiếp tục hành trình.
          </p>
          <p>
            Mọi thứ ở đây bắt đầu thật nhỏ, gọn gàng và nguyên bản nhất có thể.
            Không cầu kỳ, không bóng bẩy — bởi điều quan trọng nhất là chủ động bắt
            tay vào làm, thay vì chờ đợi một sự hoàn hảo vốn dĩ không tồn tại.
          </p>
          <blockquote>
            <p>
              Cỗ máy đã nổ máy, trạm dừng đầu tiên đã lên bản đồ. Hẹn gặp bạn ở
              những chặng đường hữu duyên.
            </p>
          </blockquote>
        </div>

        <div className="border-l border-forest/18 pl-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-forest/70 mb-4">
            Những trạm dừng
          </p>
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
          <Link
            href="/blog"
            className="text-sm text-terracotta font-bold hover:underline"
          >
            Xem tất cả bài viết →
          </Link>
        </div>
      </div>
    </div>
  );
}
