import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pawan Joshi — engineering opportunities, research inquiries, and cloud architecture projects.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <div className="mb-16">
        <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
          06 — Get in Touch
        </p>
        <h1 className="text-3xl font-medium text-neutral-100 tracking-tight mb-4">
          Let&apos;s build together.
        </h1>
        <p className="text-neutral-500 max-w-lg leading-relaxed">
          Have an engineering opportunity, a research inquiry, or a cloud
          architecture project to discuss? Drop a note below or reach out
          directly.
        </p>
      </div>

      <div className="grid sm:grid-cols-[1fr,220px] gap-12">
        {/* Form (client component) */}
        <ContactForm />

        {/* Direct channels */}
        <div>
          <div className="mb-6">
            <p className="text-xs font-mono text-neutral-700 tracking-widest uppercase mb-4">
              Direct
            </p>
            <Link
              href="mailto:me@joshipawan.com.np"
              className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors break-all"
            >
              {siteConfig.author.email}
            </Link>
          </div>

          <div>
            <p className="text-xs font-mono text-neutral-700 tracking-widest uppercase mb-4">
              Channels
            </p>
            <div className="space-y-3">
              {[
                { label: "LinkedIn", href: siteConfig.links.linkedin },
                { label: "GitHub", href: siteConfig.links.github },
                { label: "Twitter / X", href: siteConfig.links.twitter },
                {
                  label: "AWS Community",
                  href: siteConfig.links.awsCommunity,
                },
                { label: "Dev.to", href: siteConfig.links.devto },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                  {link.label}
                  <ArrowUpRight size={10} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
