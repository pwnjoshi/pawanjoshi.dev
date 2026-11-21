"use client";
import { useState } from "react";
import { Check } from "./Icons";
import { siteConfig } from "@/lib/content";
import { EmojiPicker } from "./emoji-picker/EmojiPicker";

const fieldClass =
  "w-full rounded-xl border border-transparent bg-fg/[0.05] px-4 py-3 text-[15px] text-fg placeholder:text-subtle transition focus:border-accent focus:bg-surface focus:outline-none focus:ring-4 focus:ring-accent/15";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [emojiOpen, setEmojiOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "", company: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-line bg-accent-soft p-8 text-center" role="status">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent text-accent-fg">
          <Check size={22} />
        </span>
        <p className="mt-4 text-lg font-medium text-fg">Message sent</p>
        <p className="mt-1 text-sm text-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-accent underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-fg">Name</label>
          <input
            id="contact-name"
            autoComplete="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-fg">Email</label>
          <input
            id="contact-email"
            autoComplete="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-fg">Message</label>
        <textarea
          id="contact-message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${fieldClass} resize-y`}
          placeholder="Tell me about the role, project, or question…"
        />
        <button
          type="button"
          aria-expanded={emojiOpen}
          aria-controls="contact-emoji"
          onClick={() => setEmojiOpen((open) => !open)}
          className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-subtle transition hover:bg-surface-2 hover:text-fg"
        >
          <span aria-hidden="true">🙂</span> {emojiOpen ? "Hide emoji" : "Add emoji"}
        </button>
        <div id="contact-emoji" hidden={!emojiOpen} className="mt-2 rounded-xl border border-line bg-surface p-3">
          <EmojiPicker
            label="Add an emoji to your message"
            onSelect={(emoji) => setForm((current) => ({ ...current, message: current.message + emoji }))}
          />
        </div>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          Something went wrong. Please email me directly at{" "}
          <a href={`mailto:${siteConfig.author.email}`} className="underline underline-offset-4">
            {siteConfig.author.email}
          </a>
          .
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary !min-h-12 w-full !rounded-full disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:px-7">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
