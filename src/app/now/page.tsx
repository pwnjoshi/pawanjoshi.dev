import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Now",
  description: "What Pawan Joshi is building, learning and writing right now.",
  path: "/now",
});

const sections = [
  {
    title: "Building",
    items: [
      "Engineering at Tech Sangi: cloud-native products and internal tools.",
      "Growing the AWS Student Builder Group at Graphic Era University and preparing AWS Student Community Day Dehradun 2026.",
      "More reliable multi-step AI agents for real workloads.",
    ],
  },
  {
    title: "Learning",
    items: [
      "Distributed systems that are fault-tolerant by design.",
      "Advanced LangGraph: multi-agent coordination, shared memory, and long-horizon planning.",
    ],
  },
  {
    title: "Writing",
    items: ["Articles on AWS and agent systems, cross-posted to Dev.to."],
  },
  {
    title: "Community",
    items: ["Google Student Ambassador at Graphic Era, running Gemini API workshops."],
  },
];

export default function NowPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/now", name: "What Pawan Joshi is doing now", description: "Current focus of Pawan Joshi." }), breadcrumbSchema([{ name: "Now", path: "/now" }])]} />
      <PageHeader eyebrow="Now" title="Now">
        <p>Updated November 2026 · {siteConfig.author.location}</p>
      </PageHeader>

      <div className="container-x space-y-6 pb-10 pt-4 md:py-14">
        {sections.map((section) => (
          <section data-reveal key={section.title} aria-labelledby={`now-${section.title}`}>
            <h2 id={`now-${section.title}`} className="mb-2 px-1 text-sm text-subtle">{section.title}</h2>
            <ul className="card divide-y divide-line overflow-hidden rounded-2xl">
              {section.items.map((item) => (
                <li key={item} className="px-5 py-4 text-[15px] leading-relaxed text-fg">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
