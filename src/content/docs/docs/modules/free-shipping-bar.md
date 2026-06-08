---
title: "Free Shipping Bar"
description: "Animated progress bar that shows shoppers how close their cart is to your free-shipping minimum — for WooCommerce stores that already offer a free-shipping threshold."
---

## What it does

The Free Shipping Bar reads your WooCommerce shipping zones, finds the lowest free-shipping minimum across all zones (including "Rest of World"), and renders a live progress bar on the cart, checkout, mini cart and optionally as a floating banner. The bar updates as the cart subtotal changes — both on classic WooCommerce pages (via the `woocommerce_add_to_cart_fragments` system) and on the WooCommerce Blocks cart/checkout (via the `wc/store/cart` data store subscriber).

When the cart subtotal meets or exceeds the threshold, the bar swaps the "Spend X more" copy for a celebratory "achieved" message and runs a brief shimmer animation on the fill.

This module replaces paid add-ons in the WooCommerce ecosystem including **WooCommerce Cart Notices** (~USD 79/yr) and **Advanced Notifications** (~USD 79/yr).

## Quick start

1. Activate the Free Shipping Bar module from **WP Admin → Asteris → Modules**.
2. Confirm WooCommerce already has a free-shipping method configured with a "Minimum order amount" under **WooCommerce → Settings → Shipping → Zones**. If you do not have one yet, add it now.
3. Open **WP Admin → Asteris → Free Shipping Bar**.
4. Leave **Auto-detect from WooCommerce shipping settings** ticked. The settings screen will show the detected threshold in green.
5. Optionally adjust the progress copy, achieved copy, position and colours.
6. Save settings, then view your cart page on the front end — the bar appears above the cart by default.

If you do not run a free-shipping method through WooCommerce zones, untick auto-detect and set a manual threshold in the dollar field instead.

## Settings reference

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| Auto-detect threshold | Reads the lowest `min_amount` from any enabled `WC_Shipping_Free_Shipping` method across all zones | On | On / Off |
| Manual threshold | Fallback used when auto-detect is off or no zone minimum is found | `50` | Any positive number |
| Progress message | Copy shown while the cart is below threshold. `{amount}` is replaced with the remaining amount, formatted via `wc_price()` | `Spend {amount} more for free shipping!` | Plain text, KSES-allowed HTML |
| Achieved message | Copy shown once the cart meets/exceeds threshold | `You've unlocked free shipping! 🎉` | Plain text, KSES-allowed HTML |
| Position | Where the bar renders on cart/checkout | `above_cart` | `above_cart`, `below_totals`, `floating`, `shortcode` |
| Show in mini cart | Renders the bar inside the side cart drawer / mini-cart widget | On | On / Off |
| Mini-cart position | Placement inside the drawer | `bottom` | `top`, `bottom` |
| Bar fill colour | CSS custom property `--afsb-bar` | `#2ecc71` | Any hex colour |
| Background colour | CSS custom property `--afsb-bg` | `#eafaf1` | Any hex colour |
| Text colour | CSS custom property `--afsb-text` | `#155a2f` | Any hex colour |

All settings persist via the standard WP options API (one row per setting, prefixed `asteris_free_shipping_bar_…`) and are sanitised on save (`sanitize_hex_color`, `sanitize_text_field`, position whitelist).

## Common workflows

### Match the bar to your free-shipping rule automatically

1. In **WooCommerce → Settings → Shipping → Zones**, open the zone that covers your customers.
2. Add or edit a **Free shipping** method, set **Free Shipping Requires** to *A minimum order amount*, and enter the dollar value.
3. In **Asteris → Free Shipping Bar**, confirm **Auto-detect** is ticked. The settings screen shows the detected value in green.
4. Save. If you later change the WooCommerce minimum, the bar follows it automatically — no need to revisit Asteris.

### Use a manual threshold for a promotion

1. Untick **Auto-detect from WooCommerce shipping settings**.
2. Enter your promotional value in the **Manual threshold** field (for example `75` for a "free shipping over $75" campaign).
3. Save. The bar now uses your manual figure regardless of what is configured in WooCommerce zones.
4. After the promotion, re-tick auto-detect to fall back to your real shipping rule.

### Place a floating banner across the whole store

1. Set **Position** to *Floating bottom banner (all pages)*.
2. Save. The bar slides up from the bottom on every page where the cart is non-empty.
3. The body element gets `has-afsb-floating` (52 px of bottom padding) so page content is not obscured.
4. The banner auto-hides when the cart is empty — there is no admin toggle needed for that.

### Drop the bar on a custom landing page

1. Set **Position** to *Shortcode only* (or keep any other position — the shortcode works regardless).
2. Edit the page and add the shortcode `[asteris_free_shipping_bar]` wherever you want the bar.
3. Assets are enqueued on demand by the shortcode handler — no separate enqueue step is needed.

### Show the bar in the WooCommerce Blocks mini cart

