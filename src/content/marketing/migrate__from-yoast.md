---
url: /migrate/from-yoast
title: "Switching from Yoast to Asteris Affiliates"
meta_description: "Yoast SEO Premium is $129/yr. Asteris Affiliates Starter is $149/yr and covers SEO plus 18 more modules. Here's how to switch without losing your SEO data."
og_title: "Switch from Yoast to Asteris Affiliates"
og_description: "Yoast is $129/yr for SEO only. Asteris Affiliates is $149/yr for SEO plus 18 modules. Migration tool preserves your meta data."
canonical: https://asterisaffiliates.com/migrate/from-yoast
primary_keyword: yoast seo pricing
primary_keyword_us_vol: 260
primary_keyword_kd: 27
secondary_keywords:
  - is yoast worth it
  - yoast seo cost
  - yoast seo price
  - switch from yoast woocommerce
schema_type: Article + FAQPage + HowTo
internal_links_out:
  - /yoast-vs-asteris
  - /docs/migrations/from-yoast
  - /modules
  - /pricing
  - /support
  - /yoast-seo-pricing-guide
verified_date: 2026-06-01
next_verification: 2026-09-01
ai_overview_optimised: true
---

# Migrate from Yoast SEO

A walkthrough for moving from Yoast SEO (Free + Premium) to the Asteris **SEO** module. Asteris ships a built-in adapter (`Yoast_SEO_Adapter`) that reads Yoast's per-post and per-term meta directly from the database and rewrites it under Asteris's own meta keys. Non-destructive — Yoast's data is left in place until you remove it manually.

## TL;DR

- The adapter imports per-post and per-term SEO meta (title, description, canonical, robots flags, OG image, focus keyword, cornerstone). Redirects and Yoast settings are **not** auto-imported.
- Typical migration time on a store with under 1,000 products: 20-45 minutes including verification.
- Asteris's SEO module will auto-disable itself if Yoast is still active, so you can run both side-by-side until you cut over.
- Migrations are idempotent (safe to re-run) and never overwrite an existing Asteris value.
- Fully reversible: deactivate Asteris SEO, reactivate Yoast — Yoast's original meta is untouched.

## Before you start

1. Take a full database backup. Use UpdraftPlus, WP Engine snapshots, or a manual `wp db export` — whichever you trust.
2. Run the migration on a staging copy first if you have one. Push to production after verifying.
3. Confirm requirements: WordPress 6.4+, PHP 8.1+, WooCommerce 8.5+.
4. Note your current Yoast versions (Free + Premium) and any add-ons in use (WooCommerce SEO, News, Video, Local). The adapter handles the core fields only — add-on-specific fields are listed below as not-imported.
5. Deactivate aggressive object-cache and page-cache plugins (or at least flush them) for the import window. Stale cached meta will mislead your verification step.
6. Export your Yoast Premium redirect list from **SEO → Redirects → Import and Export → Export redirects** as CSV. You will re-import this into Asteris manually (or via the separate Redirection adapter if you used the Redirection plugin instead).
7. Note the current XML sitemap URL Yoast is serving (`/sitemap_index.xml`) and submit-status in Google Search Console — you will compare after.

## What gets imported

Field-by-field, drawn from the `Yoast_SEO_Adapter` source.

### Per post / page / product (`wp_postmeta`)

| From Yoast SEO | To Asteris | Status |
|---|---|---|
| `_yoast_wpseo_title` | `_asteris_seo_title` | auto |
| `_yoast_wpseo_metadesc` | `_asteris_seo_description` | auto |
| `_yoast_wpseo_canonical` | `_asteris_seo_canonical` | auto |
| `_yoast_wpseo_meta-robots-noindex` (value `1`) | `_asteris_seo_noindex` | auto |
| `_yoast_wpseo_meta-robots-nofollow` (value `1`) | `_asteris_seo_nofollow` | auto |
| `_yoast_wpseo_focuskw` | `_asteris_seo_focus_keyword` | auto |
| `_yoast_wpseo_opengraph-image` | `_asteris_seo_og_image` | auto |
| `_yoast_wpseo_is_cornerstone` (value `1`) | `_asteris_seo_cornerstone` | auto |

