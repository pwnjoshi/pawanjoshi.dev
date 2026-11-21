import Image from "next/image";
import Link from "next/link";
import portrait from "../../public/hero-avatar.png";
import { ArrowRight, Download, MapPin } from "@/components/Icons";
import { SocialLinks } from "@/components/SocialLinks";
import { SectionHeading } from "@/components/SectionHeading";
import { PostCard } from "@/components/PostCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { CertificationGrid } from "@/components/CertificationGrid";
import { SkillsGrid } from "@/components/SkillsGrid";
import { DotField } from "@/components/DotField";
import { HeroStage } from "@/components/HeroStage";
import { Magnetic } from "@/components/Magnetic";
import { Marquee } from "@/components/Marquee";
import { ProximityText } from "@/components/ProximityText";
import { RoleRotator } from "@/components/RoleRotator";
import { CountUp } from "@/components/CountUp";
import { ScrollText } from "@/components/ScrollText";
import { ProjectStack } from "@/components/ProjectStack";
import { Widgets } from "@/components/Widgets";
import { getPostSummaries } from "@/lib/blog";
import { JsonLd } from "@/components/JsonLd";
import { personSummary, webPageSchema } from "@/lib/seo";
import { certifications, experience, projects, siteConfig, stats } from "@/lib/content";

const floaters = [
  { label: "LangGraph", className: "left-[4%] top-[14%]", depth: 26, bob: "0s" },
  { label: "AWS", className: "right-[5%] top-[20%]", depth: -20, bob: "-2s" },
  { label: "Python", className: "bottom-[24%] left-[7%]", depth: 34, bob: "-4s" },
  { label: "Next.js", className: "bottom-[30%] right-[8%]", depth: -28, bob: "-1s" },
];

