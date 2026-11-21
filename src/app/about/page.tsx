import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, faqs, pageMetadata, personSummary, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import portrait from "../../../public/hero-avatar.png";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { CertificationGrid } from "@/components/CertificationGrid";
import { SkillsGrid } from "@/components/SkillsGrid";
import { ArrowRight, ChevronRight, Download } from "@/components/Icons";
import { certifications, education, experience, siteConfig } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Pawan Joshi: student at Graphic Era University in Dehradun, India, building AI agents and cloud systems, engineering at Tech Sangi, and founder of AWS Student Builder Group GEU.",
  path: "/about",
  ogType: "profile",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/about", name: "About Pawan Joshi", description: personSummary, type: "ProfilePage" }), breadcrumbSchema([{ name: "About", path: "/about" }]), faqSchema()]} />
      <PageHeader eyebrow="About" title="About" />

      <section className="container-x pb-4 pt-4 md:pb-10 md:pt-10" aria-label="Profile">
        <div className="widget fade-up flex flex-col items-center gap-4 p-6 text-center md:flex-row md:gap-8 md:p-10 md:text-left">
          <span className="relative size-24 shrink-0 overflow-hidden rounded-full border border-line-strong shadow-[var(--shadow)] md:size-36">
            <Image src={portrait} alt="Portrait of Pawan Joshi" fill priority sizes="144px" className="object-cover object-[50%_20%]" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-semibold tracking-tight text-fg md:text-4xl md:font-medium" style={{ letterSpacing: "-0.03em" }}>
              Pawan Joshi
            </h2>
            <p className="mt-1 text-[15px] text-subtle md:text-lg">{siteConfig.author.tagline}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5 md:justify-start">
              <a href="/Pawan_Joshi_Resume.pdf" download className="btn btn-primary !rounded-full px-5">
                <Download size={16} /> Résumé
              </a>
              <Link href="/contact" className="btn btn-secondary !rounded-full px-5">
                Contact <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted md:mt-12 md:text-xl" data-reveal>
          <p>
            I&apos;m a student at Graphic Era University in Dehradun, India. I build AI agents and
            cloud systems, and I&apos;m engineering at{" "}
            <a className="text-accent hover:underline" href={siteConfig.links.techSangi} target="_blank" rel="noopener noreferrer">
              Tech Sangi
            </a>
            .
          </p>
          <p>
            I founded AWS Student Builder Group GEU and have mentored 500+ students in cloud and AI.
            I write about what I learn and build in public.
          </p>
        </div>
      </section>
      <section className="section" aria-labelledby="experience-title">
        <div className="container-x" data-reveal>
          <SectionHeading id="experience-title" title="Experience" />
          <ExperienceTimeline roles={experience} />
        </div>
      </section>

      <section className="section" aria-labelledby="education-title">
        <div className="container-x" data-reveal>
          <SectionHeading id="education-title" title="Education" />
          <ul className="card divide-y divide-line overflow-hidden rounded-2xl">
            {education.map((item) => (
              <li key={item.id} className="px-5 py-4">
                <h3 className="text-[15px] font-medium text-fg">{item.institution}</h3>
                <p className="text-sm text-subtle">{item.location}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="certifications" className="section" aria-labelledby="certs-title">
        <div className="container-x" data-reveal>
          <SectionHeading id="certs-title" title="Certifications" />
          <CertificationGrid items={certifications} />
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <div className="container-x" data-reveal>
          <SectionHeading id="skills-title" title="Skills" />
          <SkillsGrid />
        </div>
      </section>
      <section className="section" aria-labelledby="faq-title">
        <div className="container-x" data-reveal>
          <SectionHeading id="faq-title" title="Questions" />
          <div className="widget divide-y divide-line overflow-hidden">
            {faqs.map((item) => (
              <details key={item.q} className="group/faq">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-[15px] font-medium text-fg md:text-lg">
                  <h3>{item.q}</h3>
                  <ChevronRight size={18} className="shrink-0 text-subtle transition group-open/faq:rotate-90" />
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted md:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}