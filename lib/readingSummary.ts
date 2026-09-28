// Spreads and the short "reading as a whole" note under a multi-card draw.
// Built from templates, not generated: dominant element or suit, how many
// Major Arcana, how many reversed, then the positions woven into a sentence.

import { elementOf, type Element, type TarotCard } from "@/lib/tarot";
import type { PlayingCard, PlayingSuit } from "@/lib/playingCards";
import { SUIT_THEME } from "@/lib/playingReadings";

export type Drawn =
  | { kind: "tarot"; card: TarotCard; reversed: boolean; position?: SpreadPosition }
  | { kind: "playing"; card: PlayingCard };

export type SpreadPosition = { name: string; hint: string };

export type SpreadId = "timeline" | "advice" | "mind-body-spirit";

export const SPREADS: { id: SpreadId; label: string; positions: SpreadPosition[] }[] = [
  {
    id: "advice",
    label: "Lời khuyên",
    positions: [
      { name: "Điều đang diễn ra", hint: "Bức tranh của bạn lúc này" },
      { name: "Điều cần lưu ý", hint: "Góc bạn có thể chưa nhìn tới" },
      { name: "Bước nhỏ tiếp theo", hint: "Một việc vừa sức để thử" },
    ],
  },
  {
    id: "timeline",
    label: "Dòng thời gian",
    positions: [
      { name: "Điều đã qua", hint: "Điều bạn mang theo từ trước" },
      { name: "Điều đang diễn ra", hint: "Năng lượng của hiện tại" },
      { name: "Điều có thể đến", hint: "Hướng đi nếu giữ nhịp này, không phải định mệnh" },
    ],
  },
  {
    id: "mind-body-spirit",
    label: "Tâm · Thân · Trí",
    positions: [
      { name: "Tâm trí", hint: "Suy nghĩ đang chiếm chỗ" },
      { name: "Cơ thể", hint: "Điều cơ thể muốn nhắc" },
      { name: "Tinh thần", hint: "Điều nuôi dưỡng bên trong" },
    ],
  },
];

const ELEMENT_NOTE: Record<Element, string> = {
  fire: "Lửa (Gậy) nổi bật: câu chuyện lúc này nghiêng về đam mê và hành động.",
  water: "Nước (Cốc) nổi bật: câu chuyện lúc này nghiêng về cảm xúc và các mối quan hệ.",
  air: "Khí (Kiếm) nổi bật: nhiều điều đang diễn ra trong suy nghĩ, nhớ hít thở.",
  earth: "Đất (Tiền) nổi bật: câu chuyện nghiêng về công việc, tiền bạc và cơ thể.",
  spirit: "",
};

// First keyword of the side that came up, e.g. "khởi đầu mới".
function keyword(d: Extract<Drawn, { kind: "tarot" }>): string {
  return (d.reversed ? d.card.reversed : d.card.upright).split(",")[0].trim();
}

function weave(spread: SpreadId, [a, b, c]: string[]): string {
  switch (spread) {
    case "timeline":
      return `Từ ${a}, bạn đang ở giữa ${b}; nếu giữ nhịp này, mọi thứ có thể hướng về ${c}.`;
    case "mind-body-spirit":
      return `Tâm trí đang nói về ${a}, cơ thể về ${b}, còn tinh thần về ${c}.`;
    default:
      return `Bạn đang ở giữa ${a}; điều cần để ý là ${b}; một bước nhỏ có thể là ${c}.`;
  }
}

function mostCommon<T>(items: T[]): [T, number] | null {
  const counts = new Map<T, number>();
  for (const it of items) counts.set(it, (counts.get(it) ?? 0) + 1);
  let best: [T, number] | null = null;
  for (const entry of counts) if (!best || entry[1] > best[1]) best = entry;
  return best;
}

export function summarize(hand: Drawn[], spread: SpreadId): { lines: string[]; reflect: string } | null {
  if (hand.length < 2) return null;
  const lines: string[] = [];

  const tarot = hand.filter((d): d is Extract<Drawn, { kind: "tarot" }> => d.kind === "tarot");
  if (tarot.length === hand.length) {
    lines.push(weave(spread, tarot.map(keyword)));
    const majors = tarot.filter((d) => d.card.arcana === "major").length;
    if (majors >= 2) lines.push(`Có ${majors} lá Ẩn chính: đây là giai đoạn có ý nghĩa lớn hơn chuyện thường ngày.`);
    const top = mostCommon(tarot.map((d) => elementOf(d.card)).filter((e) => e !== "spirit"));
    if (top && top[1] >= 2) lines.push(ELEMENT_NOTE[top[0]]);
    const reversed = tarot.filter((d) => d.reversed).length;
    if (reversed >= 2) lines.push("Nhiều lá ngược: có thể bạn đang giữ nhiều điều ở bên trong. Chậm lại và lắng nghe mình.");
    return { lines, reflect: tarot[tarot.length - 1].card.reflect };
  }

  const playing = hand.filter((d): d is Extract<Drawn, { kind: "playing" }> => d.kind === "playing");
  const suits = playing.map((d) => d.card.suit).filter((s): s is PlayingSuit => s !== null);
  const top = mostCommon(suits);
  if (top && top[1] >= 2) {
    const { element, theme } = SUIT_THEME[top[0]];
    lines.push(`Nhiều lá ${element}: câu chuyện lúc này nghiêng về ${theme}.`);
  } else {
    lines.push("Các chất trải đều: nhiều mảng của cuộc sống đang cùng lên tiếng, không mảng nào lấn át.");
  }
  const faces = playing.filter((d) => ["J", "Q", "K"].includes(d.card.rank)).length;
  if (faces >= 2) lines.push("Nhiều lá hình (J, Q, K): những người quanh bạn đang đóng vai trò quan trọng.");
  lines.push(`Các từ khoá: ${playing.map((d) => d.card.keywords).join(" · ")}.`);
  return { lines, reflect: playing[0].card.reflect };
}
