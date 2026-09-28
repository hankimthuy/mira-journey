import { AUTHOR_FULL_NAME, PORTFOLIO_URL } from "@/lib/seo";

const CARD_ID = "mimo-operator-card";

/** The crew portrait in /public: Mira with Mimo beside her. */
const CREW_PHOTO = "/mira.jpg";

// Security-print guilloche like the passport, plus faint dial rings.
const COVER: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 50% 0%, transparent 0 119px, rgb(232 184 109 / 0.08) 119px 120px, transparent 120px 179px, rgb(232 184 109 / 0.06) 179px 180px, transparent 180px), repeating-radial-gradient(circle at 80% 20%, transparent 0 16px, rgb(232 184 109 / 0.07) 16px 17px)",
};

const LABEL = "text-[10px] font-semibold uppercase tracking-[0.25em]";

// The operator picks the heading: a compass, like the one in the portrait.
const CompassIcon = (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="16" cy="16" r="13" />
    <circle cx="16" cy="16" r="9.5" strokeDasharray="1.5 2" strokeWidth="1" />
    <path d="M5.5 16 L16 14.5 L26.5 16 L16 17.5 Z" fill="currentColor" stroke="none" opacity="0.3" />
    {/* the needle hunts for a heading */}
    <g className="animate-compass-seek">
      <path d="M16 5.5 L18.5 16 L13.5 16 Z" fill="var(--color-terracotta)" stroke="none" />
      <path d="M16 26.5 L18.5 16 L13.5 16 Z" fill="currentColor" stroke="none" opacity="0.9" />
    </g>
    <circle cx="16" cy="16" r="1.6" fill="var(--color-forest-deep)" stroke="none" />
  </svg>
);

// The driver holds the wheel.
const WheelIcon = (
  <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {/* the wheel steers left and right */}
    <g className="animate-wheel-steer">
      <circle cx="16" cy="16" r="13" />
      <circle cx="16" cy="16" r="10" strokeWidth="1" opacity="0.5" />
      <circle cx="16" cy="16" r="3.2" fill="currentColor" stroke="none" opacity="0.9" />
      <path d="M13 16 H3.5 M19 16 H28.5 M16 19 V28.5" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="3" r="1.4" fill="var(--color-terracotta)" stroke="none" />
    </g>
  </svg>
);

// Motion for the two role icons, kept next to them. Rotation pivots on the
// centre of each icon's 32×32 view box.
const ICON_MOTION = `
@keyframes compass-seek {
  0%, 100% { transform: rotate(-28deg); }
  35% { transform: rotate(22deg); }
  55% { transform: rotate(8deg); }
  75% { transform: rotate(14deg); }
}
@keyframes wheel-steer {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-35deg); }
  60% { transform: rotate(30deg); }
}
.animate-compass-seek, .animate-wheel-steer { transform-box: view-box; transform-origin: 50% 50%; }
.animate-compass-seek { animation: compass-seek 3.2s ease-in-out infinite; }
.animate-wheel-steer { animation: wheel-steer 2.6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .animate-compass-seek, .animate-wheel-steer { animation: none; }
}
`;

type CrewMember = { name: string; role: string; icon: React.ReactNode };

const CREW: CrewMember[] = [
  { name: "Mira", role: "The operator", icon: CompassIcon },
  { name: "Mimo", role: "The driver", icon: WheelIcon },
];

// The two of them introduce themselves, back and forth.
const DIALOGUE = [
  {
    speaker: "Mira",
    text: "Chào, mình là Mira. Mình không biết chuyến này sẽ đi đến đâu, chỉ biết có những nơi mình muốn dừng lại.",
  },
  {
    speaker: "Mimo",
    text: "Còn mình là Mimo. Mình đưa Mira đi, để cô ấy có thời gian nhìn lại những nơi đã đi qua.",
  },
];

const HANDLE = "mirarii";

type Step = {
  /** Letters shown on the step; defaults to the handle. */
  letters?: string;
  lit: number[];
  word: string;
  lang?: string;
  meaning: React.ReactNode;
  star?: boolean;
};

// Each step lights up the letters of "mirarii" that spell a word hiding in
// it, climbing from the first word to the whole name, with Mimo on top.
const STEPS: Step[] = [
  {
    lit: [0, 1, 2, 3],
    word: "¡Mira!",
    lang: "Tây Ban Nha",
    meaning: (
      <>
        Câu thốt lên kiểu &ldquo;Nhìn&nbsp;kìa!&rdquo;. Cũng là câu cửa miệng mỗi khi cỗ máy
        cập bến một trạm dừng mới.
      </>
    ),
  },
  {
    lit: [0, 1, 2, 3, 4, 5],
    word: "mirari",
    lang: "Tiếng Latin",
    meaning: (
      <>
        Nghĩa là ngạc nhiên, trầm trồ. Họ hàng gần với <em>miracle</em> (điều kỳ diệu) và{" "}
        <em>mirror</em> (tấm gương): một bên làm mình &ldquo;ồ&rdquo; lên ngạc nhiên, một bên
        để soi chiếu lại chính mình.
      </>
    ),
  },
  {
    lit: [0, 1, 2, 3, 5],
    word: "mirai (未来)",
    lang: "Tiếng Nhật",
    meaning: (
      <>
        Nghĩa là tương lai. Nhìn quá khứ để thấy rõ hơn đường đi nước bước ở phía trước, nối
        dài cả những tầm nhìn hay trải nghiệm sâu sắc.
      </>
    ),
  },
  {
    lit: [0, 1, 2, 3, 4, 5, 6],
    word: "mira",
    lang: "Một ngôi sao",
    meaning: (
      <>
        Lấy cảm hứng từ một ngôi sao có ánh sáng lúc tỏ lúc mờ, không cố định nhưng chưa từng
        bỏ quên bầu trời.
      </>
    ),
    star: true,
  },
  {
    letters: "mimo",
    lit: [0, 1, 2, 3],
    word: "Mimo",
    meaning: <>Người bạn đồng hành nhỏ síu.</>,
  },
];

