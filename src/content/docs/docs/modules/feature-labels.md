---
title: "Feature Labels"
description: "Render small uppercase attribute chips like Custom Made or Hand Made on WooCommerce product pages — for merchants who sell on craftsmanship, sourcing, or production method rather than discount."
---

## What it does

Feature Labels renders small uppercase chips (for example, "Custom Made", "Hand Made", "Ethically Sourced") on WooCommerce product pages. Labels are driven by a global list defined in module settings, with per-product override or hide controls available from the product edit screen. Placement is shortcode-driven (`[asteris_feature_labels]`), so the chips sit exactly where you put them — inside a template, a page builder block, or a WordPress block — rather than being auto-injected at a fixed hook.

The module is distinct from **Product Badges** (price-driven sale and percent-off badges) — Feature Labels are descriptive attributes, not promotions. It replaces **YITH Product Labels** (US$94/yr).

## Quick start

1. In WP admin, go to **Asteris Affiliates → Feature Labels**.
2. Enter one label per line in **Global labels** — for example, `Custom Made`, `Hand Made`, `Ethically Sourced`.
3. Pick a background and text colour under **Chip colours**. The live preview chip updates as you choose.
4. Save settings.
5. Edit a product template or page, and place the shortcode `[asteris_feature_labels]` where you want the chips to appear.
6. (Optional) On any product, scroll to the **Asteris — Feature Labels** metabox in the right sidebar to override the global list or hide labels for that product.

## Settings reference

| Setting | What it does | Default | Valid values |
| --- | --- | --- | --- |
| Global labels (`labels_list`) | Newline-separated list of chips shown on every product unless overridden per-product. | empty | One label per line, plain text. Sanitised via `sanitize_textarea_field`. |
| Background colour (`labels_bg`) | Chip background colour. | `#f0f0f0` | Any valid hex colour (validated by `sanitize_hex_color`). |
| Text colour (`labels_tx`) | Chip text colour. | `#333333` | Any valid hex colour (validated by `sanitize_hex_color`). |
| Per-product labels (`_asteris_fl_labels`) | Product-level override. When set, replaces the global list for that one product. | empty | One label per line. Stored in post meta. |
| Hide on this product (`_asteris_fl_hide`) | Suppresses all labels for a single product. | unchecked | `1` (hidden) or unset. |

## Common workflows

### Global label set for a craft or handmade store

If every product you sell is handmade, set the global list to the two or three attributes that describe your brand promise — for example, `Hand Made`, `Made in Australia`, `Ethically Sourced`. Place `[asteris_feature_labels]` in your product page template (or single-product block layout) once. Every product now renders the same chips without per-product setup. This is the lowest-maintenance configuration and the one to default to.

### Per-product override for one-off pieces

Some products warrant a different label set — a one-off commission, a collaboration piece, a limited drop. Open the product, find the **Asteris — Feature Labels** sidebar panel, and type the alternate list into the textarea (one per line). The per-product list completely replaces the global list for that product; it does not append. Clearing the textarea reverts the product to the global list.

### Hide labels on selected products

For products where chips would mislead (a digital download in a handmade store, a gift card, a clearance line), tick **Hide feature labels on this product** in the metabox. The shortcode then outputs nothing for that product, even if the global list is populated.

### Placement inside a page builder

The shortcode works in any context that accepts shortcodes — Gutenberg Shortcode block, Elementor Shortcode widget, classic editor, theme template files via `do_shortcode()`. Without arguments it uses the current product context (the queried product, or the global `$product` if set). To render labels for a specific product on an unrelated page, pass an id: `[asteris_feature_labels id="42"]`.

### Brand-matched chip colours

The default neutral grey works on most themes. To match a brand palette, change Background and Text under **Chip colours** — the wp-color-picker preview chip updates live, so you can iterate before saving. Keep contrast high enough for accessibility; the module does not enforce a minimum contrast ratio.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Shortcodes

| Shortcode | Attributes | Output |
| --- | --- | --- |
| `[asteris_feature_labels]` | `id` (optional, int) — product id. Defaults to current product context (`$product` global, then `get_queried_object_id()`). | `<div class="afl-wrap">` containing one `<span class="afl-label">` per label, with background and text colour applied inline. |

Example:

```
[asteris_feature_labels]
[asteris_feature_labels id="42"]
```

There are no `do_action` or `apply_filters` calls inside the module — output is intentionally not filterable in v1.0. Override styling via the `.afl-wrap` and `.afl-label` CSS classes from your theme.

### Frontend asset handles

- `asteris-feature-labels` (style) — registered against `assets/style.css`, versioned with `ASTERIS_VERSION`. Auto-enqueued on `is_product()`, and on demand when the shortcode renders. Dequeue with `wp_dequeue_style( 'asteris-feature-labels' )` to ship your own chip styling.

## Troubleshooting

### Shortcode renders nothing

Three possible causes: (1) global label list is empty AND the product has no per-product override, (2) the **Hide feature labels on this product** checkbox is ticked on that product, (3) no product context is resolvable (you placed the shortcode on a non-product page without `id="..."`). Check the metabox and the global list first; if both have content, add an explicit id.

### Chip colours did not save

The colour fields are validated by `sanitize_hex_color`. If you paste an `rgba()` value, a named colour like `red`, or a malformed hex, WordPress strips it and the field reverts to the previous valid value (or the default `#f0f0f0` / `#333333`). Use the colour picker rather than typing values directly.

### Per-product list did not override the global list

The metabox save runs on `woocommerce_process_product_meta`, which fires only when you save the product via the standard WooCommerce product editor. Saving via the block editor's REST endpoints or third-party bulk-edit tools may bypass this. Confirm by opening the product, editing the textarea, and clicking **Update** in the classic product editor.

### Styles look broken on shop loop or non-product pages

The stylesheet auto-enqueues only on `is_product()` pages. When you use the shortcode outside of a single-product context, the shortcode handler also enqueues the stylesheet on demand. If you call `get_html()` directly from custom PHP (not the shortcode), enqueue `asteris-feature-labels` yourself.

### Colour picker not loading on the product edit screen

`wp-color-picker` is only enqueued on `post.php` / `post-new.php` when the post type is `product`, and on Asteris settings screens. If you have a custom admin screen that needs the picker, enqueue it manually.

## Known plugin conflicts

- **YITH Product Labels** — overlapping output. Disable one of the two; running both will render duplicate chip rows.
- **Product Badges (Asteris)** — no conflict, but understand the split: Product Badges drives Sale / % off / custom-text badges from price logic; Feature Labels drives descriptive attributes from a hand-curated list. They can coexist.
- **Page builders that strip unknown shortcodes** — some aggressive caching or content-security setups in builders may sanitise the shortcode out. Use the builder's native Shortcode widget rather than pasting into a Rich Text block.

## What is in Free vs Paid

Feature Labels is **not** in the Asteris Free plugin and has no Lite version. It is available in **Starter, Pro, Agency, and Founder** tiers of Asteris Affiliates.

If you need free descriptive labels, the closest equivalent in the Free plugin is **Trust Badges**, which serves a different purpose (cart / checkout / product-page reassurance bars rather than product-attribute chips).

## Related

- [Product Badges](/docs/modules/product-badges) — price-driven Sale and percent-off badges.
- [Trust Badges](/docs/modules/trust-badges) — reassurance bars at cart / checkout / product page (in Free).
- [Variation Swatches](/docs/modules/variation-swatches) — colour / image / label / radio attribute swatches.
- [SEO](/docs/modules/seo) — schema and meta integration for product pages where labels live.
- [All modules](/modules)

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| 1.9.7 | 2026-06-01 | Documented in detail. |
