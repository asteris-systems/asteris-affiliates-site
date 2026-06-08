---
title: "Sequential Order Numbers"
description: "Replaces WooCommerce's random post-ID order numbers with clean, prefix/suffix-padded sequential numbers, for stores that need predictable invoice numbering."
---

## What it does

WooCommerce assigns each order the next available WordPress post ID. Because posts, pages, products, drafts, and revisions all draw from the same counter, those IDs are unpredictable and have visible gaps. The Sequential Order Numbers module assigns its own counter to every new order at the moment of creation, stores the value as order meta (`_asteris_order_number`), and filters every place WooCommerce displays an order number so the formatted version is shown to customers, in admin, in emails, and in invoices.

Numbers are assigned atomically at the database level (`UPDATE … SET option_value = option_value + 1`) so concurrent checkouts cannot collide. Assignment is idempotent — re-running the hooks on an existing order does nothing. The module covers classic checkout, Store API / blocks checkout, and admin-created orders.

**Replaces:** Skyverge WooCommerce Sequential Order Numbers Pro (USD $79/yr).

## Quick start

1. In WP Admin, go to **Asteris → Sequential Order Numbers**.
2. Set **Starting number** to the value you want the very first order to use (default `1001`).
3. Set a **Prefix** if you want one — e.g. `ORD-` or `INV-2026-`. Leave blank for plain numbers.
4. Set **Minimum digits (padding)** — `4` will display the number `42` as `0042`. Set to `0` for no padding.
5. Click **Save Settings**.
6. Place a test order on the front end. The order number shown on the thank-you page, in the order email, and in **WooCommerce → Orders** will use the new format.
7. Return to the settings page — the **Status** panel shows the live counter, orders numbered so far, and a format preview.

## Settings reference

| Setting | What it does | Default | Valid values |
|---------|--------------|---------|--------------|
| Starting number | The number assigned to the first order. Used once only — changing it after orders exist does not renumber or affect the live counter. | `1001` | Integer 1 – 9999999 |
| Prefix | Text prepended to every displayed order number. Applies retroactively to existing orders too (display-only). | empty | Any text (sanitised with `sanitize_text_field`) |
| Suffix | Text appended after the number. Most stores leave blank. | empty | Any text (sanitised with `sanitize_text_field`) |
| Minimum digits (padding) | Left-pads the number with zeros until it reaches this digit count. `0` disables padding. | `4` | Integer 0 – 10 |

All four settings live in the `wp_options` table under keys built from `option_name('start_number')`, etc. (the module helper prefixes each with `asteris_sequential_order_numbers_`). The live counter is stored separately under `next_number` (non-autoloaded).

## Common workflows

### Migrating from a previous order-numbering plugin

If you already had Skyverge, WPFactory, or a similar plugin assigning numbers, decide whether you want to continue the existing sequence or start fresh.

1. Identify the highest number already issued by the old plugin.
2. Deactivate the old plugin.
3. Activate the Sequential Order Numbers module.
4. Set **Starting number** to the next value above the old highest (e.g. old max was `1847`, set start to `1848`).
5. Place a test order and confirm the number assigned.

Existing orders keep whatever number they already had in their meta — the display filter only formats numbers that exist.

### Setting up year-based invoice numbers

Australian and EU stores sometimes need year-stamped invoice numbers for accounting handover.

1. Set **Prefix** to `INV-2026-`.
2. Set **Starting number** to `1`.
3. Set **Padding** to `5` for `INV-2026-00001`.
4. Each new financial year, return to the settings and update the prefix to the new year. The counter continues — if you want it to reset, see the next workflow.

### Resetting the counter for a new year

The module does not auto-reset on a schedule. To reset manually:

1. Note the current next-number value shown in the **Status** panel.
2. Edit `wp_options` directly (via phpMyAdmin or WP-CLI) and delete the row where `option_name = 'asteris_sequential_order_numbers_next_number'`.
3. On the settings page, set **Starting number** to your desired new start (e.g. `1`).
4. The next order placed will re-initialise the counter from that start value.

