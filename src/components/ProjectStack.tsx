"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { projects as projectData } from "@/lib/content";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ArrowUpRight } from "./Icons";

type Project = (typeof projectData)[number];

/**
 * Full-height project panels that stick and stack as you scroll.
 * Each covered panel shrinks and dims (transform + opacity only, one rAF per scroll).
 */
export function ProjectStack({ projects }: { projects: Project[] }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-card]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        let progress = 0;
        if (next) {
          const top = card.getBoundingClientRect().top;
          const nextTop = next.getBoundingClientRect().top;
          progress = Math.min(Math.max(1 - (nextTop - top) / (vh * 0.85), 0), 1);
        }
        card.style.setProperty("--stack", progress.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={list} className="relative">
      {projects.map((project, index) => (
        <li
          key={project.id}
          className="sticky pb-3 md:pb-10"
          style={{ top: `calc(var(--stack-top) + ${index * 1}rem)` }}
        >
          <article
            data-stack-card
            className="stack-card card-hover group relative grid overflow-hidden rounded-[1.6rem] border border-line-strong bg-surface md:min-h-[72vh] md:grid-cols-[1.05fr_1fr] md:rounded-[2rem]"
          >
            <div className="stack-shade pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-bg" aria-hidden="true" />

            <div className="relative flex flex-col p-4 md:p-10 lg:p-14">
              <div className="flex items-center gap-2.5 text-xs text-subtle md:gap-3 md:text-sm">
                <span className="font-mono text-accent">{project.number}</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                <span>{project.category}</span>
              </div>

              <h3
                className="mt-2 text-xl font-medium leading-tight text-fg md:mt-6 md:text-5xl md:leading-[1.02] lg:text-6xl"
                style={{ letterSpacing: "-0.04em" }}
              >
                {project.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 max-w-md text-sm leading-relaxed text-muted md:mt-5 md:line-clamp-none md:text-lg">{project.contribution}</p>

              <ul className="mt-6 hidden flex-wrap gap-2 md:flex">
                {project.metrics.slice(0, 3).map((metric) => (
                  <li key={metric} className="rounded-full bg-bg px-3.5 py-1.5 text-sm text-fg">
                    {metric}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-3 md:pt-8">
                <Link
                  href={`/work#${project.id}`}
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-fg after:absolute after:inset-0 after:z-20 md:gap-3 md:text-base"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-fg text-bg md:size-12 transition duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-fg">
                    <ArrowUpRight size={20} />
                  </span>
                  Read the case study
                </Link>
              </div>
            </div>

            <div className="relative order-first h-32 border-b border-line md:order-none md:h-auto md:border-b-0 md:border-l">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_60%)]" aria-hidden="true" />
              <div className="absolute inset-2 transition-transform duration-700 ease-out group-hover:scale-[1.04] md:inset-10">
                <ArchitectureDiagram nodes={project.skills} seed={index} />
              </div>
              <span
                className="pointer-events-none absolute -bottom-4 right-3 select-none text-7xl font-medium leading-none tracking-tighter text-fg/[0.05] md:-bottom-6 md:right-4 md:text-[13rem]"
                aria-hidden="true"
              >
                {project.number}
              </span>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
