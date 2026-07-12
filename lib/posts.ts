import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Lang = "vi" | "en";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  lang: Lang;
  tags: string[];
  draft: boolean;
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

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function readRawPost(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "1970-01-01",
    category: (data.category as string) ?? "radar",
    lang: (data.lang as Lang) ?? "vi",
    tags: (data.tags as string[]) ?? [],
    draft: Boolean(data.draft) ?? false,
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
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

export function getAllPosts(): PostMeta[] {
  const slugs = readSlugs();
  const posts = slugs.map((slug) => {
    const { data, content } = readRawPost(slug);
    return toMeta(slug, data, content);
  });

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === categorySlug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readRawPost(slug);
  const meta = toMeta(slug, data, content);

  const processed = await remark().use(remarkHtml).process(content);
  const { html: contentHtml, headings } = addHeadingIds(processed.toString());

  return { ...meta, contentHtml, headings };
}

export function getAllPostSlugs(): string[] {
  return readSlugs();
}
