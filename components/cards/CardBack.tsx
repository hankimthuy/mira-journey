// Card back for Trạm Aha: night field, gold frame, a crescent moon among stars.
export default function CardBack() {
  return (
    <div className="card-face h-full w-full rounded-xl border border-ochre-light/40 bg-[#141b29] p-2 shadow-[0_8px_24px_rgb(0_0_0/0.45)]">
      <div className="card-back-pattern flex h-full w-full items-center justify-center rounded-lg border border-ochre-light/50">
        <svg viewBox="0 0 48 48" className="h-1/3 w-1/3 text-ochre-light" fill="none" aria-hidden="true">
          <path d="M30 9a15 15 0 1 0 9 26A13 13 0 1 1 30 9Z" fill="currentColor" opacity="0.9" />
          <g fill="currentColor">
            <path d="M38 8l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1Z" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="42" cy="26" r="0.9" />
            <circle cx="12" cy="40" r="0.8" />
          </g>
          <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 3" />
        </svg>
      </div>
    </div>
  );
}
