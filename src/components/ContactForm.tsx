"use client";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-8">
        <p className="text-sm text-neutral-400 mb-2">Message sent.</p>
        <p className="text-xs text-neutral-600">
          I&apos;ll get back to you within a few days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs text-neutral-600 hover:text-neutral-400 transition-colors underline underline-offset-2"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs text-neutral-600 mb-2 tracking-wide uppercase">
          Name
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-600 mb-2 tracking-wide uppercase">
          Email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-xs text-neutral-600 mb-2 tracking-wide uppercase">
          Message
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2.5 text-sm text-neutral-200 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
          placeholder="Tell me about your project, opportunity, or question..."
        />
      </div>
      {status === "error" && (
        <p className="text-xs text-red-500">
          Something went wrong. Please email me directly at{" "}
          <a
            href="mailto:me@joshipawan.com.np"
            className="underline underline-offset-2"
          >
            me@joshipawan.com.np
          </a>
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-sm text-neutral-300 hover:text-neutral-100 py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
