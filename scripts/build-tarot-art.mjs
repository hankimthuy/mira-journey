// Builds the illustrated tarot faces for Trạm Aha into public/cards/tarot/<id>.svg.
// Run with `npm run cards:art` after changing anything here; the SVGs are
// committed, so neither DiceBear nor this script ships to the browser.
//
// Portraits: DiceBear "Lorelei" by Lisa Wischofsky (CC0 1.0).
// Everything else (backgrounds, scenes, suit emblems) is drawn below.

import { createAvatar } from "@dicebear/core";
import * as lorelei from "@dicebear/lorelei";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "cards", "tarot");
const W = 140;
const H = 240;
const INK = "141b29";
const GOLD = "#e8b86d";
const CREAM = "#f5ecd9";

// ---------- helpers ----------

function rng(seedText) {
  let seed = 0;
  for (const ch of seedText) seed = (seed * 31 + ch.charCodeAt(0)) % 2147483647;
  seed = seed || 7;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

const pick = (next, list) => list[Math.floor(next() * list.length)];

// Softly feminine Lorelei hair styles (picked by eye from the 48 variants).
const HAIR = [14, 15, 16, 17, 18, 19, 21, 23, 24, 26, 29, 31, 32, 35, 37, 40, 41, 42, 45, 46, 48].map(
  (n) => `variant${String(n).padStart(2, "0")}`
);
const SKIN = ["f5e1c8", "eac4a0", "d9a27c", "b7835f", "8d5a3b"];
const HAIR_COLOR = ["2b1d17", "4a2e22", "6b3f2a", "a8482f", "e8b86d", "1f2433"];

function portrait({ id, size, x, y, hair, hairColor, skin, flowers, earrings, mouth }) {
  const next = rng(id + "-face");
  const svg = createAvatar(lorelei, {
    seed: id,
    hair: [hair ?? pick(next, HAIR)],
    hairColor: [hairColor ?? pick(next, HAIR_COLOR)],
    skinColor: [skin ?? pick(next, SKIN)],
    beardProbability: 0,
    glassesProbability: 0,
    frecklesProbability: next() < 0.25 ? 100 : 0,
    earringsProbability: earrings === false ? 0 : 100,
    earringsColor: ["e8b86d"],
    hairAccessoriesProbability: flowers ? 100 : 0,
    hairAccessoriesColor: ["c9674a"],
    mouth: mouth ?? [pick(next, ["happy01", "happy02", "happy03", "happy05", "happy08", "happy13"])],
    eyebrowsColor: [INK],
    eyesColor: [INK],
    mouthColor: [INK],
    noseColor: [INK],
  }).toString();
  // Nest DiceBear's <svg> as a positioned child; prefix ids so filters and
  // masks inside one card never collide.
  return svg
    .replace("<svg ", `<svg x="${x}" y="${y}" width="${size}" height="${size}" `)
    .replace(/id="([^"]+)"/g, `id="${id}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${id}-$1)`);
}

// ---------- palettes ----------

const PALETTE = {
  major: { top: "#1b2436", bottom: "#33294a", ground: "#221c33", accent: GOLD, robe: "#5b3f7a" },
  wands: { top: "#3a1f1c", bottom: "#a2512f", ground: "#5c2e22", accent: "#f2a65a", robe: "#6e2a22" },
  cups: { top: "#10283a", bottom: "#2f6b86", ground: "#17405a", accent: "#9fd3e0", robe: "#1d4a66" },
  swords: { top: "#232538", bottom: "#6d6f93", ground: "#3a3c57", accent: "#d8dcf0", robe: "#44466a" },
  pentacles: { top: "#1c2a1f", bottom: "#5d7a45", ground: "#2f4527", accent: "#e7cf7a", robe: "#3c5530" },
};

function background(p) {
  return `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${p.top}"/><stop offset="1" stop-color="${p.bottom}"/>
  </linearGradient>
  <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="${p.accent}" stop-opacity="0.45"/><stop offset="1" stop-color="${p.accent}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>`;
}

