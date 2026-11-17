import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} — Pawan Joshi`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Pawan Joshi"],
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: post.canonicalUrl
      ? { canonical: post.canonicalUrl }
      : { canonical: `${siteConfig.url}/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Pawan Joshi",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: "Pawan Joshi",
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-neutral-400 transition-colors mb-12"
      >
        ← All articles
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-xs font-mono text-neutral-700">{post.date}</time>
          <span className="text-neutral-800">·</span>
          <span className="text-xs text-neutral-700">{post.readingTime}</span>
        </div>
        <h1 className="text-3xl font-medium text-neutral-100 tracking-tight leading-tight mb-4">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-neutral-500 leading-relaxed">{post.description}</p>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, { theme: "github-dark", keepBackground: false }]],
            },
          }}
        />
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-neutral-900">
        <p className="text-xs text-neutral-700">
          Written by{" "}
          <Link
            href="/"
            className="text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Pawan Joshi
          </Link>
          {post.canonicalUrl && (
            <>
              {" "}
              · Originally published on{" "}
              <Link
                href={post.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-400 transition-colors"
              >
                Dev.to
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
