import { supabase } from "./supabase";

export type PocStatus =
  | "ongoing"
  | "completed"
  | "pending"
  | "deprecated"
  | "private";

export type Poc = {
  id: string;
  name: string;
  emoji: string;
  coverUrl: string;
  tagline: string;
  painPoint: string;
  story: string;
  status: PocStatus;
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
  year_label: string;
  former_name: string;
  link: string;
  stack: string[] | null;
};

const POC_COLUMNS =
  "id, name, emoji, cover_url, tagline, pain_point, story, status, year_label, former_name, link, stack";

/**
 * How each status reads — one English word everywhere it shows up (card
 * stamp, home teaser), so the same status never reads two different ways in
 * two places. English also sidesteps "đã bỏ xó", which reads harsher in
 * Vietnamese than "deprecated" does as a plain technical label.
 * `accent` picks one of the three ticket accent colors from globals.css.
 */
export const POC_STATUS: Record<
  PocStatus,
  { stamp: string; accent: 0 | 1 | 2 }
> = {
  ongoing: { stamp: "Ongoing", accent: 2 },
  completed: { stamp: "Completed", accent: 1 },
  pending: { stamp: "On Hold", accent: 1 },
  deprecated: { stamp: "Deprecated", accent: 0 },
  private: { stamp: "Private", accent: 2 },
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
