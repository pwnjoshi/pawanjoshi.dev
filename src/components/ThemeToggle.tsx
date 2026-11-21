"use client";

import { Moon, Sun } from "./Icons";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable; the choice applies for this visit only */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="pressable inline-flex size-10 items-center justify-center rounded-full text-muted transition hover:bg-fg/5 hover:text-fg"
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </button>
  );
}
