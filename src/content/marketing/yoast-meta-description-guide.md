---
url: /yoast-meta-description-guide
title: "Yoast meta descriptions for WooCommerce product pages"
meta_description: "How to write and configure Yoast SEO meta descriptions for WooCommerce product pages. Character limits, WooCommerce variables, and best practices."
og_title: "Yoast meta descriptions for WooCommerce"
og_description: "Configuring Yoast meta descriptions on WooCommerce product pages. Variables, character limits, bulk editing, and WooCommerce-specific settings."
canonical: https://asterisaffiliates.com/yoast-meta-description-guide
primary_keyword: yoast meta description for woocommerce
primary_keyword_us_vol: 460
primary_keyword_kd: 30
secondary_keywords:
  - meta description woocommerce yoast
  - how to write meta description woocommerce
  - yoast seo meta description
schema_type: Article + HowTo + FAQPage
internal_links_out:
  - /yoast-guide
  - /yoast-seo-title-guide
  - /modules
  - /yoast-vs-asteris
verified_date: 2026-06-01
ai_overview_optimised: true
faqs:
  - q: "How long should a meta description be in Yoast?"
    a: "Yoast turns the indicator green between 120 and 156 characters. In practice, aim for 140-155 characters for desktop snippet coverage, but front-load the most important 110 characters because mobile cuts off earlier."
  - q: "Does the meta description affect SEO rankings?"
    a: "Not directly. Google confirmed in 2009, and has restated since, that meta descriptions are not a ranking factor. They affect click-through rate, which can indirectly influence how Google evaluates the listing's relevance over time."
  - q: "Why does Google show a different description than the one I wrote?"
    a: "Google rewrites meta descriptions roughly 60-70% of the time (Ahrefs 2020, Portent 2022). It does this when it judges that a snippet pulled from the page body better matches the searcher's specific query. Your written description is still the fallback for branded queries and social previews."
  - q: "Does Yoast Free include the bulk editor?"
    a: "Yes, Yoast SEO Free includes the bulk editor for titles and meta descriptions. It is at Yoast SEO then Tools then Bulk editor. It paginates 20 items at a time and does not include CSV import/export."
  - q: "Can I set a different meta description per variation in WooCommerce?"
    a: "No. Yoast stores meta descriptions against the parent product only, because WooCommerce variations are not separately indexable by default. If a variation needs its own ranking, split it into a separate product."
  - q: "What's the difference between %%excerpt%% and %%wc_shortdesc%%?"
    a: "They produce the same output on WooCommerce product pages. Both pull from the WooCommerce short description field. %%excerpt%% is the WordPress-native variable, %%wc_shortdesc%% is the WooCommerce-aware alias."
  - q: "Should I use AI to write meta descriptions?"
    a: "For catalogues over 100 products, yes, manual writing does not scale. For your top 20-50 highest-revenue products, write the descriptions yourself or have a copywriter do it. AI output is acceptable for the long tail but rarely converts as well as hand-written copy on hero SKUs."
  - q: "Does Yoast support meta descriptions for product categories?"
    a: "Yes. Edit any product category at Products then Categories then [category] and scroll down to the Yoast SEO section. Yoast also supports a global template for product categories at Yoast SEO then Search Appearance then Taxonomies then Product categories."
  - q: "How do I check what Google is actually showing as my description?"
    a: "Run a site:yourdomain.com search in an incognito window and inspect the snippets. For more rigorous monitoring, Google Search Console's Performance report shows impressions per page but not the rendered snippet text, you have to spot-check manually or use a SERP-monitoring tool like SE Ranking or AccuRanker."
  - q: "Do meta descriptions affect AI search results (Perplexity, ChatGPT, Google AI Overviews)?"
    a: "Indirectly. AI search engines crawl your page content and cite sources. The meta description itself is not usually quoted, but it is often the snippet shown in AI-generated source citations. A clear, accurate meta description helps your page get cited correctly."
aio_audit:
  faq_count: 10
  has_direct_answer_lead: true
  has_concise_definitions: true
  blockers: []
  score: 5
---

# Yoast meta descriptions for WooCommerce product pages

Write Yoast meta descriptions between 120 and 156 characters in the Yoast SEO meta box below the product editor (the field labelled "Meta description"). Write for click-through, not keyword stuffing — Google rewrites the snippet 60-70% of the time anyway, so a concrete value proposition beats a keyword-padded one. The rest of this page covers character limits, WooCommerce variables, the bulk editor, and variable-product gotchas.

