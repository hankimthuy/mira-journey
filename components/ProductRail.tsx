import {
  POC_STAGE,
  POC_STAGE_ORDER,
  POC_STATUS_NOTE,
  splitTagline,
  startYear,
  type Poc,
  type PocStage,
} from "@/lib/pocs";

export function StageDot({
  stage,
  className = "size-3.5",
}: {
  stage: PocStage;
  className?: string;
}) {
  return (
    <span
      className={`stage-dot stage-dot--${stage} ${className}`}
      aria-hidden="true"
    />
  );
}

/** The three stages, each with the question it answers. Doubles as a key for the dots. */
export function StageLegend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-ink/70">
      {POC_STAGE_ORDER.map((stage) => (
        <li key={stage} className="flex items-center gap-1.5">
          <StageDot stage={stage} className="size-3" />
          <span className="font-semibold text-forest-deep">
            {POC_STAGE[stage].label}
          </span>
          <span>— {POC_STAGE[stage].question}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Groups by the first year in each project's label, newest first. Projects
 * with no year go last rather than being dropped. Order inside a year is the
 * CMS sort_order, which getAllPocs already applied.
 */
function groupByYear(pocs: Poc[]) {
  const groups = new Map<number | null, Poc[]>();
  for (const poc of pocs) {
    const year = startYear(poc.yearLabel);
    groups.set(year, [...(groups.get(year) ?? []), poc]);
  }
  return [...groups.entries()].sort(([a], [b]) => {
    if (a === null) return 1;
    if (b === null) return -1;
    return b - a;
  });
}

/**
 * /products as a vertical time rail: one station per project. The dot's fill
 * carries the stage, so there is no badge or stamp competing with the name.
 * Details open in place with a native <details>, so this stays a server
 * component with no client JS.
 */
export default function ProductRail({ pocs }: { pocs: Poc[] }) {
  return (
    <div className="relative">
      <div
        className="product-rail-line absolute bottom-2 left-[6px] top-2 w-[2px]"
        aria-hidden="true"
      />
      {groupByYear(pocs).map(([year, items]) => (
        <section key={year ?? "undated"} className="mb-10 last:mb-0">
          <h2 className="relative mb-5 pl-8 font-serif text-xl italic text-forest/70">
            <span
              className="absolute left-0 top-1/2 h-[2px] w-3.5 -translate-y-1/2 bg-forest/40"
              aria-hidden="true"
            />
            {year ?? "Chưa ghi năm"}
          </h2>
          <ol className="space-y-8">
            {items.map((poc) => (
              <Station key={poc.id} poc={poc} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

/**
 * The case-study beats, in reading order. English on purpose — the same
 * register as the PoC / MVP / Live stage labels. Empty ones are skipped.
 */
const WRITE_UP = [
  { key: "painPoint", label: "Problem" },
  { key: "story", label: "Solution" },
  { key: "impact", label: "Impact" },
] as const satisfies readonly { key: keyof Poc; label: string }[];

function Station({ poc }: { poc: Poc }) {
  const stage = POC_STAGE[poc.stage];
  const note = POC_STATUS_NOTE[poc.status];
  const beats = WRITE_UP.filter(({ key }) => poc[key]);
  const hasDetails = Boolean(
    beats.length > 0 || poc.stack.length > 0 || poc.formerName
  );

  return (
    <li
      id={poc.id}
      className={`station station-reveal relative scroll-mt-24 pl-8 ${
        poc.status === "deprecated" ? "station--retired" : ""
      }`}
    >
      <StageDot stage={poc.stage} className="absolute left-0 top-[7px] size-3.5" />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h3 className="font-serif text-xl font-semibold italic text-forest-deep">
          {poc.link ? (
            <a
              href={poc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracotta"
            >
              {poc.name}
              <span className="ml-1 text-base not-italic text-terracotta">↗</span>
            </a>
          ) : (
            poc.name
          )}
        </h3>
        <p className="text-[12px] text-ink/55">
          {/* No `uppercase` — it would flatten "PoC" into "POC". */}
          <span className="font-bold tracking-wide text-forest-deep/80">
            {stage.label}
          </span>
          {poc.yearLabel && ` · ${poc.yearLabel}`}
          {note && ` · ${note}`}
        </p>
      </div>

      {poc.tagline && (
        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-ink/80">
          {splitTagline(poc.tagline).map((part, i) =>
            part.mark ? (
              <span key={i} className="bg-ochre-light/45 px-0.5 font-semibold text-forest-deep">
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </p>
      )}

      {hasDetails && (
        <details className="mt-2 max-w-2xl">
          <summary className="inline-flex items-center gap-1 text-[13px] font-semibold text-terracotta hover:underline">
            <span className="summary-caret text-[10px]" aria-hidden="true">
              ▶
            </span>
            {/* Names only the beats this project has, so the toggle never
                promises a section that isn't there. */}
            {beats.length > 0
              ? beats.map((b) => b.label).join(" · ")
              : "Chi tiết"}
          </summary>
          <div className="mt-3 space-y-3 border-l-2 border-ochre-light/70 pl-4 text-[14px] leading-relaxed text-ink/75">
            {poc.formerName && (
              <p className="text-[12px] italic text-ink/55">
                Tiền thân: {poc.formerName}
              </p>
            )}
            {beats.map(({ key, label }) => (
              <div key={key}>
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-ochre">
                  {label}
                </p>
                <p className="whitespace-pre-line">{poc[key]}</p>
              </div>
            ))}
            {poc.stack.length > 0 && (
              <p className="text-[12px] text-ink/55">{poc.stack.join(" · ")}</p>
            )}
          </div>
        </details>
      )}
    </li>
  );
}
