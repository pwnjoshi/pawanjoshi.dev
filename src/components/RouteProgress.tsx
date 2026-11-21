"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * A thin accent line at the top while a page change is in flight. It appears only
 * after 120ms, so instant (prefetched) navigations show nothing at all.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setState("loading"), 120);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    window.clearTimeout(timer.current);
    // The route changed: finish the bar, then hide it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((current) => (current === "loading" ? "done" : "idle"));
    const id = window.setTimeout(() => setState("idle"), 450);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2.5px]">
      <div
        className="route-bar h-full origin-left bg-accent"
        data-state={state}
      />
    </div>
  );
}
