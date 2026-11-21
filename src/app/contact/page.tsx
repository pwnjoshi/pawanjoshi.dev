import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { ArrowUpRight, GitHub, LinkedIn, Mail, MapPin, XIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Pawan Joshi about internships, roles, projects and collaborations. Email me@pawanjoshi.dev.",
  path: "/contact",
});

const channels = [
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedIn },
  { label: "GitHub", href: siteConfig.links.github, Icon: GitHub },
  { label: "X (Twitter)", href: siteConfig.links.twitter, Icon: XIcon },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/contact", name: "Contact Pawan Joshi", description: "Ways to reach Pawan Joshi.", type: "ContactPage" }), breadcrumbSchema([{ name: "Contact", path: "/contact" }])]} />
      <PageHeader eyebrow="Contact" title="Contact">
        <p>Questions, projects, or opportunities. I usually reply within a few days.</p>
      </PageHeader>

      <div className="container-x grid gap-4 pb-10 pt-4 md:gap-5 md:py-14 lg:grid-cols-[1.4fr_1fr]">
        <section className="widget p-5 md:p-8" aria-labelledby="contact-message-heading" data-reveal>
          <h2 id="contact-message-heading" className="mb-5 text-lg font-medium tracking-tight text-fg">
            Send a message
          </h2>
          <ContactForm />
        </section>

        <aside className="space-y-4 md:space-y-5" aria-label="Other ways to reach me" data-reveal>
          <div className="widget p-5 md:p-6">
            <p className="eyebrow">Email</p>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="mt-3 inline-flex items-center gap-2 break-all font-medium text-fg hover:text-accent"
            >
              <Mail size={18} /> {siteConfig.author.email}
            </a>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-subtle">
              <MapPin size={15} /> {siteConfig.author.location}
            </p>
          </div>

          <div className="widget p-1.5">
            <ul>
              {channels.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-fg transition hover:bg-surface-2"
                  >
                    <span className="inline-flex items-center gap-3"><Icon size={18} /> {label}</span>
                    <ArrowUpRight size={16} className="text-subtle" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
