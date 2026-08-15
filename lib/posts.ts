import { createClient } from "@supabase/supabase-js";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type Lang = "vi" | "en";

export type Visibility = "public" | "private";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  lang: Lang;
  tags: string[];
  draft: boolean;
  visibility: Visibility;
  readingMinutes: number;
};

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Post = PostMeta & {
  contentHtml: string;
  headings: Heading[];
};

/** One row of public.posts, as authored through the admin CMS. */
type PostRow = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  lang: Lang;
  tags: string[] | null;
  draft: boolean;
  visibility: Visibility;
  reading_minutes: number;
  content_md: string;
};

const META_COLUMNS =
  "slug, title, description, date, category, lang, tags, draft, visibility, reading_minutes";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Thiếu NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Bài viết được đọc từ Supabase — xem .env.example và đặt hai biến này " +
      "trong .env.local (local) hoặc Environment Variables (Vercel)."
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

function toMeta(row: Omit<PostRow, "content_md">): PostMeta {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    date: row.date,
    category: row.category ?? "radar",
    lang: row.lang ?? "vi",
    tags: row.tags ?? [],
    draft: row.draft,
    visibility: row.visibility,
    readingMinutes: Math.max(1, row.reading_minutes),
  };
}

function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

function addHeadingIds(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const usedIds = new Set<string>();

  const withIds = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const text = stripTags(inner).trim();
      const base = slugifyHeading(text) || `section-${headings.length + 1}`;
      let id = base;
      let counter = 2;
      while (usedIds.has(id)) {
        id = `${base}-${counter++}`;
      }
      usedIds.add(id);
      headings.push({ id, text, level: Number(level) as 2 | 3 });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    }
  );

  return { html: withIds, headings };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(META_COLUMNS)
    .eq("draft", false)
    .eq("visibility", "public")
    .order("date", { ascending: false });

  if (error) {
    console.error("[posts] getAllPosts failed:", error.message);
    return [];
  }

  return (data ?? []).map((row) =>
    toMeta(row as unknown as Omit<PostRow, "content_md">)
  );
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === categorySlug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(`${META_COLUMNS}, content_md`)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as unknown as PostRow;
  const meta = toMeta(row);

  const processed = await remark().use(remarkHtml).process(row.content_md);
  const { html: contentHtml, headings } = addHeadingIds(processed.toString());

  return { ...meta, contentHtml, headings };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("draft", false)
    .eq("visibility", "public");

  if (error) {
    console.error("[posts] getAllPostSlugs failed:", error.message);
    return [];
  }

  return (data ?? []).map((row) => row.slug);
}
