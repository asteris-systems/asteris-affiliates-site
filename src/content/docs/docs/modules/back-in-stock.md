---
title: "Back in Stock"
description: "Email-capture form on out-of-stock WooCommerce products that automatically notifies subscribers when stock returns — for stores that lose sales to sold-out items."
---

## What it does

Back in Stock adds a small email-capture form to the single-product page whenever a WooCommerce product is out of stock. Customers leave their email address, the plugin stores them as a private custom post type (`asteris_bis_sub`), and the moment WooCommerce reports stock as available again the module dispatches a plain-text notification email through `wp_mail()` and flips that subscriber's status to `notified`.

The module supports simple, external, and grouped products (form shows only when the product is out of stock) and variable products (the form is rendered hidden and revealed by JavaScript when an out-of-stock variation is selected). Restock detection hooks both `woocommerce_product_set_stock` and `woocommerce_product_set_stock_status` (plus the matching variation hooks), so changes made through the WooCommerce admin, REST API, or a stock-import plugin all trigger notifications.

It replaces **WooCommerce Waitlist** ($79/yr) and **YITH Waiting List** ($79/yr).

## Quick start

1. Activate **Back in Stock** in **WooCommerce → Asteris** (the module list).
2. Open **WooCommerce → Asteris → Back in Stock** to set form heading, button text, success message, and the notification email subject and body.
3. Optionally set a custom From name and From email — leave blank to use the site name and the WordPress admin email.
4. Edit any product, set its stock status to **Out of stock**, then view the product on the front-end. The capture form will render below the price.
5. Subscribe a test email, then change the product back to **In stock** and save. The subscriber should receive a notification within the same request cycle.
6. Review subscribers any time at **WooCommerce → Back-in-Stock** (a CPT admin screen with status, email, product, and notified-at columns).

## Settings reference

All options live under the `asteris_back_in_stock_*` option namespace and are sanitised on save.

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| Form heading | Heading rendered above the capture form on the product page | "Email me when back in stock" | Plain text |
| Button text | Label on the submit button | "Notify me" | Plain text |
| Success message | Message shown after a successful subscription | "Got it — we'll email you the moment this is back." | Plain text |
| Notification email subject | Subject line of the restock email; supports `{product}`, `{url}`, `{site_name}` placeholders | "Good news! \"{product}\" is back in stock" | Plain text |
| Notification email body | Body of the restock email; supports `{product}`, `{url}`, `{site_name}` placeholders | Multi-line default with the three placeholders | Plain text / multi-line |
| From name | Override for the email From name | Empty (falls back to site name) | Plain text |
| From email | Override for the email From address | Empty (falls back to WordPress admin email) | Valid email |

## Common workflows

### Capturing demand on a sold-out product

1. Confirm the product's stock status is **Out of stock** (manage-stock enabled with quantity 0, or stock status set manually).
2. The form is appended to the product summary at priority 35 of `woocommerce_single_product_summary`.
3. Customer enters an email and submits; the AJAX handler `asteris_bis_sub` validates the nonce, dedupes against existing pending subscribers for the same product/variation/email combination, and inserts a new `asteris_bis_sub` post on success.
4. The customer sees the configured success message. Bots that fill the honeypot field receive a silent success.

### Notifying subscribers when stock returns

1. Set the product back to **In stock** (manually, via a stock-import, or via the WooCommerce REST API).
2. WooCommerce fires `woocommerce_product_set_stock_status` (and/or `woocommerce_product_set_stock`); the module checks `is_in_stock()` is true.
3. The module queries all `pending` subscribers for that product (and exact variation, if applicable) and sends each one a single email via `wp_mail()`.
4. On a successful send, the subscriber's status flips to `notified` and `_abis_notified_at` records the timestamp. Failed sends remain `pending` and will retry on the next stock-change event.

### Handling variable products

1. Variable products always render the form (hidden) on the product page so the JavaScript can swap variation IDs without a page reload.
2. When a customer selects an out-of-stock variation, the bundled `script.js` reveals the form and populates the hidden `variation_id` field.
3. Subscriptions are scoped to the exact variation — a customer who wants the red Small does not get notified about the blue Large.

### Reviewing demand to inform purchasing

1. Open **WooCommerce → Asteris → Back in Stock** settings; below the settings form is a **Back-in-Stock Insights** panel.
2. The panel shows totals for pending vs notified subscribers and lists the top 10 most-requested out-of-stock products by pending count.
3. Use this to prioritise reordering — products with the highest pending counts are the ones losing sales now.