### Per category / tag / product_cat / product_tag (`wp_termmeta`)

| From Yoast SEO | To Asteris | Status |
|---|---|---|
| `wpseo_title` | `_asteris_seo_title` | auto |
| `wpseo_desc` | `_asteris_seo_description` | auto |
| `wpseo_canonical` | `_asteris_seo_canonical` | auto |
| `wpseo_focuskw` | `_asteris_seo_focus_keyword` | auto |
| `wpseo_noindex` (value `noindex` or `1`) | `_asteris_seo_noindex` | auto |

### Settings and global config

| From Yoast SEO | To Asteris | Status |
|---|---|---|
| `wpseo` option (general settings) | — | manual (reconfigure in Asteris) |
| `wpseo_titles` option (title/description templates) | Asteris title patterns | manual (Asteris uses different placeholders) |
| `wpseo_social` option (Twitter/Facebook defaults) | Asteris social settings | manual |
| `wpseo_premium_redirects` option | Asteris Redirects table | manual (CSV re-import) |
| `wpseo_indexable` custom table | — | not migrated (Asteris reads meta live, no index table needed) |

### Behaviour notes from the adapter

- The migration runs in two passes: all posts first, then all terms. Batch size is set by the runner; offset tracking spans both passes.
- A per-post `_asteris_migrated_yoast_seo` flag is written so re-running the migration skips already-processed items.
- If an Asteris meta key already has a non-empty value, the Yoast value is **not written** — Asteris never overwrites a user's existing entry.
- Detection is dual: the adapter triggers if `WPSEO_VERSION` is defined OR if any `_yoast_wpseo_title` row exists. You can run the migration even after deactivating Yoast — the data in the DB is enough.

## What does NOT get imported

- **Yoast Premium redirects (`wpseo_premium_redirects` option)** — regex and complex 410-gone rules don't map cleanly. Export from Yoast as CSV and re-import into Asteris **SEO → Redirects → Import CSV**. Plain old 301s import fine; regex rules need to be rewritten using Asteris's regex format (PCRE, same engine, but escape rules differ slightly).
- **Title and description template patterns (`wpseo_titles` option)** — Yoast uses `%%title%%`, Asteris uses `%post_title%`. The placeholders don't match. Configure your defaults in **Asteris → SEO → General**.
- **Social defaults (`wpseo_social` option)** — Facebook/Twitter account handles, default OG image. Reconfigure under **Asteris → SEO → Social**.
- **Yoast indexable table (`wpseo_indexable`)** — Asteris doesn't use a separate indexable table; it reads post/term meta live. The table will sit unused after migration (drop it manually if you want to reclaim space — see Rollback).
- **Internal-linking suggestions and orphaned-content reports** — Yoast Premium feature. Asteris has internal-linking helpers but not the same orphaned-content surface.
- **Multiple focus keywords per post (Premium)** — Asteris stores one focus keyword per page. The first Yoast focus keyword (`_yoast_wpseo_focuskw`) is migrated; additional `_yoast_wpseo_focuskeywords` entries are dropped.
- **Yoast SEO premium content analysis history** — readability scores, keyphrase distribution snapshots. Not stored in Asteris.
- **WooCommerce SEO add-on per-attribute settings** — global identifier mappings (GTIN, MPN, brand attribute). Reconfigure under **Asteris → SEO → Product Schema**.
- **Video, News, Local SEO add-on metadata** — out of scope. Local Business config in Asteris uses its own option group; rebuild under **Asteris → SEO → Local Business**.
- **Yoast breadcrumb HTML/shortcode locations** — Asteris emits breadcrumbs through its own filter or shortcode (`[asteris_breadcrumbs]`). Replace any theme template calls that use `yoast_breadcrumb()`.

## Step-by-step

