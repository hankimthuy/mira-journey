import "server-only";

/**
 * Best-effort notification when a new comment lands — mirrors
 * components/Analytics.tsx's "never blocks, swallow errors" style. A no-op
 * until COMMENT_NOTIFY_WEBHOOK_URL is set, so this ships safely today and
 * goes live the moment the owner points it at a real endpoint — no code
 * change needed then.
 *
 * Expected contract on the receiving end:
 *   POST {url}
 *   Authorization: Bearer {token}   (only sent if a token is configured)
 *   Content-Type: application/json
 *   { postSlug, postTitle, authorName, content, commentUrl }
 */
export async function notifyNewComment(payload: {
  postSlug: string;
  postTitle: string;
  authorName: string;
  content: string;
  commentUrl: string;
}): Promise<void> {
  const url = process.env.COMMENT_NOTIFY_WEBHOOK_URL;
  if (!url) return;

  const token = process.env.COMMENT_NOTIFY_WEBHOOK_TOKEN;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) {
      console.error("[notifyComment] webhook responded", res.status);
    }
  } catch (err) {
    console.error("[notifyComment] webhook call failed:", err);
  }
}
