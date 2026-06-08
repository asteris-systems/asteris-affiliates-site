---
title: "Variation Swatches"
description: "Replaces WooCommerce's plain attribute dropdowns with colour, image, and text-button swatches on variable product pages and shop archives — for stores selling fashion, homewares, or anything where colour and material matter."
---

## What it does

Variation Swatches hooks into WooCommerce's `woocommerce_dropdown_variation_attribute_options_html` filter and replaces the default `<select>` element with accessible swatch buttons. Swatch type is configured per attribute term: a term like *Crimson* can be a colour fill (`#dc143c`), an uploaded image (for fabric, pattern, or finish), or a text/button label. Out-of-stock variation combinations are automatically detected and either struck through or hidden. The original `<select>` is preserved as a hidden field so WooCommerce's variation logic, cart, and analytics continue working untouched.

It also renders a compact, read-only swatch row on shop archive cards (the first variable attribute only, to keep loop pages clean). All settings are global; per-term colour and image data live in WP term meta (`_avs_type`, `_avs_color`, `_avs_image`) so they survive theme changes and are exportable with standard WooCommerce term exports.

Replaces: **YITH WooCommerce Color and Label Variations** ($99/yr) and **WooCommerce Variation Swatches** ($99/yr).

## Quick start

1. Activate the Asteris Affiliates plugin and enable **Variation Swatches** under **Asteris → Modules**.
2. Open **Asteris → Variation Swatches** and pick a layout (Boxed, Pill, or Tiles), shape, and size.
3. Go to **Products → Attributes** and click **Configure terms** next to a global attribute (for example, *Color*).
4. For each term, set **Swatch type** to *Text / Button*, *Colour*, or *Image*, then pick a colour or upload an image.
5. Open any variable product that uses that attribute on the frontend — the dropdown is now a row of swatches.
6. Optional: toggle **Show swatches on shop / archive pages** in settings to enable archive swatches.

Only global product attributes (those prefixed `pa_`) are converted. Local per-product string attributes continue rendering as a native dropdown.

## Settings reference

| Setting | What it does | Default | Valid values |
| --- | --- | --- | --- |
| `layout` | Visual style of the swatch group | `boxed` | `boxed`, `pill`, `tiles` |
| `shape` | Swatch corner style | `round` | `round`, `square` |
| `size` | Swatch dimensions on the product page | `md` | `sm` (26 px), `md` (34 px), `lg` (42 px) |
| `oos_mode` | How to render variations that are out of stock | `strikethrough` | `strikethrough`, `hidden` |
| `show_name` | Show the selected term's label next to the swatches | `1` | `1`, `0` |
| `show_tooltip` | Render a hover tooltip with the term name (Boxed and Pill only — Tiles already shows it) | `1` | `1`, `0` |
| `show_archive` | Render a compact read-only swatch row on shop / category pages | `1` | `1`, `0` |

Per-term data is stored in term meta, not options:

| Term meta key | Type | Purpose |
| --- | --- | --- |
| `_avs_type` | string | `color`, `image`, or `text` |
| `_avs_color` | string | Hex colour (e.g. `#1a3a6c`) — used when type is `color` |
| `_avs_image` | string | Attachment URL — used when type is `image` |

## Common workflows

### Set up colour swatches for a clothing line

1. Open **Products → Attributes** and confirm a global attribute called *Color* exists. If not, create one and tick **Enable Archives** so it has a `pa_color` taxonomy.
2. Click **Configure terms** next to *Color*.
3. For each colour term, edit it and set **Swatch type** to *Colour*, then pick the hex value with the WP colour picker.
4. On a variable product, confirm that variations use the *Color* attribute and that each variation maps to one colour term.
5. Open the product on the frontend. Swatch buttons replace the dropdown; out-of-stock colours are struck through.

### Use fabric or pattern image swatches

1. Upload your fabric thumbnails to the WordPress media library at 200 px square or larger.
2. Under **Products → Attributes → Configure terms** for the relevant attribute, set the term's **Swatch type** to *Image*.
3. Click **Upload image** and pick the swatch — the WP media frame uses the `thumbnail` size where available to keep loop pages light.
4. Save the term. The image renders inside the swatch button on both the product page and (when archive swatches are enabled) the shop loop.

### Hide instead of strike through out-of-stock variations

1. Open **Asteris → Variation Swatches**.
2. Under **Out-of-stock swatches**, choose **Hide completely**.
3. Save. The setting takes effect immediately for any variation flagged as not in stock by WooCommerce's variation logic. Note that this only filters terms appearing in at least one out-of-stock variation; "any" variations (empty attribute value) skip OOS filtering because every term is technically available.

