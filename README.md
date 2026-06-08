# Asteris Affiliates — sales site

Production site for **[asterisaffiliates.com](https://asterisaffiliates.com)**.

Asteris Affiliates is a 19-module WooCommerce plugin suite built by [Nick Lord](https://asterisaffiliates.com/founder) (Sydney AU, sole founder). This repo holds the marketing + documentation site — **not** the plugin itself.

> One plugin. 19 modules. Replaces ~$1,500/yr of separate WooCommerce plugins.
> Free on WordPress.org · Founder Lifetime $249 once (capped at 500).

---

## Stack

- **Astro 5** — static site generator
- **@astrojs/starlight** — `/docs/*` section (auto-sidebar, search, dark mode)
- **@astrojs/sitemap** — auto-generated `sitemap.xml`
- **Sharp** — image processing for OG cards + assets
- **Cloudflare Pages** — hosting + DNS + Email Routing
- Inline CSS with brand tokens — no Tailwind, no UI framework, minimum dependencies

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes to dist/
npm run preview  # serves built site locally
```

Requires Node 20+.

---

## Project structure

```
src/
├── layouts/
│   ├── Layout.astro            shared <html>, <head>, nav, footer
│   └── MarketingLayout.astro   wraps Layout + JSON-LD schema injection
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── JsonLd.astro            schema.org JSON-LD (Article, FAQPage, etc.)
│   ├── StarlightSiteTitle.astro custom Starlight title → links to /docs
│   └── Comparator.astro        v1.1 plugin-cost-calculator scaffold (inert)
├── pages/
│   ├── index.astro             rich hand-built homepage
│   ├── pricing.astro           rich hand-built pricing page
│   ├── lifetime.astro          rich hand-built Founder Lifetime page
│   ├── free.astro              rich hand-built Asteris Free landing
│   ├── modules.astro           rich hand-built 19-module catalogue
│   ├── demo.astro              rich hand-built WordPress Playground demo
│   ├── 404.astro               branded 404
│   └── [...slug].astro         dynamic route for the marketing content collection
├── content/
│   ├── config.ts               content-collection schemas (marketing + docs)
│   ├── marketing/              ~36 markdown pages (Tier 1-5, legal, migration)
│   └── docs/docs/              Starlight docs (6 top-level + 19 module guides)
├── data/
│   └── competitor-plugins.ts   typed competitor pricing data (Comparator source)
├── styles/
│   ├── global.css              brand tokens + base reset
│   └── starlight-brand.css     Starlight overrides (orange accent)
public/
├── favicon.svg                 Asteris brand mark
├── og-default.png              1200×630 fallback social card
├── robots.txt
└── playground/blueprint.json   WordPress Playground demo config
scripts/
├── gen-og-default.mjs          regenerate /og-default.png (Sharp)
└── enable-asteris-in-playground.mjs  swap blueprint placeholder once Asteris is on WP.org
```

## Routing

- **Rich pages** at `src/pages/*.astro` (homepage + Tier 1 pages) are hand-built end-to-end
- **Markdown pages** live in `src/content/marketing/*.md` — each has a `url:` frontmatter field, rendered by `src/pages/[...slug].astro` through `MarketingLayout`
- **Docs** live in `src/content/docs/docs/*.md` — Starlight mounts the collection at `/docs/*`

To add a new marketing page: drop a markdown file in `src/content/marketing/` with the right frontmatter (see `src/content/config.ts` for the schema). Astro picks it up on next build.

## Brand tokens

```css
--c-black:   #0a0a0a;
--c-yellow:  #fff19a;
--c-mint:  #06D6A0;  /* star + CTA accents */
--c-bg:      #fafafa;
--c-text:    #0a0a0a;
--c-border:  #eeeeee;
--font:      -apple-system, 'Inter', 'Segoe UI', system-ui, sans-serif;
```

The skewed-yellow `.accent` highlight and the orange `.eyebrow` rotated tag are the two recurring brand elements. See `src/styles/global.css`.

## SEO + structured data

- `JsonLd.astro` emits proper schema.org JSON-LD per page (`Article`, `FAQPage`, `SoftwareApplication`, etc.)
- Pages with FAQ sections populate `faqs: [{q, a}, ...]` in frontmatter — `JsonLd` reads it and emits a real `mainEntity` array for FAQPage
- Per-page `aio_audit:` frontmatter tracks AI Overview readiness (score 1-5, blockers, faq_count)
- Sitemap auto-generated at `/sitemap-index.xml`

## Deployment

Pushed to `main` → Cloudflare Pages auto-deploys to `asteris-affiliates-site.pages.dev` + the custom domain.

The build is fully static; the site has **no server-side runtime**. Anything dynamic (live Founder counter, `/account` license portal) is planned as a separate Cloudflare Worker per `02-specs/account_portal_spec.md` (local-only spec — not in this repo).

## License

The site source is open in this repo for transparency. The Asteris Affiliates **plugin** itself is GPL-2.0+ and distributed via WordPress.org (free tier) + Lemon Squeezy (paid tiers).

The contents of this repo (site code, copy, images) are © My Cosmic Message Pty Ltd t/a Asteris Commerce — please don't lift them wholesale for a competing plugin's marketing site.

---

## Contact

- Founder + roadmap: [founder@asterisaffiliates.com](mailto:founder@asterisaffiliates.com)
- Support: [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com)
- Security disclosure: [security@asterisaffiliates.com](mailto:security@asterisaffiliates.com)
