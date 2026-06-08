---
title: "SEO"
description: "All-in-one SEO toolkit for WooCommerce — meta fields, schema, XML sitemap, redirects, breadcrumbs, focus-keyword scoring and DataForSEO research — for store owners who want to retire Yoast or Rank Math."
---

## What it does

The Asteris SEO module writes the `<title>`, meta description, canonical, robots and social-card tags on every post, page, product, category and tag. It also generates an XML sitemap, filters `robots.txt`, manages 301/302/410 redirects with a 404 log, outputs Product / Article / FAQ / HowTo / Breadcrumb / LocalBusiness JSON-LD, scores content against a focus keyword and surfaces internal-linking suggestions. A built-in DataForSEO client adds keyword-volume lookups inside the post editor when you supply your own credentials.

It replaces Yoast Premium ($129/yr), Rank Math Pro ($59/yr), AIOSEO Pro ($99/yr) and SEOPress Pro ($99/yr). When any of those four are active, Asteris SEO suppresses its own frontend output so you do not get duplicate tags during a migration.

## Quick start

1. Activate the SEO module under **Asteris** → **Modules**.
2. Open **Asteris** → **SEO**. Confirm the title patterns under **Title patterns** read sensibly for your homepage, posts, pages, products and archives.
3. Tick the **Auto-noindex rules** that suit your site (search, attachment, paginated and date archives are on by default).
4. Visit `/sitemap.xml` to confirm the sitemap is rendering. Submit that URL to Google Search Console.
5. Open any product or post. Scroll to the **Asteris SEO** metabox below the editor. Set a focus keyword, then write a title and description against the live Google preview.
6. If you run a physical store, fill out **Local SEO / LocalBusiness schema** and tick **Enable**.
7. Optional: under **DataForSEO**, paste your API login + password to enable keyword volume in the post-editor panel.

## Settings reference

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| `title_pattern_home` | Title pattern for the homepage | `%site_name% %separator% %site_tagline%` | Free text with tokens |
| `title_pattern_post` | Title pattern for blog posts | `%post_title% %separator% %site_name%` | Free text with tokens |
| `title_pattern_page` | Title pattern for pages | `%post_title% %separator% %site_name%` | Free text with tokens |
| `title_pattern_product` | Title pattern for products | `%product_name% %separator% %site_name%` | Free text with tokens |
| `title_pattern_archive` | Title pattern for term archives | `%term_name% %separator% %site_name%` | Free text with tokens |
| `separator` | Character substituted for `%separator%` | `—` | Up to 3 characters |
| `noindex_search` | Adds `noindex` to internal search results | `1` | `0`, `1` |
| `noindex_attachment` | Adds `noindex` to attachment pages | `1` | `0`, `1` |
| `noindex_paginated` | Adds `noindex` to page 2+ of archives | `1` | `0`, `1` |
| `noindex_date_archive` | Adds `noindex` to date archives | `1` | `0`, `1` |
| `noindex_author_single` | Adds `noindex` to author archives | `0` | `0`, `1` |
| `sitemap_enabled` | Serves `/sitemap.xml` | `1` | `0`, `1` |
| `sitemap_include_posts` | Includes blog posts in sitemap | `1` | `0`, `1` |
| `sitemap_include_pages` | Includes pages in sitemap | `1` | `0`, `1` |
| `sitemap_include_products` | Includes products in sitemap | `1` | `0`, `1` |
| `sitemap_include_categories` | Includes category + tag archives | `1` | `0`, `1` |
| `sitemap_ping_search_engines` | Pings Google + Bing on content change (throttled hourly) | `1` | `0`, `1` |
| `robots_txt_custom` | Overrides Asteris's default robots.txt body | empty | Plain text |
| `breadcrumbs_auto_insert` | Injects breadcrumbs above WooCommerce product + shop pages | `0` | `0`, `1` |
| `breadcrumbs_separator` | Visible breadcrumb separator | `›` | Up to 3 characters |
| `local_business_enabled` | Emits LocalBusiness JSON-LD site-wide (paid) | `0` | `0`, `1` |
| `local_business_type` | Schema.org sub-type (paid) | `LocalBusiness` | LocalBusiness, Store, Restaurant, CafeOrCoffeeShop, BarOrPub, BeautySalon, DaySpa, HealthAndBeautyBusiness, AutoBodyShop, AutoRepair, ProfessionalService, HomeAndConstructionBusiness, FurnitureStore, ClothingStore, JewelryStore, GroceryStore, BookStore |
| `local_business_name` | Business display name (paid) | empty | Text |
| `local_business_phone` | Phone number (paid) | empty | Text |
| `local_business_price_range` | Price band (e.g. `$$`) (paid) | empty | Text |
| `local_business_street` | Street address (paid) | empty | Text |
| `local_business_city` | Suburb / city (paid) | empty | Text |
| `local_business_region` | State or region (paid) | empty | Text |
| `local_business_postcode` | Post code (paid) | empty | Text |
| `local_business_country` | ISO country code (paid) | `AU` | ISO 3166-1 alpha-2 |
| `local_business_lat` | Latitude (paid) | empty | Decimal |
| `local_business_lng` | Longitude (paid) | empty | Decimal |
| `local_business_payment_accepted` | Accepted payment methods (paid) | empty | Text |
| `local_business_hours_{mon-sun}_{open,close}` | Opening hours per day (paid) | empty | `HH:MM` 24-hour |
| `image_filename_rename` | Rewrites generic upload filenames to `{product-slug}.jpg` (paid) | `0` | `0`, `1` |
| `d4s_login` | DataForSEO API login (paid) | empty | Text |
| `d4s_password` | DataForSEO API password (paid) | empty | Text |
| `d4s_location` | DataForSEO location code | `2840` (US) | Integer location code |
| `d4s_language` | DataForSEO language code | `en` | ISO language code |

