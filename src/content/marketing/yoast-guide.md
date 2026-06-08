---
url: /yoast-guide
title: "Yoast SEO for WooCommerce — complete guide"
meta_description: "Yoast SEO settings for WooCommerce stores. Breadcrumbs, meta descriptions, titles, seo score, pricing, and checklist — all configured for WooCommerce product pages."
og_title: "Yoast SEO for WooCommerce — complete guide"
og_description: "How Yoast SEO works on WooCommerce stores. Breadcrumbs, meta, schema, score, and pricing — all with WooCommerce-specific context."
canonical: https://asterisaffiliates.com/yoast-guide
primary_keyword: yoast seo for woocommerce
primary_keyword_us_vol: 320
primary_keyword_kd: 39
secondary_keywords:
  - yoast woocommerce
  - yoast seo woocommerce settings
  - configure yoast for woocommerce
schema_type: Article + BreadcrumbList
internal_links_out:
  - /yoast-breadcrumbs-guide
  - /yoast-meta-description-guide
  - /yoast-seo-title-guide
  - /yoast-seo-score-explained
  - /yoast-seo-checklist
  - /yoast-seo-pricing-guide
  - /yoast-vs-asteris
  - /migrate/from-yoast
  - /modules
verified_date: 2026-06-01
next_verification: 2026-09-01
ai_overview_optimised: true
faqs:
  - q: "Do I need the Yoast WooCommerce SEO add-on, or is free Yoast enough?"
    a: "Free Yoast covers meta tags and sitemaps but does not emit Product schema. If you want price, stock status, and star ratings to show under your Google listing, you need either the add-on, a separate schema plugin, or hand-rolled JSON-LD. For most stores, the $79/year add-on is the path of least resistance."
  - q: "Is Yoast Premium worth it for a WooCommerce store?"
    a: "Only if you will use the redirect manager or the internal-linking suggestions. The multi-keyword feature is rarely worth $99/year on its own, and the free Redirection plugin matches Yoast Premium's redirect feature."
  - q: "Will Yoast slow down my WooCommerce store?"
    a: "Marginally. Yoast adds about 20-40ms to page generation time on a typical product page, mostly in the schema graph builder. On stores with full-page caching the impact is invisible because the cached page already includes the rendered output."
  - q: "Can I use Yoast and Rank Math at the same time?"
    a: "No. They both register the same meta tags, the same sitemap endpoint, and the same schema graph. Activating both will produce duplicate tags and break your sitemap. Pick one and use the migration tool in the other to import your data."
  - q: "How do I set the breadcrumb for products in multiple categories?"
    a: "Edit the product, find the Yoast SEO meta box, and set the Primary category field. The breadcrumb and the canonical URL will use that category. This field only appears when the WooCommerce SEO add-on is active."
  - q: "Does Yoast handle hreflang for multilingual stores?"
    a: "Yoast does not generate hreflang tags itself. WPML, Polylang, and TranslatePress all generate hreflang and Yoast respects them. If you are running a multilingual store without one of those plugins, hreflang is on you."
  - q: "Why is my Yoast SEO score red on every product?"
    a: "The default analysis expects 300+ words of body copy, a focus keyphrase in the first paragraph, subheadings, and an image alt that contains the keyphrase. Product pages rarely meet all of those because they are product pages, not blog posts. The score is a guideline; Google does not see it."
  - q: "Can I migrate from Yoast to another SEO plugin without losing rankings?"
    a: "Yes, provided you migrate the meta titles, descriptions, focus keyphrases, and redirects. Rank Math, SEOPress, and All in One SEO all have one-click Yoast importers. The risk is not the import — it is forgetting to import the redirects, which breaks any URL changes Yoast was managing."
aio_audit:
  faq_count: 8
  has_direct_answer_lead: true
  has_concise_definitions: true
  blockers: []
  score: 5
---

# Yoast SEO for WooCommerce — complete guide

