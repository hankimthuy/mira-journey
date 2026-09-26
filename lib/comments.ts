import { supabase } from "@/lib/supabase";

// New comments are paused (spam). Existing comments stay visible; flip to
// true to reopen the form and the POST endpoint.
export const COMMENTS_OPEN = false;

export type PublicComment = {
  id: string;
  postSlug: string;
  authorName: string;
  content: string;
  createdAt: string;
};

type CommentRow = {
  id: string;
  post_slug: string;
  author_name: string;
  content: string;
  created_at: string;
};

function toPublicComment(row: CommentRow): PublicComment {
  return {
    id: row.id,
    postSlug: row.post_slug,
    authorName: row.author_name,
    content: row.content,
    createdAt: row.created_at,
  };
}

export async function getVisibleComments(
  postSlug: string
): Promise<PublicComment[]> {
  const { data, error } = await supabase
    .from("post_comments")
    .select("id, post_slug, author_name, content, created_at")
    .eq("post_slug", postSlug)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[comments] getVisibleComments failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => toPublicComment(row as CommentRow));
}
