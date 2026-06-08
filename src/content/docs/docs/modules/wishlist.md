---
title: "Wishlist"
description: "Heart-button wishlist for WooCommerce with guest support, shareable URLs, and admin insights — for stores that want customers to save products without forcing a sign-up."
---

## What it does

Adds a heart button beside the Add to Cart form on single product pages and renders a full wishlist via the `[asteris_wishlist]` shortcode. Logged-in customers have their list stored in user meta; guests have theirs stored in the WooCommerce session. When a guest logs in, their session wishlist is merged into their account on `wp_login`.

The module also surfaces admin insights — total wishlists, total items saved, and the top 20 most-wishlisted products — directly on the settings screen, so you can see what your customers want but have not bought yet. Optionally, logged-in customers can generate a shareable URL containing a `?awl_share=` key that lets anyone view their wishlist read-only.

Replaces: **YITH WC Wishlist Premium** (~$94 USD/yr).

## Quick start

1. Go to **Asteris > Modules** and activate **Wishlist**.
2. Open **Asteris > Wishlist** and confirm the button text (default: "Add to Wishlist").
3. Create a WordPress page called "Wishlist" and add the `[asteris_wishlist]` shortcode to it.
4. Back on **Asteris > Wishlist**, pick that page in the **Wishlist page** dropdown and save.
5. (Optional) Tick **Shareable wishlist link** if you want logged-in customers to share their list.
6. Visit any product on the front-end — the heart button appears below the Add to Cart form.

## Settings reference

| Setting | What it does | Default | Valid values |
| --- | --- | --- | --- |
| Button text | Label shown on the wishlist toggle button. | `Add to Wishlist` | Any plain text |
| Show button on single product page | Renders the heart button on `woocommerce_after_add_to_cart_form` at priority 5 (above trust badges). | Enabled | On / Off |
| Wishlist page | The page customers are sent to from the "View wishlist" link. If empty, the module auto-detects any published page containing `[asteris_wishlist]` and caches the result for an hour. | None | Any published page |
| Shareable wishlist link | Generates a 20-char share key in user meta (`asteris_wishlist_share`) and renders a copy-link UI on the wishlist page for logged-in customers. | Disabled | On / Off |

All option keys are stored under `asteris_wishlist_<key>` via the standard Asteris option-name helper.

## Common workflows

### Set up a dedicated wishlist page

The shortcode renders the full wishlist UI, but the module also auto-injects on a configured page even if the shortcode is missing from the content.

1. **Pages > Add New**, title it "Wishlist".
2. Paste `[asteris_wishlist]` into the content (recommended — explicit beats auto-detect).
3. Publish.
4. In **Asteris > Wishlist**, select the page in the **Wishlist page** dropdown.
5. Save. The auto-detect transient `asteris_wishlist_autodetect` is busted whenever pages or this setting are updated.

### Let customers share their wishlists

Useful for gift registries, mood boards, or wedding lists.

1. Tick **Shareable wishlist link** in settings and save.
2. A logged-in customer visits the wishlist page — a "Share your wishlist" block appears with a copy-to-clipboard input.
3. The URL contains `?awl_share=<20-char-key>`. Anyone with the link sees a read-only version (no remove buttons, no add-to-cart unless the product is purchasable and in stock).
4. The share key is stored once per user in `asteris_wishlist_share` user meta and reused on every visit.

### Review what customers want most

Use the built-in insights to drive restock decisions and promotions.

1. Go to **Asteris > Wishlist**.
2. Scroll to **Wishlist Insights** below the settings form.
3. Read the three summary cards (customers with wishlists, total items saved, unique products saved).
4. Below that, the **Most Wishlisted Products** table lists the top 20 products by save count, with stock status and edit links.

Note: insights aggregate from user meta only — guest wishlists stored in WC session are not counted. The query is capped at 2000 users to avoid memory issues on large stores.

### Merge a guest's wishlist on login

This is automatic and needs no configuration. When a guest who has added items to their session wishlist logs in, `merge_on_login()` fires on the `wp_login` hook, merges the session list into `asteris_wishlist` user meta, and clears the session list. Duplicates are deduped via `array_unique`.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Shortcodes

