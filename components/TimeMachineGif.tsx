type Star = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  color: string;
  radius: string;
  delay: string;
};

const STARS: Star[] = [
  { top: "6%", left: "8%", size: 14, color: "var(--color-ochre)", radius: "60% 40% 55% 45% / 45% 55% 40% 60%", delay: "0s" },
  { top: "12%", right: "10%", size: 10, color: "var(--color-terracotta)", radius: "50% 50% 40% 60% / 55% 45% 60% 40%", delay: "0.6s" },
  { top: "42%", right: "4%", size: 8, color: "var(--color-ochre-light)", radius: "40% 60% 60% 40% / 50% 50% 50% 50%", delay: "1.1s" },
  { bottom: "10%", left: "5%", size: 9, color: "var(--color-terracotta)", radius: "55% 45% 50% 50% / 40% 60% 45% 55%", delay: "1.6s" },
  { bottom: "18%", right: "16%", size: 12, color: "var(--color-ochre)", radius: "45% 55% 60% 40% / 60% 40% 55% 45%", delay: "0.3s" },
];

export default function TimeMachineGif({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} style={{ aspectRatio: "16 / 9" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/time-machine.gif"
        alt="Cỗ máy thời gian đang chuyển động, có Mimo đứng lái"
        className="absolute inset-0 h-full w-full rounded-[3px] object-cover"
      />

      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle-soft"
          style={{
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            background: s.color,
            borderRadius: s.radius,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
