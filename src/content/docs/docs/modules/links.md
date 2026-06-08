---
title: "Asteris Links"
description: "Affiliate link cloaker and click tracker for WooCommerce stores that earn commissions through outbound product recommendations."
---

## What it does

Asteris Links turns ugly affiliate URLs (`https://amazon.com/dp/B08X9...?tag=mysite-20`) into clean, branded redirects (`yoursite.com/go/laptop-stand`). Each click increments a hit counter stored against a custom post type (`asteris_link`), and the destination is served via a configurable 301, 302, or 307 redirect. A short-lived cookie hands click events off to GA4 via the Asteris Analytics module if it is active, so affiliate clicks appear in the same dataLayer stream as the rest of your store traffic.

Storage is a WordPress custom post type with post meta — no custom tables, HPOS-safe, and standard WP term taxonomy (`asteris_link_cat`) for organising links by vendor or campaign. The module supports two URL modes: prefixed (`/go/slug`, the default) and top-level (`/slug`) with built-in collision protection against existing pages, posts, and products. This module replaces Pretty Links Pro (USD $99/yr) and ThirstyAffiliates Pro (USD $99/yr).

## Quick start

1. Activate the Links module from **WooCommerce → Asteris → Modules**.
2. Open **WooCommerce → Asteris → Links** to reach the settings tab.
3. Confirm or change the URL prefix (default `go`). Leave it blank only if you understand top-level mode.
4. Set the default redirect type (302 recommended for affiliate links) and tick the `nofollow` and `sponsored` rel attributes.
5. Use the **Add new link** form to create your first link: enter a title, optional slug, and the destination URL with your affiliate tag.
6. Visit `yoursite.com/go/your-slug` to confirm the redirect works.
7. Optionally bulk-import existing affiliate links via the CSV importer at the bottom of the settings page.

## Settings reference

| Setting | What it does | Default | Valid values |
| --- | --- | --- | --- |
| URL prefix | First path segment for cloaked links. Empty value enables top-level mode with collision protection. | `go` | Lowercase slug, no slashes, or empty string |
| Default redirect type | HTTP status used for new links when not overridden per-link. | `302` | `301`, `302`, `307` |
| Default rel nofollow | Whether new links default to `rel="nofollow"`. | `1` (on) | `0`, `1` |
| Default rel sponsored | Whether new links default to `rel="sponsored"`. | `1` (on) | `0`, `1` |
| Fire analytics event | Sets a short-lived cookie so the next pageview pushes `affiliate_click` to the GA4 dataLayer. | `1` (on) | `0`, `1` |

All option keys are stored under the module's option-name namespace (`asteris_links_url_prefix`, `asteris_links_default_redirect`, etc.) and persisted by the `admin_post_asteris_links_save` handler. Per-link values (destination, redirect type, nofollow, sponsored, hits, last hit) are stored as post meta on the `asteris_link` CPT.

## Common workflows

### Cloak a single affiliate link

1. Open **WooCommerce → Asteris → Links**.
2. In the **Add new link** card, enter a title such as "Amazon laptop stand", an optional slug, and the full affiliate destination URL.
3. Choose the redirect type (302 is the standard for affiliate traffic).
4. Click **Add**. The new link appears in the **Active links** table immediately.
5. Copy the pretty URL from the table — that is what you place in posts, emails, or social bios.

### Migrate from Pretty Links or ThirstyAffiliates

1. Export your existing links from the other plugin to CSV.
2. Reshape the CSV to the expected columns: `slug, destination_url, redirect_type, nofollow (0/1), sponsored (0/1), title (optional)`.
3. Open the **Bulk CSV import** form at the bottom of the Links settings page.
4. Upload the CSV. Header rows are auto-detected (the importer treats row one as data only if column 2 is a valid URL).
5. Review the success notice — it reports the count of links imported or updated. Re-importing is idempotent: existing slugs are updated in place, new slugs are inserted.

### Switch from prefixed to top-level URLs

