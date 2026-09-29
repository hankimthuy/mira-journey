import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/categories";
import SnapLink from "@/components/SnapLink";
import MimoOperatorCard from "@/components/MimoOperatorCard";

export const metadata: Metadata = {
  title: "Trạm xuất phát",
  description:
    "Vì sao mình làm ra cỗ máy thời gian nhỏ này (do Mimo cầm lái), vì sao đường đi không cần thẳng, và bản đồ các trạm: Trạm dừng, Trạm chế tạo, Trạm khám phá, Trạm Aha.",
  alternates: {
    canonical: "/about",
  },
};

type Station = { name: string; href: string; lead: string; body: string[] };

// The stations in header order. Trạm xuất phát is this page, so it isn't
// listed; the random warp isn't a station at all, it lives in the sidebar.
const STATIONS: Station[] = [
  {
    name: "Trạm dừng",
    href: "/blog",
    lead: "Để nghĩ lại.",
    body: [
      "Những điều mình đã học, đã trải qua, hoặc vẫn còn đang nghĩ dở.",
      "Không cần lúc nào cũng có kết luận. Có những thứ chỉ cần được nhìn thấy rõ hơn.",
    ],
  },
  {
    name: "Trạm chế tạo",
    href: "/products",
    lead: "Để làm thử.",
    body: [
      "Những ý tưởng mình muốn biến thành thứ gì đó chạy được — từ PoC, MVP cho đến sản phẩm thật.",
      "Có thứ đi tiếp, có thứ dừng lại. Cả hai đều cho mình một trải nghiệm đáng nhớ.",
    ],
  },
  {
    name: "Trạm khám phá",
    href: "/explore",
    lead: "Để bước ra ngoài.",
    body: [
      "Những nơi mình đã đến, những điều mình nhìn thấy và những gì mang về sau mỗi chuyến đi.",
    ],
  },
  {
    name: "Trạm Aha",
    href: "/aha",
    lead: "Để thử lắng nghe trực giác.",
    body: [
      "Không phải để đoán tương lai, mà để nhìn một vấn đề từ một góc mà lý trí có thể đã bỏ qua.",
    ],
  },
];

