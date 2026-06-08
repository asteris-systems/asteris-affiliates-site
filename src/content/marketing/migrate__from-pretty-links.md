---
url: /migrate/from-pretty-links
title: "Switching from Pretty Links to Asteris Affiliates"
meta_description: "Pretty Links Premium is $99/yr. Asteris Affiliates includes the Asteris Links module (link shortener + affiliate tracker) plus 18 more modules for $149/yr."
og_title: "Switch from Pretty Links to Asteris Affiliates"
og_description: "Pretty Links is $99/yr for link management only. Asteris Affiliates includes link management plus 18 modules for $149/yr."
canonical: https://asterisaffiliates.com/migrate/from-pretty-links
primary_keyword: pretty links alternative
primary_keyword_us_vol: 720
primary_keyword_kd: 15
secondary_keywords:
  - pretty links woocommerce alternative
  - link shortener woocommerce
  - thirstyaffiliates alternative
schema_type: Article + FAQPage
internal_links_out:
  - /docs/migrations/from-pretty-links
  - /modules
  - /pricing
verified_date: 2026-06-01
ai_overview_optimised: true
---

# Migrate from Pretty Links

This guide moves your cloaked links and redirects from Pretty Links (free + Pro) into the **Asteris Links** module. There is no one-click adapter for Pretty Links yet, so the migration runs through a CSV export-then-import. The walkthrough below is the exact path we use on production stores.

---

## TL;DR

- Asteris Links has a built-in CSV importer. You export your Pretty Links to CSV (one SQL query), reshape the columns, then upload at **WooCommerce → Asteris → Links → Bulk CSV import**.
- What carries across: slug, destination URL, redirect type (301/302/307), `nofollow`, `sponsored`, link title. Cleanly, in one pass.
- What does **not** carry across: historic click logs (per-visit IP/UA/referer rows), `pretty-link-category` taxonomy terms, Pro-only features (rotations, A/B splits, geo-targeting, keyword auto-replace, link health checks).
- Time: 15–45 minutes for under 500 links. Multi-thousand-link sites should stage first.
- Reversible: yes. Asteris writes to its own custom post type (`asteris_link`) and never touches the Pretty Links data. Reactivate Pretty Links, deactivate the Asteris Links module, done.

---

## Before you start

1. Take a full database backup. UpdraftPlus, BackWPup, or your host's snapshot tool — anything that captures `wp_posts`, `wp_postmeta` and `wp_options` before the import runs.
2. Stage the migration if you can. Clone to a staging site, run the import there, eyeball 5–10 redirects, then repeat on production.
3. Confirm requirements: WordPress 6.4+, PHP 8.1+, WooCommerce 8.0+, Asteris Affiliates installed and licensed. The Links module ships in both Free and Paid.
4. Note your current Pretty Links version and whether you run the Pro add-on. The free plugin uses the `pretty-link` CPT and `prli_clicks` table; Pro layers on rotations, splits, keyword replacement and reporting. Pro-only data does **not** migrate (see below).
5. Note your current Pretty Links default slug structure (option `prli_options`, key `default-redirect` / slug structure). Asteris Links uses a configurable URL prefix (default `go`), so `/yourdomain.com/pretty/x` becomes `/yourdomain.com/go/x` unless you change the prefix.
6. Deactivate aggressive page caches (WP Rocket, LiteSpeed, Cloudflare APO) for the import window. Stale rewrite rules cause 404s on freshly-imported slugs.
7. Inventory anything outside Pretty Links that calls a `/pretty/...` URL — sidebar widgets, hard-coded HTML, email footers. The old URLs keep working until you turn off Pretty Links, but you will want a redirect plan.

---

## What gets imported

