import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Thiếu NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Nội dung được đọc từ Supabase — xem .env.example và đặt hai biến này " +
      "trong .env.local (local) hoặc Environment Variables (Vercel)."
  );
}

/**
 * Read-only anon client shared by every content module (posts, pocs).
 * Row level security is the whole access contract — the anon key can only
 * ever see rows that are published and public.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
