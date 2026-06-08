---
title: "Trust Badges"
description: "Displays a configurable row of trust and security badges on WooCommerce product pages, cart and checkout — for store owners who want to lift conversion without paying for a dedicated badge plugin."
---

## What it does

The Trust Badges module renders a row of icon + label badges (Secure Checkout, Money-Back Guarantee, Free Returns, Free Shipping, 24/7 Support, Authentic Products, Easy Exchange, Fast Delivery) below the WooCommerce Add to Cart form on single product pages. Badges are inline SVG — no external image requests, no Google Fonts, no bloat. You pick which of the eight badges show, swap any icon for one of 24 alternatives across four categories (Security, Delivery, Returns, Support), edit the label text and tune four colours (icon, text, background, border).

You can also drop the badges anywhere with the `[asteris_trust_badges]` shortcode — sidebar widget, footer, in-page block, checkout side column via a block theme template part. This module replaces standalone trust-badge plugins that typically cost around $39/year.

## Quick start

1. Activate Asteris Affiliates and enable the Trust Badges module from **Asteris -> Modules**.
2. Open **Asteris -> Trust Badges**.
3. Tick the badges you want under **Badges**. All eight are on by default.
4. Optionally click any badge's icon to pick a different one from the 24-icon library.
5. Edit the label text in the input next to each badge (leave blank to use the default).
6. Adjust the four colours (icon, text, background, border) to match your theme.
7. Save. Badges appear below the Add to Cart button on every single product page.

## Settings reference

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| Show on product pages | Renders badges below the Add to Cart form via `woocommerce_after_add_to_cart_form` | On (`1`) | `1` / `0` |
| Badge style | Layout for each badge cell | `icon_text` | `icon_text`, `icon`, `text` |
| Icon colour | Stroke colour of the SVG icons | `#555555` | Any valid hex colour |
| Text colour | Label text colour | `#555555` | Any valid hex colour |
| Background | Background colour of each badge cell | `#f9f9f9` | Any valid hex colour |
| Border | Border colour of each badge cell | `#e5e5e5` | Any valid hex colour |
| Badges (per-row) | Per-badge enable flag, custom label and icon choice (stored as JSON in a single option) | All 8 enabled with default labels and icons | See list below |

Eight badge slots: `secure`, `guarantee`, `returns`, `shipping`, `support`, `authentic`, `exchange`, `fast`. Each slot stores `enabled` (bool), `label` (text) and `icon_id` (one of 24 icons).

The 24 icons are grouped: **Security** (lock, shield, shield-check, key, verified, check), **Delivery** (truck, package, plane, clock, lightning, map-pin), **Returns** (rotate-ccw, refresh, dollar, credit-card, tag, gift), **Support** (headphones, chat, phone, star, award, heart).

## Common workflows

### Match badges to your store's actual policies

Default labels promise things you may not deliver — "24/7 Support" or "Free Returns" can become a compliance problem in Australia under ACL if the claim is unsubstantiated.

1. Open **Asteris -> Trust Badges -> Badges**.
2. Untick any badge whose claim does not apply to your store.
3. Rewrite labels to match reality — e.g. change "Free Shipping" to "Free shipping over $80", "24/7 Support" to "Mon-Fri email support".
4. Save and spot-check on a product page.

### Place badges in the cart or checkout sidebar

The module's automatic placement is product-pages-only. For cart or checkout, use the shortcode.

1. Turn off **Show on product pages** if you don't want the product-page placement.
2. Edit the relevant template part (block theme) or use a hook-injecting plugin / your child theme.
3. Insert `[asteris_trust_badges]` where you want the badge row to render.
4. The shortcode lazy-enqueues the stylesheet if it hasn't already loaded on the page.

### Restyle the badge bar to match a dark theme

1. Open **Asteris -> Trust Badges -> Colours**.
2. Click each colour swatch — the WordPress core colour picker opens.
3. Set Background to a dark hex (e.g. `#1a1a1a`), Border to a slightly lighter dark, Icon and Text to a light foreground (e.g. `#e5e5e5`).
4. Save. The colours are applied via inline CSS custom properties (`--atb-icon`, `--atb-text`, `--atb-bg`, `--atb-border`) — no stylesheet edits required.

### Switch to icon-only or text-only

1. Open **Asteris -> Trust Badges -> Badge style**.
2. Pick `Icon only` (no labels) for a compact bar, or `Text only` (no icons) for a typography-led look.
3. Save. The wrapper class flips to `.atb-style-icon` or `.atb-style-text` and the unused half of each cell is omitted from the HTML.

### Use a custom icon for one badge slot