| From Pretty Links (free + Pro) | To Asteris Links | Status |
|---|---|---|
| `pretty-link` CPT — `post_title` | `asteris_link` CPT — `post_title` | auto (CSV) |
| `pretty-link` CPT — `post_name` (slug) | `asteris_link` CPT — `post_name` | auto (CSV) |
| `_prli_url` (destination URL) | `_asteris_link_destination` | auto (CSV) |
| `_prli_redirect_type` (301/302/307) | `_asteris_link_redirect_type` | auto (CSV) |
| `_prli_nofollow` (0/1) | `_asteris_link_nofollow` | auto (CSV) |
| `_prli_sponsored` (0/1) | `_asteris_link_sponsored` | auto (CSV) |
| `_prli_track_me` (per-link tracking on/off) | Global setting `fire_analytics` | manual (no per-link override) |
| `prli_clicks` table — aggregate count | `_asteris_link_hits` | manual (one-time SQL `COUNT(*)` per link) |
| `prli_clicks` table — per-visit rows (IP, UA, referer, timestamp) | — | not migrated |
| `pretty-link-category` terms | `asteris_link_cat` terms | manual (recreate + reassign) |
| `_prli_param_struct` (UTM passthrough patterns) | — | not migrated (rebuild in destination URL) |
| Pro: rotations (one slug → multiple destinations) | — | not migrated |
| Pro: A/B / split tests | — | not migrated |
| Pro: geo-targeting | — | not migrated |
| Pro: keyword replacement (auto-link in post content) | — | not migrated |
| Pro: link health / 404 checker | — | not migrated |
| Pro: per-link expiry | — | not migrated |
| `prli_options` — default slug prefix | `url_prefix` option | manual (set once) |
| `prli_options` — default redirect type | `default_redirect` option | manual (set once) |
| `prli_options` — tracking pixel | — | not migrated |

---

## What does NOT get imported

- **Historic per-click rows.** The `prli_clicks` table holds one row per click with IP/UA/referer/timestamp. Asteris Links tracks an aggregate counter (`_asteris_link_hits`) and a last-hit timestamp, not a row-per-click log. If you need that fidelity going forward, run GA4 with the Asteris Analytics module — every redirect fires an `affiliate_click` event with link ID, title, and destination.
- **`pretty-link-category` terms.** The CSV importer doesn't take a category column. Recreate categories manually after the import.
- **Rotations.** Pretty Links Pro can rotate one slug across multiple destinations. Asteris Links is one slug → one destination. No equivalent.
- **A/B / split tests.** Same reason as rotations. If you depend on split testing, keep Pretty Links Pro for those specific links and use Asteris Links for the rest.
- **Geo-targeting.** No equivalent. A single slug always resolves to the same destination regardless of visitor country.
- **Keyword auto-replacement.** Pretty Links Pro can scan post content and auto-link bare keywords (e.g. every mention of "Bluehost" becomes a cloaked link). Asteris Links has no auto-link feature — you place the short URLs by hand or with a snippet.
- **Per-link expiry / scheduling.** No equivalent in v1.0.
- **Tracking pixel option.** The `prli_options` tracking pixel setting has no counterpart; click tracking is built in and cannot be turned off per-link.
- **`_prli_param_struct` (UTM appending).** If a Pretty Link auto-appends `?utm_source=...` based on referer, you have to bake those parameters into the destination URL itself for the Asteris version.

---

## Step-by-step

