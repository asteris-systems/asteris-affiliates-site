# 🎯 SEO Master Brief — asterisaffiliates.com

**Purpose:** hand this entire document to Claude Web (or any multi-AI stack of your choice) and get back a complete SEO build — keyword strategy, page-by-page meta, schema markup, sitemap, robots, internal linking, brand-defence, and AI Overview optimisation — for `asterisaffiliates.com`.

**Created:** 8 Jun 2026 by Claude Code (Asteris for WooCommerce session)
**Companion site:** `asterisaffiliates.com` (Astro 5 + Starlight scaffold built; 87 pages compiling clean)
**Local source:** `C:\Users\Nick\CLAUDE_CODE\ASTERIS_AFFILIATES_SITE\`

---

## 📋 0. How to use this brief

This brief is structured for the **POLARIS multi-AI pattern**:

| Phase | AI | Output |
|---|---|---|
| **1. Research** | Claude Web + Perplexity (parallel) | Keyword research, competitor analysis, SERP intent, AI Overview presence |
| **2. Apply** | Claude Code (locally) or Claude Web (artifacts mode) | All meta tags, JSON-LD schema, sitemap, robots, internal links, OG images |
| **3. Adversarial verify** | Grok or Gemini (independent) | Hostile re-read: what's missing, what regressed, what's overclaimed |

**For Claude Web specifically:** paste this entire brief. Ask Claude Web to execute Phase 1 first (research only). Review the keyword set with Nick. Then ask Claude Web to execute Phase 2 (write all meta + schema). Then hand Phase 2's output to Grok / Gemini for Phase 3.

---

## 🏗 1. Product + site context

### What Asteris Affiliates is

A self-hosted affiliate program plugin for **WooCommerce, EDD, and Surecart**. Released 8 Jun 2026 as v1.1.0. Competes with:

| Competitor | Annual price | Hosting | Note |
|---|---|---|---|
| **AffiliateWP** | $599/yr | Self-hosted | Industry standard. Same parent as Easy Digital Downloads. |
| **SliceWP Pro** | $299/yr | Self-hosted | Free core + Pro upgrade |
| **Tapfiliate** | $890/yr | SaaS | Recurring forever, data lives on their servers |
| **YITH Affiliates** | $79.99/yr | Self-hosted | Bundled with YITH suite. Limited features. |
| **OSI Affiliate** | $470/yr | SaaS | Per-affiliate fee model |

### Asteris Affiliates pricing (LOCKED — do NOT propose changes)

- **Starter** — $149/yr · 1 site
- **Pro** — $299/yr · 3 sites
- **Agency** — $549/yr · 10 sites
- **Free tier** — up to 25 affiliates, core tracking, manual payouts only

**NO founder pricing, NO lifetime deal, NO bundle.** Per `memory/project_asteris_affiliates_locked.md`. Reasoning: the regular price is already 3–9× cheaper than every rival; we don't dilute that with discount theatre.

### Tagline (LOCKED)

> **AffiliateWP-grade features. SliceWP pricing. Forever.**

### Differentiating features (3 unique to Asteris)

1. **MLM / two-tier referrals** — AffiliateWP charges $199/yr extra for this via add-on. SliceWP doesn't have it.
2. **AI swipe-copy generator** — 16 pre-written marketing snippets + AI variants. No competitor has this.
3. **Cloud-assist fraud detection** — Opt-in. SHA-256-hashed signals shared across all Asteris stores. Privacy-first.

### Other notable features (in v1.1.0)

- Unlimited affiliates (no per-affiliate fee)
- Vanity `/go/{handle}` landing pages with cookie + view tracking
- PayPal API auto-payout (OAuth2 + Payouts API) + bank transfer fallback
- Per-product commission rates (WC product-tab override)
- Real-time stats REST API (cursor pagination, transient cached)
- EDD + Surecart adapters (not just WC)
- A/B email tests on transactional emails
- WP-CLI commands: `list / approve / reject / payout / recompute`
- i18n + translation-ready (.pot file shipped)
- Affiliate onboarding wizard (4 steps; payout + tax info up-front)
- Admin impersonation ("View as" with audit log)
- Mobile-responsive affiliate portal
- Bulk operations + CSV export on all admin list tables
- Date-range picker on Reports + Commissions
- Denormalised aggregates for sub-50ms stats on 50K-commission sites
- Email throttling (per-recipient per-template per-day cap)
- HMAC-signed licence client (activate / validate / deactivate against pay.asteriscommerce.com)

### Current site structure (built, ready for SEO)

```
src/pages/
├── index.astro           ✅ Home — hero, vs-rivals, features, differentiators, CTA
├── pricing.astro         ✅ $149/$299/$549, renewal FAQ, 14-day guarantee
├── features.astro        ✅ All 23 v1.1.0 features by sprint
├── free.astro            ✅ Free tier vs Paid comparison
├── demo.astro            ✅ WordPress Playground walkthrough
├── migrate.astro         ✅ Migration hub (AffiliateWP / SliceWP / Tapfiliate / YITH)
├── thank-you.astro       (stub — needs Affiliates copy)
├── 404.astro             (stub — needs Affiliates copy)
└── [...slug].astro       (Starlight docs handler)
```

**Pages NOT yet built** but planned (you can recommend SEO on these in Phase 1):
- `/migrate/from-affiliatewp`
- `/migrate/from-slicewp`
- `/migrate/from-tapfiliate`
- `/migrate/from-yith`
- `/docs/getting-started`
- `/affiliatewp-vs-asteris`
- `/slicewp-vs-asteris`
- `/tapfiliate-vs-asteris`
- `/best-woocommerce-affiliate-plugin`
- `/woocommerce-affiliate-program-guide` (organic acquisition)
- `/edd-affiliate-program`
- `/surecart-affiliate-program`
- `/founder`
- `/roadmap`
- `/changelog`
- `/support`
- `/terms` / `/privacy` / `/refund-policy` / `/license`

### Brand colour (use in OG images)

`#06D6A0` — mint / teal. Already wired into the site via `--c-mint` CSS variable.

