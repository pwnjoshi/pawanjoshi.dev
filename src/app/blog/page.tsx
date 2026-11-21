import type { Metadata } from "next";
import { blogSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "@/components/Icons";
import { BlogExplorer } from "@/components/BlogExplorer";
import { PageHeader } from "@/components/PageHeader";
import { getPostSummaries } from "@/lib/blog";
import { siteConfig } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description:
    "Articles by Pawan Joshi on AWS, EC2 troubleshooting, cloud certification and building student developer communities.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...rest] = getPostSummaries();

  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ name: "Writing", path: "/blog" }]), blogSchema(getPostSummaries())]} />
      <PageHeader
        eyebrow="Writing"
        title="Writing"
        actions={
          <a href={siteConfig.links.devto} target="_blank" rel="noopener noreferrer" className="btn btn-secondary !rounded-full">
            Follow on Dev.to <ArrowUpRight size={15} />
          </a>
        }
      >
        <p>Notes on AWS, debugging, and building developer communities.</p>
      </PageHeader>

      <div className="container-x pb-10 pt-4 md:py-14">
        {featured ? (
          <>
            <article className="widget card-hover group relative mb-8 overflow-hidden md:mb-12" data-reveal>
              <div className="xl:grid xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] xl:items-center">
                {featured.coverImage && (
                  <div className="relative aspect-[1000/420] w-full overflow-hidden bg-surface-2">
                    <Image
                      src={featured.coverImage}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 1280px) 100vw, 720px"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="min-w-0 p-5 md:p-10">
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">Latest</p>
                  <h2 className="mt-2 text-xl font-medium leading-snug tracking-tight text-fg md:text-3xl">
                    <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                    <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {featured.readingTime}</span>
                  </p>
                </div>
              </div>
            </article>

            {rest.length > 0 && (
              <section aria-labelledby="all-articles">
                <h2 id="all-articles" className="h-section mb-4 md:mb-6">All articles</h2>
                <BlogExplorer posts={rest} tags={Array.from(new Set(rest.flatMap((post) => post.tags))).sort()} />
              </section>
            )}
          </>
        ) : (
          <p className="text-muted">Articles are coming soon.</p>
        )}
      </div>
    </>
  );
}