1. **Install Asteris Affiliates.** Upload the plugin ZIP at **Plugins → Add New → Upload Plugin**, activate, then enter your licence at **WooCommerce → Asteris → Licence**. The Links module is on by default.
2. **Enable the Links module.** Go to **WooCommerce → Asteris → Modules** and confirm the Asteris Links toggle is on. The settings tab appears at **WooCommerce → Asteris → Links**.
3. **Set the URL prefix.** At **WooCommerce → Asteris → Links**, set the URL prefix to match what Pretty Links was using (commonly `go`, `recommends`, or `out`). If you used a custom Pretty Links slug structure, set the matching prefix here so the new URLs line up. Save.
4. **Set the default redirect type.** Same screen. For affiliate links the Asteris default is 302 (matches Google's affiliate guidance). If your Pretty Links setup ran 307s or 301s, set it here so new bulk-imports inherit the right value.
5. **Export your Pretty Links to CSV.** Run this SQL in phpMyAdmin or via **Tools → Site Health → Info → Database** (or WP-CLI `wp db query`):

   ```sql
   SELECT
     p.post_name AS slug,
     MAX(CASE WHEN pm.meta_key = '_prli_url'           THEN pm.meta_value END) AS destination_url,
     COALESCE(MAX(CASE WHEN pm.meta_key = '_prli_redirect_type' THEN pm.meta_value END), 302) AS redirect_type,
     COALESCE(MAX(CASE WHEN pm.meta_key = '_prli_nofollow'  THEN pm.meta_value END), 1) AS nofollow,
     COALESCE(MAX(CASE WHEN pm.meta_key = '_prli_sponsored' THEN pm.meta_value END), 1) AS sponsored,
     p.post_title AS title
   FROM wp_posts p
   LEFT JOIN wp_postmeta pm ON pm.post_id = p.ID
   WHERE p.post_type = 'pretty-link' AND p.post_status = 'publish'
   GROUP BY p.ID
   ORDER BY p.ID;
   ```

   Export the result as CSV. Confirm the column order is: `slug, destination_url, redirect_type, nofollow, sponsored, title` — that is the exact order the Asteris importer expects.
6. **Sanity-check the CSV.** Open it in a spreadsheet. Spot-check 5–10 rows: do destinations look right (no broken affiliate tags, no stale tracking IDs)? Drop any rows where `destination_url` is blank — the importer skips them anyway and reporting them as failures only adds noise.
7. **Import the CSV.** At **WooCommerce → Asteris → Links**, scroll to **Bulk CSV import**, choose the file, click **Import CSV**. The importer is idempotent on `slug`: re-uploading the same file updates existing entries rather than duplicating them. A success notice shows `Imported N links from CSV`.
8. **Recreate categories.** If you used `pretty-link-category` terms, list them out and recreate them under `asteris_link_cat` (no admin UI in v1.0 — use WP-CLI `wp term create asteris_link_cat "Hosting"` or a quick `wp_set_object_terms` snippet).
9. **Backfill aggregate click counts (optional).** If you want yesterday's totals to carry over, run:

   ```sql
   UPDATE wp_postmeta apm
   JOIN wp_posts ap ON ap.ID = apm.post_id AND ap.post_type = 'asteris_link'
   JOIN wp_posts pp ON pp.post_name = ap.post_name AND pp.post_type = 'pretty-link'
   JOIN (SELECT link_id, COUNT(*) AS c FROM wp_prli_clicks GROUP BY link_id) cc ON cc.link_id = pp.ID
   SET apm.meta_value = cc.c
   WHERE apm.meta_key = '_asteris_link_hits';
   ```

   This is a one-shot copy of the historical totals. Per-visit detail does not come across.
10. **Set up old-URL redirects.** If your Pretty Links prefix differs from your new Asteris prefix (e.g. `/pretty/x` → `/go/x`), add a wildcard redirect in your server config, in the Asteris Redirects module if you have it, or via the Redirection plugin. While Pretty Links is still active, both URLs keep working — the cutover happens at step 12.
11. **Smoke-test 5 redirects.** Open `https://yourdomain.com/{prefix}/{slug}` in an incognito window for five of your busiest links. Confirm each one 30x's to the right destination and that the click counter ticks up in **WooCommerce → Asteris → Links**.
12. **Deactivate Pretty Links.** Once you've verified the imports are clean and the old-URL redirects are in place, deactivate Pretty Links at **Plugins → Installed Plugins**. Leave it deactivated for a week before deleting — that gives you a quick rollback path if anything surfaces.

---

## Verifying the migration

1. **Count check.** Compare `SELECT COUNT(*) FROM wp_posts WHERE post_type = 'pretty-link' AND post_status = 'publish'` with `SELECT COUNT(*) FROM wp_posts WHERE post_type = 'asteris_link' AND post_status = 'publish'`. Numbers should match (allowing for any blank-destination rows you culled).
2. **Spot-check ten random links.** In the Asteris Links table, pick ten rows across different categories. For each, click the pretty URL and confirm the final destination matches what Pretty Links resolved to before the migration. View-source on the redirect response: confirm the `Location:` header and status code (301/302/307) are correct.
3. **Verify `rel` attributes on placed links.** Where you embed cloaked links in post content, view-source on a published post. The cloaked URL in the `href` should be the Asteris one, and on links you've manually authored with the right markup, `rel="nofollow sponsored"` should still appear.
4. **GA4 / Analytics check.** If you run the Asteris Analytics module, fire a redirect from incognito and check GA4 real-time → events for `affiliate_click` with the right link title and destination payload.
5. **Click-counter tick.** Note the hit count on a low-traffic link, hit it once, refresh the admin screen. The count should increase by one and the last-hit timestamp should be current.

---

## Rollback

Asteris Links never modifies the `pretty-link` CPT, the `_prli_*` post meta or the `prli_clicks` table. The Pretty Links data sits untouched alongside the imported Asteris data. To revert:

1. Reactivate Pretty Links at **Plugins → Installed Plugins**.
2. Disable the Asteris Links module at **WooCommerce → Asteris → Modules**. The `asteris_link` CPT and its meta remain in the database but stop resolving — `/go/foo` URLs go 404.
3. If you put server-level or Redirection-plugin redirects in place to bridge old-to-new URLs, remove them so `/pretty/foo` resolves through Pretty Links again.
4. To clean up the imported Asteris-side data entirely: `DELETE p, pm FROM wp_posts p LEFT JOIN wp_postmeta pm ON pm.post_id = p.ID WHERE p.post_type = 'asteris_link';` (back up first — this is destructive).
5. Run a fresh GA4 smoke-test against three Pretty Links to confirm tracking has resumed end-to-end.

---

## Edge cases and troubleshooting

### Slug collisions when running both plugins simultaneously

If your Asteris prefix equals your Pretty Links prefix (both `go`, say) and both plugins are active, the request handler order matters. WordPress will route the URL to whichever plugin's `parse_request` / `template_redirect` runs first, and that's not deterministic across hosts. Always either (a) use different prefixes during the parallel window or (b) deactivate Pretty Links the moment the Asteris import is verified.

### Top-level mode (empty URL prefix) eats real product slugs

Setting the Asteris Links URL prefix to empty turns on "top-level mode" — `/laptop` resolves directly as a cloaked link. There is a collision safety check (a real page/post/product wins), but a slug like `wallet` will silently fail to redirect if you also sell a wallet product. If you migrate from a Pretty Links setup that used an empty prefix, audit the slug list against your product catalogue before the import.

### Pretty Links Pro rotations and splits

A Pretty Links Pro link with three rotation targets imports as a single Asteris link pointing to whichever destination the SQL `MAX(...)` picked — usually the most-recently-edited one. There is no warning. After the import, search your CSV for any link IDs that had multiple `_prli_url`-like rows in `wp_postmeta` and decide which destination is canonical, or keep those specific links running through Pretty Links Pro.

### Old `/pretty/...` URLs in third-party places (newsletters, YouTube descriptions, sidebar widgets)

Asteris Links can't rewrite content stored outside your database. Either keep Pretty Links active in parallel until those external places naturally expire, add a server-level rewrite from `/pretty/(.*)` to `/go/$1`, or use the Asteris Redirects module to mirror the old paths to the new ones. Pick one — don't do all three.

### CSV upload fails or silently imports zero rows

The importer expects six columns in this order: `slug, destination_url, redirect_type, nofollow, sponsored, title`. Header rows are auto-detected (it looks at whether column 2 is a URL). If you see `Imported 0 links` despite a populated file, the most common cause is column 2 being blank for the first data row, or destinations stored as relative URLs (`/foo`) instead of absolute (`https://...`) — the importer requires absolute URLs via `esc_url_raw`.

### Click counts off by one or two after backfill

The backfill SQL above is a snapshot. Any clicks that land during the cutover window are counted by Pretty Links (in `prli_clicks`) but not by Asteris (which only counts hits to `asteris_link` URLs). A 1–2 click discrepancy on busy links is normal. Re-run the backfill SQL right before you deactivate Pretty Links to minimise the gap.

---

## After the migration

1. **Submit an updated sitemap to Google Search Console.** Cloaked link URLs are non-indexable, but any post content where you swapped a bare URL for a cloaked one has changed — request re-crawl on those posts.
2. **Watch GSC for 404 spikes on `/pretty/...` URLs for 7 days.** A spike means an external link is still hitting the old path and your old-URL redirect rule (step 10 above) isn't catching it. Add the missing rule.
3. **Audit your top 20 affiliate posts.** Manually click through each cloaked link to confirm it lands on the right destination with your affiliate tag intact.
4. **Set a 7-day check-in.** Calendar reminder: revisit click totals in **WooCommerce → Asteris → Links** and compare against the same week from Pretty Links history. Wildly different numbers usually mean a tracking pixel or a UTM passthrough that didn't carry across.
5. **Delete Pretty Links.** Once you're a week clear with no surprises, delete the Pretty Links plugin at **Plugins → Installed Plugins → Delete**. The `pretty-link` CPT rows and `prli_clicks` table will linger in the database — drop them manually if you want a clean slate (back up first).

---

## Related

- [/pricing](/pricing) — what Asteris Affiliates costs vs Pretty Links Pro
- [/free](/free) — Asteris Free includes the Links module
- [/docs/modules/links](/docs/modules/links) — full Asteris Links module reference
- [/docs/getting-started](/docs/getting-started) — first-time setup
- [/docs/troubleshooting](/docs/troubleshooting) — common post-migration issues
- [/migrate](/migrate) — all migration guides
- [/support](/support) — support channels and SLA
