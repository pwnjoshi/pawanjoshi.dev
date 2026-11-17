import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Now",
  description: "What Pawan Joshi is currently building, learning, and thinking about.",
};

export default function NowPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <div className="mb-12">
        <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
          Now
        </p>
        <h1 className="text-3xl font-medium text-neutral-100 tracking-tight mb-2">
          What I&apos;m doing now
        </h1>
        <p className="text-xs font-mono text-neutral-700">
          Updated November 2026 · Dehradun, India
        </p>
      </div>

      <div className="space-y-10 max-w-2xl">
        <section>
          <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
            Building
          </h2>
          <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
            <p>
              Running engineering at{" "}
              <Link
                href="https://techsangi.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-200 transition-colors underline underline-offset-2 decoration-neutral-800"
              >
                Tech Sangi
              </Link>{" "}
              — shipping cloud-native products for clients, maintaining 8+
              production systems, and iterating on internal tooling.
            </p>
            <p>
              Growing the{" "}
              <Link
                href="https://builder.aws.com/community/student-builder-groups"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-200 transition-colors underline underline-offset-2 decoration-neutral-800"
              >
                AWS Student Builder Group
              </Link>{" "}
              at Graphic Era University. Currently preparing for AWS Student
              Community Day Dehradun 2026 — organizing workshops, speakers, and
              cloud labs for 400+ members.
            </p>
            <p>
              Experimenting with agentic AI systems: working on more robust
              multi-step agent architectures that can handle real production
              workloads without human-in-the-loop intervention.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
            Learning
          </h2>
          <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
            <p>
              Going deeper on distributed systems — specifically how to design
              systems that are fault-tolerant by default rather than by
              afterthought.
            </p>
            <p>
              Studying advanced LangGraph patterns: multi-agent coordination,
              shared memory architectures, and long-horizon task planning with
              human-in-the-loop checkpoints.
            </p>
            <p>
              Reading: systems design papers, AWS architecture blogs, and
              anything written by practitioners who have built and broken
              production infrastructure.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
            Writing
          </h2>
          <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
            <p>
              Publishing technical articles on AWS cloud architecture and agent
              systems — targeting one high-quality post every two weeks. Cross-posting
              to{" "}
              <Link
                href="https://dev.to/pwnjoshi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-200 transition-colors underline underline-offset-2 decoration-neutral-800"
              >
                Dev.to
              </Link>{" "}
              with canonical URLs pointing here.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-4">
            Community
          </h2>
          <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
            <p>
              Active as Google Student Ambassador at Graphic Era — running
              Gemini API workshops and helping students build their first
              AI-powered applications.
            </p>
          </div>
        </section>

        <div className="pt-6 border-t border-neutral-900">
          <p className="text-xs text-neutral-700">
            Inspired by{" "}
            <Link
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              Derek Sivers&apos; /now movement
              <ArrowUpRight size={9} className="inline ml-0.5" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
