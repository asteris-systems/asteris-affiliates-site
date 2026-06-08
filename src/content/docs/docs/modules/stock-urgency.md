---
title: "Stock Urgency"
description: "Display low-stock and high-demand messages on WooCommerce product pages for shops that want to nudge hesitant buyers without paying an annual subscription."
---

## What it does

Stock Urgency adds a small coloured badge to single product pages that reads something like "Only 3 left — order soon" when the WooCommerce stock count drops to or below a threshold you set. For products that do not use WooCommerce stock management — typically made-to-order, print-on-demand, or service items — it can show a fixed "high demand" message instead.

The badge is auto-injected into the product summary at priority 21 (so it sits just under the price by default), or you can switch to shortcode-only mode and place `[asteris_stock_urgency]` anywhere a shortcode is accepted. Colours, threshold, message wording, and category targeting are all configurable from the module settings screen.

This module replaces **Tyche Softwares Only X Left** (~USD $39/yr).

## Quick start

1. Activate **Stock Urgency** from **WP Admin → Asteris Affiliates → Modules**.
2. Open **WP Admin → Asteris Affiliates → Stock Urgency**.
3. Set **Low stock threshold** (default `5`). The badge shows when stock is at or below this number.
4. Edit the **Low stock message**. Use `{stock}` as a placeholder for the live quantity.
5. (Optional) Add a **High demand message** for non-stock-managed products.
6. (Optional) Tick categories under **Limit to categories** to scope the badge. Children of ticked categories are automatically included.
7. Save, then visit a product whose stock quantity is at or below the threshold to confirm the badge renders.

## Settings reference

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| Low stock threshold | Maximum stock quantity that still triggers the message. | `5` | Integer 1–999 |
| Low stock message | Text shown when a stock-managed product is at or below threshold. `{stock}` is replaced with the live quantity. | `Only {stock} left — order soon` | Plain text (sanitised via `sanitize_text_field`) |
| High demand message | Text shown on products that do NOT use WooCommerce stock management. Leave blank to hide on those products. | _(empty)_ | Plain text |
| Position | Where the badge renders. Either auto-injected after the product price, or only when the shortcode is placed manually. | `after_price` | `after_price`, `shortcode` |
| Limit to categories | Restricts the badge to selected product categories (children included). Leave empty to apply to every product. | _(empty — all products)_ | Array of `product_cat` term IDs |
| Dot & border colour | Hex colour for the indicator dot and left border. | `#c0392b` | Any valid hex colour |
| Background colour | Hex colour for the badge background. | `#fff5f5` | Any valid hex colour |
| Text colour | Hex colour for the message text. | `#c0392b` | Any valid hex colour |

## Common workflows

### Show urgency on physical products only

Use the category filter to keep the badge off digital downloads or service items.

1. Go to **Stock Urgency** settings.
2. Under **Limit to categories**, tick your physical-goods parent categories (for example `Apparel`, `Homewares`).
3. Save. Any sub-categories underneath those parents are included automatically because the module walks `get_term_children()`.
4. Verify on a digital product page — the badge should not appear.

### Add a "high demand" message for made-to-order items

For products without stock management (`managing_stock()` returns false), the module can show a fixed message instead of a quantity.

1. In **WooCommerce → Products**, confirm the relevant products have **Manage stock?** unticked.
2. In **Stock Urgency** settings, fill in **High demand message** (e.g. `High demand — limited production slots this month`).
3. Save. The message appears on every non-stock-managed product (subject to the category filter).
4. Leave the field blank to disable this behaviour.

### Place the badge somewhere other than under the price

The default hook is `woocommerce_single_product_summary` at priority 21. If your theme puts the price unusually low, or you want the badge in a custom builder block, switch to shortcode mode.

1. Set **Position** to `Shortcode only — [asteris_stock_urgency]`.
2. Edit the product template, page builder block, or template part where you want the badge.
3. Insert `[asteris_stock_urgency]`. Stylesheet enqueuing happens on demand if it was not already loaded.
4. Save and verify on the front end.

### Match the badge to your brand palette

