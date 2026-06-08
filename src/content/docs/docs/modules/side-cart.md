---
title: "Side Cart"
description: "Slide-out cart drawer for WooCommerce, for stores that want a faster add-to-cart flow without forcing customers onto a separate cart page."
---

## What it does

Side Cart replaces the WooCommerce "redirect to cart" interruption with a drawer that slides in from the side of the page when a customer adds a product. The drawer shows line items, unit prices, a quantity stepper, line removal, the cart subtotal, and a free-shipping progress bar (when the Free Shipping Bar module is enabled). It works with both classic WooCommerce add-to-cart flows and the WooCommerce Blocks Product Collection block.

The module also injects a cart icon (with a live count badge) into the theme's primary navigation menu, or as a floating bottom-right button if your theme has no nav to inject into. Clicking the icon, or adding any product, opens the drawer. Cart state stays synchronised with WooCommerce fragments, so any other cart widget on the page updates at the same time.

**Replaces:** CartFlows Cart ($189/yr), FunnelKit Cart ($99/yr), WooCommerce Side Cart ($79/yr).

## Quick start

1. In WP admin, go to **Asteris Affiliates → Modules** and enable **Side Cart**.
2. Go to **Asteris Affiliates → Side Cart** (settings tab).
3. Choose **Position** (slide from right or left).
4. Decide whether to **Auto-open** the drawer on add-to-cart (recommended on) and whether to inject a **Cart icon in header** or show a **Floating cart button**.
5. Save settings.
6. Open the storefront, add a product to cart, confirm the drawer opens and shows the item.
7. (Optional) Enable the **Free Shipping Bar** module and set a threshold to make the progress bar appear inside the drawer.

## Settings reference

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| Auto-open | Opens the drawer automatically when a product is added to cart | On (`1`) | `1`, `0` |
| Position | Side of the viewport the drawer slides in from | `right` | `right`, `left` |
| Cart icon in header | Injects a cart icon with live count badge into the primary nav | On (`1`) | `1`, `0` |
| Floating cart button | Shows a floating bottom-right cart button | Off (`0`) | `1`, `0` |
| Free shipping bar | Shows the free-shipping progress bar inside the drawer | On (`1`) | `1`, `0` |

The option keys in `wp_options` are `asteris_side_cart_auto_open`, `asteris_side_cart_position`, `asteris_side_cart_show_header_cart`, `asteris_side_cart_show_cart_button`, and `asteris_side_cart_show_free_ship`.

Threshold and colour for the free-shipping bar are owned by the **Free Shipping Bar** module (`asteris_free_shipping_bar_threshold`, `asteris_free_shipping_bar_mini_cart_pos`). Side Cart only toggles whether to render it.

## Common workflows

### Replace the WooCommerce cart-page redirect with the drawer

WooCommerce's default behaviour on add-to-cart is either a page reload with a notice or a redirect to the cart page. The drawer is a less disruptive alternative.

1. In **WooCommerce → Settings → Products**, turn off **Redirect to the cart page after successful addition**.
2. In **Asteris Affiliates → Side Cart**, turn on **Auto-open**.
3. Add a product from the shop archive. The drawer opens; the page does not navigate.
4. On the single-product page, when "Redirect to cart" is off, WooCommerce renders a `.woocommerce-message` notice — the drawer detects this on load and opens.

### Use the drawer with the WooCommerce Blocks Product Collection block

Block-based themes and the Product Collection block do not fire jQuery `added_to_cart`. Side Cart subscribes to the `wc/store/cart` data store and opens the drawer when the cart item count increases.

1. Confirm **Auto-open** is enabled.
2. Place a Product Collection block on a page with the "Add to Cart" button on each card.
3. Click **Add to Cart** on any card. The drawer opens with the new item.

### Inject a cart icon into a theme that has no header cart

Themes like Twenty Twenty-Five and many block themes ship without a built-in cart icon.

1. Enable **Cart icon in header**.
2. If the theme exposes its nav via `wp_nav_menu()`, the icon injects via PHP into the first non-footer menu.
3. If the theme uses a block-based navigation, the JavaScript fallback locates the first header `<ul>` and appends the icon there.
4. If neither succeeds (rare custom themes), enable **Floating cart button** instead.

### Adjust quantity or remove items inside the drawer

The drawer's quantity stepper and trash icon both call admin-ajax with a nonce; no page reload is required.

1. Open the drawer with at least one item.
2. Press the **+** or **−** button to change quantity. The drawer dims, posts to `asteris_sc_update_qty`, and replaces the inner HTML.
3. Press the trash icon to remove a line. The drawer posts to `asteris_sc_remove`.
4. The drawer also triggers `wc_fragment_refresh`, so any other cart widgets on the page update.

### Show free-shipping progress inside the drawer