Yoast for WooCommerce is Yoast SEO plus the paid WooCommerce SEO add-on, which together give product pages meta tags, sitemaps, breadcrumbs, and the Product schema Google needs for rich results. You need it if you want price, stock, and star ratings under your Google listings — free Yoast alone does not emit Product schema. The rest of this page covers setup, pricing, the gotchas, and when stores outgrow it.

## What Yoast SEO does on a WooCommerce store

Out of the box, free Yoast on a WooCommerce install gives you four things that matter:

- **A meta box on every product** for SEO title, meta description, focus keyphrase, and a readability/SEO score.
- **An XML sitemap** at `/sitemap_index.xml` that includes a `product-sitemap.xml` for your catalogue and `product_cat-sitemap.xml` for shop categories.
- **Open Graph and Twitter card tags** on product pages, pulled from the product image and short description if you do not override them.
- **Basic schema** — `WebPage` and `BreadcrumbList` on product pages, plus an `Organization` or `Person` graph for the site.

What free Yoast does **not** do on WooCommerce, even though many guides claim it does:

- No `Product` schema with price, availability, SKU, or aggregateRating. The free version only emits `Product` schema on the post type when the WooCommerce SEO add-on is active. Without the add-on, your products will not show rich results in Google.
- No breadcrumb override for the shop page hierarchy. The default theme breadcrumb is whatever your theme outputs.
- No primary category selector for products that sit in multiple categories.

That gap is exactly what the paid WooCommerce SEO add-on is built to fill.

## The Yoast WooCommerce SEO add-on (what it actually adds)

The WooCommerce SEO add-on (sold separately at $69/year for one site) layers four features onto a Yoast install:

1. **Product schema** — adds `Product`, `Offer`, `AggregateRating`, and `Review` to product page JSON-LD. This is what makes the price, stock status, and star rating appear under your listing in Google.
2. **Breadcrumbs for WooCommerce archives** — replaces theme breadcrumbs on shop, category, and product pages with a Yoast-controlled trail that respects the primary category.
3. **Primary category** — a meta box on products with multiple categories so you can choose which one the canonical URL and breadcrumb use.
4. **Pinterest Rich Pins** — adds the `product` Open Graph type and pricing metadata Pinterest needs to show price and availability on saved pins.

If you sell anything, the add-on is the difference between Google knowing what your page is and Google guessing. Without it, you can hand-roll the same schema with custom code or a separate plugin — but most stores end up paying the $69 because the alternative is more fragile.

## Installation and first-time setup

Yoast ships from the WordPress.org repo. The shortest path from zero to configured:

1. **Install Yoast SEO** (free) from Plugins → Add New.
2. **Run the configuration wizard** at Yoast SEO → General → First-time configuration. Pick "online store" as the site type. This sets `Product` post type to indexable, hides product attribute archives from search (most stores want this), and disables the author archive.
3. **Buy and install the WooCommerce SEO add-on** if you need product rich results. Activation is automatic once the licence is entered at SEO → My Yoast.
4. **Set breadcrumb separator and home label** at SEO → Search Appearance → Breadcrumbs. The default ">" separator is fine; the home label defaults to "Home", which is what you usually want.
5. **Configure social** at SEO → Social. Add your Facebook page URL and Twitter handle so the `og:site_name` and `twitter:site` tags are correct.
6. **Verify Search Console** at SEO → General → Site connections. This unlocks the wincher integration on Premium and is a one-time paste.

The wizard does most of this for you, but skipping the breadcrumb separator and social handles is the most common omission.

## Free vs Premium vs the WooCommerce add-on — pricing in plain English

| Product | Price (1 site, 1 year) | What you get |
|---|---|---|
| Yoast SEO Free | $0 | Meta editor, sitemap, OG tags, basic schema, readability and SEO analysis |
| Yoast SEO Premium | $99 | All of free + redirect manager, multi-keyword (up to 5), internal linking suggestions, AI title/description, Stale content alerts, Zapier export |
| Yoast WooCommerce SEO | $79 | Product schema, primary category, WooCommerce breadcrumbs, Rich Pins |
| Premium + WooCommerce | $148 bundle | Both, sold together at SEO → Premium |