// ---------- scene props ----------

function stars(next, n, color = CREAM, area = [8, 30, 124, 70]) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = area[0] + next() * area[2];
    const y = area[1] + next() * area[3];
    const r = 0.5 + next() * 1.1;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${color}" opacity="${(0.5 + next() * 0.5).toFixed(2)}"/>`;
  }
  return out;
}

const star4 = (x, y, r, c) =>
  `<path d="M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28}L${x + r} ${y}L${x + r * 0.28} ${y + r * 0.28}L${x} ${y + r}L${x - r * 0.28} ${y + r * 0.28}L${x - r} ${y}L${x - r * 0.28} ${y - r * 0.28}Z" fill="${c}"/>`;

function star8(x, y, r, c) {
  let d = "";
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI * i) / 8 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.42;
    d += `${i ? "L" : "M"}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`;
  }
  return `<path d="${d}Z" fill="${c}"/>`;
}

function sun(x, y, r, c = GOLD) {
  let rays = "";
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI * 2 * i) / 16;
    const r1 = r * 1.25;
    const r2 = r * (i % 2 ? 1.6 : 1.85);
    rays += `<line x1="${(x + Math.cos(a) * r1).toFixed(1)}" y1="${(y + Math.sin(a) * r1).toFixed(1)}" x2="${(x + Math.cos(a) * r2).toFixed(1)}" y2="${(y + Math.sin(a) * r2).toFixed(1)}" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>`;
  }
  return `<circle cx="${x}" cy="${y}" r="${r * 2.6}" fill="url(#halo)"/>${rays}<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
}

const crescent = (x, y, r, c = GOLD) =>
  `<circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="url(#halo)"/><path d="M${x + r * 0.2} ${y - r}a${r} ${r} 0 1 0 ${r * 0.75} ${r * 1.72}A${r * 0.82} ${r * 0.82} 0 1 1 ${x + r * 0.2} ${y - r}Z" fill="${c}"/>`;

const fullMoon = (x, y, r, c = CREAM) =>
  `<circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="url(#halo)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x - r * 0.3}" cy="${y - r * 0.2}" r="${r * 0.18}" fill="#000" opacity="0.08"/><circle cx="${x + r * 0.35}" cy="${y + r * 0.3}" r="${r * 0.12}" fill="#000" opacity="0.08"/>`;

const mountains = (c, y = 150) =>
  `<path d="M0 ${y}L28 ${y - 34}L46 ${y - 16}L72 ${y - 46}L98 ${y - 14}L116 ${y - 30}L140 ${y - 6}V${H}H0Z" fill="${c}" opacity="0.85"/>`;

const hills = (c, y = 172) =>
  `<path d="M0 ${y}Q35 ${y - 18} 70 ${y - 6}T140 ${y - 10}V${H}H0Z" fill="${c}"/>`;

function waves(c, y = 176, rows = 3) {
  let out = `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${c}" opacity="0.9"/>`;
  for (let r = 0; r < rows; r++) {
    const yy = y + 6 + r * 9;
    out += `<path d="M0 ${yy}q8.75 -4 17.5 0t17.5 0t17.5 0t17.5 0t17.5 0t17.5 0t17.5 0t17.5 0" fill="none" stroke="${CREAM}" stroke-opacity="${0.35 - r * 0.08}" stroke-width="1.1"/>`;
  }
  return out;
}

function clouds(c) {
  return `<g fill="${c}" opacity="0.35">
  <ellipse cx="26" cy="46" rx="22" ry="7"/><ellipse cx="40" cy="41" rx="14" ry="7"/>
  <ellipse cx="112" cy="62" rx="24" ry="6"/><ellipse cx="100" cy="57" rx="12" ry="6"/>
</g>`;
}

