import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Marketing pages — source markdown from 02-specs/research/site-source-pages/
// imported into this collection. Rendered by src/pages/[...slug].astro.
const marketing = defineCollection({
  type: 'content',
  schema: z.object({
    url: z.string(),
    title: z.string(),
    meta_description: z.string().optional(),
    og_title: z.string().optional(),
    og_description: z.string().optional(),
    canonical: z.string().url().optional(),
    primary_keyword: z.string().optional(),
    primary_keyword_us_vol: z.number().optional(),
    primary_keyword_kd: z.number().optional(),
    secondary_keywords: z.array(z.string()).optional(),
    schema_type: z.string().optional(),
    internal_links_out: z.array(z.string()).optional(),
    // Astro parses unquoted YAML dates (2026-06-01) into Date objects, but our
    // source files mix quoted strings and unquoted dates. Coerce both into strings
    // (YYYY-MM-DD form) so downstream rendering is uniform.
    verified_date: z.coerce.string().optional(),
    next_verification: z.coerce.string().optional(),
    ai_overview_optimised: z.boolean().optional(),
    noindex: z.boolean().optional(),
    legal_review_required: z.boolean().optional(),
    // Rich-page override — if true, dynamic [...slug].astro skips and the page has its own .astro file.
    rich_override: z.boolean().optional(),
    // FAQ data extracted into frontmatter so the FAQPage schema can emit a real
    // mainEntity array (instead of an empty shell). The workflow that
    // populated this is faq-schema-aio-audit-15 (w3sshxq69). Body content is
    // unchanged — these answers mirror what's in the FAQ section of each page.
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
    // Per-page AI Overview readiness audit. Informational only — read these to
    // decide which pages need a lead-paragraph rewrite for AIO surfacing.
    aio_audit: z.object({
      faq_count: z.number().optional(),
      has_direct_answer_lead: z.boolean().optional(),
      has_concise_definitions: z.boolean().optional(),
      blockers: z.array(z.string()).optional(),
      score: z.number().min(1).max(5).optional(),
    }).optional(),
  }),
});

export const collections = {
  marketing,
  // Starlight docs collection — kept as-is.
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