// How far each step sits in from the left, so the rows climb like stairs.
const STEP_INDENT = ["0rem", "1.25rem", "2.5rem", "3.75rem", "5rem"];

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
        {/* One archival print of the whole crew, pinned slightly askew. */}
        <div className="relative mx-auto mt-4 w-full max-w-[17rem] -rotate-1 rounded-[3px] border border-cream/25 bg-cream p-1.5 pb-2 shadow-[0_10px_22px_rgb(0_0_0/0.3)]">
          {/* photo corners, like an archival album */}
          <span className="absolute -left-1.5 -top-1.5 size-4 border-l-2 border-t-2 border-ochre-light/80" aria-hidden="true" />
          <span className="absolute -bottom-1.5 -right-1.5 size-4 border-b-2 border-r-2 border-ochre-light/80" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CREW_PHOTO}
            alt={`Mira (${AUTHOR_FULL_NAME}) tựa cằm mỉm cười, Mimo ngồi bên cạnh cầm tấm bản đồ`}
            className="block aspect-square w-full"
          />
          <span
            className="absolute -bottom-4 -right-5 grid size-14 rotate-[-14deg] place-items-center rounded-full border-2 border-terracotta/80 bg-forest-deep/85 text-center text-[7px] font-bold uppercase leading-tight tracking-[0.08em] text-terracotta"
            aria-hidden="true"
          >
            Operator
            <br />· Mira ·
          </span>
        </div>
        <style>{ICON_MOTION}</style>
        <ul className="mt-6 grid grid-cols-2 gap-4">
          {CREW.map((m) => (
            <li key={m.name} className="flex items-center justify-center gap-3">
              <span
                className="grid shrink-0 place-items-center rounded-full border border-ochre-light/40 bg-black/20 text-ochre-light"
                style={{ width: 44, height: 44 }}
              >
                {m.icon}
              </span>
              <div>
                <p className="font-serif text-lg font-semibold italic leading-tight text-ochre-light">{m.name}</p>
                <p className="whitespace-nowrap font-serif text-[13px] italic text-cream/65">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-3 border-y border-dashed border-cream/15 py-5">
          {DIALOGUE.map((line, i) => {
            const right = i % 2 === 1;
            return (
              <figure
                key={line.speaker}
                className={`max-w-[85%] border border-cream/15 bg-black/15 px-4 py-2.5 ${
                  right ? "ml-auto rounded-[16px_4px_16px_16px] text-right" : "rounded-[4px_16px_16px_16px]"
                }`}
              >
                <figcaption className={`${LABEL} text-ochre-light/90`}>{line.speaker}</figcaption>
                <blockquote className="mt-1 font-serif text-[15px] italic leading-relaxed text-cream/90">
                  &ldquo;{line.text}&rdquo;
                </blockquote>
              </figure>
            );
          })}
        </div>

        {/* The name, climbing a word at a time */}
        <div className="mt-7 text-center">
          <p className="font-serif text-4xl font-semibold italic text-ochre-light">Mira</p>
          <p className="mt-1 font-mono text-xs tracking-wider text-cream/55">mira.mirarii</p>
          <p className="mt-3 text-[13px] italic text-cream/75">
            Bạn có từng thắc mắc tại sao lại là Mira?
          </p>
        </div>

        {/* Visually the first step sits at the bottom and the name climbs up;
            the DOM keeps reading order for screen readers. */}
        <ol className="mt-6 flex flex-col-reverse">
          {STEPS.map((s, i) => (
            <li
              key={s.word}
              className="border-b border-l border-ochre-light/30 pb-2 pl-3 pt-3"
              style={{ marginLeft: STEP_INDENT[i] }}
            >
              <p className="font-mono text-[17px] tracking-[0.3em]" aria-label={s.word}>
                {[...(s.letters ?? HANDLE)].map((ch, j) => (
                  <span
                    key={j}
                    className={s.lit.includes(j) ? "text-ochre-light" : "text-cream/15"}
                    aria-hidden="true"
                  >
                    {ch}
                  </span>
                ))}
                {s.star && (
                  <span
                    className="ml-1 inline-block text-ochre-light animate-twinkle-soft motion-reduce:animate-none"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                )}
              </p>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
                <span className="font-serif text-base font-semibold italic text-ochre-light">{s.word}</span>
                {s.lang && (
                  <span className="text-[10px] uppercase tracking-[0.18em] text-cream/45">{s.lang}</span>
                )}
              </p>
              <p className="text-pretty text-[13px] leading-relaxed text-cream/85">{s.meaning}</p>
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
          className="mt-5 truncate font-mono text-[10px] tracking-[0.08em] text-cream/35 sm:tracking-[0.18em]"
          aria-hidden="true"
        >
          MIRARI / 未来 / MIRA ✦ / NEXT STOP UNKNOWN
        </p>
      </section>
    </>
  );
}
