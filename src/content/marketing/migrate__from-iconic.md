---
url: /migrate/from-iconic
title: "Switching from Iconic WooCommerce plugins to Asteris Affiliates"
meta_description: "Iconic sells WooCommerce Filters, Variation Swatches, Stock Urgency and more as separate plugins ($59–$99/yr each). Asteris Affiliates includes all four modules in one plugin from $149/yr."
og_title: "Switch from Iconic plugins to Asteris Affiliates"
og_description: "Iconic charges $59–$99/yr per plugin. Asteris Affiliates includes the same modules plus 16 more, for $149/yr Starter."
canonical: https://asterisaffiliates.com/migrate/from-iconic
primary_keyword: iconic woocommerce alternative
primary_keyword_us_vol: 320
primary_keyword_kd: 18
secondary_keywords:
  - iconic woocommerce plugins alternative
  - iconic variation swatches alternative
  - iconic woocommerce filters alternative
schema_type: Article + FAQPage
internal_links_out:
  - /docs/modules/variation-swatches
  - /docs/modules/product-filtering
  - /docs/modules/stock-urgency
  - /docs/modules/delivery-timeline
  - /modules
  - /pricing
verified_date: 2026-06-03
ai_overview_optimised: true
---

# Migrate from Iconic plugins

Iconic ships several focused WooCommerce plugins — most commonly **WooCommerce Variation Swatches**, **WooCommerce Filters**, **WooCommerce Stock Urgency**, and **WooCommerce Delivery Timeline**. Each is bought separately at $59–$99/yr. Asteris Affiliates includes the equivalent of all four (plus 16 other modules) as toggleable modules in one plugin for $149/yr Starter.

---

## TL;DR

- Four Iconic plugins → four Asteris modules: Variation Swatches → **Variation Swatches**, Filters → **Product Filtering**, Stock Urgency → **Stock Urgency**, Delivery Timeline → **Delivery Timeline**.
- Settings transfer via a one-click admin migration tab that reads Iconic's stored options and writes Asteris equivalents — no CSV juggling.
- What carries across cleanly: swatch type per attribute (colour / image / label), filter widget configuration, stock urgency display threshold, delivery-window business rules.
- What does **not** carry across: Iconic Pro-only conditional logic on swatch sets (deferred to v1.1), custom-CSS overrides you wrote against Iconic's class names (use Asteris's own class names, documented per module).
- Time: 15–30 minutes for the whole stack if you have all four Iconic plugins installed.
- Reversible: yes. Asteris uses its own option namespace and never overwrites Iconic's stored data. Reactivate Iconic, disable the Asteris modules, done.

---

## Before you start

1. **Database backup.** UpdraftPlus, BackWPup, or your host's snapshot tool. Capture `wp_options` (where both plugin families store settings) before running the migration.
2. **Stage if you can.** Clone to staging, run the migration there, check 5–10 products on the front end, then repeat on production.
3. **Confirm requirements.** WordPress 6.4+, PHP 8.1+, WooCommerce 8.0+, Asteris Affiliates installed and licensed (Starter or higher — Variation Swatches and Product Filtering lite are in Asteris Free, but Stock Urgency and Delivery Timeline are paid-only).
4. **Note your Iconic versions.** Iconic Variation Swatches Pro v3+, Iconic Filters v2+, Stock Urgency v1.5+, Delivery Timeline v2+. Older versions may have option keys we have not mapped; spot-check before bulk-trusting the migration.
5. **Deactivate aggressive page caches** (WP Rocket, LiteSpeed, Cloudflare APO) for the migration window. Cached shop pages will continue rendering Iconic's HTML until the cache flushes.

---

## What gets imported

| From Iconic | To Asteris | Status |
|---|---|---|
| Iconic Variation Swatches → swatch type per attribute | Variation Swatches → swatch type per attribute | auto |
| Iconic Variation Swatches → custom swatch colours / images | Variation Swatches → same fields | auto |
| Iconic Filters → enabled filter widgets (category, price, attribute) | Product Filtering → equivalent filters | auto |
| Iconic Filters → AJAX mode toggle | Product Filtering → AJAX mode toggle | auto |
| Iconic Stock Urgency → display threshold ("show 'Only X left' when stock ≤ N") | Stock Urgency → same threshold setting | auto |
| Iconic Stock Urgency → custom message template | Stock Urgency → same field | auto |
| Iconic Delivery Timeline → cutoff time, lead time in days, public holidays | Delivery Timeline → same fields | auto |
| Iconic Pro-only: conditional swatch logic | — | **manual rebuild required** (v1.1) |
| Iconic Pro-only: filter widget custom templates | — | **use Asteris template hooks** instead |

---

## Run the migration

1. Install + activate Asteris Affiliates. Add your licence key.
2. Go to **WooCommerce → Asteris WC → Migrate**.
3. The Iconic-detection check fires automatically on each plugin that is active. You will see one card per Iconic plugin found.
4. Click **Import settings** on each card. Imports are idempotent — running them twice is safe.
5. Toggle on the corresponding Asteris module in **Modules** (Variation Swatches, Product Filtering, Stock Urgency, Delivery Timeline). They activate immediately.
6. Visit a variable product page and a shop archive page. Confirm swatches render, filters work, stock urgency text appears, delivery timeline shows.
7. When you are happy: deactivate the Iconic plugins one at a time, re-check after each one.

If something looks off after deactivating an Iconic plugin, reactivate it — your data is intact, Asteris reads its own options.

---

## FAQ

### Will my custom CSS still work?

Class names differ. Iconic uses `iconic-woo-*` prefixes; Asteris uses `asteris-*` prefixes. Each module's docs page lists the canonical class names. If you have a lot of custom CSS, expect 30–60 minutes of find-and-replace.

### Do I lose attribute-image uploads when I deactivate Iconic Variation Swatches?

No. Both plugins store swatch images in WordPress's Media Library (the standard attribute-term `_image` meta). Both read it cleanly.

### What about Iconic Bundles, Iconic Configurator, Iconic WC Quickview?

Not covered by Asteris at v1.0. Bundles and Configurator are planned for v1.2 (`memory/project_module_roadmap.md` queue). Quickview is deliberately out of scope — most modern themes implement it natively. If you depend on these, keep the relevant Iconic plugin active alongside Asteris. The two plugin families coexist cleanly.

### How does the price comparison actually work?

Iconic prices as of 2026-06-03 (publicly listed): Variation Swatches $59/yr, Filters $79/yr, Stock Urgency $49/yr, Delivery Timeline $99/yr. Stacked = **$286/yr** for the four modules. Asteris Starter is $149/yr for all four plus 16 more. Founder pricing locks that $149/yr for as long as you stay subscribed.

---

## See also

- [Variation Swatches module docs](/docs/modules/variation-swatches)
- [Product Filtering module docs](/docs/modules/product-filtering)
- [Stock Urgency module docs](/docs/modules/stock-urgency)
- [Delivery Timeline module docs](/docs/modules/delivery-timeline)
- [Migration hub](/migrate) — all migration adapters
- [All 21 modules](/modules)
- [Pricing](/pricing)
