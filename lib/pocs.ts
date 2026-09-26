import { supabase } from "./supabase";

export type PocStatus =
  | "ongoing"
  | "completed"
  | "pending"
  | "deprecated"
  | "private";

export type PocStage = "poc" | "mvp" | "live";

export type Poc = {
  id: string;
  name: string;
  emoji: string;
  coverUrl: string;
  tagline: string;
  painPoint: string;
  story: string;
  status: PocStatus;
  stage: PocStage;
  yearLabel: string;
  formerName: string;
  link: string;
  stack: string[];
};

/** One row of public.pocs, as authored through the admin CMS. */
type PocRow = {
  id: string;
  name: string;
  emoji: string;
  cover_url: string;
  tagline: string;
  pain_point: string;
  story: string;
  status: PocStatus;
  stage: PocStage;
  year_label: string;
  former_name: string;
  link: string;
  stack: string[] | null;
};

const POC_COLUMNS =
  "id, name, emoji, cover_url, tagline, pain_point, story, status, stage, year_label, former_name, link, stack";

/**
 * How far a project has come — the question it has answered so far.
 * PoC: can it be built? MVP: does anyone need it? Live: people use it.
 */
export const POC_STAGE: Record<PocStage, { label: string; question: string }> = {
  poc: { label: "PoC", question: "Làm được không?" },
  mvp: { label: "MVP", question: "Có ai cần không?" },
  live: { label: "Live", question: "Đang có người dùng" },
};

export const POC_STAGE_ORDER: PocStage[] = ["poc", "mvp", "live"];

/**
 * Whether work is still happening, told only when it is not — "ongoing" is
 * the default and says nothing, so it gets no label at all.
 */
export const POC_STATUS_NOTE: Partial<Record<PocStatus, string>> = {
  pending: "tạm dừng",
  deprecated: "đã ngừng",
  private: "nội bộ",
};

function toPoc(row: PocRow): Poc {
  return {
    id: row.id,
    name: row.name,
    emoji: row.emoji ?? "",
    coverUrl: row.cover_url ?? "",
    tagline: row.tagline ?? "",
    painPoint: row.pain_point ?? "",
    story: row.story ?? "",
    status: row.status ?? "pending",
    stage: row.stage ?? "poc",
    yearLabel: row.year_label ?? "",
    formerName: row.former_name ?? "",
    link: row.link ?? "",
    stack: row.stack ?? [],
  };
}

/**
 * Splits a tagline on **double asterisks** into plain and highlighted runs.
 * One CMS field, author decides the emphasis — no second column to keep in sync.
 */
export function splitTagline(
  tagline: string
): { text: string; mark: boolean }[] {
  return tagline
    .split(/\*\*(.+?)\*\*/g)
    .map((text, i) => ({ text, mark: i % 2 === 1 }))
    .filter((part) => part.text.length > 0);
}

/** First 4-digit year in a free-text label like "2025 — nay"; null if none. */
export function startYear(yearLabel: string): number | null {
  const match = yearLabel.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

export async function getAllPocs(): Promise<Poc[]> {
  const { data, error } = await supabase
    .from("pocs")
    .select(POC_COLUMNS)
    .eq("draft", false)
    .eq("visibility", "public")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[pocs] getAllPocs failed:", error.message);
    return [];
  }

  return (data ?? []).map((row) => toPoc(row as unknown as PocRow));
}
