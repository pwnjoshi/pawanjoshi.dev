import { getAdjacentPosts, getAllPosts, getHeadings, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { breadcrumbSchema, ids } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { formatDate } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import portrait from "../../../../public/hero-avatar.png";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock } from "@/components/Icons";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareLinks } from "@/components/ShareLinks";
import { TableOfContents } from "@/components/TableOfContents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [`${siteConfig.url}/about`],
      siteName: "Pawan Joshi",
      tags: post.tags,
      url,
      ...(post.coverImage ? { images: [{ url: post.coverImage, width: 1000, height: 420 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
    alternates: { canonical: url },
  };
}

const mdxComponents = {
  h1: (props: React.ComponentProps<"h2">) => <h2 {...props} />,
  a: ({ href = "", ...props }: React.ComponentProps<"a">) =>
    /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const headings = getHeadings(post.content);
  const hasToc = headings.length >= 3;
  const { newer, older } = getAdjacentPosts(post.slug);

  const articleNodes = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      ...(post.coverImage ? { image: [post.coverImage] } : {}),
      author: { "@id": ids.person },
      publisher: { "@id": ids.person },
      isPartOf: { "@id": `${siteConfig.url}/blog#blog` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: "en",
      keywords: post.tags.join(", "),
      wordCount: post.content.split(/\s+/).filter(Boolean).length,
      ...(post.canonicalUrl ? { sameAs: post.canonicalUrl } : {}),
    },
    breadcrumbSchema([
      { name: "Writing", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <JsonLd nodes={articleNodes} />

      <header className="relative border-b border-line">
        <div className="hero-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative pb-8 pt-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="hidden items-center gap-2 text-sm text-muted hover:text-fg md:inline-flex">
              <ArrowLeft size={15} /> All articles
            </Link>
            <ul className="flex flex-wrap gap-2 md:mt-8" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="chip">#{tag}</li>
              ))}
            </ul>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl lg:text-5xl" style={{ letterSpacing: "-0.03em" }}>
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image src={portrait} alt="" width={44} height={44} className="size-11 rounded-full border border-line object-cover" />
                <div className="text-sm leading-tight">
                  <p className="font-medium text-fg">Pawan Joshi</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 text-subtle">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {post.readingTime}</span>
                  </p>
                </div>
              </div>
              <ShareLinks url={url} title={post.title} />
            </div>
          </div>

          {post.coverImage && (
            <div className="relative mx-auto mt-10 aspect-[1000/420] max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface-2">
              <Image
                src={post.coverImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </header>

      <div className="container-x py-8 sm:py-16">
        <div
          className={
            hasToc
              ? "mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,44rem)_15rem] lg:justify-between"
              : "mx-auto max-w-3xl"
          }
        >
          <article id="article-body" className="min-w-0">
            <div className="prose-article">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark", keepBackground: false }]],
                  },
                }}
              />
            </div>

            {post.canonicalUrl && (
              <p className="mt-12 text-sm text-subtle">
                Originally published on{" "}
                <a href={post.canonicalUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
                  Dev.to <ArrowUpRight size={12} className="inline" />
                </a>
                . Join the discussion there.
              </p>
            )}

            <aside className="card mt-12 flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
              <Image src={portrait} alt="" width={64} height={64} className="size-16 rounded-full border border-line object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-fg">Written by Pawan Joshi</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Software engineer building AI agents and cloud systems. Co-founder of Tech Sangi and
                  founder of the AWS Student Builder Group at Graphic Era University.
                </p>
              </div>
              <Link href="/about" className="btn btn-secondary">About me</Link>
            </aside>

            {(newer || older) && (
              <nav aria-label="More articles" className="mt-10 grid gap-4 sm:grid-cols-2">
                {older ? (
                  <Link href={`/blog/${older.slug}`} className="card card-hover p-5">
                    <span className="inline-flex items-center gap-1.5 text-xs text-subtle"><ArrowLeft size={13} /> Previous</span>
                    <span className="mt-2 block font-medium leading-snug text-fg">{older.title}</span>
                  </Link>
                ) : <span />}
                {newer ? (
                  <Link href={`/blog/${newer.slug}`} className="card card-hover p-5 sm:text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs text-subtle">Next <ArrowRight size={13} /></span>
                    <span className="mt-2 block font-medium leading-snug text-fg">{newer.title}</span>
                  </Link>
                ) : <span />}
              </nav>
            )}
          </article>

          {hasToc && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
