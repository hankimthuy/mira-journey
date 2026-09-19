import "server-only";
import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const LIKE_RATE_LIMIT = { max: 20, windowMinutes: 10 } as const;
export const COMMENT_RATE_LIMIT = { max: 5, windowMinutes: 60 } as const;

/** Never trust this for anything beyond a coarse anti-spam signal — it's
 * client-forwarded and only as reliable as the proxy in front of the app. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Salted so a raw IP is never recoverable from what's stored in Supabase. */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex");
}

export async function countRecentByIp(
  table: "post_likes" | "post_comments",
  ipHash: string,
  windowMinutes: number
): Promise<number> {
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();
  const { count, error } = await getSupabaseAdmin()
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) {
    console.error(`[spam] countRecentByIp(${table}) failed:`, error.message);
    return 0;
  }
  return count ?? 0;
}