function wind(c) {
  return `<g fill="none" stroke="${c}" stroke-width="1.2" stroke-linecap="round" opacity="0.5">
  <path d="M8 96q18 -6 30 0t22 -2"/><path d="M96 88q14 -5 24 0t14 -1"/><path d="M12 124q10 -4 20 0"/>
</g>`;
}

function sparks(next, c) {
  let out = "";
  for (let i = 0; i < 9; i++) {
    const x = 10 + next() * 120;
    const y = 40 + next() * 100;
    out += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}q1.5 -4 0 -7q3 3 1.5 7Z" fill="${c}" opacity="${(0.4 + next() * 0.4).toFixed(2)}"/>`;
  }
  return out;
}

function flowers(y, c1, c2) {
  let out = "";
  for (let i = 0; i < 7; i++) {
    const x = 10 + i * 20;
    const yy = y + (i % 2) * 4;
    out += `<line x1="${x}" y1="${yy}" x2="${x}" y2="${yy + 14}" stroke="#3f6b3a" stroke-width="1.2"/>`;
    for (let k = 0; k < 5; k++) {
      const a = (Math.PI * 2 * k) / 5;
      out += `<circle cx="${(x + Math.cos(a) * 2.6).toFixed(1)}" cy="${(yy + Math.sin(a) * 2.6).toFixed(1)}" r="2" fill="${i % 2 ? c1 : c2}"/>`;
    }
    out += `<circle cx="${x}" cy="${yy}" r="1.3" fill="${GOLD}"/>`;
  }
  return out;
}

const tower = () => `<g>
  <path d="M96 196V92h26v104Z" fill="#3a3350" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="0.8"/>
  <path d="M92 92h34l-6 -12h-22Z" fill="${GOLD}"/>
  <rect x="104" y="112" width="8" height="12" rx="4" fill="${GOLD}" opacity="0.8"/>
  <rect x="104" y="140" width="8" height="12" rx="4" fill="${GOLD}" opacity="0.6"/>
  <path d="M120 30l-12 30h9l-10 26 22 -34h-10l9 -22Z" fill="${CREAM}"/>
</g>`;

function wheel(x, y, r, c = GOLD) {
  let spokes = "";
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI * i) / 4;
    spokes += `<line x1="${x}" y1="${y}" x2="${(x + Math.cos(a) * r).toFixed(1)}" y2="${(y + Math.sin(a) * r).toFixed(1)}" stroke="${c}" stroke-width="1"/>`;
  }
  return `<circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="url(#halo)"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r * 0.6}" fill="none" stroke="${c}" stroke-width="1"/>${spokes}<circle cx="${x}" cy="${y}" r="${r * 0.15}" fill="${c}"/>`;
}

const scales = (x, y, c = GOLD) => `<g stroke="${c}" stroke-width="1.4" fill="none" stroke-linecap="round">
  <line x1="${x}" y1="${y - 14}" x2="${x}" y2="${y + 16}"/><line x1="${x - 18}" y1="${y - 8}" x2="${x + 18}" y2="${y - 8}"/>
  <path d="M${x - 18} ${y - 8}l-6 12h12Z" fill="${c}" fill-opacity="0.3"/><path d="M${x + 18} ${y - 8}l-6 12h12Z" fill="${c}" fill-opacity="0.3"/>
  <circle cx="${x}" cy="${y - 16}" r="2" fill="${c}"/>
</g>`;

const infinity = (x, y, c = GOLD) =>
  `<path d="M${x} ${y}c-4 -6 -12 -6 -12 0s8 6 12 0s12 -6 12 0s-8 6 -12 0Z" fill="none" stroke="${c}" stroke-width="1.6"/>`;

const crown = (x, y, c = GOLD, s = 1) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M-14 0l3 -12l6 7l5 -11l5 11l6 -7l3 12Z" fill="${c}" stroke="#${INK}" stroke-width="0.8" stroke-linejoin="round"/>`;

