import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import PostList from "@/components/PostList";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/category/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.tagline,
  };
}

export default async function CategoryPage(props: PageProps<"/category/[slug]">) {
  const { slug } = await props.params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="text-4xl mb-2">{category.emoji}</p>
      <h1 className="text-3xl font-extrabold text-forest-deep mb-2">
        {category.name}
      </h1>
      <p className="text-ink/75 mb-8">{category.tagline}</p>
      <PostList posts={posts} />
    </div>
  );
}
