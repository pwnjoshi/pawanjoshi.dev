"use client";

import { useEffect, useRef } from "react";

type CustomElementProps = React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> };

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "emoji-picker": CustomElementProps;
      "emoji-picker-search": CustomElementProps;
      "emoji-picker-grid": CustomElementProps;
      "emoji-picker-empty": CustomElementProps;
    }
  }
}

export function EmojiPicker({
  label = "Emoji",
  onSelect,
}: {
  label?: string;
  onSelect?: (emoji: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Custom elements are defined in the browser only.
    void import("./emoji-picker-web");
    const onChange = (event: Event) => {
      const { value } = (event as CustomEvent<{ value: string }>).detail;
      onSelectRef.current?.(value);
    };
    element.addEventListener("valuechange", onChange);
    return () => element.removeEventListener("valuechange", onChange);
  }, []);

  return (
    <emoji-picker ref={ref} aria-label={label} className="emoji-picker">
      <emoji-picker-search>
        <input aria-label="Search emoji" placeholder="Search emoji" />
      </emoji-picker-search>
      <emoji-picker-grid aria-label={label} />
      <emoji-picker-empty>No emoji found</emoji-picker-empty>
    </emoji-picker>
  );
}
