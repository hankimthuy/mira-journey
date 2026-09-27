/**
 * The travel log before its first trip: one checked bag, covered in stickers
 * for what it will carry (posts, ideas, people, memories — all mixed in, not
 * sorted), with a baggage tag beside it. Same paper as the passport above.
 */

const PAPER: React.CSSProperties = {
  backgroundImage:
    "repeating-radial-gradient(circle at 70% 60%, transparent 0 14px, rgb(53 81 59 / 0.045) 14px 15px), repeating-linear-gradient(115deg, transparent 0 22px, rgb(201 138 59 / 0.05) 22px 23px)",
};

/** Travel decals stuck on the case — positioned over the SVG body, in %. */
const STICKERS = [
  { label: "Bài viết", className: "left-[14%] top-[36%] -rotate-[8deg] bg-cream text-forest-deep" },
  { label: "Ý tưởng", className: "right-[12%] top-[31%] rotate-[7deg] rounded-full bg-ochre-light text-forest-deep" },
  { label: "Con người", className: "left-[20%] top-[60%] rotate-[4deg] bg-forest-deep text-cream" },
  { label: "Kỉ niệm", className: "right-[14%] top-[66%] -rotate-[6deg] rounded-full border border-dashed border-cream/80 bg-transparent text-cream" },
];

function SuitcaseArt() {
  return (
    <svg viewBox="0 0 240 220" className="h-auto w-full" aria-hidden="true">
      {/* handle */}
      <path
        d="M92 46V30a10 10 0 0 1 10-10h36a10 10 0 0 1 10 10v16"
        fill="none"
        stroke="var(--color-forest-deep)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* body */}
      <rect x="22" y="44" width="196" height="148" rx="18" fill="var(--color-terracotta)" />
      <rect x="22" y="44" width="196" height="148" rx="18" fill="url(#case-shade)" />
      {/* seam + corner guards */}
      <path d="M34 118h172" stroke="rgb(0 0 0 / 0.12)" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M22 70V62a18 18 0 0 1 18-18h8M218 70V62a18 18 0 0 0-18-18h-8M22 166v8a18 18 0 0 0 18 18h8M218 166v8a18 18 0 0 1-18 18h-8" fill="none" stroke="var(--color-forest-deep)" strokeWidth="5" strokeLinecap="round" />
      {/* straps */}
      <rect x="68" y="44" width="14" height="148" fill="var(--color-forest-deep)" opacity="0.9" />
      <rect x="158" y="44" width="14" height="148" fill="var(--color-forest-deep)" opacity="0.9" />
      <rect x="64" y="110" width="22" height="16" rx="3" fill="var(--color-ochre-light)" />
      <rect x="154" y="110" width="22" height="16" rx="3" fill="var(--color-ochre-light)" />
      {/* wheels */}
      <circle cx="56" cy="202" r="9" fill="var(--color-forest-deep)" />
      <circle cx="184" cy="202" r="9" fill="var(--color-forest-deep)" />
      <circle cx="56" cy="202" r="3" fill="var(--color-cream)" />
      <circle cx="184" cy="202" r="3" fill="var(--color-cream)" />
      <defs>
        <linearGradient id="case-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Luggage() {
  return (
    <div
      className="grid items-center gap-8 overflow-hidden rounded-2xl border border-forest/10 bg-paper px-6 py-8 shadow-[0_18px_30px_rgb(36_56_42/0.1)] sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-10 sm:px-10"
      style={PAPER}
    >
      <div className="luggage-sway relative mx-auto w-full max-w-[13rem] sm:max-w-none">
        <SuitcaseArt />
        {STICKERS.map((s) => (
          <span
            key={s.label}
            className={`absolute whitespace-nowrap rounded-[4px] px-2 py-0.5 font-serif text-[11px] font-semibold italic shadow-sm sm:text-[12px] ${s.className}`}
          >
            {s.label}
          </span>
        ))}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ochre">
          Hành lý ký gửi<span className="hidden sm:inline"> · Checked baggage</span>
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold italic leading-snug text-forest-deep">
          Chuyến đầu tiên đang xếp đồ
        </h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/75">
          Bài viết, ý tưởng, con người và kỉ niệm dọc đường — gom hết vào một vali, mở ra khi
          chuyến đi bắt đầu.
        </p>

        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[13px]">
          <dt className="text-ink/50">Chủ hành lý</dt>
          <dd className="font-serif italic text-forest-deep">Hàn Kim Thủy</dd>
          <dt className="text-ink/50">Điểm đến</dt>
          <dd className="font-serif italic text-forest-deep">Chưa công bố</dd>
          <dt className="text-ink/50">Trạng thái</dt>
          <dd className="flex items-center gap-2 font-semibold text-terracotta">
            <span className="station-dot size-2 rounded-full bg-terracotta" aria-hidden="true" />
            Đang xếp đồ
          </dd>
        </dl>

        <p
          className="mt-5 truncate border-t border-dashed border-forest/20 pt-3 font-mono text-[11px] tracking-[0.18em] text-ink/40"
          aria-hidden="true"
        >
          MIRA0001&lt;&lt;HANH&lt;LY&lt;&lt;CHO&lt;BOC&lt;XEP&lt;&lt;&lt;&lt;&lt;&lt;
        </p>
      </div>
    </div>
  );
}
