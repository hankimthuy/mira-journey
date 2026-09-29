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

export type SpreadId = "diary" | "train" | "inner";

export const SPREADS: { id: SpreadId; label: string; positions: SpreadPosition[] }[] = [
  {
    id: "diary",
    label: "What's going on?",
    positions: [
      { name: "Hôm nay mình thấy", hint: "Bức tranh của bạn lúc này" },
      { name: "Điều khẽ lên tiếng", hint: "Góc bạn có thể chưa để ý" },
      { name: "Điều nhỏ mang theo", hint: "Một ý để bỏ túi cho ngày hôm nay" },
    ],
  },
  {
    id: "train",
    label: "Chuyến tàu ba ga",
    positions: [
      { name: "Ga đã qua", hint: "Điều bạn mang theo từ trước" },
      { name: "Ga đang dừng", hint: "Năng lượng của hiện tại" },
      { name: "Ga phía trước", hint: "Hướng tàu đang chạy, không phải định mệnh" },
    ],
  },
  {
    id: "inner",
    label: "Nội lực bên trong",
    positions: [
      { name: "Gốc rễ", hint: "Điều giữ bạn đứng vững" },
      { name: "Dòng chảy bên trong", hint: "Điều bạn chưa gọi tên được" },
      { name: "Ngọn lửa", hint: "Điều đang thắp sáng bạn" },
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
    case "train":
      return `Tàu rời ga ${a}, đang dừng ở ga ${b}; nếu giữ nhịp này, ga phía trước có thể là ${c}.`;
    case "inner":
      return `Gốc rễ của bạn là ${a}, dòng chảy bên trong là ${b}, còn ngọn lửa đang cháy là ${c}.`;
    default:
      return `Hôm nay bạn đang thấy ${a}; có điều khẽ lên tiếng là ${b}; và một điều nhỏ để mang theo: ${c}.`;
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