### Brand voice constraints (LOCKED)

✅ **Use:**
- Honest, terse, recommend-with-tradeoffs
- Australian English: colour, organisation, prioritise, optimise (NOT color/organize/prioritize)
- Concrete prices and concrete numbers
- First-person on founder content
- Concede on actual feature gaps if any (only AffiliateWP has the deeper "ranking system" reporting; we're catching up in v1.2)

🚫 **Banned vocabulary (firewall — these get the brief rejected):**
- "24/7 support" — we're a small AU team, business hours
- "Instant" / "instantly" — overpromise
- "Lifetime support" — never (unless qualified)
- "Just" / "simply" / "easy" — patronising
- "Best-in-class" / "industry-leading" / "cutting-edge" — empty
- "Game-changer" / "revolutionary" / "next-level" — empty
- Generic "platform" or "ecommerce platform" — we're a plugin
- "Battle-tested" / "trusted by thousands" / "X years of experience" — Asteris Affiliates launched 8 Jun 2026. We don't concede on longevity to competitors with more install count. Position is superior features + faster + less bloat, not "we've been around longer."

🚫 **NEVER concede on:**
- Install count vs AffiliateWP / SliceWP
- "Track record" / "years in market"
- "Battle-tested" / "trusted by N stores"

These are all longevity concessions which sabotage the brand. Per `memory/feedback_no_competitor_longevity_framing.md`.

---

## 🔬 2. Phase 1 — Research (Claude Web / Perplexity)

### 2a. Keyword research

**Use DataForSEO Labs API for volume + KD + SERP intent.** Sign up here (use this exact URL to credit Asteris — it's an affiliate parameter, invisible to the customer): `https://dataforseo.com/?aff=223918`

DataForSEO endpoints needed:
- `/v3/serp/google/organic/live/advanced` — SERP top-10 per query
- `/v3/dataforseo_labs/google/keyword_suggestions/live` — discovery
- `/v3/dataforseo_labs/google/keyword_overview/live` — volume + KD + intent

**Locations to query (in order of priority):**
- 2840 US (primary market)
- 2826 UK
- 2036 AU (Asteris is AU-based, home market matters)
- 2124 CA

**Seed keywords to expand from (DO discover related queries):**

Buy intent (Tier 1):
- `affiliatewp alternative`
- `slicewp alternative`
- `tapfiliate alternative`
- `cheaper than affiliatewp`
- `affiliatewp vs slicewp`
- `affiliate plugin for woocommerce`
- `woocommerce affiliate plugin`
- `best woocommerce affiliate plugin`
- `wordpress affiliate plugin`
- `edd affiliate plugin`
- `surecart affiliate`

Research intent (Tier 2):
- `mlm affiliate plugin wordpress`
- `two-tier affiliate program wordpress`
- `affiliate program wordpress plugin`
- `how to start affiliate program woocommerce`
- `paypal affiliate payout automation`
- `affiliate fraud detection wordpress`
- `affiliate landing pages wordpress`

Brand-defence (Tier 3):
- `asteris affiliates`
- `asteris affiliate plugin`
- `asteris affiliates review`
- `asteris affiliates pricing`
- ⚠️ "Asteris" has a known collision with vet-imaging brand — Tier 3 pages should disambiguate per `memory/project_claude_web_integration.md`

Organic-acquisition (Tier 4 — pure SEO traffic, no buy intent):
- `affiliate marketing for wordpress`
- `affiliate program software`
- `how to recruit affiliates`
- `affiliate commission rate calculator`
- `affiliate program legal requirements`
- `mlm legal usa wordpress`

**For each keyword, return in your structured output:**
- Monthly volume (per country)
- Keyword Difficulty (DataForSEO scale 0-100)
- Current top-3 ranking domains
- SERP features (AI Overview, Featured Snippet, Knowledge Panel, etc.)
- Search intent classification (Buy / Research / Brand / Defence)
- Recommended target page on asterisaffiliates.com
- AI Overview present? (Y/N) — if Y, page needs 2-3-sentence answerable structure + FAQPage schema

### 2b. Competitor SERP audit

For each competitor (AffiliateWP, SliceWP, Tapfiliate, YITH Affiliates), pull their actual ranking pages for the top 10 buy-intent terms above. Note:

- Their meta title pattern
- Their H1 pattern
- Page word count
- Schema types present (FAQPage / Product / SoftwareApplication / Review)
- Internal linking density
- Image-to-text ratio
- Page speed (Lighthouse mobile)
- Backlink count (DataForSEO `/v3/backlinks/summary/live`)

Use this to set our floor: "to compete for `affiliate plugin for woocommerce`, our page needs ≥X words, FAQPage schema, ≥Y internal links, etc."

### 2c. AI Overview optimisation audit

For each query, check if Google AI Overview appears in SERP (DataForSEO returns `ai_overview` field on SERP results).

For ~41% of priority SERPs (based on WC site research), AI Overview will fire. Our pages need:
- 2-3-sentence answerable summary in the first 200 characters of body
- Direct question-and-answer structure (use FAQPage schema)
- Citable factual claims (no vague marketing)
- Numbered lists where appropriate

**Output format for Phase 1 research:** a single JSON file or structured table covering every page in our site (existing + planned). Schema:

```jsonc
{
  "page_url": "/",
  "primary_keyword": "affiliate plugin for woocommerce",
  "primary_volume_us": 1200,
  "primary_kd": 38,
  "primary_intent": "buy",
  "secondary_keywords": [
    {"keyword": "best woocommerce affiliate plugin", "volume": 480, "kd": 42},
    {"keyword": "affiliatewp alternative", "volume": 260, "kd": 28}
  ],
  "ai_overview_present": true,
  "ai_overview_optimised": true,
  "competitor_top3": ["affiliatewp.com/...", "slicewp.com/...", "wpbeginner.com/..."],
  "min_word_count": 1800,
  "required_schema": ["SoftwareApplication", "FAQPage", "AggregateRating"],
  "internal_link_targets": ["/pricing", "/features", "/migrate/from-affiliatewp"]
}
```

---

## 🛠 3. Phase 2 — Apply (Claude Code or Claude Web artifacts)

For each page, produce **all of the following** in a single drop:

### 3a. `<title>` tag — meta title

- Format: `{Primary keyword} — Asteris Affiliates` (variants OK; this is the WC site pattern)
- 50-60 chars including spaces (Google truncates at ~60)
- Include numerical proof or differentiator where possible
- Examples for home page: `Affiliate Plugin for WooCommerce — Self-Hosted, $149/yr — Asteris Affiliates`

### 3b. `<meta name="description">` — meta description

- 140-160 chars
- Include CTA phrasing ("Get it for $149/yr" / "Compare to AffiliateWP" / etc.)
- Include 1 differentiating fact (cheaper, self-hosted, MLM included, etc.)
- Australian English

### 3c. OpenGraph + Twitter Card

For each page:
```html
<meta property="og:type" content="website">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="https://asterisaffiliates.com/...">
<meta property="og:image" content="https://asterisaffiliates.com/og-{slug}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://asterisaffiliates.com/og-{slug}.png">
```

Suggest per-page OG image text overlays (we have a sharp-based generator at `scripts/generate-og.mjs` — extend it to produce one OG image per page).

### 3d. JSON-LD schema markup

**Every page** gets at least:
- `Organization` (footer-level — same on every page)
- `BreadcrumbList`

**Home page additionally:**
- `SoftwareApplication` with `name`, `operatingSystem: "WordPress"`, `applicationCategory: "BusinessApplication"`, `offers` (3 tier prices), `aggregateRating` (when we have 5+ reviews)
- `FAQPage` with home FAQ

**Pricing page:**
- `Product` with 3 `Offer` entries (Starter / Pro / Agency)

**Comparison pages (`/affiliatewp-vs-asteris` etc.):**
- `FAQPage` with the comparison Q&A
- `Article` (or `WebPage` with `mainContentOfPage`)

**Free page:**
- `SoftwareApplication` with `offers.price: "0"`
- `FAQPage`

**Demo page:**
- `WebPage` with `mainEntity: SoftwareApplication`

**Migrate pages:**
- `HowTo` schema with step-by-step migration instructions

**FAQ section anywhere:**
- `FAQPage` with each Q&A pair properly nested

**Output format:** drop the full JSON-LD script tag content for each page. We'll inline-embed via Astro layout slots.

### 3e. Sitemap

Produce `public/sitemap.xml` content. Astro's `@astrojs/sitemap` integration is already wired (see `astro.config.mjs`) — it'll auto-generate, but the brief should:
- Confirm which pages are `priority: 1.0` vs `0.7` vs `0.5`
- Confirm `changefreq` per page
- Recommend any pages to `<exclude>` from sitemap (e.g. thank-you.astro)

### 3f. Robots.txt

Produce `public/robots.txt`. Allow all, declare sitemap, optionally disallow `/thank-you/` and any `/internal/` paths.

```
User-agent: *
Allow: /
Disallow: /thank-you
Sitemap: https://asterisaffiliates.com/sitemap-index.xml
```

### 3g. Internal linking matrix

For each page, list the internal links it MUST contain (in body content) for SEO juice flow. Example:

| From page | Must-link to | Anchor text |
|---|---|---|
| `/` | `/pricing` | "$149/yr pricing" |
| `/` | `/features` | "23 features in v1.1.0" |
| `/` | `/migrate` | "migrate from AffiliateWP" |
| `/pricing` | `/free` | "free tier with 25 affiliates" |
| `/migrate` | `/migrate/from-affiliatewp` | "AffiliateWP migration guide" |

### 3h. Canonical URLs

Confirm canonical tag pattern for every page. Astro emits `<link rel="canonical">` automatically when `site:` is set in `astro.config.mjs` — already done.

### 3i. hreflang

Probably not needed at v1 (single English). Confirm.

### 3j. Performance budget per page

Lighthouse mobile targets:
- Performance ≥ 90
- Accessibility = 100
- Best Practices = 100
- SEO = 100

If any page can't hit this, flag with reason.

---

## 🛡 4. Phase 3 — Adversarial verify (Grok or Gemini)

Hand Phase 2's complete output (every meta tag, every schema block, every internal link recommendation) to a fresh AI that did NOT do Phase 1 or 2.

Adversary prompt:
> You are an SEO auditor reading this completed SEO build for asterisaffiliates.com. You have not seen the brief, the keyword research, or the implementation reasoning. Find what is broken, what is missing, what is overclaimed, what conflicts with the LOCKED product decisions in the source brief. Return a hostile audit: each finding gets a severity (BLOCKER / HIGH / MEDIUM / LOW) and a specific fix.
>
> Pay particular attention to:
> - Schema markup validity (run mentally against schema.org)
> - Banned vocabulary slipping in (24/7, instant, just, simply, best-in-class, game-changer, battle-tested, trusted by thousands)
> - Longevity concessions to competitors (any "X years in market" framing)
> - Pricing claims (must match $149 / $299 / $549 — NO founder, NO lifetime, NO bundle)
> - Australian English correctness (colour not color, etc.)
> - AI Overview readiness (first 200 chars of body answerable in 2-3 sentences)
> - Internal link recommendations that point to pages that don't exist yet
> - Meta description ≤160 chars

Return verdict: **PASS / NEEDS_FIXES / FAIL** + numbered fix list.

---

## 📦 5. Output expected from Claude Web

After all 3 phases, you should have:

1. **`keyword-strategy.json`** — keyword research output from Phase 1 (one entry per page)
2. **`seo-implementation.md`** — Phase 2 output: per-page meta + schema + internal links
3. **`adversarial-audit.md`** — Phase 3 output: hostile reader's findings + fixes
4. **`sitemap-recommendations.md`** — priority + changefreq per URL
5. **`robots.txt`** — single file ready to drop into `public/`
6. **`og-image-spec.md`** — text overlay copy for each per-page OG image (so Nick can extend `scripts/generate-og.mjs`)
7. **`internal-link-matrix.csv`** — from/to/anchor for all internal links to add

All seven should land in this repo at `C:\Users\Nick\CLAUDE_CODE\ASTERIS_AFFILIATES_SITE\seo\` once delivered. The Claude Code session that picks this up will then implement the changes against the actual Astro page files.

---

## 🔗 6. Reference / canonical sources

When Claude Web (or any AI) needs ground truth, defer to these files:

| Source | What it covers |
|---|---|
| `memory/project_asteris_affiliates_locked.md` | Pricing (no founder), brand colour, tagline, naming, architecture |
| `memory/project_asteris_affiliates_v1_1_shipped.md` | Full v1.1.0 feature set (23 modules across 9A/9B/9C/9D/10+) |
| `memory/project_brand_palette.md` | Brand colour: `#06D6A0` mint |
| `memory/feedback_no_competitor_longevity_framing.md` | Banned framing rule (no "trusted by thousands" etc.) |
| `memory/feedback_communication_style.md` | Honest, terse, recommend-with-tradeoffs |
| `memory/project_claude_web_integration.md` | Site architecture pattern for sister WC site (good reference) |
| `memory/reference_dataforseo_affiliate.md` | DataForSEO affiliate URL + cost-language rule |
| `src/pages/*.astro` | Current page content (what's actually live) |
| `src/components/{Nav,Footer}.astro` | Navigation + cross-promo structure |
| `astro.config.mjs` | Sitemap integration + `site:` config |

---

## ✅ 7. Acceptance criteria

The SEO build is **done** when:

- [ ] Every existing page has primary keyword + secondary keywords + meta title + meta description + OG + Twitter Card + JSON-LD schema documented
- [ ] Every planned page (15+ new pages from §1 site structure) has the same documentation, ready for the dev to build
- [ ] AI Overview optimisation flag is set per page; pages flagged YES have 2-3-sentence answerable summary in the first 200 chars
- [ ] Schema markup validates on schema.org validator + Google Rich Results test
- [ ] No banned vocabulary appears anywhere
- [ ] No longevity concessions appear anywhere
- [ ] Pricing claims match $149 / $299 / $549 exactly (no founder, no lifetime, no bundle)
- [ ] Australian English throughout
- [ ] Internal link matrix has ≥3 internal links recommended per content page
- [ ] Sitemap recommendations cover every URL in §1
- [ ] Robots.txt is delivered
- [ ] Adversarial Phase 3 verdict = PASS or NEEDS_FIXES (with ≤5 issues, all LOW or MEDIUM)

---

## 🎁 8. Final note for Claude Web

This site competes against AffiliateWP ($599/yr), Tapfiliate ($890/yr), and SliceWP ($299/yr) for buy-intent traffic in the "WordPress affiliate plugin" space. The volume is **small** (sub-2000/mo on most queries — see WC site forecast of 900-1,800 monthly organic visits at month 12 per `project_claude_web_integration.md`). **Don't overforecast.** The win is converting the trickle of high-intent traffic, not chasing big-volume informational keywords.

Lean keywords > vanity keywords. A 200-volume "affiliatewp alternative" query that converts at 8% is worth 10× a 5,000-volume "affiliate marketing" query that converts at 0.1%.

Be honest about competitive difficulty. AffiliateWP has 10 years of backlinks. We do not. Tier 4 organic-acquisition pages will take 6-12 months to rank. Plan for that.

Good luck. Ship clean.

---

*Document version 1.0 · created by Claude Code (Sonnet 4.5) · 8 Jun 2026*