WP-CLI: `wp option delete asteris_sequential_order_numbers_next_number`.

### Re-formatting all existing orders

Because the display filter runs on every render, changing prefix, suffix, or padding takes effect immediately for every order — past and future. No bulk-update job runs. Refresh the orders list to confirm.

### Admin-created orders

Orders created via **WooCommerce → Orders → Add Order** receive a sequential number through the `woocommerce_new_order` hook. No extra action is required.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

This module currently exposes no Asteris-specific hooks, filters, REST endpoints, or shortcodes. It hooks into standard WooCommerce extension points (`woocommerce_order_number`, `woocommerce_checkout_order_created`, `woocommerce_store_api_checkout_order_processed`, `woocommerce_new_order`) — see the WooCommerce developer docs for those.

### Order meta

The raw integer is stored as order meta under the key `_asteris_order_number`. You can read it on any `WC_Order`:

```php
$order  = wc_get_order( $order_id );
$number = $order->get_meta( '_asteris_order_number' );
```

To get the formatted (prefix/padded/suffix) version, use the standard WooCommerce accessor — the module's filter handles formatting:

```php
$formatted = $order->get_order_number();
```

### Concurrency model

The counter increment is a single SQL `UPDATE` on the `wp_options` row, which MySQL/MariaDB performs atomically. There is no application-level lock, no transient, and no WP cron involved. Two simultaneous checkouts will always receive distinct numbers.

## Troubleshooting

### Order numbers still show the WP post ID

Most often the order was created before the module was activated. The display filter only formats orders that have the `_asteris_order_number` meta key set. Either re-save the order through a custom snippet that calls the `assign_number()` method, or accept that pre-existing orders keep their original IDs.

A second possibility: another plugin is filtering `woocommerce_order_number` at a later priority and overriding the Asteris value. Temporarily deactivate suspect plugins (most commonly other order-numbering plugins still installed alongside the module) to confirm.

### "Permission denied" or "Invalid nonce" when saving settings

The settings form uses `admin-post.php` and requires the `manage_woocommerce` capability plus a valid nonce. If you see these errors, the page was likely left open past WordPress's nonce lifetime (24 hours). Reload the settings page and save again. Shop Manager and Administrator roles both have the capability by default.

### The counter is ahead of the actual order count

The counter increments at order creation, including for orders that are subsequently cancelled, failed, or auto-deleted. Numbers are claimed permanently — there are no skipped-number rollbacks. This is intentional and matches how Skyverge, WP Overnight, and most accounting systems behave.

### Format changes don't seem to apply

The format is applied at display time by the `woocommerce_order_number` filter. If a particular screen still shows the old format, it is reading from a cached value (page cache, object cache, or a hard-coded value stored elsewhere). Flush WP page cache and object cache, then reload.

## Known plugin conflicts

- **Skyverge / WPFactory / WPC Sequential Order Numbers** — running two order-number plugins simultaneously is unsupported. Deactivate the other plugin before enabling this module.
- **WooCommerce Subscriptions** — renewal orders receive their own sequential number. If you specifically want renewals to inherit the parent's number, this module does not currently support that and a custom snippet would be needed.
- **HPOS (High-Performance Order Storage)** — the module uses `WC_Order` meta methods (`get_meta` / `update_meta_data`) which are HPOS-safe. No known conflict.
- Conjectural: heavily customised checkout plugins that bypass the standard WooCommerce order-creation hooks may not trigger the assignment. Test on staging before going live.

## What is in Free vs Paid

This module is identical in Asteris Free and the paid tiers (Starter, Pro, Agency, Founder). No feature is gated.

## Related

- [All modules overview](/modules)
- [Asteris Free vs Paid comparison](/docs/free-vs-paid)
- [PDF Invoices module](/docs/modules/pdf-invoices) — uses the formatted order number on generated invoices
- [Pricing and tiers](/pricing)

## Changelog

| Version | Date | Notes |
|---------|------|-------|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
