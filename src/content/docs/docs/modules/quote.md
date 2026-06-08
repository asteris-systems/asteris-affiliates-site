---
title: "Quote / Enquiry"
description: "Adds a Request-a-Quote button to WooCommerce product pages with a modal form, admin inbox, and email notifications — for B2B, made-to-order, and high-value stores."
---

## What it does

The Quote / Enquiry module adds a "Request a Quote" button to WooCommerce single product pages. Customers fill in a modal form (name, email, optional phone, optional quantity, message) and the enquiry is stored as a custom post type (`asteris_enquiry`) inside WooCommerce, with an email notification sent to the store admin. An optional auto-reply confirmation goes back to the customer.

Three button modes are supported: **alongside** Add to Cart, **replace** Add to Cart entirely, or **disabled** globally (and enabled per product). Each product can override the global mode and button text from a sidebar metabox on the product editor. Enquiries are managed from an inbox with New / Read / Replied statuses.

**Replaces:** YITH WooCommerce Request a Quote ($99/yr), WooCommerce Request a Quote ($99/yr).

## Quick start

1. Activate the **Quote / Enquiry** module from **Asteris Affiliates → Modules**.
2. Go to **Asteris Affiliates → Quote / Enquiry → Settings**.
3. Choose a **Default mode**: Alongside Add to Cart, Replace Add to Cart, or Disabled.
4. Set the **Notification email** address (defaults to the WordPress admin email).
5. Optionally enable **Show phone** and **Show quantity** form fields, and the **Auto-reply** confirmation.
6. Save settings, then visit any single product page on the front-end to confirm the button renders.
7. Submit a test enquiry. Verify it appears in **WooCommerce → Enquiries** and that the notification email arrives.

## Settings reference

All settings live at **Asteris Affiliates → Quote / Enquiry → Settings** (stored via `register_setting` under the `asteris_quote_enquiry_group` option group).

| Setting | What it does | Default | Valid values |
|---------|--------------|---------|--------------|
| Default mode | Global button behaviour on every product page | `alongside` | `alongside`, `replace`, `disabled` |
| Button text | Label shown on the enquiry button | `Request a Quote` | Any text (per-product override available) |
| Notification email | Address that receives new-enquiry notifications | WordPress admin email | Any valid email |
| Show phone number field | Toggles the phone input in the modal form | `1` (on) | `0`, `1` |
| Show quantity field | Toggles the quantity input in the modal form | `1` (on) | `0`, `1` |
| Auto-reply to customer | Sends a confirmation email back to the customer | `0` (off) | `0`, `1` |
| Auto-reply subject | Subject line of the customer confirmation | `We received your enquiry` | Any text |
| Auto-reply message | Body of the customer confirmation. Placeholders: `{name}`, `{product}`, `{site_name}` | Default template included | Any text with placeholders |

Per-product overrides on the product editor sidebar metabox:

| Setting | What it does | Default | Valid values |
|---------|--------------|---------|--------------|
| Button mode (per product) | Overrides the global mode for this product only | (empty = use global) | empty, `alongside`, `replace`, `disabled` |
| Button text (per product) | Overrides the global label for this product only | (empty = use global) | Any text |

## Common workflows

### Quote-only store (no Add to Cart anywhere)

For shops where every product is custom-quoted, hide Add to Cart globally.

1. Go to **Asteris Affiliates → Quote / Enquiry → Settings**.
2. Set **Default mode** to **Replace Add to Cart**.
3. Save. Every single product page now shows only the enquiry button.
4. To exempt a specific product (e.g. a downloadable add-on that sells normally), edit that product and set its per-product **Button mode** to **Disabled**.

### Mixed catalogue (cart for stock items, quote for made-to-order)

Use the global setting for the common case and override on the exceptions.

1. Set **Default mode** to **Alongside Add to Cart** in settings.
2. For made-to-order products, edit the product, locate the **Asteris — Quote / Enquiry** metabox in the sidebar, and set **Button mode** to **Replace Add to Cart**.
3. Optionally change the per-product **Button text** (e.g. "Request a custom build").
4. Update the product. The Add to Cart button is removed only on that product.

### Managing the enquiry inbox

1. Go to **WooCommerce → Enquiries**.
2. The list shows columns: Status, Customer, Product, Email, Message preview, Date.
3. Click any enquiry to open the detail screen. Opening a "New" enquiry automatically marks it as "Read".
4. Use the **Status** sidebar metabox to set the status to Replied, then click **Update**.
5. From the list, the **Mark as Replied** row action sets status in one click.

