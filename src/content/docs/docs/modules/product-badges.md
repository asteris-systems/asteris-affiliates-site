---
title: "Product Badges"
description: "Adds Sale, New, Sold Out, Custom and Category badges to WooCommerce product images for store owners who want one-click visual merchandising without a third-party badge plugin."
---

## What it does

Product Badges renders coloured overlay tags on WooCommerce product images across shop archives, the Product Collection block, and single product pages. It detects sale price, stock status, and publish date automatically — so a product on sale shows a "Sale" badge, a product out of stock shows "Sold Out", and a product published in the last 30 days shows "New". You also get an always-on "Custom" badge for promotional text (e.g. "Hot", "Limited Edition") and a category-driven badge that can override everything else for selected product categories.

WooCommerce ships with a built-in sale flash — the module removes that and replaces it with its own badge HTML so colour, label, and position are fully controlled. Per-product overrides let you set custom badge text and colours on individual products, or hide all badges on a specific product entirely.

This module replaces **YITH WooCommerce Badges (USD $94/yr)**.

## Quick start

1. Activate **Product Badges** from **WP Admin → Asteris → Dashboard**.
2. Open **Asteris → Product Badges** in the WP-admin sidebar.
3. Tick which badges should be active: Sale, New, Sold Out, Custom, Product Category.
4. Adjust the "New" window in days (default 30) and pick a position (top-left or top-right).
5. Set colours per badge type using the colour pickers — the preview swatch updates live.
6. Save settings, then load any shop or category page to see the badges in place.
7. Optional: open any product, scroll to the **Asteris — Product Badge** metabox in the right sidebar, and set per-product custom text, colours, or hide badges for that product.

## Settings reference

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| `badge_sale` | Enables the Sale badge on products with a sale price (and in stock) | `1` | `0` / `1` |
| `badge_new` | Enables the New badge on products published within the New window | `1` | `0` / `1` |
| `badge_out` | Enables the Sold Out badge on out-of-stock products | `1` | `0` / `1` |
| `badge_custom` | Enables a global Custom badge on every product | `0` | `0` / `1` |
| `badge_category` | Enables the Product Category badge (overrides all others when matched) | `0` | `0` / `1` |
| `new_days` | Days a product is treated as "New" after its publish date | `30` | `1`–`365` |
| `label_sale` | Text shown on the Sale badge | `Sale` | Any text |
| `label_new` | Text shown on the New badge | `New` | Any text |
| `label_out` | Text shown on the Sold Out badge | `Sold Out` | Any text |
| `label_custom` | Text shown on the global Custom badge | `Hot` | Any text |
| `label_category` | Text shown on the Category badge (blank = use matching category name) | empty | Any text |
| `badge_category_ids` | Comma-separated `product_cat` term IDs that trigger the Category badge | empty | Comma-separated integers |
| `colour_sale_bg` / `colour_sale_tx` | Sale badge background / text colours | `#e74c3c` / `#ffffff` | Hex colours |
| `colour_new_bg` / `colour_new_tx` | New badge background / text colours | `#2ecc71` / `#ffffff` | Hex colours |
| `colour_out_bg` / `colour_out_tx` | Sold Out background / text colours | `#95a5a6` / `#ffffff` | Hex colours |
| `colour_cus_bg` / `colour_cus_tx` | Custom badge background / text colours | `#1a3a6c` / `#ffffff` | Hex colours |
| `colour_cat_bg` / `colour_cat_tx` | Category badge background / text colours | `#8e44ad` / `#ffffff` | Hex colours |
| `position` | Where badges sit over the product image | `top-left` | `top-left`, `top-right` |
| `show_archive` | Render badges on shop / archive pages | `1` | `0` / `1` |
| `show_single` | Render badges on the single product page | `1` | `0` / `1` |

Per-product meta keys (set via the product metabox):

| Meta key | Purpose |
|---|---|
| `_asteris_badge_custom` | Per-product custom badge text (overrides global label) |
| `_asteris_badge_custom_bg` | Per-product custom badge background colour |
| `_asteris_badge_custom_tx` | Per-product custom badge text colour |
| `_asteris_badge_hide` | If `1`, hides all badges on this product |

## Common workflows

### Run a site-wide sale event

When you want a coordinated "Sale" look across the whole shop:

1. Open **Asteris → Product Badges**.
2. Confirm `badge_sale` is ticked and set `label_sale` to e.g. `-20%` or `SALE`.
3. Pick a high-contrast colour pair in **Badge colours** — the live preview updates as you change the colour picker.
4. Use **Show on** to confirm both archive and single product pages are ticked.
5. Save. Any product with a WooCommerce sale price now shows the badge automatically — set sale prices the usual way under **Product data → General**.

### Highlight new arrivals automatically

1. Tick `badge_new` and set `new_days` to your refresh cadence (e.g. `14` for fortnightly new stock).
2. Set `label_new` to something descriptive — `New In`, `Just Landed`.
3. New products are detected via `post_date` — so as long as products are published normally, the badge appears for the window then disappears with no manual intervention.
4. Note: out-of-stock products do not get a New badge — Sold Out takes precedence.

### Promote a featured category

The Category badge has the highest priority and overrides Sale, New, Sold Out and Custom when matched.

1. Tick `badge_category`.
2. In the category picker, tick the categories you want the badge to apply to.
3. Leave `label_category` blank to use the matching category name, or enter a fixed label like `Featured` or `Limited`.
4. Pick distinctive colours so the override is visually obvious.
5. Save. Products in any selected category now show only the Category badge — useful for "Curated", "Christmas", or "Editor's Pick" collections.

