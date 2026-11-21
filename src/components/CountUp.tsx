"use client";

import { useEffect, useRef } from "react";

/** Counts up to a value like "500+" when it scrolls into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const match = /^(\d+)(.*)$/.exec(value);
    if (!element || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const end = Number(match[1]);
    const suffix = match[2];
    let frame = 0;
    element.textContent = `0${suffix}`;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / 1400, 1);
        element.textContent = `${Math.round(end * (1 - Math.pow(1 - t, 4)))}${suffix}`;
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      element.textContent = value;
    };
  }, [value]);

  // innerHTML is set once and then mutated directly, so React never reconciles these children.
  return <span ref={ref} className={className} dangerouslySetInnerHTML={{ __html: value }} />;
}
