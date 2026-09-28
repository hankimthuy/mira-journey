import { playingReading, type PlayingReading } from "@/lib/playingReadings";

export type PlayingSuit = "spades" | "hearts" | "diamonds" | "clubs";

export type PlayingCard = {
  id: string;
  rank: string; // "A", "2"…"10", "J", "Q", "K", or "Joker"
  suit: PlayingSuit | null; // null for Jokers
  symbol: string;
  red: boolean;
  name: string; // Vietnamese, for screen readers and captions
} & PlayingReading;

export const PLAYING_SUITS: { suit: PlayingSuit; symbol: string; red: boolean; vi: string }[] = [
  { suit: "spades", symbol: "♠", red: false, vi: "Bích" },
  { suit: "hearts", symbol: "♥", red: true, vi: "Cơ" },
  { suit: "diamonds", symbol: "♦", red: true, vi: "Rô" },
  { suit: "clubs", symbol: "♣", red: false, vi: "Chuồn" },
];

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const RANK_VI: Record<string, string> = { A: "Át", J: "Bồi", Q: "Đầm", K: "Già" };

const STANDARD: PlayingCard[] = PLAYING_SUITS.flatMap(({ suit, symbol, red, vi }) =>
  RANKS.map((rank) => ({
    id: `${rank}-${suit}`,
    rank,
    suit,
    symbol,
    red,
    name: `${RANK_VI[rank] ?? rank} ${vi}`,
    ...playingReading(`${rank}-${suit}`, rank, suit),
  }))
);

const JOKERS: PlayingCard[] = [
  { id: "joker-red", rank: "Joker", suit: null, symbol: "★", red: true, name: "Joker đỏ", ...playingReading("joker-red", "Joker", null) },
  { id: "joker-black", rank: "Joker", suit: null, symbol: "★", red: false, name: "Joker đen", ...playingReading("joker-black", "Joker", null) },
];

export function playingDeck(withJokers: boolean): PlayingCard[] {
  return withJokers ? [...STANDARD, ...JOKERS] : STANDARD;
}
