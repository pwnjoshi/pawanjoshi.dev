"use client";

import type { PointerEvent, ReactNode } from "react";

export function WorldStage({ children }: { children: ReactNode }) {
  function trackPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || (event.target as Element).closest("dialog")) return;

    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    stage.style.setProperty("--world-x", `${(x - 0.5) * 28}px`);
    stage.style.setProperty("--world-y", `${(y - 0.5) * 22}px`);
    stage.style.setProperty("--world-tilt", `${(x - 0.5) * 10}deg`);
    stage.style.setProperty("--world-pitch", `${(0.5 - y) * 8}deg`);
    stage.toggleAttribute("data-pointer", true);
  }

  function resetPointer(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.removeAttribute("data-pointer");
  }

  return (
    <div
      className="island-stage"
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      {children}
    </div>
  );
}
