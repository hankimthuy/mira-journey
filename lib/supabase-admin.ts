import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Service-role client — bypasses RLS entirely. Only ever import this from
 * server-only code (route handlers, server actions): the `server-only`
 * import above makes that a build-time error, not a runtime footgun.
 * Every write path here must do its own validation/rate-limiting, since
 * RLS is no longer the safety net once this client is used.
 *
 * Lazily constructed (not a module-level constant) on purpose: `next build`
 * imports every route handler to inspect its exported config, and a
 * top-level throw for a missing env var turns that import into a build
 * failure rather than a runtime one — this way a deploy without
 * SUPABASE_SERVICE_ROLE_KEY set yet still builds; the route just 500s if
 * actually hit before the key is configured.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      "Thiếu NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. " +
        "Cần cho các thao tác ghi (like, comment) — xem .env.example."
    );
  }

  cached = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  return cached;
}
