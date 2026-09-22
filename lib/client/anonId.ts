const STORAGE_KEY = "mira_client_id";

/**
 * A per-browser anonymous id, used only so the like/comment rate-limit and
 * one-like-per-visitor unique constraint have something stable to key on.
 * Not an identity system — clearing storage resets it, and that's fine for
 * this feature's stakes.
 */
export function getOrCreateClientId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // Storage unavailable (private mode, blocked) — fall back to a
    // per-page-load id; likes/comments still work, just not deduped.
    return crypto.randomUUID();
  }
}
