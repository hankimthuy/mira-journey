import type { Metadata } from "next";
import CardStation from "@/components/CardStation";

export const metadata: Metadata = {
  title: "Trạm Aha",
  description: "Dưới ánh trăng, rút một lá tarot hay bài tây và để trực giác lên tiếng.",
};

// Fixed star field: positions come from a tiny seeded generator, so the
// server and client render the same sky (no hydration mismatch).
function starField(count: number) {
  let seed = 7;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => ({
    left: `${(next() * 100).toFixed(2)}%`,
    top: `${(next() * 100).toFixed(2)}%`,
    size: next() < 0.15 ? 3 : next() < 0.5 ? 2 : 1,
    delay: `${(next() * 4).toFixed(2)}s`,
    duration: `${(2.4 + next() * 3).toFixed(2)}s`,
    key: i,
  }));
}

const STARS = starField(70);

function Moon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="aha-moon pointer-events-none absolute right-[6%] top-10 h-20 w-20 text-ochre-light sm:h-28 sm:w-28"
      aria-hidden="true"
    >
      <path d="M62 12a40 40 0 1 0 26 70A34 34 0 1 1 62 12Z" fill="currentColor" />
    </svg>
  );
}

export default function AhaPage() {
  return (
    <div className="aha-night relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STARS.map((s) => (
          <span
            key={s.key}
            className="aha-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>
      <Moon />

      <div className="relative mx-auto max-w-5xl px-5 py-14">
        <section className="animate-reveal-focus mb-9 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-ochre-light/80">
            Nơi trăng soi lá bài
          </p>
          <h1 className="aha-title mb-3 font-serif text-4xl font-semibold italic leading-[1.1] text-cream sm:text-[46px]">
            Trạm Aha
          </h1>
          <p className="text-lg leading-relaxed text-cream/80">
            Tắt bớt tiếng ồn, hít một hơi thật sâu, nghĩ về điều bạn đang băn khoăn.
            Rồi chọn một kiểu rút{" "}
            <span className="font-semibold text-ochre-light">theo trực giác</span>. Lá bài
            không đoán tương lai, nó chỉ giúp điều bạn đã biết sẵn lên tiếng.
          </p>
        </section>

        <CardStation />

        <p className="mt-14 border-t border-ochre-light/15 pt-6 text-[13px] leading-relaxed text-cream/45">
          Bộ tarot theo cấu trúc 78 lá của{" "}
          <em className="font-serif">The Modern Witch Tarot</em> (Lisa Sterle). Mặt bài ở đây do
          blog tự vẽ, không dùng tranh gốc của bộ bài. Mọi lần rút đều ngẫu nhiên và không được lưu lại.
        </p>
      </div>
    </div>
  );
}