### Override one product manually

1. Edit the product (**Products → All Products → Edit**).
2. In the right sidebar locate **Asteris — Product Badge**.
3. Enter custom text (e.g. `Limited Edition`) — this shows regardless of the global `badge_custom` toggle.
4. Adjust the per-product background / text colours with the colour pickers.
5. Update the product. The override only applies to this product; global rules remain for all others.

### Hide badges on one product

1. Edit the product.
2. In the **Asteris — Product Badge** metabox, tick **Hide all badges on this product**.
3. Update. This product now renders without any badge regardless of stock, sale, new, or category status.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, shortcodes, frontend asset handles, and CSS selectors documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal settings save handlers, admin metabox plumbing, internal helper methods) is implementation detail and may change without notice.

This module does not currently expose its own PHP action or filter extension points — badge HTML is rendered directly. If you need to alter badge output, the practical seams are the WooCommerce hooks the module itself consumes: filter `woocommerce_product_get_image` at priority `> 10` to post-process the wrapped classic-loop output, or filter `render_block` for the Product Collection block loop. Neither of those is an Asteris-owned hook — they are upstream WC / WP hooks and we don't control their stability.

### Frontend asset handles

| Handle | Type | Where loaded | Notes |
|---|---|---|---|
| `asteris-product-badges` | CSS | Frontend, only when `is_woocommerce()` or `is_shop()` is true | Dequeue to ship your own badge styles |

Dequeue example (in a child theme `functions.php`):

```php
add_action( 'wp_enqueue_scripts', function () {
    wp_dequeue_style( 'asteris-product-badges' );
}, 20 );
```

### CSS hooks

| Selector | Purpose |
|---|---|
| `.apb-img-wrap` | Span wrapping the product image in classic loops |
| `.apb-wrap` | Container for one or more badges |
| `.apb-top-left` / `.apb-top-right` | Position modifier on `.apb-wrap` |
| `.apb-badge` | Each badge span |
| `.apb-badge--sale` / `--new` / `--out` / `--custom` / `--category` | Per-type modifier |

## Troubleshooting

### Badges don't appear on the shop page

Confirm `show_archive` is ticked under **Show on**. If you are using a block theme with the **Product Collection** block, the badge is injected via `render_block` — if a caching plugin caches the block output before our filter runs, badges may disappear. Clear page caches and disable block-level caching for product image blocks. The CSS only loads when `is_woocommerce()` or `is_shop()` returns true — custom pages that render WooCommerce products outside those conditional flags will need the stylesheet enqueued manually.

### Sale badge missing on a sale product

The Sale badge only renders when both `$product->is_on_sale()` and `$product->is_in_stock()` return true — a product on sale but out of stock shows the Sold Out badge instead (Sold Out has higher priority). Also confirm the product has a sale price set, not just a discounted regular price.

### Per-product metabox save doesn't persist

The save handler uses a nonce (`asteris_apb_save` / `asteris_apb_nonce`) and only writes if the nonce verifies. If you are saving via a custom REST or programmatic flow that bypasses the standard product edit screen, the nonce check will fail silently — write to the meta keys (`_asteris_badge_custom`, `_asteris_badge_custom_bg`, `_asteris_badge_custom_tx`, `_asteris_badge_hide`) directly with `update_post_meta()`.

### Category badge not appearing

Check that `badge_category` is ticked AND at least one category is selected in the picker — the badge requires both. The hidden field that stores category IDs is populated by JavaScript, so if your admin has JS disabled or a script error occurs on the settings page, no IDs are saved. Confirm IDs are present in the `asteris_product_badges_badge_category_ids` option value.

### Two badges showing on block-theme product cards

The module detects whether `woocommerce_product_get_image` already wrapped the image (looks for `apb-img-wrap`) and skips the block-level injection if so. If you see doubled badges, a third-party plugin may be intercepting `woocommerce_product_get_image` and rebuilding the HTML — disable the conflicting plugin or report the conflict.

## Known plugin conflicts

- **WooCommerce built-in sale flash**: removed by the module via `remove_action()`. If another plugin re-adds `woocommerce_show_product_loop_sale_flash`, both flashes may render.
- **Other badge plugins** (YITH WC Badges Management, Advanced Product Labels, Booster for WooCommerce badges): expected to conflict — deactivate the third-party badge plugin before using this module.
- **Aggressive block caching** (Cache Enabler block cache, some Elementor product widget caches): may serve stale block HTML without the injected badge. Clear caches after enabling.
- **Custom themes that bypass `woocommerce_product_get_image`**: themes calling `get_the_post_thumbnail()` directly for product images skip the classic-loop wrap. The single-product hook (`woocommerce_product_thumbnails`) and block filter still fire.

Other conflicts may exist with bespoke shop layouts — if you encounter one, please open a support thread.

## What is in Free vs Paid

Product Badges is a paid-tier module. Available in **Starter**, **Pro**, **Agency**, and **Founder**.

It is not included in Asteris Free.

## Related

- [Feature Labels module](/docs/modules/feature-labels) — content-driven labels on the single product page (different from price-driven badges)
- [Migrate from YITH WooCommerce Badges](/migrate/yith-badges/)
- [All modules overview](/docs/modules/)
- [Pricing and tiers](/pricing/)

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
