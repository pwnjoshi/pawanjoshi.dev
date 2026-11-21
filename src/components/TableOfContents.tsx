"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="no-print">
      <p className="eyebrow">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-line text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l py-1.5 leading-snug transition-colors",
                heading.level === 3 ? "pl-7" : "pl-4",
                activeId === heading.id
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-subtle hover:text-fg"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
