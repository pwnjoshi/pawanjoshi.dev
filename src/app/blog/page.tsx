import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering articles, build logs, and technical write-ups on AWS cloud architecture, agent orchestration, and production debugging.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <div className="mb-16">
        <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
          04 — Writing & Notes
        </p>
        <h1 className="text-3xl font-medium text-neutral-100 tracking-tight mb-4">
          Articles & Engineering Notes
        </h1>
        <p className="text-neutral-500 max-w-lg leading-relaxed">
          Practical write-ups on AWS cloud architecture, agent orchestration,
          and production debugging. One article every two weeks.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-neutral-600 text-sm">
            Articles coming soon. Follow on{" "}
            <Link
              href="https://dev.to/pwnjoshi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-2"
            >
              Dev.to
            </Link>{" "}
            in the meantime.
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`py-6 ${i < posts.length - 1 ? "border-b border-neutral-900" : ""}`}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <time className="text-xs font-mono text-neutral-700">
                        {post.date}
                      </time>
                      <span className="text-xs text-neutral-800">·</span>
                      <span className="text-xs text-neutral-700">
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="text-base font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors leading-snug mb-2">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-neutral-700 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-neutral-700 group-hover:text-neutral-500 transition-colors shrink-0 mt-1">
                    →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-neutral-900">
        <p className="text-xs text-neutral-700">
          Also published on{" "}
          <Link
            href="https://dev.to/pwnjoshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Dev.to
          </Link>{" "}
          with canonical URLs pointing here.
        </p>
      </div>
    </div>
  );
}
