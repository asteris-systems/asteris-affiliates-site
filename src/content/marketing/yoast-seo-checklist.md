---
url: /yoast-seo-checklist
title: "Yoast SEO checklist for WooCommerce stores"
meta_description: "Before publishing a WooCommerce product: the Yoast SEO checklist. Focus keyword, meta title, description, schema, image alt, breadcrumbs, and more."
og_title: "Yoast SEO checklist for WooCommerce"
og_description: "What to check in Yoast SEO before publishing a WooCommerce product. 10-point checklist specific to WooCommerce stores."
canonical: https://asterisaffiliates.com/yoast-seo-checklist
primary_keyword: yoast seo checklist for woocommerce
primary_keyword_us_vol: 170
primary_keyword_kd: 20
secondary_keywords:
  - yoast seo settings woocommerce
  - yoast configuration woocommerce
  - woocommerce seo checklist
schema_type: Article + HowTo
internal_links_out:
  - /yoast-guide
  - /yoast-meta-description-guide
  - /yoast-seo-title-guide
  - /yoast-seo-score-explained
  - /modules
  - /yoast-vs-asteris
verified_date: 2026-06-01
ai_overview_optimised: true
faqs:
  - q: "How long does the Yoast WooCommerce setup actually take?"
    a: "About 90 minutes for the store-level configuration if you have Search Console and social accounts ready. Add another 30 minutes if you're connecting Bing Webmaster Tools and configuring schema defaults. The per-product checklist is 3-5 minutes per product."
  - q: "Do I need the Yoast WooCommerce SEO add-on?"
    a: "Worth it if you sell more than ~50 products or care about Google Merchant Center. The add-on (US$79/year, single site, June 2026) adds GTIN/brand fields, enhanced product schema, and breadcrumbs that use primary category. Without it, the free plugin still outputs basic Product schema but misses brand and identifier fields."
  - q: "Why are my products not appearing in Google after two weeks?"
    a: "Three common causes: products set to Catalog visibility Hidden or Shop only are excluded from the sitemap; noindex accidentally enabled site-wide under SEO Site features; or the sitemap wasn't submitted to Search Console. Check the Coverage report for clues."
  - q: "Should I use Yoast or Rank Math for WooCommerce?"
    a: "Both work. Rank Math's free tier includes more features than Yoast's free tier. Yoast's paid WooCommerce add-on is more polished and better-tested against WooCommerce updates. If you're already on Yoast, the migration cost outweighs the feature gap."
  - q: "Will Yoast slow down my WooCommerce store?"
    a: "Marginally. Yoast adds ~40ms to backend page builds (admin only — frontend impact is closer to 5ms). Sitemap generation can be slow on stores with 10,000+ products, but it's cached. Not enough to matter for most stores."
  - q: "Do I need to configure breadcrumbs in both Yoast and WooCommerce?"
    a: "No — pick one. Enable Yoast breadcrumbs, then disable WooCommerce's built-in breadcrumbs in your theme. Running both creates duplicate breadcrumb schema, which Google flags as an error in Search Console."
  - q: "What's the right title template for product pages?"
    a: "Title separator sitename is the sane default. If your product names are short or generic, add the primary category placeholder (requires the WooCommerce add-on). Avoid stuffing keywords into the template — write per-product overrides for products that matter."
  - q: "How do I handle out-of-stock products in Yoast?"
    a: "Don't delete them — you'll lose the URL and any backlinks. Either leave indexed with availability marked OutOfStock in schema (WooCommerce does this automatically), or set Yoast Advanced to noindex if permanently discontinued. Never 404 a product with external links — 301 to a replacement or parent category."
aio_audit:
  faq_count: 8
  has_direct_answer_lead: true
  has_concise_definitions: true
  blockers: []
  score: 5
---

# Yoast SEO checklist for WooCommerce stores