The colours are stored as CSS custom properties and injected via `wp_add_inline_style`, so updates apply site-wide instantly.

1. Open **Stock Urgency** settings. The three colour pickers use the native WordPress `wp-color-picker`.
2. Adjust **Dot & border colour**, **Background colour**, and **Text colour**. A live preview updates as you change values.
3. Save. Values are sanitised through `sanitize_hex_color`; invalid input falls back to the defaults.

### Tighten or loosen the urgency window

The threshold controls how aggressive the messaging feels.

1. For high-turnover SKUs, set a lower threshold (e.g. `3`) so the badge appears only when stock is genuinely critical.
2. For slow-moving or hand-made stock, raise it (e.g. `15`) to surface urgency earlier.
3. Remember that out-of-stock products never show the badge — WooCommerce already labels those.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Shortcodes

`[asteris_stock_urgency]` — renders the urgency badge inline. Honours the same category filter and message rules as the auto-injected version. Returns an empty string outside single product pages, when the category filter excludes the product, or when no message would otherwise render. Takes no attributes.

Example placement inside a Gutenberg shortcode block:

```html
[asteris_stock_urgency]
```

### Frontend asset handles

| Handle | Type | Purpose |
|---|---|---|
| `asteris-stock-urgency` | style | Frontend stylesheet. Loads on `is_product()` pages and on shortcode use. |

To dequeue the frontend stylesheet on a specific template:

```php
add_action( 'wp_enqueue_scripts', function () {
    if ( is_product() && has_term( 'gift-cards', 'product_cat' ) ) {
        wp_dequeue_style( 'asteris-stock-urgency' );
    }
}, 100 );
```

## Troubleshooting

### The badge does not appear on any product

Check that the module is active under **Asteris → Modules**, that the product has WooCommerce stock management enabled, and that its stock quantity is at or below the threshold. If the **Position** setting is `Shortcode only`, the auto-inject is disabled by design — either switch back to `After price` or place `[asteris_stock_urgency]` in the template.

### The badge shows on the wrong products

Open **Stock Urgency** settings and review **Limit to categories**. An empty selection means "show on all products". If categories are ticked, the badge only renders when the product belongs to a ticked category or one of its descendants (via `get_term_children`). Confirm the product is actually assigned to the expected category in the product editor.

### Colours revert after saving

The colour fields are sanitised through `sanitize_hex_color`. Values that are not valid 3- or 6-digit hex codes are silently rejected and the defaults (`#c0392b`, `#fff5f5`, `#c0392b`) are used instead. Pick the colour through the picker rather than pasting partial codes.

### The `{stock}` placeholder is not being replaced

`{stock}` is only substituted for stock-managed products. On non-stock-managed products the **High demand message** is rendered verbatim — there is no quantity to interpolate. If you need the placeholder behaviour, enable WooCommerce stock management on the product.

### The badge sits in the wrong place under the theme

The module hooks `woocommerce_single_product_summary` at priority 21. Some themes inject custom blocks at the same or higher priorities. Switch **Position** to `Shortcode only` and place `[asteris_stock_urgency]` exactly where you want it.

## Known plugin conflicts

- No confirmed conflicts at time of writing. The module only adds output inside `woocommerce_single_product_summary` and a tiny inline stylesheet, so collisions are unlikely.
- Conjecturally: any plugin that aggressively strips or reorders WooCommerce summary hooks (some heavily-customised product page builders) may suppress the auto-injected badge — use shortcode mode in that case.
- Other "only X left" plugins (e.g. Tyche Softwares Only X Left, YITH WooCommerce Stock Notifier badge mode) will double up if left active. Deactivate them once Stock Urgency is configured.

## What is in Free vs Paid

Stock Urgency is a paid-tier module. Available in Starter, Pro, Agency, and Founder.

## Related

- [All modules](/modules)
- [Pricing and tiers](/pricing)
- [Asteris Free vs Paid comparison](/free-vs-paid)
- [Delivery Timeline module](/docs/modules/delivery-timeline)
- [Migration: replacing Tyche Only X Left](/migrate/from-yith)

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