### Match a minimalist theme with the pill layout

1. Open **Asteris → Variation Swatches** and pick **Pill Bar** as the layout.
2. Set **Swatch shape** to *Round* and **Swatch size** to *Small (26 px)*.
3. Turn off **Show term name tooltip on hover** if your theme already shows tooltips.
4. The result is a single compact segmented control with the attribute label inline.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

Variation Swatches does not currently expose its own `apply_filters` or `do_action` extension points. It consumes the standard WooCommerce filter `woocommerce_dropdown_variation_attribute_options_html` (priority 20) and the `woocommerce_after_shop_loop_item_title` action (priority 8); unhooking either falls back to the default WooCommerce UI.

Swatch data is stored in standard WP term meta (`_avs_type`, `_avs_color`, `_avs_image`) — see the [Settings reference](#settings-reference) for keys and values. Read and write with `get_term_meta()` / `update_term_meta()`; writes require `manage_woocommerce` capability and only apply to `pa_*` taxonomies.

### Frontend asset handles

| Handle | Type | Loaded on |
| --- | --- | --- |
| `asteris-variation-swatches` | style | WooCommerce pages (`is_woocommerce()` or `is_shop()`) |
| `asteris-variation-swatches` | script | Same as above; depends on `jquery`, loaded in footer; receives a localised `avsData` object with `oos_mode` |

Dequeue either to ship custom swatch styling or behaviour.

## Troubleshooting

### Swatches do not appear on the product page

The filter only fires for *global* attributes (taxonomies starting with `pa_`). Open **Products → Attributes** and confirm your colour or size attribute is listed there. If you defined the attribute directly on a single product as a custom string attribute, it stays a dropdown by design — convert it to a global attribute and reassign variations.

### Colour picker or image uploader does not load

Asteris only enqueues `wp-color-picker` and `wp-media` on the term edit screen when the current screen's taxonomy starts with `pa_`. If you have moved or renamed taxonomies via a third-party plugin, this guard may skip them. Confirm the URL contains `taxonomy=pa_something` when editing the term.

### Term meta is not saving

`save_term_meta` requires the `manage_woocommerce` capability and that `$_POST['avs_type']` is present in the request. Custom term-edit screens that strip POST fields, or roles missing `manage_woocommerce`, will silently fail to save. Check the user's role and any custom term form plugins.

### Out-of-stock filtering does nothing

OOS filtering depends on `WC_Product_Variable::get_available_variations( 'objects' )` returning embedded variation objects. Products with WooCommerce's variation threshold set to load variations via AJAX skip embedding, and all terms then render as available. Either lower the threshold via the `woocommerce_ajax_variation_threshold` filter or accept the wildcard behaviour.

### Archive swatches do not render

`render_loop_swatches` only fires when **Show swatches on shop / archive pages** is enabled and the current product is variable. Themes that override `woocommerce_after_shop_loop_item_title` (or use a fully custom product card template) will not show the row — add a manual call to `do_action( 'woocommerce_after_shop_loop_item_title' )` inside your card template.

## Known plugin conflicts

- **YITH WC Color and Label Variations** and **WooCommerce Variation Swatches** (the plugins this module replaces) both hook the same WooCommerce filter and will produce duplicate output. Deactivate them before enabling Variation Swatches.
- **Heavily customised product templates** (some Elementor and Divi WooCommerce builders) bypass `woocommerce_dropdown_variation_attribute_options_html` entirely and render their own variation UI; in those cases the swatches will not appear.
- Page-builder shop loops that replace the standard `woocommerce_after_shop_loop_item_title` action will suppress archive swatches.
- Other conflicts are not currently known. If you find one, please report it on the support forum.

## What is in Free vs Paid

Variation Swatches ships in Asteris Free as a lite version. The full module is included in all paid tiers.

**In Asteris Free (lite):**

- Colour and image swatches for **one attribute per product** — typically *Color*.
- Global settings for layout, shape, and size.

**Paid tiers (Starter, Pro, Agency, Founder) add:**

- Multi-attribute swatches (Colour + Size + Material on the same product).
- Label / radio swatch types beyond text buttons.
- Per-attribute styling overrides.
- Bulk configuration tools for assigning swatches across many terms at once.

## Related

- [Migration guide: from YITH Color and Label Variations](/migrate/from-yith)
- [Migration guide: from WooCommerce Variation Swatches](/migrate/from-yith)
- [Pricing and tiers](/pricing/)

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
