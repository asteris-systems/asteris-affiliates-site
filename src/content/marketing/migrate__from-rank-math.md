---
url: /migrate/from-rank-math
title: "Switching from Rank Math to Asteris Affiliates"
meta_description: "Rank Math PRO is $59/yr. Asteris Affiliates Starter is $149/yr for SEO plus 18 modules. Here's the honest trade-off and how migration works."
og_title: "Switch from Rank Math to Asteris Affiliates"
og_description: "Rank Math PRO is $59/yr for SEO. Asteris Affiliates is $149/yr for SEO plus 18 modules. Migration preserves your meta data."
canonical: https://asterisaffiliates.com/migrate/from-rank-math
primary_keyword: rank math pricing
primary_keyword_us_vol: 140
primary_keyword_kd: 42
secondary_keywords:
  - rank math alternative for woocommerce
  - switch from rank math
schema_type: Article + FAQPage
internal_links_out:
  - /yoast-vs-asteris
  - /docs/migrations/from-rank-math
  - /modules
  - /pricing
  - /support
verified_date: 2026-06-01
ai_overview_optimised: true
---

# Migrate from Rank Math

## TL;DR

- Asteris ships a built-in Rank Math adapter (`Rank_Math_Adapter.php`) that copies per-post and per-term SEO meta into Asteris SEO meta keys. Runs in batches, idempotent, non-destructive.
- Imported: `rank_math_title`, `rank_math_description`, `rank_math_canonical_url`, `rank_math_focus_keyword`, `rank_math_facebook_image`, `rank_math_robots` (noindex/nofollow flags), and `rank_math_pillar_content` (cornerstone flag).
- Not imported: redirects (`rank_math_redirections` table), 404 logs, schema-builder customisations, twitter image, SEO score, global Titles/Sitemap option groups, and any Rank Math PRO-only modules (rank tracker, news/video sitemap, analytics).
- Typical run time: under 60 seconds for a site with ~5,000 posts/products. Both plugins can run alongside each other during the import — Asteris will not overwrite existing Asteris meta if it already has a value.
- Reversible: source data is left intact. To roll back, reactivate Rank Math and disable the Asteris SEO module.

---

## Before you start

1. Take a full database backup. Migration only writes to `wp_postmeta` and `wp_termmeta`, but a backup is non-negotiable.
2. Stage the migration on a clone if you can. If not, schedule it during a low-traffic window.
3. Confirm requirements: WordPress 6.4+, PHP 8.1+, WooCommerce 8.0+, Asteris Affiliates 1.0+ with a valid licence on Starter, Pro, Agency, or Lifetime.
4. Note your Rank Math version and which Rank Math PRO modules you have active (Local SEO, Image SEO, Redirections, 404 Monitor, Schema, Analytics). You will need this list to know what manual work remains after migration.
5. Deactivate aggressive object caches (Redis page cache, full-page caches) for the import window. Meta-key writes can otherwise appear stale in admin until cache flush.
6. Export your Rank Math redirects from `WP Admin → Rank Math → Redirections → Import & Export` as a CSV. The adapter does not move these — you will manually re-import into the Asteris Redirects sub-module.
7. Make sure no other SEO plugin is active beyond Rank Math. Yoast + Rank Math + Asteris together will cause duplicate meta tags in `<head>`.

---

## What gets imported

The Rank Math adapter (`src/Migration/Adapters/Rank_Math_Adapter.php`) maps the following:

| From Rank Math (Free + Pro) | To Asteris | Status |
|---|---|---|
| `rank_math_title` (post + term) | `_asteris_seo_title` | auto |
| `rank_math_description` (post + term) | `_asteris_seo_description` | auto |
| `rank_math_canonical_url` (post + term) | `_asteris_seo_canonical` | auto |
| `rank_math_focus_keyword` (post + term) | `_asteris_seo_focus_keyword` | auto |
| `rank_math_facebook_image` (post only) | `_asteris_seo_og_image` | auto |
| `rank_math_robots` contains `noindex` | `_asteris_seo_noindex` = `1` | auto |
| `rank_math_robots` contains `nofollow` | `_asteris_seo_nofollow` = `1` | auto |
| `rank_math_pillar_content` = `1` | `_asteris_seo_cornerstone` = `1` | auto (posts only) |
| `rank_math_twitter_image` | — | not migrated (Asteris uses og:image for both) |
| `rank_math_seo_score` | — | not migrated (Asteris re-scores via Keyword_Score) |
| `rank_math_redirections` table | Asteris Redirects table | manual (CSV re-import) |
| `rank_math_404_logs` table | — | not migrated |
| `rank-math-options-titles` (global title/desc templates) | Asteris SEO settings | manual |
| `rank-math-options-sitemap` (sitemap config) | Asteris Sitemap settings | manual |
| `rank-math-options-general` (htaccess edits, breadcrumb config) | Asteris settings | manual |
| Local SEO knowledge graph / business hours | Asteris Local SEO | manual |
| Schema builder custom schemas | — | not migrated |
| Rank Math Analytics / rank tracker data | — | not migrated |