The progress bar pulls its threshold from the Free Shipping Bar module first, then falls back to the lowest enabled WooCommerce free-shipping zone method.

1. Enable the **Free Shipping Bar** module.
2. Set a positive **Threshold** in that module's settings.
3. In Side Cart settings, ensure **Free shipping bar** is on.
4. Choose **top** or **bottom** position in the Free Shipping Bar module (`asteris_free_shipping_bar_mini_cart_pos`).

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Frontend asset handles

| Handle | Type | File |
|---|---|---|
| `asteris-side-cart` | style | `assets/style.css` |
| `asteris-side-cart` | script | `assets/script.js` (depends on `jquery`) |

To dequeue the drawer JS conditionally (for example on a page where you do not want it), hook `wp_enqueue_scripts` at priority 100 and call `wp_dequeue_script( 'asteris-side-cart' )`. The matching stylesheet handle is the same.

The script's internal `ascData` localised object (`ajaxUrl`, `nonce`, `autoOpen`, `showHeaderCart`, `cartCount`) and the `asteris_sc_remove` / `asteris_sc_update_qty` AJAX handlers are implementation detail used only by the drawer's own UI — do not call them from third-party code.

## Troubleshooting

### Drawer does not open on add-to-cart from a block theme

If you are using the WooCommerce Blocks Product Collection block, the drawer relies on the `wc/store/cart` data store being available. Open browser DevTools and confirm `window.wp.data.select('wc/store/cart')` returns an object on the page. If it does not, the block scripts have not loaded — check that WooCommerce Blocks is up to date and that no optimisation plugin is stripping the WP Data store from front-end pages.

### Two cart icons appear in the header

The PHP filter `wp_nav_menu_items` and the JS fallback both check for an existing `.asc-header-cart-btn` before adding a new one, and the JS also bails if it detects a known theme cart selector (Astra, GeneratePress, Elementor, Storefront, WC Mini Cart Block, and generic `header a[href*="/cart"]`). If you still see duplicates, your theme is exposing its cart link through a selector not in the list. Disable **Cart icon in header** and the floating button is enough; otherwise file a support request with the theme name and we will extend the selector list.

### Quantity stepper or remove button does nothing

Both AJAX endpoints call `check_ajax_referer( 'asteris_sc_nonce', 'nonce' )`. If your install has aggressive page-caching that serves the cached `ascData` nonce to logged-out users, the nonce becomes stale after 24 hours and AJAX calls 403. Exclude pages that render the drawer from full-page caching, or shorten your cache TTL to under the nonce lifetime.

### Drawer opens but is empty

`WC()->cart` must be available during `wp_footer`. Some loader plugins defer WooCommerce initialisation until after the footer renders, leaving `WC()->cart` null. Confirm WooCommerce is loaded before `wp_footer` runs, or disable the offending optimisation/lazy-init plugin for cart-bearing pages.

### Theme's existing cart icon still opens the theme's own drawer

The JS intercepts a list of known theme cart selectors using a capture-phase listener (so it runs before React handlers on the WC Mini Cart Block). If a custom theme uses a selector outside that list, add a small snippet that calls `document.querySelector('[data-asc-open]').click()` from your theme's cart click handler, or disable the theme's cart icon in its customiser and let Side Cart inject its own.

## Known plugin conflicts

- **CartFlows Cart, FunnelKit Cart, XOO Aero Side Cart, WooCommerce Side Cart:** these provide their own slide-out drawer. Run only one at a time — deactivate the other before enabling Side Cart.
- **WooCommerce Blocks "Mini Cart" block:** Side Cart intercepts clicks on the Mini Cart block button and opens its own drawer instead. If you genuinely want the Block Mini Cart, disable Side Cart.
- **Aggressive full-page caches (WP Rocket "Cache Logged-in Users", LiteSpeed Cache aggressive ESI):** can serve stale nonces to the front end. Exclude cart/checkout pages and any page with an add-to-cart button, or use the cache plugin's ESI/fragment options.
- **Page builders with their own cart popovers (Elementor Pro Menu Cart, Bricks Cart element):** behaviour with these is not formally tested. If you observe conflicts, please email support@asterisaffiliates.com with the theme and builder versions.

## What is in Free vs Paid

Side Cart is a paid-tier module. Available in **Starter, Pro, Agency, and Founder**. It is not included in Asteris Free.

## Related

- [Free Shipping Bar module](/docs/modules/free-shipping-bar) — owns the threshold and colour for the progress bar shown inside the drawer.
- [Trust Badges module](/docs/modules/trust-badges) — pairs with the drawer for checkout-stage reassurance.
- [Stock Urgency module](/docs/modules/stock-urgency) — surface low-stock messaging on product pages before the drawer opens.
- [All modules](/modules) — full list of what's in Asteris Affiliates.
- [Pricing](/pricing) — Starter, Pro, Agency, and Lifetime tiers.

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
