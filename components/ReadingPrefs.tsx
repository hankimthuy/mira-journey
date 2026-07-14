export default function ReadingPrefs({
  fontSize,
  lineHeight,
  onFontSizeChange,
  onLineHeightChange,
}: {
  fontSize: number;
  lineHeight: number;
  onFontSizeChange: (value: number) => void;
  onLineHeightChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-ochre mb-4">
        Đọc thoải mái
      </p>
      <label className="block text-[10px] text-forest mb-1">
        Cỡ chữ — {fontSize}px
      </label>
      <input
        type="range"
        min={16}
        max={24}
        value={fontSize}
        onChange={(e) => onFontSizeChange(Number(e.target.value))}
        className="w-full accent-terracotta mb-3"
      />
      <label className="block text-[10px] text-forest mb-1">
        Giãn dòng — {lineHeight}
      </label>
      <input
        type="range"
        min={1.4}
        max={2.2}
        step={0.1}
        value={lineHeight}
        onChange={(e) => onLineHeightChange(Number(e.target.value))}
        className="w-full accent-terracotta"
      />
    </div>
  );
}
