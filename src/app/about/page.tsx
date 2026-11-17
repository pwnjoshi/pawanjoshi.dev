import type { Metadata } from "next";
import Link from "next/link";
import {
  experience,
  certifications,
  techStack,
  siteConfig,
} from "@/lib/content";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer specializing in autonomous AI agents and cloud infrastructure. Co-Founder at Tech Sangi, founding leader of AWS Student Builder Group.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      {/* Intro */}
      <div className="mb-20">
        <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
          About
        </p>
        <h1 className="text-3xl font-medium text-neutral-100 tracking-tight mb-6">
          Pawan Joshi
        </h1>
        <div className="space-y-4 text-neutral-500 leading-relaxed max-w-2xl">
          <p>
            I&apos;m a software engineer based in Dehradun, India, focused on
            building autonomous AI systems and cloud-native infrastructure. My
            work sits at the intersection of agent frameworks, distributed
            systems, and production engineering.
          </p>
          <p>
            Currently co-founding{" "}
            <Link
              href="https://techsangi.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors underline underline-offset-2 decoration-neutral-700"
            >
              Tech Sangi
            </Link>
            , leading the AWS Student Builder Group at Graphic Era University,
            and exploring what it means to build agents that can actually do
            useful work reliably.
          </p>
          <p>
            I believe in building things in public, writing about what I learn,
            and making cloud and AI education accessible to students across
            India.
          </p>
        </div>
        <div className="flex gap-4 mt-6">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            GitHub <ArrowUpRight size={10} />
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            LinkedIn <ArrowUpRight size={10} />
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Twitter <ArrowUpRight size={10} />
          </Link>
          <Link
            href={siteConfig.links.awsCommunity}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            AWS Community <ArrowUpRight size={10} />
          </Link>
        </div>
      </div>

      {/* Experience */}
      <section className="mb-20">
        <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-8">
          01 — Experience & Leadership
        </h2>
        <div className="space-y-10">
          {experience.map((exp) => (
            <div key={exp.id} className="grid sm:grid-cols-[180px,1fr] gap-4">
              <div className="shrink-0">
                <p className="text-xs font-mono text-neutral-700 leading-relaxed">
                  {exp.period}
                </p>
                <p className="text-xs text-neutral-700 mt-0.5">{exp.location}</p>
              </div>
              <div>
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-200">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-neutral-500">{exp.company}</p>
                  </div>
                  {exp.credentialUrl && (
                    <Link
                      href={exp.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-500 transition-colors shrink-0"
                    >
                      {exp.credentialLabel}
                      <ArrowUpRight size={9} />
                    </Link>
                  )}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed mt-2 mb-3">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-20">
        <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-8">
          03 — Certifications & Credentials
        </h2>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-start justify-between gap-4 py-4 border-b border-neutral-900 last:border-0"
            >
              <div>
                <p className="text-xs text-neutral-700 mb-1">{cert.category}</p>
                <h3 className="text-sm font-medium text-neutral-300">
                  {cert.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  {cert.issuer} · {cert.issued}
                </p>
              </div>
              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-500 transition-colors shrink-0"
              >
                Verify
                <ArrowUpRight size={9} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-8">
          05 — Technical Stack
        </h2>
        <div className="space-y-8">
          {Object.entries(techStack).map(([category, data]) => (
            <div key={category} className="grid sm:grid-cols-[200px,1fr] gap-4">
              <div>
                <h3 className="text-sm font-medium text-neutral-400">
                  {category}
                </h3>
                <p className="text-xs text-neutral-700 mt-1">{data.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