---

## What a meta description actually does

Meta descriptions are not a direct Google ranking factor. Google confirmed this publicly back in 2009 and has not changed position since. What they do affect is click-through rate from the search results page, which feeds indirectly into how Google measures the relevance of your listing for a query.

Two things to keep in mind:

1. **Google rewrites meta descriptions roughly 60-70% of the time.** Studies from Ahrefs (2020) and Portent (2022) put the rewrite rate between 62.78% and 68.5% across a sample of millions of pages. Google increasingly pulls a snippet from the on-page content that best matches the searcher's query. Writing a meta description is still worth the effort because it is the version Google falls back to, and it is the version that shows for branded queries and social shares.
2. **The meta description is what gets shared.** When a product URL is pasted into iMessage, Slack, WhatsApp, or Discord, the link unfurl uses the Open Graph description, which Yoast defaults to your meta description if no separate OG description is set. So the field also doubles as your social preview copy.

---

## Yoast's character limit: where 120-156 comes from

Yoast SEO turns the meta description field **orange** below 120 characters and **green** between roughly 120 and 156 characters. Above 156 it goes orange again and the snippet preview shows truncation.

The 156 number is Yoast's interpretation of Google's desktop snippet limit. Google does not publish a fixed character count — the actual cut-off is in pixels (roughly 920px on desktop, 680px on mobile), and pixel width varies by character: a string of `i` and `l` characters fits far more than `W` and `M`. Yoast picks 156 as a safe-ish average.

In practice:

| Device | Approx. character cut-off |
|---|---|
| Desktop | 155-160 |
| Mobile | 105-120 |
| Mobile (with rich result, e.g. price + rating) | 60-90 |

Practical implication for WooCommerce: put your most important hook in the **first 110 characters**. Anything after that may not show on mobile, and over half of WooCommerce traffic in 2025-26 is mobile.

---

## The orange/green/red traffic light

Yoast's snippet analysis colour coding:

- **Red** (under 120 characters or empty) — the field is too short, Yoast assumes you have not used your full snippet real estate
- **Orange** (120-155 characters, or 156+) — close to the sweet spot but not optimal, or too long and at risk of truncation
- **Green** (roughly 120-156) — within the recommended range

The colour is a hint, not a ranking signal. A 90-character description that converts is better than a 150-character description that pads to hit green. Do not pad just to satisfy the indicator.

---

## Writing meta descriptions for different page types

### Product pages

The buyer is closer to a transaction than on any other page on your site. Lead with the value proposition, not the product name (the title already shows the product name).

Bad:
> Acme Cotton T-Shirt - 100% organic cotton t-shirt available in five colours. Buy now.

Better:
> 100% GOTS-certified organic cotton, screen-printed in Melbourne. Free shipping over $80, 30-day returns. Sizes XS-3XL.

Notice: concrete certification, country of origin, shipping threshold, return window, size range. Every word earns its space.

### Product category pages

Categories rank for broader, higher-volume queries ("women's running shoes", "ceramic mugs"). The description should signal range and selection rather than a single SKU.

> Browse 47 pairs of women's road and trail running shoes from Asics, Hoka, New Balance and Brooks. Free shipping over $100 across Australia.

### Blog posts and guides

Blog meta descriptions perform best when they preview the answer rather than tease it. Searchers in 2025-26 have learned to skip listicle teasers ("Find out the surprising reason...") and click on results that promise concrete information.

### Homepage

The homepage description should answer "what does this shop sell, and to whom". Keep it focused: a homepage that tries to mention every category dilutes the snippet.

---

## WooCommerce-specific Yoast variables

Yoast supports snippet variables that auto-populate from product or post data. The full set for WooCommerce product pages:

| Variable | Output |
|---|---|
| `%%title%%` | Product name |
| `%%sitename%%` | Site title (from WordPress Settings → General) |
| `%%sep%%` | Title separator (configured in Yoast → Search Appearance) |
| `%%excerpt%%` | WooCommerce short description |
| `%%excerpt_only%%` | Short description, no fallback to long description |
| `%%wc_price%%` | Current product price (formatted with currency) |
| `%%wc_sku%%` | Product SKU |
| `%%wc_brand%%` | Product brand (requires WooCommerce Brands or Yoast WooCommerce SEO) |
| `%%wc_shortdesc%%` | Equivalent to `%%excerpt%%` |
| `%%primary_category%%` | Primary product category |
| `%%category%%` | All assigned product categories, comma-separated |
| `%%tag%%` | All product tags, comma-separated |
| `%%currentdate%%`, `%%currentyear%%`, `%%currentmonth%%` | Today's date components |