A done-once setup checklist for Yoast SEO on WooCommerce, plus the per-product checks you run every time you publish. Everything below is specific to WooCommerce stores — not generic blog advice. Follow it top to bottom and you'll have a configured install in roughly 90 minutes, with a repeatable five-minute checklist for every new product.

## What is the Yoast SEO checklist for WooCommerce?

Yoast SEO is the most-installed SEO plugin on WordPress (~5 million active installs as of mid-2026). The free plugin handles titles, meta descriptions, breadcrumbs, sitemaps, and basic schema. The paid WooCommerce SEO add-on (US$79/year for a single site as of June 2026) adds product schema fields, breadcrumbs that use the primary category, and richer OpenGraph output for product pages.

The "checklist" splits into two halves. The store-level setup is a one-time configuration: connect Search Console, set title templates, configure schema, enable breadcrumbs. The per-product checklist runs every time you publish — focus keyword, meta description, primary category, image alt text. Confusing the two is the most common mistake: people redo the store config every time, and forget to set a primary category on each product.

## Before you start

You need:

- WooCommerce 8.0+ (HPOS-compatible).
- Yoast SEO free 22.0+ (current stable as of June 2026 is 23.4).
- Admin access to the WordPress dashboard.
- A Google account with Search Console access (free).
- Optional: Bing Webmaster Tools account, Yoast WooCommerce SEO add-on licence.

If you're migrating from Rank Math or All in One SEO, install the Yoast import tool first and run it before changing settings. Yoast's importer is at SEO → Tools → Import and export. It overwrites existing Yoast metadata on conflict, so back up the database before running it.

## Store-level setup (do once)

### 1. Install and activate Yoast SEO

From Plugins → Add New, search "Yoast SEO", install, activate. If you bought Yoast SEO Premium or the WooCommerce SEO add-on, install those from the zip files in your my.yoast.com account separately. Activate them after the free plugin.

### 2. Run the first-time configuration wizard

SEO → General → First-time configuration. Five steps:

1. **Site representation.** Choose Organisation or Person. For a WooCommerce store, almost always Organisation. Enter the legal trading name, upload a 696×696px square logo (PNG with transparent background works best).
2. **Social profiles.** Add the URLs for Facebook, Instagram, X, LinkedIn, YouTube — whatever you actually maintain. Yoast outputs these as `sameAs` properties in the Organisation schema, which helps entity disambiguation in Google's Knowledge Graph.
3. **Site preferences.** "Will your site contain content you don't want Google to show?" — answer No unless you have legitimately private sections. The No answer keeps the default index settings sane.
4. **Email signup.** Skip or join, doesn't affect SEO.
5. **Connect to Google.** Defer this — we'll do Search Console properly in the next step.

### 3. Connect Google Search Console

SEO → General → Webmaster Tools. You'll see fields for Google, Bing, Yandex, Baidu. For Google, you need a verification meta tag from `search.google.com/search-console`:

1. Add property → URL prefix → enter `https://yourstore.com.au` (use the exact protocol and subdomain that matches your canonical).
2. Choose "HTML tag" verification.
3. Copy the `content="..."` value (just the value, not the full tag).
4. Paste into the Google verification code field in Yoast → Save.
5. Back in Search Console → Verify.

For Bing Webmaster Tools, repeat the process at `bing.com/webmasters`. Bing's verification can also be done by importing from Search Console, which is faster.

### 4. Submit your sitemap

Yoast generates the sitemap automatically at `/sitemap_index.xml`. Confirm it loads in a browser. In Search Console → Sitemaps → enter `sitemap_index.xml` → Submit. In Bing Webmaster Tools, do the same.

WooCommerce stores typically have these sub-sitemaps:

- `post-sitemap.xml` — blog posts
- `page-sitemap.xml` — pages
- `product-sitemap.xml` — WooCommerce products
- `product_cat-sitemap.xml` — product categories
- `product_tag-sitemap.xml` — product tags