Prices renew at the same rate; there is no first-year discount that lapses. The licence covers one site per seat — multi-site licences cost roughly $179 for five sites.

If your store has fewer than ~500 products, no migration history, and no real internal-linking strategy, the free version plus the WooCommerce add-on covers you. Premium becomes worth it the first time you redo your URL structure (the redirect manager pays for itself), or when you start running content marketing alongside the store and want the internal-linking suggestions.

See the [full pricing breakdown](/yoast-seo-pricing-guide) for the renewal terms and bundle maths.

## WooCommerce-specific Yoast issues that bite

Five issues come up over and over on stores running Yoast. None are bugs exactly — they're misconfigurations or behaviours that surprise people.

### 1. The product sitemap and WooCommerce pagination

Yoast's `product-sitemap.xml` lists product URLs without pagination parameters. That's correct. But if you have a custom shop page with `?paged=2` or `/page/2/` archive URLs, those will not be in any Yoast sitemap by default. Yoast does not paginate category archives in the sitemap on the assumption that Google will follow internal links to discover them. For stores with thousands of products in a single category, that means deeper products never get crawled. The fix is usually a separate paginated archive submitted via Search Console, not a Yoast setting change.

### 2. Focus keyphrase on variable products

Yoast's readability analysis reads the product short description and long description. On variable products, the variation descriptions are stored on the variation, not the parent, so the parent product can look "thin" to Yoast even when you have detailed variation copy. The SEO score will tell you to add more body content. Ignore it for variable products — Google indexes the parent URL with the parent description, and the variations are loaded by JavaScript.

### 3. Product gallery and schema images

The WooCommerce SEO add-on emits the featured image as `Product.image` in JSON-LD. It does not include the gallery images. If your gallery has the better photos, swap the featured image to your hero shot before publishing. There is no setting to change this behaviour in the add-on as of version 16.x.

### 4. Out-of-stock products in the sitemap

By default, out-of-stock products stay in the Yoast sitemap. If you want them removed, the trick is to set them to `Draft` status, not the "Out of stock" stock status. Some stores hide out-of-stock products from the catalogue but leave them indexed — that's fine if you want the URL to keep ranking for return-to-stock traffic; not fine if you want them gone.

### 5. Canonical conflicts with WPML or Polylang

If you run a multilingual store, Yoast and the translation plugin both want to set canonical URLs. WPML's "SEO" tab in WPML → Languages must be set to delegate canonicals to Yoast, or you get double canonical tags on product pages. Polylang has a similar setting under Polylang → Settings → URL modifications.

## When stores outgrow Yoast

Yoast is excellent for content sites and small-to-medium stores. The points where stores typically replace it:

- **You need server-side caching of meta and schema.** Yoast generates schema on every page load. Object caching helps, but high-traffic stores see measurable TTFB improvements moving to plugins that pre-generate schema.
- **You want product feeds for Google Merchant Centre.** Yoast does not build product feeds. Stores either add a separate feed plugin (Product Feed Pro, ELEX) or move to an all-in-one like Rank Math which includes a basic feed builder on its Business plan.
- **You need bulk meta editing.** Yoast's "Bulk editor" only edits title and description, one row at a time. Stores with 5,000+ products usually move to WP All Import + ACF, or to Rank Math which has a true bulk editor.
- **You want redirects without Premium.** Free Yoast has no redirect manager. Premium has one. Plenty of stores instead use the free Redirection plugin from John Godley, which is more capable than the Premium one anyway.

None of these are reasons to drop Yoast in a panic. They're reasons stores end up running Yoast alongside two or three other tools, which is where the consolidation argument comes in.

## FAQ

**Do I need the Yoast WooCommerce SEO add-on, or is free Yoast enough?**

