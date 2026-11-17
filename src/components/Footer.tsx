import Link from "next/link";
import { siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 mt-32">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Pawan Joshi
            </p>
            <p className="text-xs text-neutral-700 mt-1">
              Dehradun, India · Built with Next.js
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              GitHub
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              Twitter
            </Link>
            <Link
              href={siteConfig.links.devto}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              Dev.to
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