1. **Install Asteris Affiliates.** Upload the plugin ZIP via **Plugins → Add New → Upload**, activate it, and run the licence activation if you're on a paid tier.
2. **Enable the SEO module.** Go to **Asteris → Modules** and toggle **SEO** on. While Yoast is still active, Asteris SEO will detect the conflict and self-suspend its front-end output — this is expected and lets you run the import without dual-rendering meta tags.
3. **Open the Migration panel.** Navigate to **Asteris → Migrate**. The page auto-detects Yoast and lists it under "Available migrations" with a row count: "Found Yoast SEO data on N posts/pages/products + M categories/tags."
4. **Scan and preview.** Click **Scan**. The panel shows a sample of three post titles found in the source data. Confirm the numbers match your expectations (rough check: number of products + posts with SEO data filled in).
5. **Run the migration.** Click **Migrate Yoast SEO → Asteris**. The runner processes in batches via AJAX. Watch the progress bar; on a 5,000-row store it will take 1-3 minutes. Errors per-row (if any) are logged inline and don't halt the batch.
6. **Re-import redirects (if you used Yoast Premium).** Go to **SEO → Redirects → Import and Export** in Yoast, export to CSV. Then in Asteris, **SEO → Redirects → Import CSV**. Map the columns (source, target, type). Regex rules need a manual review.
7. **Reconfigure global settings.** Open **Asteris → SEO → General** and set: title separator, default title patterns per post type, social handles, default OG image. Use your old Yoast settings as a reference.
8. **Configure schema and local business** under **Asteris → SEO → Schema** and **Local Business** if you used Yoast Local SEO.
9. **Disable Yoast's front-end output, keep it installed temporarily.** In **SEO → Search Appearance** turn off Yoast's sitemap. This avoids two sitemaps competing while you verify.
10. **Verify** (see next section). Spot-check 5-10 random URLs.
11. **Deactivate Yoast.** Once verification passes, deactivate Yoast SEO and Yoast SEO Premium from **Plugins**. Don't delete yet — keep the data on disk for one week as insurance.
12. **Delete Yoast** after a 7-day clean run. Removing the plugin does not remove the meta rows in `wp_postmeta` — those stay in the database. Drop the `wpseo_indexable` table manually if you want to reclaim space (see Rollback for the SQL).

## Verifying the migration

1. **Spot-check 5-10 random posts/products.** Open each in the editor. Confirm the Asteris SEO metabox shows the same title, meta description, canonical, focus keyword and OG image as Yoast's metabox did before. Cornerstone and noindex flags carry across.
2. **View page source on the live front-end.** Look for one `<title>`, one `<meta name="description">`, one `<link rel="canonical">`. Confirm they're being rendered by Asteris (Asteris emits a `<!-- Asteris SEO -->` comment block; Yoast emits `<!-- This site is optimized with the Yoast SEO plugin -->`). Two sets of meta tags means Yoast is still rendering — disable it.
3. **Compare XML sitemaps.** Fetch `/sitemap.xml` from Asteris and `/sitemap_index.xml` from Yoast (before deactivating). URL counts should match; any large divergence points to a post-type or taxonomy exclusion difference.
4. **Test 2-3 redirects.** If you imported Premium redirects, pick a known 301, hit it with `curl -I` and confirm the `Location:` header and `301` status. Test at least one regex rule if you had any.
5. **Run a schema validator.** Paste a product URL into Schema.org's validator or Google's Rich Results Test. Confirm `Product`, `Offer`, `BreadcrumbList` and (if configured) `LocalBusiness` are all valid and coming from Asteris.

## Rollback

Asteris's migration is non-destructive — every Yoast meta row is still in `wp_postmeta` and `wp_termmeta` after the import. Reverting is mechanical.

1. In **Asteris → Modules**, toggle **SEO** off.
2. Reactivate Yoast SEO (and Premium if used) from **Plugins**.
3. Re-enable Yoast's sitemap and search-appearance output in **SEO → Search Appearance**.
4. (Optional) Remove the Asteris-only meta rows added during the migration. They're harmless if left, but if you want a clean state:
   ```sql
   DELETE FROM wp_postmeta WHERE meta_key LIKE '_asteris_seo_%';
   DELETE FROM wp_postmeta WHERE meta_key = '_asteris_migrated_yoast_seo';
   DELETE FROM wp_termmeta WHERE meta_key LIKE '_asteris_seo_%';
   DELETE FROM wp_termmeta WHERE meta_key = '_asteris_migrated_yoast_seo';
   ```
   Back up first. Run on staging first.
