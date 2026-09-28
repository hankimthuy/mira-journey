import { AUTHOR_FULL_NAME, PORTFOLIO_URL } from "@/lib/seo";

const CARD_ID = "mimo-operator-card";

/** Mira's photo in /public. Set to null and the frame shows a star instead. */
const MIRA_PHOTO: string | null = "/mira.jpg";

// Security-print guilloche like the passport, plus faint dial rings.
const COVER: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 50% 0%, transparent 0 119px, rgb(232 184 109 / 0.08) 119px 120px, transparent 120px 179px, rgb(232 184 109 / 0.06) 179px 180px, transparent 180px), repeating-radial-gradient(circle at 80% 20%, transparent 0 16px, rgb(232 184 109 / 0.07) 16px 17px)",
};

const LABEL = "text-[10px] font-semibold uppercase tracking-[0.25em]";

type CrewMember = {
  name: string;
  role: string;
  duties: string[];
  tilt: string;
  photo: React.ReactNode;
};

const CREW: CrewMember[] = [
  {
    name: "Mimo",
    role: "The driver",
    duties: ["Giữ tay lái.", "Nhắc Mira nhìn đường.", "Đôi khi tự tiện ghé một trạm."],
    tilt: "-rotate-2",
    photo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/mimo.gif" alt="Mimo" className="size-full object-contain" />
    ),
  },
  {
    name: "Mira",
    role: "The operator",
    duties: ["Chọn nơi muốn dừng.", "Ghi lại những gì đáng nhớ.", "Thỉnh thoảng quay đầu nhìn lại."],
    tilt: "rotate-2",
    photo: MIRA_PHOTO ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={MIRA_PHOTO} alt={`Mira, ${AUTHOR_FULL_NAME}`} className="size-full object-cover" />
    ) : (
      <span className="grid size-full place-items-center text-4xl text-ochre-light" aria-label="Mira">
        ✦
      </span>
    ),
  },
];

type Stop = { word: string; lang: string; body: React.ReactNode; star?: boolean };

// The name read slowly, one sound at a time, drawn as stops on a star map.
const STOPS: Stop[] = [
  {
    word: "¡Mira!",
    lang: "Tây Ban Nha",
    body: <>&ldquo;Nhìn kìa!&rdquo; — câu cửa miệng mỗi lần ghé một trạm mới.</>,
  },
  {
    word: "mirari",
    lang: "Latin",
    body: (
      <>
        Một từ gợi về sự ngạc nhiên, ngưỡng mộ. Tình cờ lại gặp <em>miracle</em>, gặp{" "}
        <em>mirror</em> — một thứ khiến mình bất ngờ, một thứ khiến mình nhìn lại.
      </>
    ),
  },
  {
    word: "mirai · 未来",
    lang: "Nhật",
    body: (
      <>
        Tương lai. Nếu đã có một cỗ máy thời gian, thì biết đâu mỗi lần quay lại cũng là để
        thấy phía trước rõ hơn một chút.
      </>
    ),
  },
  {
    word: "Mira ✦",
    lang: "một ngôi sao",
    body: (
      <>
        Một ngôi sao biến quang. Có những lúc sáng lên, có những lúc mờ đi. Nhưng vẫn ở đó.
      </>
    ),
    star: true,
  },
];

const LOG: [string, string][] = [
  ["Status", "Đang vận hành"],
  ["Driver", "Mimo"],
  ["Operator", `Mira · ${AUTHOR_FULL_NAME}`],
  ["Destination", "Chưa biết"],
  ["Next stop", "Có thể là một điều đáng nhớ."],
];

