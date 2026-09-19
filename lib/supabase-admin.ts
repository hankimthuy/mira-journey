import "server-only";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error(
    "Thiếu NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. " +
      "Cần cho các thao tác ghi (like, comment, admin) — xem .env.example."
  );
}

/**
 * Service-role client — bypasses RLS entirely. Only ever import this from
 * server-only code (route handlers, server actions): the `server-only`
 * import above makes that a build-time error, not a runtime footgun.
 * Every write path here must do its own validation/rate-limiting, since
 * RLS is no longer the safety net once this client is used.
 */
export const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
