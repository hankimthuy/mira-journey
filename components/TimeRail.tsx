/**
 * The dashed track Mimo rides along. On mobile it is its own band above the
 * stations; from lg: up it is laid over the station row so the dots sit on
 * it (centre of this h-14 box lands on the dots' centre, 7px down).
 */
export default function TimeRail() {
  return (
    <div
      className="pointer-events-none relative mb-3 h-14 lg:absolute lg:inset-x-0 lg:-top-[21px] lg:mb-0"
      aria-hidden="true"
    >
      <div
        className="time-rail-line absolute left-0 right-0 top-1/2 h-[2px]"
        style={{ transform: "translateY(-50%)" }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mimo.gif"
        alt=""
        className="animate-ride-along absolute top-1/2 h-11 w-11 sm:h-9 sm:w-9 drop-shadow-md"
        style={{ ["--mimo-w" as string]: "44px", transform: "translateY(-58%)" }}
      />
    </div>
  );
}
