import type { Metadata } from "next";
import CardStation from "@/components/CardStation";

export const metadata: Metadata = {
  title: "Trạm Rút Bài",
  description: "Rút một lá tarot hay bài tây ngẫu nhiên, theo trực giác của ngày hôm đó.",
};

export default function CardsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="animate-reveal-focus mb-9 max-w-2xl">
        <h1 className="mb-3 font-serif text-3xl font-semibold italic leading-[1.15] text-forest-deep sm:text-[38px]">
          Trạm Rút Bài
        </h1>
        <p className="text-lg leading-relaxed text-ink/85">
          Hôm nay muốn hỏi bài điều gì? Chọn một kiểu rút{" "}
          <span className="font-semibold text-terracotta">theo trực giác</span>, xào bài, rồi lật.
        </p>
      </section>

      <CardStation />

      <p className="mt-12 border-t border-forest/15 pt-6 text-[13px] leading-relaxed text-ink/60">
        Bộ tarot theo cấu trúc 78 lá của{" "}
        <em className="font-serif">The Modern Witch Tarot</em> (Lisa Sterle). Mặt bài ở đây do
        blog tự vẽ, không dùng tranh gốc của bộ bài. Mọi lần rút đều ngẫu nhiên và không được lưu lại.
      </p>
    </div>
  );
}
