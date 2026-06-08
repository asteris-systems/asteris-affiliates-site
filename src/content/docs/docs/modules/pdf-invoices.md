---
title: "PDF Invoices and Packing Slips"
description: "Generates branded PDF invoices and packing slips for every WooCommerce order — for stores that need legal tax invoices, auto-emailed PDFs, and bulk admin printing."
---

## What it does

Generates a real PDF invoice and (optionally) a packing slip for every WooCommerce order. Customers download from the My Account → Orders list, the single-order detail page, or a button injected into the order confirmation email. Admins get a dedicated PDF column on the orders list (HPOS and legacy), a per-order metabox for invoice number overrides and per-order notes, and bulk-print actions that combine many orders into one multi-page PDF with page breaks between them. PDFs can also be auto-attached to the Completed, Processing, Manual Invoice, and Refunded customer emails as real `.pdf` attachments.

Numbering is sequential and gap-free using an atomic SQL counter (race-condition safe), with prefix and zero-padding controls. If the Sequential Order Numbers module is active, invoice numbers stay aligned with the order number. Rendering is handled by Dompdf via `Asteris\Core\PDF_Generator`; if Dompdf is unavailable, the module falls back to a printable HTML page so the feature degrades gracefully. This module replaces **WP Overnight PDF Invoices Premium** (~$79/yr) and **WooCommerce PDF Invoices by Skyverge** (~$79/yr).

## Quick start

1. Activate the **PDF Invoices and Packing Slips** module from **Asteris → Dashboard**.
2. Go to **Asteris → PDF Invoices** and pick one of the five designs (Modern, Classic, Minimal, Branded, Compact).
3. Fill in **Company details** (name, address, Tax ID / ABN / VAT, email, phone, website) and upload your **Logo**.
4. Set your **Number prefix** (e.g. `INV-`), **Starting number** (default `1001`), and **Number padding** (default `4`).
5. Under **PDF email attachments**, tick the WooCommerce emails you want the PDF auto-attached to. The Completed email is on by default.
6. Save settings, then open any order in WooCommerce and click **View Invoice** in the order data box, or click the PDF icon on the orders list.

## Settings reference

All options are stored under the prefix `asteris_pdf_invoices_*` (one `update_option` per field, BOM-free admin-post.php save handler — not Settings API).

| Setting | What it does | Default | Valid values |
|---|---|---|---|
| `template` | Design used for invoice and packing slip output | `modern` | `modern`, `classic`, `minimal`, `branded`, `compact` |
| `doc_title_invoice` | Header title on invoice documents | `Tax Invoice` | Any string |
| `doc_title_packing` | Header title on packing slip documents | `Packing Slip` | Any string |
| `company_name` | Company name printed in the header | Site name | Any string |
| `company_address` | Multi-line address block | Empty | Multi-line string |
| `company_tax_id` | ABN / VAT / Tax ID line | Empty | Any string |
| `company_email` | Contact email shown on the document | `admin_email` | Valid email |
| `company_phone` | Contact phone number | Empty | Any string |
| `company_website` | URL shown on the document | `home_url()` | Valid URL |
| `logo_id` | WP attachment ID of the logo (embedded as base64 data URI for reliable Dompdf rendering) | `0` | Positive integer |
| `accent_color` | Hex colour for headings, totals, and the customer email button | `#1a3a6c` | Hex colour |
| `footer_text` | Footer line on every invoice | `Thank you for your order!` | Multi-line string |
| `show_packing` | Show the **Packing Slip** button on admin order screens | `1` | `0` / `1` |
| `packing_show_notes` | Include customer notes on the packing slip | `1` | `0` / `1` |
| `invoice_prefix` | Prefix before the invoice number | `INV-` | Any string |
| `invoice_start_number` | First sequential invoice number | `1001` | Positive integer |
| `invoice_padding` | Zero-pad width of the number portion (`4` → `0001`) | `4` | `0`-`10` |
| `date_format` | PHP date format for dates on the document. Empty = WordPress site default | Empty | Any `date()` format |
| `show_generated_on` | Show the "Generated on" timestamp in the footer | `1` | `0` / `1` |
| `attach_completed` | Attach PDF to **Customer Completed Order** email | `1` | `0` / `1` |
| `attach_processing` | Attach PDF to **Customer Processing Order** email | `0` | `0` / `1` |
| `attach_invoice_mail` | Attach PDF to **Customer Invoice** email | `1` | `0` / `1` |
| `attach_refunded` | Attach PDF to **Customer Refunded Order** email | `0` | `0` / `1` |

