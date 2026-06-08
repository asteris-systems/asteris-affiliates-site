---
title: "Delivery Timeline"
description: "Production-and-delivery timeline widget for WooCommerce product pages, aimed at made-to-order shops with lead times measured in weeks."
---

## What it does

Delivery Timeline renders a three-step visual widget (Ordered → Production → Delivered) on selected WooCommerce product pages. It calculates dates from the current day plus a configurable week range, shows an info box with the production window, a delivery date or range, and a shipping line, and ships with a WordPress colour-picker palette so the widget can be made to match the active theme.

The widget targets shops where products are not held in stock — furniture, custom apparel, artisan goods, bespoke joinery, made-to-order signage. Category selection is taxonomy-aware: choosing a parent category automatically includes its children. Three placement modes are available so the widget works on classic WooCommerce themes and on page builders (Elementor, Divi, Bricks, Gutenberg) without modification.

Replaces: YITH WooCommerce Delivery Date ($49/yr) and comparable lead-time announcement plugins.

## Quick start

1. Activate the **Delivery Timeline** module from **Asteris → Modules**.
2. Open **Asteris → Delivery Timeline**.
3. Pick a **Widget position** — leave it on **Before Tabs** if you are unsure, or switch to **Shortcode only** if you want to place the widget yourself.
4. Tick at least one **product category** in the scroll list. Children of selected categories are included automatically.
5. Set the **Lead time range** — for example Min 8 and Max 10 means 8–10 weeks. Set Max to `0` for a single delivery date.
6. Adjust the **Shipping info line** if the default ("Shipping calculated at checkout") does not suit.
7. Visit a product in one of the chosen categories on the front end to confirm the widget renders.

## Settings reference

| Setting | What it does | Default | Valid values |
| --- | --- | --- | --- |
| Widget position | Where the widget is injected on the product page. | `before_tabs` | `before_tabs`, `after_add_to_cart`, `shortcode` |
| Show widget for categories | Product categories that trigger the widget. Children are included automatically. | empty (widget will not render until at least one is selected) | Any `product_cat` term IDs |
| Lead time range — Min | Weeks of production from today. Sets the Production end date. | `8` | 1–52 |
| Lead time range — Max | Upper bound of the delivery window. Set to `0` to display a single delivery date instead of a range. | `10` | 0–52 |
| Shipping info line | Third line shown in the info box (clipboard icon). | `Shipping calculated at checkout` | Any short string |
| Circle background | Background colour of the three step circles. | `#1a1a1a` | Any hex colour |
| Circle icon colour | Stroke colour of the SVG icons inside the circles. | `#ffffff` | Any hex colour |
| Accent / date colour | Colour for the info-box icons and the calculated dates. | `#1a3a6c` | Any hex colour |
| Info box background | Background of the top info box (three rows with icons). | `#f7f7f7` | Any hex colour |
| Text colour | Body text colour inside the widget. | `#1a1a1a` | Any hex colour |

Category selection is capped at **1 category** without a valid Asteris licence. With a licence active, the cap is removed. All other settings are available on every tier where the module ships.

## Common workflows

### Made-to-order furniture shop (8–10 week range)

1. Activate the module and open the settings page.
2. Tick the parent **Furniture** category — all child categories (Sofas, Dining, Beds) are auto-included.
3. Set Min `8`, Max `10`.
4. Leave the shipping line as default or change to "Freight quoted after order".
5. Leave position on **Before Tabs**. Save.

The widget shows production running from today to roughly 8 weeks out, then a delivery window 9–10 weeks out. The info-box first row reads "8–10 weeks for production and shipping".

### Single delivery date (no range)

1. Set **Max** to `0`.
2. Set **Min** to the lead time you want, for example `4`.
3. Save.

The widget hides the range arrows on the Production and Delivered steps and shows a single calculated date on each. The info box reads "4 weeks for production and shipping" and the delivery line drops the range to a single date.

### Pixel-perfect placement in a page builder

1. Set **Widget position** to **Shortcode only — `[asteris_delivery_timeline]`**.
2. Edit the product template in your builder (Elementor product template, Divi Theme Builder, Bricks template).
3. Drop a Shortcode / HTML / Text block where you want the widget.
4. Paste `[asteris_delivery_timeline]` (the Copy button on the settings page copies it for you).
5. Save the template.