Free Yoast covers meta tags and sitemaps. It does not emit `Product` schema. If you want price, stock status, and star ratings to show under your Google listing, you need either the add-on, a separate schema plugin, or hand-rolled JSON-LD. For most stores, the $79/year add-on is the path of least resistance.

**Is Yoast Premium worth it for a WooCommerce store?**

Only if you'll use the redirect manager or the internal-linking suggestions. The multi-keyword feature is rarely worth $99/year on its own, and the free Redirection plugin matches Yoast Premium's redirect feature.

**Will Yoast slow down my WooCommerce store?**

Marginally. Yoast adds about 20–40ms to page generation time on a typical product page, mostly in the schema graph builder. On stores with full-page caching (Cloudflare, WP Rocket, LiteSpeed) the impact is invisible because the cached page already includes the rendered output. Without caching, you'll notice it on category pages with 24+ products.

**Can I use Yoast and Rank Math at the same time?**

No. They both register the same meta tags, the same sitemap endpoint, and the same schema graph. Activating both will produce duplicate tags and break your sitemap. Pick one and use the migration tool in the other to import your data.

**How do I set the breadcrumb for products in multiple categories?**

Edit the product, find the "Yoast SEO" meta box, and set the "Primary category" field. The breadcrumb (and the canonical URL, if your permalink uses `/product-category/`) will use that category. This field only appears when the WooCommerce SEO add-on is active.

**Does Yoast handle hreflang for multilingual stores?**

Yoast does not generate hreflang tags itself. WPML, Polylang, and TranslatePress all generate hreflang and Yoast respects them. If you're running a multilingual store without one of those plugins, hreflang is on you.

**Why is my Yoast SEO score red on every product?**

The default analysis expects 300+ words of body copy, a focus keyphrase in the first paragraph, subheadings, and an image alt that contains the keyphrase. Product pages rarely meet all of those because they're product pages, not blog posts. The score is a guideline. Google does not see the Yoast score; only you do.

**Can I migrate from Yoast to another SEO plugin without losing rankings?**

Yes, provided you migrate the meta titles, descriptions, focus keyphrases, and redirects. Rank Math, SEOPress, and All in One SEO all have one-click Yoast importers. Asteris Affiliates has a guided importer at [/migrate/from-yoast](/migrate/from-yoast). The risk is not the import — it's forgetting to import the redirects, which breaks any URL changes Yoast was managing.

## How Asteris Affiliates fits

Asteris Affiliates includes an SEO module that covers the WooCommerce-specific bits of Yoast: product schema with offers and aggregate ratings, primary category, WooCommerce-aware breadcrumbs, product sitemap, and a basic redirect manager. It does not match Yoast Premium on internal-linking suggestions or AI-generated meta — those are content-site features that most stores never use.

The reason stores switch is consolidation, not feature parity. Asteris bundles SEO with wishlist, PDF invoices, side cart, filtering, and the other 14 modules for $149/year, which works out cheaper than Yoast Premium + the WooCommerce add-on alone if you were going to install any of those other plugins anyway.

If you're happy with Yoast and you only need SEO, stay on Yoast. If you're paying for Yoast + four other plugins, the maths starts to favour a single bundle.

[Yoast vs Asteris side-by-side](/yoast-vs-asteris) · [Guided migration from Yoast](/migrate/from-yoast) · [See all modules](/modules)

## Related

- [Yoast breadcrumbs on WooCommerce — full guide](/yoast-breadcrumbs-guide)
- [Yoast meta description guide for products](/yoast-meta-description-guide)
- [Yoast SEO title guide](/yoast-seo-title-guide)
- [What the Yoast SEO score actually means](/yoast-seo-score-explained)
- [WooCommerce SEO checklist](/yoast-seo-checklist)
- [Yoast pricing breakdown](/yoast-seo-pricing-guide)
- [Yoast vs Asteris Affiliates](/yoast-vs-asteris)
- [Migrate from Yoast to Asteris](/migrate/from-yoast)
