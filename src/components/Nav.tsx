"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/now", label: "Now" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-900 bg-neutral-950/90 backdrop-blur-sm">
      <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium text-neutral-300 hover:text-neutral-100 transition-colors tracking-tight"
        >
          Pawan Joshi
        </Link>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-neutral-100"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
