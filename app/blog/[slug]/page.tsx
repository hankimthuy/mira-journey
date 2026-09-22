import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/categories";
import { getLikeCount } from "@/lib/likes";
import { getVisibleComments } from "@/lib/comments";
import PostDetail from "@/components/PostDetail";
import { AUTHOR_PERSON, SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getAllPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [AUTHOR_PERSON.name],
      tags: post.tags,
      url: `${SITE_URL}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const [post, allPosts, likeCount, comments] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
    getLikeCount(slug),
    getVisibleComments(slug),
  ]);

  if (!post) notFound();

  const category = getCategoryBySlug(post.category);
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: post.lang === "vi" ? "vi-VN" : "en-US",
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    author: AUTHOR_PERSON,
    publisher: AUTHOR_PERSON,
    keywords: post.tags.join(", "),
    isPartOf: {
      "@type": "Blog",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetail
        post={post}
        category={category}
        relatedPosts={relatedPosts}
        likeCount={likeCount}
        comments={comments}
      />
    </>
  );
}
