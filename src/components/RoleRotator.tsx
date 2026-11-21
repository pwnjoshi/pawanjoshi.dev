"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const words = ["AI agents", "cloud systems", "full-stack products"];

/** Cross-fading phrase whose box resizes to the current word, so the sentence stays centered. */
export function RoleRotator() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const measure = () => setWidth(spans.current[index]?.offsetWidth ?? null);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  return (
    <>
      <span className="sr-only">AI agents, cloud systems, and full-stack products</span>
      <span
        aria-hidden="true"
        className="relative inline-block whitespace-nowrap text-left align-baseline transition-[width] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ width: width ?? undefined }}
      >
        {/* Invisible copy of the current word gives the box its height before measuring. */}
        <span className="invisible">{words[index]}</span>
        {words.map((word, i) => (
          <span
            key={word}
            ref={(el) => {
              spans.current[i] = el;
            }}
            className={cn(
              "absolute left-0 top-0 transition duration-700 ease-out",
              i === index
                ? "translate-y-0 opacity-100 blur-0 delay-150"
                : i === (index + words.length - 1) % words.length
                  ? "-translate-y-[0.35em] opacity-0 blur-[2px] duration-300"
                  : "translate-y-[0.35em] opacity-0 blur-[2px]"
            )}
          >
            {word}
          </span>
        ))}
      </span>
    </>
  );
}
