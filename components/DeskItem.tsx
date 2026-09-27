import type { CSSProperties, ReactNode } from "react";

export const DESK_LINK =
  "group flex flex-col items-center text-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60";

/**
 * One station off the rail: a small object resting on the page (with its
 * shadow on the desk), then the name and a line about it. The caller wraps it
 * in the link, so the whole thing is one target. `featured` is the station
 * that matters most: a bigger object, name and line.
 */
export default function DeskItem({
  object,
  tilt = 0,
  name,
  meta,
  description,
  featured = false,
}: {
  object: ReactNode;
  tilt?: number;
  name: string;
  meta?: ReactNode;
  description: string;
  featured?: boolean;
}) {
  return (
    <>
      <span
        className={`relative flex w-full items-end justify-center ${featured ? "h-40" : "h-28"}`}
        aria-hidden="true"
      >
        <span
          className={`desk-shadow absolute bottom-0 h-4 rounded-full ${featured ? "w-44" : "w-28"}`}
        />
        <span
          className="desk-object relative mb-2 flex items-end justify-center"
          style={{ "--tilt": `${tilt}deg` } as CSSProperties}
        >
          {object}
        </span>
      </span>
      <span
        className={`mt-4 block font-serif font-semibold italic ${featured ? "text-2xl" : "text-lg"} text-forest-deep transition-colors group-hover:text-terracotta`}
      >
        {name}
      </span>
      {meta && (
        <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-widest text-ochre">
          {meta}
        </span>
      )}
      <span
        className={`mt-1.5 block leading-relaxed text-ink/70 ${featured ? "max-w-[18rem] text-sm" : "max-w-[15rem] text-[13px]"}`}
      >
        {description}
      </span>
    </>
  );
}
