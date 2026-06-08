---
url: /woocommerce-seo
title: "WooCommerce SEO — what you need and what to use"
meta_description: "WooCommerce SEO: meta titles, schema, breadcrumbs, XML sitemaps, and redirects. What matters, what doesn't, and which plugin handles it best."
og_title: "WooCommerce SEO — what matters in 2026"
og_description: "WooCommerce SEO in 2026: meta, schema, breadcrumbs, sitemaps, redirects. What to configure and which plugin to use."
canonical: https://asterisaffiliates.com/woocommerce-seo
primary_keyword: woocommerce seo
primary_keyword_us_vol: 320
primary_keyword_kd: 13
secondary_keywords:
  - seo for woocommerce
  - woocommerce seo plugin
  - woocommerce seo guide
  - woocommerce seo settings
schema_type: Article + FAQPage
internal_links_out:
  - /yoast-guide
  - /yoast-vs-asteris
  - /modules
  - /docs/modules/seo
  - /yoast-seo-pricing-guide
  - /best-woocommerce-plugins
verified_date: 2026-06-01
next_verification: 2026-09-01
ai_overview_optimised: true
faqs:
  - q: "Do I need a paid SEO plugin for WooCommerce?"
    a: "For most stores, no. Rank Math Free or Yoast Free cover the essentials. Paid makes sense if you need redirect management at scale, advanced schema for non-product content types, or AI-generated meta at volume."
  - q: "Does WooCommerce handle SEO on its own?"
    a: "Partially. WooCommerce generates product post types, manages permalinks, and emits some structured data. It doesn't include a meta description editor, an XML sitemap, or full Product schema with variants, so you need a plugin."
  - q: "What's the best SEO plugin for WooCommerce in 2026?"
    a: "Rank Math Free, Yoast Free, and Asteris's SEO module all rank the same store equivalently when configured correctly. Pick on bundling, price across the year, and whether you want a single plugin or a stack."
  - q: "Should I noindex out-of-stock products?"
    a: "No, unless they're discontinued. Out-of-stock products keep accumulated ranking signal. Mark them out of stock in schema (availability: OutOfStock) and Google handles the rest."
  - q: "Do I need an SEO plugin if my theme has built-in SEO?"
    a: "Yes. Theme-level SEO is usually a basic Yoast-clone that doesn't survive a theme switch. Plugins keep meta and schema portable across themes."
  - q: "How do I stop faceted nav from polluting Google's index?"
    a: "Either noindex,follow on filter URLs via your SEO plugin, or robots.txt disallow on filter query parameters. The noindex option is safer — Google still crawls but won't index. Verify with the URL Inspection tool in Search Console."
  - q: "Does WooCommerce Blocks (the new shop block) affect SEO?"
    a: "Block-based shop pages render the same product schema as classic shortcodes. Performance can differ — block pages tend to be lighter. SEO outcomes are equivalent."
  - q: "How long does WooCommerce SEO take to show results?"
    a: "New stores: 4-8 months for category pages to rank for low-competition queries. Established stores making changes: 2-6 weeks for re-indexing to reflect. Anyone promising faster is selling something."
  - q: "Should I use Yoast WooCommerce SEO (the paid add-on)?"
    a: "If you're already on Yoast Premium and need brand and GTIN fields, breadcrumb tuning for shops, and the Google product feed, yes. If you're on Yoast Free and don't need those, no."
  - q: "Are pretty permalinks worth the SEO benefit on existing stores?"
    a: "Switching permalink structure on a live store needs every old URL 301-redirected. Don't switch unless the current structure is genuinely broken — the redirect-management overhead outweighs the small SEO benefit on most stores."
aio_audit:
  faq_count: 10
  has_direct_answer_lead: true
  has_concise_definitions: true
  blockers: []
  score: 5
---

# WooCommerce SEO — the complete 2026 guide

WooCommerce SEO is the work of making a WooCommerce store's product pages, category archives, and content rank in Google and surface correctly in AI Overviews. It overlaps with general WordPress SEO but has store-specific concerns — product schema, variable products, faceted navigation, pagination, and multi-currency — that a generic SEO plugin can get wrong.

This page is the full reference: what differs from regular WP SEO, the technical foundation, content type strategy, schema, speed, common mistakes, and which tools handle each part. No fluff, no upsell padding.