export default function AboutPage() {

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <section className="mb-8 grid sm:grid-cols-[1fr_180px] gap-6 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-3">
            Lời mở đầu
          </p>
          <h1 className="font-serif italic text-3xl sm:text-[38px] font-semibold text-forest-deep leading-[1.15]">
            Trạm xuất phát
          </h1>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/machine-2.png"
          alt="Minh họa cỗ máy thời gian"
          className="w-full max-w-[180px] mx-auto"
        />
      </section>

      <div className="mb-12 font-serif [&>p]:mb-4">
        <p className="text-base text-ink leading-relaxed">
          Có những điều mình từng nghĩ rất hay, từng học được rất nhiều, nhưng nếu
          không ghi lại, một thời gian sau nhìn lại có khi chẳng còn nhớ mình đã
          nghĩ gì.
        </p>
        <p className="text-base text-ink leading-relaxed">
          Vậy nên mình làm ra nơi này.
        </p>
        <p className="text-base text-ink leading-relaxed">
          Một chỗ để mình dừng lại, nhìn lại những gì đã đi qua, và hiểu thêm về
          chính mình.
        </p>
        <p className="text-base text-ink leading-relaxed">
          Có thể là một ý tưởng, một dự án, một chuyến đi, một câu hỏi, hoặc một
          điều nhỏ nhặt khiến mình suy nghĩ mãi.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-10">
        <div className="prose-post max-w-none text-ink [&>p]:mb-[18px] [&>h2]:mb-3 [&>h2:not(:first-child)]:mt-10">
          <h2>Vì sao lại là một &ldquo;Cỗ Máy Thời Gian&rdquo;?</h2>
          <p className="text-base leading-relaxed">
            Vì mình không nghĩ việc học hay việc sống lúc nào cũng phải đi theo
            một đường thẳng.
          </p>
          <p className="text-base leading-relaxed">
            Có những thứ đã quen thì mình đi nhanh qua. Có những chuyện chưa hiểu
            thì mình muốn dừng lại lâu hơn một chút.
          </p>
          <p className="text-base leading-relaxed">
            Có khi mình quay lại một điều từng học, nhưng lần này nhìn nó từ một
            góc khác và bất ngờ nhận ra: <em>à, hóa ra trước đây mình đã bỏ sót
            điều này.</em>
          </p>
          <p className="text-base leading-relaxed">
            Nên cỗ máy này cũng không có lịch trình cố định. Mình chỉ đi, gặp một
            điều đáng nhớ thì bước xuống, ghi lại, rồi lại lên đường.
          </p>
          <p className="text-base leading-relaxed">
            Có thể hôm nay mình viết về một thứ rất &ldquo;work&rdquo;, ngày mai
            lại là một chuyến đi, một suy nghĩ vụn vặt, hoặc một điều chẳng biết
            nên gọi tên thế nào.
          </p>
          <p className="text-base leading-relaxed">
            Không sao cả. Đường đi không cần thẳng, miễn là mình vẫn đang đi.
          </p>

          <h2>Những trạm trên hành trình</h2>
          <p className="text-base leading-relaxed">
            Mỗi trạm là một cách mình lưu lại những điều đã đi qua.
          </p>
          {/* Same rail language as the homepage: a dashed track, a dot per
              station, the words hanging beside it. */}
          <ol className="relative !mb-0 mt-6 space-y-7">
            <span
              className="product-rail-line absolute bottom-2 left-[6px] top-2 w-[2px]"
              aria-hidden="true"
            />
            {STATIONS.map((station) => (
              <li key={station.name} className="relative pl-8">
                <span
                  className="absolute left-0 top-[7px] size-3.5 rounded-full border-2 border-forest-deep bg-cream"
                  aria-hidden="true"
                />
                <Link
                  href={station.href}
                  className="font-serif text-lg font-semibold italic !text-forest-deep !no-underline hover:!text-terracotta"
                >
                  {station.name}
                </Link>
                <p className="mt-0.5 text-sm font-semibold text-ochre">
                  {station.lead}
                </p>
                {station.body.map((line) => (
                  <p key={line} className="mt-1 text-base leading-relaxed">
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </div>

        <div className="animate-fade-in-up border-l border-forest/18 pl-6">
          {/* Mimo waits at the top of the sidebar, small, beside the reading. */}
          <div className="mb-6 border-b border-dashed border-forest/20 pb-5">
            <MimoOperatorCard />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-forest/70 mb-4">
            Những chủ đề mình quan tâm
          </p>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="block rounded-[3px] -mx-2 mb-4 px-2 py-1 transition-colors hover:bg-paper/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta/60 focus-visible:outline-offset-2"
            >
              <p className="font-serif italic font-bold text-[13px] text-forest-deep">
                {c.name}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-ink/65">
                {c.tagline}
              </p>
            </Link>
          ))}
          <Link
            href="/blog"
            className="text-sm text-terracotta font-bold hover:underline"
          >
            Xem tất cả bài viết →
          </Link>
          <div className="mt-8 border-t border-dashed border-forest/20 pt-6">
            <SnapLink />
          </div>
        </div>
      </div>

      {/* The sign-off sits below both columns, so on phones it still comes
          after the topics instead of before them. */}
      <div className="mt-14 border-t border-dashed border-forest/20 pt-8 text-center font-serif italic text-forest-deep">
        <p className="text-lg">Cỗ máy đã khởi động.</p>
        <p className="mt-2 text-base text-ink/75">
          Mình chưa biết chuyến tiếp theo sẽ đưa mình đến đâu.
        </p>
        <p className="mt-1 text-base text-ink/75">Nhưng cứ đi đã.</p>
      </div>
    </div>
  );
}
