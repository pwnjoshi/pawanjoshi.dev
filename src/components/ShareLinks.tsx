"use client";

import { useState } from "react";
import { Check, Link2, LinkedIn, XIcon } from "./Icons";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; the share links still work */
    }
  }

  const button =
    "inline-flex size-10 items-center justify-center rounded-lg border border-line text-muted transition hover:border-line-strong hover:bg-surface-2 hover:text-fg";

  return (
    <div className="no-print flex items-center gap-2">
      <span className="mr-1 text-sm text-subtle">Share</span>
      <a
        className={button}
        aria-label="Share on X"
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <XIcon size={16} />
      </a>
      <a
        className={button}
        aria-label="Share on LinkedIn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedIn size={16} />
      </a>
      <button type="button" className={button} onClick={copy} aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );
}
