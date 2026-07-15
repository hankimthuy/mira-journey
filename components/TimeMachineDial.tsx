const SPARKLE_PATH =
  "M0 -9 C1 -2 2 -1 9 0 C2 1 1 2 0 9 C-1 2 -2 1 -9 0 C-2 -1 -1 -2 0 -9 Z";

const SPARKLES = [
  { x: 90, y: 70, scale: 0.9, color: "var(--color-ochre)" },
  { x: 400, y: 60, scale: 1.2, color: "var(--color-terracotta)" },
  { x: 450, y: 150, scale: 0.7, color: "var(--color-ochre-light)" },
  { x: 60, y: 170, scale: 0.6, color: "var(--color-terracotta)" },
  { x: 340, y: 40, scale: 0.5, color: "var(--color-ochre)" },
];

export default function TimeMachineDial({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} style={{ aspectRatio: "520 / 360" }}>
      <svg
        viewBox="0 0 520 360"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Minh họa bảng điều khiển cỗ máy thời gian, có Mimo ngồi lái"
      >
        <defs>
          <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-ochre-light)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-ochre-light)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-forest-deep)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-forest-deep)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* glow */}
        <ellipse cx="230" cy="150" rx="180" ry="170" fill="url(#haloGlow)" />

        {/* orbiting particles */}
        <circle cx="380" cy="90" r="5" fill="var(--color-terracotta)" opacity="0.8" />
        <circle cx="78" cy="230" r="4" fill="var(--color-forest)" opacity="0.6" />
        <circle cx="392" cy="220" r="3.5" fill="var(--color-ochre)" opacity="0.7" />

        {/* sparkles */}
        {SPARKLES.map((s, i) => (
          <path
            key={i}
            d={SPARKLE_PATH}
            fill={s.color}
            opacity="0.85"
            transform={`translate(${s.x} ${s.y}) scale(${s.scale})`}
          />
        ))}

        {/* ground shadow */}
        <ellipse cx="262" cy="352" rx="230" ry="20" fill="url(#groundShadow)" />

        {/* platform */}
        <path d="M40 300 L480 300 L444 344 L76 344 Z" fill="var(--color-forest-deep)" />
        <path d="M40 300 L480 300 L468 312 L52 312 Z" fill="var(--color-forest)" />

        {/* right lever pedestal */}
        <rect x="360" y="266" width="110" height="34" rx="8" fill="var(--color-paper)" stroke="var(--color-forest)" strokeWidth="3" />
        {[385, 415, 445].map((x) => (
          <g key={x}>
            <line x1={x} y1="266" x2={x} y2="226" stroke="var(--color-forest)" strokeWidth="4" strokeLinecap="round" />
            <circle cx={x} cy="222" r="9" fill="var(--color-terracotta)" />
          </g>
        ))}

        {/* antenna with signal pulse */}
        <line x1="70" y1="228" x2="70" y2="55" stroke="var(--color-forest)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="70" cy="50" r="15" fill="none" stroke="var(--color-terracotta)" strokeWidth="2" opacity="0.4" />
        <circle cx="70" cy="50" r="7" fill="var(--color-terracotta)" />

        {/* left console box */}
        <rect x="60" y="228" width="150" height="68" rx="12" fill="var(--color-paper)" stroke="var(--color-forest)" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={80}
            y={254 + i * 12}
            width={110 - i * 14}
            height="6"
            rx="3"
            fill="var(--color-ochre)"
            opacity={0.85 - i * 0.15}
          />
        ))}
        {/* joystick */}
        <line x1="100" y1="228" x2="100" y2="198" stroke="var(--color-forest)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="100" cy="194" r="10" fill="var(--color-ochre)" />
      </svg>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mimo.gif"
        alt="Mimo, mascot đồng hành của blog, ngồi lái cỗ máy thời gian"
        className="absolute drop-shadow-lg"
        style={{ left: "37%", width: "36%", bottom: "34%" }}
      />
    </div>
  );
}
