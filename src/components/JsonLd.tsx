import { graph } from "@/lib/seo";

/** Server-rendered structured data. Pass schema.org nodes; they're combined into one @graph. */
export function JsonLd({ nodes }: { nodes: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph(...nodes) }} />;
}
