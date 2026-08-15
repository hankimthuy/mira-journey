/**
 * One-off migration: content/posts/*.md  ->  Supabase public.posts
 *
 * Run locally only. The service-role key bypasses RLS, so it must never be
 * committed or deployed.
 *
 *   node --env-file=.env.local scripts/migrate-to-supabase.mjs
 *
 * Safe to re-run: rows are upserted on the unique `slug` column.
 * Add --dry-run to print what would be written without touching the database.
 *
 * Images referenced by these posts stay in public/images/posts/** and keep
 * being served statically by the blog — only new CMS uploads go to Supabase
 * Storage.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { createClient } from "@supabase/supabase-js";

const DRY_RUN = process.argv.includes("--dry-run");
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    throw new Error(`Không tìm thấy thư mục ${POSTS_DIR}`);
  }

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        // gray-matter turns unquoted YAML dates into Date objects.
        date:
          data.date instanceof Date
            ? data.date.toISOString().slice(0, 10)
            : (data.date ?? "1970-01-01"),
        category: data.category ?? "radar",
        lang: data.lang === "en" ? "en" : "vi",
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: Boolean(data.draft),
        visibility: data.visibility === "private" ? "private" : "public",
        reading_minutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
        content_md: content,
        author: "Han Kim Thuy",
      };
    });
}

async function main() {
  const rows = readPosts();
  console.log(`Đọc được ${rows.length} bài từ content/posts/\n`);

  for (const row of rows) {
    const flags = [
      row.draft ? "draft" : null,
      row.visibility === "private" ? "private" : null,
    ]
      .filter(Boolean)
      .join(", ");
    console.log(
      `  ${row.date}  ${row.slug}${flags ? `  [${flags}]` : ""}`
    );
  }

  if (DRY_RUN) {
    console.log("\n--dry-run: không ghi gì vào database.");
    return;
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      "Thiếu SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY. Đặt trong .env.local rồi chạy lại với: node --env-file=.env.local scripts/migrate-to-supabase.mjs"
    );
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("posts")
    .upsert(rows, { onConflict: "slug" })
    .select("slug");

  if (error) {
    console.error("\nMigrate thất bại:", error.message);
    process.exitCode = 1;
    return;
  }

  console.log(`\nĐã ghi ${data.length}/${rows.length} bài vào Supabase.`);

  const { count } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });
  console.log(`Tổng số bài hiện có trong bảng posts: ${count}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