A workable template for a mid-size catalogue:

```
%%excerpt%% %%sep%% %%wc_price%% at %%sitename%%. Free shipping AU-wide over $100.
```

This produces something like: *"GOTS-certified organic cotton tee, screen-printed in Melbourne. - $45.00 at Acme Apparel. Free shipping AU-wide over $100."*

Set the template at **Yoast SEO → Search Appearance → Content Types → Products → Meta description template**.

---

## Bulk editing meta descriptions

For catalogues over about 200 products, editing each product individually is not realistic. Two options:

### Yoast bulk editor

**Yoast SEO → Tools → Bulk editor**. Two tabs: Title, Description. Shows existing meta descriptions and lets you edit and save inline. Filters by post type, so you can scope to Products only.

Limits to know:
- Free Yoast does not include the bulk editor for custom post types in some older versions. Yoast WooCommerce SEO ($69-$99/year) adds it for products.
- The editor paginates 20 products at a time. There is no multi-select or find-and-replace.
- No CSV import/export in Yoast Free or Premium. Yoast WooCommerce SEO adds limited CSV export.

### CSV export and re-import

For overhauling thousands of products, the workflow most stores use:

1. Export products with **WP All Export** ($99) or **Product CSV Import Suite** ($79) including the `_yoast_wpseo_metadesc` post meta field
2. Edit in a spreadsheet or have an AI tool generate descriptions in batch
3. Re-import via WP All Import or WooCommerce's native CSV importer

This is faster than the in-WP bulk editor once you cross ~500 products.

---

## Variable products: the inheritance gotcha

WooCommerce variable products have one parent and multiple variations. Yoast stores the meta description against the parent product only. Variations are not separately indexable in WooCommerce by default, so there is no per-variation meta description to set.

This causes confusion because:

- The Yoast meta box appears only on the parent product, never on the variation edit screen
- If you use `%%wc_price%%` in a template, it pulls the **lowest** variation price by default (e.g. "From $29.00")
- If your variations have wildly different prices (e.g. $29 - $499), the description showing "From $29" may understate the catalogue and underperform for searchers looking for premium options

Workarounds:
- Write custom meta descriptions for high-traffic variable products rather than relying on the template
- For variations that genuinely deserve their own ranking (rare), split them into separate products

---

## AI-generated meta descriptions in Yoast Premium

Yoast Premium ($129/year for one site as of 2026) added AI-generated meta description suggestions in 2023. The "Use AI" button appears in the Yoast meta box on each post or product. It uses Yoast's hosted AI service and is included in the Premium subscription with no per-generation cost.

Honest assessment:
- The output is grammatically correct and usually within the character limit
- It pulls from your page content, so accuracy depends on the page having usable content to summarise
- Out-of-the-box descriptions for thin product pages (one line of short description) tend to read generically — you get back what you put in

Alternatives:
- **RankMath Pro** ($59/year) — similar AI feature, included
- **AIOSEO Pro** ($124.50/year first year) — similar, included
- **Asteris Affiliates AI Suite** — runs on your own OpenAI, Anthropic, Gemini, or OpenRouter API key; no monthly cap from Asteris, you pay the AI provider directly (typically $0.001-$0.01 per generation depending on model)

The bring-your-own-key model becomes cheaper than bundled AI once you regenerate descriptions at scale (>500/month) or want to use frontier models like Claude Opus 4 or GPT-5.

---

## Common mistakes

1. **Keyword stuffing.** Including the target keyword once, naturally, is fine. Twice is the upper limit. Three or more reads like spam and Google will rewrite the snippet anyway.
2. **Identical descriptions across a catalogue.** Templates are fine when the variables produce genuine variation; a template that resolves to the same string for every product (because the variables are empty) is worse than no description at all.
3. **Leaving the field blank.** Google will pull from the page body, which on a thin WooCommerce product page often means the product specifications or a fragment of the WooCommerce tabs section. Set at minimum a category-level template.
4. **Using `%%excerpt%%` when short descriptions are not filled in.** Yoast falls back to the long description, which is rarely written for snippet length. Audit your short description field before relying on `%%excerpt%%`.
5. **Forgetting non-product pages.** The /cart, /checkout, /my-account pages do not need ranking, but they need meta descriptions to control how they appear in branded search results.