const pillars = () => `<g>
  <rect x="6" y="60" width="16" height="140" fill="#12151f"/><text x="14" y="84" font-family="Georgia,serif" font-size="11" fill="${CREAM}" text-anchor="middle">B</text>
  <rect x="118" y="60" width="16" height="140" fill="${CREAM}" opacity="0.9"/><text x="126" y="84" font-family="Georgia,serif" font-size="11" fill="#12151f" text-anchor="middle">J</text>
</g>`;

const heart = (x, y, s, c) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 6C-8 -2 -12 -8 -6 -11C-3 -12.5 -1 -11 0 -9C1 -11 3 -12.5 6 -11C12 -8 8 -2 0 6Z" fill="${c}"/>`;

const lantern = (x, y) => `<g>
  <line x1="${x}" y1="${y - 16}" x2="${x}" y2="${y - 8}" stroke="${GOLD}" stroke-width="1.2"/>
  <circle cx="${x}" cy="${y + 2}" r="16" fill="url(#halo)"/>
  <path d="M${x - 6} ${y - 8}h12l2 18h-16Z" fill="#2a2438" stroke="${GOLD}" stroke-width="1.2"/>
  ${star4(x, y + 1, 4.5, "#fff3c4")}
</g>`;

const keys = (x, y, c = GOLD) => `<g stroke="${c}" stroke-width="1.6" fill="none" stroke-linecap="round">
  <circle cx="${x - 8}" cy="${y - 8}" r="4"/><line x1="${x - 5}" y1="${y - 5}" x2="${x + 10}" y2="${y + 10}"/><line x1="${x + 6}" y1="${y + 6}" x2="${x + 9}" y2="${y + 3}"/>
  <circle cx="${x + 8}" cy="${y - 8}" r="4"/><line x1="${x + 5}" y1="${y - 5}" x2="${x - 10}" y2="${y + 10}"/><line x1="${x - 6}" y1="${y + 6}" x2="${x - 9}" y2="${y + 3}"/>
</g>`;

const butterfly = (x, y, c) => `<g transform="translate(${x} ${y})">
  <path d="M0 0C-4 -10 -14 -12 -14 -4C-14 2 -6 4 0 0Z" fill="${c}"/><path d="M0 0C4 -10 14 -12 14 -4C14 2 6 4 0 0Z" fill="${c}"/>
  <path d="M0 0C-3 6 -10 10 -10 5C-10 2 -4 1 0 0Z" fill="${c}" opacity="0.8"/><path d="M0 0C3 6 10 10 10 5C10 2 4 1 0 0Z" fill="${c}" opacity="0.8"/>
  <line x1="0" y1="-6" x2="0" y2="5" stroke="#${INK}" stroke-width="1.2"/>
</g>`;

const chains = () => `<g fill="none" stroke="${GOLD}" stroke-width="1.3" opacity="0.8">
  <path d="M20 120q-6 14 4 26"/><ellipse cx="24" cy="152" rx="4" ry="6"/><ellipse cx="116" cy="152" rx="4" ry="6"/><path d="M120 120q6 14 -4 26"/>
  <path d="M28 158l6 8M112 158l-6 8" stroke-dasharray="2 2"/>
</g>`;

const trumpet = () => `<g>
  <path d="M84 30l30 -14l2 10l-30 8Z" fill="${GOLD}"/><path d="M114 14c6 -2 10 6 4 14" fill="${GOLD}"/>
  <g stroke="${CREAM}" stroke-width="1" opacity="0.6"><line x1="80" y1="36" x2="60" y2="48"/><line x1="82" y1="40" x2="66" y2="58"/><line x1="78" y1="34" x2="52" y2="40"/></g>
</g>`;

