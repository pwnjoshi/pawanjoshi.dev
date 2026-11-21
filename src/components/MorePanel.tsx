"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/content";
import { Clock, Download, FileText, GitHub, LinkedIn, Mail, XIcon } from "./Icons";
import { ThemeSwitch } from "./ThemeSwitch";
import { cn } from "@/lib/utils";

const rows = [
  { label: "Résumé", href: "/resume", Icon: FileText },
  { label: "Now", href: "/now", Icon: Clock },
  { label: "Contact", href: "/contact", Icon: Mail },
];

const socials = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GitHub },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedIn },
  { label: "X", href: siteConfig.links.twitter, Icon: XIcon },
];

/** A compact iOS context menu that grows out of the More button. */
export function MorePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const menu = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      // Mount on open; unmount after the closing animation.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const id = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, 220);
    return () => window.clearTimeout(id);
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    menu.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="More">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className={cn("menu-backdrop absolute inset-0", closing && "menu-backdrop-out")}
      />
      <div
        ref={menu}
        className={cn(
          "glass glass-strong menu-pop absolute bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-3 w-[15.5rem] overflow-hidden rounded-[1.4rem]",
          closing && "menu-pop-out"
        )}
        style={{ "--glass-tint": "color-mix(in oklab, var(--surface) 80%, transparent)" } as React.CSSProperties}
      >
        <ul className="divide-y divide-line">
          {rows.map(({ label, href, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className="flex min-h-11 items-center justify-between px-4 text-[17px] text-fg active:bg-fg/10"
              >
                {label}
                <Icon size={19} className="text-muted" />
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/Pawan_Joshi_Resume.pdf"
              download
              onClick={onClose}
              className="flex min-h-11 items-center justify-between px-4 text-[17px] text-fg active:bg-fg/10"
            >
              Download PDF
              <Download size={19} className="text-muted" />
            </a>
          </li>
        </ul>

        <div className="h-2 bg-fg/[0.06]" aria-hidden="true" />

        <div className="space-y-2 p-2">
          <ThemeSwitch compact />
          <ul className="grid grid-cols-3 gap-1.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-10 items-center justify-center rounded-xl text-fg active:bg-fg/10"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
