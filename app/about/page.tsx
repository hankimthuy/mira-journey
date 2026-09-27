import Link from "next/link";
import type { Metadata } from "next";
import { isExplorePost } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import SnapLink from "@/components/SnapLink";

export const revalidate = 60;

// The opening post — the first thing to read for someone just arriving.
const FIRST_POST_SLUG = "khoi-dau-cua-mot-hanh-trinh";

export const metadata: Metadata = {
  title: "Trạm xuất phát",
  description:
    "Vì sao mình dựng lên cỗ máy thời gian nhỏ này, cách mình nhìn việc học như một hành trình không tuyến tính, và bản đồ các trạm: Trạm dừng, Trạm chế tạo, Trạm khám phá, Trạm Aha.",
};

type Station = { name: string; href: string; body: React.ReactNode };

// The stations in the order a visitor meets them: write, build, travel,
// listen to intuition. The snap shortcut isn't a station, so it lives in the
// "Bắt đầu từ đâu?" column instead.
const STATIONS: Station[] = [
  {
    name: "Trạm dừng",
    href: "/blog",
    body: (
      <>
        Nơi mình phanh cỗ máy lại để viết. Năm trạm nhỏ trên tuyến chính
        (Life, Product &amp; Work, Mind, System, Radar), mỗi trạm một góc để
        nhìn lại những gì vừa học.
      </>
    ),
  },
  {
    name: "Trạm chế tạo",
    href: "/products",
    body: (
      <>
        Có những câu hỏi không trả lời được bằng chữ, chỉ có lời đáp khi mình
        bắt tay làm ra một thứ chạy được. Mỗi dự án bắt đầu từ một sự khó chịu
        có thật và lớn lên qua ba chặng: <strong>PoC</strong>, làm được
        không? <strong>MVP</strong>, có ai cần không? <strong>Live</strong>,
        đã có người dùng thật. Không phải hạt nào cũng thành hoa, và điều đó
        ổn: một PoC dừng lại vẫn trả lời được câu hỏi của nó.
      </>
    ),
  },
  {
    name: "Trạm khám phá",
    href: "/explore",
    body: (
      <>
        Khi rẽ khỏi đường ray để đi thật. Mỗi nơi đã ghé để lại một con dấu
        trong hộ chiếu, còn những điều nhặt được dọc đường thì nằm trong hành
        lý ký gửi.
      </>
    ),
  },
  {
    name: "Trạm Aha",
    href: "/aha",
    body: (
      <>
        Có những lúc lý trí đã nói đủ. Dưới ánh trăng, rút một lá tarot hay
        bài tây, không phải để đoán tương lai, mà để nghe xem trực giác đang
        muốn nói gì.
      </>
    ),
  },
];

export default async function AboutPage() {
  const posts = await getAllPosts();
  const firstPost = posts.find((p) => p.slug === FIRST_POST_SLUG);
  const latestPost = posts.find((p) => !isExplorePost(p) && p.slug !== FIRST_POST_SLUG);

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
          Có những ý tưởng hay góc nhìn mới, nếu chỉ để yên trong đầu, theo thời gian
          chúng có thể biến mất hay lệch khỏi hình dạng ban đầu — không phải vì thời
          gian cố tình bào mòn, mà vì mình chưa từng dừng lại để định hình và gọi tên
          chúng.
        </p>
        <p className="text-base text-ink leading-relaxed">
          Đó là lý do cỗ máy thời gian này ra đời. Viết, với mình, là một lựa chọn
          chủ động — một lời cam kết với những gì mình đã và đang học, để giữ được
          trọn vẹn nguyên bản câu chuyện hay kiến thức ngay chính khoảnh khắc mình
          chạm vào nó.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_260px] gap-10">
        <div className="prose-post max-w-none text-ink [&>p]:mb-[18px] [&>h2]:mb-3 [&>h2:not(:first-child)]:mt-10">
          <h2>Vì sao lại là một &ldquo;Cỗ máy thời gian&rdquo;?</h2>
          <p className="text-base leading-relaxed">
            Bởi vì mình thích hình dung việc học như một hành trình — có thể không
            đi theo một đường thẳng tắp từ đầu đến cuối. Có những chặng mình chủ
            động tua nhanh qua các chủ đề đã quen, có những ga mình chấp nhận dừng
            lại thật lâu trước một khái niệm hóc búa, hay thỉnh thoảng, mình sẵn
            sàng quay đầu lại để đào sâu một điều từng lướt qua dưới một lăng kính
            mới.
          </p>
          <p className="text-base leading-relaxed">
            Vì vậy, nơi này sẽ không đi theo một lịch đăng bài cố định nào cả. Đây
            đơn giản là nơi mình chủ động phanh cỗ máy lại, bước xuống, ghi chép lại
            những gì vừa đi qua, rồi lại tiếp tục hành trình.
          </p>

          <h2>Bản đồ các trạm</h2>
          <p className="text-base leading-relaxed">
            Cỗ máy không chạy trên một đường thẳng, nên nơi này cũng không chỉ
            có một lối đi. Mỗi trạm giữ lại một kiểu khoảnh khắc khác nhau.
          </p>
          {/* Same rail language as the homepage: a dashed track, a dot per
              station, the words hanging beside it. */}
          <ol className="relative !mb-8 mt-6 space-y-7">
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
                <p className="mt-1 text-base leading-relaxed">{station.body}</p>
              </li>
            ))}
          </ol>
          <p className="!mb-0 text-sm italic text-ink/55">
            Cỗ máy đã khởi động. Hẹn gặp bạn ở những chặng đường hữu&nbsp;duyên.
          </p>
        </div>

        <div className="animate-fade-in-up border-l border-forest/18 pl-6">
          {/* Not a second map: a few ways in for someone who just arrived. */}
          <p className="text-xs font-semibold uppercase tracking-widest text-forest/70 mb-5">
            Bắt đầu từ đâu?
          </p>
          {[
            { label: "Bài mở đầu", post: firstPost },
            { label: "Mới nhất", post: latestPost },
          ].map(
            ({ label, post }) =>
              post && (
                <Link
                  key={label}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-[3px] -mx-2 mb-5 px-2 py-1 transition-colors hover:bg-paper/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta/60 focus-visible:outline-offset-2"
                >
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-ochre">
                    {label}
                    {label === "Mới nhất" && (
                      <span className="text-ink/45"> · {formatDate(post.date)}</span>
                    )}
                  </span>
                  <span className="mt-1 block font-serif text-[15px] font-bold italic leading-snug text-forest-deep group-hover:text-terracotta">
                    {post.title}
                  </span>
                </Link>
              )
          )}
          <div className="mb-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ochre">
              Hay để cỗ máy chọn
            </p>
            <SnapLink>Búng tay</SnapLink>
            <p className="mt-2 text-xs leading-snug text-ink/65">
              Quay tới một ngày bất kỳ và thả bạn xuống một bài viết.
            </p>
          </div>
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