The widget will still respect the category filter — products outside the selected categories will render nothing, even if the shortcode is present.

### Matching the widget to a dark theme

1. Open **Widget colours** on the settings page.
2. Set **Info box background** and the step **Circle background** to your theme's surface colour.
3. Set **Text colour** and **Circle icon colour** to a light tint that hits 4.5:1 contrast.
4. Set **Accent / date colour** to a brand accent that reads against the info box background.
5. Save. Colours are injected as CSS custom properties on `.adt-widget`, so they override the bundled stylesheet without any code edits.

### Promoting to multiple categories at once

1. Open **Show widget for categories**.
2. Tick every parent that should trigger the widget — say **Custom Joinery** and **Bespoke Lighting**.
3. Children of each parent are auto-included via `get_term_children()`.
4. Save. Visit one product from each branch to confirm the widget appears.

This avoids ticking every leaf category individually and keeps the setting tidy when the catalogue grows.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Shortcodes

| Shortcode | Output |
| --- | --- |
| `[asteris_delivery_timeline]` | Renders the timeline inline at the shortcode position. Returns an empty string when the current product is not in a selected category, or when not on a product page. |

The shortcode reads the same options as the auto-injected widget — there are no shortcode attributes.

Example (Gutenberg shortcode block, Elementor shortcode widget, or theme template):

```html
[asteris_delivery_timeline]
```

### Frontend asset handles

| Handle | Type | Notes |
| --- | --- | --- |
| `asteris-delivery-timeline` | style | Front-end widget CSS. Only enqueued on product pages that match. |
| `asteris-delivery-timeline` | script | Front-end widget JS. Deferred, footer. |

To dequeue on a specific template:

```php
add_action( 'wp_enqueue_scripts', function () {
    wp_dequeue_style( 'asteris-delivery-timeline' );
    wp_dequeue_script( 'asteris-delivery-timeline' );
}, 100 );
```

## Troubleshooting

### The widget does not appear on a product page

Confirm the product belongs to one of the ticked categories (or a child of one). The module returns early in both `render()` and `enqueue_assets()` when `product_matches()` returns false, so no CSS or JS will load if the product is out of scope. Also check that at least one category is selected — an empty selection disables the widget entirely.

### The widget appears in the wrong place on a builder-built product page

Switch **Widget position** to **Shortcode only** and drop `[asteris_delivery_timeline]` exactly where you want it. **Before Tabs** uses JavaScript injection that targets the WooCommerce tabs container, which some builders replace or remove. **After Add to Cart** relies on the native single-product flow, which builders often skip.

### Dates look wrong by one or two days

Dates are computed in the visitor's browser using their local clock, then formatted from JavaScript. A visitor in a different timezone from the shop will see slightly different dates. This is intentional — server-rendered dates would not match the shopper's expectation of "today". If consistency is critical, set Max to `0` and use a single date that gives a buffer.

### Only one category can be selected

This is the unlicensed cap. Activate an Asteris licence under **Asteris → Licence** and reload the settings page; the cap lifts to unlimited.

### Colour pickers do not load on the settings page

The admin hook check looks for `asteris` in the current admin page hook. If a custom admin menu plugin renames Asteris pages, the colour pickers will not enqueue. Remove the menu rename, or enqueue `wp-color-picker` manually for that page.

## Known plugin conflicts

- Other "delivery date" plugins (YITH WC Delivery Date, Order Delivery Date for WooCommerce) will render their own widget alongside this one. Deactivate them before enabling Delivery Timeline.
- Aggressive HTML/CSS minifiers that strip inline `<style>` tags can remove the injected CSS custom properties. Whitelist `.adt-widget` if that happens.
- Page builders that replace the entire single-product template may bypass the `wp_footer` injection — use the shortcode in those builders.
- No other specific conflicts are confirmed at time of writing. Report regressions via the Asteris support forum.

## What is in Free vs Paid

Delivery Timeline is a paid-tier module. Available in Starter, Pro, Agency, and Founder. The unlicensed install is capped at one product category; a valid licence removes the cap.

## Related

- [Asteris pricing and tiers](/pricing/)
- [Free vs Paid comparison](/docs/free-vs-paid/)
- [Module catalogue](/docs/modules/)
- [Shortcode reference](/docs/shortcodes/)
- [Licence activation guide](/docs/licensing)

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
