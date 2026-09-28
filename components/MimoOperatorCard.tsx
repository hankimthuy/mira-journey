import { AUTHOR_FULL_NAME, PORTFOLIO_URL } from "@/lib/seo";

const CARD_ID = "mimo-operator-card";

// Same security-print guilloche as the passport identity page.
const COVER: React.CSSProperties = {
  backgroundImage:
    "repeating-radial-gradient(circle at 80% 20%, transparent 0 16px, rgb(232 184 109 / 0.07) 16px 17px)",
};

type Sound = { word: string; lang: string; body: React.ReactNode };

// What you hear when "mira.mirarii" is read slowly, one sound at a time.
const SOUNDS: Sound[] = [
  {
    word: "¡Mira!",
    lang: "Tây Ban Nha · Ý",
    body: <>&ldquo;Nhìn kìa!&rdquo; — câu cửa miệng mỗi lần ghé Trạm khám phá.</>,
  },
  {
    word: "mirari",
    lang: "Latin",
    body: (
      <>
        Ngạc nhiên, ngưỡng mộ. Cũng là gốc của <em>miracle</em> và <em>mirror</em>: vừa thấy
        điều kỳ lạ, vừa soi lại chính mình.
      </>
    ),
  },
  {
    word: "mirai · 未来",
    lang: "Nhật",
    body: <>Tương lai. Đặt tên vậy mà lái cỗ máy thời gian thì chắc là định đi tới trước rồi.</>,
  },
  {
    word: "Mira ✦",
    lang: "Sao Omicron Ceti",
    body: (
      <>
        &ldquo;Ngôi sao kỳ diệu&rdquo;, cứ khoảng 332 ngày lại sáng lên rồi mờ đi — y như cái đầu
        đèn của mình: có lúc tắt, nhưng rồi lại sáng.
      </>
    ),
  },
];

/**
 * Mimo in the About header. Tapping it opens the operator card as a native
 * popover, so the page stays short and only the curious read the story.
 */
export default function MimoOperatorCard() {
  return (
    <>
      <button
        type="button"
        popoverTarget={CARD_ID}
        className="group mx-auto flex w-full max-w-[180px] cursor-pointer flex-col items-center rounded-2xl p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta/60"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mimo.gif"
          alt="Mimo, người lái cỗ máy thời gian"
          className="w-32 drop-shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:-rotate-3 motion-reduce:transition-none"
        />
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-forest/60 group-hover:text-terracotta">
          Người lái · chạm để làm quen
        </span>
      </button>

      <section
        id={CARD_ID}
        popover="auto"
        aria-label="Thẻ vận hành của Mimo"
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[26rem] overflow-y-auto rounded-[14px] border border-ochre-light/25 bg-forest-deep px-5 pt-5 pb-6 text-cream shadow-[0_24px_48px_rgb(36_56_42/0.35)] backdrop:bg-forest-deep/45 backdrop:backdrop-blur-[2px] sm:px-7"
        style={COVER}
      >
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-ochre-light/90">
          <span>Thẻ vận hành · Operator</span>
          <button
            type="button"
            popoverTarget={CARD_ID}
            popoverTargetAction="hide"
            aria-label="Đóng thẻ"
            className="-mr-2 rounded-full px-2 py-1 text-base leading-none text-cream/60 hover:text-ochre-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-ochre-light/60"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mimo.gif"
            alt=""
            className="size-20 shrink-0 rounded-xl border border-ochre-light/30 bg-black/30"
          />
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13px]">
            <dt className="text-cream/55">Tên</dt>
            <dd className="font-serif italic text-cream">Mimo</dd>
            <dt className="text-cream/55">Việc</dt>
            <dd>Giữ tay lái, bật đèn trên đầu mỗi khi gặp điều đáng nhớ</dd>
            <dt className="text-cream/55">Vận hành</dt>
            <dd>{AUTHOR_FULL_NAME} · Mira</dd>
          </dl>
        </div>

        <p className="mt-5 font-serif text-[15px] italic leading-relaxed text-cream/90">
          &ldquo;Chào, mình là Mimo — tiếng Tây Ban Nha nghĩa là <em>sự nâng niu</em>. Mình
          giữ tay lái, còn ghé trạm nào là việc của Mira.&rdquo;
        </p>

        <h2 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-ochre-light">
          Chuyện cái tên <span className="normal-case tracking-normal font-mono">mira.mirarii</span>
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-cream/70">
          Đọc chậm từng âm thì nghe ra mấy chữ, tình cờ khớp với cỗ máy này đến lạ:
        </p>
        <ol className="mt-3 space-y-3">
          {SOUNDS.map((s) => (
            <li key={s.word} className="border-l-2 border-ochre-light/40 pl-3">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-serif text-lg font-semibold italic text-ochre-light">{s.word}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-cream/45">{s.lang}</span>
              </p>
              <p className="text-[13px] leading-relaxed text-cream/85">{s.body}</p>
            </li>
          ))}
        </ol>

        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-block text-sm font-bold text-ochre-light underline decoration-ochre-light/50 underline-offset-4 hover:text-cream"
        >
          Gặp Mira ở hankimthuy.com →
        </a>

        <div className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-cream/35" aria-hidden="true">
          <p className="truncate">OPR&lt;VNMMIMO&lt;&lt;MIRA&lt;MIRARII&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
          <p className="truncate">HKT0001&lt;&lt;VNM&lt;&lt;DI&lt;DE&lt;TRO&lt;VE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
        </div>
      </section>
    </>
  );
}