5. If you also want to drop the unused Yoast indexable table after a successful (non-rollback) migration:
   ```sql
   DROP TABLE wp_yoast_indexable;
   DROP TABLE wp_yoast_indexable_hierarchy;
   DROP TABLE wp_yoast_migrations;
   DROP TABLE wp_yoast_seo_links;
   DROP TABLE wp_yoast_primary_term;
   ```
   Only run this after you're fully off Yoast.

## Edge cases and troubleshooting

### Regex redirects don't behave the same after re-import
Yoast Premium and Asteris both use PCRE, but Yoast wraps patterns in its own delimiters and applies them slightly earlier in the request lifecycle. After import, hit each regex redirect with `curl -I` and confirm the `Location:` matches what you expected. If a rule fires too greedily, anchor it (`^/old-path/(.*)$`) instead of leaving it open.

### Two sets of `<title>` and `<meta description>` tags in page source
Yoast is still rendering. Causes: SEO module wasn't toggled on, Yoast wasn't deactivated, or a page-cache plugin is serving a pre-migration HTML snapshot. Flush all caches (object cache, page cache, CDN), then re-view source. If duplicates persist, check that **Asteris → Modules → SEO** is on and `WPSEO_VERSION` is no longer defined (`wp eval 'echo defined("WPSEO_VERSION") ? "yes" : "no";'`).

### Cornerstone flags didn't carry across for some posts
The adapter only migrates `_yoast_wpseo_is_cornerstone` when the stored value equals the string `1`. Older Yoast versions occasionally stored `on` or `true`. Run this to normalise before re-running the migration:
```sql
UPDATE wp_postmeta SET meta_value = '1'
  WHERE meta_key = '_yoast_wpseo_is_cornerstone'
  AND meta_value IN ('on', 'true', 'yes');
```
Then re-run the migration — the idempotency flag means already-migrated posts will be skipped, but the cornerstone field will still be checked for posts where the previous run found no value to write.

### Migration says "0 rows found" but Yoast clearly has data
Either Yoast is using a non-default table prefix (the adapter uses `$wpdb->postmeta` so this should not happen on a standard install), or all your Yoast meta rows have empty values (the adapter filters `meta_value != ''`). Run `SELECT COUNT(*) FROM wp_postmeta WHERE meta_key LIKE '_yoast_wpseo_%' AND meta_value != '';` to confirm.

### Focus keyword field shows in Asteris but scoring is empty
Asteris's focus-keyword scoring is computed live — it doesn't import Yoast's stored readability/keyphrase scores. Save any post once after the migration to trigger a fresh score, or run a bulk re-save through WP-CLI: `wp post list --post_type=product --field=ID | xargs -I {} wp post update {}`.

## After the migration

1. **Re-submit your sitemap** in Google Search Console. The path changes from `/sitemap_index.xml` (Yoast) to `/sitemap.xml` (Asteris). Submit the new URL and request indexing.
2. **Set up a 7-day GSC check-in.** Calendar reminder to compare impressions, clicks, average position against the prior week. Small fluctuations are normal; a sustained drop on a specific page type points to a misconfigured title pattern.
3. **Review Asteris's title patterns** under **SEO → General** after a week of data. If a post type is rendering longer or shorter titles than before, adjust the pattern — don't manually retitle 500 products.
4. **Archive or delete Yoast.** After 7 days of clean data, deactivate and delete Yoast SEO + Premium. Drop the `wp_yoast_*` tables (SQL in Rollback section) to reclaim database space.
5. **Cancel the Yoast Premium subscription** — it auto-renews. Do this from your account at yoast.com once you're confident you're not going back.

## Related

- [Yoast vs Asteris feature comparison](/yoast-vs-asteris)
- [Pricing](/pricing)
- [Free plugin (Asteris Free)](/free)
- [Getting started](/docs/getting-started)
- [Migration hub](/migrate)
- [Plugin conflicts](/docs/conflicts)
- [Support](/support)