---

## Why WooCommerce SEO is different from regular WordPress SEO

A blog has posts, categories, and pages. A WooCommerce store adds a product post type, a product category taxonomy, product tags, attributes, variations, the /shop/ archive, and a faceted filter layer. Every one of these is a potential index target — and most of them, if left at defaults, will leak duplicate or thin content into Google's index.

Specifically:

- **Product schema** is mandatory for rich results. WooCommerce stores variants as `product_variation` post types — most SEO plugins don't emit the full `hasVariant` graph that Google now expects for variable products.
- **Variable products** generate one canonical product URL plus N variant data points. The wrong canonical (or a missing one) splits ranking signals across variations.
- **Category pages** are commercial landing pages, not archives. They need unique copy above or below the product grid, not just a paginated list.
- **Shop archives** (the `/shop/` page) compete with category pages for the same keywords. One of them must be the chosen target.
- **Faceted navigation** (filters like `?orderby=price&filter_colour=blue`) creates near-infinite URL combinations. Most should not be indexed.
- **Multi-currency** stores (Aelia, WPML, Yoast WooCommerce SEO premium) need hreflang or currency-specific canonicals depending on the architecture.
- **Cart, checkout, account, thank-you, lost-password** pages must be excluded from sitemaps and noindexed. They sometimes leak in by default.

If you take nothing else from this page: a generic SEO plugin configured for a blog is not a WooCommerce SEO setup.

---

## The technical foundation

Before any plugin configuration, the host and theme have to support the basics.

**HTTPS.** Non-negotiable. Mixed content warnings on a checkout page kill conversions and rankings.

**Mobile-first indexing.** Google indexes the mobile version of your site. If your theme hides product descriptions or reviews behind tabs that don't render on mobile, those words don't count. Test with Google's Mobile-Friendly Test and the URL Inspection tool in Search Console.

**Core Web Vitals.** Three metrics:

| Metric | Target | What it measures |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | When the main product image / hero finishes loading |
| INP (Interaction to Next Paint) | < 200ms | Responsiveness to clicks/taps |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability — no jumping elements |

WooCommerce stores routinely fail LCP because of unoptimised product hero images and INP because of bloated cart-fragment AJAX. Both are fixable.

**Schema.org Product / Offer / AggregateRating.** The structured data that drives price, stock, and star-rating rich snippets. Validate every product type (simple, variable, grouped, external) with Google's Rich Results Test.

**Crawlable URLs.** Pretty permalinks (`/product/widget/`) not query strings. Avoid uppercase, spaces, or special characters in slugs.

---

## Title and meta strategy per content type

Different page types need different title and meta patterns. Set these as templates in your SEO plugin, then override per-page where it matters.

| Content type | Title template | Meta description focus |
|---|---|---|
| Homepage | `Brand — primary positioning (≤ 60 chars)` | What you sell, who for, one differentiator |
| Shop archive | `Shop {Category type} | Brand` | Catalogue breadth, shipping, returns |
| Product category | `{Category} — {N} products | Brand` | Range, price band, key brands stocked |
| Product (simple) | `{Product name} | Brand` | Top 1-2 specs + price band + USP |
| Product (variable) | `{Product name} — {variant axis} | Brand` | Range across variants ("S-XXL", "10 colours") |
| Blog post | `{Post title} ({Year}) | Brand blog` | Promise of the post + who it's for |

Keep titles under 60 characters (580 pixels). Meta descriptions 120-156 characters. Don't stuff — Google rewrites stuffed descriptions about 70% of the time.

**Variable product gotcha:** if your SEO plugin pulls the title from the parent product but the URL canonicalises to a specific variation, you'll see the wrong variant in search results. Test with `site:yourdomain.com "product name"` in Google.

---

## Sitemap strategy for WooCommerce

A WooCommerce XML sitemap should include:

