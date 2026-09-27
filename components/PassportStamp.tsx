import { formatVisited, isAbroad, slugHash, type Place } from "@/lib/places";

// Stamp inks, all from the site palette. The ochre is deepened so the date
// stays legible on cream paper.
const INKS = ["#b5563a", "#35513b", "#9c6a26", "#24382a"];

/** Tilt and ink for one stamp, stable per slug. */
export function stampStyle(slug: string) {
  const h = slugHash(slug);
  return {
    ink: INKS[h % INKS.length],
    tilt: ((h >> 3) % 19) - 9,
    // Stamps are never pressed dead-centre in their box.
    dx: ((h >> 8) % 9) - 4,
    dy: ((h >> 12) % 9) - 4,
  };
}

/**
 * One ink stamp. Abroad: round, name around the rim like an entry stamp.
 * Domestic: a double-bordered rectangle. The rough edge and patchy ink come
 * from an SVG filter, so no two stamps share the exact same texture.
 */
export default function PassportStamp({
  place,
  size = 132,
}: {
  place: Place;
  /** Rendered width in px; height follows the stamp's own shape. */
  size?: number;
}) {
  const { ink } = stampStyle(place.slug);
  const id = `stamp-${place.slug}`;
  const date = formatVisited(place);
  const abroad = isAbroad(place);
  const label = `${place.name}${place.region ? `, ${place.region}` : ""}${
    abroad ? `, ${place.country}` : ""
  } — ${place.visitedOn ? `tháng ${date.replace("·", "/")}` : "đã ghé"}`;

  const filter = (
    <defs>
      <filter id={`${id}-ink`} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          seed={slugHash(place.slug) % 97}
          result="noise"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" result="rough" />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.2 1.4"
          result="patches"
        />
        <feComposite in="rough" in2="patches" operator="in" />
      </filter>
    </defs>
  );

  if (abroad) {
    const nameSize = place.name.length > 10 ? 13 : 16;
    return (
      <svg
        viewBox="0 0 140 140"
        width={size}
        height={size}
        role="img"
        aria-label={label}
        className="overflow-visible"
      >
        {filter}
        <g filter={`url(#${id}-ink)`} fill="none" stroke={ink} opacity="0.92">
          <circle cx="70" cy="70" r="64" strokeWidth="3.2" />
          <circle cx="70" cy="70" r="58" strokeWidth="1.1" />
          <circle cx="70" cy="70" r="36" strokeWidth="1.4" strokeDasharray="3 2.5" />
          <path id={`${id}-top`} d="M 22 70 A 48 48 0 0 1 118 70" stroke="none" />
          <path id={`${id}-bottom`} d="M 17 70 A 53 53 0 0 0 123 70" stroke="none" />
          <text
            fill={ink}
            stroke="none"
            fontSize={nameSize}
            fontWeight="700"
            letterSpacing="2"
            textAnchor="middle"
            className="font-sans uppercase"
          >
            <textPath href={`#${id}-top`} startOffset="50%">
              {place.name}
            </textPath>
          </text>
          <text
            fill={ink}
            stroke="none"
            fontSize="9"
            fontWeight="600"
            letterSpacing="2.5"
            textAnchor="middle"
            className="font-sans uppercase"
          >
            <textPath href={`#${id}-bottom`} startOffset="50%">
              ✦ {place.country} ✦
            </textPath>
          </text>
          <text
            x="70"
            y="68"
            fill={ink}
            stroke="none"
            fontSize="8"
            fontWeight="600"
            letterSpacing="1.5"
            textAnchor="middle"
            className="font-sans"
          >
            ARRIVED
          </text>
          <text
            x="70"
            y="84"
            fill={ink}
            stroke="none"
            fontSize="15"
            fontWeight="700"
            textAnchor="middle"
            className="font-sans tabular-nums"
          >
            {date}
          </text>
        </g>
      </svg>
    );
  }

  // Long names get squeezed to the stamp's width rather than overflowing it.
  const squeeze = place.name.length > 11;
  return (
    <svg
      viewBox="0 0 160 112"
      width={size * 1.1}
      height={(size * 1.1 * 112) / 160}
      role="img"
      aria-label={label}
      className="overflow-visible"
    >
      {filter}
      <g filter={`url(#${id}-ink)`} fill="none" stroke={ink} opacity="0.92">
        <rect x="4" y="4" width="152" height="104" rx="10" strokeWidth="3.2" />
        <rect x="10" y="10" width="140" height="92" rx="6" strokeWidth="1.1" />
        <line x1="22" y1="62" x2="138" y2="62" strokeWidth="1" strokeDasharray="4 3" />
        <text
          x="80"
          y="32"
          fill={ink}
          stroke="none"
          fontSize="9"
          fontWeight="600"
          letterSpacing="2"
          textAnchor="middle"
          className="font-sans uppercase"
        >
          {place.region || place.country}
        </text>
        <text
          x="80"
          y="53"
          fill={ink}
          stroke="none"
          fontSize="19"
          fontWeight="700"
          textAnchor="middle"
          className="font-serif italic"
          {...(squeeze ? { textLength: 124, lengthAdjust: "spacingAndGlyphs" } : {})}
        >
          {place.name}
        </text>
        <text
          x="80"
          y="86"
          fill={ink}
          stroke="none"
          fontSize="15"
          fontWeight="700"
          letterSpacing="1"
          textAnchor="middle"
          className="font-sans tabular-nums"
        >
          {date}
        </text>
      </g>
    </svg>
  );
}