export default function HomePage() {
  const posts = getPostSummaries().slice(0, 3);

  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/", name: "Pawan Joshi — AI and Cloud Engineer", description: personSummary, type: "ProfilePage" })]} />
      {/* Hero */}
      <section
        className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center overflow-hidden md:-mt-20 md:min-h-svh md:pt-20"
        aria-labelledby="home-title"
      >
        <div className="aurora aurora-fade" aria-hidden="true"><span /><span /><span /><span /></div>
        <DotField className="dot-mask pointer-events-none absolute inset-0 size-full" />

        <HeroStage className="relative flex w-full flex-1 items-center">
          {/* Floating technology chips (desktop) */}
          {floaters.map((item) => (
            <div
              key={item.label}
              className={`depth pointer-events-none absolute hidden lg:block ${item.className}`}
              style={{ "--depth": item.depth } as React.CSSProperties}
              aria-hidden="true"
            >
              <span
                className="float-bob block rounded-full border border-line bg-surface/70 px-4 py-2 text-sm text-muted backdrop-blur-md"
                style={{ "--bob": item.bob } as React.CSSProperties}
              >
                {item.label}
              </span>
            </div>
          ))}

          <div className="container-x relative flex flex-col items-start py-8 text-left md:items-center md:py-16 md:text-center">
            {/* Phone: identity row, like a contact card */}
            <div className="fade-up flex items-center gap-3 md:hidden">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-full border border-line-strong bg-surface shadow-[var(--shadow)]">
                <Image src={portrait} alt="Pawan Joshi" fill preload sizes="56px" className="object-cover object-[50%_20%]" />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[15px] font-medium text-fg">Graphic Era University</span>
                <span className="mt-0.5 inline-flex items-center gap-1 text-[13px] text-subtle">
                  <MapPin size={12} /> Dehradun, India
                </span>
              </span>
            </div>

            {/* Desktop: location badge */}
            <p className="glass fade-up hidden items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-muted md:inline-flex">
              <MapPin size={13} /> Graphic Era University · Dehradun, India
            </p>

            <h1
              id="home-title"
              className="mt-6 flex flex-wrap items-center justify-start gap-x-[0.14em] text-[clamp(3.75rem,20vw,5.5rem)] text-fg md:mt-9 md:justify-center md:text-[clamp(5rem,11vw,9.5rem)]"
              style={{ letterSpacing: "-0.055em", lineHeight: 0.92 }}
            >
              <span
                className="depth relative hidden h-[0.78em] w-[0.78em] overflow-hidden rounded-full border border-line-strong bg-surface shadow-[var(--shadow)] md:inline-block"
                style={{ "--depth": -16 } as React.CSSProperties}
              >
                <Image src={portrait} alt="Pawan Joshi" fill preload sizes="9vw" className="object-cover object-[50%_20%]" />
              </span>
              <ProximityText text="Pawan Joshi" />
            </h1>

            <p
              className="fade-up fade-up-3 mt-5 text-[1.75rem] font-medium leading-tight text-fg md:mt-8 md:text-5xl"
              style={{ letterSpacing: "-0.035em" }}
            >
              <span className="text-subtle">I build </span>
              <RoleRotator />
            </p>
            <p className="fade-up fade-up-3 mt-3 text-[15px] leading-relaxed text-subtle md:mt-4 md:text-lg">
              <span className="block">
                Engineering at{" "}
                <a href={siteConfig.links.techSangi} target="_blank" rel="noopener noreferrer" className="text-fg underline-offset-4 hover:underline">
                  Tech Sangi
                </a>
                .
              </span>
              <span className="block">Founder of AWS Student Builder Group GEU.</span>
            </p>

            {/* One row on every screen: a primary action and a compact secondary one */}
            <div className="fade-up fade-up-4 mt-8 flex w-full items-center gap-2.5 md:mt-9 md:w-auto md:gap-3">
              <Magnetic className="min-w-0 flex-1 md:flex-none">
                <Link href="/work" className="btn btn-primary !min-h-[3.25rem] w-full !rounded-full px-6 text-[15px] md:!min-h-12 md:w-auto md:px-7 md:text-sm">
                  See my work <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Magnetic className="shrink-0">
                <a
                  href="/Pawan_Joshi_Resume.pdf"
                  download
                  className="btn btn-secondary glass !min-h-[3.25rem] !rounded-full px-5 text-[15px] md:!min-h-12 md:px-7 md:text-sm"
                >
                  <Download size={16} /> Résumé
                </a>
              </Magnetic>
            </div>

            {/* Phone: compact stats card. Equal columns, numbers on one baseline, labels on one line. */}
            <dl className="glass fade-up fade-up-4 mt-5 grid w-full grid-cols-3 rounded-[1.4rem] md:hidden">
              {stats.map(({ value, label }, index) => (
                <div
                  key={label}
                  className={`flex flex-col items-center justify-center px-1 py-3.5 text-center ${index > 0 ? "border-l border-line" : ""}`}
                >
                  <dt className="order-2 mt-1.5 whitespace-nowrap text-[11px] leading-none text-subtle">{label}</dt>
                  <dd className="order-1 text-[1.5rem] font-semibold leading-none tracking-tight text-fg tabular-nums">
                    <CountUp value={value} />
                  </dd>
                </div>
              ))}
            </dl>          </div>
        </HeroStage>

        {/* Bottom bar: stats on the left, location and links on the right */}
        <div className="fade-up fade-up-4 container-x relative hidden md:block">
          <div className="flex flex-col items-center gap-6 border-t border-line py-6 sm:flex-row sm:justify-between">
            <dl className="grid w-full grid-cols-3 gap-6 text-center sm:flex sm:w-auto sm:gap-12 sm:text-left">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse gap-0.5">
                  <dt className="text-xs text-subtle">{label}</dt>
                  <dd className="text-2xl font-medium tracking-tight text-fg sm:text-3xl">
                    <CountUp value={value} />
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex items-center gap-5">
              <SocialLinks />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-24 hidden justify-center lg:flex" aria-hidden="true">
          <span className="scroll-cue" />
        </div>
      </section>

      {/* Technologies marquee */}
      <section className="border-y border-line py-8" aria-label="Technologies" data-reveal>
        <Marquee />
      </section>

      {/* Statement */}
      <section className="section" aria-label="Introduction">
        <div className="container-x">
          <ScrollText
            className="max-w-4xl text-3xl font-medium leading-[1.15] tracking-tight text-fg sm:text-6xl"
            text="I build AI agents that handle long, messy tasks and the cloud systems that keep them running. A student at Graphic Era University, I have mentored 500+ students in AWS and AI."
          />
        </div>
      </section>

      {/* At a glance: iOS widgets */}
      <section className="section !pt-0" aria-labelledby="glance-title">
        <div className="container-x">
          <div data-reveal>
            <SectionHeading id="glance-title" title="At a glance" />
          </div>
          <Widgets post={posts[0]} />
        </div>
      </section>

      {/* Projects */}
      <section className="section !pt-0" aria-labelledby="work-title">
        <div className="container-x">
          <div data-reveal>
            <SectionHeading
              id="work-title"
              title="Projects"
              action={<Link href="/work" className="link-arrow">See all <ArrowRight size={14} /></Link>}
            />
          </div>
          <ProjectStack projects={projects} />
        </div>
      </section>

      {/* Experience */}
      <section className="section" aria-labelledby="experience-title">
        <div className="container-x" data-reveal>
          <SectionHeading
            id="experience-title"
            title="Experience"
            action={<Link href="/resume" className="link-arrow">Résumé <ArrowRight size={14} /></Link>}
          />
          <ExperienceTimeline roles={experience} compact />
        </div>
      </section>

      {/* Skills */}
      <section className="section" aria-labelledby="skills-title">
        <div className="container-x" data-reveal>
          <SectionHeading id="skills-title" title="Toolkit" />
          <SkillsGrid />
        </div>
      </section>

      {/* Certifications */}
      <section className="section" aria-labelledby="certs-title">
        <div className="container-x" data-reveal>
          <SectionHeading
            id="certs-title"
            title="Certifications"
            action={<Link href="/about#certifications" className="link-arrow">See all <ArrowRight size={14} /></Link>}
          />
          <CertificationGrid items={certifications.slice(0, 4)} />
        </div>
      </section>

      {/* Writing */}
      <section className="section" aria-labelledby="writing-title">
        <div className="container-x">
          <div data-reveal>
            <SectionHeading
              id="writing-title"
              title="Writing"
              action={<Link href="/blog" className="link-arrow">See all <ArrowRight size={14} /></Link>}
            />
          </div>
          <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
            {posts.map((post, index) => (
              <div key={post.slug} data-reveal style={{ "--d": `${index * 100}ms` } as React.CSSProperties}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section relative overflow-hidden" aria-labelledby="cta-title">
        <div className="aurora" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="container-x relative text-center" data-reveal>
          <h2 id="cta-title" className="text-[clamp(3rem,13vw,9rem)] text-fg" style={{ letterSpacing: "-0.05em", lineHeight: 0.95 }}>
            <ProximityText text="Get in touch" />
          </h2>
          <p className="mt-6 text-subtle">{siteConfig.author.email}</p>
          <div className="mt-8 flex justify-center">
            <Magnetic className="inline-block">
              <Link href="/contact" className="btn btn-primary !min-h-14 !rounded-full px-9 text-base">
                Contact <ArrowRight size={18} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
