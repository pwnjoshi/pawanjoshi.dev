import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer data-site-footer className="border-t border-line">
      <div className="container-x flex flex-col items-center gap-5 py-8 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-sm text-subtle">
          © {new Date().getFullYear()} Pawan Joshi · {siteConfig.author.location}
        </p>
        <SocialLinks />
        <Link href="/contact" className="hidden text-sm text-accent hover:underline md:inline">
          {siteConfig.author.email}
        </Link>
      </div>
    </footer>
  );
}
