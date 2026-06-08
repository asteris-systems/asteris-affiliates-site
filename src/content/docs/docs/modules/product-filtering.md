---
title: "Product Filtering"
description: "AJAX-powered shop filters (price, categories, attributes, stock, sale) for WooCommerce store owners who want faster product discovery without page reloads."
---

## What it does

The Product Filtering module adds AJAX-powered filters to the WooCommerce shop and product archive pages. Customers can narrow the product loop by price range, product categories, any registered product attribute taxonomy (colour, size, material, etc.), stock status, and on-sale flag. Filter state is reflected in the URL query string, so filtered views are shareable and survive a page reload or browser-back. There is no full page refresh — the shop loop is replaced inline via `wp_ajax_asteris_pf_query`.

The renderer also detects Variation Swatches term metadata (`_avs_type`, `_avs_color`, `_avs_image`) and switches attribute lists to a colour/image swatch grid when present. Sorting (popularity, rating, newest, price low-to-high, price high-to-low) is integrated into the same panel and uses WooCommerce's `wc_product_meta_lookup` table for correct price sorting on variable products.

This module replaces FacetWP ($79/yr), WOOF ($79/yr), and YITH Ajax Product Filter ($99/yr).

## Quick start

1. Activate the Product Filtering module under **Asteris** → modules list.
2. Go to **Asteris** → **Product Filtering** tab.
3. Choose which filter types to show (price, categories, stock, on sale) and tick the product attributes you want as filter groups.
4. Pick a placement — **Manual** (shortcode/widget) or **Auto: horizontal top bar** above the products.
5. If you chose Manual on a classic theme, go to **Appearance** → **Widgets** and drop the "Asteris Product Filters" widget into your shop sidebar. On a block theme, open the **Site Editor**, edit the Shop template, add a Shortcode block, and paste `[asteris_filters]`.
6. Visit your shop page. Tick a filter — the loop refreshes via AJAX and the URL updates.

## Settings reference

All options are stored as individual WordPress options under the Abstract_Module naming scheme. Saves are handled by `admin_post_asteris_pf_save` with a `wp_verify_nonce` check.

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| Filter types — Price range | Renders the price range slider group | On | On / Off |
| Filter types — Categories | Renders the `product_cat` checkbox list | On | On / Off |
| Filter types — Stock status | Renders the "In stock only" checkbox | On | On / Off |
| Filter types — On sale | Renders the "On sale" checkbox | On | On / Off |
| Product attributes | Per-taxonomy toggle for each `pa_*` registered under Products → Attributes. Leave all unchecked to include every attribute. | All | List of `pa_*` slugs |
| Placement | How and where the panel auto-renders | `shortcode` | `shortcode`, `top_bar` |
| Show product counts | Appends `(n)` next to each category and attribute term | On | On / Off |
| Mobile drawer | Collapses the panel into a "Filters" button + slide-in drawer on phones | On | On / Off |
| Accent colour | CSS custom property `--apf-accent` used for active highlights and slider track | `#1a3a6c` | Any valid hex colour |

Note: in the free-tier ("Asteris Free") build only **Price range** and **Categories** are functional, the attribute, stock, and sale toggles are paid-only.

## Common workflows

### Adding filters to a classic-theme sidebar