Per-order overrides (set on the order edit screen, stored as order meta):

| Meta key | What it does |
|---|---|
| `_asteris_invoice_number` | Locks a specific number to the order (blank = auto-assign on first generation) |
| `_asteris_invoice_note` | Per-order note printed bottom-left of the invoice (independent of the global footer) |

## Common workflows

### Issuing a tax invoice for an Australian GST-registered store

1. Open **Asteris → PDF Invoices**.
2. Set **Invoice title** to `Tax Invoice` (required wording under ATO rules for GST-registered businesses).
3. Enter your ABN under **Tax ID / ABN / VAT**.
4. Choose the **Classic** or **Modern** template — both present totals and GST lines cleanly.
5. Tick **Attach PDF to Order Completed email**.
6. Place a test order, mark it Completed, and confirm the customer receives the PDF attached to their email.

### Bulk-printing packing slips for the warehouse

1. Go to **WooCommerce → Orders** (works on both HPOS and legacy screens).
2. Tick the orders you want to ship.
3. From the **Bulk actions** dropdown, choose **Print packing slips** and click **Apply**.
4. A new tab opens with a single multi-page PDF — one packing slip per order, page-break-separated.
5. Print from your browser. The nonce expires after one minute and the URL is one-time use per session.

### Overriding the invoice number on a specific order

1. Open the order in WooCommerce.
2. In the right-hand sidebar, find the **Asteris — Invoice** metabox.
3. Type a number into **Override the invoice number**. Leave blank to let the auto-counter take over.
4. Save the order. The override is stored in `_asteris_invoice_number` and survives regeneration.

### Adding a per-order note (e.g. payment terms)

1. Open the order edit screen.
2. In the **Asteris — Invoice** metabox, fill the **Invoice note** textarea (e.g. `Payment due within 14 days`).
3. Save. The note appears in the bottom-left of the rendered invoice, independent of the global footer text.

### Customising a template

1. Copy the desired template from `wp-content/plugins/asteris-affiliates/src/Modules/PDF_Invoices/Templates/{template}.php`.
2. Paste it to `wp-content/themes/{your-theme}/asteris/pdf-invoices/{template}.php`.
3. Edit freely — the `helper.php` template loader picks up theme overrides automatically.
4. Theme overrides survive plugin updates.

### Debugging template output

1. Append `&debug=html` to any invoice URL (e.g. `/?asteris_invoice=ORDER_KEY&type=invoice&debug=html`).
2. The module returns the raw HTML instead of streaming a PDF, including an HTML comment identifying the active template ID.
3. Use this to inspect CSS rendering issues before Dompdf converts the HTML.

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

This module does not yet expose any custom `asteris_*` filters, actions, shortcodes, or REST endpoints. The integration points below are public-facing but are *not* extension hooks:

### URL pattern

Public render endpoint (hooked on `init`):

```
/?asteris_invoice={order_key}&type={invoice|packing-slip}
```

Authentication is by WooCommerce order key — the same token used in customer order emails. Admin bulk print uses `asteris_invoice=multi` with `keys=KEY1,KEY2,...` and a `_wpnonce` for the `asteris_bulk_invoices` action; requires `manage_woocommerce` capability.

### Theme template override path

```
wp-content/themes/{your-theme}/asteris/pdf-invoices/{template}.php
```