/**
 * Mimo in the About header. Tapping it opens the operator card as a native
 * popover — a bit of Time Machine lore, so the page itself stays short.
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
        aria-label="Thẻ vận hành của Cỗ Máy Thời Gian"
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[30rem] overflow-y-auto rounded-[14px] border border-ochre-light/25 bg-forest-deep px-5 pt-5 pb-6 text-cream shadow-[0_24px_48px_rgb(36_56_42/0.35)] backdrop:bg-forest-deep/45 backdrop:backdrop-blur-[2px] sm:px-7"
        style={COVER}
      >
        <div className={`flex items-center justify-between ${LABEL} text-ochre-light/90`}>
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

        {/* Crew of the machine */}
        <p className={`mt-5 text-center ${LABEL} text-cream/45`}>Crew of the machine</p>
        <ul className="mt-4 grid grid-cols-2 gap-4">
          {CREW.map((m) => (
            <li key={m.name} className="flex flex-col items-center text-center">
              <div
                className={`relative size-24 ${m.tilt} rounded-[3px] border border-cream/25 bg-black/25 p-1 shadow-[0_6px_14px_rgb(0_0_0/0.25)]`}
              >
                {/* photo corners, like an archival album */}
                <span className="absolute -left-1 -top-1 size-3 border-l-2 border-t-2 border-ochre-light/70" aria-hidden="true" />
                <span className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-ochre-light/70" aria-hidden="true" />
                {m.photo}
                {m.name === "Mira" && (
                  <span
                    className="absolute -bottom-5 -right-7 grid size-12 rotate-[-14deg] place-items-center rounded-full border-2 border-terracotta/80 bg-forest-deep/80 text-center text-[6px] font-bold uppercase leading-tight tracking-[0.08em] text-terracotta"
                    aria-hidden="true"
                  >
                    Operator
                    <br />· Mira ·
                  </span>
                )}
              </div>
              <p className="mt-3 font-serif text-lg font-semibold italic text-ochre-light">{m.name}</p>
              <p className={`${LABEL} text-cream/55`}>{m.role}</p>
              <ul className="mt-2 space-y-0.5 text-[12.5px] leading-snug text-cream/85">
                {m.duties.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-6 border-y border-dashed border-cream/15 py-4 text-center font-serif text-[15px] italic leading-relaxed text-cream/90">
          Mira — người vận hành một cỗ máy không phải để đi đâu đó, mà để nhìn lại những nơi
          mình đã đi qua.
        </p>

        <p className="mt-4 text-[13px] leading-relaxed text-cream/75">
          <span className="text-cream/45">Mimo:</span> &ldquo;Chào, mình là Mimo. Mình giữ tay
          lái, còn ghé trạm nào là việc của Mira.&rdquo;
        </p>

        {/* The name, as a small star map */}
        <div className="mt-7 text-center">
          <p className="font-serif text-4xl font-semibold italic text-ochre-light">Mira</p>
          <p className="mt-1 font-mono text-xs tracking-wider text-cream/55">mira.mirarii</p>
          <p className="mt-3 text-[13px] italic text-cream/75">
            Bạn có từng thắc mắc tại sao lại là Mira?
          </p>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-cream/70">
          Đọc chậm cái tên này một chút, tự nhiên thấy nó có vài thứ hay ho.
        </p>

        <ol className="relative mt-4 space-y-4">
          <span
            className="absolute bottom-3 left-[6px] top-3 border-l-2 border-dotted border-ochre-light/35"
            aria-hidden="true"
          />
          {STOPS.map((s) => (
            <li key={s.word} className="relative pl-7">
              <span
                className={`absolute left-0 top-[5px] grid size-3.5 place-items-center text-[13px] leading-none text-ochre-light ${
                  s.star ? "animate-twinkle-soft motion-reduce:animate-none" : ""
                }`}
                aria-hidden="true"
              >
                ✦
              </span>
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-serif text-lg font-semibold italic text-ochre-light">{s.word}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-cream/45">{s.lang}</span>
              </p>
              <p className="text-[13px] leading-relaxed text-cream/85">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-5 font-serif text-[15px] italic leading-relaxed text-cream/90">
          Có lẽ mình đã chọn đúng cái tên.
          <br />
          Hoặc cũng có thể cái tên tự tìm đến mình.
        </p>

        {/* Operator's log */}
        <div className="mt-6 border-y border-dashed border-cream/20 py-3 font-mono text-[11px] leading-relaxed">
          <p className={`${LABEL} mb-2 font-mono text-cream/45`}>Operator&rsquo;s log</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3">
            {LOG.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="uppercase text-cream/45">{k}:</dt>
                <dd className="text-cream/85">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener"
          className="mt-5 inline-block text-sm font-bold text-ochre-light underline decoration-ochre-light/50 underline-offset-4 hover:text-cream"
        >
          Gặp Mira ở hankimthuy.com →
        </a>

        <p
          className="mt-5 truncate font-mono text-[10px] tracking-[0.18em] text-cream/35"
          aria-hidden="true"
        >
          MIRARI / 未来 / MIRA ✦ / NEXT STOP UNKNOWN
        </p>
      </section>
    </>
  );
}