1. In **Badges**, click the small icon-preview button next to the badge you want to change.
2. The icon picker expands, showing all 24 icons grouped by category.
3. Click the icon you want — the picker collapses and the preview updates.
4. Save. The hidden `icon_id` field is validated server-side against the library on save; unknown values fall back to the badge's default icon.

## For developers

> **Stability commitment.** Shortcodes, frontend asset handles and CSS custom properties documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, admin asset handles, internal plumbing hooks, option keys) is implementation detail — those may change without notice. DB option keys are listed in the Settings reference table above for diagnostic use only; they are not a stable API.

### Shortcodes

`[asteris_trust_badges]` — outputs the configured badge row. No attributes. Lazy-enqueues the `asteris-trust-badges` stylesheet if it has not already loaded on the page.

```html
[asteris_trust_badges]
```

### Frontend asset handles

| Handle | Type | Where |
|---|---|---|
| `asteris-trust-badges` | Style | Front-end (product pages, or anywhere the shortcode runs) |

To dequeue the front-end stylesheet on pages where you don't want it:

```php
add_action( 'wp_enqueue_scripts', function () {
    wp_dequeue_style( 'asteris-trust-badges' );
}, 99 );
```

### CSS custom properties

The wrapper element exposes four CSS variables for theme overrides without touching plugin CSS:

```css
.atb-wrap {
    --atb-icon: #555;
    --atb-text: #555;
    --atb-bg:   #f9f9f9;
    --atb-border: #e5e5e5;
}
```

### Suppressing the product-page placement

The module attaches its renderer to WooCommerce's core `woocommerce_after_add_to_cart_form` action when "Show on product pages" is on. That core hook is a WooCommerce extension point, not an Asteris one — but the attachment is removable from a theme or custom plugin:

```php
add_action( 'wp', function () {
    if ( is_product() && has_term( 'no-badges', 'product_cat' ) ) {
        $modules = \Asteris\Core\Plugin::instance()->modules();
        $module  = $modules['trust_badges'] ?? null;
        if ( $module ) {
            remove_action( 'woocommerce_after_add_to_cart_form', [ $module, 'render' ] );
        }
    }
} );
```

## Troubleshooting

### Badges don't appear on product pages

Confirm the module is enabled at **Asteris -> Modules** and that **Show on product pages** is ticked. Badges render via `woocommerce_after_add_to_cart_form` — if your theme has replaced WooCommerce's single product template with a fully custom version that doesn't call this action, the hook never fires. Use the `[asteris_trust_badges]` shortcode in a block instead.

### Colours not saving

Colour fields are validated by `sanitize_hex_color()`, which only accepts 3- or 6-digit hex codes prefixed with `#`. Named colours, `rgb()`, `rgba()` and 8-digit hex with alpha are silently rejected and the previous value is kept. Use the colour picker rather than typing values by hand.

### Custom labels reverted to defaults

Empty label inputs fall back to the default label at render time. If you want a badge with no visible text, switch **Badge style** to `Icon only` rather than blanking individual labels.

### Icon picker won't open

The icon picker uses jQuery, loaded by WordPress admin. If a security plugin or "performance" plugin is stripping jQuery from `wp-admin`, the picker stops working. Whitelist jQuery in the admin area.

### Settings save but badge toggles don't persist

The eight per-badge rows are saved by a separate handler (`save_badges()`) on `admin_init`, gated by `check_admin_referer( 'asteris_trust_badges_group-options' )`. If you see toggles silently reverting, an aggressive cache plugin may be serving a stale admin POST response — clear the cache and try again. The handler bails out if the nonce check fails.

## Known plugin conflicts

- **TrustPulse, TrustBadge (Themeisle), WooCommerce Trust Badge** — functional overlap. Disable one or the other to avoid two badge rows stacking under the Add to Cart button.
- **Page-builder product templates (Elementor Pro Single, Divi Theme Builder, Bricks)** — if you've replaced the WooCommerce single product template entirely, `woocommerce_after_add_to_cart_form` may not fire. Use the shortcode in a builder widget instead.
- **Aggressive HTML minifiers** that strip inline `style` attributes will break the per-instance CSS custom properties. Disable inline-style stripping for product pages, or move the four colours into your theme stylesheet.
- Other conflicts are unknown at this stage — if you encounter one, raise it on the Asteris support forum so we can document it here.

## What is in Free vs Paid

This module is identical in Asteris Free and paid tiers. All 8 badge slots, all 24 icons, all 3 styles, all 4 colour controls and the shortcode are available in every tier.

## Related

- [Modules overview](/modules)
- [Stock Urgency](/docs/modules/stock-urgency) — pairs with trust badges to nudge conversion
- [Free Shipping Bar](/docs/modules/free-shipping-bar) — another conversion-lift module (paid tiers)
- [Migrating from a standalone trust-badge plugin](/migrate/from-yith)

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