Where `{template}` is one of `modern`, `classic`, `minimal`, `branded`, `compact`. Theme overrides are a committed extension point and survive plugin updates.

## Troubleshooting

### "Invoice not found" 404 when clicking the download link

The URL uses the WooCommerce order key as its security token (`wc_get_order_id_by_order_key`). If the order has been deleted, the key has been regenerated, or the link was sent before an order key reset, the lookup fails. Resend the order confirmation email from the order edit screen to issue a fresh URL.

### PDF is served as HTML instead of a true PDF

The module checks `Asteris\Core\PDF_Generator::is_available()` before streaming. If Dompdf cannot be loaded (PHP `mbstring` or `gd` missing, server memory limit too low for the bundled library), the fallback is an HTML page printed in-browser. Check **Tools → Site Health** for missing PHP extensions and raise `WP_MEMORY_LIMIT` to at least 256M.

### Logo missing from the rendered PDF

The module embeds the logo as a base64 data URI by reading the attachment file directly with `file_get_contents()`. If the attachment file has been moved off disk (e.g. offloaded to S3 with no local copy), the embed fails and the module falls back to the attachment URL — which Dompdf may not be able to fetch over HTTPS. Re-upload the logo or keep a local copy.

### Bulk print returns "Permission denied" or "Invalid request"

Bulk print requires the `manage_woocommerce` capability and a valid `asteris_bulk_invoices` nonce. The transient that carries the multi-print URL expires after `MINUTE_IN_SECONDS` (60s). If you wait too long between clicking the bulk action and the new tab opening, retrigger the bulk action.

### Invoice numbers skip or duplicate

The counter is incremented via an atomic `UPDATE … SET option_value = option_value + 1` on `wp_options`. Skips can happen if you manually edit the `asteris_pdf_invoices_next_number` option, restore a database backup, or assign a manual override that collides with the auto sequence. Use the per-order **Override the invoice number** field to repair gaps; the override is locked into `_asteris_invoice_number` and won't be recycled.

## Known plugin conflicts

- **WP Overnight PDF Invoices**, **WooCommerce PDF Invoices by Skyverge**, and similar — both this module and theirs hook `woocommerce_email_attachments`. Deactivate the other plugin to avoid duplicate PDF attachments on customer emails.
- **Caching plugins (WP Rocket, W3 Total Cache, LiteSpeed)** — the invoice URL is dynamic (`?asteris_invoice=...`) but contains a query string that some aggressive setups still cache. Add `asteris_invoice` to the cache exclusion query-string list.
- **Custom Order Numbers plugins (other than Asteris Sequential Order Numbers)** — the module reads `_asteris_order_number` to keep invoice numbering aligned. Third-party order-number plugins store under different meta keys, so the invoice counter will run independently from your order numbers. No data loss, but the two sequences will diverge.
- **Other compatibility conjectural until reported** — submit issues at the support forum if you hit a conflict.

## What is in Free vs Paid

A reduced **lite** version ships in Asteris Free. The full module is paid-tier only.

**Free (lite):**
- 1 plain template
- Customer-only download from the order page

**Paid (Pro, Agency, Founder) adds:**
- All 5 designs (Modern, Classic, Minimal, Branded, Compact)
- Auto-attach PDFs to WooCommerce customer emails (Completed, Processing, Manual Invoice, Refunded)
- Branding controls (logo, accent colour, custom footer, per-order notes)
- Packing slips with optional customer notes
- Credit notes for refunded orders
- Bulk admin print (combined multi-page PDF)
- Sequential, gap-free invoice numbering with prefix and padding
- WP Overnight migration adapter

## Related

- [Sequential Order Numbers module](/docs/modules/sequential-order-numbers) — keeps invoice numbers aligned with order numbers
- [Migrating from WP Overnight PDF Invoices](/migrate/from-wp-overnight)
- [Pricing and tiers](/pricing)

## Changelog

| Version | Date | Notes |
|---|---|---|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