1. Ensure **Show in mini cart / side cart flyout** is ticked.
2. Choose **Top** or **Bottom** for placement inside the drawer.
3. The module hooks `render_block` to inject the bar adjacent to `woocommerce/mini-cart-shopping-button-block`, and a `MutationObserver` in `script.js` catches the drawer being lazily rendered on first open.

### Recolour the bar to match your brand

1. In the **Widget colours** row, click each colour swatch and pick a hex value via the WP colour picker.
2. The preview block below the swatches updates live as you change values or rewrite the progress message.
3. Save. The colours are emitted as inline CSS custom properties (`--afsb-bar`, `--afsb-bg`, `--afsb-text`) on `.afsb-wrap` and inherited by every bar instance on the page.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Shortcodes

| Shortcode | Parameters | Notes |
|---|---|---|
| `[asteris_free_shipping_bar]` | None | Renders the bar at the point of insertion. Enqueues `asteris-free-shipping-bar` style + script on demand. Returns empty string if the WooCommerce cart is unavailable or the threshold is zero. |

Example inside a block or classic editor:

```text
[asteris_free_shipping_bar]
```

### Frontend asset handles

Useful if you need to dequeue or replace assets in a custom theme.

| Handle | Type | File |
|---|---|---|
| `asteris-free-shipping-bar` | Style | `assets/style.css` (plus an inline style block defining `--afsb-bar`, `--afsb-bg`, `--afsb-text`) |
| `asteris-free-shipping-bar` | Script | `assets/script.js` (depends on `jquery`, loaded in footer) |

## Troubleshooting

### The bar does not appear at all

Most often the threshold resolves to zero. The module bails out of `build_html()` when `effective_threshold() <= 0`. Either tick **Auto-detect** and confirm WooCommerce has a free-shipping method with a positive `min_amount`, or untick auto-detect and enter a manual threshold. If both are set and the bar still does not appear, check that the cart object is initialised — the bar requires `WC()->cart` to exist, which means the WooCommerce front-end must be loaded.

### The bar appears but the percentage never updates on the block cart

The Blocks-aware live updater only runs on pages where it detects a `.wc-block-cart`, `.wc-block-checkout`, `.wp-block-woocommerce-cart` or `.wp-block-woocommerce-checkout` element. If you have embedded the block cart inside a custom wrapper that strips those classes, the subscriber stays idle to avoid resetting classic-rendered bars to zero. Add one of the expected classes to your wrapper, or use the `[asteris_free_shipping_bar]` shortcode instead.

### Colours saved in the admin do not show on the front end

`sanitize_hex_color()` returns null for malformed values, which falls back to defaults. Re-open the colour picker, confirm you have a valid 3- or 6-character hex (with `#`), and save again. If colours are correct in the option but still not applied, check that `wp_add_inline_style()` is not being stripped by a caching plugin that minifies inline CSS.

### Mini cart bar is missing in a third-party theme

The injector targets specific selectors (`.wc-block-mini-cart__footer-actions`, `.wc-block-mini-cart__footer`, `.woocommerce-mini-cart__buttons`). Themes that ship a fully custom mini cart with bespoke class names will not match. Use the shortcode inside your custom template instead, or file a request listing the theme so we can add a selector.

### "Spend {amount} more" appears literally with the placeholder visible

The `{amount}` placeholder is only substituted in the progress message, not the achieved message. Verify the literal text `{amount}` is in the **Progress message** field, not the **Achieved message** field. The replacement runs through `wc_price()` so it inherits your WooCommerce currency formatting.

## Known plugin conflicts

- Aggressive HTML minifiers that strip inline `<style>` blocks may remove the inline custom-property declarations and revert colours to defaults. Whitelist the `asteris-free-shipping-bar` inline style.
- Themes that replace the WooCommerce Blocks mini cart with a hand-rolled drawer may break auto-injection — use the shortcode in those templates.
- Other "free shipping bar" plugins (Advanced Free Shipping Bar, WooCommerce Cart Notices) will double up if left active alongside this module. Deactivate them once Asteris is configured.
- Page caching plugins that cache logged-out cart fragments aggressively can stale-bar your visitors. Exclude `wc-ajax=get_refreshed_fragments` from cache (default in most stacks).

Other conflicts are not currently known. If you find one, report it via support so we can list it here.

## What is in Free vs Paid

Free Shipping Bar is a paid-tier module. It is available in Starter, Pro, Agency and Founder plans. It is not bundled with Asteris Free.

## Related

- [Side Cart module](/docs/modules/side-cart) — pairs the bar with a slide-out cart drawer
- [Pricing](/pricing/) — tier comparison
- [Module roadmap](/docs/roadmap/) — what is queued next
- [WooCommerce free-shipping documentation](https://woocommerce.com/document/free-shipping/) — upstream reference for the zone configuration this module reads from
- [Migrating from WooCommerce Cart Notices](/migrate/from-yith)

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