1. Decide whether the SEO and collision risks are acceptable. Top-level mode means `yoursite.com/laptop` redirects, with no `/go/` segment.
2. In settings, clear the URL prefix field and save.
3. Read the warning panel that appears — slugs matching reserved names (`feed`, `robots.txt`, `wp-admin`, `wp-login.php`, `sitemap.xml`) are ignored, and real pages, posts, or products always win on collision.
4. Test a known link, then test a slug that collides with an existing product to confirm the real product page still loads.

### Track affiliate clicks in GA4

1. Confirm the Asteris Analytics module is active and configured with a GA4 measurement ID.
2. In Links settings, tick **Fire "affiliate_click" event to GA4 dataLayer**.
3. Save. From that point, each redirect sets a 60-second cookie carrying the link ID, title, and destination.
4. The destination page (if it is also on your site) or the next pageview on your site reads and clears the cookie, pushing an `affiliate_click` event to `dataLayer`.
5. Create a GA4 custom event report filtered by `event_name = affiliate_click`.

### Organise links by vendor or campaign

1. The taxonomy `asteris_link_cat` is registered but not exposed in the current admin UI.
2. Developers can assign terms via `wp_set_object_terms()` against the `asteris_link` post ID.
3. This is primarily a structural hook for future filtering — most users will not need it in v1.0.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

This module currently exposes no public extension points. The redirect path is server-side, no frontend assets are enqueued, and all admin endpoints are internal to the module's own settings UI. Filters and actions for third-party integration are planned for a future release — they will be documented here once stabilised.

## Troubleshooting

### My cloaked URL returns a 404

Two common causes. First, the rewrite rules may not have been flushed after activation — visit **Settings → Permalinks** and click **Save** to force a flush. Second, in top-level mode the URL only resolves if no WP page, post, or product owns the same slug; check for collisions by visiting the slug directly while logged out.

### Redirect works but click count stays at zero

The hit counter increments only when `maybe_redirect()` runs at `template_redirect`. If a caching layer (Cloudflare, LiteSpeed, WP Rocket) is serving the redirect from edge cache, PHP never executes. Exclude the `/{prefix}/*` path from page caching, or accept that cached redirects bypass click counting.

### GA4 affiliate_click events never appear

Confirm the Asteris Analytics module is active and its measurement ID is set. Then verify the destination is on a domain you control — if you redirect to an external site (the typical affiliate case), the cookie is never read because no subsequent pageview hits your domain. The event fires only on the next pageview on your own site, which is the expected behaviour for tracking same-site affiliate dashboards.

### "Permission denied" or "Invalid nonce" on save

Both errors come from the admin-post handlers. The user must hold `manage_woocommerce`, and the form must submit within WordPress's nonce lifetime (12-24 hours). Reload the settings page to get a fresh nonce, then resubmit.

### Top-level mode breaks an existing product page

It should not — `parse_top_level_link()` runs a collision check against `page`, `post`, and `product` post types and yields to the real content. If it does break, file a bug report with the slug and the conflicting content type. As a workaround, switch back to a non-empty prefix and save.

## Known plugin conflicts

- **Pretty Links and ThirstyAffiliates** — running either alongside Asteris Links is pointless and may produce conflicting rewrite rules on overlapping prefixes. Migrate via CSV import, then deactivate the old plugin.
- **Aggressive page-caching plugins** (LiteSpeed Cache, WP Rocket, W3 Total Cache) — may cache the redirect at the page-cache layer, bypassing PHP and the click counter. Add the link prefix to the cache exclusion list.
- **Custom rewrite plugins** that claim top-level single-segment URLs — these can collide with top-level mode. The collision check protects against WP-native content but does not see arbitrary third-party rewrites.
- Beyond the above, no specific conflicts have been reported. Top-level mode is the most likely source of edge-case interactions; the prefixed default is conservative.

## What is in Free vs Paid

Asteris Links is a paid-tier module. Available in Starter, Pro, Agency, and Founder tiers. It is not included in Asteris Free.

## Related

- [Asteris Analytics](/docs/modules/analytics) — receives the `affiliate_click` dataLayer event
- [Pricing](/pricing) — tiers that include this module
- [Migration guide: Pretty Links](/migrate/from-pretty-links)
- [Migration guide: ThirstyAffiliates](/migrate/from-pretty-links)
- [What replaces what](/replaces) — full competitor comparison

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