const wreath = (c = "#6f9a5a") => `<g fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="6 3" opacity="0.9">
  <ellipse cx="70" cy="112" rx="56" ry="74"/>
</g><g>${[[70, 36], [70, 188], [16, 112], [124, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="${GOLD}"/>`).join("")}</g>`;

const cliff = (c) => `<path d="M0 176L58 176L64 190L140 190V${H}H0Z" fill="${c}"/><path d="M58 176l6 14" stroke="${CREAM}" stroke-opacity="0.3"/>`;

const cups2 = () => `${cupShape(26, 184, 1, GOLD)}${cupShape(114, 184, 1, GOLD)}<path d="M32 176q38 -30 76 0" fill="none" stroke="#9fd3e0" stroke-width="2" stroke-dasharray="3 2"/>`;

const vine = () => `<g fill="none" stroke="#6f9a5a" stroke-width="2">
  <line x1="10" y1="34" x2="130" y2="34" stroke="#5c4632" stroke-width="4"/>
  <path d="M30 34q4 8 0 14M110 34q-4 8 0 14"/>
</g><g fill="#6f9a5a">${[22, 46, 70, 94, 118].map((x) => `<ellipse cx="${x}" cy="31" rx="4" ry="2"/>`).join("")}</g>`;

const veilWaves = () => `<path d="M0 196q35 -10 70 0t70 0V${H}H0Z" fill="#2f6b86" opacity="0.8"/>`;

// Shoulders and a robe under the portrait, so the face sits on a figure
// instead of floating; the V neckline tucks under DiceBear's neck.
const robe = (c) => `<path d="M30 ${H}C30 186 42 152 60 147L70 163L80 147C98 152 110 186 110 ${H}Z" fill="${c}" stroke="${GOLD}" stroke-opacity="0.55" stroke-width="1"/>
<path d="M60 147L70 163L80 147" fill="none" stroke="${GOLD}" stroke-width="1.2"/>`;
const MAJOR_ROBES = ["#5b3f7a", "#7a3f55", "#2f4f6f", "#6b4a2f", "#3f5a4a", "#4a3f6b"];

// ---------- suit emblems ----------

function wandShape(x, y, s, c) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(-18)"><rect x="-2" y="-12" width="4" height="25" rx="2" fill="#b07a4f" stroke="#${INK}" stroke-width="0.6"/><path d="M-2 -5q-6 -1 -7 -6q5 0 7 3Z M2 2q6 -1 7 -6q-5 0 -7 3Z" fill="#8fbf6a"/><path d="M0 -20q5 4 0 8q-5 -4 0 -8Z" fill="${c}"/><path d="M0 -17q2 2 0 4q-2 -2 0 -4Z" fill="#fff3c4"/></g>`;
}
function cupShape(x, y, s, c) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-7 -9h14c0 7 -3 10 -7 10s-7 -3 -7 -10Z" fill="${c}" stroke="#${INK}" stroke-width="0.7"/><path d="M0 1v5M-5 9h10" stroke="${c}" stroke-width="2" stroke-linecap="round"/><path d="M-5 -6q2.5 2 5 0t5 0" stroke="#2f6b86" stroke-width="1" fill="none"/></g>`;
}
function swordShape(x, y, s, c) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -13l2 3v13h-4v-13Z" fill="${c}" stroke="#${INK}" stroke-width="0.6"/><rect x="-6" y="3" width="12" height="2.4" rx="1" fill="${GOLD}"/><rect x="-1.2" y="5.4" width="2.4" height="6" fill="#8a5a3b"/><circle cx="0" cy="12.5" r="1.6" fill="${GOLD}"/></g>`;
}
function pentacleShape(x, y, s, c) {
  let d = "";
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 4 * Math.PI) / 5;
    d += `${i ? "L" : "M"}${(Math.cos(a) * 6.4).toFixed(2)} ${(Math.sin(a) * 6.4).toFixed(2)}`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="9" fill="${c}" stroke="#${INK}" stroke-width="0.7"/><path d="${d}Z" fill="none" stroke="#5c4632" stroke-width="1.1" stroke-linejoin="round"/></g>`;
}
const EMBLEM = { wands: wandShape, cups: cupShape, swords: swordShape, pentacles: pentacleShape };

// Pips along the lower band: one row for up to 5, two rows above that.
function pips(suit, n, c) {
  const draw = EMBLEM[suit];
  const rows = n <= 5 ? [n] : [Math.ceil(n / 2), Math.floor(n / 2)];
  let out = "";
  rows.forEach((count, r) => {
    const y = rows.length === 1 ? 180 : 170 + r * 19;
    const gap = Math.min(24, 118 / count);
    const start = 70 - (gap * (count - 1)) / 2;
    for (let i = 0; i < count; i++) out += draw(start + i * gap, y, n > 5 ? 0.8 : 0.95, c);
  });
  return out;
}

// ---------- the deck ----------

const MAJOR = [
  // [slug, scene(next,p), portrait overrides]
  ["fool", (p) => sun(108, 44, 9) + mountains("#2c3b5a", 170) + cliff(p.ground) + flowers(186, "#f2e6cf", "#e07b4f"), { flowers: true, mouth: ["happy08"] }],
  ["magician", (n) => stars(n, 18) + infinity(70, 40) + flowers(192, "#c9674a", "#f2e6cf"), {}],
  ["high-priestess", (n) => stars(n, 14) + crescent(70, 42, 9, CREAM) + pillars() + veilWaves(), { hairColor: "1f2433" }],
  ["empress", () => sun(110, 40, 6) + hills("#3f5a35", 176) + flowers(184, "#e07b4f", "#f2e6cf"), { flowers: true }],
  ["emperor", () => mountains("#4a2e3a", 176) + crown(70, 46, GOLD, 1.2), {}],
  ["hierophant", (n) => stars(n, 10) + keys(22, 160) + `<path d="M40 60h60M70 40v40" stroke="${GOLD}" stroke-width="1" opacity="0.4"/>`, {}],
  ["lovers", () => sun(70, 38, 8) + heart(20, 150, 1.4, "#e07b4f") + heart(120, 150, 1.4, "#e07b4f") + hills("#3f5a35", 186), { flowers: true }],
  ["chariot", (n) => stars(n, 20) + wheel(18, 176, 11) + wheel(122, 176, 11), {}],
  ["strength", () => infinity(70, 40) + hills("#6b5a2a", 180) + flowers(188, "#e8b86d", "#f2e6cf"), { hair: "variant35", hairColor: "a8482f" }],
  ["hermit", (n) => stars(n, 22) + mountains("#232a3d", 190) + lantern(114, 120), { hairColor: "d8d4c8", hair: "variant41" }],
  ["wheel", (n) => stars(n, 12) + wheel(70, 46, 20) + clouds(CREAM), {}],
  ["justice", (n) => scales(22, 164) + swordShape(118, 164, 1.4, CREAM) + stars(n, 8), {}],
  ["hanged", (n) => vine() + stars(n, 10, CREAM, [8, 150, 124, 40]) + `<circle cx="70" cy="112" r="64" fill="url(#halo)"/>`, { mouth: ["happy13"] }],
  ["death", () => sun(70, 196, 10, "#f2c38a") + butterfly(28, 60, "#c9b6e4") + butterfly(112, 76, "#f2e6cf"), { hairColor: "1f2433" }],
  ["temperance", () => sun(70, 36, 6) + cups2() + mountains("#324a5e", 200), {}],
  ["devil", (n) => chains() + `<rect width="${W}" height="${H}" fill="#3a0f1a" opacity="0.35"/>` + stars(n, 6, "#e07b4f"), { hairColor: "2b1d17", mouth: ["happy02"] }],
  ["tower", (n) => stars(n, 10) + tower() + sparks(n, "#f2a65a"), { mouth: ["sad02"] }],
  ["star", () => star8(70, 34, 13, GOLD) + [22, 118, 30, 110, 12, 128, 50].map((x, i) => star8(x, 24 + (i % 3) * 18, 4, CREAM)).join("") + waves("#2f6b86", 186), {}],
  ["moon", (n) => fullMoon(70, 40, 13) + stars(n, 12) + `<path d="M0 196q35 -10 70 0t70 0V${H}H0Z" fill="#1f3a55"/><path d="M14 190l10 -60h10l6 60M106 190l6 -60h10l10 60" fill="#2a2f42"/>`, {}],
  ["sun", () => sun(70, 40, 14) + flowers(186, "#e8b86d", "#e07b4f") + hills("#b4873a", 196), { flowers: true, mouth: ["happy08"] }],
  ["judgement", () => trumpet() + clouds(CREAM) + mountains("#3b4a66", 200), {}],
  ["world", (n) => stars(n, 16) + wreath(), {}],
];

const SUITS = ["wands", "cups", "swords", "pentacles"];

function minorScene(suit, n, p) {
  switch (suit) {
    case "wands":
      return sparks(n, p.accent) + hills(p.ground, 170);
    case "cups":
      return crescent(112, 40, 6, p.accent) + stars(n, 8) + waves(p.ground, 164);
    case "swords":
      return clouds(p.accent) + wind(p.accent) + mountains(p.ground, 176);
    default:
      return sun(112, 40, 5, p.accent) + hills(p.ground, 168);
  }
}

function card({ id, palette, scene, portraitOpts, pipsLayer, court }) {
  const next = rng(id);
  const p = PALETTE[palette];
  const face = portrait({ id, size: 100, x: 20, y: 46, ...portraitOpts });
  // A soft vignette under the index (top) and the names (bottom), so the HTML
  // text laid over the art stays readable.
  const scrim = `<defs><linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#0f1420" stop-opacity="0.55"/><stop offset="0.14" stop-color="#0f1420" stop-opacity="0"/>
  <stop offset="0.78" stop-color="#0f1420" stop-opacity="0"/><stop offset="1" stop-color="#0f1420" stop-opacity="0.8"/>
