import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import PostList from "@/components/PostList";

export const revalidate = 60;

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
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

export default async function CategoryPage(props: PageProps<"/category/[slug]">) {
  const { slug } = await props.params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const posts = await getPostsByCategory(category.slug);
  const allPosts = await getAllPosts();
  const categoryCounts = Object.fromEntries(
    categories.map((c) => [c.slug, allPosts.filter((p) => p.category === c.slug).length])
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-ochre mb-2">
        Danh mục
      </p>
      <h1 className="font-serif italic text-3xl sm:text-[34px] font-semibold text-forest-deep mb-2">
        {category.name}
      </h1>
      <p className="text-ink/75 mb-8">{category.tagline}</p>
      <PostList
        posts={posts}
        activeCategory={category.slug}
        categoryCounts={categoryCounts}
        totalCount={allPosts.length}
      />
    </div>
  );
}
