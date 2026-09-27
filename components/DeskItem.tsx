import type { CSSProperties, ReactNode } from "react";

export const DESK_LINK =
  "group flex flex-col items-center text-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta/60";

/**
 * One station off the rail: a small object resting on the page (with its
 * shadow on the desk), then the name and a line about it. The caller wraps it
 * in the link, so the whole thing is one target.
 */
export default function DeskItem({
  object,
  tilt = 0,
  name,
  meta,
  description,
}: {
  object: ReactNode;
  tilt?: number;
  name: string;
  meta?: ReactNode;
  description: string;
}) {
  return (
    <>
      <span className="relative flex h-28 w-full items-end justify-center" aria-hidden="true">
        <span className="desk-shadow absolute bottom-0 h-4 w-28 rounded-full" />
        <span
          className="desk-object relative mb-2 flex items-end justify-center"
          style={{ "--tilt": `${tilt}deg` } as CSSProperties}
        >
          {object}
        </span>
      </span>
      <span className="mt-4 block font-serif text-lg font-semibold italic text-forest-deep transition-colors group-hover:text-terracotta">
        {name}
      </span>
      {meta && (
        <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-widest text-ochre">
          {meta}
        </span>
      )}
      <span className="mt-1.5 block max-w-[15rem] text-[13px] leading-relaxed text-ink/70">
        {description}
      </span>
    </>
  );
}