</linearGradient></defs><rect width="${W}" height="${H}" fill="url(#scrim)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * 2}" height="${H * 2}">
${background(p)}
${scene(next, p)}
<circle cx="70" cy="98" r="46" fill="url(#halo)"/>
${face}
${robe(portraitOpts?.robe ?? (palette === "major" ? pick(next, MAJOR_ROBES) : p.robe))}
${court ?? ""}
${pipsLayer ?? ""}
${scrim}
</svg>`;
}

mkdirSync(OUT, { recursive: true });
let count = 0;

MAJOR.forEach(([, scene, overrides], i) => {
  const id = `major-${i}`;
  writeFileSync(join(OUT, `${id}.svg`), card({ id, palette: "major", scene, portraitOpts: overrides }));
  count++;
});

for (const suit of SUITS) {
  for (let rank = 1; rank <= 14; rank++) {
    const id = `${suit}-${rank}`;
    const p = PALETTE[suit];
    const scene = (n) => minorScene(suit, n, p);
    let pipsLayer = "";
    let court = "";
    let portraitOpts = {};
    if (rank <= 10) {
      pipsLayer = pips(suit, rank, p.accent);
    } else {
      // Court cards: one large emblem held up beside the face, plus a
      // marker of rank (a circlet for the Page, wind for the Knight,
      // crowns for Queen and King).
      court = EMBLEM[suit](114, 168, 1.7, p.accent);
      if (rank === 11) portraitOpts = { flowers: true };
      if (rank === 12) court += wind(CREAM);
      if (rank === 13) court += crown(70, 48, GOLD, 1);
      if (rank === 14) court += crown(70, 46, GOLD, 1.25);
    }
    writeFileSync(join(OUT, `${id}.svg`), card({ id, palette: suit, scene, portraitOpts, pipsLayer, court }));
    count++;
  }
}

console.log(`Wrote ${count} tarot faces to ${OUT}`);