The adapter is idempotent: if an Asteris meta key already has a value, the existing value wins. Each post/term gets a migration flag so re-runs skip already-processed rows.

---

## What does NOT get imported

- **Redirects (`rank_math_redirections` table)** — different table shape and regex flavour. Export Rank Math's CSV, import via Asteris Redirects.
- **404 logs (`rank_math_404_logs`)** — historical noise. Asteris does not ship a 404 monitor in v1.0; if you need one, leave Rank Math active in monitor-only mode or use a dedicated tool.
- **Schema builder custom schemas** — Asteris renders product, breadcrumb, organisation, and article schema natively. Rank Math's custom JSON-LD blocks do not have a direct equivalent.
- **Twitter image (`rank_math_facebook_image` is migrated, twitter is not)** — Asteris uses one `og:image` that Twitter respects via `twitter:card = summary_large_image`.
- **SEO score (`rank_math_seo_score`)** — Asteris computes its own focus-keyword score via `Modules/SEO/Keyword_Score.php`. The numeric score will differ.
- **Rank Math PRO rank tracker** — no equivalent in Asteris. Use Google Search Console or a dedicated rank-tracking SaaS.
- **News sitemap, video sitemap, KML sitemap** — Asteris ships a standard XML sitemap only.
- **Global Titles & Meta templates** (`%title% %sep% %sitename%` etc.) — Asteris uses its own template tokens. Reconfigure under `WP Admin → Asteris → SEO → Titles`.
- **htaccess edits made via Rank Math** — Rank Math writes its own `.htaccess` block. Inspect and remove manually if you deactivate Rank Math.
- **Content AI usage history** — Rank Math PRO Content AI is account-bound to Rank Math servers.

---

## Step-by-step

1. **Install Asteris Affiliates.** Upload via `WP Admin → Plugins → Add New → Upload Plugin`, then activate.
2. **Activate your licence.** Go to `WP Admin → Asteris → Licence`, paste the key from your Lemon Squeezy order, click Activate.
3. **Enable the SEO module.** `WP Admin → Asteris → Modules`, toggle SEO on. Leave Rank Math active for now.
4. **Open the migration screen.** `WP Admin → Asteris → Tools → Migrations`. The screen lists detected source plugins. Rank Math should appear with a row showing post and term counts.
5. **Run the scan.** Click Scan on the Rank Math row. You will see a summary like "Found Rank Math data on 1,243 posts/pages/products + 87 categories/tags." and a 3-item preview.
6. **Start the migration.** Click Migrate. The adapter processes in batches (default 50 rows per tick) via AJAX. Do not close the tab. A progress bar shows done/total.
7. **Wait for completion.** When the progress bar reaches 100%, you will see a success notice and any per-row errors (rare — usually orphaned meta).
8. **Export Rank Math redirects.** `WP Admin → Rank Math → Redirections → Import & Export → Export CSV`. Save the file locally.
9. **Import redirects into Asteris.** `WP Admin → Asteris → SEO → Redirects → Import`. Pick the CSV. Confirm column mapping (source URL, target URL, type).
10. **Reconfigure global settings.** Walk through `WP Admin → Asteris → SEO → Titles`, `Sitemap`, `Local SEO`, and `Breadcrumbs`. Mirror your Rank Math global templates.
11. **Verify in `<head>` source.** Load 3-5 representative URLs (product, category, post, page, shop). View page source. Confirm `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:image`, and product schema are present and correct.
12. **Deactivate Rank Math.** Once verification passes, deactivate Rank Math via `WP Admin → Plugins`. Do not delete it yet — keep it as a fallback for one to two weeks.

---

## Verifying the migration

