"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BookOpen, Briefcase, ChevronLeft, Ellipsis, HomeIcon, UserIcon } from "./Icons";
import { MorePanel } from "./MorePanel";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
  { label: "Résumé", href: "/resume" },
  { label: "Now", href: "/now" },
];

const tabs = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Work", href: "/work", Icon: Briefcase },
  { label: "Writing", href: "/blog", Icon: BookOpen },
  { label: "About", href: "/about", Icon: UserIcon },
];

const titles: Record<string, string> = {
  "/": "Pawan Joshi",
  "/work": "Work",
  "/about": "About",
  "/blog": "Writing",
  "/resume": "Résumé",
  "/now": "Now",
  "/contact": "Contact",
};

export function Nav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const closeMore = useCallback(() => setMoreOpen(false), []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const tabIndex = tabs.findIndex((tab) => isActive(tab.href));

  const isPost = pathname.startsWith("/blog/");
  const title = isPost ? "Article" : titles[pathname] ?? "Pawan Joshi";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 44);
      if (Math.abs(y - last) > 6) {
        setCompact(y > last && y > 120);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      {/* Desktop: floating glass pill */}
      <header data-site-header className="sticky top-0 z-40 -mb-20 hidden h-20 px-6 pt-3 md:block">
        <nav
          aria-label="Main navigation"
          className="glass glass-strong mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full pl-3 pr-2"
        >
          <Link href="/" className="flex items-center gap-2.5 rounded-full py-1 pr-2 font-medium tracking-tight text-fg" aria-label="Pawan Joshi, home">
            <span className="grid size-9 place-items-center rounded-full bg-fg font-mono text-[11px] font-bold text-bg">PJ</span>
            <span className="text-[15px]">Pawan Joshi</span>
          </Link>
          <ul className="flex items-center gap-0.5">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(href) ? "tab-lens text-fg" : "text-muted hover:bg-fg/5 hover:text-fg"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-primary !min-h-10 !rounded-full !px-5">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Phone: iOS navigation bar that appears once the large title scrolls away */}
      <header
        data-site-header
        aria-hidden={!scrolled && !isPost}
        className={cn(
          "fixed inset-x-0 top-0 z-40 pt-safe transition-[opacity,transform] duration-300 md:hidden",
          scrolled || isPost ? "glass-bar opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="relative flex h-11 items-center justify-center px-3">
          {isPost && (
            <Link
              href="/blog"
              className="pressable absolute left-1.5 inline-flex min-h-11 items-center gap-0.5 px-1.5 text-[17px] text-accent"
            >
              <ChevronLeft size={24} /> Writing
            </Link>
          )}
          <span className={cn("text-[17px] font-semibold text-fg transition-opacity", isPost && !scrolled && "opacity-0")}>{title}</span>
        </div>
      </header>

      {/* Phone: floating liquid-glass tab bar plus a separate More button */}
      <nav
        aria-label="Primary"
        data-compact={compact}
        className="no-print fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-[55] flex items-end justify-center gap-2.5 px-4 md:hidden"
      >
        <div className="glass glass-strong tabbar relative flex-1 rounded-full p-1" style={{ maxWidth: compact ? "15.5rem" : "21rem" }}>
          <span
            className="tab-lens absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem)/4)] rounded-full transition-[transform,opacity]"
            style={{ transform: `translateX(${Math.max(tabIndex, 0) * 100}%)`, opacity: tabIndex === -1 ? 0 : 1 }}
            aria-hidden="true"
          />
          <ul className="relative grid grid-cols-4">
            {tabs.map(({ label, href, Icon }, index) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMore}
                  aria-current={isActive(href) ? "page" : undefined}
                  aria-label={label}
                  className={cn(
                    "tabbar-item pressable flex h-[3.25rem] flex-col items-center justify-center rounded-full",
                    tabIndex === index ? "text-accent" : "text-fg/80"
                  )}
                >
                  <Icon size={21} />
                  <span className="tabbar-label mt-0.5 text-[10px] font-medium leading-none">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setMoreOpen((open) => !open)}
          aria-expanded={moreOpen}
          aria-haspopup="dialog"
          aria-label="More"
          className={cn(
            "glass glass-strong pressable tabbar-item grid size-[3.75rem] shrink-0 place-items-center rounded-full transition-colors",
            compact && "!size-[3.25rem]",
            moreOpen || tabIndex === -1 ? "text-accent" : "text-fg/80"
          )}
        >
          <Ellipsis size={22} />
        </button>
      </nav>
      <MorePanel open={moreOpen} onClose={closeMore} />
    </>
  );
}
