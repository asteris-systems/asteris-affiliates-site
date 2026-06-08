---
title: "Analytics"
description: "Drop-in Google Analytics 4 and Google Tag Manager with enhanced-ecommerce dataLayer events for WooCommerce store owners who want clean conversion data without a third-party plugin."
---

## What it does

Analytics injects the Google Analytics 4 (`gtag.js`) snippet and / or the Google Tag Manager container into the right places on every front-end page — `<head>` for the loader, immediately after `<body>` for the GTM `<noscript>` fallback — and pushes GA4-shaped enhanced-ecommerce events to `window.dataLayer` on the WooCommerce moments that matter: `view_item`, `view_cart`, `add_to_cart`, `remove_from_cart`, `begin_checkout`, and `purchase`.

The module is opinionated about clean data. By default it skips logged-in shop managers, skips requests where `WP_DEBUG` is true (so staging traffic does not pollute production reports), and respects the browser `DNT` header. The `purchase` event is guarded by an order meta flag so a customer refreshing the thank-you page cannot double-count a conversion.

It replaces **MonsterInsights** (US$99/year) and **FunnelKit Stripe Conversion Pixels** (free, but tied to FunnelKit's checkout).

## Quick start

1. In Google Analytics 4, copy your Measurement ID (the `G-XXXXXXXXXX` value under Admin → Data Streams → Web).
2. Optionally, in Google Tag Manager, copy your Container ID (`GTM-XXXXXX`) from the top of the workspace.
3. In WordPress admin, go to **Asteris → Analytics**.
4. Paste the GA4 Measurement ID into **GA4 Measurement ID** and / or the GTM ID into **GTM Container ID**.
5. Leave **Auto-push WooCommerce events to dataLayer** enabled (default).
6. Click **Save Settings**. The status panel should switch from "PENDING" to "ACTIVE".
7. In an incognito window, visit a product page, add it to cart, and complete a test order. Use the Google Tag Assistant Chrome extension to confirm `view_item`, `add_to_cart`, and `purchase` events fired.

## Settings reference

| Setting | What it does | Default | Valid values |
| --- | --- | --- | --- |
| GA4 Measurement ID (`ga4_id`) | Loads `gtag.js` and emits `gtag('config', ID)` in `<head>`. Validated against `/^G-[A-Z0-9]+$/`; invalid input is silently discarded. | empty | `G-XXXXXXXXXX` |
| GTM Container ID (`gtm_id`) | Loads the GTM container script in `<head>` and the `<noscript>` iframe after `<body>`. Validated against `/^GTM-[A-Z0-9]+$/`. | empty | `GTM-XXXXXX` |
| E-commerce events (`enhanced_ecommerce`) | Auto-pushes WooCommerce events to `window.dataLayer`. Turn off if you are building your own GTM tags from raw Woo hooks. | `1` | `0`, `1` |
| Skip admins (`skip_admins`) | Suppresses tracking when the visitor is logged in and has the `manage_woocommerce` capability. | `1` | `0`, `1` |
| Skip when WP_DEBUG (`skip_debug`) | Suppresses tracking when the `WP_DEBUG` constant is true. | `1` | `0`, `1` |
| Respect DNT (`respect_dnt`) | Suppresses tracking when the browser sent the `DNT: 1` header. | `1` | `0`, `1` |
| IP anonymisation (`anonymize_ip`) | Passes `anonymize_ip: true` in the GA4 `gtag('config')` call. | `1` | `0`, `1` |

All values are stored under WordPress options namespaced by the module and saved through `admin-post.php` (not the Settings API), matching the project-wide save pattern.

## Common workflows

### Configure GA4 only (no Tag Manager)

The simplest setup. Paste your `G-XXXXXXXXXX` ID into **GA4 Measurement ID**, leave **GTM Container ID** blank, save. The module loads `gtag.js` directly and fires enhanced-ecommerce events straight to GA4. No container, no tag mapping needed.

1. Asteris → Analytics.
2. Paste the GA4 ID.
3. Save. Verify in GA4 → Reports → Realtime that page views and `purchase` events arrive.

### Configure GTM with GA4 inside the container

Recommended if you also fire Meta, TikTok, or Bing pixels. Asteris pushes the events to `dataLayer`; your GTM tags pick them up.

1. In GTM, build a GA4 Configuration tag using your `G-XXXXXXXXXX`.
2. Build a GA4 Event tag for each event name (`view_item`, `add_to_cart`, `purchase`, etc.) with a Custom Event trigger matching the event name.
3. In Asteris → Analytics, paste **GTM Container ID** only. Leave the GA4 field empty so the snippet is not loaded twice.
4. Publish the GTM workspace, save the Asteris settings, test in GTM Preview mode.

### Keep your own browsing out of reports

The default `skip_admins` rule covers logged-in shop managers. To verify what a real customer sees, open an incognito or private window so no admin session is present, then load the store.

1. Confirm **Skip tracking when… The current user is an admin / shop manager** is ticked in Asteris → Analytics.
2. Open an incognito window.
3. Visit a product, add to cart, check out. Tag Assistant should show the full event sequence.

### Verify the purchase event without burning real orders

The `purchase` event guards against duplicates using order meta `_asteris_analytics_fired`. To re-test the event for a single order, delete that meta on the order in the WooCommerce admin, then revisit the thank-you URL.

1. Place a test order (Stripe test mode or a manual order set to "processing").
2. Open the order in WooCommerce → Orders → Edit.
3. In Custom Fields, delete `_asteris_analytics_fired`.
4. Revisit the thank-you URL. The event will fire once more.

### Stage to production without polluting metrics

Keep `skip_debug` enabled and leave `WP_DEBUG` true on staging. No event will fire there even if the IDs are populated, which means you can clone production options across environments safely.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

As of version 1.9.7, the Analytics module exposes **no public extension points** — no `asteris_*` hooks or filters, no shortcodes, no REST routes, no public AJAX actions, and no frontend script or style handles (the `gtag.js` and GTM snippets are printed inline in `wp_head` at `priority = 1`, so there is nothing to dequeue).

The module consumes standard WooCommerce action hooks (`woocommerce_after_single_product`, `woocommerce_after_cart`, `woocommerce_add_to_cart`, `woocommerce_cart_item_removed`, `woocommerce_before_checkout_form`, `woocommerce_thankyou`) — extend or unhook those through WooCommerce's own API.

### Reading saved settings from another plugin

The stored option keys are stable. Reading them is supported:

```php
$ga4 = get_option( 'asteris_analytics_ga4_id', '' );
if ( $ga4 ) {
    // $ga4 has already been validated against /^G-[A-Z0-9]+$/ at save time.
}
```

See the **Settings reference** table above for the full list of option keys.

## Troubleshooting

### Status panel says "PENDING — add a tracking ID" after saving

Both ID fields are regex-validated on save. A GA4 ID that does not match `G-[A-Z0-9]+` (after whitespace strip and upper-casing) is silently discarded, leaving the stored value empty. Re-check the ID you pasted has no leading whitespace, no surrounding quotes, and the `G-` prefix. Same rule applies to GTM IDs: must match `GTM-[A-Z0-9]+`.

### Events visible in Tag Assistant but not in GA4 Realtime

GA4 Realtime can lag by 60-90 seconds and may strip events from filtered IPs. Check that the GA4 property's Data Filters do not include the IP you are testing from. If you only configured a **GTM Container ID** (not a GA4 ID), the events reach `dataLayer` but never reach GA4 unless you have a GA4 Configuration tag inside the GTM container.

### `purchase` event never fires

The most common cause is your gateway redirecting to a custom thank-you page that does not call the standard `woocommerce_thankyou` action. Confirm the order's "order received" URL renders the WooCommerce thank-you template. If you use FunnelKit, Cartflows, or a similar custom checkout, that vendor must trigger `woocommerce_thankyou` or your `purchase` event will not be pushed.

### Events fire for the admin even though "skip admins" is ticked

The check is `current_user_can( 'manage_woocommerce' )`. If your user is not actually a shop manager (for example, an Editor with custom caps) you may still be tracked. Either grant the cap or test in an incognito window.

### Settings form returns "Invalid nonce"

The nonce action is `asteris_analytics_save` and lifetimes are WordPress default (12-24 hours). If you left the settings tab open overnight, reload the page before saving.

## Known plugin conflicts

- **MonsterInsights, GA Google Analytics, Site Kit by Google** — running any of these alongside Asteris Analytics will produce duplicate GA4 hits. Deactivate the other tracker before activating this module.
- **Conversion-pixel plugins that also push `purchase` to `dataLayer`** (for example FunnelKit Stripe Conversion Pixels, PixelYourSite for its GA4 channel) — duplicate `purchase` events. Disable their GA4 channel and keep them only for Meta / TikTok pixels.
- **Aggressive HTML minifiers and page caches** that strip inline scripts — Autoptimize and WP Rocket's "Remove unused JavaScript" in some configurations can break the `gtag` bootstrap. Whitelist the `googletagmanager.com` URL and the `Asteris Analytics` script comment block.
- **Cookie-consent plugins that block scripts by handle** — because Asteris prints `gtag.js` inline (not via `wp_enqueue_script`), handle-based blockers will not gate it. If you require strict EU consent gating, use a GTM-only setup and gate the GA4 Configuration tag inside GTM with a consent variable. This is a known limitation; granular Consent Mode v2 wiring is on the roadmap.

## What is in Free vs Paid

Analytics is a paid-tier module. Available in Starter, Pro, Agency, and Founder.

## Related

- [Pricing and tiers](/pricing)
- [Asteris Free overview](/docs/free-vs-paid)
- [Migrating from MonsterInsights](/migrate/from-yith)
- [SEO module](/docs/modules/seo)

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