1. **Spot-check 5-10 random posts/products.** Open each in the editor. Confirm the Asteris SEO meta box shows the correct title, description, canonical, focus keyword, OG image. Compare to the Rank Math meta box (still visible while Rank Math is active).
2. **View-source on the rendered front-end.** Pick a product, a category, a blog post, and the homepage. Confirm only one `<title>`, one `<meta name="description">`, one `<link rel="canonical">`, and that they match Asteris values. If both Rank Math and Asteris are emitting tags, you will see duplicates — deactivate Rank Math.
3. **Sitemap diff.** Fetch `/sitemap_index.xml` from both plugins (Rank Math at `/sitemap_index.xml` while active, then Asteris at the same path after deactivation). URL count should match within a small margin. Investigate any drop.
4. **Redirect test.** Hit 2-3 known redirects from the Rank Math export. Confirm they 301 to the correct target through Asteris.
5. **Schema test.** Run a product URL through Google's Rich Results Test. Confirm Product, Offer, and BreadcrumbList schemas are valid and contain expected values (price, SKU, availability).

---

## Rollback

Asteris migrations are non-destructive — Rank Math's meta keys are never deleted or modified. To roll back:

1. Reactivate Rank Math via `WP Admin → Plugins`.
2. Disable the Asteris SEO module: `WP Admin → Asteris → Modules`, toggle SEO off.
3. (Optional) Delete the Asteris SEO meta keys to clean up. Run via WP-CLI: `wp db query "DELETE FROM wp_postmeta WHERE meta_key LIKE '_asteris_seo_%'"` and the equivalent for `wp_termmeta`. This is optional — leaving them costs nothing.
4. Remove the per-row migration flags if you want to re-run the migration later: `wp db query "DELETE FROM wp_postmeta WHERE meta_key = '_asteris_migrated_rank_math'"`.
5. Clear all caches.

Rank Math will resume emitting head tags as soon as it is reactivated and Asteris SEO is disabled.

---

## Edge cases and troubleshooting

### Both plugins emit duplicate `<head>` tags

If Asteris SEO is on and Rank Math is still active, both will write `<title>`, `og:image`, canonical, and schema. Deactivate Rank Math once verification passes. Asteris does not actively suppress competitor output — that is by design so you can run side-by-side during the verification window.

### Redirects with regex patterns

The Rank Math redirects CSV exports regex patterns in its own flavour. Asteris Redirects supports literal source URLs and a documented regex syntax — they are not 100% compatible. Review each regex row in the CSV before import. Plain-string redirects move cleanly.

### `rank_math_robots` is not an array

On a small number of older installs the `rank_math_robots` meta is stored as a comma-separated string instead of a serialised array. The adapter checks `is_array()` and skips non-array values. If your `noindex`/`nofollow` flags did not carry over, check via WP-CLI: `wp post meta get <id> rank_math_robots`. If it is a string, set the Asteris flag manually or re-save the post in Rank Math first to force re-serialisation.

### Term meta count looks low

The adapter only counts terms that have at least one non-empty `rank_math_*` meta value. Categories or tags where Rank Math left defaults will not appear in the count and do not need migration — Asteris will fall back to its own defaults.

### Migration stalls on a large site

The default batch is 50 rows per AJAX tick. On a site with 100k+ posts this can take several minutes. If the tab is closed mid-run, re-open the migration page and click Migrate again — the per-row flag means already-processed rows are skipped.

---

## After the migration

1. **Resubmit your sitemap** to Google Search Console. The sitemap URL is the same (`/sitemap_index.xml`), but resubmit to force a re-crawl.
2. **Request indexing** for 5-10 high-value URLs via Search Console's URL Inspection tool.
3. **Schedule a 7-day check-in.** Open Search Console > Performance and Coverage. Watch for impression drops, "Discovered - not indexed" jumps, or schema errors.
4. **Delete Rank Math** once you have two weeks of clean Search Console data. Delete via `WP Admin → Plugins → Delete`. WordPress will offer to remove its data — choose yes unless you might need the redirect CSV later.
5. **Run the Asteris keyword-score pass** on your top 50 posts/products via `WP Admin → Asteris → SEO → Keyword Score` to rebuild the score data Rank Math used to provide.

---

## Related

- [Pricing](/pricing)
- [Free vs paid breakdown](/docs/free-vs-paid)
- [SEO module documentation](/docs/modules/seo)
- [Getting started](/docs/getting-started)
- [Yoast vs Asteris (comparison)](/yoast-vs-asteris)
- [All migration guides](/migrate)
