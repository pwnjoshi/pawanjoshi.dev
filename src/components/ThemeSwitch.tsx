"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "./Icons";
import { cn } from "@/lib/utils";

type Choice = "light" | "dark" | "system";

const options: { value: Choice; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "Auto", Icon: Monitor },
];

function apply(choice: Choice) {
  const dark =
    choice === "dark" || (choice === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  try {
    if (choice === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", choice);
  } catch {
    /* storage unavailable; the choice applies for this visit only */
  }
}

/** iOS-style segmented control: Light, Dark, Auto. */
export function ThemeSwitch({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [choice, setChoice] = useState<Choice>("system");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      // Reading the saved preference after mount avoids a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "light" || saved === "dark") setChoice(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const index = options.findIndex((option) => option.value === choice);

  return (
    <div role="radiogroup" aria-label="Appearance" className={cn("relative grid grid-cols-3 bg-fg/[0.07] p-1", compact ? "rounded-xl" : "rounded-2xl", className)}>
      <span
        aria-hidden="true"
        className="absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem)/3)] rounded-[0.6rem] bg-surface shadow-[0_2px_8px_rgb(0_0_0/0.12)] transition-transform duration-500 ease-[cubic-bezier(0.3,1.3,0.4,1)]"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={choice === value}
          aria-label={compact ? label : undefined}
          title={compact ? label : undefined}
          onClick={() => {
            setChoice(value);
            apply(value);
          }}
          className={cn(
            "pressable relative flex items-center justify-center gap-1.5 rounded-[0.6rem] text-sm font-medium transition-colors",
            compact ? "min-h-9" : "min-h-11",
            choice === value ? "text-fg" : "text-subtle"
          )}
        >
          <Icon size={16} />
          {!compact && label}
        </button>
      ))}
    </div>
  );
}
