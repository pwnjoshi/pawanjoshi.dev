# pawanjoshi.dev

Personal portfolio and blog for Pawan Joshi. Built with Next.js, TypeScript, Tailwind CSS v4, and MDX.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run test     # type-check, lint, and production build
```

## Editing content

| What | Where |
| --- | --- |
| Bio, stats, links, experience, projects, certifications, skills, education | `src/lib/content.ts` |
| "Now" summary on the home page | `src/data/now.ts` |
| Blog posts (MDX with front matter) | `content/blog/*.mdx` |
| Résumé PDF | `public/Pawan_Joshi_Resume.pdf` |
| Colors and theme tokens | `src/app/globals.css` |

Blog front matter: `title`, `date` (YYYY-MM-DD), `description`, `tags`, `coverImage`, `canonicalUrl`.

## Environment

- `RESEND_API_KEY`: required for the contact form to deliver email. Without it, the form shows the email fallback.
- `CONTACT_FROM` (optional): sender, for example `Pawan Joshi <contact@pawanjoshi.dev>`, once the domain is verified in Resend. Defaults to Resend's test sender.
- `CONTACT_TO` (optional): where messages go. Defaults to `me@pawanjoshi.dev`.

## SEO notes

- Blog posts set their canonical URL to this site. When cross-posting to Dev.to, set the Dev.to post's canonical URL to `https://pawanjoshi.dev/blog/<slug>`.
- RSS feed: `/feed.xml`. Sitemap: `/sitemap.xml`. Web app manifest: `/manifest.webmanifest`.
- AI assistants: `/llms.txt` (summary) and `/llms-full.txt` (full profile). `robots.txt` explicitly allows AI crawlers.
- Structured data lives in `src/lib/seo.ts`: one Person (`/#person`) that every page, article and project links to.
- Keep facts consistent: the summary in `src/lib/seo.ts` should match your LinkedIn, GitHub and Dev.to bios.

## Deploy (Vercel)

1. Push the repo to GitHub and import it at vercel.com/new (framework: Next.js, no extra settings).
2. Add environment variables: `RESEND_API_KEY`, and optionally `CONTACT_FROM`, `CONTACT_TO`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`.
3. In Project → Domains, add `pawanjoshi.dev` and `www.pawanjoshi.dev` (redirect www to the apex).
4. After the first deploy, verify the site in Google Search Console and Bing Webmaster Tools, then submit `https://pawanjoshi.dev/sitemap.xml` in both.