- All published products (simple + variable parents — not individual variations)
- Product categories with at least one product
- Product tags only if you use them meaningfully (most stores shouldn't)
- Standard pages (Home, About, Contact, blog index)
- Blog posts

A WooCommerce sitemap should **exclude**:

- `/cart/`
- `/checkout/`
- `/my-account/` and all sub-pages
- `/checkout/order-received/` (thank-you page)
- `/checkout/order-pay/`
- WooCommerce REST API endpoints
- Search results pages
- Faceted filter URLs
- Login / register / lost-password
- Out-of-stock products with no restock date (debatable — see Common mistakes)

Most SEO plugins handle exclusions automatically once you tell them it's a WooCommerce store. Verify with `yourdomain.com/sitemap_index.xml` (Yoast) or `/sitemap.xml` (Rank Math) after install.

---

## Internal linking patterns

Internal links pass relevance and crawl signal. WooCommerce stores have natural link opportunities most owners ignore.

- **Category-to-product links** are automatic via the archive page — but a paragraph of category copy with 2-3 hand-picked product links converts and ranks better than the grid alone.
- **Product-to-related-product** is built into WooCommerce via cross-sells, upsells, and the related products block. Use it.
- **Blog-to-product** is the highest-value pattern most stores ignore. A blog post about "how to choose a road bike" should link to 4-6 specific products and 1-2 categories, with descriptive anchor text ("our 2026 endurance road bikes" not "click here").
- **Product-to-blog** with a "learn more about X" link below the description supports topical authority.
- **Breadcrumbs** are an internal linking pattern. Make sure they render and that BreadcrumbList schema is emitted.

Avoid linking from every product to your homepage with the anchor "home" — it's noise.

---

## Avoiding duplicate content

WooCommerce generates duplicate-content patterns by default. The four to fix:

1. **Faceted nav.** `?orderby=price`, `?filter_colour=blue`, `?min_price=10` etc. — all crawlable, all near-duplicate of the canonical category. Solution: `noindex,follow` on filtered URLs, or `robots.txt` disallow on the query parameters Google has confirmed it won't try to render.
2. **Sort orders.** `?orderby=popularity`, `?orderby=date`, `?orderby=rating`. Same content, different order. Canonical to the unsorted category.
3. **Pagination.** `/page/2/`, `/page/3/`. Each page should self-canonicalise (not canonical to page 1 — Google deprecated rel=prev/next but still expects pages to be individually indexable). Each paginated page can have a title like "Page 2 of Category".
4. **Variable product variations.** Every variation gets a URL like `?attribute_size=large&attribute_colour=blue`. These should canonical to the parent product unless you're deliberately targeting per-variant search demand (rare, hard).

Tag archives often duplicate category content. If your tags are unmaintained, noindex the tag archive.

---

## Schema essentials

Validate everything in Google's Rich Results Test. The minimum graph for a WooCommerce product page:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product name",
  "image": ["..."],
  "description": "...",
  "sku": "SKU-001",
  "brand": { "@type": "Brand", "name": "Brand" },
  "offers": {
    "@type": "Offer",
    "url": "https://...",
    "priceCurrency": "AUD",
    "price": "99.00",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "23"
  }
}
```

For variable products, add a `hasVariant` array with one entry per variation, each with its own Offer. Google announced in 2023 that it expects this graph for variable apparel and consumer goods.

Other schema types worth emitting:

- **BreadcrumbList** on every product and category page
- **Review** on individual review pages (or nested in Product as part of `review`)
- **FAQPage** for product Q+A blocks where the questions are genuine and visible on the page (no hidden FAQ stuffing — Google issued a manual action wave on this in 2024)
- **Organization** sitewide, with `sameAs` pointing to social profiles
- **WebSite** with `potentialAction` for sitelinks search box

---

## Page speed for product pages

Product pages are the slowest pages on most stores because they load multiple high-res images, review widgets, cross-sell carousels, and analytics tags before LCP.

What moves the needle:

- **Image format and size.** Serve WebP or AVIF, max 1600px wide for hero images. JPEG quality 75-80 is indistinguishable from 100 at this size.
- **Lazy-load below-fold images.** Native `loading="lazy"` works in all current browsers.
- **Eager-load the hero.** Add `fetchpriority="high"` to the first product image. This single attribute has dropped LCP by 800ms in field tests.
- **Defer non-critical JS.** Cart fragment AJAX, chat widgets, analytics — defer or load on interaction.
- **Object cache.** Redis or Memcached. Cuts TTFB on product pages by 40-60% on a typical store.
- **Full-page cache** with WooCommerce-aware exclusions for cart, checkout, account, and logged-in users.

Avoid: heavy slider plugins on product pages, unminified theme CSS, multiple font families, embedded YouTube above the fold (use a thumbnail with click-to-load).

---

## Image SEO

Product images are the second-largest ranking signal for ecommerce after product copy.

- **Filenames** before upload: `endurance-road-bike-blue.jpg`, not `IMG_3847.jpg`. The filename becomes part of the image URL and Google reads it.
- **Alt text** describes the image for screen readers and Google. "Blue endurance road bike, side view" — not "bike" and not the product name verbatim.
- **`srcset`** for responsive serving. WordPress generates this automatically since 4.4. Verify your theme doesn't strip it.
- **Lazy load** everything below the fold. Eager-load the hero.
- **EXIF** orientation — strip it. Some hosts and themes don't rotate images correctly based on EXIF.
- **Image sitemap entries** — most SEO plugins include image URLs in the page-level sitemap entry. Verify.

---

## Content strategy

Three layers.

**Category descriptions.** Every category page needs 150-400 words of unique copy. Place it above the product grid (best for ranking) or below (best for UX). It should answer: what's in this category, who's it for, how to choose, what price range, what brands.

**Product descriptions.** Short description (~50-80 words, appears above the add-to-cart) plus long description (~200-600 words, in the tabs). Long description should cover specs, use cases, what's in the box, sizing/compatibility, and answer the top 3-5 questions customers ask pre-purchase.

**Topical cluster blog content.** Pick 5-10 "pillar" topics relevant to your catalogue. Each pillar gets a 2000-3000 word guide and 4-8 supporting posts, all interlinked, all linking down to relevant categories and products. This is where most of a store's organic search demand actually lives — informational queries that lead to commercial intent.

Avoid: manufacturer-supplied product copy duplicated across 200 retailers (Google merges these). Write your own — even 100 unique words on top of the manufacturer spec sheet is enough to differentiate.

---

## Tools: which SEO plugin

| Plugin | Free covers | Paid adds | Notes |
|---|---|---|---|
| Yoast SEO | Meta, breadcrumbs, sitemap, basic Product schema | Redirects, multi-keyword, internal linking suggestions, WooCommerce SEO add-on ($79/yr) | Most mature. WooCommerce SEO is a separate paid add-on. |
| Rank Math | Meta, breadcrumbs, sitemap, schema (incl. WC), redirects, 404 monitor | AI content, rank tracker, advanced schema | More features free than any competitor. PRO $59/yr first year. |
| AIOSEO | Meta, sitemap, schema, breadcrumbs | WooCommerce SEO module, redirects, link assistant | Elite tier ($299/yr) for WooCommerce features. |
| Asteris SEO module | Meta, breadcrumbs, sitemap, WooCommerce Product schema with variants, redirects | — (single bundle, not per-module pricing) | Included in Asteris Affiliates Starter ($149/yr) alongside 18 other modules. |
| The SEO Framework | Meta, sitemap, basic schema | Extensions ($7/mo) | Lightweight, opinionated, no upsells. |

All five rank the same store comparably if configured correctly. The choice is about what else you need bundled and how much you'll pay across the year.

---

## Common mistakes

1. **Indexing checkout, cart, account.** Run `site:yourdomain.com checkout` in Google. If anything appears, fix your robots / noindex.
2. **Thin product descriptions.** "Available in blue" is not a product description. Below 100 words, ranking is unlikely.
3. **Missing Product schema.** Test every product template (simple, variable, grouped) in Rich Results Test.
4. **Broken canonical on variations.** Canonical should point to the parent product URL, not the variation query string.
5. **Sitemap includes thank-you page.** Customers' order URLs leak into Google and surface as branded search results. Embarrassing.
6. **Out-of-stock products noindexed automatically.** Some plugins do this. If you'll restock, leave them indexed — you lose all accumulated ranking signal otherwise.
7. **Image alt text = product name on every image.** "Blue bike, side view" and "Blue bike, handlebars detail" are better than two copies of "Blue endurance road bike".
8. **No hreflang on multi-currency stores.** If you have `/au/`, `/us/`, `/eu/` regional subfolders, every URL needs hreflang annotations.
9. **Switching SEO plugins without migrating meta.** Yoast → Rank Math without running the import wipes years of hand-written meta descriptions.
10. **Hidden FAQ stuffing.** Don't put FAQPage schema on questions that aren't actually visible on the page. Google issued manual actions for this pattern in 2024.

---

## FAQ

**Do I need a paid SEO plugin for WooCommerce?**
For most stores: no. Rank Math Free or Yoast Free cover the essentials. Paid makes sense if you need redirect management at scale, advanced schema for non-product content types, or AI-generated meta at volume.

**Does WooCommerce handle SEO on its own?**
Partially. WooCommerce generates product post types, manages permalinks, and emits some structured data. It doesn't include a meta description editor, an XML sitemap, or full Product schema with variants. You need a plugin.

**What's the best SEO plugin for WooCommerce in 2026?**
Honestly: Rank Math Free, Yoast Free, and Asteris's SEO module all rank the same store equivalently when configured correctly. Pick on bundling, price across the year, and whether you want a single plugin or a stack.

**Should I noindex out-of-stock products?**
No, unless they're discontinued. Out-of-stock products keep accumulated ranking signal. If you noindex them, then bring them back, you start from zero. Mark them out of stock in schema (`"availability": "OutOfStock"`) and Google handles the rest.

**Do I need an SEO plugin if my theme has built-in SEO?**
Yes. Theme-level SEO is usually a basic Yoast-clone that doesn't survive a theme switch. Plugins keep meta and schema portable across themes.

**How do I stop faceted nav from polluting Google's index?**
Either (a) noindex,follow on filter URLs via your SEO plugin, or (b) robots.txt disallow on filter query parameters. Option (a) is safer — Google still crawls but won't index. Verify with the URL Inspection tool in Search Console.

**Does WooCommerce Blocks (the new shop block) affect SEO?**
Block-based shop pages render the same product schema as classic shortcodes. Performance can differ — block pages tend to be lighter. SEO outcomes are equivalent.

**How long does WooCommerce SEO take to show results?**
New stores: 4-8 months for category pages to rank for low-competition queries. Established stores making changes: 2-6 weeks for re-indexing to reflect. Anyone promising faster is selling something.

**Should I use Yoast WooCommerce SEO (the paid add-on)?**
If you're already on Yoast Premium and need brand + GTIN fields, breadcrumb tuning for shops, and the Google product feed: yes. If you're on Yoast Free and don't need those: no.

**Are pretty permalinks worth the SEO benefit on existing stores?**
Switching permalink structure on a live store needs every old URL 301-redirected. Don't switch unless the current structure is genuinely broken — the redirect-management overhead outweighs the small SEO benefit on most stores.

---

## How Asteris Affiliates fits

WooCommerce SEO is bigger than any single plugin. The work spans theme choices, content writing, schema validation, image optimisation, and ongoing monitoring — none of which a plugin does for you on its own.

Where Asteris fits: the SEO module covers WooCommerce-aware meta editing, breadcrumb output with BreadcrumbList schema, an XML sitemap that excludes the right WC endpoints, redirect management, and Product schema with variant support. It's one of 21 modules in Asteris Affiliates Starter ($149/yr), so the comparison isn't "Asteris SEO vs Yoast" — it's "do I want 19 things in one bundle, or a stack of single-purpose plugins?". If you already pay for Yoast Premium, Smart Coupons, and a redirect plugin, the maths often lands on Asteris. If you only need free SEO and nothing else, stay on Rank Math.

See the [SEO module doc](/docs/modules/seo), the [full module list](/modules), and the honest [Yoast vs Asteris comparison](/yoast-vs-asteris) before deciding.

---

## Related

- [Asteris SEO module documentation](/docs/modules/seo)
- [Yoast vs Asteris Affiliates](/yoast-vs-asteris)
- [Full Yoast guide for WooCommerce](/yoast-guide)
- [Yoast SEO pricing guide](/yoast-seo-pricing-guide)
- [Essential WooCommerce plugins](/essential-woocommerce-plugins)
- [Best WooCommerce plugins (2026)](/best-woocommerce-plugins)
- [Asteris pricing](/pricing)
- [What Asteris doesn't do](/what-asteris-doesnt-do)