Per-post / per-term fields stored as meta: `_asteris_seo_title`, `_asteris_seo_description`, `_asteris_seo_canonical`, `_asteris_seo_noindex`, `_asteris_seo_nofollow`, `_asteris_seo_og_image`, `_asteris_seo_sitemap_exclude`, `_asteris_seo_cornerstone`, `_asteris_seo_focus_keyword`.

## Common workflows

### Migrating from Yoast or Rank Math

Activate Asteris SEO while Yoast or Rank Math is still running — Asteris detects `WPSEO_VERSION`, `RANK_MATH_VERSION`, `SEOPRESS_VERSION` or `aioseo()` and suppresses its own frontend output so you do not double-print tags.

1. Configure your title patterns and auto-noindex rules in Asteris.
2. Spot-check 5–10 posts and products. Per-post fields will be empty until you run a migration adapter or manually copy them.
3. Export redirects from the old plugin to CSV.
4. Under **Asteris** → **SEO** → **Redirects**, use **Import CSV** to load them.
5. Deactivate the old SEO plugin. Asteris SEO takes over instantly.

### Setting up the XML sitemap

1. Tick **Enable XML sitemap** under **XML sitemap**.
2. Choose which content types to include (posts, pages, products, categories + tags).
3. Visit `/sitemap.xml` in a browser to confirm it renders.
4. Submit the URL to Google Search Console and Bing Webmaster Tools.
5. Leave **Ping Google + Bing on content change** ticked — pings are throttled to once per hour via the `asteris_seo_sitemap_last_ping` transient.
6. To exclude a specific post or product, open it and tick **Exclude from XML sitemap** in the Asteris SEO metabox.

### Adding 301 redirects after a URL change

1. Open **Asteris** → **SEO** and scroll to the **Redirects** section.
2. Enter the source path (e.g. `/old-product/`) and target URL.
3. Choose the status code: 301 (permanent), 302 (temporary) or 410 (gone).
4. Save. Asteris matches the request before WordPress's 404 handler fires.
5. Review the **404 log** below — any unresolved URL hit during the last 30 days appears with a one-click **Add redirect** button.

### Scoring a page against a focus keyword

1. Open the post or product. In the Asteris SEO metabox, type your target phrase into **Focus keyword**.
2. The **focus keyword scoring** panel below the metabox lights up with traffic-light checks (presence in title, slug, meta description, first paragraph, headings, alt text, internal links).
3. Edit the page until the lights turn green.
4. Tick **Cornerstone content** for your top 5–10 pages. Cornerstone pages get a sitemap priority boost and are favoured as internal-link suggestions.

### Setting up LocalBusiness schema

1. Under **Local SEO / LocalBusiness schema**, tick **Enable**.
2. Fill in business name, type (pick the most specific Schema.org sub-type), phone, address, ISO country code.
3. Add latitude + longitude — Google Knowledge Panel uses these.
4. Enter opening hours in `HH:MM` 24-hour format; leave a day blank to mark it closed.
5. Save. The JSON-LD now appears on every page. Validate it with Google's Rich Results Test.

### Renaming generic product image filenames