### Sending a customer confirmation

1. In settings, tick **Send a confirmation email to the customer after submission**.
2. The **Auto-reply content** fields appear: edit the **Subject** and **Message**.
3. Use placeholders `{name}`, `{product}`, and `{site_name}` to personalise the body.
4. Save. Every subsequent submission sends both the admin notification and the customer confirmation.

### GDPR / data export

The module registers its enquiry meta keys with the Asteris core GDPR pipeline via `gdpr_data_keys()`. Customer name, email, phone, and message are eligible for inclusion in WordPress's built-in personal-data export and erasure tools.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

### Frontend asset handles

| Handle | Type | Loaded on |
|--------|------|-----------|
| `asteris-quote-enquiry` | CSS | Single product pages, only when effective mode is not `disabled` |
| `asteris-quote-enquiry` | JS | Single product pages, depends on `jquery` |

Use these handles with `wp_dequeue_style` / `wp_dequeue_script` (priority later than `10` on `wp_enqueue_scripts`) if you need to suppress the module's frontend assets on specific templates.

## Troubleshooting

### The button does not appear on a product page

Confirm the module is active under **Asteris Affiliates → Modules**. Check the product's per-product metabox isn't set to **Disabled**. Confirm the global **Default mode** is not **Disabled**. The button only renders on `is_product()` (single-product templates) — it will not show on shop, archive, or category pages. If your theme replaces the `woocommerce_single_product_summary` hook, the button will be missing; either restore the standard summary hook or render `aqe-open-modal` markup manually.

### Replace mode still shows Add to Cart

The module removes `woocommerce_template_single_add_to_cart` from the summary hook. If a theme or another plugin re-renders Add to Cart from a different hook (custom template override, page builder block, or a duplicate summary), Asteris cannot remove it. Inspect the rendered HTML for which template printed the second button and remove the conflicting action in your child theme.

### Notification email not arriving

Check the **Notification email** setting at **Asteris Affiliates → Quote / Enquiry → Settings**. Confirm WordPress can send mail at all — `wp_mail` failures on shared hosting are the most common cause. Install an SMTP plugin (FluentSMTP, WP Mail SMTP) and re-test. The enquiry will still be saved as a CPT post even if the email fails, so check **WooCommerce → Enquiries** to confirm storage works.

### "Security check failed" on submit

The form nonce (`asteris_qe_nonce`) has expired. This happens on pages cached for longer than the WordPress nonce lifetime (default 24 hours). Either exclude single product pages from full-page caching, or reduce cache TTL for product templates. Refreshing the page issues a new nonce.

### Auto-reply not sending

Confirm the **Auto-reply** checkbox is ticked and that the customer submitted a syntactically valid email. The auto-reply uses the same `wp_mail` pipeline as the admin notification — if one fails, both likely fail. Placeholders that don't match `{name}`, `{product}`, or `{site_name}` are left in the body verbatim.

## Known plugin conflicts

- **Other quote-request plugins** (YITH Request a Quote, WooCommerce Request a Quote, ELEX Quotation): run only one quote plugin at a time. Two button injections on the same product page will produce overlapping buttons and conflicting form submissions.
- **Aggressive page caching** (WP Rocket, LiteSpeed Cache, Cloudflare APO with HTML caching): the AJAX nonce can expire if the cached HTML is older than the nonce lifetime. Exclude single-product pages or shorten TTL.
- **Themes that fully override the `single-product/add-to-cart.php` template**: replace-mode may not strip Add to Cart cleanly, since the standard `woocommerce_template_single_add_to_cart` hook isn't being used.
- Other conflicts (subscriptions, bookings, deposits) are not currently known — please report any you find via the support forum.

## What is in Free vs Paid

Quote / Enquiry is a paid-tier module. Available in **Starter**, **Pro**, **Agency**, and **Founder**. Not included in Asteris Affiliates Free.

## Related

- [All 21 modules →](/modules)
- [Pricing and tiers →](/pricing)
- [Free vs paid comparison →](/docs/free-vs-paid)
- [Back-in-Stock Notifications →](/docs/modules/back-in-stock)
- [Min/Max Quantity Rules →](/docs/modules/min-max-quantity)

## Changelog

| Version | Date | Notes |
|---------|------|-------|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
