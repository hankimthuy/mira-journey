import { supabase } from "@/lib/supabase";

export async function getLikeCount(postSlug: string): Promise<number> {
  const { count, error } = await supabase
    .from("post_likes")
    .select("post_slug", { count: "exact", head: true })
    .eq("post_slug", postSlug);

  if (error) {
    console.error("[likes] getLikeCount failed:", error.message);
    return 0;
  }
  return count ?? 0;
}