### Auditing or exporting subscribers

1. Go to **WooCommerce → Back-in-Stock** for the full CPT admin list.
2. Columns show status (Pending/Notified pill), email (mailto link), product (linked to the product editor), subscribed date, and notified date.
3. The CPT is registered with `'create_posts' => 'do_not_allow'` — subscribers can only be created via the front-end form, never manually in admin.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Frontend asset handles

| Handle | Type | Loaded on |
|---|---|---|
| `asteris-back-in-stock` | Style | Single product pages only |
| `asteris-back-in-stock` | Script | Single product pages only (depends on `jquery`) |

The script is localised with `abisData` containing `ajaxUrl` and an `i18n` map (`error`, `invalid`). Dequeue either handle on pages where you don't want the form rendered.

### WooCommerce integration points (informational)

The module attaches to standard WooCommerce hooks — these are not Asteris extension points but are listed so you know what to expect when overriding theme templates or chaining stock-change behaviour:

- `woocommerce_single_product_summary` (priority 35) — form render
- `woocommerce_product_set_stock`, `woocommerce_variation_set_stock` — restock dispatch
- `woocommerce_product_set_stock_status`, `woocommerce_variation_set_stock_status` — restock dispatch

The frontend subscribe submission goes through `admin-ajax.php` and is part of the module's own form contract — not a documented public API. Don't call it from third-party code; the action name, nonce, and payload shape may change between minor versions.

## Troubleshooting

### Form is not appearing on an out-of-stock product

Confirm the product really is out of stock (`$product->is_in_stock()` returns false). For simple/external/grouped products the form is only rendered when stock is unavailable. Themes that replace `woocommerce_single_product_summary` with a custom template will also suppress the form — check the theme overrides in `yourtheme/woocommerce/single-product/`.

### Notifications never arrive after restock

The module uses `wp_mail()` — if your site cannot send mail, neither can this module. Install an SMTP plugin (FluentSMTP, WP Mail SMTP, etc.) and run a deliverability test. Check **WooCommerce → Back-in-Stock** for the subscriber row: if status is still **Pending** after a confirmed restock, `wp_mail()` returned false. If status flipped to **Notified** but no email arrived, the mail left WordPress and was either filtered as spam or rejected by the recipient server.

### Variable product form does not appear when selecting a variation

The form is rendered hidden and revealed by JavaScript. Confirm the `asteris-back-in-stock` script handle is loading and that no other plugin is breaking `jquery` or the `found_variation` WooCommerce event. Disable other front-end JS plugins to isolate.

### Subscriptions appear to fail silently

The AJAX handler returns `wp_send_json_success()` for honeypot hits to defeat bots. If a legitimate browser auto-fills the hidden `abis_hp` field, the subscription will silently no-op. Check the network tab — a true success will also have inserted a CPT row visible in **WooCommerce → Back-in-Stock**.

### "Security check failed" message

The `asteris_bis_nonce` is generated when the page renders and lifetimes match WordPress nonce defaults (12–24 hours). Page caching (LiteSpeed, WP Rocket, Cloudflare full-page cache) can serve a stale nonce. Exclude single-product pages from full-page caching, or configure your cache plugin to refresh nonces.

## Known plugin conflicts

- **Other back-in-stock plugins** (WooCommerce Waitlist, YITH Waiting List, ATKP Back in Stock) — disable them; running two systems will double-email subscribers and double-render the form.
- **Aggressive page caches** that cache logged-out single-product HTML for hours can serve stale nonces — see troubleshooting above.
- **Email-deferring plugins** that intercept `wp_mail()` and queue sends out-of-process are compatible in principle but will delay the moment the customer hears about the restock; we have not specifically tested with FluentCRM or MailPoet at this stage.
- No other specific conflicts are known. Report any at the Asteris support forum.

## What is in Free vs Paid

Back in Stock is a paid-tier module. Available in **Starter**, **Pro**, **Agency**, and **Founder** tiers. There is no lite version in Asteris Free.

## Related

- [Module overview](/docs/modules/) — full module catalogue
- [Asteris Free vs Paid](/free-vs-paid/) — what is included in the free plugin
- [Migration: WooCommerce Waitlist](/migrate/from-yith) — switching from WooCommerce Waitlist to Asteris
- [Migration: YITH Waiting List](/migrate/from-yith) — switching from YITH
- [Pricing](/pricing/) — tier comparison

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
