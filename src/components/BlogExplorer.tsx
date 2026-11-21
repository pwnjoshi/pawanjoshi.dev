"use client";

import { useMemo, useState } from "react";
import type { BlogPostSummary } from "@/lib/blog";
import { PostCard } from "./PostCard";
import { Search } from "./Icons";
import { cn } from "@/lib/utils";

export function BlogExplorer({ posts, tags }: { posts: BlogPostSummary[]; tags: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = !active || post.tags.includes(active);
      const matchesQuery =
        !q || `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [posts, active, query]);

  const chip = (selected: boolean) =>
    cn(
      "pressable shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
      selected ? "bg-fg text-bg" : "bg-fg/[0.06] text-muted hover:text-fg"
    );

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row-reverse md:items-center md:justify-between">
        <label className="relative block md:w-72">
          <span className="sr-only">Search articles</span>
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="min-h-11 w-full rounded-xl border border-transparent bg-fg/[0.06] pl-10 pr-3.5 text-[15px] text-fg placeholder:text-subtle focus:border-accent focus:bg-surface focus:outline-none"
          />
        </label>
        <div
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
          role="group"
          aria-label="Filter by tag"
        >
          <button type="button" onClick={() => setActive(null)} aria-pressed={active === null} className={chip(active === null)}>
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(active === tag ? null : tag)}
              aria-pressed={active === tag}
              className={chip(active === tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-subtle" aria-live="polite">
        {visible.length} {visible.length === 1 ? "article" : "articles"}
      </p>

      {visible.length > 0 ? (
        <div className="mt-3 grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl bg-fg/[0.04] p-10 text-center text-muted">No articles match your filters.</p>
      )}
    </div>
  );
}