If `product-sitemap.xml` is missing or empty, the most common cause is products set to "Catalog visibility: Hidden" in the Product Data panel. Yoast respects that flag and excludes them from the sitemap.

### 5. Set the knowledge graph entity type

SEO → Settings → Site representation. Confirm Organisation is selected, the name is correct, and the logo URL is set. This drives the Organisation schema block on every page and is what Google reads when building your knowledge panel.

### 6. Configure title and meta templates per content type

SEO → Settings → Content types. For each content type you publish:

| Content type | Recommended title template | Recommended meta template |
|---|---|---|
| Posts | `%%title%% %%page%% %%sep%% %%sitename%%` | `%%excerpt%%` |
| Pages | `%%title%% %%sep%% %%sitename%%` | `%%excerpt%%` |
| Products | `%%title%% %%sep%% %%sitename%%` | `%%wc_shortdesc%%` |
| Product categories | `%%term_title%% Archives %%sep%% %%sitename%%` | `%%category_description%%` |

The `%%wc_shortdesc%%` placeholder is only available with the Yoast WooCommerce SEO add-on. Without it, use `%%excerpt%%` and write the product short description in the same field WooCommerce already uses.

Disable date in snippet preview unless you publish time-sensitive content. Set "Show products in search results" to Yes (it should be by default).

### 7. Enable the WooCommerce SEO add-on (if purchased)

SEO → WooCommerce. Toggle on:

- Enhanced breadcrumbs (uses primary category instead of first category alphabetically).
- Schema enhancements (adds `Product`, `Offer`, `AggregateRating`, GTIN, brand fields).
- OpenGraph product price + currency tags.
- Twitter card product images.

The add-on also exposes GTIN/MPN/ISBN fields in the product editor. Fill these if you have them — Google Merchant Center requires GTIN for most categories, and Yoast outputs it directly into the `Product` schema.

### 8. Configure product schema defaults

SEO → Settings → Content types → Products → Schema. Set:

- Default page type: Item Page
- Default article type: leave blank (products aren't articles)

If you don't have the add-on, Yoast's free schema still outputs `Product` and `Offer` but won't include brand, GTIN, or aggregate rating. That's a real limitation if you care about rich results.

### 9. Set up social profiles and OG fallback

SEO → Settings → Site features → API. Confirm OpenGraph and Twitter card output is enabled (it is by default in current versions).

Upload a default OG image at SEO → Settings → Site basics → Site image. Use 1200×630px, under 1MB, JPEG. This is the fallback used when a page has no featured image. For products, the featured image is used automatically, but the fallback catches edge cases (e.g. variable products without a main image set).

### 10. Configure breadcrumbs

SEO → Settings → Advanced → Breadcrumbs. Enable. Configure:

- Separator: `»` or `›`
- Anchor text for the homepage: "Home"
- Prefix for the breadcrumb path: leave blank
- Prefix for archive breadcrumbs: leave blank
- Bold the last page: Yes

Most WooCommerce themes (Storefront, Astra, Kadence) auto-detect Yoast breadcrumbs once enabled. If your theme doesn't, add this to `single-product.php` above the product summary:

```php
<?php if ( function_exists( 'yoast_breadcrumb' ) ) {
    yoast_breadcrumb( '<nav class="yoast-breadcrumb">', '</nav>' );
} ?>
```

Disable WooCommerce's built-in breadcrumbs to avoid duplication:

```php
add_action( 'init', function() {
    remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );
} );
```

## Per-product checklist (run on every product)

This is the five-minute pass before clicking Publish.

### 1. Set a focus keyword

Yoast meta box → Focus keyphrase. Use the exact phrase a shopper would type. "Stainless steel kitchen scissors" beats "scissors". Don't reuse the same focus keyphrase across multiple products — Yoast flags it and you'll cannibalise your own rankings.

### 2. Write a custom SEO title (40-60 characters)

Default template gives `Product Name | Site Name`. Override per-product when:

- The product name is generic and needs context ("Pro Kit" → "Pro Kit — Acoustic Guitar Setup Tools | Acme").
- The brand name is well-known and worth leading with.
- You're targeting a long-tail keyword the product name doesn't contain.

Aim for 50-55 characters. Anything over 60 truncates on desktop (580px width).

### 3. Write a meta description (120-156 characters)

Never leave blank. Google generates one from page content when blank, and it's usually the first 156 characters of the long description — often filler or specs. Write one sentence: what it is, why click. Include the focus keyphrase once, near the start.

### 4. Set the primary category

Product Data → Categories panel → hover a category → "Make primary". This controls:

- The breadcrumb path (with the Yoast WooCommerce add-on).
- The canonical URL structure if you use `/product-category/%product_cat%/%postname%/` permalinks.
- The "category" field in Product schema.

Skip this step and Yoast/WooCommerce picks the alphabetically-first category, which is rarely the right one.

### 5. Check image alt text

Every product image needs descriptive alt text. The main image should contain the focus keyphrase naturally. Don't keyword-stuff gallery images — describe what's actually shown ("Side view of kitchen scissors with black handle").

Yoast won't flag missing alt text on gallery images, only the featured image. Audit gallery images manually or use a tool like the Media Library's bulk-edit view.

### 6. Add a product short description

Show in the product editor under the main editor. Yoast uses this for the meta template (`%%wc_shortdesc%%`) and it appears next to the Add to Cart button. 50-100 words. Include the focus keyphrase once.

### 7. Fill GTIN, brand, and SKU (if you have the WooCommerce add-on)

Product Data → SEO tab. GTIN (barcode), brand name, MPN. Required if you list in Google Merchant Center. Optional but high-value for Google rich results — products with GTIN are 2-3x more likely to show review stars in search.

### 8. Preview the Google snippet

Yoast meta box → Google preview tab. Toggle between mobile and desktop. Confirm:

- Title doesn't truncate mid-word.
- Description ends on a full sentence.
- URL slug is human-readable (no `?p=1234`).

### 9. Check the Yoast analysis for actionable misses

Ignore: "Text length" warnings (product pages are intentionally short), "Outbound links" warnings (most products don't link out), "Internal links" warnings if you have related products enabled.

Fix: missing meta description, missing focus keyphrase, focus keyphrase not in title, focus keyphrase not in URL slug, image alt missing.

### 10. Exclude thin or duplicate pages from the sitemap

Yoast meta box → Advanced → Allow search engines to show this Post in search results → No. Use for:

- Variation-only products that duplicate a parent.
- Hidden products only sold via direct link.
- Out-of-stock seasonal products you're keeping live for URL preservation.

## Post-launch review (do at 2 weeks and 4 weeks)

After two weeks of live indexing, open Search Console:

1. **Coverage report.** Confirm product pages are indexed. Common issues: "Discovered – currently not indexed" (Google found it but hasn't crawled — normal for new sites, give it more time), "Crawled – currently not indexed" (Google decided it's low-quality — usually thin content or near-duplicate variations).
2. **Performance report.** Filter by `/product/` URL path. Look at impressions vs clicks. Pages with impressions but no clicks need better titles and meta descriptions.
3. **Enhancements → Products.** Confirm structured data is parsing. Errors here are usually missing `price`, `availability`, or `image` fields — most often caused by variable products without a default variation set.
4. **URL Inspection.** Spot-check 3-5 product URLs. Confirm the rendered HTML contains the expected title, meta, and schema.

## FAQ

### How long does the Yoast WooCommerce setup actually take?

About 90 minutes for the store-level configuration if you have Search Console and social accounts ready. Add another 30 minutes if you're connecting Bing Webmaster Tools and configuring schema defaults carefully. The per-product checklist is 3-5 minutes per product once you've internalised it.

### Do I need the Yoast WooCommerce SEO add-on?

Worth it if you sell more than ~50 products or care about Google Merchant Center. The add-on (US$79/year, single site, June 2026) adds GTIN/brand fields, enhanced product schema, and breadcrumbs that use primary category. Without it, the free plugin still outputs basic `Product` schema but misses brand and identifier fields, which limits rich result eligibility.

### Why are my products not appearing in Google after two weeks?

Three common causes: (1) products set to Catalog visibility "Hidden" or "Shop only" are excluded from the sitemap, (2) `noindex` accidentally enabled site-wide under SEO → Site features, (3) the sitemap wasn't submitted to Search Console. Check Coverage report — if URLs show as "Excluded by noindex tag", check the per-product Advanced setting.

### Should I use Yoast or Rank Math for WooCommerce?

Both work. Rank Math's free tier includes more features (schema templates, redirections, 404 monitor) than Yoast's free tier. Yoast's paid WooCommerce add-on is more polished and better-tested against WooCommerce updates. If you're already on Yoast, the migration cost outweighs the feature gap. If you're starting fresh and on a tight budget, Rank Math's free tier is more capable.

### Will Yoast slow down my WooCommerce store?

Marginally. Yoast adds ~40ms to backend page builds (admin only — frontend impact is closer to 5ms in current versions). The sitemap generation can be slow on stores with 10,000+ products — Yoast caches it, but the first regeneration after a product update can take 10-30 seconds. Not enough to matter for most stores.

### Do I need to configure breadcrumbs in both Yoast and WooCommerce?

No — pick one. Enable Yoast breadcrumbs, then disable WooCommerce's built-in breadcrumbs in your theme (code snippet in section 10 above). Running both creates duplicate breadcrumb schema, which Google flags as an error in Search Console.

### What's the right title template for product pages?

`%%title%% %%sep%% %%sitename%%` is the sane default. If your product names are short or generic, add the category: `%%title%% %%sep%% %%primary_category%% %%sep%% %%sitename%%` (the `%%primary_category%%` placeholder needs the WooCommerce add-on). Avoid stuffing keywords into the template — write per-product overrides for the products that matter.

### How do I handle out-of-stock products in Yoast?

Don't delete them — you'll lose the URL and any backlinks. Two options: (1) leave indexed, mark availability as "OutOfStock" in schema (WooCommerce does this automatically) — Google still ranks the page, (2) set Yoast Advanced → noindex if the product is permanently discontinued and you want it out of search. Never 404 a product page that has external links pointing to it; 301 to the closest replacement or the parent category instead.

## How Asteris Affiliates fits

This checklist works whether you use Yoast or not. If you're happy with Yoast and the workflow above fits your team, stay where you are — Yoast is mature, well-supported, and the WooCommerce add-on is the most polished option in its niche.

Asteris Affiliates includes an SEO module that runs the same per-product checks (focus keyword, meta title, description, schema, image alt, breadcrumbs) inside one consolidated plugin alongside performance, security, conversion, and analytics modules. Most stores stack 6-10 plugins to cover what Asteris covers in one. The trade-off: Asteris doesn't yet match Yoast's depth in content analysis (no readability scoring, no Premium-tier internal linking suggestions). If SEO is your dominant concern and you want the most-developed dedicated tool, Yoast wins. If you're consolidating a sprawling plugin stack, [see the SEO module docs](/docs/modules/seo) or the [Yoast vs Asteris comparison](/yoast-vs-asteris).

## Related

- [The full Yoast SEO for WooCommerce guide](/yoast-guide)
- [Writing meta descriptions in Yoast](/yoast-meta-description-guide)
- [Writing SEO titles in Yoast](/yoast-seo-title-guide)
- [What the Yoast SEO score actually means](/yoast-seo-score-explained)
- [Yoast SEO pricing breakdown](/yoast-seo-pricing-guide)
- [Migrating from Yoast to Asteris](/migrate/from-yoast)
- [WooCommerce SEO — the full picture](/woocommerce-seo)
- [Yoast vs Asteris feature comparison](/yoast-vs-asteris)