`[asteris_wishlist]` — renders the wishlist UI. No parameters. Reads the current user's wishlist from user meta (logged-in) or WC session (guest). If `?awl_share=<key>` is present in the URL and matches a user with that share key, renders that user's wishlist in read-only mode.

```text
[asteris_wishlist]
```

### Frontend AJAX

The frontend heart button posts to a public AJAX action. It is public because guest wishlists are supported — third-party frontend code may also call it.

| Action | Auth | Purpose |
| --- | --- | --- |
| `asteris_wl_toggle` | `wp_ajax_` + `wp_ajax_nopriv_` | Adds or removes a product ID from the current wishlist. Requires `nonce` (action `asteris_wl_nonce`) and `product_id`. |

Example payload:

```js
jQuery.post(awlData.ajaxUrl, {
  action:     'asteris_wl_toggle',
  product_id: 123,
  nonce:      'NONCE_FROM_BUTTON_DATA_ATTR'
});
```

Success response:

```json
{ "success": true, "data": { "in_wishlist": true, "count": 4 } }
```

### Frontend asset handles

| Handle | Type | Notes |
| --- | --- | --- |
| `asteris-wishlist` | Style | Enqueued on WC pages, cart, checkout, and any singular page. |
| `asteris-wishlist` | Script | jQuery dependency. Localised as `awlData` with `ajaxUrl`, `wishlistUrl`, `i18n`. |

To dequeue on a specific template:

```php
add_action( 'wp_enqueue_scripts', function () {
    if ( is_singular( 'landing-page' ) ) {
        wp_dequeue_style( 'asteris-wishlist' );
        wp_dequeue_script( 'asteris-wishlist' );
    }
}, 99 );
```

## Troubleshooting

### Heart button does not appear on product pages

Confirm **Show button on single product page** is ticked in settings. The button hooks onto `woocommerce_after_add_to_cart_form` at priority 5 — if a theme or another plugin removes that action, the button will not render. Test with Storefront to isolate.

### Clicking the heart does nothing or returns "Security check failed"

The nonce is generated server-side per page render and stored in `data-nonce` on the button. Aggressive page caching (Cloudflare full-page cache, WP Rocket cache) can serve a stale nonce. Exclude the product page from full-page caching, or use a cache plugin that supports nonce refresh via fragment caching.

### "View wishlist" link goes to `#`

The module could not resolve a wishlist URL. Either set **Wishlist page** explicitly in settings, or make sure at least one published page contains `[asteris_wishlist]`. After fixing, the auto-detect transient busts on the next page save or option update.

### Guest wishlist disappears after a few minutes

Guest data lives in the WC session, which is tied to the WC session cookie. If the cookie is dropped (private browsing, strict cookie policy, full-page cache stripping cookies) the wishlist is lost. Ask the customer to create an account, or accept this limitation for guests.

### Shared URL shows "Your wishlist is empty"

The `awl_share` key did not match any user meta. Confirm the **Shareable wishlist link** option is enabled, the sharing user is logged in when they grab their link, and the URL was not truncated when copied.

## Known plugin conflicts

- **YITH WC Wishlist** — deactivate before enabling this module, otherwise both will render heart buttons on the same hooks.
- **TI WooCommerce Wishlist** — same conflict pattern.
- **Aggressive full-page caches** (LiteSpeed Cache, WP Rocket, Cloudflare APO) — must exclude product pages or the nonce will go stale. See Troubleshooting.
- **Themes that strip `woocommerce_after_add_to_cart_form`** — rare, but the button will silently not render. No other conflicts confirmed at time of writing.

## What is in Free vs Paid

Wishlist is a paid-tier module. Available in **Starter**, **Pro**, **Agency**, and **Founder**. It is not part of Asteris Free.

## Related

- [Modules overview](/docs/modules/)
- [Migrating from YITH](/migrate/from-yith)
- [Asteris pricing](/pricing/)
- [Engagement modules](/docs/modules/#engagement)
- [Shortcode reference](/docs/shortcodes/)

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