1. Make sure your active theme exposes a shop sidebar (most classic themes do — Storefront's is "Sidebar").
2. Go to **Appearance** → **Widgets**.
3. Drag the "Asteris Product Filters" widget into the sidebar area.
4. Optionally set a Title (leave blank for none).
5. The widget will only render on shop, product category, and product tag pages — it self-hides on other archives.

### Adding filters to a block theme

1. Open **Appearance** → **Editor** to enter the Site Editor.
2. Edit the Shop template (or any custom shop page).
3. Add a **Shortcode** block where you want the panel.
4. Paste `[asteris_filters]` and save.
5. The classic Widgets screen does not exist on block themes — shortcode placement is the supported path.

### Switching to a horizontal top bar

1. Go to **Asteris** → **Product Filtering**.
2. Set **Placement** to "Auto: horizontal top bar".
3. Save. The panel will auto-inject via `woocommerce_archive_description` (priority 20) with a fallback hook on `woocommerce_before_shop_loop` (priority 5) for category pages with no description.
4. Remove any manual shortcode/widget you placed earlier to avoid double-rendering.

### Limiting which attributes appear as filters

1. Go to **Asteris** → **Product Filtering**.
2. Under **Product attributes**, untick attributes you do not want as filter groups (e.g. you may have a `pa_supplier` attribute that should not be customer-facing).
3. Save. Only ticked attributes will render. Leaving every box unticked is treated as "include all".

### Sharing a filtered URL

The active filter state is reflected in the query string — `min_price`, `max_price`, `pf_cat`, `pf_stock`, `pf_sale`, `orderby`, and one parameter per attribute taxonomy (e.g. `pa_color=red,blue`). Copying the URL from the address bar after filtering will reproduce the same view for another visitor. This is what powers email links to "Red shoes under $50".

### Restyling with the accent colour

1. Open **Product Filtering** settings.
2. Click the colour picker under **Accent colour**.
3. Pick a hex value matching your brand. The CSS variable `--apf-accent` is written inline on `.apf-wrap` and used by `style.css` for active filter chips, slider thumbs, and the apply button.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Shortcodes

| Shortcode | Parameters | Renders |
|---|---|---|
| `[asteris_filters]` | none | The full filter panel |

Example placement in a page builder Custom HTML block, a block-theme Shortcode block, or a Text widget:

```html
[asteris_filters]
```

### Frontend asset handles

Useful for selective `wp_dequeue_style` / `wp_dequeue_script` calls from a child theme.

| Handle | Type | File |
|---|---|---|
| `asteris-product-filtering` | style | `assets/style.css` |
| `asteris-product-filtering` | script | `assets/script.js` (depends on `jquery`) |

The script is localised under the JS global `apfData` with `ajaxUrl`, `shopUrl`, `currencySym`, and an `i18n` map.

## Troubleshooting

### Filters do not appear on the shop page

The asset enqueue is gated by `is_shop() || is_product_category() || is_product_tag() || is_page()`. If your shop URL is rewritten by a page builder or a custom template, WordPress may not report the page as the shop. Confirm `is_shop()` returns true on the page, or place the shortcode `[asteris_filters]` directly in the template.

### Filters render twice

You probably have both a placement of "Auto: top bar" AND a manual shortcode/widget in place. Open Product Filtering settings and switch placement back to "Manual — shortcode or widget", or remove the manual placement. The `$top_bar_rendered` guard only prevents the auto-injection from doubling itself, not from overlapping with a manual placement.

### Price slider shows 0 to 1000

This is the fallback range used when the `_price` postmeta query returns no rows — most often on a brand new store with no published products, or one where price meta has not been generated. Run **WooCommerce** → **Status** → **Tools** → **Regenerate the product lookup tables**, then reload the shop page.

### Price sort returns the same order as default

The module's `posts_clauses` JOIN runs at priority 99 so it wins over WooCommerce's own price sort. If a third-party plugin reorders or short-circuits `posts_clauses` at a higher priority, that plugin will override Asteris. Check for SearchWP, FacetWP, or custom theme functions hooking into `posts_clauses`.

### Settings will not save

The save handler checks `current_user_can( 'manage_woocommerce' )` and the `asteris_pf_save` nonce. If you see "Permission denied" or "Invalid nonce", the form was posted from an old cached page or by a user without WooCommerce shop manager rights. Hard-refresh the settings page and try again.

## Known plugin conflicts

- **FacetWP, YITH Ajax Product Filter, WOOF, BeRocket Filters** — running any AJAX filter plugin alongside Asteris will produce double filter panels and competing query modifications. Disable the other plugin before activating this module.
- **Custom `posts_clauses` filters at priority > 99** — anything that re-sorts the product query after Asteris will override Asteris's price sort.
- **Aggressive page caches with query-string ignored** — Cloudflare APO and some plugin caches strip filter query parameters from the cache key; filtered views may return the unfiltered cached HTML. Add filter query parameters to the cache bypass rules, or disable HTML caching for shop archives.
- Other conflicts: not yet catalogued conjecturally. If you find one, raise it on the Asteris support forum so it can be added here.

## What is in Free vs Paid

This module ships as a lite version in Asteris Free and a full version in all paid tiers (Starter, Pro, Agency, Founder).

- **Free**: AJAX filtering by category and price range only. Shortcode-only placement.
- **Paid**: everything above, plus
  - Attribute filters (any `pa_*` taxonomy, with Variation Swatches colour/image swatch detection)
  - Stock-status and on-sale filters
  - Sort dropdown integrated into the panel
  - Multi-filter combination across all groups
  - Widget for classic-theme sidebars
  - Auto-placement (horizontal top bar above the shop loop)
  - Mobile drawer UI
  - Accent colour customisation

## Related

- [Variation Swatches module](/docs/modules/variation-swatches) — colour/image term metadata is reused for swatch-style attribute filters
- [SEO module](/docs/modules/seo) — controls indexability of filtered archive URLs
- [All modules](/modules)
- [Migration from YITH Ajax Product Filter](/migrate/from-yith)
- [Migration from WOOF](/migrate/from-yith)

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
