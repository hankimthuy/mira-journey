// Shared back for both decks: forest field, ochre frame, a gear in the
// middle echoing the header's GearMark.
export default function CardBack() {
  return (
    <div className="card-face h-full w-full rounded-xl border border-forest-deep/40 bg-forest p-2 shadow-md">
      <div className="card-back-pattern flex h-full w-full items-center justify-center rounded-lg border border-ochre-light/60">
        <svg viewBox="0 0 24 24" className="h-1/4 w-1/4 text-ochre-light" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6" />
          </g>
          <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
}