---

## FAQ

### How long should a meta description be in Yoast?

Yoast turns the indicator green between 120 and 156 characters. In practice, aim for 140-155 characters for desktop snippet coverage, but front-load the most important 110 characters because mobile cuts off earlier.

### Does the meta description affect SEO rankings?

Not directly. Google confirmed in 2009, and has restated since, that meta descriptions are not a ranking factor. They affect click-through rate, which can indirectly influence how Google evaluates the listing's relevance over time.

### Why does Google show a different description than the one I wrote?

Google rewrites meta descriptions roughly 60-70% of the time (Ahrefs 2020, Portent 2022). It does this when it judges that a snippet pulled from the page body better matches the searcher's specific query. Your written description is still the fallback for branded queries and social previews.

### Does Yoast Free include the bulk editor?

Yes — Yoast SEO Free includes the bulk editor for titles and meta descriptions. It is at **Yoast SEO → Tools → Bulk editor**. It paginates 20 items at a time and does not include CSV import/export.

### Can I set a different meta description per variation in WooCommerce?

No. Yoast stores meta descriptions against the parent product only, because WooCommerce variations are not separately indexable by default. If a variation needs its own ranking, split it into a separate product.

### What's the difference between `%%excerpt%%` and `%%wc_shortdesc%%`?

They produce the same output on WooCommerce product pages. Both pull from the WooCommerce short description field. `%%excerpt%%` is the WordPress-native variable, `%%wc_shortdesc%%` is the WooCommerce-aware alias.

### Should I use AI to write meta descriptions?

For catalogues over 100 products, yes — manual writing does not scale. For your top 20-50 highest-revenue products, write the descriptions yourself or have a copywriter do it. AI output is acceptable for the long tail but rarely converts as well as hand-written copy on hero SKUs.

### Does Yoast support meta descriptions for product categories?

Yes. Edit any product category at **Products → Categories → [category]** and scroll down to the Yoast SEO section. Yoast also supports a global template for product categories at **Yoast SEO → Search Appearance → Taxonomies → Product categories**.

### How do I check what Google is actually showing as my description?

Run a `site:yourdomain.com` search in an incognito window and inspect the snippets. For more rigorous monitoring, Google Search Console's Performance report shows impressions per page but not the rendered snippet text — you have to spot-check manually or use a SERP-monitoring tool like SE Ranking or AccuRanker.

### Do meta descriptions affect AI search results (Perplexity, ChatGPT, Google AI Overviews)?

Indirectly. AI search engines crawl your page content and cite sources. The meta description itself is not usually quoted, but it is often the snippet shown in AI-generated source citations. A clear, accurate meta description helps your page get cited correctly.

---

## How Asteris Affiliates fits

Meta descriptions are one slice of on-page SEO, and Yoast, RankMath, and AIOSEO all handle the basics adequately. Where Asteris Affiliates SEO+AI module differs is the integration: meta description templates, structured data, and AI-generated copy run from the same module that handles product schema, breadcrumbs, and AI search optimisation — all on your own API key with no monthly cap from us.

If you are already using Yoast and it works for you, there is no need to switch. If you are running Yoast plus three or four other plugins to cover what Asteris bundles into one, the [comparison page](/yoast-vs-asteris) lays out the differences. If you are migrating, the [Yoast migration guide](/migrate/from-yoast) walks through preserving your existing meta descriptions and titles.

---

## Related

- [Yoast SEO for WooCommerce — full guide](/yoast-guide)
- [Yoast SEO title tags for WooCommerce](/yoast-seo-title-guide)
- [Yoast SEO breadcrumbs configuration](/yoast-breadcrumbs-guide)
- [Yoast SEO score explained](/yoast-seo-score-explained)
- [Yoast SEO checklist for WooCommerce](/yoast-seo-checklist)
- [Yoast vs Asteris Affiliates](/yoast-vs-asteris)
- [Migrating from Yoast to Asteris](/migrate/from-yoast)
- [Asteris modules overview](/modules)