1. Tick **Auto-rename product images** under **Image filename rename**.
2. From now on, new uploads named like `IMG_8472.jpg` or `DSC1234.png` are renamed to `{product-slug}.jpg` on upload.
3. Files with 3+ hyphenated words are left alone (already SEO-friendly).
4. Existing media library uploads are not touched — only new ones.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Shortcodes

| Shortcode | Notes |
|---|---|
| `[asteris_breadcrumbs]` | Renders the breadcrumb trail. Also available as the `asteris/breadcrumbs` Gutenberg block. |

Example:

```php
<?php echo do_shortcode( '[asteris_breadcrumbs]' ); ?>
```

## Troubleshooting

### Asteris SEO output is missing from `<head>`

A conflicting SEO plugin is active. Asteris detects Yoast (`WPSEO_VERSION`), Rank Math (`RANK_MATH_VERSION`), SEOPress (`SEOPRESS_VERSION`) and AIOSEO (`aioseo()`) and suppresses its frontend so you do not get duplicate tags. A banner appears at the top of the settings page. Deactivate the other plugin to switch over — your saved Asteris fields take effect immediately.

### `/sitemap.xml` returns a 404

Asteris adds a rewrite rule on activation and on settings save. If the URL still 404s, visit **Settings** → **Permalinks** in WP-admin and click **Save Changes** to flush rewrite rules. Confirm **Enable XML sitemap** is ticked. If a physical `sitemap.xml` file exists in your site root, it wins — delete or rename it.

### `robots.txt` changes are not appearing

A physical `robots.txt` file in your site root always wins over WordPress's virtual one. Delete the physical file (check via FTP) and the `robots_txt_custom` setting will take effect. Asteris always appends the `Sitemap:` line regardless of custom content.

### Redirect rule is not firing

Check the source path matches exactly — leading slash, trailing slash, query string. Asteris matches against `$_SERVER['REQUEST_URI']` before WordPress resolves the request. Server-level rules in `.htaccess` or your hosting panel run before WordPress and can mask redirects. Also confirm you are not logged in as an admin viewing a draft of the source URL.

### DataForSEO panel shows "Invalid credentials"

The `d4s_login` and `d4s_password` settings are your DataForSEO API credentials, not your DataForSEO account email/password. Generate API credentials in your DataForSEO dashboard. Click **Test connection** on the settings page — this fires `asteris_d4s_test` and returns the exact API response. If your IP is firewalled by DataForSEO, requests will time out rather than return invalid-credentials.

### Schema validates but Google Knowledge Panel never appears

LocalBusiness JSON-LD alone does not trigger a Knowledge Panel. You also need a verified Google Business Profile with matching name, address, phone (NAP) and a Google Maps presence. Schema gives Google a structured copy of the same data — it is necessary, not sufficient.

## Known plugin conflicts

- **Yoast SEO / Yoast SEO Premium** — Asteris auto-suppresses its frontend output while Yoast is active. Settings still save.
- **Rank Math / Rank Math Pro** — same auto-suppression.
- **SEOPress / SEOPress Pro** — same auto-suppression.
- **All in One SEO (AIOSEO)** — same auto-suppression.
- **The SEO Framework** — not auto-detected. Manually deactivate before going live with Asteris SEO to avoid duplicate `<title>` / meta description tags.
- **Caching plugins (WP Rocket, W3 Total Cache, LiteSpeed Cache)** — after changing title patterns or noindex rules, flush the page cache; old output may otherwise persist.
- **Server-level redirects (`.htaccess`, Nginx rewrites, Cloudflare Page Rules)** — run before WordPress and can mask Asteris redirects. If a redirect does not fire, check server config first.

If you encounter a specific conflict not listed here, report it via the support channel for your tier.

## What is in Free vs Paid

Asteris Free includes a **lite** version of this module:

- **Free** — meta title + description editor on posts / pages / products, basic XML sitemap.
- **Paid only** — schema markup (Product, Article, FAQ, HowTo, Breadcrumb, LocalBusiness), Open Graph + Twitter cards, redirects + 404 log, breadcrumbs (shortcode + block + auto-insert), focus-keyword scoring, internal-linking suggestions, image filename rename, DataForSEO keyword research, migration adapters for Yoast / Rank Math / SEOPress, cornerstone content, sitemap exclude per item, custom `robots.txt`.

Full SEO module is available in Starter, Pro, Agency and Founder tiers.

## Related

- [Migrating from Yoast SEO](/migrate/from-yoast)
- [Migrating from Rank Math](/migrate/from-rank-math)
- [AI Suite module](/docs/modules/ai-suite) — writes meta titles + descriptions into Asteris SEO fields
- [Pricing tiers](/pricing/)

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
