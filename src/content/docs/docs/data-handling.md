---
title: "Data handling (GDPR + privacy)"
description: "Per-module map of what personal data Asteris Affiliates stores, where, and for how long — for agencies handling GDPR-regulated client stores."
---

# Data handling per module

This page is for agencies and store operators who need to document Asteris's data flows for their GDPR Records of Processing Activities (Article 30), Australian Privacy Act compliance reviews, or any other data-mapping exercise.

For each module, the table below lists:
- What personal data the module stores in your WordPress database
- Which database table / option key it lives in
- The retention period (when stored data expires or can be deleted)
- The `gdpr_data_keys()` method return value (used by the WP core privacy exporter)

This document is generated from the `gdpr_data_keys()` declaration each module makes in code, so it stays accurate as modules evolve.

---

## At-a-glance — modules that store personal data

| Module | Stores PII? | Categories |
|---|---|---|
| AI Suite | No | Stores your API keys (not customer PII) |
| Analytics | No | Sends event data direct to GA4 (Google is the storage party, not Asteris) |
| Asteris Coupons | No | Trace log hashes cart shape, no customer identifiers |
| Asteris Links | Yes (limited) | Click logs include IP + UA + referer; configurable retention |
| Back-in-Stock | **Yes** | Email + product ID + subscription timestamp |
| Coupons | No | See Asteris Coupons above |
| Delivery Timeline | No | Computes delivery dates from cart, doesn't store per-customer state |
| Feature Labels | No | Display-only, no per-customer data |
| Free Shipping Bar | No | Cart-state only, no persistence |
| Min/Max Quantity | No | Cart-state only |
| PDF Invoices | Yes (via WC) | Stores invoice PDFs referencing order data — uses WooCommerce's own customer record, no separate copy |
| Product Badges | No | Display-only |
| Product Filtering | No | URL-state only, no per-customer profile |
| Quote / Enquiry | **Yes** | Quote-request emails + form submissions |
| SEO | No | Page-level meta, not customer-level |
| Sequential Order Numbers | No | Counter only, no customer link |
| Side Cart | No | Cart-state in browser session, no server persistence |
| Stock Urgency | No | Display-only |
| Trust Badges | No | Display-only |
| Variation Swatches | No | Display-only |
| Wishlist | **Yes** | User ID + product IDs + saved-at timestamp (logged-in users); cookie-stored for guests |

**Three modules store identifiable customer data:** Back-in-Stock (email), Quote/Enquiry (form submissions including email + message), Wishlist (user ID + product IDs). Asteris Links stores click metadata that may include IP but is not directly tied to customer identity.

All other modules either store no personal data or rely on WooCommerce's own customer-data layer (which has its own GDPR exporter).

---

## Per-module data inventory

### Back-in-Stock Notifications

| What | Where | Retention |
|---|---|---|
| Subscriber email | `wp_asteris_bis_subscribers` custom table | Until customer unsubscribes OR product comes back in stock (auto-deleted after notification sent) |
| Product ID + variation ID | `wp_asteris_bis_subscribers.product_id` | Same retention as email |
| Subscription timestamp | `wp_asteris_bis_subscribers.subscribed_at` | Same retention |
| Notification sent flag | `wp_asteris_bis_subscribers.notified_at` | Kept 30 days post-notification, then row deleted |

**GDPR exporter:** WP core's personal-data exporter (Tools → Export Personal Data) returns every BIS subscription matching the requested email.
**GDPR eraser:** WP core's personal-data eraser deletes BIS rows matching the requested email.

### Quote / Enquiry

| What | Where | Retention |
|---|---|---|
| Quote form submission | `wp_posts` (CPT `asteris_quote`) | Indefinite — admin manages manually |
| Submitter name + email | `wp_postmeta` keyed to the quote post | Same retention |
| Quote message | `post_content` of the quote post | Same retention |

**GDPR exporter:** returns all quote-request posts matching submitter email.
**GDPR eraser:** deletes matching quote-request posts.

### Wishlist

| What | Where | Retention |
|---|---|---|
| Logged-in user wishlist | `wp_usermeta` key `_asteris_wishlist` | Until user clears wishlist OR account is deleted |
| Guest wishlist | Browser cookie `asteris_wishlist` | 30 days from last update |

**GDPR exporter:** returns the logged-in user's wishlist contents (product IDs + added-at timestamps).
**GDPR eraser:** clears the user's wishlist meta.
**Guest wishlists:** not eraseable by GDPR request because no identifier is stored server-side — purely client-side cookie.

### Asteris Links (click tracking)

| What | Where | Retention |
|---|---|---|
| Click event (IP + UA + referer + link ID + timestamp) | `wp_asteris_links_clicks` custom table | Configurable: 30 / 90 / 180 / 365 days (default 90); auto-deleted past retention |
| Aggregate click count per link | `wp_postmeta` key `_asteris_link_total_clicks` | Indefinite (aggregate only, no PII) |

**Note on IP:** stored hashed if "Anonymise IP" setting is on (default). Stored full if off. The click table is the only place Asteris stores IP addresses anywhere.

---

## How to handle a GDPR data-subject request

1. **Right of access (Article 15) / data-portability (Article 20):** Tools → Export Personal Data → enter customer email → WP core gathers exports from every plugin including Asteris's modules listed above. Output is a downloadable zip.
2. **Right of erasure (Article 17):** Tools → Erase Personal Data → enter customer email → WP core invokes Asteris's erasers. The modules listed above will delete matching data.
3. **For data NOT erased by the WP core flow:** WooCommerce orders, payment records, invoices (legally retainable for accounting purposes). Asteris doesn't store these — WooCommerce does, and WC's own erasure rules apply.

---

## Australian Privacy Act notes

Asteris does not transmit personal data outside your WordPress install except for the licence activation call (which sends only your licence key + hostname + WP/PHP/WC versions — see [/docs/security](/docs/security) for the full disclosure). No Australian Privacy Principle (APP) cross-border-disclosure obligation triggers from Asteris itself.

If your store collects customer data via Quote/Enquiry forms, Back-in-Stock subscriptions, or wishlists, the standard APP 5 notification (privacy collection statement at the point of collection) and APP 11 reasonable-security-steps obligations apply to *your* handling of that data, not Asteris's.

---

## See also

- [Security architecture](/docs/security)
- [Privacy Policy](/privacy) — what data Asteris collects from customers (the buyers)
- [Subprocessors](/subprocessors)
- WooCommerce's own [GDPR documentation](https://woocommerce.com/document/gdpr/) for WC-core data
